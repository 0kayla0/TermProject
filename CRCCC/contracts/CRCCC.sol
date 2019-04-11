pragma solidity ^0.4.25;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "./Register.sol";

//This will be the CryptoRamCashCoinChain token contract
contract CRCCC is ERC20, ERC20Detailed{

    //For now I think we said that there is one register per vendor
    //If that assumption changes then it could be a mapping of address to an index space that contains an array of Registers
    mapping (address => Register) vendorRegister;

    constructor(string _name, string _symbol, uint8 _decimals) ERC20Detailed(_name, _symbol, _decimals) public{

    }

    //TODO maybe the manager needs to pay into the contract before they can spawn a new register
    function spawnNewRegister(string _vendorName) public payable returns(bool){
        vendorRegister[msg.sender] = new Register(_vendorName);
    }
}
