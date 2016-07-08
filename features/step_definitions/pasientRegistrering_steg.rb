Når(/^tekstfeltene fylles ut med:$/) do |table|
  table.raw.each { |row|
    label = row[0]
    value = row[1]
    unless elementExists(label) then
      scrollUntilInputFieldIsVisible(label)
    end
    touchInputField(label)
    type_on_keyboard(value)
  }
end

Så(/^vises de beregnede verdiene:$/) do |table|
  table.raw.each { |row|
    label = row[0]
    value = row[1]
    unless elementExists(label) then
      scrollUntilTextIsVisible(label)
    end
    actual_value = query("RCTView marked:'#{label}' RCTText").first["label"]
    unless value == actual_value
      fail "Value for '#{label}' is incorrect"
    end
  }
end

Og(/^"(.*)" velges i flervalgsfeltet "(.*)"$/) do |value, label|
  unless elementExists(label) then
    scrollUntilChoiceFieldIsVisible(label)
  end
  touchElement(value)
end

Når(/^tallfeltene fylles ut med:$/) do |table|
  step "tekstfeltene fylles ut med:", table
end
