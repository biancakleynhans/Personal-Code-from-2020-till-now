import React, { Component } from 'react';
import { i_BaseInterface_User } from '../../models/001UserModels';
import { i_BaseInterface_Group } from '../../models/004GroupModels';
import { NamedDict } from '../../services/helpers/Tools';
import { howFar, renderDistance } from './FilterCatContent';
import { convertObjectToArray } from '../../services/ownServices/ConverterFuncs';
import { IonGrid, IonRow, IonPopover, IonList, IonButton, IonCol, IonCard, IonCardTitle, IonCardHeader, IonCardSubtitle } from '@ionic/react';
import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';

function sortByTextAsc(a: any, b: any) {
	if (a.name !== undefined && b.name !== undefined) {
		const diff = a.name.toLowerCase().localeCompare(b.name.toLowerCase());
		return -1 * diff;
	} else return 1;
}

function sortByTextDsc(a: any, b: any) {
	if (a.name !== undefined && b.name !== undefined) {
		const diff = a.name.toLowerCase().localeCompare(b.name.toLowerCase());
		return -1 * -diff;
	} else return 1;
}

function disp(group: i_BaseInterface_Group, index: number) {
	return (
		<IonCol size='6' key={index}>
			<IonCard style={{ width: '145px', height: '250px' }} button={true} routerLink={`/groups/selectedGroup/${group.id}`}>
				<img style={{ width: '100%', height: '150px' }} src={group.avatar} alt='broken' />
				<IonCardHeader>
					<IonCardTitle style={{ fontSize: '1.1em' }}>{group.name}</IonCardTitle>
					{/* {convertObjectToArray(group.membersList).length > 0 &&
									convertObjectToArray(group.membersList)
										.slice(0, 1)
										.map((mem: any, index: number) => {
											return (
												<IonAvatar style={{ width: '25px', height: '25px', display: 'inline-block' }} key={index}>
													<img style={{ width: '25px', height: '25px' }} src={mem.avatar} alt='img' />
												</IonAvatar>
											);
										})} */}
					<IonCardSubtitle style={{ fontSize: '0.9em' }}>
						{group.memberCount} {Translate(lsInj.transDict.Members)}
					</IonCardSubtitle>
				</IonCardHeader>
			</IonCard>
		</IonCol>
	);
}

function getResults(distanceUser: { upper: number; lower: number }, currentUser: i_BaseInterface_User, eventContent: i_BaseInterface_Group[]) {
	var iRes: NamedDict<i_BaseInterface_Group> = {};
	var res: any[] = [];
	eventContent.forEach((event: i_BaseInterface_Group) => {
		var dist = howFar(currentUser, event);
		// console.log('eventContent', dist);

		if (dist < distanceUser.upper) {
			iRes = {
				...iRes,
				[event.id]: event
			};
		}
	});
	res = convertObjectToArray(iRes);
	return res;
}

interface iState {
	filterRes: boolean;
	sort: boolean;
	results: any[];
	showRes: boolean;
	groupContent: any[];
	distance: { lower: number; upper: number };
}

interface iProps {
	sort: boolean;
	filter: boolean;
	orginalGroupContent: any[];
	lang: 'en' | 'de';
	// routerLink: string;
	currentUser: i_BaseInterface_User;
	filter_buttonBoolean?: () => void;
	sort_buttonBoolean?: () => void;
}

export class FilterGroups extends Component<iProps, iState> {
	constructor(props: any) {
		super(props);
		this.state = {
			filterRes: this.props.filter,
			sort: false,
			results: [],
			showRes: false,
			groupContent: this.props.orginalGroupContent,
			distance: { lower: 0, upper: 10 }
		};
		this.setDistance = this.setDistance.bind(this);
	}

	componentDidUpdate(prevProps: iProps) {
		if (prevProps.filter !== this.props.filter) {
			this.setState({ filterRes: this.props.filter });
		}
		if (prevProps.sort !== this.props.sort) {
			this.setState({ sort: this.props.sort });
		}
		if (prevProps.orginalGroupContent !== this.props.orginalGroupContent) {
			this.setState({ groupContent: this.props.orginalGroupContent });
			// console.log('the cat contenttent updated ', this.state.catContent, this.props.orginalCatContent);
		}
	}

	setDistance(e: any) {
		//.detail.value as any
		// console.log('distance ', e.detail.value);
		this.setState({ distance: e.detail.value });
		this.getRes();
	}

	getRes() {
		// const { orginalCatContent } = this.props;
		var res: any[] = [];
		res = getResults(this.state.distance, this.props.currentUser, this.state.groupContent);
		this.setState({ results: res });
		// console.log('this.state', this.state);
	}

	render() {
		return (
			<>
				<IonGrid>
					{!this.state.showRes && this.props.orginalGroupContent && (
						<IonRow>
							{this.state.groupContent.length > 0 ? (
								<>
									{this.props.orginalGroupContent.sort(this.props.sort ? sortByTextAsc : sortByTextDsc).map((group: i_BaseInterface_Group, index: number) => {
										return disp(group, index);
									})}
								</>
							) : (
								Translate(lsInj.transDict.noContent)
							)}
						</IonRow>
					)}

					{this.state.showRes && this.state.results.length && (
						<IonRow>
							{this.state.results.length > 0 ? (
								<>
									{this.state.results.sort(this.props.sort ? sortByTextAsc : sortByTextDsc).map((group: i_BaseInterface_Group, index: number) => {
										return disp(group, index);
									})}
								</>
							) : (
								Translate(lsInj.transDict.noContent)
							)}
						</IonRow>
					)}
				</IonGrid>

				{this.state.filterRes && (
					<IonPopover
						isOpen={this.state.filterRes}
						onDidDismiss={(e) => {
							this.props.filter_buttonBoolean && this.props.filter_buttonBoolean();
							// this.props.sort_buttonBoolean && this.props.sort_buttonBoolean();
							this.setState({ filterRes: false });
						}}>
						<IonList>
							{/* items diffrent props */}

							{renderDistance(this.setDistance)}
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
								this.props.filter_buttonBoolean && this.props.filter_buttonBoolean();
								// this.props.sort_buttonBoolean && this.props.sort_buttonBoolean();
								this.setState({ filterRes: false, showRes: true });
							}}>
							{Translate(lsInj.transDict.Close)}
						</IonButton>
					</IonPopover>
				)}
			</>
		);
	}
}

export default FilterGroups;
