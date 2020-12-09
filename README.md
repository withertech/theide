# Theide
Theide is an ide for developing theos based code

## Getting started

Install [nvm](https://github.com/creationix/nvm#install-script).
```
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash
```
Install npm and node.
```
    nvm install 10
    nvm use 10
```
Install yarn.
```
    npm install -g yarn
```
Install macOS dependencies
```
    brew install ldid xz expect make git perl
```
Install linux dependencies
```
    apt install fakeroot git perl build-essential
```
## Running
```
    yarn
    cd theide
    yarn package:preview
```
    on linux:
```
    dist/linux-unpacked/theide
```
    on macOS:
```
    dist/(placeholder)/theide
```
## Packaging
```
    yarn
    cd theide
    yarn package
```
