# coding: utf-8
# language: no
Egenskap: Feber
For å være sikker på at en pasient får angitt et riktig dagsbehov må det tas høyde for feber

Scenario: Har feber
  Gitt at behovsregistrering eller pasientregistrering er gjennomført
  Så skal skjermbildet "Feberregistrering" vises
  Når "Ja" velges i flervalgsfeltet "Feber"
  Og tallfeltet fylles ut med "40"
  Og knappen "Registrer" trykkes på
  Så skal skjermbildet "Forsiden" vises
