import styled from "styled-components";

// eslint-disable-next-line react/prop-types
const NumberSelector = ({ error, setError, selectedNumber, setSelectedNumber }) => {

  const numberSelecterHandler = (value) => {
    setSelectedNumber(value);
    setError("");
  }

  const arrNumber = [1, 2, 3, 4, 5, 6];

  return (
    <NumberSelectorContainer>
      <p className="error">{error}</p>
      <div className="flex">
        {arrNumber.map((value, i) => (
          <Box
            isSelected={value === selectedNumber}
            key={i}
            onClick={() => numberSelecterHandler(value)}
          >
            {value}
          </Box>
        ))}
      </div>
      <p>Select Number</p>
    </NumberSelectorContainer>
  );
};

export default NumberSelector;

const NumberSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 0 auto;

  .error {
    font-size: 20px;
    color: red;
    margin-bottom: 8px;
  }

  .flex {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 16px;
  }

  p {
    font-size: 22px;
    font-weight: 700;
    margin-top: 10px;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .flex {
      gap: 12px;
    }

    p {
      font-size: 20px;
    }
  }

  @media (max-width: 480px) {
    .flex {
      gap: 8px;
    }

    p {
      font-size: 18px;
    }
  }
`;

const Box = styled.div`
  width: 72px;
  height: 72px;
  border: 1px solid black;
  display: grid;
  place-items: center;
  font-size: 24px;
  font-weight: 700;
  cursor: pointer;
  background-color: ${({ isSelected }) => isSelected ? "black" : "white"};
  color: ${({ isSelected }) => isSelected ? "white" : "black"};

  /* Responsive size */
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    font-size: 20px;
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    font-size: 18px;
  }
`;
