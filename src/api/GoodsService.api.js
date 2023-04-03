import { Api } from "./Api";
import { delay } from "../helpers/basic";

export class GoodsServiceApi {
	#api = new Api();

	async getOneGood(id) {
		await delay(1000);
		const data = await this.#api.get(`/goods?ids=${id}`);
		if (data.total < 1) throw new Error('Товар не найден');
		return data.items[0];
	}

	async getAllGoods(queries) {
		await delay(2000);
		const data = await this.#api.get(
			`/goods${queries ? this.#api.convertToQuery(queries) : ''}`
		);
		return data || {
			items: [],
			total: 0,
		};
	}
}