import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useRecoilState } from "recoil";
import { allUsers } from "../atom/Atom";
interface IProps {
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}
const AnimatedMulti = ({ selectedItems, setSelectedItems }: IProps) => {
  const [listUsers, setListUsers] = useRecoilState(allUsers);

  const listOptions = listUsers.map((item) => ({
    label: item.name,
    value: item.name,
  }));

  const animatedComponents = makeAnimated();

  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={listOptions}
      value={listOptions.filter((opt) => selectedItems.includes(opt.value))}
      onChange={(selectedOptions) => {
        setSelectedItems(selectedOptions.map((opt) => opt.value));
      }}
    />
  );
};

export default AnimatedMulti;
