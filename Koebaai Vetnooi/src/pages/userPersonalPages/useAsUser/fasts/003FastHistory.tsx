import React from 'react';
import { IonGrid, IonPage, IonContent, IonCard, IonRow, IonCol, IonRouterLink, IonHeader, IonSlides, IonSlide } from '@ionic/react';
import moment from 'moment';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { Translate } from '../../../../services/translate/TranslateServices';
import { lsInj } from '../../../../services/translate/LocalLangDict';
import { connect } from 'react-redux';
import { IAppState } from '../../../../services/redux/ReduxModels';
import { convertObjectToArray } from '../../../../services/ownServices/ConverterFuncs';

interface iState {
	lenghtOfFD: number;
	longestFastlength: number;
	shortesFastlength: number;
	averageFastlength: number;
	lof: any[];
	dof: any[];
	labels: any[];
}

class FastHistoryPage extends React.Component<any, iState> {
	slideOpts = {
		initialSlide: 0,
		speed: 300,
		effect: 'flip', // "slide", "fade", "cube", "coverflow" or "flip"
		centeredSlides: true
	};
	constructor(props: any) {
		super(props);
		const { lenghtOfFD, longestFastlength, shortesFastlength, averageFastlength, lof, dof, labels } = this.props;

		this.state = {
			lenghtOfFD: lenghtOfFD,
			longestFastlength: longestFastlength,
			shortesFastlength: shortesFastlength,
			averageFastlength: averageFastlength,
			lof: lof,
			dof: dof,
			labels: labels
		};
	}

	componentDidUpdate(prevprops: any) {
		if (prevprops !== this.props) {
			this.setState({
				lenghtOfFD: this.props.lenghtOfFD,
				longestFastlength: this.props.longestFastlength,
				shortesFastlength: this.props.shortesFastlength,
				averageFastlength: this.props.averageFastlength,
				lof: this.props.lof,
				dof: this.props.dof,
				labels: this.props.labels
			});
		}
	}

	render() {
		const { fastHistoryData } = this.props;
		return (
			<IonPage style={{ textAlign: 'center' }}>
				<IonContent scrollEvents={true}>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={Translate(lsInj.transDict.FastHistory)} />
					</IonHeader>
					<br /> <br />
					<br />
					<IonCard style={{ color: 'var(--ion-text-color)' }} className='ion-card-padding'>
						<IonGrid>
							<IonRow>
								<IonCol>
									{Translate(lsInj.transDict.donefastHistory)} <br /> {this.state.lenghtOfFD}
								</IonCol>
								<IonCol>
									{Translate(lsInj.transDict.avgfastHistory)} <br /> {isNaN(this.state.averageFastlength) ? 0 : this.state.averageFastlength.toFixed(2)} h
								</IonCol>
							</IonRow>
							<IonRow>
								<IonCol>
									{Translate(lsInj.transDict.longfastHistory)} <br /> {this.state.longestFastlength !== Infinity ? this.state.longestFastlength.toFixed(2) : 0} h
								</IonCol>
								<IonCol>
									{Translate(lsInj.transDict.shortfastHistory)}
									<br /> {this.state.shortesFastlength.toFixed(2)} h
								</IonCol>
							</IonRow>
						</IonGrid>
					</IonCard>
					<br />
					<IonSlides pager={true} options={this.slideOpts}>
						{fastHistoryData.map((item: any, index: number) => {
							// console.log(item.id);
							return (
								<IonSlide key={index}>
									<IonCard style={{ color: 'var(--ion-text-color)', padding: '10px' }} color='primary'>
										<IonRouterLink color='dark' routerLink={`/fastEdit/${item.id}`} routerDirection='none'>
											{moment(item.startTime).format('Do MMMM, h:mm a')}
											<br />
											{moment(item.endTime).format('Do MMMM, h:mm a')} <br />
											{item.duration.toFixed(2)} H <br />
											{item.typeofFast.name} <br />
											{Translate(lsInj.transDict.changefastHistory)}
										</IonRouterLink>
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
	var lenghtOfFD = 0;
	var lof: any[] = [];
	var dof: any[] = [];
	var labels: any[] = [];

	const useArr = convertObjectToArray(state.fast.Fasts).sort((a, b) => Number(b.id) - Number(a.id));
	console.log('useArr', useArr);

	useArr.map((fast) => {
		lof.push(+fast.typeofFast.lengthofFast);
		dof.push(+fast.duration.toFixed(2));
		for (let index = 0; index < useArr.length; index++) {
			lenghtOfFD = lenghtOfFD + 1;
			labels.push('');
			return labels;
		}
		return { lof, dof, labels };
	});

	var sorted = useArr.sort((a, b) => a.duration - b.duration);
	var smallest = sorted[0];
	var largest = sorted[sorted.length - 1];

	var avg =
		sorted.length &&
		sorted.reduce((s, c) => {
			s += c.duration;
			return s;
		}, 0) / sorted.length;

	// console.log('useArr', useArr);
	// console.log('lenghtOfFD', lenghtOfFD); //amount of fasts
	// console.log('lof', lof);
	// console.log('dof', dof);
	// console.log('labels', labels);
	return {
		user: state.user,
		lenghtOfFD: lenghtOfFD,
		longestFastlength: (largest && largest.duration) || 0,
		shortesFastlength: (smallest && smallest.duration) || 0,
		averageFastlength: avg,
		lof: lof,
		dof: dof,
		labels: labels,
		fastHistoryData: convertObjectToArray(state.fast.Fasts).sort((a, b) => Number(b.id) - Number(a.id))
	};
};

export default connect(mapStateToProps)(FastHistoryPage);
