import React,{Component} from 'react';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

export default class SelectTestAddress extends Component{
    constructor(props){
        super(props);
        this.state = {
            dropdownOpen: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prev => ({
            dropdownOpen: !prev.dropdownOpen
        }));
    };

    render(){

        let accounts;
        if(this.props.accounts === null){
            accounts = (<br/>);
        }else {
            accounts = (this.props.accounts).map((item) =>
                <DropdownItem value={item}
                              onClick={(event) => this.props.updateAddress(event)}>{item}</DropdownItem>
            );
        }

        return (
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                    Available Addresses
                </DropdownToggle>
                <DropdownMenu>
                    {accounts}
                </DropdownMenu>
            </Dropdown>
        );
    }

}

