const {Wallet, providers} = require('ethers')

function createWallet() {
    const wallet = Wallet.createRandom()
    console.log(wallet.address, wallet.privateKey)
}

while(true) {
    createWallet()
}