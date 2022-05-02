/** @format */

import React, { Component } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { LablesList } from '../titleLists/Titles';

interface iProps {
	data: any[];
}
interface iState {}

export class MessureWeightChart extends Component<iProps, iState> {
	render() {
		// console.log("prop data for weight", this.props)
		return (
			<>
				<h4>{LablesList.WeightMesureChart.af}</h4>
				<ResponsiveContainer width='80%' height={200}>
					<LineChart data={this.props.data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
						<XAxis dataKey='date' stroke='none' />
						<YAxis stroke='none' />
						<CartesianGrid stroke='#eee' strokeDasharray='5 5' />
						<Tooltip active={true} cursor={{ stroke: 'grey', strokeWidth: 5 }} wrapperStyle={{ width: 150, backgroundColor: '#ccc' }} />
						<Legend iconType='diamond' verticalAlign='top' height={36} />
						<Line type='monotone' dataKey='bust' stroke='#ae6394' />
						<Line type='monotone' dataKey='waist' stroke='#995782' />
						<Line type='monotone' dataKey='hip' stroke='#b6739f' />
						<Line type='monotone' dataKey='butt' stroke='#cd86b4' />
						<Line type='monotone' dataKey='thigh' stroke='#eba2d2' />
						<Line type='monotone' dataKey='upperArm' stroke='#cf2895' />
						<Line type='monotone' dataKey='weight' stroke='#a7347f' />
					</LineChart>
				</ResponsiveContainer>
			</>
		);
	}
}

export default MessureWeightChart;
