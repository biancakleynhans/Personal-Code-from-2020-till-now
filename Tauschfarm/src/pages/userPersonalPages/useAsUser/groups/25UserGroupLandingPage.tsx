import React, { Component } from 'react';
import { IonPage, IonContent, IonGrid, IonRow, IonToolbar, IonHeader, IonCol, IonCard, IonCardTitle, IonCardSubtitle, IonCardHeader } from '@ionic/react';
import PageHeader from '../../../../layout/Headers/PageHeader';
import { convertObjectToArray } from '../../../../services/ownServices/ConverterFuncs';
import { connect } from 'react-redux';
import { Translate } from '../../../../services/translate/TranslateServices';
import { lsInj } from '../../../../services/translate/LocalLangDict';
import { IAppState } from '../../../../services/redux/reduxModels';

function sortByTextAsc(a: any, b: any) {
	if (a.name !== undefined && b.name !== undefined) {
		const diff = a.name.toLowerCase().localeCompare(b.name.toLowerCase());
		return -1 * diff;
	} else return 1;
}

function sortByTextDsc(a: any, b: any) {
	if (a.name !== undefined && b.name !== undefined) {
		const diff = a.name.toLowerCase().localeCompare(b.name.toLowerCase());
		return -1 * -diff;
	} else return 1;
}

interface iState {
	sortAtrr: boolean;
	dispAtrr: boolean;
}

class UserGroupLandingPage extends Component<any, iState> {
	constructor(props: any) {
		super(props);
		this.state = {
			sortAtrr: false,
			dispAtrr: false
		};
	}

	show() {
		var returnArry: JSX.Element[] = [];
		const { goupsUser } = this.props;
		if (goupsUser.length > 0) {
			// console.log('goupsUser', goupsUser, this.state.sortAtrr);
			this.state.sortAtrr ? goupsUser.sort(sortByTextAsc) : goupsUser.sort(sortByTextDsc);

			goupsUser.map((group: any) => {
				returnArry.push(
					<IonCol size='6' key={group.name + group.id}>
						<IonCard button={true} routerLink={`/groups/dashboard/${group.id}`}>
							<img style={{ width: '100%', height: '120px' }} src={group.avatar} alt='broken' />
							<IonCardHeader>
								<IonCardTitle style={{ fontSize: '1.1em' }}>{group.name}</IonCardTitle>
								{/* {convertObjectToArray(group.membersList).length > 0 &&
									convertObjectToArray(group.membersList)
										.slice(0, 3)
										.map((mem) => {
											// console.log('Mem', mem);
											return (
												<IonAvatar style={{ display: 'inline-block' }} key={mem.avatar}>
													<img style={{ width: '25px', height: '25px' }} src={mem.avatar} alt='img' />
												</IonAvatar>
											);
										})} */}
								<IonCardSubtitle style={{ fontSize: '0.9em' }}>
									{group.memberCount > 0 ? group.memberCount : 0} {Translate(lsInj.transDict.Members)}
								</IonCardSubtitle>
							</IonCardHeader>
						</IonCard>
					</IonCol>
				);
				return returnArry;
			});
			return returnArry;
		} else {
			return <IonCard>{Translate(lsInj.transDict.noContent)}</IonCard>;
		}
	}

	render() {
		const { loading } = this.props;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} />
						{/* titleString={Translate(lsInj.transDict.GroupSettings)} */}
					</IonHeader>{' '}
					<br />
					<br />
					<br />
					{!loading && (
						<>
							{' '}
							<IonToolbar
								color='primary'
								style={{
									borderRadius: '200px',
									width: '300px',
									marginLeft: '25px',
									marginTop: '10px'
								}}>
								{Translate(lsInj.transDict.groupAdmin)}
							</IonToolbar>
							<IonGrid>
								<IonRow>{this.show()}</IonRow>
							</IonGrid>
						</>
					)}
					{loading && <IonCard>{Translate(lsInj.transDict.loadingGroups)}</IonCard>}
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	// console.log('UserGroupLandingPage');
	return {
		goupsUser: convertObjectToArray(state.groups.UserGroups),
		loading: state.user.isEmpty
	};
};

export default connect(mapStateToProps)(UserGroupLandingPage);
