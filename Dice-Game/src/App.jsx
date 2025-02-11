import { useState } from 'react';
import StartGame from './components/StartGame';
import GamePlay from './components/GamePlay';
import { Analytics } from "@vercel/analytics/react"

function App() {

  const [isGameStarted,setIsGameStarted] = useState(false);

  const toggleGamePlay = () => {
    setIsGameStarted((prev) => !prev);
  }

  return (
    <>
    {isGameStarted ? <GamePlay/> : <StartGame toggle = {toggleGamePlay}/>}
      <Analytics/>
    </>
  )
}

export default App

