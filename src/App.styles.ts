import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 100%;
  height: 80vh;
  padding: 20px 0;

  @media (max-width: 600px) {
    height: 100vh;
    padding-bottom: 0;
  }
`;

export const StyledTitle = styled.h1``;
