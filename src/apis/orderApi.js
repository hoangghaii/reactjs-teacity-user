import axiosClient from "./axiosClient";

const orderApi = {
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
};

export default orderApi;
