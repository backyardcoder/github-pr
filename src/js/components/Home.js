import React, { Component } from "react";

import InfoForm from "./InfoForm";
import { isUndefined } from "../utils";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing.unit * 2
	},
	appBar: {
		padding: theme.spacing.unit * 2
	}
});

class Home extends Component {
	constructor() {
		super(...arguments);
	}

	render() {
		const { accessToken, url, classes } = this.props;

		return (
			<Grid container direction="row" justify="center" alignItems="center">
				<AppBar position="static" color="primary" className={classes.appBar}>
					<Typography variant="title" color="inherit">
						Github Notifier
					</Typography>
				</AppBar>
				<div className={classes.root}>
					{isUndefined(accessToken) || isUndefined(url) ? (
						<InfoForm accessToken={accessToken} url={url} />
					) : (
						<div />
					)}
				</div>
			</Grid>
		);
	}
}

export default withStyles(styles)(Home);
