import NumberSelector from "./NumberSelector";
import RollDice from "./RollDice";
import TotalScore from "./TotalScore";
import styled from "styled-components";
import { useState } from "react";
import { Button, OutlineButton } from "../styled/Button";
import Rule from "./Rule";

const GamePlay = () => {
  const [selectedNumber, setSelectedNumber] = useState();
  const [currentDice, setCurrentDice] = useState(1);
  const [score, setScore] = useState(0);
  const [error, setError] = useState(null);
  const [showRule, setShowRule] = useState(false);

  const genearateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const rollDice = () => {
    if (!selectedNumber) {
      setError("You have not selected any number");
      return;
    }
    setError(null);
    const randomNumber = genearateRandomNumber(1, 7);
    // eslint-disable-next-line no-unused-vars
    setCurrentDice((prev) => randomNumber);

    if (selectedNumber === randomNumber) {
      setScore((prev) => prev + selectedNumber);
    } else {
      setScore((prev) => prev - 2);
    }

    setSelectedNumber(null);
  };

  const resetScore = () => {
    setScore(0);
  };

  return (
    <MainContainer>
      <div className="top_section">
        <TotalScore score={score} />
        <NumberSelector
          error={error}
          setError={setError}
          selectedNumber={selectedNumber}
          setSelectedNumber={setSelectedNumber}
        />
      </div>
      <RollDice currentDice={currentDice} rollDice={rollDice} />
      <div className="btn">
        <OutlineButton onClick={resetScore}>Reset Score</OutlineButton>
        <Button onClick={() => setShowRule((prev) => !prev)}>
          {showRule ? "Hide " : "Show "}Rules
        </Button>
      </div>
      {showRule && <Rule />}
    </MainContainer>
  );
};

export default GamePlay;

const MainContainer = styled.div`
  padding-top: 70px;

  .top_section {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap; 
    gap: 20px;
  }

  .btn {
    gap: 10px;
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .top_section {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .btn {
      margin-top: 30px;
      width: 100%;
      gap: 12px;
    }

    /* Adjust button sizes */
    button {
      width: 100%;
      padding: 12px;
      font-size: 18px;
    }
  }

  @media (max-width: 480px) {
    padding-top: 50px;

    .top_section {
      gap: 10px;
    }

    .btn {
      margin-top: 20px;
    }

    button {
      padding: 10px;
      font-size: 16px;
    }
  }
`;
