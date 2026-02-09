"use client";

import { NftMint } from "@/components/nft-mint";
import { defaultTokenId, contract } from "@/lib/constants";
import { useNftData } from "@/hooks/useNftData";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw, ShieldAlert } from "lucide-react";

export default function Home() {
  const { data, loading, error, refetch } = useNftData();

  // --- LOADING STATE (SKELETON) ---
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0c] text-white p-6">
        <div className="w-full max-w-md border border-white/10 rounded-2xl bg-[#111114] p-6 shadow-2xl">
          <Skeleton className="aspect-square w-full rounded-xl bg-white/5 mb-6" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4 bg-white/5" />
            <Skeleton className="h-4 w-full bg-white/5" />
            <Skeleton className="h-4 w-1/2 bg-white/5" />
            <Skeleton className="h-12 w-full rounded-lg bg-indigo-500/20 mt-4" />
          </div>
        </div>
      </div>
    );
  }

  // --- ERROR STATE ---
  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0c] p-6">
        <div className="text-center p-10 border-2 border-red-500/20 bg-red-500/5 rounded-3xl backdrop-blur-md">
          <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-black tracking-tighter text-white mb-2 uppercase">System Failure</h1>
          <p className="text-gray-400 mb-8 max-w-xs mx-auto">
            {error || "The battlefield data could not be retrieved."}
          </p>
          <button
            onClick={refetch}
            className="group flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-indigo-500 hover:text-white transition-all duration-300"
          >
            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            REBOOT SYSTEM
          </button>
        </div>
      </div>
    );
  }

  // --- SUCCESS STATE ---
  return (
    <main className="min-h-screen bg-[#0a0a0c] bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#0a0a0c] to-[#0a0a0c] flex items-center justify-center p-4">
      <div className="relative group">
        {/* Animated Background Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        
        <div className="relative bg-[#111114] border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-transform duration-500 hover:scale-[1.01]">
          <NftMint
            contract={contract}
            displayName={data.displayName}
            contractImage={data.contractImage}
            description={data.description}
            currencySymbol={data.currencySymbol}
            pricePerToken={data.pricePerToken}
            isERC1155={data.isERC1155}
            isERC721={data.isERC721}
            tokenId={defaultTokenId}
          />
        </div>
      </div>
    </main>
  );
}