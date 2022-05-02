import { phraseLanguages } from './LocalLangDict';

export function SetLanguage(lang: string) {
	//'de' | 'en'
	localStorage.setItem('lang', lang);
}

export function GetLanguage(): string {
	const lstr = localStorage.getItem('lang');
	return lstr || 'de';
}

export function Translate(ve: phraseLanguages): string {
	const l = GetLanguage();
	return (ve as any)[l];
}
