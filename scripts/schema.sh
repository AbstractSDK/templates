#!/usr/bin/env bash

# Generates the schemas for each module and copies them to ./schema/<contract-name>/<version>
package_dir="cargo pkgid | awk -F '/' '{print \$NF}'| tr '#@' '/'"
SCHEMA_OUT_DIR=$(echo "$PWD"/schema)

for dir in contracts/*; do
    (cd "$dir" \
      && out_dir="$SCHEMA_OUT_DIR/$(eval $package_dir)" \
      && schema_dir="$dir/schema" \
      && cargo schema \
      && if [ -f "schema/module-schema.json" ]; then
             mkdir -p "schema/abstract"
             cp "schema/module-schema.json" "schema/abstract"
         fi \
      && mkdir -p $out_dir \
      && cp -r schema/* $out_dir)
done
