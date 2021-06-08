import { questionCategories } from "@dnt/question-provider";
import * as Colyseus from "colyseus.js";
import { MDBContainer, MDBInput } from "mdbreact";
import { useEffect, useState } from "react";
import Game from "./Game";
import Menu from "./Menu";
import styles from "./MultiPlayer.module.scss"

export default function MultiPlayer() {

  const [client, setClient] = useState(null);
  const [room, setRoom] = useState(null);
  useEffect(() => {
    setClient(new Colyseus.Client(process.env.REACT_APP_BACKEND));
    return () => {
      if (room) {
        room.leave();
        room.removeAllListeners();
      }
    }
  }, [room])
  const [gameState, setGameState] = useState({});

  const [name, setName] = useState({ name: "", submitted: false });

  const modeOptions = ["new", "join"];
  const [mode, setMode] = useState(null);

  const [joinCode, setJoinCode] = useState("")

  function handleCategorySelect(index) {
    client.create("game", { category: questionCategories[index], name: name.name }).then(room => {
      setRoom(room);
      room.onStateChange((state) => setGameState({ ...state }));
    });
  }

  function handleJoin() {
    client.joinById(joinCode, {name: name.name}).then(room => {
      setRoom(room);
      room.onStateChange((state) => setGameState({ ...state }));
    });
  }

  if (!name.submitted)
    return (
      <MDBContainer>
        <MDBInput className={styles.textbox} label="Your name" onBlur={(e) => setName({ ...name, name: e.target.value })} size="lg" />
        <div className="button" onClick={() => setName({ ...name, submitted: true })}>Ok</div>
      </MDBContainer>
    );

  if (!mode)
    return <Menu options={modeOptions} onSelect={(index) => setMode(modeOptions[index])} />

  if (mode === "join" && !room)
    return (
      <MDBContainer>
        <MDBInput className={styles.textbox} label="Room code" onBlur={(e) => setJoinCode(e.target.value)} size="lg" />
        <div className="button" onClick={handleJoin}>Join</div>
      </MDBContainer>
    );
  else if (mode === "new" && !room)
    return (
      <Menu options={questionCategories} onSelect={handleCategorySelect} />
    );

  if (!gameState.started)
    if (joinCode)
      return (
        <MDBContainer>
          The creator hasn't started the game yet.
        </MDBContainer>
      );
    else
      if (room)
        return (
          <MDBContainer>
            <div className="my-4 text-center">Invite others with this code (case-sensitive): <b>{room.id}</b></div>
            <div className="button" onClick={() => room.send("start")}>Start the game</div>
          </MDBContainer>
        );
      else
        return <></>


  let players = [];
  gameState.players.forEach(player => players.push(player))
  return (
    <>
      <MDBContainer>
        <div className={`${styles.scoreboard} pt-3`}>
          {players.map((player) => `${player.name}: ${player.score}   `)}
        </div>
      </MDBContainer>
      <Game
        question={gameState.question}
        answers={gameState.options}
        correctAnswer={gameState.correctAnswerIndex}
        chosenAnswer={gameState.players.get(room.sessionId).selectedOption}
        selectAnswer={(index) => room.send("choose", { option: index })}
        nextQuestion={!joinCode ? () => room.send("next") : null} />
    </>
  );
}