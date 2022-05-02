import React, { Component, Dispatch } from 'react';
import { IonPage, IonContent, IonHeader } from '@ionic/react';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { connect } from 'react-redux';
import { User_Donations_Delete } from '../../../../services/redux/actions/userActions/004DonationsActions';
import { i_Redux_ActionFunc_Interface_Item_DeleteFrom_Donations } from '../../../../models/0003DonationModels';
import ItemView from '../../../../layout/AppComponents/ItemView';
import { IAppState } from '../../../../services/redux/reduxModels';

export class UserDonateItem extends Component<any, any> {
	render() {
		const { item } = this.props;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} />
					</IonHeader>
					<br />
					<br />
					<br />
					{item !== undefined && <ItemView groupID={''} catN={''} item={item} uOg={'user'} currentUser={this.props.user} showDonFab={true} showFab={false} />}
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	// console.log('UserDonateItem', state, ownProps);
	const Iname = ownProps.match.params.itemname;
	const current = state.donations ? state.user.donations[Iname] : {};
	// console.log('Got this', current);
	return {
		item: current,
		user: state.user
	};
};

const matchDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		deleteItem: (itemData: i_Redux_ActionFunc_Interface_Item_DeleteFrom_Donations) => dispatch(User_Donations_Delete(itemData))
	};
};

export default connect(mapStateToProps, matchDispatchToProps)(UserDonateItem);
