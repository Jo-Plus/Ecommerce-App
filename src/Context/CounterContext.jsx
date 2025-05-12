import { createContext, useState } from "react";

export let CounterContext = createContext(0);

export default function CounterContextProvider(props) {
  const [counter, setCounter] = useState(0);
  const [userName, setUserName] = useState('');
  
  return <CounterContext.Provider value={{setCounter, counter, userName}}>
    {props.children}
  </CounterContext.Provider>
}