

def type_on_keyboard(text)
  unless keyboard_visible? then
    wait_for_keyboard
  end
  keyboard_enter_text(text)
  tap_keyboard_action_key
end

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

Og(/^"(.*)" velges i flervalgsfeltet "(.*)"$/) do |value, label|
  unless elementExists(label) then
    scrollUntilChoiceFieldIsVisible(label)
  end
  touchElement(value)
end

Når(/^tallfeltene fylles ut med:$/) do |table|
  step "tekstfeltene fylles ut med:", table
end
