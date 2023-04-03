import { CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography, Avatar, Card } from "@mui/material";
import { red } from "@mui/material/colors";

function FavoriteIcon() {
	return null;
}

export const NikeCard = ({ data }) => {
	return (
		<Card sx={{ maxWidth: 345 }}>
			{/*<CardHeader*/}
			{/*	avatar={*/}
			{/*		<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">*/}
			{/*			R*/}
			{/*		</Avatar>*/}
			{/*	}*/}
			{/*	title={data.name}*/}
			{/*	subheader={`${data.brand} | ${data.gender}`}*/}
			{/*/>*/}
			<CardMedia
				component="img"
				height="150"
				image={data.imageURL}
				alt="Paella dish"
			/>
			<CardContent>
				<Typography variant="h6">{data.name}</Typography>
				<Typography variant="body2" color="text.secondary">
					{data.brand} | {data.gender}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label="add to favorites">
					{/*<FavoriteIcon />*/}
				</IconButton>
				<IconButton aria-label="share">
					{/*<ShareIcon />*/}
				</IconButton>
			</CardActions>
		</Card>
	);
};