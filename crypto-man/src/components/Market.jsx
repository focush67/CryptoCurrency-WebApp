import React, { useEffect, useState } from "react";
import axios from "axios";
import { HStack, VStack } from "@chakra-ui/react";
import { server } from "../index";
import { Text, Container, Heading } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import Loader from "./Loader";
import GotError from "./GotError.jsx";
const Market = () => {
  const [loading, setLoading] = useState(true);
  const [exchanges, setExchanges] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchMarket = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchMarket();
  }, []);

  if (error) return <GotError />;

  return (
    <Container maxW={"100vw"} bgColor={"blackAlpha.800"} color={"white"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {exchanges.map((i) => (
              <ExchangeCard
                key={i.id}
                name={i.name}
                img={i.image}
                rank={i.trust_score_rank}
                url={i.url}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

const ExchangeCard = ({ name, img, rank, url }) => (
  <a href={url} target="blank">
    <VStack
      bgColor={'whiteAlpha.100'}
      w={"52"}
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
        {rank}
      </Heading>
      <Text noOfLines={1}>{name}</Text>
    </VStack>
  </a>
);

export default Market;
