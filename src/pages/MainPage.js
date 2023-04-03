import { GoodCategory, ImagesSlider } from '../components';

import townImage from '../assets/town.jpeg';
import manImage from '../assets/man.jpg';
import bedImage from '../assets/bed.png';
import { useEffect, useState } from "react";
import { CategoriesServiceApi } from "../api/CategoiesService.api";
import { Grid } from "@mui/material";

const images = [
	{ id: 1, src: townImage, title: 'Самые высокие весенние скидки 20%', text: 'Новые модели уже в продаже' },
	{ id: 2, src: manImage, title: 'Самые высокие весенние скидки 20%', text: 'Новые модели уже в продаже' },
	{ id: 3, src: bedImage, title: 'Самые высокие весенние скидки 20%', text: 'Новые модели уже в продаже' },
];

const MainPage = () => {
	const [popularCategories, setPopularCategories] = useState([]);
	useEffect(() => {
		new CategoriesServiceApi()
			.getPopularCategories()
			.then((categories) => {
				setPopularCategories(categories);
			});
	}, []);

	return (
		<>
			<ImagesSlider
				images={images}
				delay={4000}
				style={{
					marginBottom: '20px',
				}}
			/>
			{
				popularCategories.map((category) => (
					<GoodCategory
						key={category.category.categoryTypeId}
						category={category.category}
						items={category.items}
						itemsInCategory={3}
						style={{
							marginBottom: '20px',
						}}
					/>
				))
			}
		</>
	);
};

export default MainPage;