import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Center,
  Switch,
  Stack, 
  HStack, 
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from '@chakra-ui/react'
import { InfoOutlineIcon } from '@chakra-ui/icons'
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'

interface Props {
  id: number
}

export default function LootBox(props: Props) {
  const { id } = props

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
 
  const { isLoading: isLoadingSpin, isSuccess: isSuccessSpin } = useWaitForTransaction({
    hash: dataSpin?.hash,
  })

  var img = {
    blue:
      '<img src="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhhwszYI2gS09-5mpSEguXLPr7Vn35c18lwmO7Eu9TwjVbs8xVqZm_3J4TGcVU3YFCE-Ae5weq81JXovJXLyiRjvyFw4nfD30vgN-NX6nY/360fx360f"/>',
    purple:
      '<img src="http://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PLZTjlH7du6kb-FlvD1DLfYkWNF18lwmO7Eu46h2QS1r0tvZjvyLI-RIwI6aV7X_ADrwevmhZO0up_AwSM1uHNw5nzD30vgQ0tV-jw/360fx360f"/>',
    pink:
      '<img src="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PLZTjlH_9mkgIWKkPvxDLDEm2JS4Mp1mOjG-oLKhF2zowcDPzixc9OLcw82ZlyF8wC8wb251MW4tcifmydi7CEn4HiPlhyy1BxJbeNshqPIHELeWfJvK5CfiA/360fx360f"/>',
    red:
      '<img src="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5gZKKkPLLMrfFqWZU7Mxkh9bN9J7yjRrhrUFuazjzJteVJlQ6NVHTrFe3wObs15G06picwHFnvid25C3bnhSzn1gSOQz0szG-/360fx360f"/>',
    yellow:
      '<img src="http://vignette4.wikia.nocookie.net/cswikia/images/a/ad/Csgo-default_rare_item.png/revision/latest?cb=20150227163025"/>',
    pudgy2: 
      '<div class="h-full flex justify-center"><img class="self-center shadow h-36 rounded-3xl overflow-hidden" src="https://i.seadn.io/gcs/files/de8ac405591f36644e457386be4f3407.png?auto=format&w=1000"/></div>',
    pudgy: 
      '<div class="h-full flex justify-center"><div class="loot-img self-center rounded-3xl"><img class="rounded-3xl" src="https://i.seadn.io/gcs/files/de8ac405591f36644e457386be4f3407.png?auto=format&w=1000"/></div></div>',
  };

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    if (lootBoxWidth == 0) {
      const element = document.querySelector('#unbox-area');
      setLootBoxWidth(element.offsetWidth);
    }

    window.addEventListener(
      "resize",
      () => {
        const element = document.querySelector('#unbox-area');
        
        if (element != null) {
          setLootBoxWidth(element.offsetWidth);
          const halfScreenWidth = element.offsetWidth / 2;

          const item = document.querySelector('.loot-card');
          const style = getComputedStyle(item);
          const itemWidth = style.width;
          const itemMarginLeft = style.marginLeft;

          document.querySelector(".loot-card").animate(
            { marginLeft: -((minimumScroll+rvf) * (cardWidth) - halfScreenWidth + ((cardWidth)/2)) + "px" },
            {
              duration: 1300,
              easing: "ease",
              iterations: 1,
              fill: "forwards"
            }
          );
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cardWidth = 200;
  const cardMarginX = 0;

  // const [cardWidth, setCardWidth] = useState(180);
  const minimumScroll = 100;
  const [sound, setSound] = useState(false);
  const [difficulty, setDifficulty] = useState(100);
  const [guess, setGuess] = useState(50);
  const [rvf, setRvf] = useState(50);
  const [animationDuration, setAnimationDuration] = useState(6000);
  const [lootBoxWidth, setLootBoxWidth] = useState(0);
  const [advanced, setAdvanced] = useState(false);

  function reset() {
    const cards = document.getElementsByClassName("loot-card");
    while (cards.length > 0) {
      cards[0].parentNode.removeChild(cards[0]);
    }

    let multiplier;
    if (difficulty < 1000) {
      multiplier = 2;
    } else if (difficulty < 500) {
      multiplier = 6;
    } else if (difficulty < 100) {
      multiplier = 10;
    } else {
      multiplier = 2
    }

    for (let i = 0; i < (minimumScroll+difficulty*1); i++) {
      let element;
      if (i <= minimumScroll) {
        element =
          '<div class="loot-card flex-none rounded-3xl over flow-hidden" id=itemNumber' +
          0 +
          ">" +
          img.pudgy +
          "</div>";
      } else {
        element =
          '<div class="loot-card flex-none rounded-3xl over flow-hidden" id=itemNumber' +
          i +
          ">" +
          img.pudgy +
          "</div>";
      }

      let cardList = document.querySelector("#cardList");
      cardList.insertAdjacentHTML("beforeend", element);
    }
    // const loot-card = document.querySelector(".loot-card");
    // loot-card.style.marginLeft = "-1000px";
  }

  function openCase() {
    if (sound) {
      const audio = document.getElementById("audio");
      audio.playbackRate = 1.6;
      audio.play();
    }

    reset();
    const screenWidth = lootBoxWidth;
    const halfScreenWidth = screenWidth / 2;

    document.querySelector(".loot-card").animate(
      { marginLeft: -((minimumScroll+rvf) * (cardWidth) - halfScreenWidth + ((cardWidth)/2)) + "px" },
      {
        duration: animationDuration,
        easing: "ease",
        iterations: 1,
        fill: "forwards"
      }
    );

    // const start = new Date();
    // const timer_id = setInterval(function() {
    //   // the duration is 10 seconds
    //   if (new Date() - start > animationDuration) {
    //      clearInterval(timer_id);
    //   } else {
    //      audio.play();
    //   }
    // }, 10); // every 1 second your function will run, you could change it by your needs.

    const child = document.querySelector(`.loot-card:nth-child(${minimumScroll + Number(rvf) + 1}) > div > div`);

    child.style.class = "r-shadow"

    child.classList.add('r-shadow');

  }

  function handleSubmit(e) {
    console.log("!writeSpin", !writeSpin)
    writeSpin && writeSpin()
    e.preventDefault();
  }

  function handleSpin(e) {
    openCase();
    e.preventDefault();
  }

  function updateGuess(e) {
    setGuess(e.target.value)
  }

  function play() {
    console.log("play");
    const audio = document.getElementById("audio");
    audio.play();
  }

  return (
    <>
      <div>       
        <audio id="audio">
          <source src="/grand.mp3" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
        <div className="mx-12" id="unbox-area">
          <div className="cardListBox">
            <div className="flex flex-nowrap h-64 items-center" id="cardList"></div>
          </div>
        </div>
        <Center>
          <div className="flex space-x-2 justify-center mt-2 my-1">
            <Button 
              onClick={() => setAdvanced(!advanced)} 
              size='xs'
              width='200px'
              variant='ghost'
            >
              Advanced
            </Button>
          </div>
        </Center>
        <Center>
          <div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="flex space-x-2 justify-center my-1">
                <Button 
                  type="submit"
                  colorScheme='teal' 
                  size='md'
                  width='200px'
                >
                  Submit
                </Button>
              </div>
              <div className="flex space-x-2 justify-center my-1">
                <Button 
                  colorScheme='teal' 
                  size='md'
                  width='200px'
                  onClick={(e) => handleSpin(e)}
                  disabled={false}
                >
                  Spin
                </Button>
              </div>
              <HStack className="my-2">
                <Switch size='sm' /><p className="text-xs">Auto spin</p>
              </HStack>
              <HStack className="my-2">
                <Switch size='sm' isChecked={sound} onChange={() => setSound(!sound)} /><p className="text-xs">Sound</p>
              </HStack>
              <div className={`mx-auto mb- 6 xl:w-96 ${advanced ? '' : 'hidden'}`}>
                <div className="flex space-x-2 justify-center">
                  <FormControl>
                    <FormLabel>
                      <div className="flex gap-1.5">
                        <div>
                          Hash
                        </div>
                        <div>
                          <Popover>
                            <PopoverTrigger>
                              <InfoOutlineIcon w={3} h={3} />
                            </PopoverTrigger>
                            <PopoverContent>
                              <PopoverBody><p className="text-xs">Create your own hash.  Learn more.</p></PopoverBody>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </FormLabel>
                    <Input type='number' size='xs' />
                  </FormControl>
                </div>
                <div className="flex space-x-2 justify-center">
                  <FormControl>
                    <FormLabel>
                      <div className="flex gap-1.5">
                        <div>
                          Spins
                        </div>
                        <div>
                          <Popover>
                            <PopoverTrigger>
                              <InfoOutlineIcon w={3} h={3} />
                            </PopoverTrigger>
                            <PopoverContent>
                              <PopoverBody><p className="text-xs">Spin up to 5 times in one transaction.  Learn more.</p></PopoverBody>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </FormLabel>
                    <Input type='number' size='xs' max={5} />
                  </FormControl>
                </div>
              </div>
            </form>
          </div>
        </Center>
      </div>
    </>
  )
}
