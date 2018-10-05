import "../css/index.scss";
import React from "react";
import ReactDOM from "react-dom";
import Home from "./components/Home";
import Storage from "./data/Storage";

Storage.getAccountInfo(accountInfo => {
	ReactDOM.render(
		<Home {...accountInfo} />,
		document.getElementById("ext-app")
	);
});
