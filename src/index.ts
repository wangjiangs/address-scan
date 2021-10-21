const {Wallet, providers} = require('ethers')

const provider = new providers.JsonRpcProvider('https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161')


async function createAndCheck() {
    const wallet = Wallet.createRandom().connect(provider)
    try {
        const count = await wallet.getTransactionCount()
        const balance = await wallet.getBalance()
        console.log(count, +balance, wallet.address,wallet.privateKey)
    } catch (e) {
        console.log('error', e)
    }

}
async function main() {
    for (let i = 0; i < 100; i++) {
        await createAndCheck()
    }
}
main()