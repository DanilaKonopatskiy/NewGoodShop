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