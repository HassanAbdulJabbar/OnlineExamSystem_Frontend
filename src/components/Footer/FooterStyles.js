import styled from "styled-components";

export const Box = styled.div`
  padding: 2% 0.5%;
  background: black;
  font-family: "Inter", sans-serif;
  //   position: absolute;
  bottom: 0;
  width: 100%;

  @media (max-width: 1000px) {
    // padding: 70px 30px;
  }
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  max-width: 1000px;
  margin: 0 auto;
  //   background: red;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
  grid-gap: 20px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

export const FooterLink = styled.a`
  color: #fff;
  margin-bottom: 20px;
  font-size: 18px;
  text-decoration: none;

  &:hover {
    color: lightgreen;
    text-underline: 5px;
    transition: 1000ms ease-in;
  }
`;

export const Heading = styled.p`
  padding-bottom: 0px;
  font-size: 24px;
  color: #fff;
  margin-bottom: 40px;
  font-weight: bold;
`;
