const crccc_token = artifacts.require('CRCCC');

require('chai').should();

contract('CRCCC token', accounts => {

    const _name = "CryptoRamCashCoin";
    const _symbol = "CRCCC";
    const _decimals = 2;

    beforeEach(async () => {
        this.crccc_token = await crccc_token.new(_name, _symbol, _decimals);
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
            decimals.should.equal(_decimals);
        });

    });

});
