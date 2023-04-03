import React, { useEffect } from 'react';
import {
	Avatar,
	Box,
	Container,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import { Link } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../validation/schemas";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/actions-creators/auth.actions";
import { useSnackbar } from "notistack";
import { ApiButton } from "../components/ApiButton";
import AuthSlice from "../store/slices/auth";
import { useNavigate } from "react-router";

const LoginPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const authState = useSelector((state) => state.auth);
	const { enqueueSnackbar } = useSnackbar();
	const { handleSubmit, register, formState: { errors } } = useForm({
		resolver: yupResolver(LoginSchema),
	});

	useEffect(() => {
		if (authState.error) {
			enqueueSnackbar(authState.error, { variant: 'error' });
			dispatch(AuthSlice.actions.clearError());
		} else if (authState.isAuthed) {
			enqueueSnackbar('Successfully authorized', { variant: 'success' });
			navigate('/');
		}
	}, [authState.isLoading]);

	function onSubmit(data) {
		dispatch(loginUser(data));
	}

	return (
		<Container
			component="main"
			maxWidth="xs"
			className="auth-wrapper"
			sx={{
				display: 'flex',
				alignItems: 'center',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						label="Email Address"
						autoComplete="email"
						autoFocus
						disabled={authState.isLoading}
						error={!!errors.email}
						helperText={errors.email ? errors.email.message : ''}
						{...register('login')}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						label="Password"
						type="password"
						disabled={authState.isLoading}
						error={!!errors.password}
						helperText={errors.password ? errors.password.message : ''}
						{...register('password')}
					/>
					<ApiButton
						type="submit"
						fullWidth
						variant="contained"
						color="secondary"
						sx={{ mt: 3, mb: 2 }}
						loading={authState.isLoading}
					>
						Sign In
					</ApiButton>
					<Grid container>
						<Grid item xs>
							<Link to="#" variant="body2">
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link to="/registration" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};

export default LoginPage;