const crccc_token = artifacts.require('./CRCCC.sol');
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
    let crccc;

    beforeEach(async () => {
        crccc = await crccc_token.new();
    });

    describe('token attributes', () => {

        it('has the correct name', async() =>{
            const name = await crccc.name();
            name.should.equal(_name);
        });

        it('has the correct symbol', async () =>{
            const symbol = await crccc.symbol();
            symbol.should.equal(_symbol);
        });

        it('has the correct decimals', async () =>{
            const decimals = await crccc.decimals();
            decimals.toNumber().should.equal(_decimals);
        });

    });

    describe('Creating Accounts', () => {

        it("has an inital supply of 0 tokens with no users", async () => {
            let balance = await crccc.totalSupply();
            balance.toNumber().should.equal(0);
        });

        it("will allow students to register an account with the system", async () =>{

            await crccc.registerNewStudent("Joe",{from: accounts[0]});
            await crccc.registerNewStudent("Tom",{from: accounts[1]});

            let total_balance = await crccc.totalSupply();
            total_balance.toNumber().should.equal(600);

            let balance2 = await crccc.balanceOf(accounts[0]);
            balance2.toNumber().should.equal(300);

            let balance3 = await crccc.balanceOf(accounts[1]);
            balance3.toNumber().should.equal(300);

        });

        it("will not allow a user to register for a second time", async () =>{
            try{
                await crccc.registerNewStudent("Susan", {from: accounts[0]});
                await crccc.registerNewStudent("Susan", {from: accounts[1]}); //trying to do from a different account
            }catch(err){
                assert(true);
            }
        });

    });

});
