import React, { Component } from 'react';
import { IonPage, IonContent, IonHeader } from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import AgentMarie from '../../../layout/BooksForAgents/AgentMarie';
import AgentAnita from '../../../layout/BooksForAgents/AgentAnita';
import AgentMache from '../../../layout/BooksForAgents/AgentMache';
import AgentDaphe from '../../../layout/BooksForAgents/AgentDaphe';
import AgentTalita from '../../../layout/BooksForAgents/AgentTalita';
import AgentThea from '../../../layout/BooksForAgents/AgentThea';

class AgentsStroies extends Component<any> {
	//marie anita daphne marche talita thea
	render() {
		console.log('props', this.props.match.params.agentName);
		const currentAgent = this.props.match.params.agentName;
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={Translate(lsInj.transDict.agentHeader)} />
					</IonHeader>
					<br />
					<br />
					<br />
					<br />
					{currentAgent === 'marie' && <AgentMarie />}
					{currentAgent === 'anita' && <AgentAnita />}
					{currentAgent === 'marche' && <AgentMache />}
					{currentAgent === 'daphne' && <AgentDaphe />}
					{currentAgent === 'talita' && <AgentTalita />}
					{currentAgent === 'thea' && <AgentThea />}
				</IonContent>
			</IonPage>
		);
	}
}

export default AgentsStroies;
