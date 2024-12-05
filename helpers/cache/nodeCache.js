const NodeCache = require('node-cache');
const customCache = new NodeCache();

const setCacheValue = (key, value) => {
	return customCache.set(key, value, 2 * 60 * 60); // 2 hour
};

const getCacheValue = key => {
	return customCache.get(key);
};

module.exports = {setCacheValue, getCacheValue};
