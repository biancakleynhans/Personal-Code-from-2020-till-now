import React, { Component, Dispatch } from 'react';
import { IonPage, IonContent, IonHeader, IonCard, IonCardHeader, IonButton, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/react';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { connect } from 'react-redux';
import { Translate } from '../../../../services/translate/TranslateServices';
import { lsInj } from '../../../../services/translate/LocalLangDict';
import { User_Donations_Delete } from '../../../../services/redux/actions/userActions/004DonationsActions';
import { IAppState } from '../../../../services/redux/reduxModels';
import { RedirectTo } from '../../../../layout/Loading_Redirecting/CommonUIServices';
import { AllRoutesListed } from '../../../../routes/AllRoutesListed';

export class UserDonationDelete extends Component<any> {
	delete() {
		const confirm = window.confirm(Translate(lsInj.transDict.delDonConfirm));
		if (confirm) {
			// console.log('yup user hates item');
			var data = {
				itemToMove: this.props.itemFromPreview
			};
			this.props.deleteItem(data);
			window.location.replace(AllRoutesListed.dontationRoutes.User_Dons_Landing);
		} else {
			// console.log('yup user cannot make up her mind');
			RedirectTo(AllRoutesListed.dontationRoutes.User_Dons_Landing);
		}
	}
	render() {
		const { itemFromPreview, lang } = this.props;

		const itemSize = lang === 'en' ? itemFromPreview?.size.en : itemFromPreview?.size.de;
		const itemBrand = lang === 'en' ? itemFromPreview?.brand.en : itemFromPreview?.brand.de;

		return (
			<IonPage>
				<IonContent>
					<IonHeader>
						<PageHeader backBtn={true} titleString='Delete Dontation Item' />
					</IonHeader>

					{itemFromPreview !== undefined && (
						<>
							<IonCard>
								<img style={{ width: '200px', height: '200px' }} src={itemFromPreview.avatar} alt='broken' />
								<IonCardHeader>
									<IonCardTitle>{Translate(lsInj.transDict.delItem)}: </IonCardTitle>
									<IonCardSubtitle>
										<b>{Translate(lsInj.transDict.Name)}</b>:{itemFromPreview.name}
									</IonCardSubtitle>
									<IonCardSubtitle>
										<b>{Translate(lsInj.transDict.Descript)}</b>:{itemFromPreview.description}
									</IonCardSubtitle>
								</IonCardHeader>
								<IonCardContent>
									<b>{Translate(lsInj.transDict.Brand)}</b>: {itemBrand} <br />
									<b>{Translate(lsInj.transDict.Size)}</b>: {itemSize} <br />
									<b>{Translate(lsInj.transDict.Color)}</b>: {itemFromPreview.color} <br />
									<b>{Translate(lsInj.transDict.Length)}</b>: {itemFromPreview.length} <br />
								</IonCardContent>
							</IonCard>

							<IonButton onClick={() => this.delete()}>{Translate(lsInj.transDict.Delete)}</IonButton>
						</>
					)}
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	// console.log('edit don', state, ownProps);
	const Iid = ownProps.match.params.itemId;
	const currentDons = state.user.donations;
	const Item = currentDons
		? currentDons[Iid]
		: {
				name: '',
				avatar: '',
				brand: { en: '', de: '' },
				size: { en: '', de: '' },
				description: '',
				color: '',
				length: ''
		  };

	// console.log('currentDons', currentDons);
	// console.log('Item', Item);
	return {
		user: state.user,
		itemFromPreview: Item,
		itemId: Iid,
		lang: state.user.lang
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		deleteItem: (data: any) => dispatch(User_Donations_Delete(data))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDonationDelete);
