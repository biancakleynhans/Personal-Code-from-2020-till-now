export class NamedDict<T> {
	[v: string]: T;
}
export function NamedDictKeyValues<T>(d: NamedDict<T>) {
	return Object.keys(d).map((k) => {
		return { k: k, v: d[k] };
	});
}
