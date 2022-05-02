import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../../../services/redux/reduxModels';
import { IonPage, IonContent, IonHeader, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText, IonGrid, IonRow, IonCol, IonCardSubtitle, IonButton } from '@ionic/react';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { Translate } from '../../../../services/translate/TranslateServices';
import { lsInj } from '../../../../services/translate/LocalLangDict';
import { convertObjectToArray } from '../../../../services/ownServices/ConverterFuncs';
import { i_BaseInterface_Category } from '../../../../models/002CatagoryModels';
import { GroupDelete } from '../../../../services/redux/actions/GroupActions/100GroupRequestsAction';

export class UserDeleteGroup extends Component<any> {
	delGroup() {
		const { groupDel, userId } = this.props;
		if (groupDel.split('-')[0] === userId) {
			if (window.confirm(Translate(lsInj.transDict.delGroup))) {
				console.log('user is allowed to delete and confiremd to delete ');
				var delData = {
					userId: userId,
					groupId: groupDel
				};
				this.props.delGroup(delData);
				window.location.replace('/dashboard/groups');
			} else {
				console.log('user is allowed to delete but did not confirm to delete ');
				window.history.back();
			}
		} else {
			alert(Translate(lsInj.transDict.noPermission));
			console.log('user is not  allowed to delete');
			window.history.back();
		}
	}
	render() {
		const { groupDetails, loading } = this.props;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} />
					</IonHeader>
					<br />
					<br />
					<br />
					{!loading && (
						<>
							<IonCard>
								<IonCardHeader>
									<IonCardTitle>{Translate(lsInj.transDict.delGroupHeader)}</IonCardTitle>
								</IonCardHeader>
								<IonCardContent>
									<img style={{ width: '100%' }} src={groupDetails.avatar} alt='Broken' />
									<IonCardTitle>{groupDetails.name}</IonCardTitle>
									<IonText style={{ margin: '20px', fontSize: 'large' }}>{groupDetails.description}</IonText>
									<IonGrid>
										<IonRow>
											{convertObjectToArray(groupDetails.categories).map((cat: i_BaseInterface_Category, index) => {
												return (
													<IonCol size='6' key={index}>
														<IonCard>
															<img style={{ width: '100%', height: '150px' }} src={cat.avatar} alt='broken'></img>

															<IonCardContent>
																<IonCardTitle style={{ fontSize: '1em' }}>{cat?.name}</IonCardTitle>
																<IonCardSubtitle style={{ fontSize: '0.9em' }}>
																	{convertObjectToArray(cat.items).length} {Translate(lsInj.transDict.itemMultiple)}
																</IonCardSubtitle>
															</IonCardContent>
														</IonCard>
													</IonCol>
												);
											})}
										</IonRow>
									</IonGrid>
								</IonCardContent>
							</IonCard>

							<IonButton onClick={() => this.delGroup()}>{Translate(lsInj.transDict.Delete)}</IonButton>
						</>
					)}
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	const param = ownProps.match.params.groupname;
	const group = state.groups.UserGroups[param];
	console.log('UserDeleteGroup', param);
	console.log('comp', group);
	return {
		userId: state.user.id,
		groupDel: param,
		groupDetails: group,
		loading: state.user.isEmpty
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		delGroup: (reqData: { userId: string; groupId: string }) => dispatch(GroupDelete(reqData))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDeleteGroup);
