import { Command } from "@colyseus/command";
import { GameRoomState } from "../GameRoomState";
import { NewQuestionCommand } from "./NewQuestionCommand";

export class StartGameCommand extends Command<GameRoomState, {clientId: string}> {

  validate({clientId} = this.payload){
    return clientId === this.state.creator && !this.state.started;
  }

  execute({clientId} = this.payload) {
    this.state.started = true;
    return [new NewQuestionCommand().setPayload({clientId: null})];
  }
}