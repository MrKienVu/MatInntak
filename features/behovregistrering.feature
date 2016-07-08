# language: no
Egenskap: Dagsbehov
For at pasienter spesielt, og sykepleiere generelt skal få en oversikt over oppnådd dagsinntak må det registreres et daglig behov

Scenario: Antropometri
Gitt at "Registrer behov" er valgt fra startsiden
Og at skjermbildet "Registrer behov" vises
Og tallfeltene fylles ut med:
  | Høyde         | 1.7         |
  | Vekt          | 60          |
Så vises de beregnede verdiene:
  | KMI           | 20.76       |
  | Energi        | 1800        |
  | Protein       | 60          |
  | Væske         | 1800        |
Og knappen "Registrer" trykkes på
# Så skal skjermbildet Matregistrering vises
