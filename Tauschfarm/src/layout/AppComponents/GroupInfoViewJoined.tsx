import React, { Component, Dispatch } from 'react';
import { IonToolbar, IonTitle, IonItem, IonIcon, IonLabel, IonText, IonButton, IonGrid, IonRow, IonCol, IonAvatar } from '@ionic/react';
import { peopleCircleOutline } from 'ionicons/icons';
import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';
import { connect } from 'react-redux';
import { User_ReqToJoin_Group } from '../../services/redux/actions/userActions/006GroupsActions';
import CreateAGroupPost from '../../pages/userPersonalPages/useAsGroupAdmin/006CreateAGroupPost';
import ViewGroupPosts from '../../pages/userPersonalPages/useAsGroupAdmin/007ViewGroupPosts';
import ShareFab from '../Buttons/ShareFab';
import { IAppState } from '../../services/redux/reduxModels';

class GroupInfoViewJoined extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			openModal: false,
			showCats: false,
			showTimeLine: true
		};
	}

	renderGroup() {
		return (
			<>
				<img style={{ display: 'block', height: '400px', width: '400px' }} src={this.props.group.avatar} alt='Broken' />
				<IonToolbar className='rounding'>
					<IonTitle>{this.props.group.name}</IonTitle>
				</IonToolbar>

				<IonItem lines='none' button routerLink={`/members/${this.props.owner.id}/${this.props.user.id}`}>
					<IonAvatar class='avatar'>
						<img src={this.props.owner.avatar} alt='broken' />
					</IonAvatar>
					<IonLabel>{this.props.owner.name}</IonLabel>
				</IonItem>

				<IonItem lines='none' button={true} routerLink={`/group/${this.props.group.id}/members`}>
					<IonIcon icon={peopleCircleOutline}></IonIcon>
					<IonLabel class='ion-text-wrap'>
						{this.props.group.memberCount} {Translate(lsInj.transDict.Members)}
					</IonLabel>
				</IonItem>
				<IonText style={{ margin: '20px', fontSize: 'large' }}>{this.props.group.description}</IonText>
				<br />
				<br />
				<br />
				<ShareFab
					titleProp={Translate(lsInj.transDict.checkgroup)}
					descProp={this.props.group.description}
					imageProp={this.props.group.avatar}
					partFallback={`groups/selectedGroup/${this.props.group.id}`}
				/>
				<br />
				<br />
				<IonButton fill='outline' color='primary' routerLink={`/groups/selectedGroup/${this.props.group.id}/categories`}>
					{Translate(lsInj.transDict.AllCatMultiple)}
				</IonButton>

				<IonButton
					fill='outline'
					color='primary'
					onClick={() => {
						return this.setState({ showAdd: !this.state.showAdd });
					}}>
					{Translate(lsInj.transDict.AddAPost)}
				</IonButton>

				<br />

				{this.state.showAdd && <CreateAGroupPost groupId={this.props.group.id} />}
				{/* Show time line here of all posts  */}
				<ViewGroupPosts groupId={this.props.group.id} />
			</>
		);
	}

	render() {
		// console.log('GroupInfoView props', this.props);
		// const { lang } = this.props;
		var windowSize = window.innerWidth;
		//console.log('windowSize', windowSize);
		return (
			<>
				{windowSize < 400 && <>{this.renderGroup()}</>}

				{windowSize > 800 && (
					<IonGrid>
						<IonRow>
							<IonCol size='4'></IonCol>
							<IonCol size='4'>{this.renderGroup()}</IonCol>
							<IonCol size='4'></IonCol>
						</IonRow>
					</IonGrid>
				)}
			</>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	return {
		lang: state.user.lang
	};
};
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		joinGroupReq: (reqData: any) => dispatch(User_ReqToJoin_Group(reqData))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupInfoViewJoined);
