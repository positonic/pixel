import { useEffect, useState } from "react";
import { useScaffoldContractRead } from "./scaffold-eth";
import { useAccount } from "wagmi";
import { axiosGet } from "~~/utils/http";

export type NFTData = {
  collection: string;
  tokenId: number;
  name: string;
  symbol: string;
  image: string;
};

export const useGetNfts = () => {
  const { address } = useAccount();

  const { data: tokens, isLoading } = useScaffoldContractRead({
    contractName: "NFTHelper",
    functionName: "getOwnedTokens",
    args: [address],
  });

  // const tokens: NFTData[] = (data as NFTData[]) || [];

  //   const { tokens } = useGetOwnedTokens(address || "");

  const [nfts, setNfts] = useState<NFTData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTokensMetadata = () => {
    setLoading(true);
    if (tokens) {
      tokens.forEach(async token => {
        // "ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1"
        const url = `https://ipfs.io/ipfs/${token.tokenURI.substring(7)}`;

        const data = await axiosGet(url);
        const imageUrl = `https://ipfs.io/ipfs/${data.image.substring(7)}`;

        const nft = {
          collection: token.collection,
          tokenId: Number(token.tokenId),
          name: token.name,
          symbol: token.symbol,
          image: imageUrl,
        };

        setNfts(prev => [...prev, nft]);
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTokensMetadata();
  }, [tokens]);

  return { nfts, loading: isLoading || loading };
};

// import { useEffect, useState } from "react";
// import { useGetOwnedTokens } from "./pixel/useHelper";
// import { useAccount } from "wagmi";
// import { useUserNFTsState } from "~~/services/store/store";
// import { axiosGet } from "~~/utils/http";

// export type NFTData = {
//   collection: string;
//   tokenId: number;
//   name: string;
//   symbol: string;
//   image: string;
// };

// export const useNFTFetcher = () => {
//   const { address } = useAccount();

//   //   const [nfts, setNfts] = useState<NFTData[]>([]);

//   const { tokens } = useGetOwnedTokens(address || "");
//   const { setNFTs } = useUserNFTsState();
//   const fetchTokensMetadata = async () => {
//     if (tokens) {
//       const nfts = [];
//       for (const token of tokens) {
//         const url = `https://ipfs.io/ipfs/${token.tokenURI.substring(7)}`;

//         const data = await axiosGet(url);
//         const imageUrl = `https://ipfs.io/ipfs/${data.image.substring(7)}`;

//         const nft = {
//           collection: token.collection,
//           tokenId: Number(token.tokenId),
//           name: token.name,
//           symbol: token.symbol,
//           image: imageUrl,
//         };

//         nfts.push(nft);
//       }
//       console.log('nfts:', nfts)
//       setNFTs(nfts);
//     }
//   };

//   useEffect(() => {
//     fetchTokensMetadata();
//   }, [tokens]);
// };
