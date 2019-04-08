//TODO tomorrow I will work more on this, setting up the mocha harness has been pretty weird

var Token = artifacts.require("CRCCC");

contract("CryptoRamCashCoinChain Unit Tests", () =>{

    beforeEach(() => {
        this.token = Token.deployed(_name, _symbol, _decimals).then((instance) => {

        });
    });
});