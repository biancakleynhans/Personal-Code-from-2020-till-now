import React, { Component } from 'react';
import { IonPage, IonContent, IonHeader, IonList, IonItem, IonLabel, IonIcon } from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';
import { logoYoutube, logoFacebook, logoTiktok, logoWhatsapp } from 'ionicons/icons';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import pic from '../../../components/media/otherImages/000.png';
import { BookImgs } from '../../../layout/BooksForLibrary/images/0ExportBookImgs';

export class ExternalLinks extends Component {
	render() {
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={Translate(lsInj.transDict.Links)} />
					</IonHeader>
					<br />
					<br />
					<br />

					<img src={BookImgs.title} alt='title' />
					<IonList>
						<IonItem href='https://www.youtube.com/channel/UC92LO_bdBPxW94J7pou07sg'>
							<IonLabel>Youtube</IonLabel>
							<IonIcon icon={logoYoutube} />
						</IonItem>

						<IonItem href='https://www.facebook.com/groups/koebaaivetnoi'>
							<IonLabel>Facebook</IonLabel>
							<IonIcon icon={logoFacebook} />
						</IonItem>

						<IonItem href='https://www.tiktok.com/@talita.inspire'>
							<IonLabel>Tik Tok</IonLabel>
							<IonIcon icon={logoTiktok} />
						</IonItem>

						<IonItem href='https://wa.me/27650347492'>
							<IonLabel>WhatsApp</IonLabel>
							<IonIcon icon={logoWhatsapp} />
						</IonItem>
					</IonList>

					<img style={{ width: '400px', height: '400px' }} src={pic} alt='broken' />
				</IonContent>
			</IonPage>
		);
	}
}

export default ExternalLinks;
