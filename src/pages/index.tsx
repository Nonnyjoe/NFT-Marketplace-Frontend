import Head from "next/head";
import Navbar from "../components/Navbar";
// import { Inter } from "next/font/google";
import PageLayout from "../layout/PageLayout";
import ConnectionButton from "../components/ConnectionButton"
import { useAccount, useContractRead, useContractReads, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import marketABI from "../utils/market_ABI.json"
import nftABI from "../utils/nft_ABI.json"
import axios from "axios"
import { ethers } from "ethers";
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
// import (useState)

export default function Mint() {
const marketAddress = "0xeA7Aa361F8122f8c59CE52546A3da81738479be8";
const NFTAddress = "0xE636259966E9b57b6ED2D6a72a40737f4Af18f20"

const [NFTCID, setNFTCID] = useState<string>("");


  const { data: mintData, write: mintNFT, isLoading:sendLoading } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: NFTAddress,
    abi: nftABI,
    functionName: "createToken",
    args: [NFTCID],
  });

   const { data: mintWaitData, isLoading:loadingWaitData } = useWaitForTransaction({
    hash: mintData?.hash,

    onSuccess(result) {
      console.log("DATA: ", result);
      console.log("mintWaitData: ", mintWaitData);
      console.log("mintData (tokenId): ", mintData);
    },

    onError(error) {
      console.log("Error: ", error);
    },
  });

  console.log(mintWaitData);
  
  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    mintNFT?.();
  }

  return (
    <div>
        <Head>
        <title>Web3Bridge | Users </title>
        <meta name="description" content="This is the application for web3Bridge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageLayout>
        <h1 className="text-2xl font-bold text-center mb-[-10%] mt-20"> MINT TOKEN </h1>
        <div className="flex items-center justify-center h- h-screen ">

        <form onSubmit={handleSubmit}>
            <div className="justify-center border border-teal-500 p-10 bg-gray-200 text-gray-800 rounded-lg flex flex-col gap-5 top-[-20%] shadow-md">
            <label className="block">Nft Metadata CID</label>
            <input
                type={"text"}
                placeholder="METADATA CID"
                className="p-3 border border-teal-500 rounded-lg"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNFTCID(e.target.value)
                }
            />

            <button
            type="submit"
            className="py-3 px-8 bg-green-600 border border-green-100 font-semibold rounded-lg"
            >
            {sendLoading || loadingWaitData ? "PROCESSING...." : "MINT"}
            </button>
                </div>
        </form>
        </div>

      </PageLayout>
    </div>
  );

 
}