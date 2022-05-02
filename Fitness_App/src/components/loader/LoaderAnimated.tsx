/** @format */

import React from 'react';

// Import react-circular-progressbar module and styles
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// Animation
import { easeQuadInOut } from 'd3-ease';
import AnimatedProgressProvider from './AnimatedProgressProvider';

interface iProps {
	valueStart: number;
	valueEnd: number;
	duration: number;
	timeRunning: any;
	// timeRemaining: any
}
class Loader extends React.Component<iProps> {
	render() {
		return (
			<div style={{ width: '100%', height: '100%' }}>
				<AnimatedProgressProvider valueStart={this.props.valueStart} valueEnd={this.props.valueEnd} duration={this.props.duration} easingFunction={easeQuadInOut}>
					{value => {
						const roundedValue = Math.round(value);
						return (
							<CircularProgressbarWithChildren
								value={value}
								styles={buildStyles({ pathTransition: 'none', textColor: 'var(--ion-color-primary)', pathColor: 'var(--ion-color-secondary)', trailColor: 'var(--ion-color-tertiary)' })}>
								{/* Put any JSX content in here that you'd like. It'll be vertically and horizonally centered. */}
								<div className='loader'>{`elapsed time (${roundedValue}%)`}</div>
								<div className='loader'>{` ${this.props.timeRunning}`}</div>
								<div className='loader'>{`Remaining time: ${100 - roundedValue}%`}</div>
								<div className='loader'>{`${roundedValue}`}</div>
							</CircularProgressbarWithChildren>
						);
					}}
				</AnimatedProgressProvider>
			</div>
		);
	}
}

export default Loader;

// <CircularProgressbarWithChildren

//   value={value}
//   text={`${roundedValue}%`}
//   styles={buildStyles({
//     pathTransition: 'none',
//     textColor: "var(--ion-color-primary)",
//     pathColor: "var(--ion-color-secondary)",
//     trailColor: "var(--ion-color-tertiary)",
//     textSize: "14px"
//   })}
// />
