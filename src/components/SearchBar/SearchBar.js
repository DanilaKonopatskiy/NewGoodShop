import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import './styles.css';

export const SearchBar = () => (
	<Box
		component="div"
		sx={{
			display: 'flex',
			alignItems: 'center',
			height: '100%',
		}}
	>
		<TextField
			id="search"
			type="search"
			size="small"
			placeholder="Search..."
			fullWidth
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<SearchIcon />
					</InputAdornment>
				),
			}}
		/>
	</Box>
);