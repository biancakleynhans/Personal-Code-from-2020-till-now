/** @format */

import React, { Component } from 'react';
import DaySelect from './000DaySelect';
import Calotron from './000Calotron';
import MealGroup from './000MealGroup';
import MacroTotals from './000MacroTotals';
import update from 'immutability-helper';
import { iGoals, iFoodItemComplete } from '../../models/FoodDiaryModels';
import { convert_NutriApi_ResultTo_iFoodItemComplete } from './001AddableFoodItem';
import { IonPage, IonContent, IonCard, IonList, IonItem, IonItemDivider, IonGrid, IonRow, IonCol, IonCardContent, IonItemGroup, IonLabel } from '@ionic/react';
import PageHeader from '../../components/layout/PageHeader';
import ListHeader from '../../components/layout/ListHeader';
import { Get, Update, Delete } from '../../services/firebase/ConectToServer';
import { TypesToServer } from '../../services/firebase/TypesToServer';
import { convertObjectToArray } from '../../helpers/Tools';
import { NutriApi } from '../../services/foodDatabase/FoodApiService';
import { LablesList } from '../../components/titleLists/Titles';

interface iState {
	selectedDay: any;
	meals: any;
	goals: iGoals;
	removingItem: any;
	caloriesBurned: number;
}

interface iProps {}

export function convertQueryStringToDate(queryStr: Date) {
	//   //1/16/2020, 8:07:28 AM => 2020-01-16
	// console.log("queryStr", queryStr)
	var q = new Date(queryStr);

	let year = q.getFullYear();
	let month = q.getMonth() + 1;
	let day = q.getDate();

	if (month >= 1 && month <= 9) {
		// console.log("date DayView Single Diget",year, month, day)
		var dateDone = year + '-0' + month + '-' + day;
		return dateDone;
	} else {
		// console.log("date DayView Double Digit",year, month, day)
		var dDone = year + '-' + month + '-' + day;
		return dDone;
	}
}

export function getMacroTotals(mealItems: any[], mealItem?: any) {
	// console.log(mealItems, mealItem)
	let cal, carb, fat, prot, fib, sod;
	cal = carb = fat = prot = fib = sod = 0;

	if (mealItems.length > 0) {
		// console.log("mealItems",mealItems.length, mealItems )
		for (let i = 0; i < mealItems.length; i++) {
			cal += +mealItems[i].macros.calories.toFixed(2);
			carb += +mealItems[i].macros.carbs.toFixed(2);
			fat += +mealItems[i].macros.fat.toFixed(2);
			prot += +mealItems[i].macros.protein.toFixed(2);
			// fib +=  +((mealItems[i].macros.fiber).toFixed(2));
			// sod +=  +((mealItems[i].macros.sodium).toFixed(2));
			// console.log("cal", cal, carb, fat, prot)
		}
		return {
			calories: cal,
			carbs: carb,
			fat: fat,
			protein: prot,
			fiber: fib,
			sodium: sod
		};
	}
	if (mealItem) {
		// console.log("mealItem")
		let totalCals, totalCarbs, totalFat, totalProtein, totalFiber, totalSodium;
		totalCals = totalCarbs = totalFat = totalProtein = totalFiber = totalSodium = 0;
		// console.log("calculateItemTotals => item.selectedServing.quantity",item.selectedServing.quantity)
		// console.log("calculateItemTotals => item.selectedServing.ratio",item.selectedServing.yieldTotalPortions)

		let servingSizeMultiplier = mealItem.selectedServing.quantity * mealItem.selectedServing.yieldTotalPortions;
		// console.log("calculateItemTotals => servingSizeMultiplier", servingSizeMultiplier)

		totalCals += +(mealItem.macros.calories * servingSizeMultiplier).toFixed(2);
		totalCarbs += +(mealItem.macros.carbs * servingSizeMultiplier).toFixed(2);
		totalFat += +(mealItem.macros.fat * servingSizeMultiplier).toFixed(2);
		totalProtein += +(mealItem.macros.protein * servingSizeMultiplier).toFixed(2);
		// totalFiber += +((mealItem.macros.fiber * servingSizeMultiplier).toFixed(2));
		// totalSodium += +((mealItem.macros.sodium * servingSizeMultiplier).toFixed(2));
		return {
			calories: totalCals,
			carbs: totalCarbs,
			fat: totalFat,
			protein: totalProtein,
			fiber: totalFiber,
			sodium: totalSodium
		};
	} else {
		// console.log("neither")
		var empty = { calories: 0, carbs: 0, fat: 0, protein: 0, fiber: 0, sodium: 0 };
		return empty;
	}
}

class DayView extends Component<iProps, iState> {
	constructor(props: any) {
		super(props);
		this.state = {
			selectedDay: this.getTodaysDate(),
			meals: {
				breakfast: {
					items: [],
					mealTotals: {
						caloriesEaten: 0,
						netCalories: 0,
						carbs: 0,
						fat: 0,
						protein: 0
					}
				},
				lunch: {
					items: [],
					mealTotals: {
						caloriesEaten: 0,
						netCalories: 0,
						calories: 0,
						carbs: 0,
						fat: 0,
						protein: 0
					}
				},
				dinner: {
					items: [],
					mealTotals: {
						caloriesEaten: 0,
						netCalories: 0,
						carbs: 0,
						fat: 0,
						protein: 0
					}
				},
				snacks: {
					items: [],
					mealTotals: {
						caloriesEaten: 0,
						netCalories: 0,
						carbs: 0,
						fat: 0,
						protein: 0
					}
				}
			},
			goals: {
				calories: 0,
				carbs: 0,
				fat: 0,
				fiber: 0,
				protein: 0,
				sodium: 0,
				sugar: 0
			},
			caloriesBurned: 0,
			removingItem: false
		};
		// console.log("Dayview Props from constuctor ",this.state)
	}

	getTodaysDate() {
		return new Date(Date.now());
	}

	componentDidMount() {
		let dayParam = this.state.selectedDay;
		// console.log(dayParam, "dayParam")
		if (dayParam) {
			// convertQueryStringToDate(dayParam)
			this.setState({ selectedDay: convertQueryStringToDate(dayParam) });
		}
		this.getConsumptions();
		this.getGoals(this.state.selectedDay);
	}

	getConsumptions() {
		var Barr: iFoodItemComplete[] = [];
		var Larr: iFoodItemComplete[] = [];
		var Darr: iFoodItemComplete[] = [];
		var Sarr: iFoodItemComplete[] = [];

		Get(TypesToServer.FoodConsumed)
			.then(snapshot => {
				console.log('snapshot.val()', snapshot.val());
				if (snapshot.val() !== null) {
					var ArrFromServer = convertObjectToArray(snapshot.val());
					ArrFromServer.forEach((entry: iFoodItemComplete) => {
						// console.log("GetCons", entry)
						var stateDay = this.state.selectedDay;
						// console.log("Inside Res Data index: ",entry.day, "this.state.selectedDay", stateDay)

						if (entry.day === stateDay) {
							// console.log("Inside Res Data index: ", entry.mealName)
							if (entry.mealName === 'breakfast') {
								Barr.push(entry);
								return Barr;
							}
							if (entry.mealName === 'lunch') {
								Larr.push(entry);
								return Larr;
							}
							if (entry.mealName === 'dinner') {
								Darr.push(entry);
								return Darr;
							}
							if (entry.mealName === 'snacks') {
								Sarr.push(entry);
								return Sarr;
							}
						}
					});
					let newState = update(this.state, {
						meals: {
							breakfast: { items: { $set: Barr } },
							lunch: { items: { $set: Larr } },
							dinner: { items: { $set: Darr } },
							snacks: { items: { $set: Sarr } }
						}
					});
					this.setState(newState);
				} else {
					console.log('no entries found in db, status: ');
				}
			})
			.catch(error => {
				console.log('error get', error);
			});
	}

	getGoals(day: any) {
		var ls = localStorage.getItem('GoalsUser');
		if (ls !== null) {
			var data = JSON.parse(ls);

			console.log('ls', data);

			var goals = {
				calories: +data.cal,
				carbs: +data.carb,
				fat: +data.fat,
				fiber: 0,
				protein: +data.protein,
				sodium: 0,
				sugar: 0
			};
			this.setState({ goals: goals });
		} else {
			Get(TypesToServer.UserInfo)
				.then(snapshot => {
					console.log('snapshot.val()', snapshot.val());
					if (snapshot.val() !== null) {
						var ArrFromServer = convertObjectToArray(snapshot.val());

						var goals = {
							calories: ArrFromServer[0].calReq,
							carbs: ArrFromServer[0].macros.carb,
							fat: ArrFromServer[0].macros.fat,
							fiber: 0,
							protein: ArrFromServer[0].macros.protein,
							sodium: 0,
							sugar: 0
						};
						this.setState({ goals: goals });
						localStorage.setItem('GoalsUser', JSON.stringify(goals));
					} else {
						console.log('no entries found in db, status: ');
					}
				})
				.catch(error => {
					console.log('error get', error);
				});
		}
	}

	changeSelectedDay(newDay: String) {
		// console.log("newday changeSelectedDay", newDay)
		this.setState({ selectedDay: newDay }, () => {
			this.getConsumptions();
		});
	}

	//   /**
	//    * Calculates totals for each meal being displayed
	//   */
	calculateMealTotals() {
		var totalArr: any[] = [];
		var brekkieTotal = getMacroTotals(this.state.meals.breakfast.items);
		var lunchTotal = getMacroTotals(this.state.meals.lunch.items);
		var dinnerTotal = getMacroTotals(this.state.meals.dinner.items);
		var snackTotal = getMacroTotals(this.state.meals.snacks.items);

		totalArr.push(brekkieTotal, lunchTotal, dinnerTotal, snackTotal);
		return totalArr;
	}

	calculateDayTotals(mealTotals: any) {
		// calculate consumption totals (nutrients & calories)
		// console.log("calculateDayTotals",mealTotals)
		let caloriesEaten: number, carbs: number, fat: number, protein: number;
		caloriesEaten = carbs = fat = protein = 0;

		mealTotals.forEach((mealTotal: any) => {
			caloriesEaten += +mealTotal.calories.toFixed(2);
			carbs += +mealTotal.carbs.toFixed(2);
			fat += +mealTotal.fat.toFixed(2);
			protein += +mealTotal.protein.toFixed(2);
			// fiber +=        +((mealTotal.fiber).toFixed(2))
			// sodium +=        +((mealTotal.sodium).toFixed(2))
		});

		// calculate net calories (consumption - activity)
		let netCalories = caloriesEaten - (this.state.caloriesBurned ? this.state.caloriesBurned : 0);

		return {
			caloriesEaten: +caloriesEaten.toFixed(2),
			netCalories: +netCalories.toFixed(2),
			carbs: carbs,
			fat: fat,
			protein: protein
		};
	}

	//   /**
	//    * Merge changed MealGroup states with DayView state,
	//    * send PUT request to backend
	//   */
	handleServingUpdate(newItemsList: any) {
		// console.log("handleServingUpdate newItemsList ", newItemsList)

		var iddd = newItemsList.id;
		var d = newItemsList.day;
		var mealN = newItemsList.mealName;
		var mlist = newItemsList.selectedServing.mUriList;
		var mArr = newItemsList.selectedServing.mUriList;
		var mLabel = newItemsList.selectedServing.servingSizeString;

		var mFound = mArr.find((i: any) => {
			var entry;
			if (i.label === mLabel) {
				// console.log("i",i)
				return (entry = i);
			}
			// console.log("i",entry)
			return entry;
		});

		// console.log("???///???",newItemsList.selectedServing.quantity, mFound.uri,newItemsList.foodId)

		NutriApi(newItemsList.selectedServing.quantity, mFound.uri, newItemsList.foodId)
			.then((res: any) => {
				// console.log(res.data)
				var cFI = convert_NutriApi_ResultTo_iFoodItemComplete(res.data, d, mealN, mlist, mLabel, iddd);
				// console.log(cFI)
				Update(TypesToServer.FoodConsumed, iddd, cFI);
			})
			.catch(error => {
				console.log('error get', error);
			});
	}

	removeItem(consumptionId: any) {
		console.log('removeItem', consumptionId.id, 'consumptionId');
		this.setState({ removingItem: true });
		Delete(TypesToServer.FoodConsumed, consumptionId.id);
		// DeleteFoodConsumed(consumptionId.id).then(()=>{
		//   appInj.setLoading('')
		//   window.location.reload()
		//   // this.forceUpdate()
		// })
		this.setState({ removingItem: false });
	}

	render() {
		// console.log("Base",this.state, this.props)
		let mealTotals = this.calculateMealTotals();
		let dayTotals = this.calculateDayTotals(mealTotals);

		return (
			<IonPage>
				<PageHeader titleString={LablesList.Page_Header_Names.FoodDiary.dayView.af} />
				<IonContent>
					<IonCard>
						<IonCardContent>
							<IonGrid>
								<IonRow justify-content-center>
									<IonCol>
										<DaySelect selectedDay={this.state.selectedDay} changeSelectedDay={this.changeSelectedDay.bind(this)} />
									</IonCol>

									<IonCol>
										<Calotron netCalories={dayTotals.netCalories} caloriesEaten={dayTotals.caloriesEaten} caloriesBurned={this.state.caloriesBurned} />
									</IonCol>
								</IonRow>
							</IonGrid>
						</IonCardContent>

						<IonList>
							<IonItemGroup>
								<IonItemDivider style={{ position: 'sticky' }} sticky={true} color='secondary'>
									<ListHeader title={LablesList.FoodDiary.dayView.brekkie.af} />
								</IonItemDivider>
								<IonItem lines='none'>
									<MealGroup
										type={LablesList.FoodDiary.dayView.brekkie.af}
										items={this.state.meals.breakfast.items}
										totals={mealTotals[0]}
										handleServingUpdate={this.handleServingUpdate.bind(this)}
										handleItemRemove={this.removeItem.bind(this)}
										removingItem={this.state.removingItem}
										day={this.state.selectedDay}
									/>
								</IonItem>

								<IonItemDivider style={{ position: 'sticky' }} sticky={true} color='secondary'>
									<ListHeader title={LablesList.FoodDiary.dayView.lunch.af} />
								</IonItemDivider>
								<IonItem lines='none'>
									<MealGroup
										type={LablesList.FoodDiary.dayView.lunch.af}
										items={this.state.meals.lunch.items}
										totals={mealTotals[1]}
										handleServingUpdate={this.handleServingUpdate.bind(this)}
										handleItemRemove={this.removeItem.bind(this)}
										removingItem={this.state.removingItem}
										day={this.state.selectedDay}
									/>
								</IonItem>

								<IonItemDivider style={{ position: 'sticky' }} sticky={true} color='secondary'>
									<ListHeader title={LablesList.FoodDiary.dayView.dinner.af} />
								</IonItemDivider>
								<IonItem lines='none'>
									<MealGroup
										type={LablesList.FoodDiary.dayView.dinner.af}
										items={this.state.meals.dinner.items}
										totals={mealTotals[2]}
										handleServingUpdate={this.handleServingUpdate.bind(this)}
										handleItemRemove={this.removeItem.bind(this)}
										removingItem={this.state.removingItem}
										day={this.state.selectedDay}
									/>
								</IonItem>

								<IonItemDivider style={{ position: 'sticky' }} sticky={true} color='secondary'>
									<ListHeader title={LablesList.FoodDiary.dayView.snack.af} />
								</IonItemDivider>
								<IonItem lines='none'>
									<MealGroup
										type={LablesList.FoodDiary.dayView.snack.af}
										items={this.state.meals.snacks.items}
										totals={mealTotals[3]}
										handleServingUpdate={this.handleServingUpdate.bind(this)}
										handleItemRemove={this.removeItem.bind(this)}
										removingItem={this.state.removingItem}
										day={this.state.selectedDay}
									/>
								</IonItem>

								<IonItemDivider>
									<IonLabel position='fixed'></IonLabel>
								</IonItemDivider>
								<IonItem lines='none'>
									<MacroTotals totalCarbs={dayTotals.carbs} totalFat={dayTotals.fat} totalProtein={dayTotals.protein} goals={this.state.goals} />
								</IonItem>
							</IonItemGroup>
						</IonList>
					</IonCard>
				</IonContent>
			</IonPage>
		);
	}
}

export default DayView;
