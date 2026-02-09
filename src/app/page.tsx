"use client";

import { NftMint } from "@/components/nft-mint";
import { defaultTokenId, contract } from "@/lib/constants";
import { useNftData } from "@/hooks/useNftData";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw, ShieldAlert, Zap, Globe, Cpu } from "lucide-react";

export default function Home() {
  const { data, loading, error, refetch } = useNftData();

  // --- LOADING STATE ---
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0c] p-6">
        <div className="w-full max-w-md border border-white/10 rounded-2xl bg-[#111114] p-6 shadow-2xl">
          <Skeleton className="aspect-square w-full rounded-xl bg-white/5 mb-6" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4 bg-white/5" />
            <Skeleton className="h-4 w-full bg-white/5" />
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
          <h1 className="text-3xl font-black tracking-tighter text-white mb-2 uppercase italic">System Critical</h1>
          <p className="text-gray-400 mb-8 max-w-xs mx-auto text-sm font-mono">
            {error || "CONNECTION_TIMEOUT: THE BATTLEFIELD DATA COULD NOT BE RETRIEVED."}
          </p>
          <button
            onClick={refetch}
            className="group flex items-center gap-2 px-8 py-3 bg-red-500 text-white font-bold rounded-sm hover:bg-red-600 transition-all duration-300 skew-x-[-10deg]"
          >
            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            REBOOT KERNEL
          </button>
        </div>
      </div>
    );
  }

  // --- SUCCESS STATE ---
  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white selection:bg-indigo-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* 1. HEADER / NAVIGATION */}
      <nav className="relative z-10 flex justify-between items-center p-6 border-b border-white/5 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.5)]">
            <Zap className="w-5 h-5 fill-white" />
          </div>
          <span className="font-black tracking-widest text-xl uppercase italic">Protocol-X</span>
        </div>
        <div className="hidden md:flex gap-8 text-xs font-bold tracking-widest text-gray-400">
          <a href="#" className="hover:text-indigo-400 transition-colors">DASHBOARD</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">ARCHIVE</a>
          <a href="#" className="hover:text-indigo-400 transition-colors">NETWORK</a>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-24 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* 2. LEFT COLUMN: HERO TEXT & STATS */}
        <section className="space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold tracking-[0.2em] uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Network Status: Operational
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
            Deploy Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">Digital Legacy.</span>
          </h1>

          <p className="text-gray-400 text-lg max-w-xl mx-auto lg:mx-0 font-medium">
            {data.description || "The next generation of asset deployment is here. Secure your position in the decentralized frontier."}
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-4 pt-8">
            <div className="p-4 border border-white/5 bg-white/5 rounded-xl">
              <p className="text-xs text-gray-500 font-bold uppercase mb-1">Floor Price</p>
              <p className="text-xl font-mono">{data.pricePerToken} {data.currencySymbol}</p>
            </div>
            <div className="p-4 border border-white/5 bg-white/5 rounded-xl">
              <p className="text-xs text-gray-500 font-bold uppercase mb-1">Standard</p>
              <p className="text-xl font-mono">{data.isERC721 ? "ERC-721" : "ERC-1155"}</p>
            </div>
            <div className="p-4 border border-white/5 bg-white/5 rounded-xl">
              <p className="text-xs text-gray-500 font-bold uppercase mb-1">Network</p>
              <p className="text-xl font-mono">L2-Mainnet</p>
            </div>
          </div>
        </section>

        {/* 3. RIGHT COLUMN: THE MINT CARD */}
        <section className="flex justify-center">
          <div className="relative group w-full max-w-md">
            {/* Animated Background Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            
            <div className="relative bg-[#111114] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
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
        </section>
      </div>

      {/* 4. FOOTER */}
      <footer className="relative z-10 mt-20 p-10 border-t border-white/5 bg-black/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-xs font-mono uppercase tracking-widest">
          <div className="flex gap-4">
            <Globe className="w-4 h-4" />
            <span>Distributed via Ethereum Network</span>
          </div>
          <div className="flex gap-4">
            <Cpu className="w-4 h-4" />
            <span>v2.0.4-Stable</span>
          </div>
          <p>© 2026 Protocol-X Industrial. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}