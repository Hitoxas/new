// Reikalavimai:
// Paprašykite vartotojo įvesti du skaičius: skaitiklį ir vardiklį.

// Naudodami try bloką, bandykite padalyti skaitiklį iš vardiklio.

// Jeigu vartotojas bando dalinti iš nulio, catch blokas turi pagauti šią klaidą ir išvesti žinutę: „Klaida: negalima dalinti iš nulio!“

// Jei dalyba sėkminga, išveskite rezultatą.


let skaitiklis = parseFloat(prompt("Įveskite skaitiklį:"));
let vardiklis = parseFloat(prompt("Įveskite vardiklį:"));
let rezultatas;
try {
    if (vardiklis === 0) {
        throw new Error("Negalima dalinti iš nulio!");
    }
    rezultatas = skaitiklis / vardiklis;
}catch (klaida) {
    console.error("Klaida: " + klaida.message);
}
finally {
    if (rezultatas !== undefined) {
        console.log("Rezultatas: " + rezultatas);
    } else {
        console.log("Dalyba nepavyko.");
    }
}
