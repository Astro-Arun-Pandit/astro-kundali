const NodeMailer = require('nodemailer');

const mailTransporter = NodeMailer.createTransport({
	host: process.env.SMPT_HOST,
	port: process.env.SMPT_PORT,
	service: process.env.SMPT_SERVICE,
	secure: false,
	auth: {
		user: process.env.SMPT_MAIL,
		pass: process.env.SMPT_PASSWORD,
	},
});

module.exports = {mailTransporter};
