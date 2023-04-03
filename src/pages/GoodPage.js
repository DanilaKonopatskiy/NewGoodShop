import { Badge, Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { GoodsServiceApi } from "../api/GoodsService.api";
import { useSnackbar } from "notistack";
import { formatPrice } from "../helpers/basic";
import { useDispatch, useSelector } from "react-redux";
import { useCartItem } from "../hooks/useCartItem";
import { addToCart } from "../store/actions-creators/cart.actions";

const GoodPage = () => {
	const dispatch = useDispatch();
	const { goodId } = useParams();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const [goodData, setGoodData] = useState({});
	const [isGoodLoading, setIsGoodLoading] = useState(false);
	const { existingGood, count } = useCartItem(goodData);

	useEffect(() => {
		setIsGoodLoading(true);
		enqueueSnackbar('Товар загружается', { variant: 'warning', key: 'loading' });
		new GoodsServiceApi()
			.getOneGood(goodId)
			.then((good) => {
				setGoodData(good);
			})
			.catch((error) => {
				enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 3000 });
			})
			.finally(() => {
				closeSnackbar('loading');
				setIsGoodLoading(false);
			});
	}, []);

	const handleCartAdd = () => {
		dispatch(addToCart({ good: goodData, count: !existingGood ? 1 : existingGood.count + 1 }));
	};

	if (isGoodLoading) return <CircularProgress color="inherit" size={32} />

	return (
		<Grid>
			<Typography component="h1" fontSize={32}>{ goodData.label }</Typography>
			<Grid display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="40px">
				<Box gridColumn="span 6" style={{ position: 'relative', marginTop: '15px', minHeight: '420px' }}>
					<img
						src={goodData.img}
						alt={goodData.label}
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
							boxShadow: '0 0 6px black',
							borderRadius: '10px',
						}}
					/>
				</Box>
				<Box gridColumn="span 6">
					<Grid item display="grid" gridTemplateColumns="repeat(12, 1fr)" mt={2}>
						<Box gridColumn="span 8">
							<Typography component="h2" fontSize={24}>Adjective</Typography>
						</Box>
						<Box gridColumn="span 4">
							<Typography component="h2" fontSize={24}>{goodData.adjective}</Typography>
						</Box>
					</Grid>
					<Grid item display="grid" gridTemplateColumns="repeat(12, 1fr)" mt={2}>
						<Box gridColumn="span 8">
							<Typography component="h2" fontSize={24}>Material</Typography>
						</Box>
						<Box gridColumn="span 4">
							<Typography component="h2" fontSize={24}>{goodData.material}</Typography>
						</Box>
					</Grid>
					<hr />
					<Grid item display="grid" gridTemplateColumns="repeat(12, 1fr)" mt={2}>
						<Box gridColumn="span 8">
							<Typography component="h2" fontSize={24}>Price</Typography>
						</Box>
						<Box gridColumn="span 4">
							<Typography component="h2" color="secondary" fontSize={24}>{formatPrice(goodData.price)}</Typography>
						</Box>
					</Grid>
					<Grid item mt={4}>
						{
							existingGood ? <Badge badgeContent={count} color="error">
								<Button
									variant="outlined"
									color="warning"
									onClick={handleCartAdd}
								>Add to Cart</Button>
							</Badge> : <Button
								variant="outlined"
								color="warning"
								onClick={handleCartAdd}
							>Add to Cart</Button>
						}
					</Grid>
				</Box>
			</Grid>
			<Grid mt={2}>
				<Typography component="h2" fontSize={24}>Description</Typography>
				<hr />
				<Typography variant="body1" component="p" fontSize={20}>
					{''}
					{goodData.description}
				</Typography>
			</Grid>
		</Grid>
	);
};

export default GoodPage;