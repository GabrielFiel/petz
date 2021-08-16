## PETZ E2E Tests

### Clone this repo

```properties
git clone https://github.com/GabrielFiel/petz.git
```

### Install dependencies

```properties
yarn install
```

### Run tests

```properties
yarn cy:run:chrome
yarn cy:run:edge
yarn cy:run:firefox
```

### Development mode

```properties
yarn cy:open
```

### Test results

After running the test suite, you can find the results at `cypress/reports/html`
