import Axios from 'axios';

const axios = Axios.create({
	baseURL: '',
	headers: {
		'X-Requested-With': 'XMLHttpRequest',
	},
	withCredentials: true,
});

export default axios;
