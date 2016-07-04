#  language: no
Egenskap: Oppstart av applikasjon
  For å starte matregistrering må en sykepleier starte applikasjonen og legge til den
  aktuelle pasienten.

Scenario: Uregistrert pasient
  Gitt at pasienten ikke har brukt applikasjonen tidligere
  Når knappen for Registrer ny pasient trykkes på
  Så skal skjermbildet for pasientregistrering vises

# Scenario: Registrert pasient u/behov
#   Gitt at pasienten har brukt applikasjonen tidligere
#   Og fødselsnummer skrives inn
#   Og det ikke skal fylles inn behov
#   Når knappen for Start matregistrering trykkes på
#   Så skal skjermbildet for forsiden/hovedskjermen vises
#
# Scenario: Registrert pasient m/behov
#   Gitt at pasienten har brukt applikasjonen tidligere
#   Og fødselsnummer skrives inn
#   Og behov skal registreres
#   Når knappen for Registrer behov trykkes på
#   Så skal skjermbildet for behovsregistrering vises
