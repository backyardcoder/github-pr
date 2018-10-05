import urlTypes from "../constants/urlTypes";

export function getBaseUrl(urlType, url) {
	return urlType === urlTypes.PUBLIC ? "github.com" : `${url}`;
}

export function getApiUrl(urlType, url) {
	return urlType === urlTypes.PUBLIC
		? "https://api.github.com/"
		: `https://${url}/api/v3/`;
}

export function getTokenUrl(url) {
	return `https://${url}/settings/tokens/new`;
}
