"use client";
import { Button } from "@/components/ui/button";
import { getContract, prepareContractCall } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { client } from "../../client";
import { useSendTransaction } from "thirdweb/react";
const MintButton = ({
  addressOne,
  addressTwo,
  setAddressOne,
  amountOne,
  setAmountOne, 
}: {addressOne: string, addressTwo: string, setAddressOne: (address: string) => void, amountOne: string, setAmountOne: (amount: string) => void}) => {

        
    const contract = getContract({
        client,
        address: addressTwo,
        chain: sepolia,
      });
    
      const { mutate: sendTransaction } = useSendTransaction();

      const Mint = async (address: string, amount: bigint) => {
        const approve = prepareContractCall({
          contract,
          method: "function mint(address to, uint256 amount)",
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
            const amount = BigInt(Number(amountOne) * 10 ** 18);

            // You'll need to get the user's address from your wallet connection
            // This is just a placeholder - replace with actual wallet address

            await Mint(addressOne, amount);

            // Optional: Clear inputs after successful mint
            setAmountOne("");

            alert("Tokens Minted"); // Not working properly
          } catch (error) {
            console.log("Error during mint:", error);
            alert("Error during mint: " + error);
            // You might want to show an error message to the user
          }
        }}
      >
        Mint Tokens
      </Button>
    </>
  );
};

export default MintButton;
