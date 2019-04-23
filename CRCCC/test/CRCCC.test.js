const crccc_token = artifacts.require('CRCCC');
const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const provider = ganache.provider();
const web3 = new Web3(provider);

let accounts;

require('chai').should();

contract('CRCCC token', accounts => {

    const _name = "Crypto Ram Cash Coin Chain";
    const _symbol = "CRCCC";
    const _decimals = 2;

    beforeEach(async () => {
        this.crccc_token = await crccc_token.deployed();
        accounts = await web3.eth.getAccounts();
    });

    describe('token attributes', () => {

        it('has the correct name', async() =>{
            const name = await this.crccc_token.name();
            name.should.equal(_name);
        });

        it('has the correct symbol', async () =>{
            const symbol = await this.crccc_token.symbol();
            symbol.should.equal(_symbol);
        });

        it('has the correct decimals', async () =>{
            const decimals = await this.crccc_token.decimals();
            decimals.toNumber().should.equal(_decimals);
        });

    });

    describe('Creating Accounts', () => {



    });

});
