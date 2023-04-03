import { Box, Container, Grid } from '@mui/material';
import { GoodCategory, ImagesSlider, ItemsList, ItemsMenu, Loader, MainFooter, MainHeader } from '../components';

import townImage from '../assets/town.jpeg';
import manImage from '../assets/man.jpg';
import bedImage from '../assets/bed.png';

const images = [
	{ id: 1, src: townImage, title: 'Самые высокие весенние скидки 20%', text: 'Новые модели уже в продаже' },
	{ id: 2, src: manImage, title: 'Самые высокие весенние скидки 20%', text: 'Новые модели уже в продаже' },
	{ id: 3, src: bedImage, title: 'Самые высокие весенние скидки 20%', text: 'Новые модели уже в продаже' },
];

const MainPage = () => {
	const nikes = require('../data/sneakers.json');
	console.log('Nikes', nikes)
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
				<Box gridColumn="span 10" pr={2} pl={2}>
					<ItemsList />
					<GoodCategory items={nikes} />
				</Box>
			</Grid>
			<Loader initial={true}/>
		</Grid>
	);
};

export default MainPage;