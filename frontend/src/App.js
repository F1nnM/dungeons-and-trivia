import './App.scss';
import { useState } from 'react';
import Basics from './components/Basics';
import Menu from './components/Menu';
import SinglePlayer from './components/SinglePlayer';
import MultiPlayer from './components/MultiPlayer';

const gameModes = [
  "Single player (offline)",
  "Multiplayer (online)"
]

function App() {

  const homeState = { step: "main", questionType: null }

  const [state, setState] = useState(homeState);

  let content = <>How did you end up here? This page doesn't exist. Please reload.</>;
  let backButton = () => setState(homeState);

  if (state.step === "main") {
    content = <Menu onSelect={(index) => setState({ ...state, step: gameModes[index] })} options={gameModes} />
    backButton = null;
  } else
    if (state.step === gameModes[0])
      content = <SinglePlayer category={state.questionType} />
    else if (state.step === gameModes[1])
      content = <MultiPlayer category={state.questionType} />


  return (
    <Basics backButton={backButton}>
      {content}
    </Basics>
  );
}

export default App;
