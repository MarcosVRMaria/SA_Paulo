import "./index.css";
import { useState, useEffect } from "react";
const BigButton = (onClick, {text}) => {
  const [buttonText, setButtonText] = useState("");
  useEffect(() => {}, [buttonText]);
  return <button onClick={onClick}>{text}</button>;
};

export default BigButton;
