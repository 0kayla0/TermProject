import React,{Component} from 'react';
import CurrentVendor from "./Components/CurrentVendor";
import CloseRegister from "./Components/CloseRegister";
import SpawnRegister from "./Components/SpawnRegister";
import PurchaseItem from "./Components/PurchaseItem";
import RegisterStudent from "./Components/RegisterStudent";
import ItemsList from "./Components/ItemsList";
import StudentBalance from "./Components/StudentBalance";

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
        acct_name : "",
        register_name : "",
        available_reg : [] //will need to query the contract to find avaiable
    };

    //TODO need to have things that keep info about the contracts => implement with drizzle

    this.updateRegister = this.updateRegister().bind(this);
    this.updateAvailableRegisters = this.updateAvailableRegisters().bind(this);
    this.updateAccountName = this.updateAccountName().bind(this);

  };

  updateRegister(reg){
    this.setState({register_name: reg});
  };

  updateAvailableRegisters(){
    //TODO
  };

  updateAccountName(name){
    this.setState({acct_name: name});
  };

  render(){
    return (
        <div>

          <p>Lets get this bread</p>

          <CurrentVendor register_name={this.state.register_name} available_registers={this.state.available_reg} updateRegister={this.updateRegister()}/>

          <RegisterStudent acc_name={this.state.acct_name} update_name={this.updateAccountName()}/>
          <SpawnRegister updateAvailableRegisters={this.updateAvailableRegisters()}/>

          <ItemsList register_name={this.state.register_name}/>
          <PurchaseItem register_name={this.state.register_name}/>

          <StudentBalance/>

          <CloseRegister register_name={this.state.register_name}/>

        </div>
    );
  }

}

