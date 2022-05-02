/** @format */

import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import './Rounded';
import { LablesList } from '../titleLists/Titles';

interface iProps {
	LengthOfFast: any;
	DurationCompleted: any;
	labels: any;
}

interface iState {
	data: {
		labels: string[];
		datasets: dataSetType[];
	};
}

interface dataSetType {
	label: string;
	backgroundColor: string;
	borderWidth: number;
	barThickness: number;
	data: number[];
}

class BarChart extends Component<iProps, iState> {
	constructor(props: any) {
		super(props);
		this.state = {
			data: {
				labels: this.props.labels,
				datasets: [
					{
						label: LablesList.FastChart.label1.af,
						backgroundColor: 'rgba(174,99,148,0.25)',
						borderWidth: 0,
						barThickness: 33,
						data: this.props.LengthOfFast
					},
					{
						label: LablesList.FastChart.label2.af,
						backgroundColor: 'rgba(174,99,148,0.8)',
						borderWidth: 0,
						barThickness: 23,
						data: this.props.DurationCompleted
					}
				]
			}
		};
	}

	render() {
		// console.log("this.props", this.props)
		return (
			<div style={{ position: 'relative', width: '100%', height: '50%' }}>
				<Bar
					redraw
					data={this.state.data}
					options={{
						title: {
							display: true,
							text: LablesList.FastChart.text.af
						},
						layout: {
							padding: {
								left: 5,
								right: 5,
								top: 10,
								bottom: 10
							}
						},
						scales: {
							xAxes: [
								{
									stacked: true,
									gridLines: { display: false, drawBorder: false, offsetGridLines: true },
									ticks: { display: false, beginAtZero: true }
								}
							],
							yAxes: [
								{
									// stacked: true,
									gridLines: { display: false, drawBorder: false },
									ticks: { display: false, beginAtZero: true }
								}
							]
						},
						legend: { display: false },
						tooltips: { enabled: false }
					}}
				/>
			</div>
		);
	}
}

export default BarChart;
