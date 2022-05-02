import React, { Component } from 'react';
import { IonPage, IonContent, IonHeader, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import { IAppState } from '../../../services/redux/reduxModels';
import { connect } from 'react-redux';

export class LandingPage extends Component<any> {
	render() {
		return (
			<IonPage>
				<IonContent>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} />
					</IonHeader>
					<br />
					<br />
					<br />
					<IonCard>
						<IonCardHeader>
							<IonCardTitle>{Translate(lsInj.transDict.TC1)}</IonCardTitle>
						</IonCardHeader>
						<IonCardContent style={{ textAlign: 'left' }}>
							Allgemeine Geschäftsbedingungen für die Nutzung von Tauschfarm www.tauschfarm.com (Anne Strohfeldt, Werner-Kube-Straße 4, 10407 Berlin Germany) Die AGB regeln das
							Vertragsverhältnis zwischen Tauschfarm und deren Mitglieder. Dies sind natürliche und juristische Personen, die den Tauschservice und die zugehörigen Dienste nutzen.
							<br />
							<br />
							<b>
								§ 1 Tauschfarm <br />
							</b>
							Tauschfarm bietet auf www.tauschfarm.com einen Service an, mit dem Artikel getauscht werden können. Beim Anbieten dieser Artikel ist insbesondere § 8 zu beachten. Mit
							jedem Tauschvorgang wird ein Vertrag unmittelbar zwischen zwei Mitgliedern geschlossen: dem Anbieter eines Artikels und dem Mitglied, das den Artikel anfordert.
							Tauschfarm ist an den abgeschlossenen Verträgen nicht beteiligt und stellt lediglich die Plattform für das Tauschsystem zur Verfügung. Die Vertragserfüllung erfolgt
							daher ausschließlich zwischen den Mitgliedern.
							<br />
							<br />
							<b>§ 2 Registrierung</b>
							<br />
							Zur Nutzung der Tauschfarm App ist eine Registrierung erforderlich, die kostenlos ist und auch die Zustimmung zu diesen AGB beinhaltet. Mit der Registrierung kommt
							ein Vertrag zwischen Tauschfarm und dem Mitglied über die Nutzung der Tauschfarm App zustande. Eine Registrierung ist nur juristischen Personen und unbeschränkt
							geschäftsfähigen natürlichen Personen erlaubt. Insbesondere Minderjährigen ist eine Anmeldung untersagt. Jeder Person ist nur eine Registrierung gestattet. Die
							Registrierungsdaten sind vollständig und korrekt anzugeben. Die Registrierung einer juristischen Person darf nur von einer vertretungsberechtigten natürlichen Person
							vorgenommen werden, die namentlich genannt werden muss. Tritt nach der Registrierung eine Änderung der angegebenen Daten ein, so ist das Mitglied verpflichtet, seine
							Angaben umgehend zu korrigieren. Bei der Anmeldung wählt das Mitglied einen Mitgliedsnamen ("Pseudonym") und ein Passwort. Dieses ist geheim zu halten, um jeglichen
							Missbrauch zu vermeiden. Bei Verdacht auf Missbrauch ist Tauschfarm unverzüglich zu informieren.
							<br />
							<br />
							<b>§ 3 Gegenstand und Umfang des Nutzungsvertrags</b>
							<br />
							Die Nutzung von Tauschfarm sowie der Umfang, in dem einzelne Funktionen und Services verfügbar sind, können von Tauschfarm an bestimmte Randbedingungen geknüpft
							werden. Hierzu gehören beispielsweise die Korrektheit der Registrierungsdaten oder Zahlungsnachweise im Falle kostenpflichtiger Dienstleistungen. Der Anspruch des
							Mitglieds auf Nutzung der App Tauschfarm und ihrer Funktionen kann nicht zu 100 % garantiert werden, eine dem Stand der Technik entsprechende Verfügbarkeit ist jedoch
							angestrebt. Zeitweilige Beschränkungen können sich durch technische Störungen, beispielsweise durch Software- oder Hardwarefehler ergeben. Tauschfarm behält sich
							weiterhin das Recht vor, seine Leistungen bei Bedarf zeitweilig einzuschränken. Die Mitglieder werden per E-Mail über Tauschanfragen, individuelle Suchanfragen und
							Neuerungen bei Tauschfarm informiert.
							<br />
							<br />
							<b>§ 4 Widerruf und Kündigung</b>
							<br />
							Das Mitglied hat das Recht, die Zustimmung zu diesen Geschäftsbedingungen innerhalb von zwei Wochen nach der Registrierung zu widerrufen. In diesem Fall ist das
							Mitglied nicht mehr an die AGB für die Nutzung der Tauschfarm App // www.tauschfarm.com gebunden. Laufende Transaktionen müssen jedoch auch bei rechtzeitig erfolgtem
							Widerruf entsprechend den Nutzungsbedingungen abgewickelt werden. Das Mitglied kann den Nutzungsvertrag jederzeit kündigen, sobald alle Transaktionen beendet sind.
							Widerruf und Kündigung müssen schriftlich an admin@tauschfarm.com gesendet werden. Tauschfarm kann die Mitgliedschaft mit einer Frist von 4 Wochen zum Monatsende
							kündigen, hierbei bleibt das Recht zur Sperrung erhalten.
							<br />
							<br />
							<b>§ 5 Sperrung</b>
							<br />
							Tauschfarm kann ein Mitglied sperren oder dessen Nutzungsrechte einschränken, wenn gegen die Interessen von Tauschfarm oder anderer Mitglieder verstoßen wird,
							insbesondere wenn Artikel offensichtlich fehlerhaft eingestellt wurden oder nicht in Besitz des Mitglieds sind anstößige oder rechtswidrige Begriffe als Pseudonym
							verwendet werden bei der Anmeldung fehlerhafte Angaben gemacht wurden versucht wurde, sich mehrfach zu registrieren im Zusammenhang mit seiner Nutzung der App
							Tauschfarm Rechte Dritter verletzt wurden Leistungen von Tauschfarm missbraucht werden gegen die Regularien in der Timeline verstoßen wird gegen die
							Einstellrichtlinien verstoßen wird offene Zahlungen/Forderungen nicht beglichen werden
							<br />
							Wurde ein Mitglied gesperrt, so darf dieses Mitglied die App Tauschfarm nicht mehr nutzen und sich nicht erneut anmelden.
							<br />
							<br />
							<b>§ 6 Kosten und Gebühren</b>
							<br />
							kostenlos
							<br />
							<br />
							<b>§ 7 Verbotene Artikel</b>
							<br />
							Es ist grundsätzlich verboten, Artikel zum Tausch anzubieten, deren Angebot, Vertrieb oder Erwerb gegen gesetzliche Vorschriften oder gegen die guten Sitten
							verstoßen. Darüberhinausgehend dürfen Artikel, die gegen die Einstellrichtlinien verstoßen, weder beschrieben noch zum Tausch angeboten werden. Tauschfarm behält sich
							vor, bei schwerwiegenden Verstößen rechtliche <b> Schritt </b>e gegen die Anbieter einzuleiten.
							<br />
							<br />
							<b>§ 8 Vertragsabschluss</b>
							<br />
							Mit der Einstellung eines Artikels auf der App gibt das Mitglied ein verbindliches Angebot zum Vertragsschluss über diesen Artikel ab und erklärt sich bereit, den
							Artikel zu versenden. Alle durch die Nutzung der Tauschfarm App erhaltenen Adressen dürfen ausschließlich für den Tauschvorgang genutzt werden. Es ist insbesondere
							untersagt, diese Daten an Dritte weiterzugeben oder für Werbezwecke zu nutzen. Für den Versand gelten die unter § 9 beschriebenen zeitlichen Randbedingungen.
							<br />
							<br />
							<b>
								§ 9 Zeitrahmen für Versand <br />
							</b>
							Jeder Tausch sollte so schnell wie möglich abgewickelt werden. Folgende zeitliche Begrenzungen sind zu beachten: Wenn ein Anbieter eine Tauschanfrage erhält, sollte
							er diese innerhalb von sieben Tagen bestätigen. Nach Ablauf dieser 7-Tage-Frist erfolgt ein Tauschabbruch. Nach Abgabe der Tauschbestätigung muss der angeforderte
							Artikel spätestens innerhalb von zwei Wochen (14 Tage) beim Empfänger eintreffen.
							<br />
							<br />
							<b>§ 10 Zuwiderhandlungen</b>
							<br />
							Bei Zuwiderhandlungen (siehe § 5 "Sperrung" und § 7 "Verbotene Artikel") behält sich Tauschfarm vor, das Mitglied zu sperren und Schadensersatz zu fordern. Der
							Schadenersatz beträgt pauschal 50,00 € für die mit der Sperrung in Zusammenhang stehenden Aufwände. Im Falle von Schadenersatzforderungen ist das gesperrte Mitglied
							berechtigt nachzuweisen, dass geringere Aufwändungen entstanden sind.
							<br />
							<b>§ 11 Freistellung</b>
							<br />
							Das Mitglied stellt Tauschfarm von sämtlichen Ansprüchen frei, die andere Mitglieder oder sonstige Dritte gegenüber Tauschfarm geltend machen wegen Verletzung ihrer
							Rechte durch von dem Mitglied eingestellte Angebote und Inhalte oder wegen dessen sonstiger Nutzung. Das Mitglied übernimmt hierbei auch die Kosten der notwendigen
							Rechtsverteidigung von Tauschfarm einschließlich sämtlicher Gerichts- und Anwaltskosten. Dies gilt nicht, soweit die Rechtsverletzung von dem Mitglied nicht zu
							vertreten ist.
							<br />
							<br />
							<b>§ 12 Haftungsbeschränkung</b>
							<br />
							Gegenüber Unternehmern haftet Tauschfarm für Schäden, außer im Fall der Verletzung wesentlicher Vertragspflichten, nur, wenn und soweit Tauschfarm seinen gesetzlichen
							Vertretern oder leitenden Angestellten Vorsatz oder grobe Fahrlässigkeit zur Last fällt. Für sonstige Erfüllungsgehilfen haftet Tauschfarm nur bei Vorsatz und soweit
							diese wesentlichen Vertragspflichten vorsätzlich oder grob fahrlässig verletzen. Außer bei Vorsatz oder grober Fahrlässigkeit gesetzlicher Vertreter, leitender
							Angestellter oder vorsätzlichen Verhaltens sonstiger Erfüllungsgehilfen von Tauschfarm besteht keine Haftung für den Ersatz mittelbarer Schäden, insbesondere für
							entgangenen Gewinn. Außer bei Vorsatz und grober Fahrlässigkeit von Tauschfarm, deren gesetzlichen Vertreter und leitenden Angestellten, ist die Haftung auf den bei
							Vertragsschluss typischerweise vorhersehbaren Schaden begrenzt. Gegenüber Verbrauchern haftet Tauschfarm nur für Vorsatz und grobe Fahrlässigkeit. Im Falle der
							Verletzung wesentlicher Vertragspflichten, des Schuldnerverzugs oder der von Tauschfarm zu vertretender Unmöglichkeit der Leistungserbringung haftet Tauschfarm jedoch
							für jedes schuldhafte Verhalten seiner Mitarbeiter und Erfüllungsgehilfen. Außer bei Vorsatz und/oder grober Fahrlässigkeit von gesetzlichen Vertretern, Mitarbeitern
							und sonstigen Erfüllungsgehilfen ist die Haftung von Tauschfarm der Höhe nach auf die bei Vertragsschluss typischerweise vorhersehbaren Schäden begrenzt. Die
							vorgenannten Haftungsausschlüsse und Beschränkungen gegenüber Unternehmern oder Verbrauchern gelten nicht im Fall der Übernahme ausdrücklicher Garantien durch
							Tauschfarm und für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit sowie im Fall zwingender gesetzlicher Regelungen.
							<br />
							<br />
							<b>§ 13 Schriftform, anwendbares Recht und Gerichtsstand</b>
							<br />
							Sämtliche Erklärungen, die im Rahmen des mit Tauschfarm abzuschließenden Nutzungsvertrags übermittelt werden, müssen in Schriftform erfolgen. Die postalische
							Anschrift von Tauschfarm ist: Anne Strohfeldt, Werner-Kube-Straße 4, 10407 Berlin Germany oder auf www.tauschfarm.com abrufbar.
							<br />
							Die postalische Anschrift eines Mitglieds ist diejenige, die als aktuelle Kontaktdaten im Mitgliedskonto des Mitglieds von diesem angegeben wurden. Soweit der Nutzer
							Unternehmer ist, unterliegt der Nutzungsvertrag einschließlich dieser AGB dem materiellen Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
							Soweit der Nutzer Verbraucher ist, unterliegen der Nutzungsvertrag und die AGB dem Recht der Bundesrepublik Deutschland, soweit dem keine zwingenden gesetzlichen
							Vorschriften, insbesondere Verbraucherschutzvorschriften entgegenstehen. Sofern es sich bei dem Mitglied um einen Kaufmann im Sinne des Handelsgesetzbuchs, ein
							öffentlich-rechtliches Sondervermögen oder eine juristische Person des öffentlichen Rechts handelt, ist Karlsruhe ausschließlicher Gerichtsstand für alle aus dem
							Nutzungsvertrag und diesen AGB entstehenden Streitigkeiten.
							<br />
							<br />
							<b>§ 14 Änderung dieser AGB, Salvatorische Klausel</b>
							<br />
							Tauschfarm behält sich vor, diese AGB jederzeit und ohne Nennung von Gründen zu ändern. Die geänderten Bedingungen werden dem Mitglied per E- Mail spätestens zwei
							Wochen vor ihrem Inkrafttreten zugesendet. Widerspricht das Mitglied der Geltung der neuen AGB nicht innerhalb von zwei Wochen nach Empfang der E-Mail, gelten die
							geänderten AGB als angenommen. Tauschfarm wird dem Mitglied in der E-Mail, welche die geänderten Bedingungen enthält, auf die Bedeutung dieser Zweiwochenfrist
							gesondert hinweisen. Sofern eine Bestimmung dieser AGB unwirksam ist, bleiben die übrigen Bestimmungen davon unberührt. Die unwirksame Bestimmung gilt als durch eine
							solche ersetzt, die dem Sinn und Zweck der unwirksamen Bestimmung in rechtswirksamer Weise wirtschaftlich am nächsten kommt. Gleiches gilt für eventuelle
							Regelungslücken.
							<br />
							<br />
						</IonCardContent>
					</IonCard>
				</IonContent>
			</IonPage>
		);
	}
}

const mapStateToProps = (state: IAppState) => {
	return {
		lang: state.user.lang
	};
};

export default connect(mapStateToProps)(LandingPage);
