# language: no
Egenskap: Pasientregistrering
En pasient må registreres slik at vedkommendes matinntak kan følges opp og
eventuelle tiltak iverksettes

Scenario: Registreringsskjema
# Gitt at en pasient ikke er registrert fra før # dårlig kriterium
Gitt at "Registrer ny pasient" er valgt fra startsiden
Og at skjermbildet "Pasientregistrering" vises
Når tekstfeltene fylles ut med:
  | Fornavn       | Dagfinn     |
  | Etternavn     | Bergsager   |
Og "Mann" velges i flervalgsfeltet "Kjønn"
Og tekstfeltene fylles ut med:
  | Alder         | 55          |
  | Fødselsnummer | 12345678910 |
Og tallfeltene fylles ut med:
  | Høyde         | 2           |
  | Vekt          | 80          |
Så vises de beregnede verdiene:
  | KMI           | 20          |
  | Energi        | 2400        |
  | Protein       | 80          |
  | Væske         | 2400        |
Og "Nei" velges i flervalgsfeltet "Spesialkost"
Og knappen "Registrer" trykkes på
Så skal skjermbildet "Feberregistrering" vises
