# npmbrace

A thin wrapper around `npm` that provides cross-platform [brace expansion](https://www.gnu.org/software/bash/manual/html_node/Brace-Expansion.html) syntax and allows to switch between NPM versions.

Now both *nix and Windows users are able to do something like:

```
nb i -S @angular/{core,common,router}@~6.0.0
```

## Benefits
 
- `nb` command that is shorter and more ergonomic than `npm` itself 
- cross-platform brace expansions
- switch between NPM 2, NPM 3, NPM 4, NPM 5 and NPM 6 versions on the fly.

## Installation

```
npm i -g npmbrace
```

## Usage

Accepts same arguments as `npm`. Optional first numeric argument allows to switch between NPM versions. Versioned NPM commands have `nb2` to `nb6` aliases.   

### Default NPM installation is used:
```
npmbrace i -S @angular/{core,common,router}@~6.0.0
```
A shortcut:

```
nb i -S @angular/{core,common,router}@~6.0.0
```

### NPM 2 is used:
```
nb 2 i -S @angular/{core,common,router}@~6.0.0
```
A shortcut:

```
nb2 i -S @angular/{core,common,router}@~6.0.0
```
