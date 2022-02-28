## [0.1.2](https://github.com/ri7nz/jasat/compare/v0.1.1...v0.1.2) (2022-02-28)

### Bug Fixes

- didn't modified the target file ([194424a](https://github.com/ri7nz/jasat/commit/194424a582fed7b70dbb60a4c6f4519837681321))

## [0.1.1](https://github.com/ri7nz/jasat/compare/v0.1.0...v0.1.1) (2022-02-28)

### Bug Fixes

- enable realpath for glob files ([64f66dc](https://github.com/ri7nz/jasat/commit/64f66dc4f7f479ac6788b5fab44695569e733761))

# [0.1.0](https://github.com/ri7nz/jasat/compare/v0.0.1...v0.1.0) (2022-02-26)

### Features

- add another support by extensions ([7d34050](https://github.com/ri7nz/jasat/commit/7d340508023f93c5365eae21666cff9a50635fd7))

# [0.0.1](https://github.com/ri7nz/jasat/commit/0fa0d3cc5851104e04915ce390a7b19f280d731f) (2022-02-25)

### Features

#### find and replace some import `source`.

```console
npx jasat import-source-replace "react" "preact" // dry-run
npx jasat import-source-replace "react" "preact" --write // write to system or target files
```

### remove console statements.

```console
npx jasat remove-console --write // write to system or target files
```
