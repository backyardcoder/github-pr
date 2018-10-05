import Storage from "./data/Storage";
import GithubClient from "./network/GithubClient";
import messageTypes from "./constants/messageTypes";

chrome.runtime.onInstalled.addListener(() => {
	Storage.setRenderOnboarding(true);
	startPolling(10000);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.type == messageTypes.ONBOARDING_COMPLETE) {
		startPolling(10000);
	}
	sendResponse(null);
});

chrome.runtime.onStartup.addListener(() => {
	startPolling(10000);
});

function startPolling(time) {
	Storage.getAccountInfo(({ accessToken, apiUrl }) => {
		if (accessToken && apiUrl) {
			const ghInstance = new GithubClient(accessToken, apiUrl);
			ghInstance.pollNotifications(time, (err, response) => {
				if (err) {
					Storage.setRenderOnboarding(true);
				}
				response.json().then(notifications => {
					Storage.saveNotifications({ notifications });
				});
			});
		}
	});
}
