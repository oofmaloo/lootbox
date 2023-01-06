import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import * as React from 'react'

interface Props {
    address: string;
    to: string;
    tokenId: string;
}

export function ApproveERC721(props: Props) {

  const contractWrite = useContractWrite({
    address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
    abi: wagmigotchiABI,
    functionName: 'feed',
    args: [],
  })

  const {
   config,
   error: prepareError,
   isError: isPrepareError,
 } = usePrepareContractWrite({
   address: address,
   abi: ABI,
   functionName: 'approve',
   args: [to, tokenId]
 })
 const { data, error, isError, write } = useContractWrite(config)

 const { isLoading, isSuccess } = useWaitForTransaction({
   hash: data?.hash,
 })

 return (
   <div>
     <button disabled={!write || isLoading} onClick={() => write()}>
       {isLoading ? 'Minting...' : 'Mint'}
     </button>
     {isSuccess && (
       <div>
         Successfully minted your NFT!
         <div>
           <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
         </div>
       </div>
     )}
     {(isPrepareError || isError) && (
       <div>Error: {(prepareError || error)?.message}</div>
     )}
   </div>
 )
}
