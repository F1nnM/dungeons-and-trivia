import { Command } from "@colyseus/command";
import { GameRoomState } from "../GameRoomState";

export class ChooseOptionCommand extends Command<GameRoomState, {
  clientId: string,
  option: number
}> {

  validate() {
    return this.state.started && new Date().getTime() <= this.state.endTime;
  }

  execute({clientId, option} = this.payload) {
    console.log(clientId, "selected option", option);
    this.state.players.get(clientId).scoreToAdd = Math.floor((this.state.endTime - new Date().getTime())/1000);
    this.state.players.get(clientId).selectedOption = option;
  }
}