/** @format */

import React, { Component } from 'react';
import { XAxis, YAxis, Tooltip, Legend, AreaChart, Area, ResponsiveContainer, CartesianGrid } from 'recharts';
import { LablesList } from '../titleLists/Titles';

interface iProps {
	data: any[];
}

interface iState {}

export class WeightChart extends Component<iProps, iState> {
	render() {
		// console.log("prop data for weight", this.props)
		return (
			<>
				<h4>{LablesList.WeightChart.af}</h4>
				<ResponsiveContainer width='80%' height={200}>
					<AreaChart data={this.props.data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
						<defs>
							<linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
								<stop offset='5%' stopColor='#ae6394' stopOpacity={1} />
								<stop offset='100%' stopColor='#f1bedf' stopOpacity={0.3} />
							</linearGradient>
						</defs>
						<XAxis dataKey='date' stroke='none' />
						<YAxis dataKey='weight' stroke='none' />
						<CartesianGrid stroke='#eee' strokeDasharray='5 5' />
						<Tooltip active={true} cursor={{ stroke: 'grey', strokeWidth: 5 }} wrapperStyle={{ width: 150, backgroundColor: '#ccc' }} />
						<Legend iconType='diamond' verticalAlign='top' height={36} />
						<Area type='monotone' dataKey='weight' stroke='#ae6394' fillOpacity={1} fill='url(#colorUv)' />
					</AreaChart>
				</ResponsiveContainer>
			</>
		);
	}
}

export default WeightChart;

// <LineChart width={300} height={300} data={this.props.data}  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
// <Line type="monotone" dataKey="weight" stroke="#8844d8" />
// {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
// <Tooltip cursor={true}  wrapperStyle={{ width: 150, backgroundColor: '#ccc' }}/>
// <Legend width={100} wrapperStyle={{ bottom: 0, left: 10, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
// <XAxis dataKey="date" stroke="none" />
// <YAxis dataKey="weight" stroke="none" />
// </LineChart>
