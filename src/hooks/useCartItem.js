import { useSelector } from "react-redux";

export const useCartItem = (item) => {
	const { items } = useSelector((state) => state.cart);
	const existing = items.find(({ good }) => {
		return good.id === item.id && good.categoryTypeId === item.categoryTypeId;
	});

	return {
		existingGood: existing,
		count: existing ? existing.count : 1,
	};
};