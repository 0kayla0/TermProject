import React, {Component} from 'react';
import { Container, Row, Col, Media } from 'reactstrap';

import CRCCC from "./build/contracts/CRCCC";
import "./App.css";
import ramLogo from "./Resources/CSU-Ram.png";

import CurrentVendor from "./Components/CurrentVendor";
import CloseRegister from "./Components/CloseRegister";
import SpawnRegister from "./Components/SpawnRegister";
import PurchaseItem from "./Components/PurchaseItem";
import RegisterStudent from "./Components/RegisterStudent";
import ItemsList from "./Components/ItemsList";
import StudentBalance from "./Components/StudentBalance";
import RegisterReport from "./Components/RegisterReport";

import getWeb3 from "./utils/getWeb3";
//  https://reactstrap.github.io/
//  https://reactstrap.github.io/components/

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            acct_name: null,
            register_name: null,
            purchaserAddress: "",
            available_reg: ["Lake Street Market",
                "Cam's Lobby shop",
                "Taco Bell",
                "Debug"], //will need to query the contract to find avaiable
            inventory : [], //TODO this is needed to keep track of what items we are operating on

            web3: null,
            accounts: null,
            CRCCC: {},

            loading: false,
            value: "",
            message: "",

            allRamsTable: [],
            purchasedRamsTable: [],


            purchaserRamCount: 0,
            purchaserRamCoinCount: 0,
            walletAddress: "0x4327D8b79AB0499F81dD801db4365CdC914d6f3f"
        };

        //TODO need to have things that keep info about the contracts => implement with drizzle

        this.updateRegister = this.updateRegister.bind(this);
        this.updateAvailableRegisters = this.updateAvailableRegisters.bind(this);
        this.updateAccountName = this.updateAccountName.bind(this);

    };

    async componentDidMount() {
        try{
            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();
            const networId = await web3.eth.net.getId();
            const deployedNetwork = CRCCC.networks[networId];
            const instance = new web3.eth.Contract(
                CRCCC.abi,
                deployedNetwork && deployedNetwork.address
            );
            console.log(await instance.methods.symbol().call());
            console.log(await instance.methods.name().call());
            this.setState({
                web3: web3,
                accounts: accounts,
                CRCCC : instance,
                purchaseAddress: accounts[0]
            });
        }catch(error){
            alert(error.valueOf());
        }
    }

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
            <div id={"application"}>
                <Container>
                    <Row>
                        <Col>
                            <Media>
                                <Media left href="#">
                                    <Media object src={ramLogo} alt="PNG of CSU logo" />
                                </Media>
                                <Media body>
                                    <Media heading>
                                        <h2 align="center">Colorado State University's CRCCC Transaction Webpage</h2>
                                        <h4 align="center">Crypto Ram Cash Coin Chain</h4>
                                        <h5 align="center">Use this site to pay for your goods from any CSU sponsored stores</h5>
                                    </Media>

                                    <br/>

                                    <h3 align="center">{welcome}</h3>
                                    <h3 align="center">{regName}</h3>
                                </Media>
                            </Media>
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
                        <Col>
                            <h4>View the Sales report for the store:</h4>
                            <RegisterReport register_name={this.state.register_name}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

}

