"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Minus, Plus, Wallet, Zap } from "lucide-react";
import type { ThirdwebContract } from "thirdweb";
import {
    ClaimButton,
    ConnectButton,
    MediaRenderer,
    NFTProvider,
    NFTMedia,
    useActiveAccount,
} from "thirdweb/react";
import { client } from "@/lib/thirdwebClient";
import React from "react";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";

type Props = {
    contract: ThirdwebContract;
    displayName: string;
    description: string;
    contractImage: string;
    pricePerToken: number | null;
    currencySymbol: string | null;
    isERC1155: boolean;
    isERC721: boolean;
    tokenId: bigint;
};

export function NftMint(props: Props) {
    const [quantity, setQuantity] = useState(1);
    const [useCustomAddress, setUseCustomAddress] = useState(false);
    const [customAddress, setCustomAddress] = useState("");
    const account = useActiveAccount();

    const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));
    const increaseQuantity = () => setQuantity((prev) => prev + 1);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number.parseInt(e.target.value);
        if (!Number.isNaN(value)) {
            setQuantity(Math.max(1, value));
        }
    };

    if (props.pricePerToken === null || props.pricePerToken === undefined) {
        return null;
    }

    return (
        <div className="w-full bg-[#111114] text-white overflow-hidden shadow-2xl">
            {/* Header / Connection Status */}
            <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Minting Terminal</span>
                </div>
                {!account && (
                    <ConnectButton 
                        client={client} 
                        connectButton={{ 
                            className: "!bg-indigo-600 !text-white !text-xs !px-4 !py-2 !h-auto !rounded-md" 
                        }} 
                    />
                )}
            </div>

            <div className="p-6">
                {/* Media Section */}
                <div className="aspect-square overflow-hidden rounded-xl mb-6 bg-black/40 border border-white/10 relative group">
                    {props.isERC1155 ? (
                        <NFTProvider contract={props.contract} tokenId={props.tokenId}>
                            <NFTMedia
                                loadingComponent={<Skeleton className="w-full h-full bg-white/5" />}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </NFTProvider>
                    ) : (
                        <MediaRenderer
                            client={client}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            alt={props.displayName}
                            src={props.contractImage || "/placeholder.svg"}
                        />
                    )}
                    <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md border border-white/10 text-indigo-400 px-3 py-1 rounded-lg text-xs font-mono font-bold">
                        {props.pricePerToken} {props.currencySymbol}
                    </div>
                </div>

                {/* Info Section */}
                <div className="mb-6">
                    <h2 className="text-2xl font-black tracking-tighter uppercase mb-2 italic">
                        {props.displayName}
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                        {props.description}
                    </p>
                </div>

                {/* Quantity Selector */}
                <div className="space-y-3 mb-6">
                    <Label className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">Unit Quantity</Label>
                    <div className="flex items-center bg-black/40 border border-white/10 rounded-lg p-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={decreaseQuantity}
                            disabled={quantity <= 1}
                            className="text-gray-400 hover:text-white hover:bg-white/5 rounded-md"
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="bg-transparent border-none text-center font-mono text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                            min="1"
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={increaseQuantity}
                            className="text-gray-400 hover:text-white hover:bg-white/5 rounded-md"
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Custom Address Toggle */}
                <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between px-1">
                        <div className="flex flex-col">
                            <Label htmlFor="custom-address" className="text-xs font-bold text-gray-300">Alternate Recipient</Label>
                            <span className="text-[10px] text-gray-500 uppercase tracking-tighter">Send to a different wallet</span>
                        </div>
                        <Switch
                            id="custom-address"
                            checked={useCustomAddress}
                            onCheckedChange={setUseCustomAddress}
                            className="data-[state=checked]:bg-indigo-600"
                        />
                    </div>
                    
                    {useCustomAddress && (
                        <div className="relative animate-in fade-in slide-in-from-top-2 duration-300">
                            <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input
                                id="address-input"
                                type="text"
                                placeholder="0x..."
                                value={customAddress}
                                onChange={(e) => setCustomAddress(e.target.value)}
                                className="bg-black/40 border-white/10 pl-10 font-mono text-xs focus:border-indigo-500/50 transition-colors"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Footer / Action */}
            <div className="p-6 bg-white/5 border-t border-white/5">
                {account ? (
                    <ClaimButton
                        theme={"dark"}
                        contractAddress={props.contract.address}
                        chain={props.contract.chain}
                        client={props.contract.client}
                        claimParams={
                            props.isERC1155
                                ? {
                                    type: "ERC1155",
                                    tokenId: props.tokenId,
                                    quantity: BigInt(quantity),
                                    to: useCustomAddress ? customAddress : account.address,
                                }
                                : {
                                    type: "ERC721",
                                    quantity: BigInt(quantity),
                                    to: useCustomAddress ? customAddress : account.address,
                                }
                        }
                        className="!bg-indigo-600 !hover:bg-indigo-500 !text-white !font-black !uppercase !tracking-widest !py-6 !rounded-xl !shadow-[0_0_20px_rgba(79,70,229,0.3)] !transition-all !border-none !w-full"
                        onTransactionSent={() => toast.loading("Processing deployment...", { id: "mint-toast" })}
                        onTransactionConfirmed={() =>
                            toast.success("Assets deployed to the grid.", { id: "mint-toast" })
                        }
                        onError={(err) => toast.error(err.message, { id: "mint-toast" })}
                    >
                        Initialize Mint ({props.pricePerToken * quantity} {props.currencySymbol})
                    </ClaimButton>
                ) : (
                    <div className="space-y-3">
                        <p className="text-[10px] text-center text-gray-500 uppercase font-bold tracking-[0.2em]">Authentication Required</p>
                        <ConnectButton
                            client={client}
                            connectButton={{ 
                                className: "!w-full !bg-white !text-black !font-bold !py-6 !rounded-xl hover:!bg-indigo-500 hover:!text-white !transition-colors",
                                label: "CONNECT COMMAND CENTER"
                            }}
                        />
                    </div>
                )}
                
                <div className="mt-4 flex justify-between items-center text-[9px] font-mono text-gray-600 uppercase tracking-tighter">
                    <span>Gas: Est. Low</span>
                    <span>Secure Protocol v4.2</span>
                </div>
            </div>
        </div>
    );
}