/** @format */

import React, { Component } from 'react';
import { LablesList } from './Titles';

function selecLangFunc(lang: string) {
	if (lang === 'en') {
        console.log("Lang === en ", lang)
        LablesList.FastPages.fastEdit.end.en
	}
	if (lang === 'af') {
        console.log("Lang === af ", lang)
	} else {
        console.log("Lang === error ", lang)
	}
}

export class SelectLang extends Component {
	render() {
		return <div></div>;
	}
}

export default SelectLang;
