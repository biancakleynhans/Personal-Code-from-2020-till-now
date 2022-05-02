import React, { Component } from 'react';
import { IonPage, IonContent, IonHeader, IonCard } from '@ionic/react';
import PageHeader from '../../../../layout/Headers/PageHeader';
import CreateAGroupPost from './006CreateAGroupPost';
import ViewGroupPosts from './007ViewGroupPosts';
import { Translate } from '../../../../services/translate/TranslateServices';
import { lsInj } from '../../../../services/translate/LocalLangDict';
import { BookImgs } from '../../../../layout/BooksForLibrary/images/0ExportBookImgs';

export class GroupChatLandingPage extends Component {
	render() {
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={Translate(lsInj.transDict.chatHeader)} />
					</IonHeader>

					<br />
					<br />
					<br />
					<img src={BookImgs.title} alt='title' />
					<CreateAGroupPost />
					<br />
					<IonCard>
						<iframe
							width='300'
							height='250'
							src='https://www.youtube.com/embed/b8VoUYtx0kw'
							// frameborder='0'
							allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
							// allowfullscreen
						></iframe>
					</IonCard>

					<br />
					<br />
					<ViewGroupPosts />
				</IonContent>
			</IonPage>
		);
	}
}

export default GroupChatLandingPage;
