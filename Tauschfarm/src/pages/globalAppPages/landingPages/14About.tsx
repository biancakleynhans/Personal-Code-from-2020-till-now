import React, { Component } from 'react';
import { IonPage, IonContent, IonHeader, IonCard, IonCardTitle, IonCardContent, IonCardHeader } from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import { AboutUsImages } from '../../../components/img/AboutIcons';

export class About extends Component {
	render() {
		return (
			<IonPage>
				<IonContent fullscreen>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={Translate(lsInj.transDict.About)} />
					</IonHeader>{' '}
					<br />
					<br />
					<br />
					<IonCard>
						<IonCardHeader>
							<img style={{ width: '115px', height: '115px', display: 'block' }} src={AboutUsImages.Info} alt='info' />
							<IonCardTitle color='primary' style={{ textAlign: 'left', fontWeight: '900', fontSize: '2em' }}>
								About us
							</IonCardTitle>
						</IonCardHeader>
						<IonCardContent style={{ textAlign: 'left', fontSize: '1.1em', fontFamily: 'inherit', color: 'black' }}>
							Hi, ich bin Anne Strohfeldt, komme aus Berlin und liebe Kleidungsstücke mit Geschichte. Vor allem romantische Blumenprints, ausgefallene Röcke und echte Vintage-Teile
							aus den Acht-zigern/Neunzigern haben es mir angetan. Ich kann mich gar nicht mehr daran erinnern, wann ich das letzte Mal in einem der großen Modehäuser war, um mir
							Klamotten von der Stange zu kaufen. Mich findest du eher auf Flohmärkten, in Secondhand-Läden oder auf Tauschpartys, wo ich immer auf der Suche nach neuen
							individuellen Styles mit dem gewissen Etwas bin.
						</IonCardContent>
						<img style={{ width: 'auto', height: 'auto', display: 'block' }} src={AboutUsImages.Banner} alt='banner' /> <br />
						<IonCardContent style={{ textAlign: 'left', fontSize: '1.1em', fontFamily: 'inherit', color: 'black' }}>
							Schon in meiner Kindheit wurde ich gelehrt, achtsam mit meiner Kleidung umzugehen und es wurde nie etwas weggeschmissen. Das Wort Upcycling kannte damals noch niemand
							&ndash; aber genau das wurde getan &ndash; aus dem alten Teil konnte mit etwas Kreativität ein neues Lieblingsteil entstehen. Das war halt damals so, und das war gut
							so! Nachhaltigkeit und Langlebigkeit bei meiner Kleidung ist mir nach wie vor enorm wichtig. Darum habe ich die App Tauschfarm ins Leben gerufen. Sie bietet eine
							Plattform für alle tauschbegeisterten Liebhaber von Kleidung, Schuhen und Accessoires.
						</IonCardContent>
						<IonCardHeader>
							<IonCardTitle color='primary' style={{ textAlign: 'left', fontSize: '1.5em' }}>
								Viel Spaß beim Tauschen!
							</IonCardTitle>
						</IonCardHeader>
						<IonCardHeader>
							<img style={{ width: '115px', height: '115px', display: 'block' }} src={AboutUsImages.Mission} alt='info' />
							<IonCardTitle color='primary' style={{ textAlign: 'left', fontWeight: '900', fontSize: '2em' }}>
								Vision und Mission
							</IonCardTitle>
						</IonCardHeader>
						<IonCardContent style={{ textAlign: 'left', fontSize: '1.1em', fontFamily: 'inherit', color: 'black' }}>
							Mit meiner App Tauschfarm möchte ich gemeinsam mit den Usern ein Zeichen setzen. Ein Zeichen gegen Billigkleidung, übermäßigen Konsum und die Wegwerfgesellschaft
							unserer Zeit. Dank Tauschfarm bietest du deinen Styles nicht nur die Plattform für ein neues Leben, sondern machst anderen auch noch eine große Freude. Jeder kennt
							das: Das Must-Have-Piece wird schnell mal zum Schrankhüter. Das kommt halt vor, kenne ich auch. Diese Fehlkäufe kannst du nun ganz easy auf Tauschfarm zum Tausch
							anbieten oder an andere User spenden. Durch den Vorteil der individuellen Gruppen nach Styles und Standorten gelingt es dir schnell und gezielt passende Tauschpartner
							zu finden. Mit Glück gelingt sogar eine persönliche Übergabe und das Tauschgeschäft kommt ohne Versandweg- und kosten aus. Win-win-Situation für dich und die Um-welt.
							Sei auch du dabei und schenke deiner Kleidung den gebührenden Respekt, den sie verdient!
						</IonCardContent>
						<IonCardHeader>
							<img style={{ width: '115px', height: '115px', display: 'block' }} src={AboutUsImages.Lightbulb} alt='info' />
							<IonCardTitle color='primary' style={{ textAlign: 'left', fontWeight: '900', fontSize: '2em' }}>
								Zur Gründung
							</IonCardTitle>
						</IonCardHeader>
						<img style={{ width: 'auto', height: 'auto', display: 'block' }} src={AboutUsImages.Timeline} alt='banner' /> <br />
						<IonCardContent style={{ textAlign: 'left', fontSize: '1.1em', fontFamily: 'inherit', color: 'black' }}>
							<b>Kindheit: </b>Schon früh Flohmärkte und Secondhand-Läden besucht. Klamotten von Familienmitgliedern weitergetragen. Upcycling - Das prägt fürs Leben! <br />
							<b>2015:</b> Umzug nach Berlin, Prenzlauer Berg. Ein wahres Paradies für tolle Trödel-Funde. <br />
							<b>Januar 2018:</b> Besuch meiner ersten Kleidertausch-Party, danach regelmäßiger Besuch dieser Partys <br />
							<b>Herbst 2019:</b> Die Idee zur App! Die kam mir als ich einmal echt enttäuscht von einer Tauschparty zurückkam: Die vermeintlichen Secondhand-Liebhaber entpuppten
							sich nämlich als Ramsch-Anbieter. Ich wollte es unbedingt besser machen. <br />
							Es folgte die Entwicklungsphase <br />
							<b>23.08.2020:</b> Gründung der Facebook-Gruppe Tauschfarm <br />
							<b>September 2020: </b>Tauschfarm geht live
						</IonCardContent>
					</IonCard>
				</IonContent>
			</IonPage>
		);
	}
}

export default About;
