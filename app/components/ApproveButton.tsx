"use client";
import { Button } from "@/components/ui/button";
import { getContract, prepareContractCall } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { client } from "../client";
import { useSendTransaction } from "thirdweb/react";
const ApproveButton = ({
  recipientAddress,
  Amount,
  setRecipientAddress,
  setAmount,
}: {
  recipientAddress: string;
  Amount: string;
  setRecipientAddress: (address: string) => void;
  setAmount: (amount: string) => void;
}) => {

        
    const contract = getContract({
        client,
        address: "0x1b5619EB448B3C5F1E44CcD4Ef5e1813A53E98fF",
        chain: sepolia,
      });
    
      const { mutate: sendTransaction } = useSendTransaction();

    const Approve = async (address: string, amount: bigint) => {


          
        const approve = prepareContractCall({
          contract,
          method: "function approve(address to, uint256 amount)",
          params: [address, amount], // type safe params
        });
        sendTransaction(approve);
      };
  return (
    <>
      <Button
        className="w-full"
        onClick={async () => {
          try {
            // Convert the amount to BigInt (assuming 18 decimals)
            const amount = BigInt(Amount);

            // You'll need to get the user's address from your wallet connection
            // This is just a placeholder - replace with actual wallet address
            const userAddress = "0xfBB519275F548b86297878956985045A9f73Aa8B";

            await Approve(recipientAddress, amount);

            // Optional: Clear inputs after successful mint
            setAmount("");
            setRecipientAddress("");

            alert("Tokens Approved"); // Not working properly
          } catch (error) {
            console.log("Error during swap:", error);
            alert("Error during swap: " + error);
            // You might want to show an error message to the user
          }
        }}
      >
        Approve Tokens
      </Button>
    </>
  );
};

export default ApproveButton;
