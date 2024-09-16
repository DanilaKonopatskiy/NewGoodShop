import { Component, lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { withPageWrapper } from "./components";
import { SnackbarProvider } from "notistack";
import { Protection } from "./components/Protection";
import { runInterceptors } from "./api/inteceptors";
import { CircularProgress } from "@mui/material";

const MainPage = lazy(() => import('./pages/MainPage'))
const CartPage = lazy(() => import('./pages/CartPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const GoodPage = lazy(() => import('./pages/GoodPage'));

const router = createBrowserRouter([
	{
		path: '/',
		element: withPageWrapper(<MainPage/>, { extended: true }),
	},
	{
		path: '/cart',
		element:
			<Protection requiresAuth={true}>
				{withPageWrapper(<CartPage/>)}
			</Protection>
	},
	{
		path: '/login',
		element:
			<Protection requiresAuth={false} only>
				<LoginPage/>
			</Protection>
	},
	{
		path: '/registration',
		element:
			<Protection requiresAuth={false} only>
				<RegistrationPage/>
			</Protection>
	},
	{
		path: '/categories/:categoryType',
		element: withPageWrapper(<CategoryPage/>, { extended: true }),
	},
	{
		path: '/categories/:categoryType/:goodId',
		element: withPageWrapper(<GoodPage/>, { extended: true }),
	},
]);

class App extends Component {
	componentDidMount() {
		runInterceptors();
	}

	componentDidCatch(error, errorInfo) {}

	render() {
		return (
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<SnackbarProvider maxSnack={5}>
					<Suspense fallback={<CircularProgress color="inherit" size={24} />}>
						<RouterProvider router={router}/>
					</Suspense>
				</SnackbarProvider>
			</LocalizationProvider>
		);
	}
}

export default App;
