import React, { Component } from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import Step from "@material-ui/core/Step";
import Button from "@material-ui/core/Button";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import StepContent from "@material-ui/core/StepContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import NotificationsFetcher from "../../Notifications/NotificationsFetcher";

class LoadNotifications extends Component {
	static PropTypes = {
		onSuccess: PropTypes.func.isRequired,
		handleInvalidUrl: PropTypes.func.isRequired,
		handleInvalidAccessToken: PropTypes.func.isRequired
	};

	state = {
		isLoading: true
	};

	hasError = err => {
		const { status } = err;
		if (status === 401 || status === 403) {
			return this.props.handleInvalidAccessToken();
		}

		return this.props.handleInvalidUrl();
	};

	onSuccess = () => {
		this.setState({
			isLoading: false
		});
	};

	render() {
		const { isLoading } = this.state;
		const { classes, onSuccess } = this.props;
		return (
			<Step {...this.props}>
				<StepLabel>Load Notifications</StepLabel>
				<StepContent>
					<Grid container direction="column" spacing={16}>
						<NotificationsFetcher
							hasError={this.hasError}
							onSuccess={this.onSuccess}
						/>
						{isLoading ? (
							<Grid item>
								<CircularProgress size={50} />
							</Grid>
						) : (
							<React.Fragment>
								<Grid item>
									<Typography variant="subheading">
										Success! You are all set to use this extension.
									</Typography>
								</Grid>
								<Grid item>
									<Button
										color="primary"
										variant="contained"
										onClick={onSuccess}
										className={classes.button}
									>
										View Notifications
									</Button>
								</Grid>
							</React.Fragment>
						)}
					</Grid>
				</StepContent>
			</Step>
		);
	}
}

export default LoadNotifications;
