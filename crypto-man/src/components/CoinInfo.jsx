import { Button, Container } from "@chakra-ui/react";
import React from "react";
import { HStack, VStack } from "@chakra-ui/react";
import { Box, Text } from "@chakra-ui/react";
import Loader from "./Loader";
import axios from "axios";
import { server } from "..";
import CoinChart from "./CoinChart";
import { Badge } from "@chakra-ui/react";
import {
  Stat,
  StatHelpText,
  StatArrow,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { RadioGroup, Radio } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import GotError from "./GotError";
import { Progress } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";

const other = {
    margin:'1rem',
    marginCollapse:'none',
    
}


const CoinInfo = () => {
  const [loading, setLoading] = useState(true);
  const [coin, setCoin] = useState({});
  const [error, setError] = useState(false);
  const [curr, setCurr] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chart, setChart] = useState([]);

  const params = useParams();

  const buttons = ["24h", "7d", "14d", "30d", "60d", "200d", "365d", "max"];
  const currencySymbol = curr === "inr" ? "₹" : curr === "usd" ? "$" : "€";

  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;

      case "7d":
        setDays("7d");
        setLoading(true);
        break;

      case "14d":
        setDays("14d");
        setLoading(true);
        break;

      case "30":
        setDays("30");
        setLoading(true);
        break;

      case "60d":
        setDays("60d");
        setLoading(true);
        break;

      case "200":
        setDays("200d");
        setLoading(true);
        break;

      case "365d":
        setDays("365d");
        setLoading(true);
        break;

      case "max":
        setDays("max");
        setLoading(true);
        break;

      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  };

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);

        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${curr}&days=${days}`
        );

        setCoin(data);
        setChart(chartData.prices);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchCoin();
  }, [params.id, curr, days]);

  if (error) <GotError />;

  return (
    <Container maxW={"container.xl"} bgColor={'blackAlpha.100'}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box w={"full"} borderWidth={"1"}>
            <CoinChart arr={chart} curr={currencySymbol} days={days} bgColor={"blackAlpha.800"} />
          </Box>

          <HStack p={"6"} wrap={"wrap"} marginLeft={'4'}
             justifyContent={"space-evenly"}   >
            {buttons.map((i) => (
              <Button
                variant={"ghost"}
                key={i}
                fontWeight={"bolder"}
                p={"5"}
                bgColor={"whiteAlpha.100"}
                color={"black"}
                overflowX={"auto"}
                onClick={() => switchChartStats(i)}
                {...other}
                
              >
                {i}
              </Button>
            ))}
          </HStack>

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

          <VStack spacing={"6"} p="16" alignItems={"flex-start"}>
            <Text fontSize={"small"} alignSelf={"center"} opacity={0.6}>
              Last updated on{" "}
              {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>

            <Image
              src={coin.image.large}
              w={"16"}
              h={"16"}
              objectFit={"contain"}
              
            />

            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol}
                {coin.market_data.current_price[curr]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h > 0
                      ? "increase"
                      : "decrease"
                  }
                />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>

            <Badge fontSize={"2xl"} bgColor={"black"} color={"white"}>
              {`#${coin.market_cap_rank}`}
            </Badge>

            <CustomBar
              high={`${currencySymbol}${coin.market_data.high_24h[curr]}`}
              low={`${currencySymbol}${coin.market_data.low_24h[curr]}`}
            />

            <Box w={"full"} p={"4"}>
              <Item
                title={"Max Supply"}
                value={coin.market_data.total_supply}
              />

              <Item
                title={"Circulating Supply"}
                value={coin.market_data.circulating_supply}
              />

              <Item
                title={"Market Capital"}
                value={`${currencySymbol}${coin.market_data.market_cap[curr]}`}
              />

              <Item
                title={"All Time Low"}
                value={`${currencySymbol}${coin.market_data.atl[curr]}`}
              />

              <Item
                title={"All Time High"}
                value={`${currencySymbol}${coin.market_data.ath[curr]}`}
              />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};
const Item = ({ title, value }) => (
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Roboto,sans-serif"} letterSpacing={"widest"}>
      {title}
    </Text>
    <Text>{value}</Text>
  </HStack>
);

const CustomBar = ({ high, low }) => (
  <VStack w={"full"}>
    <Progress value={40} colorScheme="cyan" w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme="red" />
      <Text fontSize={"sm"}>24 Hour Range</Text>
      <Badge children={high} colorScheme="green" />
    </HStack>
  </VStack>
);

export default CoinInfo;
