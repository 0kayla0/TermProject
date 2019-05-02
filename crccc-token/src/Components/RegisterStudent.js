import React,{Component} from 'react';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';


export default class RegisterStudent extends Component{
    constructor(props){
        super(props);
        this.state = {
            tempName : ""
        };
    }

    updateField(event){
        this.setState({tempName :event.target.value});
    }

    //TODO this DOES NOT handle errors when a user is already registered this will come in when we call the contract
    render(){
        return (
            <div>
                <InputGroup>
                    <Input onChange={(event) => (this.updateField(event))} value={this.props.acc_name} placeholder={"First and Last Name"}/>
                    <Button onClick={() => (this.props.update_name(this.state.tempName))}>Register</Button>
                </InputGroup>
            </div>
        );
    }

}

