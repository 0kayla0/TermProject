import React,{Component} from 'react';

export default class StudentBalance extends Component{
    constructor(props){
        super(props);
    }

    render(){

        let initBalance;
        if(this.props.name === null){
            initBalance = "Register with the Application to get 300 CRCCC";
        }else{
            initBalance = "There are currently X CRCCC in your account."
        }

        return (
            <div>
                <h5>{initBalance}</h5>
                <h5>But seriously lets obtain this grain</h5>
            </div>
        );
    }

}

