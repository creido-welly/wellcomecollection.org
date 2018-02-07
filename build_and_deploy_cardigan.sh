#!/usr/bin/env bash

set -o errexit

pushd cardy
  yarn install
  yarn build

  pushd .dist
    aws s3 sync --only-show-errors . s3://cardigan.wellcomecollection.org
  popd
popd
