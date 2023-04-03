import { Api } from "./Api";

export class CategoriesServiceApi {
	#api = new Api();

	async getCategories() {
		const data = await this.#api.get('/categories');
		return data.categories || [];
	}

	async getPopularCategories() {
		const data = await this.#api.get('/popular_categories');
		return data || [];
	}
}