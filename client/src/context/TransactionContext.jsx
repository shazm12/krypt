import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";
export const TransactionContext = React.createContext();
const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress,contractABI, signer);
    return transactionContract;
}

export const TransactionsProvider = ({ children }) => {
    const [connectedAccount, setConnectedAccount] = useState();
    const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount , setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions ] = useState([]);
    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };
    const checkIfWalletIsConnected = async() => {
        try {

            if(!ethereum) return alert("Please install metamask");

            const accounts = await ethereum.request({ method: 'eth_accounts'});
            if(accounts.length) {
                setConnectedAccount(accounts[0]);
                getAllTransactions();
            } else {
                console.log("No accounts found");
            }
            
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object...");
        }
    }

    const connectWallet = async() => {
        try {
            if(!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setConnectedAccount(accounts[0]);

        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object...");
            
        }


    }

    const getAllTransactions = async () => {
        try {
          if (ethereum) {
            const transactionsContract = getEthereumContract();
    
            const availableTransactions = await transactionsContract.getAllTransactions();
            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
            }));
            setTransactions(structuredTransactions);
    
            
          } else {
            console.log("Ethereum is not present");
          }
        } catch (error) {
          console.log(error);
        }
      };

    const sendTransaction = async() => {
        const { addressTo, amount, keyword, message } = formData;
        try {
            if(!ethereum) return alert("Please install metamask");
            const transactionContract = getEthereumContract();
            const parsedAmt = ethers.utils.parseEther(amount);
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: connectedAccount,
                    to: addressTo,
                    gas: "0x5208", // 21000 GWEI
                    value: parsedAmt._hex, //0.0001
                }]
            })
            const transactionhash = await transactionContract.addToBlockchain(addressTo, parsedAmt, message, keyword);
            setIsLoading(true);
            console.log(`Loading ${transactionhash.hash}`);
            await transactionhash.wait();
            setIsLoading(false);
            console.log(`Success- ${transactionhash.hash}`)
            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());
            
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object...");
            
        }
    }

    const checkIfTransactionsExists = async() => {
        try {
            const transactionContract = getEthereumContract();
            const transactionCount = await transactionContract.getTransactionCount();
            window.localStorage.setItem("transactionCount", transactionCount);
        }
        catch(error) {
            console.log(error);
            throw new Error("No ethereum object...");
        }
    }

    useEffect(()=> {
        checkIfWalletIsConnected();
        checkIfTransactionsExists();

    },[])
    
    return (
        <TransactionContext.Provider
        value={{
            connectWallet,
            connectedAccount,
            checkIfWalletIsConnected,
            formData,
            sendTransaction,
            handleChange,
            checkIfTransactionsExists,
            transactions

            }}
        >
            {children}
        </TransactionContext.Provider>
    )
};