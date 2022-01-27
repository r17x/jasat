<p align="center">
  <img alt="jasat overview" src="https://raw.githubusercontent.com/ri7nz/jasat/main/.github/docs/jasat.gif"/>
  <label>Tools for code moderation, transformation, or use for maintain JavaScript stuff related.</label>
</p>

<p align="center">
  <a href="#use-case">Use case</a> • 
  <a href="#Usage">Usage</a> • 
  <a href="#special-thanks">Special Thanks</a> • 
  <a href="#Alternative">Alternative</a> • 
  <a href="#Contribution">Contribution</a> • 
  <a href="#License">License</a>
</p>


## Use case

* find and replace some code.
* remove some code (like `console.log`).

## Usage

### Using with `npx`
```console

npx jasat <TRANSFORM> [OPTIONS]

```

### Using as development dependencies

#### add in `devDependencies`
```console

yarn add -D jasat

```

#### run

```console

yarn jasat <TRANSFORM> [OPTIONS]

```

### Transforms

| Name                    | OPTIONS     |
| ---                     | ---         |
| `import-source-replace` | "FROM" "TO" |
| `remove-console`        | -           |

### Command OPTIONS

```console

  Tools for code moderation, transformation, or use for maintain JavaScript stuff related.

  USAGE
    npx jasat <TRANSFORM> <...OPTIONS>

  OPTIONS
    --write, -w         Allow to modified target file.
    --cwd, -C           Set current working directory (default: `process.cwd()`).
    --help, -h          Print help.
    --list, -l          Print list of TRANSFORM.
    --version, -v       Print version.

```

### Example

```console

npx jasat import-source-replace "react" "preact" // dry-run
npx jasat import-source-replace "react" "preact" --write // write to system or target files

```

## Special Thanks

* [**equivalent-exchange**](https://github.com/suchipi/equivalent-exchange) - Transmute one JavaScript string into another by way of mutating its AST. Powered by babel and recast. 

## Alternative

* [**jscodeshift**](https://github.com/facebook/jscodeshift) - A JavaScript codemod toolkit.
* [**comby**](https://github.com/comby-tools/comby) - A tool for structural code search and replace that supports ~every language. 

## Contribution
### Making pull requests
* Use [**conventional-commits**](https://www.conventionalcommits.org/en/v1.0.0/) before make a pull request.

## License
**MIT**
