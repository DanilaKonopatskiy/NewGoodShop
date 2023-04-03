import { Api } from "./Api";

export class AuthServiceApi {
	#api = new Api();

	constructor() {
		if (!AuthServiceApi.instance) {
			AuthServiceApi.instance = this;
		}

		return AuthServiceApi.instance;
	}
	async login(values) {
		await delay(1500);
		return await this.#api.post('/login', values);
	}

	async register(values) {
		await delay(2500);
		return await this.#api.post('/registration', values);
	}
}

function delay(ms = 2000) {
	return new Promise((res) => {
		setTimeout(res, ms);
	});
}