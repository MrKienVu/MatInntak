Gitt(/^at pasienten .*har brukt applikasjonen.*$/) do
  wait_for do
    !query("*").empty?
  end
end

Når(/^knappen ([^"]*) trykkes på$/) do |button|
  touch("* marked:'#{button}'")
end

Så(/^skal skjermbildet ([^"]*) vises$/) do |screenHeading|
  wait_for_element_exists("* marked: '#{screenHeading}'", timeout: 5)
end
