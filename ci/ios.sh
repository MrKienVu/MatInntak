# Runs all unit and functional tests for iOS. Designed for use with ci.usit.uio.no

function abort {
    exit 50
}
function failTests {
    exit 1
}
function failBuild {
    exit 2
}

if [ ! -d ./ci ]; then
  echo "Run this script from the project root directory"
  exit SETUP_ERROR
fi

if ! which npm ; then
  curl https://utv.uio.no/node/v6.3.0/node-v6.3.0-darwin-x64.tar.gz | tar xz
  export PATH=$PATH:$(pwd)/node-v6.3.0-darwin-x64/bin
fi

if ! npm install ; then abort; fi
if ! npm install -g mocha flow-bin@0.27 ; then abort; fi

if ! npm test ; then failTests; fi
if ! flow check ; then failTests; fi

( cd ios;
  if ! xcodebuild -sdk iphonesimulator  -scheme Calabash -configuration Calabash build 2>&1; then
    failBuild
  fi
)

if [ ! -d ~/.calabash/sandbox ]; then
  curl -sSL https://raw.githubusercontent.com/calabash/install/master/install-osx.sh | bash
fi

# Excerpt from calabash-sandbox
CALABASH_RUBY_VERSION="2.1.6-p336"
CALABASH_RUBY_PATH="${HOME}/.calabash/sandbox/Rubies/${CALABASH_RUBY_VERSION}/bin"
CALABASH_GEM_HOME="${HOME}/.calabash/sandbox/Gems"
export GEM_HOME="${CALABASH_GEM_HOME}"
export GEM_PATH="${CALABASH_GEM_HOME}:${CALABASH_GEM_HOME}/ruby/2.0.0:${CALABASH_GEM_HOME}/ruby/2.1.0"

PATH="${CALABASH_RUBY_PATH}:${GEM_HOME}/bin:${PATH}"

echo "Using Ruby: "$(which ruby) # This should be Calabash sandbox' Ruby
echo "Using Bundle: "$(which bundle) # This should be Calabash sandbox' Bundle

( cd ios;
  if ! bundle install; then abort; fi
)
if ! ./functional_test_ios.sh; then failTests; fi
