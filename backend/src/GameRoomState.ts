import { Schema, Context, type, MapSchema, ArraySchema, filter } from "@colyseus/schema";
import { Client } from "colyseus";

export class PlayerState extends Schema {

  id: string;

  @type("string")
  name: string;

  @type("number")
  score: number;

  @type("number")
  scoreToAdd: number;

  @filter(function (this: PlayerState, client: Client, value: PlayerState['selectedOption'], root: Schema) {
    return client.sessionId === this.id
  })
  @type("number")
  selectedOption: number;
}


export class GameRoomState extends Schema {

  @type("number")
  endTime: number;

  @type("boolean")
  started: boolean = false;

  @type("string")
  creator: string;

  @type({ map: PlayerState })
  players = new MapSchema<PlayerState>();

  @type("string")
  category: string;

  @type("string")
  question: string;

  @type(["string"])
  options = new ArraySchema<string>();

  correctAnswerIndexHidden: number;

  @type("number")
  correctAnswerIndex: number;

  showCorrectAnswer: boolean = false;

}
