export const rehydrateCartStore = () => {
	if (localStorage.getItem('cart') !== null) {
		return JSON.parse(localStorage.getItem('cart')) || {};
	}
};

export const cartMiddleware = (store) => (next) => (action) => {
	const result = next(action);
	if (action.type?.startsWith('cart/addToCart')) {
		const cartState = store.getState().cart;
		localStorage.setItem('cart', JSON.stringify({
			items: cartState.items,
		}));
	} else if (action.type?.startsWith('cart/clearCart')) {
		localStorage.removeItem('cart');
	}
	return result;
};