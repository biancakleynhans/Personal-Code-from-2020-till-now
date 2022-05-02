import React, { Component, Dispatch } from 'react';
import { IonItem, IonLabel, IonPage, IonContent, IonHeader, IonCheckbox, IonButton } from '@ionic/react';
import { Translate } from '../../../../services/translate/TranslateServices';
import { lsInj } from '../../../../services/translate/LocalLangDict';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { connect } from 'react-redux';
import { IAppState } from '../../../../services/redux/ReduxModels';
import { Daycontent } from '../../../../models/002OwnerModels';
import { NamedDict } from '../../../../services/helpers/Tools';
import { convertObjectToArray } from '../../../../services/ownServices/ConverterFuncs';
import { Owner_UpdateWorkDays } from '../../../../services/redux/actions/OwnerActions';
import { RedirectTo } from '../../../../layout/Loading_Redirecting/CommonUIServices';
import { AllRoutesListed } from '../../../../routes/AllRoutesListed';

interface iState {
	workdays: string[];
	week: NamedDict<Daycontent>;
}

class SelectDays extends Component<any, iState> {
	constructor(props: any) {
		super(props);
		const { user } = this.props;
		this.state = {
			workdays: user.workData.daysOfwork,
			week: {
				Monday: { en: 'Monday', de: 'Montag', value: 'Monday', selected: false },
				Tuesday: { en: 'Tuesday', de: 'Dienstag', value: 'Tuesday', selected: false },
				Wednesday: { en: 'Wednesday', de: 'Mittwoch', value: 'Wednesday', selected: false },
				Thursday: { en: 'Thursday', de: 'Donnerstag', value: 'Thursday', selected: false },
				Friday: { en: 'Friday', de: 'Freitag', value: 'Friday', selected: false },
				Saturday: { en: 'Saturday', de: 'Samstag', value: 'Saturday', selected: false },
				Sunday: { en: 'Sunday', de: 'Sonntag', value: 'Sunday', selected: false },
			},
		};

		user.workData.daysOfwork.forEach((day: string) => {
			if (this.state.week[day]) {
				console.log('match', day, this.state.week[day]);
				this.state.week[day].selected = true;
			}
		});
	}

	componentDidUpdate(prevProps: any) {
		if (prevProps.user.workData.daysOfwork !== this.props.user.workData.daysOfwork) {
			this.props.user.workData.daysOfwork.forEach((day: string) => {
				if (this.state.week[day]) {
					this.setState({
						week: {
							...this.state.week,
							[day]: {
								...this.state.week[day],
								selected: true,
							},
						},
					});
				}
			});
		}
	}

	setWeek(e: any) {
		console.log('e', e);

		this.setState({
			week: {
				...this.state.week,
				[e.detail.value]: {
					...this.state.week[e.detail.value],
					selected: e.detail.checked,
				},
			},
		});

		var dupArr = this.state.workdays;
		const removeAt = dupArr.indexOf(e.detail.value);

		if (e.detail.checked) {
			console.log('add to workdays array this sting', e.detail.value);
			dupArr.push(e.detail.value);
			console.log('dupArr', dupArr);
			this.setState({ workdays: dupArr });
		}
		if (!e.detail.checked) {
			console.log('remove  from workdays array this sting', e.detail.value);
			dupArr.splice(removeAt, 1);
			console.log('dupArr', dupArr);
			this.setState({ workdays: dupArr });
		}
	}

	done() {
		const { user } = this.props;
		var senddata1 = {
			id: user.id,
			workArr: this.state.workdays,
		};

		this.props.updateOwnerWorkDays(senddata1);
		RedirectTo(AllRoutesListed.ownerRoutes.dashLanding);
	}

	render() {
		const { user } = this.props;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={Translate(lsInj.transDict.Days)} />
					</IonHeader>
					<br />
					<br />
					<br />

					{convertObjectToArray(this.state.week).map((day, i) => (
						<IonItem key={i}>
							<IonLabel>{user.lang === 'en' ? day.en : day.de}</IonLabel>
							<IonCheckbox slot='start' value={day.value} checked={this.state.week[day.value].selected} onIonChange={(e) => this.setWeek(e)} />
						</IonItem>
					))}

					<IonButton onClick={() => this.done()}>{Translate(lsInj.transDict.Done)}</IonButton>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	// console.log('dash props:', state.user.categories);
	return {
		user: state.owner.owner,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		updateOwnerWorkDays: (updateData: any) => dispatch(Owner_UpdateWorkDays(updateData)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectDays);
