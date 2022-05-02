import React, { Component } from 'react';
import { IonPage, IonContent, IonHeader, IonFooter, IonSlides } from '@ionic/react';
import { connect } from 'react-redux';
import { IAppState } from '../../../services/redux/ReduxModels';
import PageHeader from '../../../layout/Headers/PageHeader';
import HomeSkeletonScreen from '../../../layout/Loading_Redirecting/SkeletonScreen';
import PageFooter from '../../../layout/Headers/PageFooter';
import { SlideInside1, SlideInside4, SlideInside5, SlideInside6, SlideInside7, SlideInside8, SlideInside9 } from '../../../layout/HomePageLayout/Content_Home_Slider';

const slideOpts = {
	initialSlide: 0,
	speed: 400,
	slidesPerView: window.innerWidth > 900 ? 4 : 1,
};

class HomePage extends Component<any, any> {
	render() {
		const { user } = this.props;
		const isAdmin = user.role !== undefined ? (user.role === 'admin' ? true : false) : false;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader menuBtn={true} recBtn={true} bookBtn={true} emoBtn={true} chatGroupBtn={true} adminBtn={isAdmin} />
					</IonHeader>
					<br />
					<br />
					<br />

					{!this.props.loading && (
						<>
							<IonSlides pager={true} options={slideOpts}>
								<SlideInside1 />
								<SlideInside8 />
								<SlideInside4 />
								<SlideInside5 />
								<SlideInside6 />
								<SlideInside7 />
								<SlideInside9 />
							</IonSlides>
						</>
					)}

					{this.props.loading && <HomeSkeletonScreen />}

					<IonFooter>
						<PageFooter />
					</IonFooter>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	// console.log('home state:', state);

	return {
		user: state.user,
		loading: state.user.isEmpty,
	};
};

export default connect(mapStateToProps)(HomePage);
