"use client";
import { Button } from "@/components/ui/button";
import { getContract, prepareContractCall } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { client } from "../../client";
import { useSendTransaction } from "thirdweb/react";


const AddLiquidityButton = ({
  addressOne,
  addressTwo,
  amountOne,
  amountTwo,
  setAmountOne,
  setAmountTwo,
}: {
  addressOne: string;
  addressTwo: string;
  amountOne: string;
  amountTwo: string;
  setAddressOne: (address: string) => void;
  setAddressTwo: (address: string) => void;
  setAmountOne: (amount: string) => void;
  setAmountTwo: (amount: string) => void;
}) => {
  const routerAddress = "0xb7e2979167e46A03Cf44171c349945D7041B6C2D";
  const contract = getContract({
    client,
    address: routerAddress,
    chain: sepolia,
  });

  const { mutate: sendTransaction } = useSendTransaction();

  const AddLiquidity = async (
    addressOne: string,
    addressTwo: string,
    amountOne: bigint,
    amountTwo: bigint,
    minTokenA: bigint,
    minTokenB: bigint
  ) => {
    const addLiquidity = prepareContractCall({
      contract,
      method:
        "function addLiquidity(address tokenA, address tokenB, uint256 amountOfTokenADesired, uint256 amountOfTokenBDesired, uint256 minTokenA, uint256 minTokenB)",
      params: [addressOne, addressTwo, amountOne, amountTwo, minTokenA, minTokenB], // type safe params
    });
    sendTransaction(addLiquidity);
  };

  return (
    <>
      <Button
        className="w-full"
        onClick={async () => {
          try {
            // Convert the amount to BigInt (assuming 18 decimals)
            const amountA = BigInt(Number(amountOne) * 10 ** 18);
            const amountB = BigInt(Number(amountTwo) * 10 ** 18);

            // You'll need to get the user's address from your wallet connection
            // This is just a placeholder - replace with actual wallet addres

            await AddLiquidity(
              addressOne,
              addressTwo,
              amountA,
              amountB,
              BigInt(0),
              BigInt(0)
            );

            // Optional: Clear inputs after successful mint
            setAmountOne("");
            setAmountTwo("");
            alert("Liquidity Added"); // Not working properly
          } catch (error) {
            console.log("Error during swap:", error);
            alert("Error during swap: " + error);
            // You might want to show an error message to the user
          }
        }}
      >
        Add Liquidity
      </Button>
    </>
  );
};

export default AddLiquidityButton;
