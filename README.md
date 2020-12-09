# Theide
Theide is an ide for developing theos based code

Currently linux only. support for macOS is coming soon
## Getting started

Install [nvm](https://github.com/creationix/nvm#install-script).

    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash

Install npm and node.

    nvm install 10
    nvm use 10

Install yarn.

    npm install -g yarn

## Running

    yarn
    cd theide
    yarn package:preview
    dist/linux-unpacked/theide

## Packaging

    yarn
    cd theide
    yarn package
