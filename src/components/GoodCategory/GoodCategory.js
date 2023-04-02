import { Box, Typography } from "@mui/material";
import { ItemsList } from "../ItemsList";
import { Link } from "react-router-dom";

import './styles.css';
import { NikeCard } from "../NikeCard";

export const GoodCategory = ({
	items,
	itemsInCategory = 4,
}) => {
	return (
		<Box className="good-category">
			<Typography component="h1" sx={{ backgroundColor: 'black', padding: 0.5, color: 'white' }}>Hello World</Typography>
			<ItemsList itemsMax={itemsInCategory} maxInRow={itemsInCategory} items={items} Component={NikeCard} />
			<div style={{ backgroundColor: 'lightgray', padding: 5 }}>
				<Link to="/category">Look closer</Link>
			</div>
		</Box>
	);
};
