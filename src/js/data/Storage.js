import { getApiUrl, getBaseUrl } from "../network/urls";

export const URL = "gh_url";
export const API_URL = "gh_api_url";
export const URL_TYPE = "gh_url_type";
export const ACCESS_TOKEN = "gh_access_token";
export const NOTIFICATIONS = "gh_notifications";
export const RENDER_ONBOARDING = "gh_render_onboarding";
const ChromeStorage = chrome.storage.sync;

export default class Storage {
	static get(data, callback) {
		ChromeStorage.get(data, callback);
	}

	static set(data, callback) {
		ChromeStorage.set(data, callback);
	}

	static saveUrlInfo({ url, urlType }, cb) {
		const apiUrl = getApiUrl(urlType, url);
		const baseUrl = getBaseUrl(urlType, url);
		ChromeStorage.set(
			{ [URL]: baseUrl, [URL_TYPE]: urlType, [API_URL]: apiUrl },
			cb
		);
	}

	static saveAccessToken({ accessToken }, cb) {
		ChromeStorage.set({ [ACCESS_TOKEN]: accessToken }, cb);
	}

	static saveNotifications({ notifications }, cb = () => {}) {
		ChromeStorage.set({ [NOTIFICATIONS]: notifications }, cb);
	}

	static setRenderOnboarding(renderOnboarding, cb = () => {}) {
		ChromeStorage.set({ [RENDER_ONBOARDING]: renderOnboarding }, cb);
	}

	static getAccountInfo(cb) {
		ChromeStorage.get(
			[URL, ACCESS_TOKEN, URL_TYPE, API_URL, RENDER_ONBOARDING],
			results => {
				cb({
					url: results[`${URL}`],
					apiUrl: results[`${API_URL}`],
					urlType: results[`${URL_TYPE}`],
					accessToken: results[`${ACCESS_TOKEN}`],
					renderOnboarding: results[`${RENDER_ONBOARDING}`]
				});
			}
		);
	}

	static getNotifications(cb) {
		ChromeStorage.get([NOTIFICATIONS], results => {
			cb(results[`${NOTIFICATIONS}`]);
		});
	}

	static getUrlInfo(cb) {
		ChromeStorage.get([URL, URL_TYPE, API_URL], results => {
			cb({
				url: results[`${URL}`],
				apiUrl: results[`${API_URL}`],
				urlType: results[`${URL_TYPE}`]
			});
		});
	}
}
