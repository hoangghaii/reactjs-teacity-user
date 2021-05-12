import axios from "axios";
import StorageKey from "../constants/storage-keys";

const baseUrl = process.env.REACT_APP_BASE_URL;

const user = localStorage.getItem(StorageKey.USER);
const token = localStorage.getItem(StorageKey.TOKEN);

const axiosAuthClient = axios.create({
	baseURL: baseUrl,
	headers: {
		"Content-Type": "application/json",
	},
});

//Interceptors
// Add a request interceptor
axiosAuthClient.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		if (user && token) {
			config.headers = {
				Authorization: `Bearer ${JSON.parse(token)}`,
			};
			return config;
		}
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
axiosAuthClient.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		console.log(error);
		return Promise.reject(error);
	}
);

export default axiosAuthClient;
