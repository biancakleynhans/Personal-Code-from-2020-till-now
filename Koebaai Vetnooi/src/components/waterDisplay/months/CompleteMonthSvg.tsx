/** @format */

import React from 'react';
import { MonthWaterCups, IndexWaterCups } from './MonthWaterCups';
import { NamedDict } from '../../../services/helpers/Tools';

export interface iWaterDataPerMonthAndDay {
	year: number;
	month: number;
	perday: NamedDict<{ totalWater: number }>;
}

export const IndexSvg = () => {
	return <IndexWaterCups />;
};

export const JanuarieSvg = (props: iWaterDataPerMonthAndDay) => {
	return <MonthWaterCups {...props} />;
};

export const FebuarieSvg = (props: iWaterDataPerMonthAndDay) => {
	return <MonthWaterCups {...props} />;
};

export const MarchSvg = (props: iWaterDataPerMonthAndDay) => {
	return <MonthWaterCups {...props} />;
};

export const AprilSvg = (props: iWaterDataPerMonthAndDay) => {
	return <MonthWaterCups {...props} />;
};

export const MaySvg = (props: iWaterDataPerMonthAndDay) => {
	return <MonthWaterCups {...props} />;
};

export const JuneSvg = (props: iWaterDataPerMonthAndDay) => {
	return <MonthWaterCups {...props} />;
};

export const JulySvg = (props: iWaterDataPerMonthAndDay) => {
	return <MonthWaterCups {...props} />;
};

export const AugSvg = (props: iWaterDataPerMonthAndDay) => {
	return <MonthWaterCups {...props} />;
};

export const SeptemberSvg = (props: iWaterDataPerMonthAndDay) => {
	return <MonthWaterCups {...props} />;
};

export const OctoberSvg = (props: iWaterDataPerMonthAndDay) => {
	return <MonthWaterCups {...props} />;
};

export const NovemberSvg = (props: iWaterDataPerMonthAndDay) => {
	return <MonthWaterCups {...props} />;
};

export const DecemberSvg = (props: iWaterDataPerMonthAndDay) => {
	return <MonthWaterCups {...props} />;
};
