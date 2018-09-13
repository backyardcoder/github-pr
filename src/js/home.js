import "../css/index.scss";
import React from "react";
import ReactDOM from "react-dom";
import Home from "./components/Home";
import Storage from "./data/Storage";

Storage.getTokenInfo(results => {
	const { url, accessToken } = results;
	ReactDOM.render(
		<Home accessToken={accessToken} url={url} />,
		document.getElementById("ext-app")
	);
});
