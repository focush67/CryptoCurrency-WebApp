import React, { useEffect, useState } from "react";
import axios from "axios";
import { RadioGroup, Radio } from "@chakra-ui/react";
import { HStack, VStack, Button } from "@chakra-ui/react";
import { server } from "../index";
import { Text, Container, Heading } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import Loader from "./Loader";
import GotError from "./GotError";
import { Link } from "react-router-dom";

const Coins = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [curr, setCurr] = useState("inr");

  const currencySymbol = curr === "inr" ? "₹" : curr === "usd" ? "$" : "€";

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  const buttons = new Array(132).fill(1);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${curr}&page=${page}`
        );
        console.log(data);
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchCoins();
  }, [curr, page]);

  if (error) return <GotError />;

  return (
    <Container maxW={"100vw"} bgColor={"blackAlpha.800"} borderColor={'blackAlpha.800'}color={"white"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup value={curr} onChange={setCurr}>
            <HStack justifyContent={"center"} spacing={"6"} p={"8"}>
              <Radio value={"inr"} color={"red"}>
                INR
              </Radio>
              <Radio value={"usd"} color={"green"}>
                USD
              </Radio>
              <Radio value={"eur"} color={"blue"}>
                EUR
              </Radio>
            </HStack>
          </RadioGroup>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"} borderColor={'whiteAlpha.200'}>
            {coins.map((i) => (
              <CoinCard
                id={i.id}
                name={i.name}
                img={i.image}
                symbol={i.symbol}
                price={i.current_price}
                high_24h={i.high_24h}
                low_24h={i.low_24h}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>

          <HStack w={"full"} overflowX={"scroll"} p={"10"}>
            {buttons.map((item, index) => (
              <Button
                key={index}
                bgColor={"blackAlpha.800"}
                color={"white"}
                css={{
                  "&:hover": {
                    color: "black",
                  },
                }}
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

const CoinCard = ({
  id,
  name,
  img,
  symbol,
  price,
  high_24h,
  low_24h,
  currencySymbol = "₹",
}) => (
  <Link to={`/coin/${id}`}>
    <VStack
      w={"52"}
      bgColor={'whiteAlpha.100'}
      shadow={"xl"}
      borderRadius={"xl"}
      p={"8"}
      transition={"all 0.2s ease-in"}
      m={"4"}
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Image
        src={img}
        w={"10"}
        h={"10"}
        objectFit={"contain"}
        alt={"Exchange"}
      />

      <Heading size={"sm"} noOfLines={1}>
        {symbol}
      </Heading>

      <Text noOfLines={1}>{name}</Text>

      <Text noOfLines={1}>{price ? `${currencySymbol}${price}` : "NA"}</Text>

      <Text fontWeight={"bolder"} noOfLines={1}>
        High : {high_24h ? `${currencySymbol}${high_24h}` : "NA"}
      </Text>

      <Text noOfLines={1}>
        Low : {low_24h ? `${currencySymbol}${low_24h}` : "NA"}
      </Text>
    </VStack>
  </Link>
);

export default Coins;
