import React, {Component} from 'react';

import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
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
            acct_name: "",
            register_name: "",
            available_reg: [] //will need to query the contract to find avaiable
        };

        //TODO need to have things that keep info about the contracts => implement with drizzle

        this.updateRegister = this.updateRegister.bind(this);
        this.updateAvailableRegisters = this.updateAvailableRegisters.bind(this);
        this.updateAccountName = this.updateAccountName.bind(this);

    };

    updateRegister(reg) {
        console.log("New register selected: " + reg)
        this.setState({register_name: reg});
    };

    updateAvailableRegisters() {
        //TODO
    };

    updateAccountName(name) {
        this.setState({acct_name: name});
    };

    render() {
        return (
            <div>

                <Container>
                    <Row>
                        <Col>
                            <RegisterStudent acc_name={this.state.acct_name} update_name={this.updateAccountName}/>
                        </Col>
                        <Col>
                            <SpawnRegister updateAvailableRegisters={this.updateAvailableRegisters}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <CurrentVendor register_name={this.state.register_name} available_registers={this.state.available_reg}
                                           updateRegister={this.updateRegister}/>
                        </Col>
                        <Col>
                            <StudentBalance/>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={{ size: 'auto', offset: 1 }}>.col-sm-auto .offset-sm-1</Col>
                        <Col sm={{ size: 'auto', offset: 1 }}>.col-sm-auto .offset-sm-1</Col>
                    </Row>
                </Container>

                <Card>
                    <CardBody>
                        <CardTitle>Card title</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's
                            content.</CardText>
                        <Button>Button</Button>
                    </CardBody>
                </Card>



                <ItemsList register_name={this.state.register_name}/>
                <PurchaseItem register_name={this.state.register_name}/>

                <CloseRegister register_name={this.state.register_name}/>

            </div>
        );
    }

}

