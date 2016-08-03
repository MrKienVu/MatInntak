# language: no
@middag
Egenskap: Middag
For at sykepleiere og pasienter skal kunne registrere væskeinntak må de ha mulighet
til å velge mellom underkategoriene.

Scenario: Drikkeprodukter
  Gitt at "Middag" er valgt fra hovedmenyen
  Og retten "Kjøttkaker" er valgt
  Og mengde "Halvt" er valgt
  Når knappen "Registrer" trykkes på
  Så skal skjermbildet "Dagens inntak" vises
