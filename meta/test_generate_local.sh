#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck > /dev/null && shellcheck "$0"

REPO_ROOT="$(realpath "$(dirname "$0")/..")"

TMP_DIR="$REPO_ROOT/build"

rm -rf "$TMP_DIR"
mkdir -p "$TMP_DIR"

PROJECT_NAME="testgen-local"

(
  echo "Navigating to $TMP_DIR"
  cd "$TMP_DIR"

  echo "Generating project from local repository ..."
  cargo generate --path "$REPO_ROOT" --name "$PROJECT_NAME" --define include_app=true --define include_adapter=true --define include_standalone=true --define adapter_name=test_adapter --define app_name=test_app --define standalone_name=test_standalone

  (
    cd "$PROJECT_NAME"
    echo "This is what was generated"
    ls -lA
    echo "Running cargo update ..."
    cargo update
    # Debug builds first to fail fast
    echo "Running unit tests ..."
    cargo unit-test

    echo "Creating schema ..."
    sh scripts/schema.sh

    echo "Building wasm ..."
    cargo wasm
  )
)