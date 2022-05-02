import React, { Component } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { Translate } from '../../services/translate/TranslateServices';
import { lsInj } from '../../services/translate/LocalLangDict';

interface iProps {
	donePer: string;
	doneTimer: string;
	remPer: string;
	remTimer: string;
	value: number;
}

class FastTimerComponent extends Component<iProps> {
	render() {
		const w = window.innerWidth > 400 ? '25%' : '80%';
		return (
			<div style={{ width: w, marginLeft: 'auto', marginRight: 'auto' }}>
				<CircularProgressbarWithChildren
					value={this.props.value}
					styles={{
						path: {
							strokeWidth: '6px',
							stroke: 'var(--ion-color-primary)',
							strokeLinecap: 'round',
						},
						trail: {
							strokeWidth: '2px',
							stroke: 'var(--ion-color-tertiary)',
							strokeLinecap: 'round',
						},
					}}>
					<div className='loader'>
						{Translate(lsInj.transDict.Done)} {this.props.donePer}
					</div>
					<div className='loader'>{this.props.doneTimer}</div>
					<div className='loader'>
						{Translate(lsInj.transDict.remain)} {this.props.remPer}
					</div>
					<div className='loader'>{this.props.remTimer}</div>
				</CircularProgressbarWithChildren>
			</div>
		);
	}
}

export default FastTimerComponent;
