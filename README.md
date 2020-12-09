# Theide
Theide is an ide for developing theos based code

## Getting started

Install [nvm](https://github.com/creationix/nvm#install-script).
```bash
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash
```
Install npm and node.
```bash
    nvm install 10
    nvm use 10
```
Install yarn.
```bash
    npm install -g yarn
```
Install macOS dependencies
```bash
    brew install ldid xz expect make git perl ccls
```
Install linux dependencies
```bash
    apt install fakeroot git perl build-essential ccls
```
## Running
```bash
    yarn
    cd theide
    yarn package:preview
```
on linux:
```bash
    dist/linux-unpacked/theide
```
on macOS:
```bash
    dist/(placeholder)/theide
```
## Packaging
```bash
    yarn
    cd theide
    yarn package
```
