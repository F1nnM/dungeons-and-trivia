import spellbooks from "./spells-official.json"
import charbooks from "./char-official.json"
import monsterbooks from "./bestiary-complete.json"

var spellQuestions = [];
const schools = ["illusion", "enchantment", "evocation", "divination", "transmutation", "conjuration", "necromancy", "abjuration"]
spellbooks.forEach(spellbook => spellbook.spells.forEach(spell => {
  spellQuestions.push({
    q: `Do you need to maintain concentration on the spell "${spell.name} (${spellbook.acronym})"?`,
    a: ["Yes", "No"],
    correctA: (spell.duration.concentration ? 0 : 1)
  })
  spellQuestions.push({
    q: `Does the spell "${spell.name} (${spellbook.acronym})" require costly components?`,
    a: ["Yes", "No"],
    correctA: (spell.components.m && spell.components.m.cost ? 0 : 1)
  });
  spellQuestions.push({
    q: `Which school of magic does the spell "${spell.name} (${spellbook.acronym})" belong to?`,
    a: schools,
    correctA: schools.indexOf(spell.school)
  });
}));

var playerRaceQuestions = [];

charbooks.forEach(charbook => charbook.races.forEach(race => {
  playerRaceQuestions.push({
    q: `Does the race "${race.name} (${charbook.acronym})" have darkvision?`,
    a: ["Yes", "No"],
    correctA: (race.darkvision ? 0 : 1)
  });
}));


var classQuestions = [];

const hitDice = ["d4", "d6", "d8", "d10", "d12"];
charbooks.forEach(charbook => charbook.classes.forEach(playerClass => {
  classQuestions.push({
    q: `What is the hit die of the class "${playerClass.name} (${charbook.acronym})"?`,
    a: hitDice,
    correctA: hitDice.indexOf(playerClass.hd)
  });
}));


var monsterQuestions = [];
let monsterTypes = ["monstrosity", "aberration", "construct", "humanoid", "fiend", "undead", "beast", "celestial", "dragon", "fey", "plant", "elemental", "giant", "ooze"]
monsterbooks.forEach(monsterbook => monsterbook.monster.forEach(monster => {
  if (!monster.isNpc && monster.type)
    monsterQuestions.push({
      q: `What type of creature is the "${monster.name} (${monsterbook.acronym})"?`,
      a: monsterTypes,
      correctA: monsterTypes.indexOf(monster.type.type || monster.type)
    });
}));



var questions = {};
questions["Spells"] = spellQuestions;
questions["Player Races"] = playerRaceQuestions;
questions["Monsters"] = monsterQuestions;
questions["Classes"] = classQuestions;

questions["Random"] = [...spellQuestions, ...playerRaceQuestions, ...monsterQuestions, ...classQuestions]

export function questionProvider(category) {
  let qs = questions[category];
  if (!qs)
    return {
      q: "Not implemented, sorry. Come back soon!",
      a: []
    }


    let q = qs[Math.floor(Math.random() * qs.length)];
    if (q.a.length > 4) {
      let answers = [];
      let allAnswersClone = [...q.a];
      let correctAnswerIndex = Math.floor(Math.random() * 4);
      let correctAnswer = allAnswersClone.splice(q.correctA, 1)[0]
      let i;
      for (i = 0; i < correctAnswerIndex; i++) {
        answers.push(allAnswersClone.splice(Math.floor(Math.random() * allAnswersClone.length), 1)[0]);
      }
      answers[i] = correctAnswer;
      for (i++; i < 4; i++) {
        answers.push(allAnswersClone.splice(Math.floor(Math.random() * allAnswersClone.length), 1)[0]);
      }
      q.a = answers;
      q.correctA = correctAnswerIndex;
    }

  return q;
}

export const questionCategories = Object.keys(questions);