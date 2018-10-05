import PropTypes from "prop-types";
import React, { Component } from "react";

import UrlForm from "../../forms/Url";
import Step from "@material-ui/core/Step";
import Storage from "../../../data/Storage";
import { isUndefined } from "../../../utils";
import Button from "@material-ui/core/Button";
import { isEmptyString } from "../../../utils";
import urlTypes from "../../../constants/urlTypes";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import StepContent from "@material-ui/core/StepContent";

class Url extends Component {
	static propTypes = {
		changeStep: PropTypes.func.isRequired,
		isUrlInvalid: PropTypes.bool.isRequired,
		tryLoadingProfile: PropTypes.func.isRequired,
		classes: PropTypes.shape({
			button: PropTypes.object.isRequired,
			actionsContainer: PropTypes.object.isRequired
		}).isRequired
	};

	state = {
		url: "",
		disableNext: false,
		urlType: urlTypes.PUBLIC
	};

	componentWillMount() {
		Storage.getUrlInfo(({ url, urlType }) => {
			this.setState({
				urlType: isUndefined(urlType) ? urlTypes.PUBLIC : urlType,
				url: isUndefined(url) || urlType === urlTypes.PUBLIC ? "" : url
			});
		});
	}

	handleUrlChange = newVal => {
		this.setState({ url: newVal, disableNext: isEmptyString(newVal) });
	};

	handleUrlTypeChange = newType => {
		this.setState(state => ({
			urlType: newType,
			disableNext: newType === urlTypes.ENTERPRISE && isEmptyString(state.url)
		}));
	};

	handleButtonClick = () => {
		const { url, urlType } = this.state;
		Storage.saveUrlInfo({ url, urlType }, () => {
			const { changeStep, isUrlInvalid, index, tryLoadingProfile } = this.props;
			return isUrlInvalid ? tryLoadingProfile() : changeStep(index + 1);
		});
	};

	renderLabel() {
		const labelProps = {};
		if (this.props.isUrlInvalid) {
			labelProps.optional = (
				<Typography variant="caption" color="error">
					Possible errors:
					<ul>
						<li>URL is wrong</li>
						<li>You are offline</li>
						<li>You are not on enterprise VPN</li>
					</ul>
				</Typography>
			);
			labelProps.error = true;
		}

		return <StepLabel {...labelProps}>Select Github account type</StepLabel>;
	}

	render() {
		const { classes, isUrlInvalid, ...stepProps } = this.props;
		const { url, urlType, disableNext } = this.state;

		return (
			<Step {...stepProps}>
				{this.renderLabel()}
				<StepContent>
					<UrlForm
						url={url}
						urlType={urlType}
						isUrlInvalid={isUrlInvalid}
						onUrlChange={this.handleUrlChange}
						onUrlTypeChange={this.handleUrlTypeChange}
					/>
					<div className={classes.actionsContainer}>
						<Button
							color="primary"
							variant="contained"
							disabled={disableNext}
							className={classes.button}
							onClick={this.handleButtonClick}
						>
							{isUrlInvalid ? "Try Again" : "Next"}
						</Button>
					</div>
				</StepContent>
			</Step>
		);
	}
}

export default Url;
