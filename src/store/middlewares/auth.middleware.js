export const authMiddleware = (store) => (next) => (action) => {
	const result = next(action);
	if (action.type?.startsWith('auth/loginUser')) {
		const authState = store.getState().auth;
		if (authState.isAuthed) {
			localStorage.setItem('auth', JSON.stringify({
				login: authState.login,
				token: authState.token,
			}));
		}
	}
	return result;
};

export const rehydrateAuthStore = () => {
	if (localStorage.getItem('auth') !== null) {
		const data = JSON.parse(localStorage.getItem('auth')) || {};
		if (!data.token) return {};
		data.isAuthed = !!data.token;
		return data;
	}
};