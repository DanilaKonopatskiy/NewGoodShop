import { repeat } from "../../helpers/basic";

export const ItemsList = ({
	Component,
	itemsMax,
	maxInRow,
	linkPrefix,
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
				gap: '30px',
				...style,
			}}
		>
			{filteredByMax.map((item, index) => (
				<Component
					data={item}
					key={'id' in item ? item.id : index}
					link={linkPrefix ? `${linkPrefix}/${item.id}` : `/${item.id}`}
				/>
			))}
		</div>
	);
};