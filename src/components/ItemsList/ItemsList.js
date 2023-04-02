const repeat = (num, value, sep) => {
	let res = '';
	for (let i = 0; i < num; i++) {
		res += value;
		if (i !== num - 1) res += sep;
	}
	return res;
}

export const ItemsList = ({
	Component,
	itemsMax,
	maxInRow,
	items = [],
	style = {},
}) => {
	let filteredByMax = items;

	if (itemsMax !== undefined) {
		filteredByMax = items.filter((_, index) => index < itemsMax);
	}

	if (!filteredByMax.length) return <h2>No items</h2>

	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: repeat(maxInRow, '1fr', ' '),
				gridTemplateRows: repeat(Math.ceil(filteredByMax.length / maxInRow), 'auto', ' '),
				gap: '20px',
				...style,
			}}
		>
			{filteredByMax.map((item, index) => (
				<Component data={item} key={'id' in item ? item.id : index} />
			))}
		</div>
	);
};