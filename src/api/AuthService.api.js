import { Api } from "./Api";
import { delay } from "../helpers/basic";

export class AuthServiceApi {
	#api = new Api();
	token = '';

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

	async logout() {
		await delay(1200);
	}
}