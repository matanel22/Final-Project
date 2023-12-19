import React from "react";
import styled from "styled-components";

interface HoverTextProps {
  dataTooltip: string[];
}

const HoverTextContainer = styled.span`
  position: relative;

  &:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: #fff;
    padding: 0.5rem;
    border-radius: 4px;
    display: block;
    z-index: 1;
  }
`;

export const HoverText: React.FC<HoverTextProps> = ({ dataTooltip }) => {
  const formattedTooltip = dataTooltip.join("\n");

  return <HoverTextContainer data-tooltip={formattedTooltip} />;
};
