import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import '../../css/App.css';

export class Clock extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0
		};
	}

	componentWillMount(){
		this.getTimeRemaining(this.props.deadline);
	}

	componentDidMount(){
		setInterval(()=>this.getTimeRemaining(this.props.deadline), 1000);
	}

	getTimeRemaining(deadline){
		if (deadline !== ''){
			let milliseconds = 1;
			let seconds = milliseconds * 1000;
			let minutes = seconds * 60;
			let hours = minutes * 60;
			let days = hours * 24;

			let timeRemaining = Date.parse(deadline) - Date.parse(new Date());
			let secondsRemaining = Math.floor((timeRemaining%minutes)/seconds);
			let minutesRemaining = Math.floor((timeRemaining%hours)/minutes);
			let hoursRemaining = Math.floor((timeRemaining%days)/hours);
			let daysRemaining = Math.floor(timeRemaining/days);

			this.setState({
				days: daysRemaining,
				hours: hoursRemaining,
				minutes: minutesRemaining,
				seconds: secondsRemaining
			});
		} 
		else {
			this.setState({
				days: '--',
				hours: '--',
				minutes: '--',
				seconds: '--'
			});
		}

	}

	leading0(num){
		return num < 10 ? '0' + num : num;
	}

	render(){
		return(
			<Grid fluid={true}>
				<Row className="clock">
					<Col md={2} mdOffset={2} className="timer clock-days">{this.leading0(this.state.days)} days</Col>
					<Col md={2} className="timer clock-hours">{this.leading0(this.state.hours)} hours</Col>
					<Col md={2} className="timer clock-minutes">{this.leading0(this.state.minutes)} minutes</Col>
					<Col md={2} className="timer clock-seconds">{this.leading0(this.state.seconds)} seconds</Col>
				</Row>
			</Grid>
		);
	}
}