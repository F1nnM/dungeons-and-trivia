import { Command } from "@colyseus/command";
import { questionProvider } from "@dnt/question-provider";
import { GameRoomState } from "../GameRoomState";
import { FinishRoundCommand } from "./FinishRoundCommand";

export class NewQuestionCommand extends Command<GameRoomState, {
  clientId: string
}> {

  validate({ clientId } = this.payload) {
    return !clientId || this.state.creator == clientId;
  }

  execute() {
    this.state.correctAnswerIndex = null;
    this.state.players.forEach((player) => {
      player.selectedOption = null;
    })
    let questionData = questionProvider(this.state.category);
    this.state.question = questionData.q;
    this.state.options = questionData.a;
    this.state.correctAnswerIndexHidden = questionData.correctA;
    this.state.endTime = new Date().getTime() + 10_000;
    return [new FinishRoundCommand().setPayload({ timeout: 10_000 })]
  }
}