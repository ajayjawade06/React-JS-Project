import styled from "styled-components";

const Rule = () => {
  return (
    <RulesContainer>
      <h2>How to play dice game</h2>
      <div className="text">
        <p>Select any number</p>
        <p>Click on the dice image</p>
        <p>
          After clicking on the dice, if the selected number is the same as the number on the dice, then you
          will get the same points as on the dice.
        </p> 
        <p>If your guess is wrong, then 2 points will be deducted.</p> 
      </div>
    </RulesContainer>
  );
};

export default Rule;

const RulesContainer = styled.div`
  background-color: #fbf1f1;
  padding: 20px;
  max-width: 800px;
  margin: 50px auto 20px auto;
  border-radius: 10px;
  text-align: center;

  h2 {
    font-size: 24px;
  }

  .text {
    margin-top: 24px;
    text-align: left;
    font-size: 18px;
    line-height: 1.5;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    max-width: 90%;
    padding: 16px;

    h2 {
      font-size: 20px;
    }

    .text {
      font-size: 16px;
    }
  }

  @media (max-width: 480px) {
    max-width: 95%;
    padding: 12px;

    h2 {
      font-size: 18px;
    }

    .text {
      font-size: 14px;
    }
  }
`;
