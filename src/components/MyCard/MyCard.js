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
import { useEffect, useState } from "react";
import { formatPrice } from "../../helpers/basic";

const compare = (item) => {
	const cart = localStorage.getItem('cart');
	if (!cart) return null;
	return JSON.parse(cart).items.find(({ good }) => good.id === item.id && good.categoryTypeId === item.categoryTypeId);
};

export const MyCard = ({ data, onCardAdd }) => {
	const [expanded, setExpanded] = useState(false);

	const existingItem = compare(data);
	const [countValue, setCountValue] = useState(existingItem ? existingItem.count + 1 : 1);

	const handleExpandClick = () => {
		setExpanded((prev) => !prev);
	}

	const handleAddCart = () => {
		onCardAdd({ good: data, count: countValue });
	};

	return (
		<Card sx={{ width: '100%', alignSelf: 'flex-start' }}>
			<CardMedia
				component="img"
				height="250"
				image={data.img}
				alt="Paella dish"
			/>
			<CardContent>
				<Typography pt={1} variant="h5">{data.label}</Typography>
				<Typography pt={1} variant="body1" color="text.secondary">{data.adjective}</Typography>
				<Typography pt={1} variant="h6">{formatPrice(data.price)}</Typography>
			</CardContent>
			<CardActions disableSpacing>
				{
					existingItem ? <Badge badgeContent={countValue} color="warning">
						<IconButton onClick={handleAddCart}>
							<AddShoppingCartIcon />
						</IconButton>
					</Badge> : <IconButton onClick={handleAddCart}>
						<AddShoppingCartIcon />
					</IconButton>
				}
				{/*{*/}
				{/*	!wasAddedOnce && (*/}
				{/*		<IconButton onClick={handleFirstCartClick}>*/}
				{/*			<AddShoppingCartIcon />*/}
				{/*		</IconButton>*/}
				{/*	)*/}
				{/*}*/}
				{/*{*/}
				{/*	wasAddedOnce && (*/}
				{/*		<>*/}
				{/*			<IconButton>*/}
				{/*				<RemoveCircleIcon*/}
				{/*					onClick={() => {*/}
				{/*						setCountValue((prev) => {*/}
				{/*							if (prev - 1 < 0) return 0;*/}
				{/*							return prev - 1;*/}
				{/*						});*/}
				{/*					}}*/}
				{/*				/>*/}
				{/*			</IconButton>*/}
				{/*			<TextField*/}
				{/*				aria-readonly={true}*/}
				{/*				size="small"*/}
				{/*				value={countValue}*/}
				{/*				onInput={(event) => {*/}
				{/*					const value = event.target.value;*/}
				{/*					const isNumber = /^[0-9]+$/.test(value.trim());*/}
				{/*					if (!value.trim()) setCountValue(0);*/}
				{/*					if (!isNumber) return;*/}
				{/*					setCountValue(+value);*/}
				{/*				}}*/}
				{/*				sx={{*/}
				{/*					width: '80px',*/}
				{/*				}}*/}
				{/*			/>*/}
				{/*			<IconButton>*/}
				{/*				<AddCircleIcon*/}
				{/*					onClick={() => {*/}
				{/*						setCountValue((prev) => prev + 1);*/}
				{/*					}}*/}
				{/*				/>*/}
				{/*			</IconButton>*/}
				{/*			<Button*/}
				{/*				sx={{*/}
				{/*					marginLeft: '10px',*/}
				{/*				}}*/}
				{/*				variant="outlined"*/}
				{/*			>*/}
				{/*				Save*/}
				{/*			</Button>*/}
				{/*		</>*/}
				{/*	)*/}
				{/*}*/}
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
