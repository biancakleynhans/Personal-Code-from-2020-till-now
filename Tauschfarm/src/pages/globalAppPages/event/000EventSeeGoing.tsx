import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../../services/redux/reduxModels';
import { IonPage, IonContent, IonHeader } from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';
import { NamedDict } from '../../../services/helpers/Tools';
import { i_BaseInterface_Member } from '../../../models/001UserModels';
import { convertObjectToArray } from '../../../services/ownServices/ConverterFuncs';
import MembersList from '../../../layout/AppComponents/MembersList';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';

interface iState {
	members: NamedDict<i_BaseInterface_Member>;
}

class EventSeeGoing extends Component<any, iState> {
	constructor(props: any) {
		super(props);

		this.state = {
			members: {}
		};

		const { going, globalUsers } = this.props;
		const goingKeys: string[] = going !== undefined ? Object.keys(going) : [];
		// console.log('going', going);
		// console.log('globalUsers', globalUsers);
		// console.log('goingKeys', goingKeys);

		var mems: NamedDict<i_BaseInterface_Member> = {};

		goingKeys.forEach((key) => {
			//the user going matches global user
			if (globalUsers[key]) {
				mems = {
					...mems,
					[key]: {
						name: globalUsers[key].name,
						avatar: globalUsers[key].avatar,
						id: globalUsers[key].id
					}
				};

				// console.log('mems', mems);

				this.setState({ members: mems });
			}
		});
	}

	render() {
		// console.log('state', this.state.members);

		const goingPeople = convertObjectToArray(this.state.members);
		return (
			<IonPage>
				<IonContent>
					<IonHeader>
						<PageHeader backBtn={true} />
					</IonHeader>

					<MembersList members={goingPeople} title={Translate(lsInj.transDict.goingEvent)} />
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	// console.log('state', ownProps.match.params.eventId, state.user.events[ownProps.match.params.eventId].counts.goingAdded);
	// console.log('global users', state.globalUsers);

	return {
		going: state.user.events[ownProps.match.params.eventId] !== undefined ? state.user.events[ownProps.match.params.eventId].counts.goingAdded : {},
		globalUsers: state.globalUsers.GlobalUsers
	};
};

export default connect(mapStateToProps)(EventSeeGoing);
