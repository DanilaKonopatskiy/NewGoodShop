import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import './App.css';
import { Loader, withPageWrapper } from "./components";
import { SnackbarProvider } from "notistack";
import { Protection } from "./components/Protection";

const MainPage = lazy(() => import('./pages/MainPage'))
const CartPage = lazy(() => import('./pages/CartPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const GoodPage = lazy(() => import('./pages/GoodPage'));

const router = createBrowserRouter([
	{
		path: '/',
		element: withPageWrapper(<MainPage/>),
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
		element: withPageWrapper(<CategoryPage/>),
	},
	{
		path: '/categories/:categoryType/:goodId',
		element: withPageWrapper(<GoodPage/>)
	},
]);

function App() {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<SnackbarProvider maxSnack={5}>
				<Suspense fallback={<Loader loading={true}/>}>
					<RouterProvider router={router}/>
				</Suspense>
			</SnackbarProvider>
		</LocalizationProvider>
	);
}

export default App;
