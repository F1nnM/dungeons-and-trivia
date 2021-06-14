import spellbooks from "./spells-official.json"
import charbooks from "./char-official.json"
import monsterbooks from "./bestiary-complete.json"

var spellQuestions = [];

const schools = ["illusion", "enchantment", "evocation", "divination", "transmutation", "conjuration", "necromancy", "abjuration"];
const levels = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const classes = ["Bard", "Sorcerer", "Wizard", "Warlock", "Cleric", "Artificer", "Paladin", "Artificer (Revisited)", "Ranger", "Druid"];
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
  spellQuestions.push({
    q: `Which minimum spell level has the spell "${spell.name} (${spellbook.acronym})" to be cast at?`,
    a: levels,
    correctA: spell.level
  });

  if (spell.classes)
    if (spell.classes.fromClassList) {
      let correctClasses = [];
      spell.classes.fromClassList.forEach((correctClass) => correctClasses.push(correctClass.name));

      correctClasses.forEach(cc => {
        let wrongAnswers = classes.filter(c => !correctClasses.includes(c));
        spellQuestions.push({
          q: `Which one of the following classes can cast the spell "${spell.name} (${spellbook.acronym})"?`,
          a: wrongAnswers.concat([cc]),
          correctA: wrongAnswers.length
        });
      });

    }

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
const skills = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];
const possibleWeapons = ["Simple Weapons", "Martial Weapons", "Special selection"];
const possibleSkillCount = ["Two", "Three", "Four"];
const possibleArmor = ["Light armor", "Medium armor", "Heavy armor", "None"];
charbooks.forEach(charbook => charbook.classes.forEach(playerClass => {
  classQuestions.push({
    q: `What is the hit die of the class "${playerClass.name} (${charbook.acronym})"?`,
    a: hitDice,
    correctA: hitDice.indexOf(playerClass.hd)
  });

  let correctAnswers = playerClass.proficiency.toLowerCase().split(", ");
  let possibleAnswers = skills.filter(skill => !correctAnswers.includes(skill));
  classQuestions.push({
    q: `In which of the following saving throws is the class "${playerClass.name} (${charbook.acronym})" proficient?`,
    a: possibleAnswers.concat([correctAnswers[0]]),
    correctA: possibleAnswers.length
  });
  classQuestions.push({
    q: `In which of the following saving throws is the class "${playerClass.name} (${charbook.acronym})" proficient?`,
    a: possibleAnswers.concat([correctAnswers[1]]),
    correctA: possibleAnswers.length
  });

  let weaponProfs = playerClass.startingProficiencies.split("\n")[1];
  classQuestions.push({
    q: `Which weapons does the class "${playerClass.name} (${charbook.acronym})" get proficiencies in?`,
    a: possibleWeapons,
    correctA: weaponProfs.match(/simple weapons$/gi) ? 0 : (weaponProfs.match(/simple weapons, martial weapons$/gi) ? 1 : 2)
  });

  let skillProfs = playerClass.startingProficiencies.split("\n")[4]
  classQuestions.push({
    q: `How many skill proficiencies does the class "${playerClass.name} (${charbook.acronym})" get?`,
    a: possibleSkillCount,
    correctA: skillProfs.match(/two/gi) ? 0 : (skillProfs.match(/three/gi) ? 1 : 2)
  });

  let armorProfs = playerClass.startingProficiencies.split("\n")[0]
  classQuestions.push({
    q: `Whats the strongest type of armor the class "${playerClass.name} (${charbook.acronym})" is proficient in?`,
    a: possibleArmor,
    correctA: armorProfs.match(/heavy/gi) ? 2 : armorProfs.match(/medium/gi) ? 1 : armorProfs.match(/light/gi) ? 0 : 4
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

const categories = Object.keys(questions);

questions["Random"] = [...spellQuestions, ...playerRaceQuestions, ...monsterQuestions, ...classQuestions]

export function questionProvider(category) {

  if (category === "Random")
    category = categories[Math.floor(Math.random() * categories.length)];

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