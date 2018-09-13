import React, { Component } from "react";

import Storage from "../data/Storage";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import DoneIcon from "@material-ui/icons/Done";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
	saveTokenBtn: {
		marginTop: theme.spacing.unit * 4
	},
	saveNotification: {
		padding: theme.spacing.unit
	},
	doneIcon: {
		marginRight: theme.spacing.unit
	}
});

class InfoForm extends Component {
	constructor() {
		super(...arguments);
		this.state = {
			url: "",
			isSaving: false,
			accessToken: "",
			infoSaved: false
		};
		this.saveInfo = this.saveInfo.bind(this);
	}

	saveInfo() {
		this.setState({
			isSaving: true
		});
		const { accessToken, url } = this.state;
		Storage.saveTokenInfo({ url, accessToken }, () => {
			this.setState({ isSaving: false, infoSaved: true });
			chrome.runtime.sendMessage({
				type: "info_saved",
				data: {
					url,
					accessToken
				}
			});
		});
	}

	isRequiredInfoPresent() {
		const { accessToken, url } = this.state;
		return accessToken.trim() !== "" && url.trim() !== "";
	}

	renderTokenForm() {
		const { classes } = this.props;
		return (
			<React.Fragment>
				<TextField
					margin="normal"
					fullWidth={true}
					autoFocus={true}
					id="access_token_ip"
					label="Access Token"
					onChange={e => this.setState({ accessToken: e.target.value })}
				/>
				<TextField
					margin="normal"
					fullWidth={true}
					id="access_token_url"
					label="Github/Enterprise URL"
					onChange={e => this.setState({ url: e.target.value })}
				/>
				<Button
					color="primary"
					variant="raised"
					onClick={this.saveInfo}
					className={classes.saveTokenBtn}
					disabled={!this.isRequiredInfoPresent()}
				>
					Save in Browser
				</Button>
			</React.Fragment>
		);
	}

	render() {
		const { classes } = this.props;
		const { isSaving, infoSaved } = this.state;
		return (
			<Grid direction="column" justify="center" alignItems="center">
				{infoSaved ? (
					<Paper elevation={1}>
						<Grid
							container
							alignItems="center"
							className={classes.saveNotification}
						>
							<DoneIcon color="primary" className={classes.doneIcon} />
							<Typography variant="subheading">Information Saved!</Typography>
						</Grid>
					</Paper>
				) : (
					<React.Fragment>
						<Typography paragraph gutterBottom>
							In order to fetch notifications from your github account you will
							need to create an access token with appropriate permissions. Read
							more{" "}
							<a target="_blank" href="">
								here
							</a>
							.
						</Typography>
						<Typography paragraph>
							Rest assured your token will not transmitted anywhere. It will be
							saved in your browser storage.
						</Typography>
						{!isSaving ? this.renderTokenForm() : <CircularProgress />}
					</React.Fragment>
				)}
			</Grid>
		);
	}
}

export default withStyles(styles)(InfoForm);
