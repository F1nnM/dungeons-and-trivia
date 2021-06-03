import './App.scss';
import { useState } from 'react';
import Basics from './components/Basics';
import Menu from './components/Menu';
import Game from './components/Game';


const gameModes = [
  "Spells",
  "Monsters",
  "Classes",
  "Player Races",
  "Random"
]

function App() {

  const [gameMode, setGameMode] = useState(null);

  if (gameMode)
    return (
      <Basics>
        <Game gameMode={gameMode} returnToHome={() => setGameMode(null)}/>
      </Basics>
    )

  return (
    <Basics>
      <Menu setGameMode={(mode) => setGameMode(mode)} gameModes={gameModes}/>
    </Basics>
  );
}

export default App;
