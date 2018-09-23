import React from "react";
import UrlForm from "./forms/Url";
import UserProfile from "./UserProfile";
import { isEmptyString } from "../utils";
import Step from "@material-ui/core/Step";
import urlTypes from "../constants/urlTypes";
import Button from "@material-ui/core/Button";
import Stepper from "@material-ui/core/Stepper";
import AccessTokenForm from "./forms/AccessToken";
import StepLabel from "@material-ui/core/StepLabel";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import StepContent from "@material-ui/core/StepContent";

const { PUBLIC } = urlTypes;
const styles = theme => ({
	root: {
		padding: "0px"
	},
	button: {
		marginTop: theme.spacing.unit * 2,
		marginRight: theme.spacing.unit
	},
	actionsContainer: {
		marginBottom: theme.spacing.unit
	}
});

class Onboarding extends React.Component {
	constructor() {
		super(...arguments);
		this.state = {
			activeStep: 0,
			disableNext: false,
			isUrlInvalid: false,
			url: this.props.url || "",
			isAccessTokenInvalid: false,
			urlType: this.props.urlType || PUBLIC,
			accessToken: this.props.accessToken || ""
		};
		this.handleNext = this.handleNext.bind(this);
		this.handleBack = this.handleBack.bind(this);
		this.handleUrlChange = this.handleUrlChange.bind(this);
		this.handleInvalidUrl = this.handleInvalidUrl.bind(this);
		this.tryLoadingProfile = this.tryLoadingProfile.bind(this);
		this.handleUrlTypeChange = this.handleUrlTypeChange.bind(this);
		this.handleAccessTokenChange = this.handleAccessTokenChange.bind(this);
		this.handleInvalidAccessToken = this.handleInvalidAccessToken.bind(this);
	}

	handleNext() {
		this.setState(state => {
			const nextActiveStep = state.activeStep + 1;
			return {
				activeStep: nextActiveStep,
				disableNext: nextActiveStep === 1 && isEmptyString(state.accessToken)
			};
		});
	}

	handleBack() {
		this.setState(state => {
			const nextActiveStep = state.activeStep - 1;
			return {
				activeStep: nextActiveStep,
				disableNext: false
			};
		});
	}

	handleUrlTypeChange(newType) {
		this.setState(state => ({
			urlType: newType,
			url: state.urlType === newType ? state.url : "",
			disableNext: newType !== PUBLIC && isEmptyString(state.url)
		}));
	}

	handleUrlChange(newVal) {
		if (!isEmptyString(newVal)) {
			this.setState({ url: newVal, disableNext: false });
		}
	}

	handleAccessTokenChange(newVal) {
		if (!isEmptyString(newVal)) {
			this.setState({ accessToken: newVal, disableNext: false });
		}
	}

	handleInvalidUrl() {
		this.setState({
			activeStep: 0,
			isUrlInvalid: true,
			isAccessTokenInvalid: false
		});
	}

	handleInvalidAccessToken() {
		this.setState({
			activeStep: 1,
			isUrlInvalid: false,
			isAccessTokenInvalid: true
		});
	}

	tryLoadingProfile() {
		this.setState({
			activeStep: 2,
			isUrlInvalid: false,
			isAccessTokenInvalid: false
		});
	}

	renderUrlForm() {
		const { classes } = this.props;
		const { url, urlType, isUrlInvalid, disableNext } = this.state;
		const labelProps = {};
		if (isUrlInvalid) {
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
		return (
			<Step>
				<StepLabel {...labelProps}>Select Github account type</StepLabel>
				<StepContent>
					<UrlForm
						url={url}
						urlType={urlType}
						isUrlInvalid={isUrlInvalid}
						handleUrlChange={this.handleUrlChange}
						handleUrlTypeChange={this.handleUrlTypeChange}
					/>
					<div className={classes.actionsContainer}>
						<Button
							color="primary"
							variant="contained"
							disabled={disableNext}
							onClick={isUrlInvalid ? this.tryLoadingProfile : this.handleNext}
							className={classes.button}
						>
							{isUrlInvalid ? "Try Again" : "Next"}
						</Button>
					</div>
				</StepContent>
			</Step>
		);
	}

	renderTokenForm() {
		const { classes } = this.props;
		const { accessToken, isAccessTokenInvalid, disableNext } = this.state;
		const labelProps = {};
		if (isAccessTokenInvalid) {
			labelProps.optional = (
				<Typography variant="caption" color="error">
					Invalid access token, please add a new token.
				</Typography>
			);
			labelProps.error = true;
		}
		return (
			<Step>
				<StepLabel {...labelProps}>Add access token</StepLabel>
				<StepContent>
					<AccessTokenForm
						accessToken={accessToken}
						isAccessTokenInvalid={isAccessTokenInvalid}
						handleAccessTokenChange={this.handleAccessTokenChange}
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

	renderUserProfile() {
		const { url, accessToken, urlType } = this.state;
		return (
			<Step>
				<StepLabel>Load Profile</StepLabel>
				<StepContent>
					<UserProfile
						accessToken={accessToken}
						handleInvalidUrl={this.handleInvalidUrl}
						handleInvalidAccessToken={this.handleInvalidAccessToken}
						url={urlType === urlTypes.ENTERPRISE ? `${url}/api/v3` : url}
					/>
				</StepContent>
			</Step>
		);
	}

	renderSteps() {
		return [
			this.renderUrlForm(),
			this.renderTokenForm(),
			this.renderUserProfile()
		];
	}

	render() {
		const { classes } = this.props;
		const { activeStep } = this.state;

		return (
			<Stepper
				activeStep={activeStep}
				orientation="vertical"
				className={classes.root}
			>
				{this.renderSteps()}
			</Stepper>
		);
	}
}

export default withStyles(styles)(Onboarding);
