// src/components/Button.js
import styled from 'styled-components';

const Button = styled.button`
  background-color: #FF5733;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #C70039;
  }
`;

export default Button;
