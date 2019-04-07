var CRCCC = artifacts.require("CRCCC");

modules.exports = function(deployer){
    const _name = "CryptoRamCashCoinChain";
    const _symbol = "CRCCC";
    const _decimals = 2;
    deployer.deploy(CRCCC, _name, _symbol, _decimals);
};