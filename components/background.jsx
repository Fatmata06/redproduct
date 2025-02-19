import styled from "styled-components";

const BContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #494C4F;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("/images/before.png");
    background-size: cover;
    background-position: center;
    opacity: 1; /* Ajuste l'opacité de l'image */
    z-index: -1; /* Place l'image en arrière-plan */
  }
`;

export default BContainer;