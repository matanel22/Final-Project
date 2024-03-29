// SearchBar.tsx
import React, { useState } from "react";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { searchPro } from "../atom/Atom";
const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50vw;
`;

const SearchInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  font-size: 16px;
  margin-top: 1rem;
  margin-bottom: 10px;
  width: 30%;
  &:focus {
    border-color: #007bff; /* Change the border color on focus */
  }
`;

const SearchButton = styled.button`
  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  width: 50vw;
  &:hover {
    background-color: #0056b3; /* Darker color on hover */
  }
`;

const SearchBar: React.FC = () => {
  const filteredNames = useSetRecoilState(searchPro);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);
    filteredNames(event.target.value);
  };
  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder=" חיפוש לפי שם , מספר פרוייקט , סטטוס"
        // value={filteredNames}
        onChange={handleInputChange}
      />
      {/* <SearchButton>חיפוש</SearchButton> */}
    </SearchContainer>
  );
};

export default SearchBar;
