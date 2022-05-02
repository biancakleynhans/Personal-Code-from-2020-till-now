/** @format */

import React, { Component } from 'react';
import { IonPage, IonContent, IonCard, IonTitle, IonButton, IonRouterLink } from '@ionic/react';
import PageHeader from '../../components/layout/PageHeader';
import { LablesList } from '../../components/titleLists/Titles';
import ReactHtmlParser from 'react-html-parser';
import { RouteComponentProps } from 'react-router';
import { GetBookFromServer } from '../../services/firebase/ConectToServer';
import { TypesToServer } from '../../services/firebase/TypesToServer';
import '../../components/documentUploader/display.css';
import { FavList } from '../../components/icons/FaviconList';

interface iProps extends RouteComponentProps<{ book: any }> {}
interface iState {
	book: any;
}

export class BookOpened extends Component<iProps, iState> {
	constructor(props: any) {
		super(props);

		this.state = {
			book: undefined
		};

		console.log('props', this.props.match.params.book);

		GetBookFromServer(TypesToServer.Books.KoebaaiVetnoi, this.props.match.params.book).then(snapshot => {
			console.log('snapshot.val()', snapshot.val());
			this.setState({ book: snapshot.val() });
		});
	}
	render() {
		console.log('book', this.props.match.params.book);
		return (
			<IonPage style={{ textAlign: 'center' }}>
				<PageHeader titleString={LablesList.Page_Header_Names.Libary.book.af} />
				<IonContent>
				<IonButton color='light'>
						<IonRouterLink routerLink={'/books'} routerDirection='none'>
							{FavList.menuIcons.book.icon} Terug na Biblioteek 
						</IonRouterLink>
					</IonButton>
					<IonCard color='primary'>
						{' '}
						{this.state.book !== undefined ? (
							ReactHtmlParser(this.state.book)
						) : (
							<>
								<IonTitle>Besag om boek te laai</IonTitle>
							</>
						)}
					</IonCard>
					
				</IonContent>
			</IonPage>
		);
	}
}

export default BookOpened;
