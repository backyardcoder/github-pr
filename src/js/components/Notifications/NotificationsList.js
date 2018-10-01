import React, { Component } from "react";
import PropTypes from "prop-types";

import Storage from "../../data/Storage";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

class NotificationsList extends Component {
	static PropTypes = {
		classes: PropTypes.object,
		hasError: PropTypes.func.isRequired
	};

	constructor() {
		super(...arguments);
		this.state = {
			isLoading: true,
			notifications: this.props.notifications || []
		};
	}

	componentWillMount() {
		Storage.getNotifications(notifications => {
			this.setState({ notifications: notificatinList, isLoading: false });
		});
	}

	render() {
		const { isLoading, notifications } = this.state;
		return (
			<Grid container direction="column" spacing={16} alignItems="center">
				{isLoading ? (
					<Grid item>
						<CircularProgress size={50} />
					</Grid>
				) : (
					<React.Fragment>
						{notifications.map(notification => {
							return (
								<Grid item>
									<Typography variant="subheading">
										{notification.subject.url}
									</Typography>
								</Grid>
							);
						})}
					</React.Fragment>
				)}
			</Grid>
		);
	}
}

export default NotificationsList;

const notificatinList = [
	{
		id: "1",
		repository: {
			full_name: "octocat/Hello-World",
			url: "https://api.github.com/repos/octocat/Hello-World"
		},
		subject: {
			title: "Greetings",
			url: "https://api.github.com/repos/octokit/octokit.rb/issues/123",
			latest_comment_url:
				"https://api.github.com/repos/octokit/octokit.rb/issues/comments/123",
			type: "Issue"
		},
		reason: "subscribed",
		unread: true,
		updated_at: "2014-11-07T22:01:45Z",
		last_read_at: "2014-11-07T22:01:45Z",
		url: "https://api.github.com/notifications/threads/1"
	},
	{
		id: "1",
		repository: {
			full_name: "octocat/Hello-World",
			url: "https://api.github.com/repos/octocat/Hello-World"
		},
		subject: {
			title: "Greetings",
			url: "https://api.github.com/repos/octokit/octokit.rb/issues/123",
			latest_comment_url:
				"https://api.github.com/repos/octokit/octokit.rb/issues/comments/123",
			type: "Issue"
		},
		reason: "subscribed",
		unread: true,
		updated_at: "2014-11-07T22:01:45Z",
		last_read_at: "2014-11-07T22:01:45Z",
		url: "https://api.github.com/notifications/threads/1"
	},
	{
		id: "1",
		repository: {
			full_name: "octocat/Hello-World",
			url: "https://api.github.com/repos/octocat/Hello-World"
		},
		subject: {
			title: "Greetings",
			url: "https://api.github.com/repos/octokit/octokit.rb/issues/123",
			latest_comment_url:
				"https://api.github.com/repos/octokit/octokit.rb/issues/comments/123",
			type: "Issue"
		},
		reason: "subscribed",
		unread: true,
		updated_at: "2014-11-07T22:01:45Z",
		last_read_at: "2014-11-07T22:01:45Z",
		url: "https://api.github.com/notifications/threads/1"
	},
	{
		id: "1",
		repository: {
			full_name: "octocat/Hello-World",
			url: "https://api.github.com/repos/octocat/Hello-World"
		},
		subject: {
			title: "Greetings",
			url: "https://api.github.com/repos/octokit/octokit.rb/issues/123",
			latest_comment_url:
				"https://api.github.com/repos/octokit/octokit.rb/issues/comments/123",
			type: "Issue"
		},
		reason: "subscribed",
		unread: true,
		updated_at: "2014-11-07T22:01:45Z",
		last_read_at: "2014-11-07T22:01:45Z",
		url: "https://api.github.com/notifications/threads/1"
	},
	{
		id: "1",
		repository: {
			full_name: "octocat/Hello-World",
			url: "https://api.github.com/repos/octocat/Hello-World"
		},
		subject: {
			title: "Greetings",
			url: "https://api.github.com/repos/octokit/octokit.rb/issues/123",
			latest_comment_url:
				"https://api.github.com/repos/octokit/octokit.rb/issues/comments/123",
			type: "Issue"
		},
		reason: "subscribed",
		unread: true,
		updated_at: "2014-11-07T22:01:45Z",
		last_read_at: "2014-11-07T22:01:45Z",
		url: "https://api.github.com/notifications/threads/1"
	},
	{
		id: "1",
		repository: {
			full_name: "octocat/Hello-World",
			url: "https://api.github.com/repos/octocat/Hello-World"
		},
		subject: {
			title: "Greetings",
			url: "https://api.github.com/repos/octokit/octokit.rb/issues/123",
			latest_comment_url:
				"https://api.github.com/repos/octokit/octokit.rb/issues/comments/123",
			type: "Issue"
		},
		reason: "subscribed",
		unread: true,
		updated_at: "2014-11-07T22:01:45Z",
		last_read_at: "2014-11-07T22:01:45Z",
		url: "https://api.github.com/notifications/threads/1"
	},
	{
		id: "1",
		repository: {
			full_name: "octocat/Hello-World",
			url: "https://api.github.com/repos/octocat/Hello-World"
		},
		subject: {
			title: "Greetings",
			url: "https://api.github.com/repos/octokit/octokit.rb/issues/123",
			latest_comment_url:
				"https://api.github.com/repos/octokit/octokit.rb/issues/comments/123",
			type: "Issue"
		},
		reason: "subscribed",
		unread: true,
		updated_at: "2014-11-07T22:01:45Z",
		last_read_at: "2014-11-07T22:01:45Z",
		url: "https://api.github.com/notifications/threads/1"
	}
];
