const moment = require('moment');
const randomstring = require('randomstring');
const fs = require('fs');

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function replaceAndAddChar(string, replaceChar = '_', addChar = '') {
	return string.replace(replaceChar, addChar);
}

const getCurrentTimePlusMinutes = time => {
	const currentTime = moment();
	if (typeof time !== 'number' || isNaN(time)) {
		currentTime.add(10, 'minutes');
	}
	currentTime.add(time, 'minutes');

	return currentTime.format();
};

const generateOtp = () => {
	const min = 100000; // The minimum 6-digit number
	const max = 999999; // The maximum 6-digit number
	return process.env.NODE_ENV === 'development' ? 123456 : Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomAlphaNum = (length = 6) => {
	return randomstring.generate({
		length: length,
		charset: ['alphabetic', 'numeric'],
	});
};

const removeFile = filePath => {
	if (filePath && fs.existsSync(filePath)) {
		fs.unlinkSync(filePath);
	}
};



const findNonMatchingElements = (arr1, arr2) => {
	const set1 = new Set(arr1);
	const set2 = new Set(arr2);

	const uniqueToArr1 = arr1.filter(item => !set2.has(Number(item)) && !set2.has(item?.toString()));
	const uniqueToArr2 = arr2.filter(item => !set1.has(Number(item)) && !set1.has(item?.toString()));
	return uniqueToArr1.concat(uniqueToArr2);
};

module.exports = {
	capitalizeFirstLetter,
	replaceAndAddChar,
	getCurrentTimePlusMinutes,
	generateOtp,
	generateRandomAlphaNum,
	removeFile,
	findNonMatchingElements,
};
