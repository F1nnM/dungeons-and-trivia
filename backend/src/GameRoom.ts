import { Dispatcher } from "@colyseus/command";
import { Room, Client } from "colyseus";
import { ChooseOptionCommand } from "./commands/ChooseOptionCommand";
import { NewQuestionCommand } from "./commands/NewQuestionCommand";
import { StartGameCommand } from "./commands/StartGameCommand";
import { GameRoomState, PlayerState } from "./GameRoomState";

export class GameRoom extends Room<GameRoomState> {

  dispatcher = new Dispatcher(this);

  onCreate(options: any) {
    this.setState(new GameRoomState());
    this.setPrivate(true);

    this.state.category = options.category;

    this.onMessage("choose", (client, message) => {
      this.dispatcher.dispatch(new ChooseOptionCommand(), {clientId: client.id, option: message.option})
    });
    this.onMessage("start", (client) => {
      this.dispatcher.dispatch(new StartGameCommand(), { clientId: client.id });
    });
    this.onMessage("next", (client) => {
      this.dispatcher.dispatch(new NewQuestionCommand(), { clientId: client.id });
    });

  }

  onJoin(client: Client, options: any) {
    if(this.state.players.size === 0)
      this.state.creator = client.id;
    let player = new PlayerState();
    player.id = client.id;
    player.name = options.name;
    player.score = 0;
    this.state.players.set(player.id, player);
    console.log(`${client.sessionId} joined room ${this.roomId} as ${options.name}`);
  }

  onLeave(client: Client, consented: boolean) {
    console.log(`${client.sessionId} left room ${this.roomId}`);
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
