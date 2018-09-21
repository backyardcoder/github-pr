import React, { Component } from "react";
import { isEmptyString } from "../utils";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import GithubClient from "../network/GithubClient";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
	profilePic: {
		width: 60,
		height: 60
	}
});

class UserProfile extends Component {
	constructor() {
		super(...arguments);
		this.state = {
			user: null,
			isLoading: true
		};
	}

	componentWillReceiveProps({ url, accessToken }) {
		const ghClient = !isEmptyString(url)
			? new GithubClient(accessToken, url)
			: new GithubClient(accessToken);

		ghClient.getUser((errResponse, response) => {
			if (errResponse) {
				const { status } = errResponse;
				if (status === 401) {
					return this.props.handleInvalidAccessToken();
				}

				return this.props.handleInvalidUrl();
			}

			response.json().then(user => {
				this.setState({
					user,
					isLoading: false
				});
			});
		});
	}

	render() {
		const { classes } = this.props;
		const { isLoading, user } = this.state;

		return (
			<Grid container direction="column" spacing={16} alignItems="center">
				{isLoading ? (
					<Grid item>
						<CircularProgress size={50} />
					</Grid>
				) : (
					<React.Fragment>
						<Grid item>
							<Avatar
								alt={user.login}
								src={user.avatar_url}
								className={classes.profilePic}
							/>
						</Grid>
						<Grid item>
							<Typography variant="subheading">
								Welcome, <strong>{user.login}</strong>!
							</Typography>
						</Grid>
					</React.Fragment>
				)}
			</Grid>
		);
	}
}

export default withStyles(styles)(UserProfile);
