import React from "react";
import { Heading, VStack } from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
const GotError = () => {
  return (
    <Alert
      status="error"
      pos={"fixed"}
      m={"5"}
      top={"10"}
      bottom={"10"}
      alignContent={"center"}
      bgColor={"blackAlpha.300"}
      color={"whiteAlpha.900"}
    >
      <AlertIcon />
      <AlertTitle>
        <Heading display={"flex"}>Couldn't Fetch Details</Heading>
      </AlertTitle>

      <VStack dir="column" p={"10"}>
        <AlertDescription>Please Try Again</AlertDescription>
      </VStack>
    </Alert>
  );
};

export default GotError;
