#/bin/sh
set -e
ARG=
if [ -n "$1" ]; then
  ARG="--tags @$1";
fi
(cd ios; APP=Products/app/matinntak.app DEVICE_TARGET="iPad 2 (9.3)" bundle exec cucumber $ARG ../features -r ../features/support/ios -r ../features/step_definitions)
