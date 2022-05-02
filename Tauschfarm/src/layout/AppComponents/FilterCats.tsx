import React, { Component } from 'react';
import { IonItem, IonLabel, IonSelect, IonSelectOption, IonGrid, IonRow, IonPopover, IonList, IonButton } from '@ionic/react';
import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';
import { convertObjectToArray } from '../../services/ownServices/ConverterFuncs';
import { AppStartGloabalBase_Categories } from '../../models/AppStartGlobal_CatSetUp';
import CatagoryView from './CatagoryView';
import { i_BaseInterface_Category } from '../../models/002CatagoryModels';

interface iState {
	filterRes: boolean;
	results: any[];
	showRes: boolean;
	searchstringCats: string[];
}

interface iProps {
	filter: boolean;
	sort: boolean;
	orginalCatContent: any[];
	lang: 'en' | 'de';
	redirectLink: string;
}

function renderCatSelection(func: any, lang: 'en' | 'de') {
	return (
		<IonItem>
			<IonLabel>{Translate(lsInj.transDict.catMultiple)}</IonLabel>
			<IonSelect
				multiple
				onIonChange={(e) => {
					func(e);
				}}
				cancelText={Translate(lsInj.transDict.Cancel)}
				okText={Translate(lsInj.transDict.Done)}>
				{convertObjectToArray(AppStartGloabalBase_Categories(lang)).map((i, index: number) => {
					// console.log('what happend ?', i);
					return (
						<IonSelectOption key={index} value={i}>
							{i.name}
						</IonSelectOption>
					);
				})}
			</IonSelect>
		</IonItem>
	);
}

export class FilterCats extends Component<iProps, iState> {
	constructor(props: any) {
		super(props);
		this.state = {
			filterRes: this.props.filter,
			results: [],
			showRes: false,
			searchstringCats: []
		};

		this.setCats = this.setCats.bind(this);
	}

	componentDidUpdate(prevProps: iProps) {
		if (prevProps.filter !== this.props.filter) {
			this.setState({ filterRes: this.props.filter });
		}
	}

	setCats(e: any) {
		// console.log('setCats', e.detail.value);
		var searchstrings: string[] = [];
		const res = e.detail.value;
		res.map((r: i_BaseInterface_Category) => {
			// console.log('r', r);
			searchstrings.push(r.checkMatch);
			return searchstrings;
		});
		// console.log('searchstrings', searchstrings);
		this.setState({ searchstringCats: searchstrings });
		this.getRes(searchstrings);
	}

	getRes(strings: string[]) {
		const { orginalCatContent } = this.props;
		var res: any[] = [];
		orginalCatContent.map((cat: i_BaseInterface_Category) => {
			strings.map((string: string) => {
				if (string === cat.checkMatch) {
					res.push(cat);
				}
				return res;
			});
			return res;
		});
		this.setState({ results: res });
	}

	render() {
		const { orginalCatContent, sort, lang, redirectLink } = this.props;
		return (
			<>
				<IonGrid>
					{!this.state.showRes && (
						<IonRow>
							{orginalCatContent.length > 0 ? <CatagoryView order={sort} cats={orginalCatContent} redirectLink={redirectLink} /> : Translate(lsInj.transDict.noContent)}
						</IonRow>
					)}

					{this.state.showRes && (
						<IonRow>
							{this.state.results.length > 0 ? <CatagoryView order={sort} cats={this.state.results} redirectLink={redirectLink} /> : Translate(lsInj.transDict.noContent)}
						</IonRow>
					)}
				</IonGrid>

				{this.state.filterRes && (
					<IonPopover
						isOpen={this.state.filterRes}
						onDidDismiss={(e) => {
							this.setState({ filterRes: false });
						}}>
						<IonList>
							{/* cats */}
							{renderCatSelection(this.setCats, lang)}
						</IonList>

						{/* Done buttons  */}
						<IonButton
							onClick={() => {
								this.setState({ filterRes: false });
							}}>
							{Translate(lsInj.transDict.Cancel)}
						</IonButton>
						<IonButton
							onClick={() => {
								this.setState({ filterRes: false, showRes: true });
							}}>
							{Translate(lsInj.transDict.Done)}
						</IonButton>
					</IonPopover>
				)}
			</>
		);
	}
}

export default FilterCats;
