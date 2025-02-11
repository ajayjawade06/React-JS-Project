import styled from 'styled-components';

export const Button = styled.button`
    padding: 10px 18px;
    background-color: black;
    color: white;
    border-radius: 5px;
    min-width: 220px;
    border: none;
    font-size: 16px;
    border: 1px solid black;
    transition: 0.4s background ease-in;
    cursor: pointer;

    &:hover {
        background-color: white;
        border: 1px solid black;
        color: black;
        transition: 0.3s background ease-in;
    }

    @media (max-width: 768px) {
        min-width: 180px;
        font-size: 14px;
        padding: 8px 16px;
    }

    @media (max-width: 480px) {
        min-width: 140px;
        font-size: 12px;
        padding: 6px 12px;
    }
`;

export const OutlineButton = styled(Button)`
    background-color: white;
    border: 1px solid black;
    color: black;

    &:hover {
        background-color: black;
        border: 1px solid transparent;
        color: white;
        transition: 0.3s background ease-in;
    }
`;
