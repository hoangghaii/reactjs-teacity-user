import axiosClient from "./axiosClient";

const productApi = {
	async getAll() {
		try {
			return await axiosClient.get();
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

	async filter(name) {
		const params = `name=${name}`;

		try {
			return await axiosClient.get({ params });
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

	async create(data) {
		try {
			return await axiosClient.post({ data });
		} catch (error) {
			return error;
		}
	},

	async update(data) {
		const url = `/${data.id}`;
		try {
			return await axiosClient.patch(url, { data });
		} catch (error) {
			return error;
		}
	},

	async remove(id) {
		const url = `/${id}`;
		try {
			return await axiosClient.delete(url);
		} catch (error) {
			return error;
		}
	},
};

export default productApi;
