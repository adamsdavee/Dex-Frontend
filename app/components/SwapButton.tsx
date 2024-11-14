"use client";
import { Button } from "@/components/ui/button";

import {  useSendTransaction } from "thirdweb/react";
import { client } from "../client";
import { getContract, prepareContractCall } from "thirdweb";
import { sepolia } from "thirdweb/chains";

const SwapButton = ({addressOne, addressTwo, amountOne, amountTwo, setAmountOne, setAmountTwo}: {addressOne: string, addressTwo: string, amountOne: string, amountTwo: string, setAddressOne: (address: string) => void, setAddressTwo: (address: string) => void, setAmountOne: (amount: string) => void, setAmountTwo: (amount: string) => void}) => {

    const contract = getContract({
      client,
      address: "0xb7e2979167e46A03Cf44171c349945D7041B6C2D",
      chain: sepolia,
    });
  
    const { mutate: sendTransaction } = useSendTransaction();
  
    const SwapTokens = async (amountIn: bigint, amountOut: bigint, path: string[]) => {
      const swap = prepareContractCall({
        contract,
        method: "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] memory path)",
        params: [amountIn, amountOut, path], // type safe params
      });
      sendTransaction(swap);
    };
  

  return (
    <>
   <Button
                        className="w-full"
                        onClick={async () => {
                          try {
                            // Convert the amount to BigInt (assuming 18 decimals)
                            const amountIn = BigInt(Number(amountOne) * 1e18);

                            // TODO: Get the amount out from the contract
                            const amountOut = BigInt(Number(amountTwo) * 1e18);

                            // You'll need to get the user's address from your wallet connection
                            // This is just a placeholder - replace with actual wallet address

                            await SwapTokens(amountIn, amountOut, [addressOne, addressTwo]);

                            // Optional: Clear inputs after successful mint
                            setAmountOne("");
                            setAmountTwo("");
                            alert("Swap successful");
                          } catch (error) {
                            console.log("Error during swap:", error);
                            alert("Error during swap: " + error);
                            // You might want to show an error message to the user
                          }
                        }}
                      >
                        Swap Tokens
                      </Button>
     </>
  );
};

export default SwapButton;
