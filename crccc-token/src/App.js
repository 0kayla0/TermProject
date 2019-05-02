import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';

import CurrentVendor from "./Components/CurrentVendor";
import CloseRegister from "./Components/CloseRegister";
import SpawnRegister from "./Components/SpawnRegister";
import PurchaseItem from "./Components/PurchaseItem";
import RegisterStudent from "./Components/RegisterStudent";
import ItemsList from "./Components/ItemsList";
import StudentBalance from "./Components/StudentBalance";

//  https://reactstrap.github.io/
//  https://reactstrap.github.io/components/

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            acct_name: null,
            register_name: null,
            available_reg: ["Lake Street Market",
                "Cam's Lobby shop",
                "Taco Bell",
                "Debug"], //will need to query the contract to find avaiable
            inventory : [] //TODO this is needed to keep track of what items we are operating on
        };

        //TODO need to have things that keep info about the contracts => implement with drizzle

        this.updateRegister = this.updateRegister.bind(this);
        this.updateAvailableRegisters = this.updateAvailableRegisters.bind(this);
        this.updateAccountName = this.updateAccountName.bind(this);

    };

    updateRegister(reg) {
        console.log("New register selected: " + reg)
        this.setState({register_name: reg});
        let updatedInventory = [
            {
                name : "Orange",
                price : 50
            },
            {
                name : "Cupcake",
                price : 150
            },
            {
                name: "Meatball",
                price : 999
            }
        ];
        this.setState({inventory: [...updatedInventory]});
    };

    /* FIXME the orginal CRCCC contract will need to provide a function similar to the one
    * in trojan secrets
    * */
    updateAvailableRegisters(newReg) {
        //TODO
        let temp = this.state.available_reg;
        temp.push(newReg);
        console.log(temp);
        this.setState({available_reg: temp});

    };

    updateAccountName(name) {
        this.setState({acct_name: name});
    };

    render() {

        let regName;
        if(this.state.register_name === null){
            regName = "Please select a store that you would like to buy items from";
        }else{
            regName = "You are currently shopping at " + this.state.register_name;
        }

        let welcome;
        if(this.state.acct_name === null){
            welcome = "Welcome New User! Before you use this application please register with the system first.";
        }else{
            welcome = "Hello " + this.state.acct_name + ", time to spend some mad crypto."
        }

        return (
            <div>

                <Container>
                    <Row>
                        <Col>
                            <h1 align="center">Colorado State University's CRCCC Transaction Webpage</h1>
                            <h2 align="center">Crypto Ram Cash Coin Chain</h2>
                            <h3 align="center">Use this site to pay for your goods from any CSU sponsored vendors</h3>
                            <br/>
                            <h3 align="center">{welcome}</h3>
                            <h3 align="center">{regName}</h3>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <h4>Register Here for First Time Users:</h4>
                            <RegisterStudent acc_name={this.state.acct_name} update_name={this.updateAccountName}/>
                        </Col>
                        <Col>
                            <h4>Own a CSU sponsored store? Register your venue here!</h4>
                            <SpawnRegister updateAvailableRegisters={this.updateAvailableRegisters}/>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <h4>Select Store to Shop at:</h4>
                            <CurrentVendor register_name={this.state.register_name} available_registers={this.state.available_reg}
                                           updateRegister={this.updateRegister}/>
                        </Col>
                        <Col>
                            <h4>Your Current Balance:</h4>
                            <StudentBalance name={this.state.acct_name}/>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <h4>Items offered at venue:</h4>
                            <ItemsList register_name={this.state.register_name} inventory={this.state.inventory}/>
                        </Col>
                        <Col>
                            <h4>Current Shopping Cart</h4>
                            <PurchaseItem register_name={this.state.register_name} inventory={this.state.inventory}/>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <h3><strong>Store Managers Only</strong></h3>
                            <CloseRegister register_name={this.state.register_name}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

}

