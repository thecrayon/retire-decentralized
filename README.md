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

## Notes for Bounty Sponsors

Wallet Connect:
-No real complaints. However, the WAGMI hooks were difficult to use. The documentation was hard to read. For example, using WAGMI 'writeContract' was confusing because some examples used debounce and others didn't. However, you needed to use debounce or else the hook would call the rpc many times. That wasn't clear in the documentation and is unnecessarily complicated.

INFURA/Truffle Dashboard:
-When you have a truffle dashboard open (i.e., you run 'truffle dashboard' in your project)... but you don't have a wallet connected to your dashboard, the error message is confusing and doesn't tell you the actual error.
-Is there any way to verify a contract's abi on the block explorer when you deploy using truffle dashboard? Tried using 'truffle-plugin-verify' in our package.json, but couldn't verify our contract. Also, didn't see anything about verifying contracts in the Truffle Dashboard docs.
