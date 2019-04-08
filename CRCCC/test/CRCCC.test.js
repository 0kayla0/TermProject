// const CRCCC = artifacts.require("./CRCCC.sol");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const assert = require("assert");
const provider = ganache.provider();
const web3 = new Web3(provider);

const compiledCRCCC_Contract = require("../build/contracts/CRCCC");

let accounts;
let crccc_contract;

const _name = "CryptoRamCashCoinChain";
const _symbol = "CRCCC";
const _decimals = 2;

beforeEach(async () => {

    this.token = await CRCCC.new(_name, _symbol, _decimals);

    // accounts = await  web3.eth.Contract(
    //     JSON.parse(compiledCRCCC_Contract)
    // )
    //    .deploy({data : compiledCRCCC_Contract.bytecode})
    //    .send({from : accounts[0], gas: "2000000"});

});

describe("CryptoRamCashCoinChain", () =>{
   it("should have the correct", async () => {
       const name = await this.token.name();
       assert.equal(_name, name);
   });
});