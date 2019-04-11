pragma solidity ^0.4.25;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";

//This will be the CryptoRamCashCoinChain token contract
contract CRCCC is ERC20, ERC20Detailed{

    constructor(string _name, string _symbol, uint8 _decimals) ERC20Detailed(_name, _symbol, _decimals) public{

    }

}
