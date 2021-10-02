import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 150 50" {...props}>
      <image width="150" height="50" href="/images/egg/LogoTextNewDark.png"/>
    </Svg>
  );
};

export default Icon;
