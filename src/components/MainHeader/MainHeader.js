import React, { useEffect, useState } from 'react';
import { Badge, Button, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { ReactComponent as NikeSvg } from '../../assets/nike.svg';
import { SearchBar } from "../SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/actions-creators/auth.actions";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";

import './styles.css';
import { ApiButton } from "../ApiButton";

export const MainHeader = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const cartState = useSelector((state) => state.cart);
	const [isClicked, setIsClicked] = useState(false);
	const { enqueueSnackbar } = useSnackbar();
	const { isAuthed, isLoading: isAuthLoading } = useSelector((state) => state.auth);

	useEffect(() => {
		if (!isAuthed && isClicked) {
			enqueueSnackbar('Logged out', { variant: 'success', autoHideDuration: 3000 });
			setIsClicked(false);
			navigate('/');
		}
	}, [isAuthLoading, isClicked]);

	const handleLogOut = () => {
		setIsClicked(true);
		dispatch(logoutUser());
	};

	return (
		<Grid container className='header' pt={2} pb={2} sx={{ boxShadow: '0 3px 4px lightgray' }}>
			<Container sx={{ display: 'flex' }}>
				<Grid item sm={2}>
					<Link to='/'>
						<NikeSvg />
					</Link>
				</Grid>
				<Grid item sm={8}>
					<SearchBar/>
				</Grid>
				<Grid item sm
				      display="flex"
				      alignItems="center"
				      justifyContent={isAuthed ? 'space-between' : 'flex-end'}
				      pr={2} pl={2}
				>
					{
						!isAuthed && <Link
							to="/login"
							className="link"
						>Log In</Link>
					}
					{
						isAuthed && <ApiButton
							onClick={handleLogOut}
							variant="contained"
							color="secondary"
							loading={isAuthLoading}
						>Log Out</ApiButton>
					}
					{
						isAuthed && (
							<Badge
								invisible={!cartState.items.length}
								badgeContent={cartState.items.length}
								color="secondary"
							>
								<Link
									to="/cart"
									className="link"
								>Cart</Link>
							</Badge>
						)
					}
				</Grid>
			</Container>
		</Grid>
	);
};