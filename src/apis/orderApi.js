import axiosClient from "./axiosClient";

const orderApi = {
	async create(dataCreate) {
		const url = "/order";

		const data = {
			listProduct: dataCreate.listProduct,
			total_price: dataCreate.totalPrice,
			address: dataCreate.userAddress,
			name: dataCreate.userName,
			phone: dataCreate.userPhone,
			user_id: dataCreate.userId,
		};

		try {
			return await axiosClient.post(url, data);
		} catch (error) {
			return error;
		}
	},
};

export default orderApi;
