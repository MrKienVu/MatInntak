def touchInputField(label)
  touch("RCTTextField marked:'#{label}'")
end

def touchElement(label)
  touch("* marked:'#{label}'")
end

def inputFieldExists(label)
  return !query("RCTTextField marked:'#{label}'").empty?
end

def textViewExists(label)
  return !query("RCTView marked:'#{label}'").empty?
end

def choiceFieldExists(label)
  return !query("RCTSegmentedControl marked:'#{label}'").empty?
end

def elementExists(label)
  return !query("* marked:'#{label}'").empty?
end

def type_on_keyboard(text)
  unless keyboard_visible? then
    wait_for_keyboard
  end
  keyboard_enter_text(text)
  tap_keyboard_action_key
end

def scrollUntilElementIsVisible(label)
  wait_for do
    swipe :up, force:(:strong)
    elementExists(label)
  end
end

def scrollUntilInputFieldIsVisible(label)
  wait_for do
    swipe :up, force:(:strong)
    inputFieldExists(label)
  end
end

def scrollUntilTextIsVisible(label)
  wait_for do
    swipe :up, force:(:strong)
    textViewExists(label)
  end
end

def scrollUntilChoiceFieldIsVisible(label)
  wait_for do
    swipe :up, force:(:strong)
    choiceFieldExists(label)
  end
end
