export function formatPrice(price) {
	return new Intl.NumberFormat('en-EN', {
		style: 'currency',
		currency: 'USD',
	}).format(price);
}

export function delay(ms = 2000) {
	return new Promise((res) => {
		setTimeout(res, ms);
	});
}

export const repeat = (num, value, sep) => {
	let res = '';
	for (let i = 0; i < num; i++) {
		res += value;
		if (i !== num - 1) res += sep;
	}
	return res;
}
