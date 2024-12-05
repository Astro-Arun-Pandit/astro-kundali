const {mailTransporter} = require('./emailTransport');

// Sending Email Using SMTP
const mailSender = async (options, cb) => {
	try {
		const mailOptions = {
			from: process.env.SMPT_MAIL,
			to: options.email,
			subject: options.template.subject,
			text: options.template.body,
		};

		const info = await mailTransporter.sendMail(mailOptions);
		cb(info.accepted);
	} catch (error) {
		console.log(error);
	}
};

module.exports = {mailSender};
