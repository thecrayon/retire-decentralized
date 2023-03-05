
import { ethers } from 'ethers';
import { useState } from 'react';

import { REGENRETIRECONTRACTADDRESS } from '../constants';
import RegenRetireABI from '../context/Web3/RegenRetire.json';

const useRetirementAccount = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const deposit = async ({depositToAddress, depositAmount}) => {
        let ethereum = window.ethereum;
    
        // Request account access if needed
        await ethereum.enable();
    
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
    
        const regenRetire = new ethers.Contract(
          REGENRETIRECONTRACTADDRESS,
          RegenRetireABI,
          signer
        );

        const amountToDeposit = ethers.utils.parseEther(depositAmount)._hex; // deposit 1 ETH

        setLoading(true);

        try {
          const depositTx = await regenRetire.deposit(
            depositToAddress,
            { value: amountToDeposit }
          );
          await depositTx.wait();
        } catch (error) {
            console.log("retirement deposit error: ", error);
            setError(error.message);
        }
        setLoading(false);
      }

    return {
        // data and functions
        deposit,
        loading,
    };
};

export default useRetirementAccount;