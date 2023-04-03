const requestInterceptors = [];
const responseInterceptors = [];

export const initialiseRequestInterceptor = (callback) => {
	requestInterceptors.push(callback);
};

export const initialiseResponseInterceptor = (callback) => {
	responseInterceptors.push(callback);
};

export const runInterceptors = () => {
	const { fetch: originalFetch } = window;
	window.fetch = async (...args) => {
		const [resource, config] = args;

		requestInterceptors.forEach(passArgs(resource, config));

		const response = await originalFetch(resource, config);

		responseInterceptors.forEach(passArgs(resource, config));

		return response;
	}
};

function passArgs(...args) {
	return (cb) => {
		cb(...args);
	};
}