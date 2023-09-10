#!/usr/bin/env bash

ACTIVATE_LICENSE_PATH="$GITHUB_WORKSPACE/_activate-license"
mkdir -p "$ACTIVATE_LICENSE_PATH"

source /steps/return_license.sh

#
# Display the unity version
#
echo "Creating a project using Unity version \"$UNITY_VERSION\"."

CREATE_OUTPUT=$(unity-editor \
      -batchmode \
      -nographics \
      -stackTraceLogType Full \
      -logFile unity.log \
      -quit \
      -createProject $PROJECT_PATH)

# Store the exit code from the verify command
UNITY_EXIT_CODE=$?

source /steps/return_license.sh

#
# Remove license activation directory
#

rm -r "$ACTIVATE_LICENSE_PATH"

#
# Display information about the result
#
if [ $UNITY_EXIT_CODE -eq 0 ]; then
  chmod -R a+rw $PROJECT_PATH
  echo ""
  echo "###########################"
  echo "#     Project created     #"
  echo "###########################"
  echo ""
else 
  echo ""
  echo "###########################"
  echo "#         Failure         #"
  echo "###########################"
  echo ""
  cat unity.log
fi

#
# Exit with code from Unity process
#
exit $UNITY_EXIT_CODE