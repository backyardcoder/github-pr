import "../css/index.scss";
import React from "react";
import ReactDOM from "react-dom";
import Home from "./components/Home";

chrome.storage.sync.get(["gh_url", "gh_access_token"], function(results) {
	const { gh_url: url, gh_accesstoken: accessToken } = results;
	ReactDOM.render(
		<Home accessToken={accessToken} url={url} />,
		document.getElementById("ext-app")
	);
});
