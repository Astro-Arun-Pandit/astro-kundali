const axios = require('axios');

const sendSms = async (to, message, next) => {
	try {
		const apikey = process.env.MTALK_API_KEY;
		const senderid = process.env.MTALK_SENDER_ID;
		const url = `http://msg.mtalkz.com/V2/http-api.php?apikey=${apikey}&senderid=${senderid}&number=${to}&message=${message}&format=json`;
		const response = await axios.get(url, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const responseData = response.data;

		if (
			response.status === 200 &&
			responseData.status === 'OK' &&
			responseData.message === 'message Submitted successfully'
		) {
			return true;
		}

		return false;
	} catch (error) {
		console.error('Error sending SMS:', error);
		const custError = new Error('Failed To Send Sms');
		custError.status = 424; // Failed Dependency
		next(custError);
	}
};

module.exports = {sendSms};
