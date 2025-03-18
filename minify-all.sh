#!/bin/bash

input_folder=$1
output_folder="${input_folder}_Package"

if [ ! -d "$output_folder" ]; then
  mkdir "$output_folder"
fi

for file in "$input_folder"/*; do
  filename=$(basename -- "$file")
  extension="${filename##*.}"
  case $extension in
    html)
      html-minifier --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype --minify-css true --minify-js true -o "${output_folder}/${filename}" "$file"
      ;;
    css)
      cssnano "$file" "${output_folder}/${filename}"
      ;;
    js)
      terser "$file" -o "${output_folder}/${filename}"
      ;;
    *)
      echo "Skipping file $file (unknown extension)"
      ;;
  esac
done
