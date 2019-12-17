import cookies from 'js-cookie';
import axios from 'axios';

import { alertSuccess } from 'src/store/advice/actions';
import { ALERT_ADVICE } from 'src/store/advice/actions';

export default (store) => (next) => (action) => {
	switch (action.type) {
		case ALERT_ADVICE: {
			//console.log('middleware advice');
			let token = cookies.get('TOKEN');
			return axios({
				method: 'post',
				url: 'http://localhost:8001/api/v1/advice/report',
				data: {
					id: action.id
				},
				headers: { Authorization: `Bearer ${token}` }
			})
				.then((response) => {
					//console.log(response);
					if (response.status === 200) {
						//console.log(response.data);
						store.dispatch(alertSuccess(response.data));
					}
				})
				.catch(function(error) {
					// handle error
					console.log(error);
				})
				.finally(function() {
					// always executed
				});
		}
	}
	next(action);
};
