/** @format */

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';
// import update from 'immutability-helper';
import { measuresUri, iFoodItemComplete } from '../../models/FoodDiaryModels';
import { IonCard, IonItem, IonLabel, IonInput, IonGrid, IonRow, IonCol, IonSelect, IonSelectOption, IonItemDivider, IonButton, IonPage, IonContent, IonRouterLink } from '@ionic/react';
import PageHeader from '../../components/layout/PageHeader';
import { FavList } from '../../components/icons/FaviconList';
import { Add } from '../../services/firebase/ConectToServer';
import { TypesToServer } from '../../services/firebase/TypesToServer';
import { generator } from '../../helpers/Tools';
import { LablesList } from '../../components/titleLists/Titles';

interface iProps {}

interface RCPprops {
	meal: string;
	day: string;
}

class CreateFoodView extends Component<iProps & RouteComponentProps<RCPprops>> {
	handleSubmit(e: any) {
		e.preventDefault();
		// console.log("e", e)

		var foodObj: iFoodItemComplete = {
			day: this.props.match.params.day,
			mealName: this.props.match.params.meal,
			name: e.target[0].value,
			foodId: '',
			macros: {
				calories: e.target[9].value,
				carbs: e.target[2].value,
				fat: e.target[3].value,
				protein: e.target[4].value,
				fiber: e.target[5].value,
				sodium: e.target[7].value
			},
			dailyReq: {
				calories: 0,
				Calcium: 0,
				protein: 0,
				carbs: 0,
				Cholesterol: 0,
				Sugar: 0,
				fat: 0
			},
			selectedServing: {
				servingSizeString: e.target[1].value,
				quantity: e.target[8].value,
				yieldTotalPortions: 0,
				totalWeightOfFood: 0,
				mUriList: [{ label: '', uri: '' }]
			}
		};

		console.log('reqObj', foodObj);
		Add(TypesToServer.FoodDb, foodObj);
		window.location.replace('/foodDiary');
	}

	handleDoneAddingFoodsClick() {
		const currentLocation = this.props.location.pathname;
		const nextLocation = '/foodDiary';
		// console.log("currentLocation", currentLocation)
		return <Redirect to={nextLocation} from={currentLocation} />;
	}

	render() {
		let servingUnitOptions;

		if (measuresUri) {
			servingUnitOptions = measuresUri.map((entry: any) => {
				return (
					<IonSelectOption key={generator()} value={entry.label}>
						{entry.label}
					</IonSelectOption>
				);
			});
		}

		return (
			<IonPage>
				<PageHeader titleString={LablesList.Page_Header_Names.FoodDiary.createFood.af} />
				<IonContent>
					<IonCard>
						<form noValidate onSubmit={this.handleSubmit.bind(this)}>
							<IonGrid>
								<IonRow>
									<IonCol>
										<IonItem>
											<IonLabel position='floating'>{LablesList.FoodDiary.create.name.af}</IonLabel>
											<IonInput inputmode='text' name='name' id='name' type='text' placeholder='Groen Slaai' />
										</IonItem>

										<IonItem>
											<IonLabel>{LablesList.FoodDiary.create.size.af}</IonLabel>
											<IonSelect
												placeholder={LablesList.OptionsBtn.placeHolder.af}
												cancelText={LablesList.OptionsBtn.cancel.af}
												okText={LablesList.OptionsBtn.ok.af}
												name='servingsize'
												id='servingsize'>
												{servingUnitOptions}
											</IonSelect>
										</IonItem>
									</IonCol>
								</IonRow>

								<IonItemDivider style={{ textAlign: 'center' }} color='primary'>
									<IonGrid>
										<IonRow>
											<IonCol></IonCol>
											<IonCol>{LablesList.FoodDiary.create.valueTit.af}</IonCol>
											<IonCol></IonCol>
										</IonRow>
									</IonGrid>
								</IonItemDivider>

								<IonRow>
									<IonCol>
										<IonItem>
											<IonLabel position='floating'>
												{FavList.foodIcons.breadSlice.icon}
												{LablesList.FoodDiary.create.carb.af}
											</IonLabel>
											<IonInput inputmode='text' name='carbs' id='carbs' type='text' placeholder='80 g' />
										</IonItem>

										<IonItem>
											<IonLabel position='floating'>
												{FavList.foodIcons.bacon.icon}
												{LablesList.FoodDiary.create.fat.af}
											</IonLabel>
											<IonInput inputmode='text' name='fat' id='fat' type='text' placeholder='16 g' />
										</IonItem>

										<IonItem>
											<IonLabel position='floating'>
												{FavList.foodIcons.egg.icon}
												{LablesList.FoodDiary.create.protein.af}
											</IonLabel>
											<IonInput inputmode='text' name='protein' id='protein' type='text' placeholder='33 g' />
										</IonItem>

										<IonItem>
											<IonLabel position='floating'>
												{FavList.foodIcons.carrot.icon}
												{LablesList.FoodDiary.create.fibre.af}
											</IonLabel>
											<IonInput inputmode='text' name='fiber' id='fiber' type='text' placeholder='4 g' />
										</IonItem>

										<IonItem>
											<IonLabel position='floating'>
												{FavList.foodIcons.candy.icon}
												{LablesList.FoodDiary.create.sugar.af}
											</IonLabel>
											<IonInput inputmode='text' name='sugar' id='sugar' type='text' placeholder='20 g' />
										</IonItem>
									</IonCol>

									<IonCol>
										<IonItem>
											<IonLabel position='floating'>
												{FavList.foodIcons.lemon.icon}
												{LablesList.FoodDiary.create.sod.af}
											</IonLabel>
											<IonInput inputmode='text' name='sodium' id='sodium' type='text' placeholder='400 mg' />
										</IonItem>

										<IonItem>
											<IonLabel position='floating'>{LablesList.FoodDiary.create.port.af}</IonLabel>
											<IonInput inputmode='text' name='portionQuantity' id='portionQuantity' type='text' placeholder='100 g' />
										</IonItem>

										<IonItem>
											<IonLabel position='floating'>
												{FavList.other.fire.icon} {LablesList.FoodDiary.create.cal.af}
											</IonLabel>
											<IonInput inputmode='text' name='calories' id='calories' type='text' placeholder='500 kCal' />
										</IonItem>
									</IonCol>
								</IonRow>

								<IonRow>
									<IonCol></IonCol>
									<IonCol>
										<IonButton color='secondary' type='submit'>
											{LablesList.OptionsBtn.ok.af}
										</IonButton>

										<IonButton color='tertiary'>
											<IonRouterLink color='dark' routerLink={'/foodDiary'} routerDirection='none'>
												{LablesList.OptionsBtn.cancel.af}
											</IonRouterLink>
										</IonButton>
									</IonCol>
									<IonCol></IonCol>
								</IonRow>
							</IonGrid>
						</form>
					</IonCard>
				</IonContent>
			</IonPage>
		);
	}
}

export default CreateFoodView;
