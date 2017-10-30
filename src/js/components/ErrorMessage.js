import React from "react";
import classnames from "classnames";

export class ErrorMessage extends React.Component{
	constructor(props){
		super(props);
		this.currentDate = this.props.currentDate.split(" ").slice(1,4);
		this.currentDate[1] = this.currentDate[1] + ",";
	}

	render(){
		let errorClass = classnames(this.props.className, {
			'visible' : this.props.showError,
			'invisible': !this.props.showError
		});

		return(
			<div className={errorClass}>
				<h4>Please enter a valid date after {this.currentDate.join(" ")}</h4>
			</div>
		);
	}
}