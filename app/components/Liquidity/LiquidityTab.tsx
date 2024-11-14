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
import SwapButton from "../SwapButton";
import ApproveButton from "../ApproveButton";
import AddLiquidityButton from "./AddLiquidityButton";

const SwapTab = ({amountOne, amountTwo, setAmountOne, setAmountTwo, addressOne, addressTwo, setAddressOne, setAddressTwo}: {amountOne: string, amountTwo: string, setAmountOne: (amount: string) => void, setAmountTwo: (amount: string) => void, addressOne: string, addressTwo: string, setAddressOne: (address: string) => void, setAddressTwo: (address: string) => void}) => {
  return (
    <>
      <Card>
                  <CardHeader>
                    <CardTitle>Provide Liquidity</CardTitle>
                    <CardDescription>
                      Add liquidity to earn fees from trades
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="token-a">Token A</Label>
                        <div className="flex mt-1">
                          <Input
                            id="token-a"
                            placeholder="0.0"
                            className="rounded-r-none"
                          value={amountOne}
                  onChange={(e) => setAmountOne(e.target.value)}
                />
                <Select onValueChange={(value) => setAddressOne(value)}>
                  <SelectTrigger className="w-40 rounded-l-none">
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0x650ADf6aA8b4e5764273E7f2001B2A3f792859a5">APT</SelectItem>
                    <SelectItem value="0x1b5619EB448B3C5F1E44CcD4Ef5e1813A53E98fF">CHT</SelectItem>
                    <SelectItem value="0xE3426B959F2178525Beb3875B129eEdDBC95058c">WEDU</SelectItem>
                  </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="token-b">Token B</Label>
                        <div className="flex mt-1">
                          <Input
                            id="token-b"
                            placeholder="0.0"
                            className="rounded-r-none"
                          value={amountTwo}
                  onChange={(e) => setAmountTwo(e.target.value)}
                />
                <Select onValueChange={(value) => setAddressTwo(value)}>
                  <SelectTrigger className="w-40 rounded-l-none">
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0x650ADf6aA8b4e5764273E7f2001B2A3f792859a5">APT</SelectItem>
                    <SelectItem value="0x1b5619EB448B3C5F1E44CcD4Ef5e1813A53E98fF">CHT</SelectItem>
                    <SelectItem value="0xE3426B959F2178525Beb3875B129eEdDBC95058c">WEDU</SelectItem>
                  </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <ApproveButton addressOne={addressOne} setAddressOne={setAddressOne} amountOne={amountOne} setAmountOne={setAmountOne}/>
                      <AddLiquidityButton addressOne={addressOne} setAddressOne={setAddressOne} amountOne={amountOne} setAmountOne={setAmountOne} addressTwo={addressTwo} setAddressTwo={setAddressTwo} amountTwo={amountTwo} setAmountTwo={setAmountTwo}/>
                      {/* <Button className="w-full">Add Liquidity</Button> */}
                    </div>
                  </CardContent>
                </Card>
    </>
  );
};

export default SwapTab;
