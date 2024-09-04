import styled from "styled-components";

export const StyledMapContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  height: 100%;
  padding: 20px;

  @media (max-width: 600px) {
    padding: 0;
  }
`;
