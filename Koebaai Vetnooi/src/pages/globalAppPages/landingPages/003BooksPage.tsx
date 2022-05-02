import React, { Component } from 'react';
import { IonPage, IonContent, IonHeader, IonButton, IonGrid, IonRow, IonCol, IonPopover } from '@ionic/react';
import PageHeader from '../../../layout/Headers/PageHeader';
import { Translate } from '../../../services/translate/TranslateServices';
import { lsInj } from '../../../services/translate/LocalLangDict';
import { BookImgs } from '../../../layout/BooksForLibrary/images/0ExportBookImgs';
import { BookCombiner } from '../../../layout/BooksForLibrary/BookCombiner';

interface iState {
	showBook1: boolean;
	showBook2: boolean;
	showBook3: boolean;
	showBook4: boolean;
	showBook5: boolean;
	showBook6: boolean;
	showBook7: boolean;
	showBook8: boolean;
	showBook9: boolean;
	showBook10: boolean;
	showBook11: boolean;
	showBook12: boolean;
	showBook13: boolean;
	showBook14: boolean;
	showBook15: boolean;
	showBook16: boolean;
	showBook17: boolean;
	showBook18: boolean;
	showBook19: boolean;
	showBook20: boolean;
	showBook21: boolean;
}

export class BooksPage extends Component<any, iState> {
	contentRef: HTMLIonContentElement | undefined;

	constructor(props: any) {
		super(props);
		this.state = {
			showBook1: false,
			showBook2: false,
			showBook3: false,
			showBook4: false,
			showBook5: false,
			showBook6: false,
			showBook7: false,
			showBook8: false,
			showBook9: false,
			showBook10: false,
			showBook11: false,
			showBook12: false,
			showBook13: false,
			showBook14: false,
			showBook15: false,
			showBook16: false,
			showBook17: false,
			showBook18: false,
			showBook19: false,
			showBook20: false,
			showBook21: false,
		};
	}

	scrollToTop() {
		if (this.contentRef) {
			// console.log('go page down called updated');
			this.contentRef.scrollToTop();
		}
	}

	render() {
		var cssToUse = window.innerWidth > 400 ? 'Modal22' : 'Modal2';
		return (
			<IonPage>
				<IonContent
					class='scroll-content'
					scrollEvents={true}
					ref={(r) => {
						if (r) {
							this.contentRef = r;
						}
					}}>
					<IonHeader slot='fixed'>
						<PageHeader backBtn={true} titleString={Translate(lsInj.transDict.showBooks)} />
					</IonHeader>
					<br />
					<br />
					<br />
					<img src={BookImgs.title} alt='title' />

					<IonGrid>
						<IonRow>
							<IonCol size='6'>
								<IonButton
									style={{ width: '150px', height: '150px' }}
									onClick={() => {
										return this.setState({ showBook1: !this.state.showBook1 });
									}}>
									<img src={BookCombiner.Book1.coverImg} alt='broken' />
								</IonButton>
							</IonCol>
							<IonCol size='6'>
								<IonButton
									style={{ width: '150px', height: '150px' }}
									onClick={() => {
										return this.setState({ showBook2: !this.state.showBook2 });
									}}>
									<img src={BookCombiner.Book2.coverImg} alt='broken' />
								</IonButton>
							</IonCol>
							<IonCol size='6'>
								<IonButton
									style={{ width: '150px', height: '150px' }}
									onClick={() => {
										return this.setState({ showBook3: !this.state.showBook3 });
									}}>
									<img src={BookCombiner.Book3.coverImg} alt='broken' />
								</IonButton>
							</IonCol>
							<IonCol size='6'>
								<IonButton
									style={{ width: '150px', height: '150px' }}
									onClick={() => {
										return this.setState({ showBook4: !this.state.showBook4 });
									}}>
									<img src={BookCombiner.Book4.coverImg} alt='broken' />
								</IonButton>
							</IonCol>
							<IonCol size='6'>
								<IonButton
									style={{ width: '150px', height: '150px' }}
									onClick={() => {
										return this.setState({ showBook5: !this.state.showBook5 });
									}}>
									<img src={BookCombiner.Book5.coverImg} alt='broken' />
								</IonButton>
							</IonCol>
							<IonCol size='6'>
								<IonButton
									style={{ width: '150px', height: '150px' }}
									onClick={() => {
										return this.setState({ showBook6: !this.state.showBook6 });
									}}>
									<img src={BookCombiner.Book6.coverImg} alt='broken' />
								</IonButton>
							</IonCol>
							<IonCol size='6'>
								<IonButton
									style={{ width: '150px', height: '150px' }}
									onClick={() => {
										return this.setState({ showBook7: !this.state.showBook7 });
									}}>
									<img src={BookCombiner.Book7.coverImg} alt='broken' />
								</IonButton>
							</IonCol>
							<IonCol size='6'>
								<IonButton
									style={{ width: '150px', height: '150px' }}
									onClick={() => {
										return this.setState({ showBook8: !this.state.showBook8 });
									}}>
									<img src={BookCombiner.Book8.coverImg} alt='broken' />
								</IonButton>
							</IonCol>
							<IonCol size='6'>
								<IonButton
									style={{ width: '150px', height: '150px' }}
									onClick={() => {
										return this.setState({ showBook9: !this.state.showBook9 });
									}}>
									<img src={BookCombiner.Book9.coverImg} alt='broken' />
								</IonButton>
							</IonCol>
							<IonCol size='6'>
								<IonButton
									style={{ width: '150px', height: '150px' }}
									onClick={() => {
										return this.setState({ showBook10: !this.state.showBook10 });
									}}>
									<img src={BookCombiner.Book10.coverImg} alt='broken' />
								</IonButton>
							</IonCol>
							<IonCol size='6'>
								<IonButton
									style={{ width: '150px', height: '150px' }}
									onClick={() => {
										return this.setState({ showBook11: !this.state.showBook11 });
									}}>
									<img src={BookCombiner.Book11.coverImg} alt='broken' />
								</IonButton>
							</IonCol>
							<IonCol size='6'>
								<IonButton
									style={{ width: '150px', height: '150px' }}
									onClick={() => {
										return this.setState({ showBook12: !this.state.showBook12 });
									}}>
									<img src={BookCombiner.Book12.coverImg} alt='broken' />
								</IonButton>
							</IonCol>
							<IonCol size='6'>
								<IonButton
									style={{ width: '150px', height: '150px' }}
									onClick={() => {
										return this.setState({ showBook13: !this.state.showBook13 });
									}}>
									<img src={BookCombiner.Book13.coverImg} alt='broken' />
								</IonButton>
							</IonCol>
							<IonCol size='6'>
								<IonButton
									style={{ width: '150px', height: '150px' }}
									onClick={() => {
										return this.setState({ showBook14: !this.state.showBook14 });
									}}>
									<img src={BookCombiner.Book14.coverImg} alt='broken' />
								</IonButton>
							</IonCol>
							<IonCol size='6'>
								<IonButton
									style={{ width: '150px', height: '150px' }}
									onClick={() => {
										return this.setState({ showBook15: !this.state.showBook15 });
									}}>
									<img src={BookCombiner.Book15.coverImg} alt='broken' />
								</IonButton>
							</IonCol>
							<IonCol size='6'>
								<IonButton
									style={{ width: '150px', height: '150px' }}
									onClick={() => {
										return this.setState({ showBook16: !this.state.showBook16 });
									}}>
									<img src={BookCombiner.Book16.coverImg} alt='broken' />
								</IonButton>
							</IonCol>
							<IonCol size='6'>
								<IonButton
									style={{ width: '150px', height: '150px' }}
									onClick={() => {
										return this.setState({ showBook17: !this.state.showBook17 });
									}}>
									<img src={BookCombiner.Book17.coverImg} alt='broken' />
								</IonButton>
							</IonCol>
							<IonCol size='6'>
								<IonButton
									style={{ width: '150px', height: '150px' }}
									onClick={() => {
										return this.setState({ showBook18: !this.state.showBook18 });
									}}>
									<img src={BookCombiner.Book18.coverImg} alt='broken' />
								</IonButton>
							</IonCol>
							<IonCol size='6'>
								<IonButton
									style={{ width: '150px', height: '150px' }}
									onClick={() => {
										return this.setState({ showBook19: !this.state.showBook19 });
									}}>
									<img src={BookCombiner.Book19.coverImg} alt='broken' />
								</IonButton>
							</IonCol>
						</IonRow>
					</IonGrid>

					{/* books */}

					<IonPopover cssClass={cssToUse} showBackdrop={true} isOpen={this.state.showBook1}>
						{BookCombiner.Book1.component}
						<IonButton
							shape='round'
							onClick={() => {
								this.setState({ showBook1: !this.state.showBook1 });
							}}>
							{Translate(lsInj.transDict.Done)}
						</IonButton>
					</IonPopover>

					<IonPopover cssClass={cssToUse} showBackdrop={true} isOpen={this.state.showBook2}>
						{BookCombiner.Book2.component}
						<IonButton
							shape='round'
							onClick={() => {
								this.setState({ showBook2: !this.state.showBook2 });
							}}>
							{Translate(lsInj.transDict.Done)}
						</IonButton>
					</IonPopover>

					<IonPopover cssClass={cssToUse} showBackdrop={true} isOpen={this.state.showBook3}>
						{BookCombiner.Book3.component}
						<IonButton
							shape='round'
							onClick={() => {
								this.setState({ showBook3: !this.state.showBook3 });
							}}>
							{Translate(lsInj.transDict.Done)}
						</IonButton>
					</IonPopover>

					<IonPopover cssClass={cssToUse} showBackdrop={true} isOpen={this.state.showBook4}>
						{BookCombiner.Book4.component}
						<IonButton
							shape='round'
							onClick={() => {
								this.setState({ showBook4: !this.state.showBook4 });
							}}>
							{Translate(lsInj.transDict.Done)}
						</IonButton>
					</IonPopover>

					<IonPopover cssClass={cssToUse} showBackdrop={true} isOpen={this.state.showBook5}>
						{BookCombiner.Book5.component}
						<IonButton
							shape='round'
							onClick={() => {
								this.setState({ showBook5: !this.state.showBook5 });
							}}>
							{Translate(lsInj.transDict.Done)}
						</IonButton>
					</IonPopover>

					<IonPopover cssClass={cssToUse} showBackdrop={true} isOpen={this.state.showBook6}>
						{BookCombiner.Book6.component}
						<IonButton
							shape='round'
							onClick={() => {
								this.setState({ showBook6: !this.state.showBook6 });
							}}>
							{Translate(lsInj.transDict.Done)}
						</IonButton>
					</IonPopover>

					<IonPopover cssClass={cssToUse} showBackdrop={true} isOpen={this.state.showBook7}>
						{BookCombiner.Book7.component}
						<IonButton
							shape='round'
							onClick={() => {
								this.setState({ showBook7: !this.state.showBook7 });
							}}>
							{Translate(lsInj.transDict.Done)}
						</IonButton>
					</IonPopover>

					<IonPopover cssClass={cssToUse} showBackdrop={true} isOpen={this.state.showBook8}>
						{BookCombiner.Book8.component}
						<IonButton
							shape='round'
							onClick={() => {
								this.setState({ showBook8: !this.state.showBook8 });
							}}>
							{Translate(lsInj.transDict.Done)}
						</IonButton>
					</IonPopover>

					<IonPopover cssClass={cssToUse} showBackdrop={true} isOpen={this.state.showBook9}>
						{BookCombiner.Book9.component}
						<IonButton
							shape='round'
							onClick={() => {
								this.setState({ showBook9: !this.state.showBook9 });
							}}>
							{Translate(lsInj.transDict.Done)}
						</IonButton>
					</IonPopover>

					<IonPopover cssClass={cssToUse} showBackdrop={true} isOpen={this.state.showBook10}>
						{BookCombiner.Book10.component}
						<IonButton
							shape='round'
							onClick={() => {
								this.setState({ showBook10: !this.state.showBook10 });
							}}>
							{Translate(lsInj.transDict.Done)}
						</IonButton>
					</IonPopover>

					<IonPopover cssClass={cssToUse} showBackdrop={true} isOpen={this.state.showBook11}>
						{BookCombiner.Book11.component}
						<IonButton
							shape='round'
							onClick={() => {
								this.setState({ showBook11: !this.state.showBook11 });
							}}>
							{Translate(lsInj.transDict.Done)}
						</IonButton>
					</IonPopover>

					<IonPopover cssClass={cssToUse} showBackdrop={true} isOpen={this.state.showBook12}>
						{BookCombiner.Book12.component}
						<IonButton
							shape='round'
							onClick={() => {
								this.setState({ showBook12: !this.state.showBook12 });
							}}>
							{Translate(lsInj.transDict.Done)}
						</IonButton>
					</IonPopover>

					<IonPopover cssClass={cssToUse} showBackdrop={true} isOpen={this.state.showBook13}>
						{BookCombiner.Book13.component}
						<IonButton
							shape='round'
							onClick={() => {
								this.setState({ showBook13: !this.state.showBook13 });
							}}>
							{Translate(lsInj.transDict.Done)}
						</IonButton>
					</IonPopover>

					<IonPopover cssClass={cssToUse} showBackdrop={true} isOpen={this.state.showBook14}>
						{BookCombiner.Book14.component}
						<IonButton
							shape='round'
							onClick={() => {
								this.setState({ showBook14: !this.state.showBook14 });
							}}>
							{Translate(lsInj.transDict.Done)}
						</IonButton>
					</IonPopover>

					<IonPopover cssClass={cssToUse} showBackdrop={true} isOpen={this.state.showBook15}>
						{BookCombiner.Book15.component}
						<IonButton
							shape='round'
							onClick={() => {
								this.setState({ showBook15: !this.state.showBook15 });
							}}>
							{Translate(lsInj.transDict.Done)}
						</IonButton>
					</IonPopover>

					<IonPopover cssClass={cssToUse} showBackdrop={true} isOpen={this.state.showBook16}>
						{BookCombiner.Book16.component}
						<IonButton
							shape='round'
							onClick={() => {
								this.setState({ showBook16: !this.state.showBook16 });
							}}>
							{Translate(lsInj.transDict.Done)}
						</IonButton>
					</IonPopover>

					<IonPopover cssClass={cssToUse} showBackdrop={true} isOpen={this.state.showBook17}>
						{BookCombiner.Book17.component}
						<IonButton
							shape='round'
							onClick={() => {
								this.setState({ showBook17: !this.state.showBook17 });
							}}>
							{Translate(lsInj.transDict.Done)}
						</IonButton>
					</IonPopover>

					<IonPopover cssClass={cssToUse} showBackdrop={true} isOpen={this.state.showBook18}>
						{BookCombiner.Book18.component}
						<IonButton
							shape='round'
							onClick={() => {
								this.setState({ showBook18: !this.state.showBook18 });
							}}>
							{Translate(lsInj.transDict.Done)}
						</IonButton>
					</IonPopover>

					<IonPopover cssClass={cssToUse} showBackdrop={true} isOpen={this.state.showBook19}>
						{BookCombiner.Book19.component}
						<IonButton
							shape='round'
							onClick={() => {
								this.setState({ showBook19: !this.state.showBook19 });
							}}>
							{Translate(lsInj.transDict.Done)}
						</IonButton>
					</IonPopover>
				</IonContent>
			</IonPage>
		);
	}
}

export default BooksPage;
