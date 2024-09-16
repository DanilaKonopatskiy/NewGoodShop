import { Box, debounce, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useRef, useState } from "react";
import { CategoriesServiceApi } from "../../api/CategoiesService.api";
import { GoodsServiceApi } from "../../api/GoodsService.api";
import { Link } from "react-router-dom";

import './styles.css';

export const SearchBar = () => {
	const [search, setSearch] = useState('');
	const [categories, setCategories] = useState([]);
	const [allGoods, setAllGoods] = useState([]);
	const [searchedGoods, setSearchedGoods] = useState([]);
	const [isOpened, setIsOpened] = useState(false);

	const categoriesIds = categories.reduce((acc, category, index, array) => {
		acc += category.categoryTypeId.toString();
		if (index !== array.length - 1) {
			acc += ',';
		}
		return acc;
	}, '');

	const findType = (id) => {
		return categories.find((category) => +category.categoryTypeId === +id).type;
	};

	const debouncedHandleSearch = debounce(async (value) => {
		if (!value) {
			return setSearchedGoods([]);
		}
		let searched = [];
		setTimeout(() => {
			searched = allGoods.filter(({ label }) => {
				return label.toLowerCase().includes(value.toLowerCase().trim());
			});
			setSearchedGoods(searched);
			setIsOpened(true);
		}, 0);
	}, 1500);

	useEffect(() => {
		new CategoriesServiceApi().getCategories()
			.then((categories) => {
				setCategories(categories);
			});
	}, []);

	useEffect(() => {
		new GoodsServiceApi().getAllGoods({
			categoryTypeIds: categoriesIds,
			limit: categoriesIds.split(',').length * 20,
		})
			.then((goods) => {
				setAllGoods(goods.items);
			});
	}, [categoriesIds]);

	useEffect(() => {
		document.addEventListener('click', (event) => {
			if (!['search-input', 'search-results', 'no-matches'].includes(event.target.id)) {
				setIsOpened(false);
			}
		});
	}, []);

	const handleInput = (event) => {
		const value = event.target.value;
		setSearch(value);
		debouncedHandleSearch(value);
	};

	return (
		<Box
			component="div"
			sx={{
				display: 'flex',
				alignItems: 'center',
				height: '100%',
				position: 'relative'
			}}
		>
			<TextField
				id="search-input"
				type="search"
				size="small"
				placeholder="Search..."
				fullWidth
				value={search}
				onInput={handleInput}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<SearchIcon />
						</InputAdornment>
					),
				}}
			/>
			<Grid
				className="results"
				id="search-results"
				style={{
					overflowY: searchedGoods.length > 7 ? 'scroll' : 'auto',
				}}
			>
				{
					isOpened && (searchedGoods.length ? searchedGoods.map((good) => (
						<Grid>
							<Link to={`/categories/${findType(good.categoryTypeId)}/${good.id}`} className="link">
								{good.label}
							</Link>
						</Grid>
					)) : <Typography component="h4" fontSize={18} p={2} id="no-matches">No items matched</Typography>)
				}
			</Grid>
		</Box>
	);
}
