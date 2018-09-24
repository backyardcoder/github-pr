import "../css/index.scss";
import React from "react";
import ReactDOM from "react-dom";
import Home from "./components/Home";
import Storage from "./data/Storage";

Storage.getAccountInfo(results => {
	const { url, accessToken } = results;
	ReactDOM.render(
		<Home accessToen={accessToken} url={url} />,
		document.getElementById("ext-app")
	);
});
