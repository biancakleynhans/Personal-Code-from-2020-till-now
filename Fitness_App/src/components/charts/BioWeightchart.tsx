/** @format */

import React, { Component } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { LablesList } from '../titleLists/Titles';

interface iProps {
	data: any[];
}
interface iState {}

export class BioWeightchart extends Component<iProps> {
	render() {
		// console.log("prop data for weight", this.props)
		return (
			<>
				<h4>{LablesList.BioWeightChart.af}</h4>
				<ResponsiveContainer width='80%' height={200}>
					<LineChart data={this.props.data}>
						<XAxis dataKey='date' stroke='none' />
						<YAxis stroke='none' />
						<CartesianGrid stroke='#eee' strokeDasharray='5 5' />

						<Tooltip active={true} cursor={{ stroke: 'grey', strokeWidth: 5 }} wrapperStyle={{ width: 150, backgroundColor: '#ccc' }} />

						<Legend iconType='diamond' verticalAlign='top' height={36} />

						<Line type='monotone' dataKey='bodyFat' stroke='#ae6394' />
						<Line type='monotone' dataKey='boneDensity' stroke='#995782' />
						<Line type='monotone' dataKey='muscleMass' stroke='#b6739f' />
						<Line type='monotone' dataKey='waterDensity' stroke='#cd86b4' />
						<Line type='monotone' dataKey='weight' stroke='#a7347f' />
					</LineChart>
				</ResponsiveContainer>
			</>
		);
	}
}

export default BioWeightchart;
