import styled from "styled-components";

// eslint-disable-next-line react/prop-types
const RollDice = ({ currentDice, rollDice }) => {
  return (
    <DiceContainer>
      <div className="dice" onClick={rollDice}>
        <img src={`/images/Dice/dice_${currentDice}.png`} alt="dice" />
      </div>
      <p>Click on Dice to roll the dice</p>
    </DiceContainer>
  );
};

export default RollDice;

const DiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;

  .dice {
    cursor: pointer;
    img {
      width: 150px; 
      height: auto;
      transition: transform 0.2s ease-in-out;

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  p {
    font-size: 24px;
    margin-top: 16px;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .dice img {
      width: 120px;
    }

    p {
      font-size: 20px;
    }
  }

  @media (max-width: 480px) {
    .dice img {
      width: 100px;
    }

    p {
      font-size: 16px;
    }
  }
`;
