/** @format */

import React, { Component } from 'react';
import { IonSlides } from '@ionic/react';
import { IonSlide, IonCard } from '@ionic/react';
import WaterdisplayData from './WaterdisplayData';
import { NamedDict, convertObjectToArray } from '../../../helpers/Tools';
import { JanuarieSvg, FebuarieSvg, MarchSvg, AprilSvg, MaySvg, JuneSvg, JulySvg, AugSvg, SeptemberSvg, OctoberSvg, NovemberSvg, DecemberSvg, IndexSvg } from './CompleteMonthSvg';
import { Get } from '../../../services/firebase/ConectToServer';
import { TypesToServer } from '../../../services/firebase/TypesToServer';

// Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.

interface iProps {
	startAt: number;
}
interface iState {
	Jan: { year: number; month: number; perday: NamedDict<{ totalWater: number }> };
	Feb: { year: number; month: number; perday: NamedDict<{ totalWater: number }> };
	March: { year: number; month: number; perday: NamedDict<{ totalWater: number }> };
	April: { year: number; month: number; perday: NamedDict<{ totalWater: number }> };
	May: { year: number; month: number; perday: NamedDict<{ totalWater: number }> };
	June: { year: number; month: number; perday: NamedDict<{ totalWater: number }> };
	July: { year: number; month: number; perday: NamedDict<{ totalWater: number }> };
	Aug: { year: number; month: number; perday: NamedDict<{ totalWater: number }> };
	Sept: { year: number; month: number; perday: NamedDict<{ totalWater: number }> };
	Oct: { year: number; month: number; perday: NamedDict<{ totalWater: number }> };
	Nov: { year: number; month: number; perday: NamedDict<{ totalWater: number }> };
	Dec: { year: number; month: number; perday: NamedDict<{ totalWater: number }> };
}

class SliderMonthsDisplay extends Component<iProps, iState> {
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
		updateOnImagesReady: true,
	};

	constructor(props: any) {
		super(props);
		this.state = {
			Jan: { year: 0, month: 0, perday: { day: { totalWater: 0 } } },
			Feb: { year: 0, month: 0, perday: { day: { totalWater: 0 } } },
			March: { year: 0, month: 0, perday: { day: { totalWater: 0 } } },
			April: { year: 0, month: 0, perday: { day: { totalWater: 0 } } },
			May: { year: 0, month: 0, perday: { day: { totalWater: 0 } } },
			June: { year: 0, month: 0, perday: { day: { totalWater: 0 } } },
			July: { year: 0, month: 0, perday: { day: { totalWater: 0 } } },
			Aug: { year: 0, month: 0, perday: { day: { totalWater: 0 } } },
			Sept: { year: 0, month: 0, perday: { day: { totalWater: 0 } } },
			Oct: { year: 0, month: 0, perday: { day: { totalWater: 0 } } },
			Nov: { year: 0, month: 0, perday: { day: { totalWater: 0 } } },
			Dec: { year: 0, month: 0, perday: { day: { totalWater: 0 } } },
		};

		Get(TypesToServer.WaterDiary).then(snapshot => {
			console.log('res', snapshot.val());
			if (snapshot.val() === null) {
				console.log('no Data');
			}
			// if(res.status > 300){console.log("error", res.status)}

			if (snapshot.val() !== null) {
				var dataArr = convertObjectToArray(snapshot.val());
				// console.log("data", dataArr )
				var dataM = WaterdisplayData(dataArr);
				// console.log(`waterdisplaydatatransformed ${JSON.stringify(data,undefined,4)}`)
				console.log('data', dataM);

				// eslint-disable-next-line
				dataM.map((obj, index) => {
					var jan = obj.month === 1 ? obj : { year: 2020, month: 1, perday: { 1: { totalWater: 0 } } };
					var feb = obj.month === 2 ? obj : { year: 2020, month: 2, perday: { 1: { totalWater: 0 } } };
					var march = obj.month === 3 ? obj : { year: 2020, month: 3, perday: { 1: { totalWater: 0 } } };
					var april = obj.month === 4 ? obj : { year: 2020, month: 4, perday: { 1: { totalWater: 0 } } };
					var may = obj.month === 5 ? obj : { year: 2020, month: 5, perday: { 1: { totalWater: 0 } } };
					var june = obj.month === 6 ? obj : { year: 2020, month: 6, perday: { 1: { totalWater: 0 } } };
					var july = obj.month === 7 ? obj : { year: 2020, month: 7, perday: { 1: { totalWater: 0 } } };
					var aug = obj.month === 8 ? obj : { year: 2020, month: 8, perday: { 1: { totalWater: 0 } } };
					var sept = obj.month === 9 ? obj : { year: 2020, month: 9, perday: { 1: { totalWater: 0 } } };
					var oct = obj.month === 10 ? obj : { year: 2020, month: 10, perday: { 1: { totalWater: 0 } } };
					var nov = obj.month === 11 ? obj : { year: 2020, month: 11, perday: { 1: { totalWater: 0 } } };
					var dec = obj.month === 12 ? obj : { year: 2020, month: 12, perday: { 1: { totalWater: 0 } } };

					this.setState({ Jan: jan });
					this.setState({ Feb: feb });
					this.setState({ March: march });
					this.setState({ April: april });
					this.setState({ May: may });
					this.setState({ June: june });
					this.setState({ July: july });
					this.setState({ Aug: aug });
					this.setState({ Sept: sept });
					this.setState({ Oct: oct });
					this.setState({ Nov: nov });
					this.setState({ Dec: dec });
				});
			}
		});
	}

	render() {
		console.log('Slider State', this.state);
		return (
			<IonSlides pager={true} options={this.slideOpts}>
				<IonSlide>
					<IonCard color='light'>
						<IndexSvg />
					</IonCard>
				</IonSlide>

				<IonSlide>
					<IonCard color='light'>
						<JanuarieSvg year={this.state.Jan.year} month={1} perday={this.state.Jan.perday} />
					</IonCard>
				</IonSlide>

				<IonSlide>
					<IonCard color='light'>
						<FebuarieSvg year={this.state.Feb.year} month={2} perday={this.state.Feb.perday} />
					</IonCard>
				</IonSlide>

				<IonSlide>
					<IonCard color='light'>
						<MarchSvg year={this.state.March.year} month={3} perday={this.state.March.perday} />
					</IonCard>
				</IonSlide>

				<IonSlide>
					<IonCard color='light'>
						<AprilSvg year={this.state.April.year} month={4} perday={this.state.April.perday} />
					</IonCard>
				</IonSlide>

				<IonSlide>
					<IonCard color='light'>
						<MaySvg year={this.state.May.year} month={5} perday={this.state.May.perday} />
					</IonCard>
				</IonSlide>

				<IonSlide>
					<IonCard color='light'>
						<JuneSvg year={this.state.June.year} month={6} perday={this.state.June.perday} />
					</IonCard>
				</IonSlide>

				<IonSlide>
					<IonCard color='light'>
						<JulySvg year={this.state.July.year} month={7} perday={this.state.July.perday} />
					</IonCard>
				</IonSlide>

				<IonSlide>
					<IonCard color='light'>
						<AugSvg year={this.state.Aug.year} month={8} perday={this.state.Aug.perday} />
					</IonCard>
				</IonSlide>

				<IonSlide>
					<IonCard color='light'>
						<SeptemberSvg year={this.state.Sept.year} month={9} perday={this.state.Sept.perday} />
					</IonCard>
				</IonSlide>

				<IonSlide>
					<IonCard color='light'>
						<OctoberSvg year={this.state.Oct.year} month={10} perday={this.state.Oct.perday} />
					</IonCard>
				</IonSlide>

				<IonSlide>
					<IonCard color='light'>
						<NovemberSvg year={this.state.Nov.year} month={11} perday={this.state.Nov.perday} />
					</IonCard>
				</IonSlide>

				<IonSlide>
					<IonCard color='light'>
						<DecemberSvg year={this.state.Dec.year} month={12} perday={this.state.Dec.perday} />
					</IonCard>
				</IonSlide>
			</IonSlides>
		);
	}
}

export default SliderMonthsDisplay;
