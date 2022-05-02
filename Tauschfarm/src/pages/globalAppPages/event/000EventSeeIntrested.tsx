import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IonPage, IonContent, IonHeader } from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';
import { NamedDict } from '../../../services/helpers/Tools';
import { i_BaseInterface_Member } from '../../../models/001UserModels';
import { convertObjectToArray } from '../../../services/ownServices/ConverterFuncs';
import MembersList from '../../../layout/AppComponents/MembersList';
import { IAppState } from '../../../services/redux/reduxModels';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';

interface iState {
	members: NamedDict<i_BaseInterface_Member>;
}

class EventSeeIntrested extends Component<any, iState> {
	constructor(props: any) {
		super(props);

		this.state = {
			members: {}
		};

		const { intrest, globalUsers } = this.props;
		const intrestKeys: string[] = intrest !== undefined ? Object.keys(intrest) : [];
		// console.log('intrest', intrest);
		// console.log('globalUsers', globalUsers);
		// console.log('intrestKeys', intrestKeys);

		var mems: NamedDict<i_BaseInterface_Member> = {};

		intrestKeys.forEach((key) => {
			// console.log('????', globalUsers[key]);
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
		const intrestedPeople = this.state.members !== undefined ? convertObjectToArray(this.state.members) : [];

		return (
			<IonPage>
				<IonContent>
					<IonHeader>
						<PageHeader backBtn={true} />
					</IonHeader>

					<MembersList members={intrestedPeople} title={Translate(lsInj.transDict.intrestEvent)} />
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
	// console.log('state', ownProps.match.params.eventId, state.user.events[ownProps.match.params.eventId].counts.intrestedAdded);
	// console.log('global users', state.globalUsers);

	return {
		intrest: state.user.events[ownProps.match.params.eventId] !== undefined ? state.user.events[ownProps.match.params.eventId].counts.intrestedAdded : {},
		globalUsers: state.globalUsers.GlobalUsers
	};
};

export default connect(mapStateToProps)(EventSeeIntrested);
