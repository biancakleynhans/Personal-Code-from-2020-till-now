import React, { Component } from 'react';
import { IonPage, IonContent, IonHeader } from '@ionic/react';
import { IAppState } from '../../../../services/redux/reduxModels';
import { connect } from 'react-redux';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { CombinedString } from '../../../../services/translate/CombinedStrings';
import { TypesToFirebaseGlobals } from '../../../../services/firebase/TypesToServer';
import ImgEditView from '../../../../layout/AppComponents/ImgEditView';
import { i_BaseInterface_Item } from '../../../../models/006ItemModels';

export class UserEditItemImg extends Component<any, any> {
	render() {
		const { user, itemFromPreview, imgIndex, use } = this.props;
		console.log('????????????', use);
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={CombinedString.ItemEditImg} />
					</IonHeader>{' '}
					<br />
					<br />
					<br />
					<ImgEditView
						imgIndex={imgIndex}
						userId={user.id}
						userLang={user.lang}
						user={itemFromPreview}
						userOrGroup={use}
						imgType={'item'}
						folderType={TypesToFirebaseGlobals.FBStorage_ItemImgs}
					/>
				</IonContent>
			</IonPage>
		);
	}
}
const mapStateToProps = (state: IAppState, ownProps: any) => {
	console.log('UserEditItemImg ', ownProps);

	const GI = ownProps.match.params.groupId !== undefined ? ownProps.match.params.groupId : ownProps.match.params.userOrGroup;
	console.log('GI', GI);

	const Cname = ownProps.match.params.catname;
	const Iid = ownProps.match.params.itemname;
	const imgIndex = ownProps.match.params.imgIndex;

	// console.log('???? new props', whoUse, use, currentItems);
	// console.log('Cname', Cname);
	// console.log('Iname', Iid);

	var Item = {} as i_BaseInterface_Item | undefined;

	const use = GI === 'user' ? 'user' : 'group'; //GI !== 'NotGroup' ? 'group' : 'user';
	console.log('use', use);

	const whoUse = use === 'group' ? (state.groups.UserGroups[GI] !== undefined ? state.groups.UserGroups[GI] : state.user) : state.user;
	console.log('whoUse', whoUse);

	if (imgIndex === undefined || Cname !== undefined) {
		const currentItems = whoUse.categories[Cname].items;
		Item = currentItems ? currentItems[Iid] : undefined;
	} else {
		Item = state.item;
		Item.id = ownProps.match.params.idOfUserOrGroup;
		Item.imgArray = state.item.pendingImgUrl;
		Item.avatar = state.item.pendingImgUrl[0];
	}

	console.log('Item', Item);

	return {
		item: state.item,
		itemFromPreview: Item,
		itemIidToMove: Iid,
		itemCatToRemoveFrom: Cname,
		user: whoUse !== undefined ? whoUse : state.user,
		use: GI !== 'NotGroup' ? use : 'user',
		imgIndex // index of img
	};
};

export default connect(mapStateToProps)(UserEditItemImg);
