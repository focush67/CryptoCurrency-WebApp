import React from "react";
import { Image } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import img from "./home.png";
const Home = () => {
  return (
    <Box bgColor={"blackAlpha.900"} w={"full"} h={"90vh"}>
      <Image src={img} w={"full"} h={"full"} objectFit={"contain"} />

      <Text
        fontSize={"6xl"}
        textAlign={"center"}
        fontWeight={"bold"}
        color={"white"}
        marginTop={"-20"}
      >
        CRYPTIC
      </Text>
    </Box>
  );
};

export default Home;
