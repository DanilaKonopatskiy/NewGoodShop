import { Box, Breadcrumbs, CircularProgress, Grid, Typography } from "@mui/material";
import { Link, useSearchParams } from 'react-router-dom';
import { ItemsList, ItemsMenu, MyCard } from "../components";
import { useParams } from "react-router";
import { GoodsServiceApi } from "../api/GoodsService.api";
import { useEffect, useState } from "react";
import { addToCart } from "../store/actions-creators/cart.actions";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { cartActions } from "../store";

const CategoryPage = () => {
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();
	const cartState = useSelector((state) => state.cart);

	const { categoryType } = useParams();
	const [query] = useSearchParams();
	const categoryName = query.get('n') || categoryType;
	const categoryTypeId = query.get('id') || 1;

	const [goods, setGoods] = useState([]);
	const [goodsLoading, setGoodsLoading] = useState(false);

	const handleCartAddClick = (data) => {
		dispatch(addToCart(data));
	}

	useEffect(() => {
		setGoodsLoading(true);
		new GoodsServiceApi()
			.getAllGoods({
				categoryTypeIds: categoryTypeId,
			})
			.then((data) => {
				setGoods(data.items);
				setGoodsLoading(false);
			});
	}, [categoryType]);

	useEffect(() => {
		if (cartState.error) {
			enqueueSnackbar(cartState.error, { variant: 'error', autoHideDuration: 3000 });
			dispatch(cartActions.clearError());
		}
	}, [cartState.isLoading]);

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
					<Typography color="text.primary">Categories</Typography>
					<Typography color="text.primary">{categoryName}</Typography>
				</Breadcrumbs>
				<Grid style={{
					marginTop: '20px',
					alignItems: 'center',
				}}>
					{
						goodsLoading ? <Grid>
							<Typography component="body1" fontSize={26}>Goods Loading</Typography>
							<CircularProgress size={24} color="inherit" style={{ marginLeft: '20px' }} />
						</Grid> : <ItemsList
							items={goods}
							itemsMax={10}
							maxInRow={2}
							Component={(props) => <MyCard
								onCardAdd={handleCartAddClick}
								{...props}
							/>}
						/>
					}
				</Grid>
			</Box>
		</Grid>
	);
};

export default CategoryPage;