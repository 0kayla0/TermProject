import React,{Component} from 'react';
import {Button, Input, InputGroup} from "reactstrap";

export default class SpawnRegister extends Component{
    constructor(props){
        super(props);
        this.state = {
            vendorName : null
        }
    }

    updateField(event){
        this.setState({vendorName: event.target.value});
    }

    render(){
        return (
            <div>
                <InputGroup>
                    <Input onChange={(event) => (this.updateField(event))} value={this.props.acc_name} placeholder={"Name of the Store"}/>
                    <Button onClick={() => (this.props.updateAvailableRegisters(this.state.vendorName))}>Open Register</Button>
                </InputGroup>
            </div>
        );
    }

}

