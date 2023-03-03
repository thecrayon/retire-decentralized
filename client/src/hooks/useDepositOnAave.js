
import { ethers } from 'ethers';
import { useState } from 'react';

import AaveABI from '../context/Web3/abi.json';
import { useStateContext } from '../context/ContextProvider';
import { AAVEVV3ETHCONTRACTADDRESS } from '../constants';

const useDepositOnAave = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { address } = useStateContext();

    async function depositETHOnAave() {
        let ethereum = window.ethereum;
    
        // Request account access if needed
        await ethereum.enable();
    
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
    
        const aaveContract = new ethers.Contract(
          AAVEVV3ETHCONTRACTADDRESS,
          AaveABI,
          signer
        );
    
        // depositEth // contract address: 0xD322A49006FC828F9B5B37Ab215F99B4E5caB19C // abi: in separate file
        // function name: depositETH
        // 1. address: 0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2
        // 2. address: 0x8a9e0C25953aCf7232714C466289BEEC0bE1D579 // on behalf of
        // 3. uint16: referral code: 0
    
        // TODO: change amountToDeposit to be dynamic
        const amountToDeposit = ethers.utils.parseEther("0.001")._hex; // deposit 1 ETH
        const depositTx = await aaveContract.depositETH(
            // TODO: change to constant after test is done
          "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2",
          address,
          0,
          { value: amountToDeposit }
        );
        await depositTx.wait();
      }

    return {
        // data and functions
        depositETHOnAave,
        loading,
    };
};

export default useDepositOnAave;