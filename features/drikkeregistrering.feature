# language: no
@drikke
Egenskap: Drikke
For at sykepleiere og pasienter skal kunne registrere væskeinntak må de ha mulighet
til å velge mellom forskjellige drikkekategorier.

Scenario: Drikkeprodukter
  Gitt at "Drikke" er valgt fra hovedmenyen
  Og produkt "Kaffe" er valgt
  Og mengde "Halvt (0.5 dl)" er valgt
  Når knappen "Registrer" trykkes på
  Så skal skjermbildet "Dagens inntak" vises
