import PropTypes from "prop-types";
import React, { Component } from "react";
import Step from "@material-ui/core/Step";
import Storage from "../../../data/Storage";
import Button from "@material-ui/core/Button";
import { isEmptyString } from "../../../utils";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import AccessTokenForm from "../../forms/AccessToken";
import StepContent from "@material-ui/core/StepContent";

class AccessToken extends Component {
	static propTypes = {
		changeStep: PropTypes.func.isRequired,
		tryLoadingProfile: PropTypes.func.isRequired,
		isAccessTokenInvalid: PropTypes.bool.isRequired,
		classes: PropTypes.shape({
			button: PropTypes.object.isRequired,
			actionsContainer: PropTypes.object.isRequired
		}).isRequired
	};

	state = {
		url: "",
		accessToken: "",
		disableNext: true
	};

	componentWillMount() {
		Storage.getUrlInfo(({ url }) => {
			this.setState({ url });
		});
	}

	handleBack = () => {
		const { index, changeStep } = this.props;
		changeStep(index - 1);
	};

	handleNext = () => {
		const { accessToken } = this.state;
		Storage.saveAccessToken({ accessToken }, () => {
			const {
				index,
				changeStep,
				tryLoadingProfile,
				isAccessTokenInvalid
			} = this.props;
			return isAccessTokenInvalid ? tryLoadingProfile() : changeStep(index + 1);
		});
	};

	handleAccessTokenChange = newVal => {
		this.setState({ accessToken: newVal, disableNext: isEmptyString(newVal) });
	};

	renderLabel() {
		const labelProps = {};
		if (this.props.isAccessTokenInvalid) {
			labelProps.optional = (
				<Typography variant="caption" color="error">
					Invalid access token, please add a new token.
				</Typography>
			);
			labelProps.error = true;
		}

		return <StepLabel {...labelProps}>Add access token</StepLabel>;
	}

	render() {
		const { accessToken, disableNext, url } = this.state;
		const { classes, isAccessTokenInvalid, ...stepProps } = this.props;

		return (
			<Step {...stepProps}>
				{this.renderLabel()}
				<StepContent>
					<AccessTokenForm
						url={url}
						accessToken={accessToken}
						isAccessTokenInvalid={isAccessTokenInvalid}
						onTokenChange={this.handleAccessTokenChange}
					/>
					<div className={classes.actionsContainer}>
						<Button onClick={this.handleBack} className={classes.button}>
							Back
						</Button>
						<Button
							color="primary"
							variant="contained"
							disabled={disableNext}
							onClick={this.handleNext}
							className={classes.button}
						>
							{isAccessTokenInvalid ? "Try Again" : "Next"}
						</Button>
					</div>
				</StepContent>
			</Step>
		);
	}
}

export default AccessToken;
