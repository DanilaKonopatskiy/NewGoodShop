import { Api } from "./Api";

export class CategoriesServiceApi {
	constructor() {
		this.api = new Api();
	}

	async getCategories() {
		const data = await this.api.get('/categories');
		return data.categories || [];
	}
}