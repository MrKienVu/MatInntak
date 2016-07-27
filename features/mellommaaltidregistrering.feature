# language: no
@mellommåltid
Egenskap: Mellommåltid
For at pasienter og sykepleiere skal ha mulighet til å registrere mat utenom
faste måltider må de kunne registrere mellommåltider.

Scenario: Produkt
  Gitt at "Mellommåltid" er valgt fra hovedmenyen
  Og produkt "Bolle" er valgt
  Og antall 2 er valgt
  Når knappen "Bekreft" trykkes på
  Så skal skjermbildet "Dagens inntak" vises
