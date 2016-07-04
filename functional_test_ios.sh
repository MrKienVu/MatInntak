#/bin/sh
(cd ios; APP=Products/app/matinntak.app DEVICE_TARGET="iPad 2 (9.3)" bundle exec cucumber ../features -r ../features/support/ios -r ../features/step_definitions)
