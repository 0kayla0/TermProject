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

    describe('Token attributes', () => {

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

    describe('Spawn new registers', () => {

        it("will create new registers", async () => {

            let result = false;
            try {
                await crccc.spawnNewRegister("Lake Street Market");
                result = true;
            }catch(err){
                console.log("Could not spawn a new register");
            }
            result.should.equal(true);

        });

        it("will not allow two registers to be spawned with the same name", async () => {

            let result = false;
            try{
                await crccc.spawnNewRegister("Lake Street Market");
                await crccc.spawnNewRegister("Lake Street Market");
            }catch(err){
                result = true
            }
            result.should.equal(true);

        });

    });

    describe("Registered students can perform transactions", () => {

        it('can perform a basic transaction', async () => {

            let result = false;

            await crccc.registerNewStudent("Anthony", {from: accounts[0]});  //intial account balance is 300
            await crccc.spawnNewRegister("Lake Street Market", {from: accounts[1]});
            let price = await crccc.viewPrice("Lake Street Market", "Cupcake", {from: accounts[0]});

            try{
                await crccc.purchaseItem("Lake Street Market", "Cupcake", {from: accounts[0]});
                result = true;
            }catch(err){
                result = false;
            }

            let account_balance = await crccc.balanceOf(accounts[0]);
            account_balance.toNumber().should.equal(300-price.toNumber());
            result.should.equal(true);

        });

        //FIXME to not use the outdated function
        it("transaction fails when the student cannot afford the item", async () => {

            let result = false;

            await crccc.registerNewStudent("Anthony", {from: accounts[0]});  //intial account balance is 300
            await crccc.spawnNewRegister("Lake Street Market", {from: accounts[1]});

            try{
                await crccc.purchaseItem("Lake Street Market", "Meatball", {from: accounts[0]});
                result = false;
            }catch(err){
                result = true;
            }

            result.should.equal(true);
        });

    });

    describe("Closing the register", () => {

        it('Only managers can close the register', async () => {

            await crccc.registerNewStudent("Anthony", {from: accounts[0]});  //intial account balance is 300
            await crccc.spawnNewRegister("Lake Street Market", {from: accounts[1]});

            //TODO update
            await crccc.purchaseItem("Lake Street Market", "Cupcake", {from: accounts[0]});

            await crccc.closeRegister("Lake Street Market", {from: accounts[1]});

            let manager_balance = await crccc.balanceOf(accounts[1]);
            manager_balance.toNumber().should.equal(150);

        });

    });

});
