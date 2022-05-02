import React, { Component } from 'react';
import { IonPage, IonContent, IonHeader, IonCard, IonCardContent } from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';

export class About extends Component {
	render() {
		return (
			<IonPage>
				<IonContent fullscreen>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString='About Us' />
					</IonHeader>
					<br />
					<br />
					<br />
					<IonCard style={{ color: 'var(--ion-text-color)' }}>
						<IonCardContent style={{ color: 'var(--ion-text-color)', textAlign: 'left' }}>
							Gewigsverlies : voorbeeld spyskaarte en resepte van Koebaai Vetnoi. <br />
							Kos dagboek, <br />
							Bybelstudie uit Koebaai Vetnoi argief : <br />
							Sluit jou spens toe en oop jou gebedskamer. <br />
							Emosionele Rehabiltasie kaartjies voorbeelde <br />
							Talita Inspireer vlog. <br />
							Links na al ons sosiale media bladsye. <br />
							Aansluitings prosedure by Koebaai Vetnoi. <br />
							Bekendstelling aan ons aanlyn winkel. <br />
							<br />
							<b>LET WEL DIE APP IS SLEGS N MINI WEERGAWE VAN KOEBAAI VETNOI EN NIE DIE HELE PROGRAM NIE.</b>
							<br />
							Koebaai Vetnoi se volle betaalde weergawe kan aangekoop word deur ons agente en bestaan uit die volgende: <br />
							<b>Watergat</b>: Klets kamer waar ons water drink en mekaar ondersteun en inweeg elke Sondag oggend tussen 6am en 9am. <br />
							<b>Kombuis</b>: met Toelaatbare kos lys en resepte <br />
							<b>Klaskamer</b>: Volle Kursus getiteld n piekniek saam met die Heilige Gees 10 Modules. <br />
							<b>Smelt</b>: Oefen studio met videos <br />
							<b>Kerk</b>: Christelike aanlyn kerk Talita Inspireer potgooi. <br />
							<b>Flickvlooi</b>: Toegang tot Talita se gunsteling flieks 2000 flieks
							<br />
							<b>Biblioteek</b>: Toegang tot Talita se argief van Eboeke 2000 Eboeke
							<br />
							<b>Radio</b>: Toegang tot Talita se argief van musiek 2000 Liedjies
							<br />
							<b>Opgedollie</b>: Aanlyn skoonheids salon wenke Boutique: Ruil klere uit soos jy gewig verloor <br />
							<b>Insomnia</b>: Bybel meditasie <br />
							<b>Vetnoi Kiekie kuns</b>: Leer om jou selfoon te gebruik om profesionele fotos te neem. <br />
							<b>Om aan te sluit by ons volle program kliek op die link om ons direk te kan WhatsApp</b>
							: <br /> <br />
							<br />
							<a href='https://wa.me/27650347492'>https://wa.me/27650347492</a>
							<br />
						</IonCardContent>
					</IonCard>
				</IonContent>
			</IonPage>
		);
	}
}

export default About;
