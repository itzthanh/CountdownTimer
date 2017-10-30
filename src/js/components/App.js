import React from "react";
import styles from '../../css/App.css';
import {Form, FormGroup, FormControl, Button, HelpBlock, Fade, Well} from 'react-bootstrap';
import {Clock} from '../components/Clock.js';
import {ErrorMessage} from '../components/ErrorMessage.js'; 

export class App extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			deadline: '',
			newDeadline: '',
			showError: false
		};

		this.changeDeadlineState = this.changeDeadlineState.bind(this);
		this.updateDeadline = this.updateDeadline.bind(this);
		this.getValidateInput = this.getValidateInput.bind(this);
	}

	changeDeadlineState(e){
		this.setState({
			newDeadline: e.target.value
		});
	}

	checkDeadline(date){
		return (Date.parse(date) - Date.parse(new Date())) > 0;
	}

	getValidateInput(){
		return this.state.showError ? 'error' : 'success';
	}

	updateDeadline(e){
		e.preventDefault();
		e.stopPropagation();
		if (this.checkDeadline(this.state.newDeadline)){
			this.setState({
				deadline: this.state.newDeadline,
				showError:false
			});
		} 
		else{
			this.setState({
				showError: true
			});
		}
	}

	render(){
		let validationState = this.state.showError ? 'error' : null;	

		return(
			<div className="container app">
				<h1 className="app-title">Countdown to:</h1>
				<Fade in={true}>
					<div className="deadline">
					<Well className="deadline-well">
						{this.state.deadline}
					</Well>
					</div>
				</Fade>
				<Clock deadline = {this.state.deadline}/>
				<Form inline onSubmit = {(e)=>{this.updateDeadline(e)}}>
					<FormGroup controlId="formValidationSuccess2" validationState={validationState}>
						<FormControl type="text" className="deadline-input" onBlur = {(e)=>this.changeDeadlineState(e)} placeholder='Enter New Date'/>
					</FormGroup>
					{' '}
					<Button className="countdown-button" type="submit">Countdown</Button>		
				</Form>

				<ErrorMessage className='error' currentDate = {new Date().toString()} showError = {this.state.showError}/>
			</div>
		);
	}
}