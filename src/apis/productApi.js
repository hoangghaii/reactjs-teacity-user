import axiosClient from "./axiosClient";

const productApi = {
	async getAll() {
		const url = "/product";

		try {
			return await axiosClient.get(url);
		} catch (error) {
			return error;
		}
	},
};

export default productApi;
