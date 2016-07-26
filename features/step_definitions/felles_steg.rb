Gitt(/^at applikasjonen har startet*$/) do
  wait_for do
    !query("*").empty?
  end
end

Gitt(/^at pasienten .*har brukt applikasjonen.*$/) do
  step "at applikasjonen har startet"
end

Når(/^knappen "(.*)" trykkes på$/) do |button|
  unless elementExists(button)
    scrollUntilElementIsVisible(button)
  end
  touch("* marked:'#{button}'")
end

Gitt(/^at skjermbildet "(.*)" vises$/) do |screenHeading|
  wait_for_element_exists("* marked: '#{screenHeading}'", timeout: 5)
end

Så(/^skal skjermbildet "(.*)" vises$/) do |screenHeading|
  step("at skjermbildet \"#{screenHeading}\" vises")
end

Gitt(/^at "(.*)" er valgt fra startsiden$/) do |button|
  step "at applikasjonen har startet"
  step "knappen \"#{button}\" trykkes på"
end

Gitt(/^at "(.*)" er valgt fra hovedmenyen$/) do |button|
  step "at \"Start matregistrering\" er valgt fra startsiden"
  step "knappen \"#{button}\" trykkes på"
end

Og(/^produkt "(.*)" er valgt$/) do |button|
  step "knappen \"#{button}\" trykkes på"
end

Og(/^mengde "(.*)" er valgt$/) do |mengde|
  step "knappen \"#{mengde}\" trykkes på"
end
