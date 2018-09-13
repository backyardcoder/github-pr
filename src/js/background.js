import Storage from "./data/Storage";
import GithubClient from "./network/GithubClient";

chrome.runtime.onInstalled.addListener(() => {
	Storage.getTokenInfo(({ accessToken, url }) => {
		if (accessToken && url) {
			startPolling(url, accessToken, 2000);
		}
	});
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.type == "info_saved") {
		const { url, accessToken } = request.data;
		startPolling(url, accessToken, 2000);
	}
	sendResponse(null);
});

chrome.runtime.onStartup.addListener(() => {
	Storage.getTokenInfo(({ accessToken, url }) => {
		if (accessToken && url) {
			startPolling(url, accessToken, 2000);
		}
	});
});

function startPolling(url, accessToken, time) {
	const ghInstance = new GithubClient(url, accessToken);
	ghInstance.pollNotifications(time, (err, response) => {
		if (err) {
			return void console.log(err);
		}
		console.log("response: ", response.json());
	});
}
