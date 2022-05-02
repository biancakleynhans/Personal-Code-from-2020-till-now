/** @format */

import React, { Component } from 'react';
import { IonSlides } from '@ionic/react';
import { IonSlide, IonCard } from '@ionic/react';
import WaterdisplayData from './WaterdisplayData';

import { JanuarieSvg, FebuarieSvg, MarchSvg, AprilSvg, MaySvg, JuneSvg, JulySvg, AugSvg, SeptemberSvg, OctoberSvg, NovemberSvg, DecemberSvg, IndexSvg } from './CompleteMonthSvg';
import { NamedDict } from '../../../services/helpers/Tools';
import { connect } from 'react-redux';
import { IAppState } from '../../../services/redux/ReduxModels';
import { convertObjectToArray } from '../../../services/ownServices/ConverterFuncs';

interface monthData {
	year: number;
	month: number;
	perday: NamedDict<{ totalWater: number }>;
}
interface iState {
	Jan: monthData;
	Feb: monthData;
	March: monthData;
	April: monthData;
	May: monthData;
	June: monthData;
	July: monthData;
	Aug: monthData;
	Sept: monthData;
	Oct: monthData;
	Nov: monthData;
	Dec: monthData;
}

function setUpdateDisplaydata(data: any[]) {
	const blank = { year: 0, month: 0, perday: { 1: { totalWater: 0 } } };

	var jan = blank;
	var feb = blank;
	var march = blank;
	var april = blank;
	var may = blank;
	var june = blank;
	var july = blank;
	var aug = blank;
	var sept = blank;
	var oct = blank;
	var nov = blank;
	var dec = blank;

	data.map((obj) => {
		// console.log('obj', obj);
		jan = obj.month === 1 ? obj : { year: 2020, month: 1, perday: { 1: { totalWater: 0 } } };
		feb = obj.month === 2 ? obj : { year: 2020, month: 2, perday: { 1: { totalWater: 0 } } };
		march = obj.month === 3 ? obj : { year: 2020, month: 3, perday: { 1: { totalWater: 0 } } };
		april = obj.month === 4 ? obj : { year: 2020, month: 4, perday: { 1: { totalWater: 0 } } };
		may = obj.month === 5 ? obj : { year: 2020, month: 5, perday: { 1: { totalWater: 0 } } };
		june = obj.month === 6 ? obj : { year: 2020, month: 6, perday: { 1: { totalWater: 0 } } };
		july = obj.month === 7 ? obj : { year: 2020, month: 7, perday: { 1: { totalWater: 0 } } };
		aug = obj.month === 8 ? obj : { year: 2020, month: 8, perday: { 1: { totalWater: 0 } } };
		sept = obj.month === 9 ? obj : { year: 2020, month: 9, perday: { 1: { totalWater: 0 } } };
		oct = obj.month === 10 ? obj : { year: 2020, month: 10, perday: { 1: { totalWater: 0 } } };
		nov = obj.month === 11 ? obj : { year: 2020, month: 11, perday: { 1: { totalWater: 0 } } };
		dec = obj.month === 12 ? obj : { year: 2020, month: 12, perday: { 1: { totalWater: 0 } } };

		return {
			jan,
			feb,
			march,
			april,
			may,
			june,
			july,
			aug,
			sept,
			oct,
			nov,
			dec
		};
	});

	return {
		jan,
		feb,
		march,
		april,
		may,
		june,
		july,
		aug,
		sept,
		oct,
		nov,
		dec
	};
}

class SliderMonthsDisplay extends Component<any, iState> {
	slideOpts = {
		initialSlide: this.props.startAt,
		speed: 300,
		updateOnWindowResize: true,
		setWrapperSize: true,
		autoHeight: true,
		effect: 'coverflow', // "slide", "fade", "cube", "coverflow" or "flip"
		centeredSlides: true,
		grabCursor: true,
		preloadImages: true,
		updateOnImagesReady: true
	};

	constructor(props: any) {
		super(props);
		var dataArr = convertObjectToArray(this.props.waterConsumed);
		var dataM = WaterdisplayData(dataArr);
		const gotThis = setUpdateDisplaydata(dataM);
		this.state = {
			Jan: gotThis.jan,
			Feb: gotThis.feb,
			March: gotThis.march,
			April: gotThis.april,
			May: gotThis.may,
			June: gotThis.june,
			July: gotThis.july,
			Aug: gotThis.aug,
			Sept: gotThis.sept,
			Oct: gotThis.oct,
			Nov: gotThis.nov,
			Dec: gotThis.dec
		};
	}

	componentDidUpdate(prevProps: any) {
		if (prevProps.waterConsumed !== this.props.waterConsumed) {
			var dataArr = convertObjectToArray(this.props.waterConsumed);
			var dataM = WaterdisplayData(dataArr);
			const gotThis = setUpdateDisplaydata(dataM);

			this.setState({
				Jan: gotThis.jan,
				Feb: gotThis.feb,
				March: gotThis.march,
				April: gotThis.april,
				May: gotThis.may,
				June: gotThis.june,
				July: gotThis.july,
				Aug: gotThis.aug,
				Sept: gotThis.sept,
				Oct: gotThis.oct,
				Nov: gotThis.nov,
				Dec: gotThis.dec
			});
		}
	}

	render() {
		return (
			<IonSlides pager={true} options={this.slideOpts}>
				<IonSlide>
					<IonCard style={{ color: 'var(--ion-text-color)' }} color='medium'>
						<IndexSvg />
					</IonCard>
				</IonSlide>

				<IonSlide>
					<IonCard style={{ color: 'var(--ion-text-color)' }} color='medium'>
						<JanuarieSvg year={this.state.Jan.year} month={1} perday={this.state.Jan.perday} />
					</IonCard>
				</IonSlide>

				<IonSlide>
					<IonCard style={{ color: 'var(--ion-text-color)' }} color='medium'>
						<FebuarieSvg year={this.state.Feb.year} month={2} perday={this.state.Feb.perday} />
					</IonCard>
				</IonSlide>

				<IonSlide>
					<IonCard style={{ color: 'var(--ion-text-color)' }} color='medium'>
						<MarchSvg year={this.state.March.year} month={3} perday={this.state.March.perday} />
					</IonCard>
				</IonSlide>

				<IonSlide>
					<IonCard style={{ color: 'var(--ion-text-color)' }} color='medium'>
						<AprilSvg year={this.state.April.year} month={4} perday={this.state.April.perday} />
					</IonCard>
				</IonSlide>

				<IonSlide>
					<IonCard style={{ color: 'var(--ion-text-color)' }} color='medium'>
						<MaySvg year={this.state.May.year} month={5} perday={this.state.May.perday} />
					</IonCard>
				</IonSlide>

				<IonSlide>
					<IonCard style={{ color: 'var(--ion-text-color)' }} color='medium'>
						<JuneSvg year={this.state.June.year} month={6} perday={this.state.June.perday} />
					</IonCard>
				</IonSlide>

				<IonSlide>
					<IonCard style={{ color: 'var(--ion-text-color)' }} color='medium'>
						<JulySvg year={this.state.July.year} month={7} perday={this.state.July.perday} />
					</IonCard>
				</IonSlide>

				<IonSlide>
					<IonCard style={{ color: 'var(--ion-text-color)' }} color='medium'>
						<AugSvg year={this.state.Aug.year} month={8} perday={this.state.Aug.perday} />
					</IonCard>
				</IonSlide>

				<IonSlide>
					<IonCard style={{ color: 'var(--ion-text-color)' }} color='medium'>
						<SeptemberSvg year={this.state.Sept.year} month={9} perday={this.state.Sept.perday} />
					</IonCard>
				</IonSlide>

				<IonSlide>
					<IonCard style={{ color: 'var(--ion-text-color)' }} color='medium'>
						<OctoberSvg year={this.state.Oct.year} month={10} perday={this.state.Oct.perday} />
					</IonCard>
				</IonSlide>

				<IonSlide>
					<IonCard style={{ color: 'var(--ion-text-color)' }} color='medium'>
						<NovemberSvg year={this.state.Nov.year} month={11} perday={this.state.Nov.perday} />
					</IonCard>
				</IonSlide>

				<IonSlide>
					<IonCard style={{ color: 'var(--ion-text-color)' }} color='medium'>
						<DecemberSvg year={this.state.Dec.year} month={12} perday={this.state.Dec.perday} />
					</IonCard>
				</IonSlide>
			</IonSlides>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	// console.log('????', state.waterDiary.WaterDiary);
	return {
		user: state.user,
		waterConsumed: state.waterDiary.WaterDiary
	};
};

export default connect(mapStateToProps)(SliderMonthsDisplay);
