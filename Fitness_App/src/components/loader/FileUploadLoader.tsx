/** @format */

import React from 'react';

// Import react-circular-progressbar module and styles
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface iProps {
	timeRunning: any;
}
class FileUploadLoader extends React.Component<iProps> {
	render() {
		return (
			<div style={{ width: '150px', height: '150px' }}>
				<CircularProgressbarWithChildren
					value={this.props.timeRunning}
					text={`${this.props.timeRunning} %`}
					styles={buildStyles({ pathTransition: 'none', textColor: 'var(--ion-color-primary)', pathColor: 'var(--ion-color-secondary)', trailColor: 'var(--ion-color-tertiary)' })}>
					
				</CircularProgressbarWithChildren>
			</div>
		);
	}
}

export default FileUploadLoader;
