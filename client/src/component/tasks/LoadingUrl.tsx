import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const LoadingAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10vh;
`;

const Spinner = styled.div`
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${LoadingAnimation} 2s linear infinite;
`;

type Props = {
  children: React.ReactNode;
};

const LoadingUrl: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingWrapper>
          <Spinner />
        </LoadingWrapper>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default LoadingUrl;
