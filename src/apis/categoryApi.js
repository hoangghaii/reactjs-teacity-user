import axiosClient from "./axiosClient";

const categoryApi = {
	async getAll() {
		const url = "/api/category";

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

export default categoryApi;
