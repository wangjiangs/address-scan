const {Wallet, providers} = require('ethers')
const {Provider} = require('ethers-multicall')

const provider = new providers.JsonRpcProvider('https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161')
const bscProvider = new providers.JsonRpcProvider('https://bsc-dataseed1.ninicoin.io')
const maticProvider = new providers.JsonRpcProvider('https://rpc-mainnet.matic.network')

async function getWalletInfo(wallet: typeof Wallet) {
    try {
        const [count, balance] = await Promise.all([
            wallet.getTransactionCount(),
            wallet.getBalance()
        ])
        if (count > 0 || +balance > 0) {
            console.log('ok', count, +balance, wallet.address, wallet.privateKey)
        } else {
            console.log(wallet.address, wallet.privateKey)
        }
    } catch (e) {
        console.log('error', e)
    }
}

async function createAndCheck() {
    const baseWallet = Wallet.createRandom()
    const ethWallet = baseWallet.connect(provider)
    const bscWallet = baseWallet.connect(bscProvider)
    // const maticWallet = baseWallet.connect(maticProvider)
    try {
        await Promise.all([
            getWalletInfo(ethWallet),
            getWalletInfo(bscWallet),
            // getWalletInfo(maticWallet)
        ])
        // const count = await wallet.getTransactionCount()
        // const balance = await wallet.getBalance()
        // console.log(count, +balance, wallet.address,wallet.privateKey)
    } catch (e) {
        console.log('error', e)
    }

}

async function main() {
    while (true) {
        await Promise.all(new Array(8).fill(0).map(x => createAndCheck()))
    }
}
main()