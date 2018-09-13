export const URL = "gh_url";
export const ACCESS_TOKEN = "gh_access_token";
const ChromeStorage = chrome.storage.sync;

export default class Storage {
	static get(data, callback) {
		ChromeStorage.get(data, callback);
	}

	static set(data, callback) {
		ChromeStorage.set(data, callback);
	}

	static saveTokenInfo({ url, accessToken }, cb) {
		ChromeStorage.set(
			{
				[URL]: url,
				[ACCESS_TOKEN]: accessToken
			},
			cb
		);
	}

	static getTokenInfo(cb) {
		ChromeStorage.get([URL, ACCESS_TOKEN], results => {
			cb({
				url: results[`${URL}`],
				accessToken: results[`${ACCESS_TOKEN}`]
			});
		});
	}
}
