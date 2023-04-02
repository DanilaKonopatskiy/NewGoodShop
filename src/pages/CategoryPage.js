import { Box, Breadcrumbs, Grid, Typography } from "@mui/material";
import { Link, useSearchParams } from 'react-router-dom';
import { ItemsList, ItemsMenu } from "../components";
import { useParams } from "react-router";

const CategoryPage = () => {
	const { categoryType } = useParams();
	const [query] = useSearchParams();

	const categoryName = query.get('n') || categoryType;

	return (
		<Grid
			item
			display="grid"
			gridTemplateColumns="repeat(12, 1fr)"
			sm={12}
			pt={2}
			maxHeight={400}
		>
			<Box gridColumn="span 2">
				<ItemsMenu />
			</Box>
			<Box gridColumn="span 10" pr={2} pl={2}>
				<Breadcrumbs>
					<Link underline="hover" color="inherit" to="/">
						Main
					</Link>
					<Link
						underline="hover"
						color="inherit"
						to="/categories"
					>
						Categories
					</Link>
					<Typography color="text.primary">{categoryName}</Typography>
				</Breadcrumbs>
				<ItemsList />
			</Box>
		</Grid>
	);
};

export default CategoryPage;