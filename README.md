# startkit

[![Release](https://img.shields.io/github/v/release/libnudget/startkit?logo=github&label=latest)](https://github.com/libnudget/startkit/releases)

A minimal project template for new libraries.

startkit gives you a publish-ready library with nothing beyond the
essentials: a test runner, a linter, and a release script. Run it, rename
it, and ship.

## Usage

Clone the repository and scaffold a new library:

```sh
git clone https://github.com/libnudget/startkit
cd startkit
npm install
npm link        # makes the `startkit` command available
startkit mylib  # creates ./mylib from the template
```

Or without installing anything:

```sh
npx --yes github:libnudget/startkit mylib
```

Then move in and get going:

```sh
cd mylib
npm install
npm test
```

## What you get

- An ESM library with a `src/` module and a `node:test` test suite.
- ESLint with a minimal flat config.
- A CI workflow that runs lint and tests on every push.
- README, CHANGELOG, LICENSE, and `.gitignore`.

## Development

```sh
npm test
npm run lint
```

## License

MIT
