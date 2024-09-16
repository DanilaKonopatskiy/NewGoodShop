import { AuthServiceApi } from "../../api/AuthService.api";
import { initialiseRequestInterceptor } from "../../api/inteceptors";

export const authMiddleware = (store) => (next) => (action) => {
	const result = next(action);
	if (action.type?.startsWith('auth/loginUser')) {
		const authState = store.getState().auth;
		if (authState.isAuthed) {
			localStorage.setItem('auth', JSON.stringify({
				login: authState.login,
				token: authState.token,
			}));
			new AuthServiceApi().token = authState.token;
			initialiseRequestInterceptor((resource, config) => {
				config && (config.headers.Authorization = `Bearer ${authState.token}`);
			});
		}
	} else if (action.type?.startsWith('auth/logoutUser')) {
		localStorage.removeItem('auth');
		new AuthServiceApi().token = '';
	}
	return result;
};

export const rehydrateAuthStore = () => {
	if (localStorage.getItem('auth') !== null) {
		const data = JSON.parse(localStorage.getItem('auth')) || {};
		if (data.token) {
			new AuthServiceApi().token = data.token;
			data.isAuthed = !!data.token;
			initialiseRequestInterceptor((resource, config) => {
				config && (config.headers.Authorization = `Bearer ${data.token}`);
			});
			return data;
		}
		return {};
	}
};