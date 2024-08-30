const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')
const axios = require('axios')

const network = bitcoin.networks.testnet
const path = "m/49'/1'/0'/0"

function generateWallet() {
    const mnemonic = bip39.generateMnemonic()
    const seed = bip39.mnemonicToSeedSync(mnemonic)
    const root = bip32.fromSeed(seed, network)
    const account = root.derivePath(path)
    const node = account.derive(0).derive(0)
    const btcAddress = bitcoin.payments.p2wpkh({
        pubkey: node.publicKey,
        network: network,
    }).address

    return {
        address: btcAddress,
        privateKey: node.toWIF(),
        mnemonic: mnemonic
    }
}

async function getBalance(address) {
    try {
        const response = await axios.get(`https://api.blockcypher.com/v1/btc/test3/addrs/${address}/balance`)
        const balanceSatoshis = response.data.balance
        const balanceBTC = balanceSatoshis / 100000000
        return { satoshis: balanceSatoshis, btc: balanceBTC }
    } catch (error) {
        console.error('Erro ao obter o saldo:', error)
        return null
    }
}

async function main() {
    const args = process.argv.slice(2)
    
    if (args.length === 0 || args[0] === 'generate') {
        const wallet = generateWallet()
        console.log("Nova carteira gerada:")
        console.log("Endereço:", wallet.address)
        console.log("Chave privada:", wallet.privateKey)
        console.log("Seed:", wallet.mnemonic)
    } else if (args[0] === 'balance') {
        if (args.length < 2) {
            console.log("Por favor, forneça um endereço para consultar o saldo.")
            console.log("Uso: node script.js balance <endereço>")
            return
        }
        const address = args[1]
        const balance = await getBalance(address)
        if (balance !== null) {
            console.log(`Saldo de ${address}:`)
            console.log(`${balance.btc} BTC`)
            console.log(`${balance.satoshis} satoshis`)
        }
    } else {
        console.log("Comando não reconhecido. Use 'generate' para criar uma nova carteira ou 'balance <endereço>' para consultar o saldo.")
    }
}

main()