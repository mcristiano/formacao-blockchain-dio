//importando as dependencias
//bip32 - significa bitcoin improvement proposal número 32, 39, etc
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//definir a rede
//bitcoin - rede principal - mainnet
//testnet - rede de teste - testnet
const network = bitcoin.networks.testnet

//derivação de carteiras HD (Hierarquica ou Deterministica)
const path = "m/49'/1'/0'/0"

//criando o mnemonic para a seed (palavras de senha)
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

//criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network)

//criando uma conta - par pvt-pub keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2wpkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira gerada")
console.log("Endereço: ", btcAddress)
console.log("Chave privada:", node.toWIF())
console.log("Seed", mnemonic)



//abaixo codigo original da aula que nao funcionou na testnet, analisar o motivos 
//após gerar a chave privada, é preciso importar a chave gerada para dentro de um sofware regenciador de carteiras

// const bip32 = require('bip32');
// const bip39 = require('bip39');
// const bitcoin = require('bitcoinjs-lib');
// //definir a rede
// //bitcoin  - rede principal - mainnet
// //testnet - rede de teste - testnet

// const network = bitcoin.networks.testnet;

// const testnet4 = {
//     messagePrefix: '\x18Bitcoin Signed Message:\n',
//     bech32: 'tb',
//     bip32: {
//       public: 0x043587cf,  // Base58 prefix for xpub on Testnet4
//       private: 0x04358394  // Base58 prefix for xprv on Testnet4
//     },
//     pubKeyHash: 0x6f,      // P2PKH starts with 'm' or 'n'
//     scriptHash: 0xc4,      // P2SH starts with '2'
//     wif: 0xef              // Wallet Import Format prefix
// };

// //derivação de carteiras HD 
// const path = `m/49'/1'/0'/0`;

// //criando o mnemonic para a seed (palavras de senha)
// let mnemonic = bip39.generateMnemonic();
// let seed = bip39.mnemonicToSeedSync();

// //criando a raiz da carteira HD
// let root = bip32.fromSeed(seed, network );
// console.log(network.testnet);

// //criando uma conta - par pvt - pub keys    
// let account = root.derivePath(path); ///.getAccount();
// let node = account.derive(0).derive(0);

// let bech32Address = bitcoin.payments.p2wpkh({
//     pubkey: node.publicKey,
//     network: network
// }).address;

// let btcAddress = bitcoin.payments.p2pkh({
//     pubkey: node.publicKey,
//     network: testnet4
// }).address;

// console.log("Carteira gerada");
// console.log("Endereço: ", btcAddress);
// console.log("Endereço bech32: ", bech32Address);
// console.log("Chave privada: ", node.toWIF()); //node.privateKey.toWif()); 
// console.log("Seed: ", mnemonic);
