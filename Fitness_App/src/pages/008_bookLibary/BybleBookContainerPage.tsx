/** @format */

import React, { Component } from 'react';
import { IonPage, IonContent, IonCard, IonGrid, IonRow, IonCol, IonRouterLink } from '@ionic/react';
import PageHeader from '../../components/layout/PageHeader';
import { LablesList } from '../../components/titleLists/Titles';
import { GetAllBooksFromServer } from '../../services/firebase/ConectToServer';
import { TypesToServer } from '../../services/firebase/TypesToServer';

interface iProps {}
interface iState {
	books: any[];
}

export class BybleBookContainerPage extends Component<iProps, iState> {
	constructor(props: any) {
		super(props);
		this.state = {
			books: []
		};

		this.GetBooks();
	}

	GetBooks() {
		var ArrFromServer: any[] = [];
		GetAllBooksFromServer(TypesToServer.Books.Bybel)
			.then(snapshot => {
				console.log('snapshot.val()', snapshot.val());
				if (snapshot.val() !== null) {
					Object.entries(snapshot.val()).forEach(key => {
						console.log('key', key);

						var obj = {
							title: key[0],
							book: key[1]
						};
						console.log('obj', obj);
						ArrFromServer.push(obj);
						return ArrFromServer;
					});

					console.log('ArrFromServer', ArrFromServer);
					return ArrFromServer;
				} else {
					ArrFromServer = [];
					console.log('ArrFromServer', ArrFromServer);
					return ArrFromServer;
				}
			})
			.then(data => {
				console.log('??????', data);
				this.setState({ books: data });
			});
	}

	render() {
		console.log('state', this.state.books);
		return (
			<IonPage style={{ textAlign: 'center' }}>
				<PageHeader titleString={LablesList.Page_Header_Names.Libary.byble.af} />
				<IonContent>
					<IonCard>
						<IonGrid>
							<IonRow>
								{this.state.books.map((entry, index) => {
									return (
										<IonCol key={index + entry.title}>
											<IonCard color='tertiary'>
												<IonRouterLink color='dark' routerLink={`/book/${entry.title}`} routerDirection='none'>
													{entry.title}
												</IonRouterLink>
											</IonCard>
										</IonCol>
									);
								})}
							</IonRow>
						</IonGrid>
					</IonCard>
				</IonContent>
			</IonPage>
		);
	}
}

export default BybleBookContainerPage;
