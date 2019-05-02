import React,{Component} from 'react';
import {Button} from "reactstrap";

export default class CloseRegister extends Component{
    constructor(props){
        super(props);
    }

    closeRegisterAction(){
        alert("You are closeing " + this.props.register_name);
    }

    render(){
        return (
            <div>
                <h4>Closing the register will:</h4>
                <ul>
                    <li>Transfer the funds within the Register to your account</li>
                    <li>Generate a report summary of the earnings for the store for that day</li>
                </ul>
                <p>Yeet this wheat</p>
                <Button onClick={() => (this.closeRegisterAction)}>Close the Register</Button>
            </div>
        );
    }

}

