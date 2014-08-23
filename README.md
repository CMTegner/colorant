# colorant

A CLI tool and webapp combo for visualising web colors

[![Travis CI Build Status](https://travis-ci.org/CMTegner/colorant.svg)](http://travis-ci.org/CMTegner/colorant) [![Dependency Status](https://david-dm.org/CMTegner/colorant/status.svg)](https://david-dm.org/CMTegner/colorant)

[![NPM Module](https://nodei.co/npm/colorant.png)](http://npm.im/colorant)

## Install

```sh
$ npm install -g colorant
```

## Usage

```sh
$ color --help

Usage: color [color] [options]

color     The color to inspect

Options:
   --version   Print version and exit
```

Example:

```sh
$ color "rgb(68, 68, 68)"
$ color cyan
$ color #bada55
$ color "hsla(170, 50%, 45%, 1)"
```