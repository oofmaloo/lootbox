// import Image from 'next/image'
import Link from 'next/link'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Center,
  Stack, 
  HStack, 
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Container,
  Card,
  CardHeader,
  Flex,
  Avatar,
  Box,
  IconButton,
  CardBody,
  Heading,
  Text,
  CardFooter,
  Image
} from '@chakra-ui/react'
import { InfoOutlineIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'

const nftsList = [
  {
    id: 0,
    src: "https://i.seadn.io/gcs/files/de8ac405591f36644e457386be4f3407.png?auto=format&w=1000"
  },
  {
    id: 1,
    src: "https://i.seadn.io/gcs/files/de8ac405591f36644e457386be4f3407.png?auto=format&w=1000"
  },
  {
    id: 2,
    src: "https://i.seadn.io/gcs/files/de8ac405591f36644e457386be4f3407.png?auto=format&w=1000"
  },
  {
    id: 3,
    src: "https://i.seadn.io/gcs/files/de8ac405591f36644e457386be4f3407.png?auto=format&w=1000"
  },
  {
    id: 4,
    src: "https://i.seadn.io/gcs/files/de8ac405591f36644e457386be4f3407.png?auto=format&w=1000"
  },
  {
    id: 5,
    src: "https://i.seadn.io/gcs/files/de8ac405591f36644e457386be4f3407.png?auto=format&w=1000"
  },
]

export default function LootBoxIndex() {
  return (
    <>
      <div className="flex my-2  gap-1.5">
        <div>
          <Link href={`/loot/create`}>
            <Button 
              colorScheme='teal' 
              size='sm'
              variant='link'
            >
              Create
            </Button>
          </Link>
        </div>
        <div>
          <Popover>
            <PopoverTrigger>
              <InfoOutlineIcon w={3} h={3} />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverBody><p className="text-xs">Create a loot box by adding one or many NFT's and earn income.  Learn more.</p></PopoverBody>
            </PopoverContent>
          </Popover>
        </div>
      </div>
                  <div className="flex  justify-between">
                    <div className="flex ">
                      <div className="fl text-md dark:text-white">Pudgy Penguins</div>
                    </div>
                    <div className="flex ">
                      <div className="fl text-md dark:text-white justify-self-end">0</div>
                    </div>
                  </div>

      <div className="flex flex-wrap justify-around mt-8 gap-2">
        {nftsList.map((nft) => (
          <div key={nft.id} className="mt-4">            
            <Card maxW='xs' w="180px" className="rounded-3xl" borderRadius={"1.5rem"}>
              <Link href={`/loot/${nft.id}`}>
                <Image
                  className="rounded-3xl"
                  objectFit='cover'
                  src={nft.src}
                  alt='Chakra UI'
                />
              </Link>
              <div className="pt-2 pb-3 px-5">
                <div className="flex justify-between">
                  <div className="flex-none ">
                    <div className="fl text-md dark:text-white">Pudgy Penguins</div>
                  </div>
                  <div className="flex-none flex self-center items-center justify-center">
                      <ExternalLinkIcon w={3} h={3} />
                  </div>
                </div>
                <p className="text-xs mt-1 text-gray-400">#1235</p>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </>
  )
}


export function LootBoxCreate() {

  const { address, isConnected } = useAccount()

  const { config: configApprove } = usePrepareContractWrite({
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    abi: [
      {
        name: 'mint',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [],
        outputs: [],
      },
    ],
    functionName: 'mint',
  })
  const { data: dataApprove, write: writeApprove } = useContractWrite(configApprove)
 
  const { isLoading: isLoadingApprove, isSuccess: isSuccessApprove } = useWaitForTransaction({
    hash: dataApprove?.hash,
  })

  const { config: configSpin } = usePrepareContractWrite({
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    abi: [
      {
        name: 'mint',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [],
        outputs: [],
      },
    ],
    functionName: 'mint',
  })
  const { data: dataSpin, write: writeSpin } = useContractWrite(configSpin)

  function handleSubmit(e) {
    console.log("!writeSpin", !writeSpin)
    writeSpin && writeSpin()
    e.preventDefault();
  }

  return (
    <>
      <div>
        <Container maxW='sm'>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={`mx-auto mb-6 xl:w-96`}>
              <div className="my-2">
                <FormControl>
                  <FormLabel>
                    <div className="flex gap-1.5">
                      <div>
                        Address
                      </div>
                      <div>
                        <Popover>
                          <PopoverTrigger>
                            <InfoOutlineIcon w={3} h={3} />
                          </PopoverTrigger>
                          <PopoverContent>
                            <PopoverBody><p className="text-xs">Address of NFT.  Learn more.</p></PopoverBody>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </FormLabel>
                  <Input type='text' size='sm' required={true} />
                </FormControl>
              </div>
              <div className="my-2">
                <FormControl>
                  <FormLabel>
                    <div className="flex gap-1.5">
                      <div>
                        ID
                      </div>
                      <div>
                        <Popover>
                          <PopoverTrigger>
                            <InfoOutlineIcon w={3} h={3} />
                          </PopoverTrigger>
                          <PopoverContent>
                            <PopoverBody><p className="text-xs">ID of NFT.  Learn more.</p></PopoverBody>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </FormLabel>
                  <Input type='text' size='sm' required={true} max={5} />
                </FormControl>
              </div>
              <div className="my-6">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col">
                    <div className="flex-none">
                      <div>
                        <Image
                          className="rounded-3xl"
                          objectFit='cover'
                          boxSize='100px'
                          src={"https://i.seadn.io/gcs/files/de8ac405591f36644e457386be4f3407.png?auto=format&w=1000"}
                          alt='Chakra UI'
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col pt-2 pr-2">
                    <div className="flex-none">
                      <div>Pudgy Penguins</div>
                    </div>
                    <div className="flex-none">
                      <div>#15252</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-6 mb-2">
                <FormControl>
                  <Button 
                    type="submit"
                    colorScheme='teal' 
                    size='md'
                    width='100%'
                    className="mx-auto"
                  >
                    Approve
                  </Button>
                </FormControl>
              </div>

              <div className="flex justify-center my-2">
                <FormControl>
                  <Button 
                    type="submit"
                    colorScheme='teal' 
                    size='md'
                    width='100%'
                    className="mx-auto"
                  >
                    Submit
                  </Button>
                </FormControl>
              </div>
            </div>
          </form>
        </Container>
      </div>

    </>
  )
}