# language: no
@inntak
Egenskap: Dagens inntak
For å få en oversikt over matinntak har sykepleiere og pasienter et behov for å
se hva de har spist i løpet av en dag

Scenario: Slette matvare
  Gitt at "Mellommåltid" "Banan" er registrert
  Og kategori "Mellommåltid" utvides
  Når det trykkes på slett-knappen
  Og knappen "Slett" trykkes på
  Så skal skjermbildet "Dagens inntak" vises
  Så skal "Ingen elementer registrert." vises

Scenario: Redigere matvare
  Gitt at "Mellommåltid" "Bolle" er registrert
  Og kategori "Mellommåltid" utvides
  Når det trykkes på rediger-knappen
  Så skal "Velg antall" vises
