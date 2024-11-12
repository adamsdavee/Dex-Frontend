"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart3,
  CandlestickChart,
  Coins,
  LayoutDashboard,
  RefreshCcw,
  Wallet,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {  lightTheme, useSendTransaction } from "thirdweb/react";
import { client } from "./client";
import { getContract, prepareContractCall } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import Header from "./components/Header";
import Footer from "./components/footer";
import Cardd from "./components/Card";
import SwapTab from "./components/SwapTab";

export default function RefinedDEXInterface() {
  const [activeTab, setActiveTab] = useState("swap");
  const [Amount, setAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const contract = getContract({
    client,
    address: "0xb7e2979167e46A03Cf44171c349945D7041B6C2D",
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

  const Transfer = async (address: string, addresss: string) => {
    const amount = BigInt(30000000000000000000);
    const amountt = BigInt(20000000000000000000);

    const transaction = prepareContractCall({
      contract,
      method:
        "function addLiquidity(address from, address to, uint256 amount, uint256 amount, uint256 amountt, uint256 amountt)",
      params: [address, addresss, amount, amount, amountt, amountt], // type safe params
    });
    sendTransaction(transaction);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 text-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="col-span-3">
            <Cardd activeTab={activeTab} setActiveTab={setActiveTab} />
          </aside>

          {/* Main Content */}
          <main className="col-span-9">
            <Tabs value={activeTab} className="w-full">
              <TabsContent value="swap">
                <SwapTab recipientAddress={recipientAddress} Amount={Amount} setRecipientAddress={setRecipientAddress} setAmount={setAmount} />
              </TabsContent>
              <TabsContent value="liquidity">
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
                          />
                          <Select>
                            <SelectTrigger className="w-40 rounded-l-none">
                              <SelectValue placeholder="Select token" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="eth">ETH</SelectItem>
                              <SelectItem value="usdc">USDC</SelectItem>
                              <SelectItem value="dai">DAI</SelectItem>
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
                          />
                          <Select>
                            <SelectTrigger className="w-40 rounded-l-none">
                              <SelectValue placeholder="Select token" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="eth">ETH</SelectItem>
                              <SelectItem value="usdc">USDC</SelectItem>
                              <SelectItem value="dai">DAI</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button className="w-full">Add Liquidity</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="investments">
                <div className="grid gap-6">
                  <div className="grid grid-cols-2 gap-6">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Portfolio Value
                        </CardTitle>
                        <CandlestickChart className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">$10,234.56</div>
                        <p className="text-xs text-muted-foreground">
                          +2.5% from last month
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          24h Change
                        </CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                          +5.67%
                        </div>
                        <p className="text-xs text-muted-foreground">
                          +$580.23
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Positions</CardTitle>
                      <CardDescription>
                        Overview of your liquidity positions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg mr-4">
                            E/U
                          </div>
                          <div>
                            <h3 className="font-semibold">ETH-USDC</h3>
                            <p className="text-sm text-muted-foreground">
                              $5,000
                            </p>
                          </div>
                          <div className="ml-auto text-right">
                            <p className="font-semibold">32.5 ETH</p>
                            <p className="text-sm text-muted-foreground">
                              2,500 USDC
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-bold text-lg mr-4">
                            D/U
                          </div>
                          <div>
                            <h3 className="font-semibold">DAI-USDC</h3>
                            <p className="text-sm text-muted-foreground">
                              $3,000
                            </p>
                          </div>
                          <div className="ml-auto text-right">
                            <p className="font-semibold">1,500 DAI</p>
                            <p className="text-sm text-muted-foreground">
                              1,500 USDC
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-yellow-500 flex items-center justify-center text-white font-bold text-lg mr-4">
                            E/D
                          </div>
                          <div>
                            <h3 className="font-semibold">ETH-DAI</h3>
                            <p className="text-sm text-muted-foreground">
                              $2,234.56
                            </p>
                          </div>
                          <div className="ml-auto text-right">
                            <p className="font-semibold">7.2 ETH</p>
                            <p className="text-sm text-muted-foreground">
                              1,117.28 DAI
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
