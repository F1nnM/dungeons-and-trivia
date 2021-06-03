import spellbooks from "./spells-official.json"
import charbooks from "./char-official.json"
import monsterbooks from "./bestiary-complete.json"

var spellQuestions = [];

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
}));

var playerRaceQuestions = [];

charbooks.forEach(charbook => charbook.races.forEach(race => {
    playerRaceQuestions.push({
        q: `Does the race "${race.name} (${charbook.acronym})" have darkvision?`,
        a: ["Yes", "No"],
        correctA: (race.darkvision ? 0 : 1)
    });
}));



var questions = {};
questions["Spells"] = spellQuestions;
questions["Player Races"] = playerRaceQuestions;

export default function (category) {
    let qs = questions[category];
    if (!qs)
        return {
            q: "Not implemented, sorry. Come back soon!",
            a: []
        }
    return qs[Math.floor(Math.random() * qs.length)];
}