import {notification} from 'antd';

const showNotification = (type, message, description) => {
	notification[type]({
		message,
		description
	});
};


export default showNotification;