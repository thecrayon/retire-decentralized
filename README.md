# Retire Decentralized Documentation

<p align="center">
<img src="https://github.com/khrannok/Images/blob/main/RegenRetire.png?raw=true" width="200" height="200"/>
</p>

This project is team **Regen Retire**'s EthDenver buidlathon project. At its core, it is based on the Opolis bounty "Crypto Retirement". From there, additional bounties were added to support feature richness and quick development. We are a team of two.

## Design Philosophy

**Regen Retire** wanted to take a fresh look at retirement planners availble online from TradFi providers. We wanted to allow a user to plan not only for retirement, but also for a regenerative break in the much nearer future. This particular sabbatical-like planning could be for web3 builders who take on short term projects. We intentionally don't ask for personally identifiable information like age or salary.

## Local Testing

If you want to test this locally, follow the next few steps:

- Clone this repo eg: `git clone git@github.com:thecrayon/retire-decentralized`
- Install dependencies using: `npm install`
- Run the dev server which will create the site and update automatically when you make changes: `npm start`
- Go to `http://localhost:3000/` in your browser to view the site.

## Bounties We Pursued (in alphabetical order)

-Covalent = Make meaningful use of the Covalent API. We used several Covalent apis to fetch data. We got all tokens in a user's wallet by using the balances api / we got all Avalanche Fuji testnet transactions using the transactions api.
-Infura = Deploy your Dapp on Infura with MetaMask and Truffle Dashboard. We used an Infura Avalanche Fuji testnet endpoint to deploy our smart contract using Truffle Dashboard (so we didn't need to store our private key mnemonic in a .env file)

-OpenZeppelin = Use Defender. Our project uses Defender's notification system to send emails to our team whenever a user deposits or withdraws from the Regen Retire 401k smart contract. This allows us to continuously monitor our smart and understand how users are using it.

-Opolis = Crypto Retirement. We built a crypto retirement planning website. Basically, you come to our site, connect your wallet, our site scans for all idle tokens in your wallet, gives you different options for getting yield on those tokens, and allows you to deposit those tokens into different web3 protocols directly from our site (we currently support Aave-v3 and will be rolling out more integrations in the future). Why let tokens sit idle when you can be gaining yield on them?

-WalletConnect = Web3Modal DeFi Challenge: Making Bank (Without the Banks). We use WalletConnect to authenticate our users. WalletConnect supports many different types of wallets. By using wallets, our company does not need to store private information (e.g., phone and email) related to our users. It also allows our users to interact directly with different retirement financial products (e.g., Aave-v3) and not have to go through various middlemen like brokers who takes fees and reduce the future value of your retirement portfolio.

## Notes for Bounty Sponsors

WalletConnect:
-No real complaints. However, the WAGMI hooks were difficult to use. The documentation was hard to read. For example, using WAGMI 'writeContract' was confusing because some examples used debounce and others didn't. However, you needed to use debounce or else the hook would call the rpc many times. That wasn't clear in the documentation and is unnecessarily complicated.

INFURA/Truffle Dashboard:
-When you have a truffle dashboard open (i.e., you run 'truffle dashboard' in your project)... but you don't have a wallet connected to your dashboard, the error message is confusing and doesn't tell you the actual error.
-Is there any way to verify a contract's abi on the block explorer when you deploy using truffle dashboard? Tried using 'truffle-plugin-verify' in our package.json, but couldn't verify our contract. Also, didn't see anything about verifying contracts in the Truffle Dashboard docs.
