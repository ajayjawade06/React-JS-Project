import styled from "styled-components";

// eslint-disable-next-line react/prop-types
const TotalScore = ({ score }) => {
  return (
    <ScoreContainer>
      <h1>{score}</h1>
      <p>Total Score</p>
    </ScoreContainer>
  );
};

export default TotalScore;

const ScoreContainer = styled.div`
  max-width: 200px;
  text-align: center;

  h1 {
    font-size: 100px;
    line-height: 100px;
  }

  p {
    font-size: 24px;
    font-weight: 500;
  }

  /* Responsive design */
  @media (max-width: 768px) {
    h1 {
      font-size: 70px;
      line-height: 70px;
    }

    p {
      font-size: 20px;
    }
  }

  @media (max-width: 480px) {
    max-width: 150px;

    h1 {
      font-size: 50px;
      line-height: 50px;
    }

    p {
      font-size: 18px;
    }
  }
`;
