import {
	CardActions,
	CardContent,
	CardMedia,
	IconButton,
	Typography,
	Card,
	Collapse,
	Badge
} from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { formatPrice } from "../../helpers/basic";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCartItem } from "../../hooks/useCartItem";

export const MyCard = ({ data, onCardAdd, link, ...props }) => {
	const [expanded, setExpanded] = useState(false);
	const { count, existingGood } = useCartItem(data);

	const handleExpandClick = () => {
		setExpanded((prev) => !prev);
	}

	const handleAddCart = () => {
		onCardAdd({ good: data, count: !existingGood ? 1 : count + 1 });
	};

	return (
		<Card sx={{ width: '100%', alignSelf: 'flex-start' }} {...props}>
			<CardMedia
				component="img"
				height="250"
				image={data.img}
				alt="Paella dish"
			/>
			<CardContent>
				{
					link ? <Link to={link} style={{
						textDecoration: 'none',
						fontSize: '1.5rem',
						fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
					}}>
							{data.label}
					</Link> : <Typography pt={1} variant="h5" component="a">
						{data.label}
					</Typography>
				}
				<Typography pt={1} variant="body1" color="text.secondary">{data.adjective}</Typography>
				<Typography pt={1} variant="h6">{formatPrice(data.price)}</Typography>
			</CardContent>
			<CardActions disableSpacing>
				{
					existingGood ? <Badge badgeContent={count} color="warning">
						<IconButton onClick={handleAddCart}>
							<AddShoppingCartIcon />
						</IconButton>
					</Badge> : <IconButton onClick={handleAddCart}>
						<AddShoppingCartIcon />
					</IconButton>
				}
				<IconButton
					onClick={handleExpandClick}
					sx={{
						transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)',
						marginLeft: 'auto',
					}}
				>
					<ExpandMoreIcon />
				</IconButton>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Typography paragraph>Description</Typography>
					<Typography paragraph>{data.description}</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
};
