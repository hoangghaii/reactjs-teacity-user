import axiosClient from "./axiosClient";

const productApi = {
	async getAll() {
		const url = "/api/product";

		try {
			return await axiosClient.get(url);
		} catch (error) {
			return error;
		}
	},

	async get(id) {
		const url = `/${id}`;
		try {
			return await axiosClient.get(url);
		} catch (error) {
			return error;
		}
	},

	async getWithPaginate(name) {
		const params = "_page=2&_limit=10";

		try {
			return await axiosClient.get({ params });
		} catch (error) {
			return error;
		}
	},
};

export default productApi;
