import "./index.css";
import { useState, useEffect } from "react";
const BigButton = ({onClick, text}) => {
  return <button className='button' onClick={onClick}>{text}</button>;
};

export default BigButton;
