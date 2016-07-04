Gitt(/^at pasienten .*har brukt applikasjonen.*$/) do
  wait_for do
    !query("*").empty?
  end
end

Når(/^knappen for ([^"]*) trykkes på$/) do |button|
  touch("* marked:'#{button}'")
end

Så(/^skal skjermbildet for pasientregistrering vises$/) do
  for item in ["Pasientregistrering",
               "Personalia", "Antropometri",
               "Behov", "Screening", "Spesialkost"] do
    wait_for_text(item, timeout: 5)
  end
end

Og(/^jeg registrerer meg som "([^"]*)"$/) do |test|

  touch("* marked:'studieId'")
  wait_for_keyboard
  keyboard_enter_text("test")

  touch("* marked:'gjentaStudieId'")
  wait_for_keyboard
  keyboard_enter_text("test")

  wait_for_element_exists("* marked:'Neste'")
  touch("* marked:'Neste'")

  if element_exists("* marked:'Gi tilgang'")
    touch("* marked:'Gi tilgang'")
    wait_for_element_exists("* marked:'OK'")
    touch("* marked:'OK'")
  end

  wait_for_element_exists("* marked:'Neste'")
  touch("* marked:'Neste'")

  touch("* marked:'Ønsker ikke app kode'")
  wait_for_element_exists("* marked:'Fortsett uten app kode'")
  touch("* marked:'Fortsett uten app kode'")

end

Så(/^vil et ukentlig skjema være tilgjengelig$/) do

  wait_for_element_exists("* marked:'Ukentlig skjema'")
  weeklySurveyExist = true

  unless weeklySurveyExist
    fail  "Ukentlig skjema ikke tilgjengelig"
  end

end
