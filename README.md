# Install universal-sierra-compiler

Sets up [universal-sierra-compiler] in your GitHub Actions workflow.

## Example workflow

```yaml
name: My workflow
on:
  push:
  pull_request:
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: software-mansion/setup-universal-sierra-compiler@v1
      - run: universal-sierra-compiler
```

## Inputs

- `universal-sierra-compiler-foundry-version` - **Optional**. String:

  - Stating an explicit universal-sierra-compiler version to use, for example `"1.0.0"`.
  - Empty/not specified: the `.tool-versions` file will be read to resolve universal-sierra-compiler version, and in case it is not present the latest stable version will be used.

- `tool-versions` - Optional. String.
  - Stating a relative or absolute path to the `.tool-versions` file.
  - Should be used only if `universal-sierra-compiler-version` is not specified.

## Outputs

- `universal-sierra-compiler-prefix` - A path to where universal-sierra-compiler has been extracted to. The `universal-sierra-compiler` binary will be located in the `bin`
  subdirectory (`${{ steps.setup-universal-sierra-compiler.outputs.universal-sierra-compiler-prefix }}/bin`).
- `universal-sierra-compiler-version` - Version of universal-sierra-compiler that was installed (as reported by `universal-sierra-compiler -V`).

[universal-sierra-compiler]: https://github.com/software-mansion/universal-sierra-compiler
