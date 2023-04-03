import { Api } from "./Api";
import { delay } from "../helpers/basic";

export class GoodsServiceApi {
	#api = new Api();

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