import React,{Component} from 'react';
import {Button, Input, InputGroup, Table} from "reactstrap";
import CRCCC from "../CRCCC.json";
import web3 from "web3";

//TODO it would be nice if I could remove an element if a user makes a mistake with typing
//the items name

export default class PurchaseItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            cart : [],
            currentItem : "Enter Item",
            inventory : [...props.inventory]
        };
    }

    updateShoppingCart() {
        let temp_cart = [...this.state.cart];
        let temp_curItem = this.state.currentItem;
        temp_cart.push(temp_curItem);
        temp_curItem = "";

        this.setState({cart : temp_cart});
        this.setState({currentItem : temp_curItem});
    }

    //FIXME
    resetShoppingCart(){
        this.setState({cart: []});
    }

    itemPrice(itemName){
        let price = 0;
        let tempInventory = [...this.props.inventory];
        let results = tempInventory.filter(item => (itemName === item.name));
        if(results.length !== 0){
            price = results[0].price;
        }
        return price;
    }

    updateCurItem(event){
        this.setState({currentItem : event.target.value});
    }

    async performTransaction(){
        //TODO this will need to iterate through the cart and do individual transactions with the register
        while(this.state.cart.length != 0){
          let temp_cart = [...this.state.cart];
          let temp_item = temp_cart.pop();
          try{
            const account = this.props.curr_address;
            await CRCCC.methods.purchaseItem(this.state.register_name, temp_item).send({
              from: account,
              value: web3.utils.toWei("1", "ether") //FIXME How to handle CRCCC token?? Also make price of item.
            });
          } catch (err) {
            this.setState({ errorMessage: err.message }); //HELP proper error handling?
          }
        }
    }

    match(arr1, arr2){
        if(arr1.length != arr2.length){ return false; }
        for(let i = 0; i < arr1.length; i++){
            if(arr1[i] !== arr2[i]) { return false; }
        }
        return true;
    }

    //TODO check to make sure that the returned price from state is actually an int and not an unparsed string from json response
    render(){

        let total_price = 0;
        let transaction;

        //FIXME
        // if(!this.match(this.props.inventory, this.state.inventory) && this.props.inventory != null && this.state.cart.length !== 0){
        //     this.resetShoppingCart();
        // }

        if(this.state.cart.length !== 0){
            transaction = this.state.cart.map((item) => (
                <tr>
                    <td>{item}</td>
                    <td>{this.itemPrice(item)}</td>
                </tr>
            ));
        }else{
            transaction =(
                <tr>
                    <td>There is currently nothing in your cart</td>
                    <td>0</td>
                </tr>
            );
        }

        for(let i = 0; i < this.state.cart.length; i++){
            total_price += this.itemPrice(this.state.cart[i]);
        }

        //TODO can add a subtotal and tax row as well
        let total_row= (
            <tr>
                <td>ORDER TOTAL</td>
                <td>{total_price}</td>
            </tr>
        );

        return (
            <div>
                <p>Go for the dough</p>
                <InputGroup>
                    <Input onChange={(event) => (this.updateCurItem(event))} value={this.state.currentItem}/>
                    <Button onClick={() => (this.updateShoppingCart())}>Add to Cart</Button>
                </InputGroup>
                <Table striped dark>
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transaction}
                        <tr>
                            <td>------------------------------------------------------</td>
                            <td>------------</td>
                        </tr>
                        {total_row}
                    </tbody>
                </Table>

                <br/>

                <Button onClick={()=> this.performTransaction}>Purchase Items</Button>

            </div>
        );
    }

}
