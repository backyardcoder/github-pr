export const URL = "gh_url";
export const URL_TYPE = "gh_url_type";
export const ACCESS_TOKEN = "gh_access_token";
const ChromeStorage = chrome.storage.sync;

export default class Storage {
	static get(data, callback) {
		ChromeStorage.get(data, callback);
	}

	static set(data, callback) {
		ChromeStorage.set(data, callback);
	}

	static saveUrlInfo({ url, urlType }, cb) {
		ChromeStorage.set(
			{
				[URL]: url,
				[URL_TYPE]: urlType
			},
			cb
		);
	}

	static saveAccessToken({ accessToken }, cb) {
		ChromeStorage.set(
			{
				[ACCESS_TOKEN]: accessToken
			},
			cb
		);
	}

	static getAccountInfo(cb) {
		ChromeStorage.get([URL, ACCESS_TOKEN, URL_TYPE], results => {
			cb({
				url: results[`${URL}`],
				urlType: results[`${URL_TYPE}`],
				accessToken: results[`${ACCESS_TOKEN}`]
			});
		});
	}
}
