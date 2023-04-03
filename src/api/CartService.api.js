import { Api } from "./Api";
import { delay } from "../helpers/basic";

export class CartServiceApi {
	#api = new Api();

	async getCart() {
		await delay(1000);
		return await this.#api.get('/cart');
	}

	async addToCart(product) {
		await delay(1000);
		return await this.#api.put('/cart', product);
	}

	updateCart() {

	}

	async clearCart() {
		await delay(2000);
	}
}