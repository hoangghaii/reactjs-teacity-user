import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_DISTRICT_DATA;

const addressApi = {
	async getProvince() {
		const url = `${baseUrl}province`;
		try {
			return await axios.get(url);
		} catch (error) {
			return error;
		}
	},

	async getDistrict(id) {
		const url = `${baseUrl}district/?idProvince=${id}`;
		try {
			return await axios.get(url);
		} catch (error) {
			return error;
		}
	},

	async getCommune(id) {
		const url = `${baseUrl}commune/?idDistrict=${id}`;
		try {
			return await axios.get(url);
		} catch (error) {
			return error;
		}
	},
};

export default addressApi;
