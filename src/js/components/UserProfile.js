import PropTypes from "prop-types";
import React, { Component } from "react";

import Storage from "../data/Storage";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import GithubClient from "../network/GithubClient";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = () => ({
	profilePic: {
		width: 60,
		height: 60
	}
});

class UserProfile extends Component {
	static PropTypes = {
		hasError: PropTypes.func.isRequired,
		classes: PropTypes.shape({
			profilePic: PropTypes.object.isRequired
		}).isRequired
	};

	state = {
		user: null,
		isLoading: true
	};

	componentWillMount() {
		Storage.getAccountInfo(({ apiUrl, accessToken }) => {
			const ghClient = new GithubClient(accessToken, apiUrl);

			ghClient.getUser((errResponse, response) => {
				if (errResponse) {
					return this.props.hasError(errResponse);
				}

				response.json().then(user => {
					this.setState({ user, isLoading: false });
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
