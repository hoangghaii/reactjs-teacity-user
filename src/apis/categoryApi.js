import axiosClient from "./axiosClient";

const categoryApi = {
	async getAll() {
		const url = "/category";

		try {
			return await axiosClient.get(url);
		} catch (error) {
			return error;
		}
	},
};

export default categoryApi;
