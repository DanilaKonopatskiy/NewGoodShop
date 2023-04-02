import {
	Avatar,
	Box,
	Button,
	Checkbox, CircularProgress,
	Container,
	FormControlLabel, FormHelperText,
	FormLabel,
	Grid,
	Radio,
	RadioGroup,
	Switch,
	TextField,
	Typography
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegistrationSchema } from "../validation/schemas";
import { CategoriesServiceApi } from "../api/CategoiesService.api";
import RULES_MESSAGES from "../validation/messages";
import { useDispatch, useSelector } from "react-redux";
import AuthSlice from '../store/slices/auth';
import { useSnackbar } from "notistack";
import { registerUser } from "../store/actions-creators/auth.actions";
import { ApiButton } from "../components/ApiButton";
import dayjs from "dayjs";
import { Loader } from "../components";

const RegistrationPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { enqueueSnackbar } = useSnackbar();
	const authState = useSelector((state) => state.auth);
	const [categoriesLoading, setCategoriesLoading] = useState(true);
	const [checkedCategories, setCheckedCategories] = useState([]);
	const [isSecretQuestionTypeChosen, setIsSecretQuestionTypeChosen] = useState(false);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, submitCount },
		clearErrors,
		setValue,
		setError,
		control,
	} = useForm({
		resolver: yupResolver(RegistrationSchema),
		defaultValues: {
			name: '',
			surname: '',
			login: '',
			password: '',
			bornAt: '',
			isSubscribed: true,
			interests: [],
			secret: {
				type: '',
				answer: '',
			},
		}
	});

	useEffect(() => {
		if (authState.error) {
			enqueueSnackbar(authState.error, { variant: 'error' });
			dispatch(AuthSlice.actions.clearError());
		} else if (!authState.error && submitCount && !authState.isLoading) {
			enqueueSnackbar('Successfully registered', { variant: 'success' });
			navigate('/login');
		}
	}, [authState.isLoading]);

	useEffect(() => {
		if (checkedCategories.length) return;
		setCategoriesLoading(true);
		new CategoriesServiceApi()
			.getCategories()
			.then((categories) => {
				setCheckedCategories(categories.map((item) => {
					return {
						...item,
						checked: false,
					};
				}));
				setCategoriesLoading(false);
			})
			.catch(() => {
				setCategoriesLoading(false);
			});
	}, []);

	function submitHandler(values) {
		const data = { ...values };
		if (values.secret.type.trim()) {
			data.secret = values.secret;
		} else delete data.secret;

		Object.keys(data).forEach((key) => {
			if (typeof data[key] === "string" && !data[key].trim()) {
				delete data[key];
			}
		});

		dispatch(registerUser(data));
	}

	function goBackMainPage() {
		navigate('/');
	}

	if (submitCount) {
		if (!!errors.interests && watch().interests.length >= 2) {
			clearErrors('interests');
		} else if (!errors.interests && watch().interests.length < 2) {
			setError('interests', { message: RULES_MESSAGES.interests });
		}
	}

	const categoriesBoxes = (
		<Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
			{
				checkedCategories.map((category) =>
					<FormControlLabel
						control={
							<Checkbox
								checked={category.checked}
								onChange={(event) => {
									setCheckedCategories((prev) => {
										const index = prev.findIndex((item) => item.id === category.id);
										prev[index].checked = !prev[index].checked;
										setValue('interests', prev.filter((item) => item.checked));
										return [
											...prev.slice(0, index),
											prev[index],
											...prev.slice(index + 1, prev.length),
										];
									});
								}}
							/>
						}
						label={category.label}
						key={category.id}
					/>
				)
			}
		</Box>
	);

	const interestsBlock = <>
		<FormControlLabel
			label="All"
			sx={{ display: 'block' }}
			control={
				<Checkbox
					checked={checkedCategories.filter((item) => !!item.checked).length === checkedCategories.length}
					indeterminate={!!checkedCategories.find((item) => !!item.checked) && !(checkedCategories.filter((item) => !!item.checked).length === checkedCategories.length)}
					onChange={(event) => {
						setCheckedCategories((prev) => {
							if (!!checkedCategories.find((item) => !!item.checked)) {
								setValue('interests', []);
								return prev.map((item) => {
									return {
										...item,
										checked: false,
									};
								});
							}
							const newValue = prev.map((item) => {
								return {
									...item,
									checked: !item.checked,
								};
							});
							setValue('interests', newValue);
							return newValue;
						});
					}}
				/>
			}
		/>
		{categoriesBoxes}
		<FormHelperText error={!!errors.interests}>{errors.interests ? errors.interests.message : ''}</FormHelperText>
	</>;

	return (
		<Container
			component="main"
			maxWidth="xs"
			sx={{
				display: 'flex',
				alignItems: 'center',
			}}
		>
			<Box
				sx={{
					marginTop: 4,
					marginBottom: 6,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon/>
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<Box component="form" noValidate onSubmit={handleSubmit(submitHandler)} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="given-name"
								required
								fullWidth
								label="First Name"
								autoFocus
								error={!!errors.name}
								helperText={errors.name ? errors.name.message : ''}
								{...register('name')}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								fullWidth
								label="Last Name"
								autoComplete="family-name"
								error={!!errors.surname}
								helperText={errors.surname ? errors.surname.message : ''}
								{...register('surname')}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								label="Email Address"
								autoComplete="email"
								error={!!errors.email}
								helperText={errors.email ? errors.email.message : ''}
								{...register('login')}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								label="Password"
								type="password"
								autoComplete="new-password"
								error={!!errors.password}
								helperText={errors.password ? errors.password.message : ''}
								{...register('password')}
							/>
						</Grid>
						<Grid item xs={12}>
							<Controller
								name="bornAt"
								control={control}
								render={({ field: { onChange, onBlur, name, ref } }) => (
									<DatePicker
										disableFuture
										label="Date of birth"
										sx={{ width: '100%' }}
										format="DD/MM/YYYY"
										onChange={(event) => onChange(event.toString())}
										onBlur={onBlur}
										name={name}
										ref={ref}
										minDate={dayjs('Jan 01 1930 01:00:00 GMT+0300')}
										slotProps={{
											textField: {
												helperText: errors.bornAt ? errors.bornAt.message : '',
												error: !!errors.bornAt,
											},
										}}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12}>
							<FormLabel>Gender</FormLabel>
							<RadioGroup row {...register('gender')}>
								<FormControlLabel value="male" control={<Radio/>} label="Male"/>
								<FormControlLabel value="female" control={<Radio/>} label="Female"/>
								<FormControlLabel value="other" control={<Radio/>} label="Other"/>
							</RadioGroup>
						</Grid>
						<Grid item xs={12}>
							<FormLabel error={!!errors.interests}>Interests</FormLabel>
							{categoriesLoading
								? <div style={{ marginTop: '5px', marginLeft: '5px' }}>
										<CircularProgress color="inherit" size={30} />
									</div>
								: interestsBlock}
						</Grid>
						<Grid item xs={12}>
							<FormControlLabel
								control={<Switch defaultChecked/>}
								label="I want to receive inspiration, marketing promotions and updates via email"
								{...register('isSubscribed')}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								label="Secret Question"
								type="text"
								autoComplete="secret-question"
								onInput={(event) => {
									if (!isSecretQuestionTypeChosen && event.target.value.trim()) {
										setIsSecretQuestionTypeChosen(true);
									} else if (isSecretQuestionTypeChosen && !event.target.value.trim()) {
										setIsSecretQuestionTypeChosen(false);
										setValue('secret.answer', '');
									}
								}}
								{...register('secret.type')}
							/>
						</Grid>
						{
							isSecretQuestionTypeChosen && (
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										name="secretAnswer"
										label="Secret Answer"
										type="text"
										autoComplete="secret-answer"
										{...register('secret.answer')}
									/>
								</Grid>
							)
						}
					</Grid>
					<Grid item xs={12} display="flex" justifyContent="space-between">
						<Button
							color="error"
							type="button"
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							onClick={goBackMainPage}
						>
							Cancel
						</Button>
						<ApiButton
							color="secondary"
							type="submit"
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							loading={authState.isLoading}
						>
							Sign Up
						</ApiButton>
					</Grid>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link to="/login" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};

export default RegistrationPage;