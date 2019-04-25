import React, { Component } from 'react';
import { Button, Header, Icon, Modal, Form, Message } from 'semantic-ui-react';
import web3 from '../web3';
import crccc from '../crccc';

export default class PurchaseItem extends Component {
  state = {
    modalOpen: false,
    value: '',
    message: '',
    errorMessage: '',
    loading: false
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  onSubmit = async event => {
    event.preventDefault();
    this.setState({
      loading: true,
      errorMessage: '',
      message: 'waiting for blockchain transaction to complete...'
    });
    try {
      const accounts = await web3.eth.getAccounts();
      await crccc.methods.purchaseItem(this.state.value).send({
        from: accounts[0],
        value: web3.utils.toWei('1', 'ether');
      })
    }
  }
}
