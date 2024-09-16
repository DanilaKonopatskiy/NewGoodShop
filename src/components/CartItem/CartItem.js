import { Box, Card, CardContent, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { formatPrice } from "../../helpers/basic";

export const CartItem = ({
	orderId,
	data: { count, good, id },
	onChange,
	onDelete,
	...props
}) => {
	return (
		<Card {...props} elevation={3}>
			<CardMedia
				component="img"
				height="100"
				image={good.img}
				alt={good.label}
				style={{
					objectFit: 'cover',
				}}
			/>
			<CardContent>
				<Grid justifyContent="space-between" display="flex">
					<Typography
						variant="div"
						component="h2"
					>
						{good.label}
					</Typography>
					<Typography
						variant="div"
						component="h2"
					>
						#{orderId + 1}
					</Typography>
				</Grid>
				<Typography variant="subtitle2">
					<hr />
				</Typography>
				<Grid item display="grid" gridTemplateColumns="repeat(12, 1fr)">
					<Box gridColumn="span 4">
						<Typography component="h3" fontSize={18}>Adjective</Typography>
					</Box>
					<Box gridColumn="span 8">
						<Typography component="h3" fontSize={18}>{good.adjective}</Typography>
					</Box>
				</Grid>
				<Grid item display="grid" gridTemplateColumns="repeat(12, 1fr)">
					<Box gridColumn="span 4">
						<Typography component="h3" fontSize={18}>Material</Typography>
					</Box>
					<Box gridColumn="span 8">
						<Typography component="h3" fontSize={18}>{good.material}</Typography>
					</Box>
				</Grid>
				<Grid item display="grid" gridTemplateColumns="repeat(12, 1fr)">
					<Box gridColumn="span 4">
						<Typography component="h3" fontSize={18}>Description</Typography>
					</Box>
					<Box gridColumn="span 8">
						<Typography component="h3" fontSize={18}>{good.description}</Typography>
					</Box>
				</Grid>
				<Grid item display="grid" gridTemplateColumns="repeat(12, 1fr)" mt={2}>
					<Box gridColumn="span 4">
						<Typography component="h2" fontWeight="bold" fontSize={18}>Count</Typography>
					</Box>
					<Box gridColumn="span 8" display="flex" alignItems="center">
						<IconButton
							onClick={() => {
								onChange({ good, count: count - 1 });
							}}
						><RemoveCircleIcon /></IconButton>
						<Typography component="h2" fontWeight="bold" fontSize={18}>{count}</Typography>
						<IconButton
							onClick={() => {
								onChange({ good, count: count + 1 });
							}}
						><AddCircleIcon /></IconButton>
						<Typography component="h2" fontWeight fontSize={18}>(If "count" is zero, the good will be automatically deleted)</Typography>
					</Box>
				</Grid>
				<Grid item display="grid" gridTemplateColumns="repeat(12, 1fr)" mt={1}>
					<Box gridColumn="span 4">
						<Typography component="h2" fontWeight="bold" fontSize={18}>Price</Typography>
					</Box>
					<Box gridColumn="span 8">
						<Typography component="h2" color="secondary" fontSize={18}>{formatPrice(good.price)}</Typography>
					</Box>
				</Grid>
				<hr />
				<Grid item display="grid" gridTemplateColumns="repeat(12, 1fr)" mt={1}>
					<Box gridColumn="span 4">
						<Typography component="h2" fontWeight="bold" fontSize={22}>Total</Typography>
					</Box>
					<Box gridColumn="span 8">
						<Typography component="h2" color="secondary" fontSize={22}>{formatPrice(good.price * count)}</Typography>
					</Box>
				</Grid>
			</CardContent>
		</Card>
	);
}