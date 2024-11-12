"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SwapButton from "./SwapButton";
import ApproveButton from "./ApproveButton";

const SwapTab = ({
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
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Swap Tokens</CardTitle>
          <CardDescription>
            Exchange one token for another at the best rates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="from-token">From</Label>
              <div className="flex mt-1">
                <Input
                  id="from-token"
                  placeholder="0.0"
                  className="rounded-r-none"
                  value={Amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <Select onValueChange={(value) => setRecipientAddress(value)}>
                  <SelectTrigger className="w-40 rounded-l-none">
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0x650ADf6aA8b4e5764273E7f2001B2A3f792859a5">APT</SelectItem>
                    <SelectItem value="0x456...CHT">CHT</SelectItem>
                    <SelectItem value="0x789...DAI">DAI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="to-token">To</Label>
              <div className="flex mt-1">
                {/* <Input
                  id="to-token"
                  placeholder="0.0"
                  className="rounded-r-none"
                  value={Amount}
                  onChange={(e) => setAmount(e.target.value)}
                /> */}
                {/* <Select onValueChange={(value) => setRecipientAddress(value)}>
                  <SelectTrigger className="w-40 rounded-l-none">
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0xabc...ETH">ETH</SelectItem>
                    <SelectItem value="0xdef...USDC">USDC</SelectItem>
                    <SelectItem value="0xghi...DAI">DAI</SelectItem>
                  </SelectContent>
                </Select> */}
              </div>
            </div>
            <ApproveButton recipientAddress={recipientAddress} Amount={Amount} setRecipientAddress={setRecipientAddress} setAmount={setAmount} />
            <SwapButton recipientAddress={recipientAddress} Amount={Amount} setRecipientAddress={setRecipientAddress} setAmount={setAmount} />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default SwapTab;
