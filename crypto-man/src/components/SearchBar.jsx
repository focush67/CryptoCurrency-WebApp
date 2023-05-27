import React from "react";
import CoinData from "./Data.json";
import { Input } from "@chakra-ui/react";
import { useState } from "react";
import "./SearchBar.css";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  function handleSuggestionClick(coinId) {
    setSearchInput("");
    setShowSuggestions(false);
    window.location.href = `/coin/${coinId}`;
  }

  function getSearchResults() {
    const regex = new RegExp(searchInput, "gi");
    return CoinData.filter((data) => {
      return data.name.match(regex) || data.id.match(regex);
    });
  }

  function handleSearchInputChange(event) {
    setSearchInput(event.target.value);
    setShowSuggestions(event.target.value !== "");
  }

  return (
    <>
      <div className="search-container">
        <Input
          type="text"
          value={searchInput}
          width={"50"}
          textAlign={"center"}
          color={"white"}
          bgColor={"blackAlpha.600"}
          position={"relative"}
          marginTop={"0"}
          right={['0px','45px']}
          display={"flex"}
          justifyContent={["center","flex-end"]}
          alignContent={"center"}
          onChange={handleSearchInputChange}
          placeholder="Search Here"
        />
        <span className="searchIcon">
        <SearchIcon
         onClick = {handleSearchInputChange}
         color={"white"}
        
      />
        </span>
        
        {showSuggestions && (
          <div className="suggestion-container">
            <ul>
              {getSearchResults().map((coin) => (
                <li
                  key={coin.id}
                  onClick={() => handleSuggestionClick(coin.id)}
                >
                  <Link to={`/coin/${coin.id}`}>
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      
      
    </>
  );
};

export default SearchBar;
