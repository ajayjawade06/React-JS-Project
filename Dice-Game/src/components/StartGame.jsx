/* eslint-disable react/prop-types */
import styled from "styled-components";
import { Button } from "../styled/Button";

const StartGame = ({ toggle }) => {
  return (
    <Container>
      <div className="image-container">
        <img src="/images/dice.png" alt="Dice" />
      </div>
      <div className="content">
        <h1>DICE GAME</h1>
        <Button onClick={toggle}>Play Now</Button>
      </div>
    </Container>
  );
};

export default StartGame;

const Container = styled.div`
  max-width: 1180px;
  height: 100vh;
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  .image-container {
    flex: 1;
    display: flex;
    justify-content: center;

    img {
      max-width: 80%;
      height: auto;
    }
  }

  .content {
    flex: 1;
    text-align: right;

    h1 {
      font-size: 64px;
      font-weight: bold;
    }

    button {
      background-color: black;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 18px;
      cursor: pointer;
      transition: 0.3s;

      &:hover {
        background-color: #333;
      }
    }
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    .content h1 {
      font-size: 50px;
    }

    .content button {
      font-size: 16px;
      padding: 10px 20px;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;

    .image-container {
      order: 1;
      margin-bottom: 20px;
    }

    .content {
      order: 2;
      text-align: center;

      h1 {
        font-size: 40px;
      }

      button {
        font-size: 16px;
        padding: 10px 18px;
      }
    }
  }

  @media (max-width: 480px) {
    .content h1 {
      font-size: 32px;
    }

    .content button {
      font-size: 14px;
      padding: 8px 16px;
    }
  }
`;
