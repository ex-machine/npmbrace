# npmbrace

A thin wrapper around `npm` that provides cross-platform [brace expansion](https://www.gnu.org/software/bash/manual/html_node/Brace-Expansion.html) syntax. Now both *nix and Windows users are able to do something like

```
npmb i -S @angular/{core,common,http}@~4.0.0
```

Additionally, `npmbrace` allows to switch between NPM2, NPM3 and NPM4 versions on the fly.

## Installation

```
npm i -g npmbrace
```

## Usage

The same as  `npm`.

Optional first numeric argument allows to switch between NPM versions.

Default NPM version is used:
```
npmb i -S @angular/{core,common,http}@~4.0.0
```

NPM2 is used:
```
npmb 2 i -S @angular/{core,common,http}@~4.0.0
```
