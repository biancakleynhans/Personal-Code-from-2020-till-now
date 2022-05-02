/** @format */

import React from 'react';
import { RouteComponentProps } from 'react-router';
import moment from 'moment';
import { FormikProps, withFormik } from 'formik';
import { IonPage, IonContent, IonCard, IonItem, IonLabel, IonButton, IonDatetime } from '@ionic/react';
import { iEditTimePeriod, FormPropsFast } from '../../models/FastModels';
import { LablesList } from '../../components/titleLists/Titles';
import { Update, Get } from '../../services/firebase/ConectToServer';
import { TypesToServer } from '../../services/firebase/TypesToServer';
import PageHeader from '../../components/layout/PageHeader';

interface IProps extends RouteComponentProps<{ id: string; fast: string }> {}
interface IStates {
	id: string;
	fast: any;
}

export default class FastEditPage extends React.Component<IProps, IStates> {
	constructor(props: any) {
		super(props);
		this.state = {
			id: this.props.match.params.id,
			fast: {
				startTime: '',
				endTime: '',
				duration: 0,
				typeofFast: {
					lengthofFast: 18,
					name: '18:6',
					nonFastingTime: 6
				}
			}
		};

		Get(`Fast/${this.props.match.params.id}`)
			.then(snapshot => {
				console.log('snap', snapshot.val());
				return snapshot.val();
			})
			.then(data => {
				console.log('data', data);
				var fast = {
					startTime: data.startTime,
					endTime: data.endTime,
					duration: data.duration,
					typeofFast: {
						lengthofFast: data.typeofFast.lengthofFast,
						name: data.typeofFast.name,
						nonFastingTime: data.typeofFast.nonFastingTime
					}
				};

				this.setState({ fast: fast });
			});
	}

	InnerFormFast = (props: FormikProps<iEditTimePeriod>) => {
		const { values, handleChange, handleBlur, handleSubmit } = props;

		function startChange(e: any) {
			// console.log('Clicked!', e.detail.value)

			values.startTime = new Date(e.detail.value);
			// console.log('Select end onChange',values.startTime);
			handleChange(e);
			handleBlur(e);
		}

		function endChange(e: any) {
			// console.log('Clicked!', e)
			values.endTime = new Date(e.detail.value);
			// console.log('Select end onChange',values.endTime);

			handleChange(e);
			handleBlur(e);
		}

		return (
			<form onSubmit={handleSubmit}>
				<IonItem>
					<IonLabel position='floating'>
						{LablesList.FastPages.fastEdit.start.af}: {moment(new Date(this.state.fast.startTime)).format('lll')}
					</IonLabel>

					<IonDatetime displayFormat='D MMM YYYY H:mm' value={values.startTime.toString()} onIonChange={e => startChange(e)} />
				</IonItem>

				<IonItem>
					<IonLabel position='floating'>
						{LablesList.FastPages.fastEdit.end.af}: {moment(new Date(this.state.fast.endTime)).format('lll')}
					</IonLabel>

					<IonDatetime displayFormat='D MMM YYYY H:mm' value={values.endTime.toString()} onIonChange={e => endChange(e)} />
				</IonItem>

				<IonButton color='primary' type='submit'>
					{LablesList.OptionsBtn.submitBtn.af}
				</IonButton>
				<IonButton color='primary' type='button' onClick={() => window.location.replace('/fastHistory')}>
					{LablesList.OptionsBtn.cancel.af}
				</IonButton>
			</form>
		);
	};

	EditItemForm = withFormik<FormPropsFast, iEditTimePeriod>({
		mapPropsToValues: () => ({
			id: this.state.id,
			startTime: this.state.fast.startTime,
			endTime: this.state.fast.endTime,
			duration: this.state.fast.duration,
			typeofFast: this.state.fast.typeofFast
		}),

		handleSubmit({ id, startTime, endTime, duration, typeofFast }: iEditTimePeriod) {
			var start = new Date(endTime).getTime();
			var end = new Date(startTime).getTime();
			duration = (start - end) / 3600000;

			// console.log( id,startTime,endTime,duration, typeofFast, "FormValues");

			const obj = { startTime, endTime, duration, typeofFast };
			console.log('Udate Obj', obj);
			// UpdateFast(id, obj)
			Update(TypesToServer.Fast, id, obj);
		}
	})(this.InnerFormFast);

	render() {
		// console.log(this.state, 'what do i get');
		return (
			<IonPage style={{ textAlign: 'center' }}>
				<PageHeader titleString={LablesList.Page_Header_Names.FastEdit.af} />
				<IonContent>
					<IonCard>
						<this.EditItemForm></this.EditItemForm>
					</IonCard>
				</IonContent>
			</IonPage>
		);
	}
}
