import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useRecoilState } from "recoil";
import { allUsers } from "../atom/Atom";
import styled from "styled-components";
interface IProps {
  staff: string[];
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}
const AnimatedMulti = ({ selectedItems, setSelectedItems, staff }: IProps) => {
  const [listUsers, setListUsers] = useRecoilState(allUsers);
  const listOptions = listUsers.map((item) => ({
    label: item.name,
    value: item.name,
  }));

  const animatedComponents = makeAnimated();
  useEffect(() => {
    const matchingItems = staff
      ? listUsers
          .filter((item1) => staff.some((item2) => item2 === item1._id))
          .map((matchingItem) => matchingItem.name)
      : [];

    setSelectedItems((prev) => [...prev, ...matchingItems]);
  }, [listOptions]);
  return (
    <WarrperSelect>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={listOptions}
        value={listOptions.filter((opt) => selectedItems.includes(opt.value))}
        onChange={(selectedOptions) => {
          console.log(selectedOptions);
          const l = listOptions.map((opt) => opt.value);

          setSelectedItems(selectedOptions.map((opt) => opt.value));
        }}
      />
    </WarrperSelect>
  );
};

export default AnimatedMulti;
const WarrperSelect = styled.div`
  width: 100%;
`;
