import { FC } from "react";
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";

const AccessPage: FC = () => {
  const location = useLocation();

  return <AccessPageWrapper>{location.pathname}</AccessPageWrapper>;
};

const AccessPageWrapper = styled.div`
  background: lime;
  width: 100%;
  height: 100vh;
`;

export default AccessPage;
