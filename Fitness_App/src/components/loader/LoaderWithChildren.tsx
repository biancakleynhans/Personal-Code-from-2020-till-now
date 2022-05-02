/** @format */

import React, { Component } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { LablesList } from '../titleLists/Titles';

interface iProps {
	donePer: string;
	doneTimer: string;
	remPer: string;
	remTimer: string;
	value: number;
}

class LoaderWithChilden extends Component<iProps> {
	render() {
		return (
			<div style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
				<CircularProgressbarWithChildren
					value={this.props.value}
					styles={{
						path: {
							strokeWidth: '6px',
							stroke: 'var(--ion-color-primary)',
							strokeLinecap: 'round'
						},
						trail: {
							strokeWidth: '2px',
							stroke: 'var(--ion-color-tertiary)',
							strokeLinecap: 'round'
						}
					}}>
					<div className='loader'>
						{LablesList.FastTimer.done.af} {this.props.donePer}
					</div>
					<div className='loader'>{this.props.doneTimer}</div>
					<div className='loader'>
						{LablesList.FastTimer.remain.af}
						{this.props.remPer}
					</div>
					<div className='loader'>{this.props.remTimer}</div>
				</CircularProgressbarWithChildren>
			</div>
		);
	}
}

export default LoaderWithChilden;
