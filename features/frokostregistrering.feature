# language: no
@frokost
Egenskap: Frokost
For å kunne registrere frokost, lunsj og middag må sykepleiere og pasienter ha
mulighet til å velge mellom underkategoriene.

Scenario: Brødprodukter
  Gitt at "Frokost, lunsj og kveldsmat" er valgt fra hovedmenyen
  Og produkt "BrødProdukter" er valgt
  Og antall 2 er valgt
  Når knappen "Bekreft" trykkes på
  Så skal skjermbildet "Dagens inntak" vises
