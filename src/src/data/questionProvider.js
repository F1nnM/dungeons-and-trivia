import spellbooks from "./spells-official.json"
import charbooks from "./char-official.json"
import monsterbooks from "./bestiary-complete.json"

var spellQuestions = [];
const schools = ["illusion","enchantment","evocation","divination","transmutation","conjuration","necromancy","abjuration"]
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

var monsterQuestions = [];
let monsterTypes = ["monstrosity","aberration","construct","humanoid","fiend","undead","beast","celestial","dragon","fey","plant","elemental","giant","ooze"]
monsterbooks.forEach( monsterbook => monsterbook.monster.forEach(monster => {
    if(!monster.isNpc && monster.type)
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

questions["Random"] = [...spellQuestions, ...playerRaceQuestions, ...monsterQuestions]

export default function questionProvider(category) {
    let qs = questions[category];
    if (!qs)
        return {
            q: "Not implemented, sorry. Come back soon!",
            a: []
        }
    return qs[Math.floor(Math.random() * qs.length)];
}