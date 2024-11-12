"use client";
import { Button } from "@/components/ui/button";

import {  useSendTransaction } from "thirdweb/react";
import { client } from "../client";
import { getContract, prepareContractCall } from "thirdweb";
import { sepolia } from "thirdweb/chains";

const SwapButton = ({Amount, recipientAddress, setAmount, setRecipientAddress}: {Amount: string, recipientAddress: string, setAmount: (amount: string) => void, setRecipientAddress: (address: string) => void}) => {

    const contract = getContract({
      client,
      address: "0xb7e2979167e46A03Cf44171c349945D7041B6C2D",
      chain: sepolia,
    });
  
    const { mutate: sendTransaction } = useSendTransaction();
  
    const SwapTokens = async (amountIn: bigint, amountOut: bigint, path: string[]) => {
      const swap = prepareContractCall({
        contract,
        method: "function swapExactTokensForTokens(uint256 amountIn, uint256 amountOutMin, address[] memory path)",
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
                            const amount = BigInt(parseFloat(Amount) * 1e18);

                            // You'll need to get the user's address from your wallet connection
                            // This is just a placeholder - replace with actual wallet address
                            const userAddress =
                              "0xF5c87bFCE1999d3E48f0407E43F0Db10394A4B37";

                            await SwapTokens(amount, amount, [recipientAddress]);

                            // Optional: Clear inputs after successful mint
                            setAmount("");
                            setRecipientAddress("");
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
