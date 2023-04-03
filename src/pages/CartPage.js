import { Grid, Box, CardContent, Card, Typography, CardActions, Button, Divider } from '@mui/material';
import { ItemsList, ItemsMenu } from "../components";
import { useEffect, useMemo, useState } from "react";
import { CartItem } from "../components/CartItem";
import { formatPrice } from "../helpers/basic";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart, getCart } from "../store/actions-creators/cart.actions";
import { useSnackbar } from "notistack";
import { cartActions } from "../store";
import { ApiButton } from "../components/ApiButton";

const CartPage = () => {
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();
	const { items, error, isLoading } = useSelector((state) => state.cart);
	const [isBuying, setIsBuying] = useState(false);

	const totalPrice = useMemo(() => {
		return items.reduce((acc, item) => {
			acc += item.good.price * item.count;
			return acc;
		}, 0);
	}, [items]);

	const handleClearCart = () => {
		if (!items.length) {
			return enqueueSnackbar('Cart is already empty', { variant: 'warning', autoHideDuration: 3000 });
		}
		dispatch(clearCart());
	};

	const handleChangeCartItem = (data) => {
		dispatch(addToCart(data));
	};

	const handleBuyCart = () => {
		if (!items.length) {
			return enqueueSnackbar("There's nothing to buy", { variant: 'warning', autoHideDuration: 3000 });
		}
		setIsBuying(true);
		dispatch(clearCart(() => {
			setIsBuying(false);
			enqueueSnackbar('Payment went successfully! Thank you', { variant: 'success', autoHideDuration: 3000 });
		}));
	}

	useEffect(() => {
		if (!items.length && error) {
			enqueueSnackbar(error, { variant: 'error', autoHideDuration: 3000 });
			dispatch(cartActions.clearError());
		} else if (!items.length && !error) {
			dispatch(getCart);
		}
	}, []);

	return (
		<Grid className='page' style={{ height: '100%' }}>
			<Grid
				item
				display="grid"
				gridTemplateColumns="repeat(12, 1fr)"
				sm={12}
				pt={2}
				maxHeight={400}
			>
				<Box gridColumn="span 2">
					<ItemsMenu/>
				</Box>
				<Box gridColumn="span 10" pr={2} pl={2} mb={6}>
					{
						items.length ? <ItemsList
							items={items}
							Component={(props) => <CartItem onChange={handleChangeCartItem} {...props} />}
							maxInRow={1}
						/> : <Typography component="h1" fontSize={24}>No cart items</Typography>
					}
					<div
						style={{
							height: '2px',
							borderRadius: '5px',
							backgroundColor: 'gray',
							margin: '30px 0 20px 0',
						}}
					></div>
					<Grid container>
						<Grid item>
							<Typography
								component="h2"
								fontSize={24}
							>
								Order Summary
							</Typography>
						</Grid>
						<Grid item ml="auto">
							<Typography
								component="h2"
								fontSize={24}
								color="secondary"
							>
								{formatPrice(totalPrice)}
							</Typography>
						</Grid>
					</Grid>
					<Grid container justifyContent="space-between" mt={2}>
						<Grid>
							<ApiButton
								color="error"
								variant="contained"
								onClick={handleClearCart}
								loading={!isBuying && isLoading}
							>Clear Cart</ApiButton>
						</Grid>
						<Grid>
							<ApiButton
								color="secondary"
								variant="contained"
								disabled={isLoading}
								loading={isBuying && isLoading}
								onClick={handleBuyCart}
							>Buy Now ({items.length})</ApiButton>
						</Grid>
					</Grid>
				</Box>
			</Grid>
		</Grid>
	);
};

export default CartPage;