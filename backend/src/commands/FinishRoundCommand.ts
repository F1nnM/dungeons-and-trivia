import { Command } from "@colyseus/command";
import { GameRoomState } from "../GameRoomState";
import { NewQuestionCommand } from "./NewQuestionCommand";

export class FinishRoundCommand extends Command<GameRoomState, {
  timeout: number
}> {

  async execute({ timeout } = this.payload) {
    this.clock.setTimeout(() => {
      console.log("Executed")
      this.state.correctAnswerIndex = this.state.correctAnswerIndexHidden;
      this.state.players.forEach((player) => {
        console.log("Player selected", player.selectedOption, ", correct was", this.state.correctAnswerIndex)
        if (player.selectedOption === this.state.correctAnswerIndex)
          player.score+=player.scoreToAdd;
        player.scoreToAdd = 0;
      });
    }, timeout);
  }
}