import { Box, Typography } from "@mui/material";
import { ItemsList } from "../ItemsList";
import { Link } from "react-router-dom";
import { MyCard } from "../MyCard";
import { addToCart } from "../../store/actions-creators/cart.actions";
import { useDispatch } from "react-redux";

import './styles.css';

export const GoodCategory = ({
	items,
	category,
	itemsInCategory = 4,
	...props
}) => {
	const dispatch = useDispatch();

	const handleCartAddClick = (data) => {
		dispatch(addToCart(data));
	}

	return (
		<Box className="good-category" {...props}>
			<Typography component="h1" fontSize={24} p={0.5}>{ category.label }</Typography>
			<ItemsList
				itemsMax={itemsInCategory}
				maxInRow={itemsInCategory}
				items={items}
				Component={(innerProps) => <MyCard
					{...innerProps}
					onCardAdd={handleCartAddClick}
					style={{
						alignSelf: 'inherit',
					}}
				/>}
			/>
			<div style={{ backgroundColor: 'lightgray', padding: 5 }}>
				<Link to={`/categories/${category.type}?n=${category.label}&id=${category.categoryTypeId}`}>Look closer</Link>
			</div>
		</Box>
	);
};
