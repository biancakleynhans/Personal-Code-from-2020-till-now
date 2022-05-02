import React from 'react';
import moment from 'moment';
import { IonContent, IonPage, IonCard, IonHeader, IonSlides, IonSlide } from '@ionic/react';
import { IAppState } from '../../../../services/redux/ReduxModels';
import { connect } from 'react-redux';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { Translate } from '../../../../services/translate/TranslateServices';
import { lsInj } from '../../../../services/translate/LocalLangDict';
import { convertObjectToArray } from '../../../../services/ownServices/ConverterFuncs';

class WeightHistory extends React.Component<any> {
	slideOpts = {
		initialSlide: 0,
		speed: 300,
		effect: 'flip', // "slide", "fade", "cube", "coverflow" or "flip"
		centeredSlides: true
	};

	render() {
		const { weight } = this.props;

		return (
			<IonPage style={{ textAlign: 'center' }}>
				<IonContent className='ion-padding'>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={Translate(lsInj.transDict.WeightHistory)} />
					</IonHeader>
					<br /> <br /> <br />
					<IonSlides pager={true} options={this.slideOpts}>
						{weight.map((item: any, index: number) => {
							return (
								<IonSlide key={index}>
									<IonCard key={item.id} style={{ padding: '10px', width: '200px', height: '150px' }} color='primary'>
										{moment(item.date).format('lll')}
										<br />
										<b>{Translate(lsInj.transDict.c_weight)}: </b>
										{item.weight} Kg <br />
										<b>{Translate(lsInj.transDict.bust)}:</b>
										{item.bust} cm <br />
										<b>{Translate(lsInj.transDict.middle)}:</b>
										{item.waist} cm <br />
										<b>{Translate(lsInj.transDict.hips)}:</b>
										{item.hip} cm <br />
										<b>{Translate(lsInj.transDict.thigh)}:</b>
										{item.thigh} cm <br />
										<b>{Translate(lsInj.transDict.arm)}:</b>
										{item.uperArm} cm <br />
									</IonCard>
								</IonSlide>
							);
						})}
					</IonSlides>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	console.log('????', state.weight.Weights);

	return {
		user: state.user,
		weight: convertObjectToArray(state.weight.Weights).sort((a, b) => Number(b.date) - Number(a.date))
	};
};

export default connect(mapStateToProps)(WeightHistory);
