import { phraseLanguages } from './LocalLangDict';

export function SetLanguage(lang: string) {
	//'de' | 'en'| 'af
	localStorage.setItem('lang', lang);
}

export function GetLanguage(): string {
	const lstr = localStorage.getItem('lang');
	return lstr || 'af';
}

export function Translate(ve: phraseLanguages): string {
	const l = GetLanguage();
	return (ve as any)[l];
}
