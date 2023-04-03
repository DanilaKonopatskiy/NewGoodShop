export class Singleton {
	static getInstance() {
		if (!Singleton.instance) {
			Singleton.instance = new this();
		}
		return Singleton.instance;
	}
}