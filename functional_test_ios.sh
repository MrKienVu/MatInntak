#/bin/sh
(cd ios; APP=Products/app/matinntak.app bundle exec cucumber ../features -r ../features/support/ios -r ../features/step_definitions)
