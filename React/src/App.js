import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import web3 from "./web3"
import { Container, Card } from "semantic-ui-react"
import ProgressButton, {STATE} from 'react-progress-button'
import createReactClass from 'create-react-class'
import crccc from './crccc.js'

class App extends Component {
  state = {
    value: "",
    message: ""
  };

  onSubmit = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({
      message: "Waiting for blockchain transaction to complete..."
    });

    await crccc.methods.spawnNewRegister(this.state.value).send({
      from: accounts[0]
    });



    render() {
      return (
        <Container>
          <TopBar />    //FIXME put user balance in TopBar
          <h4>
            <p>Register built for use with RamCoin</p>
            <p>
              Your balance is {} // FIXME <-------
            </p>
          </h4>

          <div>
            <Card.Group>
              <Card color = "green" header="Cupcake">
                <Card.Content>
                  <h4>Freshly made Red Velvet Cupcake!</h4>
                  <Register />
                </Card.Content>
              </Card>

              <Card color = "yellow" header="Orange">
                <Card.Content>
                  <h4>Juicy flavorful California Oranges!</h4>
                  <Register />
                </Card.Content>
              </Card>

              <Card color = "green" header="Meatball">
                <Card.Content>
                  <h4>Now that's a spicy Meatball!!</h4>
                  <Register />
                </Card.Content>
              </Card>
          </div>
        </Container>
      )
    }
  }
}

export default App;
