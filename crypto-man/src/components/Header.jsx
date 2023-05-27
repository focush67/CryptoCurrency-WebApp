import React from "react";
import { HStack } from "@chakra-ui/react";
import {Button} from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import SearchBar from "./SearchBar";
import { useState } from "react";
const Header = () => {

    const [isHovered , setIsHovered] = useState(true);

    const[isHovered2,setIsHovered2] = useState(true);

    const[isHovered3,setIsHovered3] = useState(true);


  return (
    <div>
      <HStack
        p={"4"}
        shadow={"base"}
        bgColor={"blackAlpha.900"}
        display={"flex"}
        justifyContent={"space-around"}
      >
        <Button variant={"outline"}
        display={['none','flex']}
        color = {isHovered ? 'white' : 'black'}
        bgColor = {isHovered ? 'blackAlpha.900' : 'white'}
        onMouseEnter = {() => setIsHovered(false)}
        onMouseLeave = {() => setIsHovered(true)}
        >
          <Link to="/">
            <Text
              fontSize={"20"}
              fontWeight={"bold"}
              border={'none'}
            >
              Home
            </Text>
          </Link>
        </Button>

        <Button variant={"outline"} 
        display={['none','flex']}
        color = {isHovered2 ? 'white' : 'blackAlpha.900'}
        bgColor = {isHovered2 ? 'blackAlpha.900' : 'white'}
        onMouseEnter = {() => setIsHovered2(false)}
        onMouseLeave = {() => setIsHovered2(true)}
        >
          <Link to="/market">
            <Text
              fontSize={"20"}
              fontWeight={"bold"}
            >
              Market
            </Text>
          </Link>
        </Button>

        <Button variant={"outline"}
        display={['none','flex']}
        color = {isHovered3 ? 'white' : 'blackAlpha.900'}
        bgColor = {isHovered3 ? 'blackAlpha.900' : 'white'}
        onMouseEnter = {() => setIsHovered3(false)}
        onMouseLeave = {() => setIsHovered3(true)}
        >
          <Link to="/coins">
            <Text
              fontSize={"20"}
              fontWeight={"bold"}
            >
              Coins
            </Text>
          </Link>
        </Button>

        <SearchBar
         />
      </HStack>
    </div>
  );
};



export default Header;
