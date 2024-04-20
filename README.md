## Cypress test automation for the [Souse demo website](https://www.saucedemo.com/)

### Content

* Installation
* Available commands
* Run additional test cases

### Installation

Requirements:

* NodeJS 18^

For start project you need to follow the next steps:

1. Download or fork this project on your local machine
2. Open downloaded project
3. Run `npm install`
4. Run `npm run cy:run:chrome`

### Available commands

Run all specs in headless mode
```
npm run cy:run
```

Open Cypress UI

```
npm run cy:open
```

### Additional test cases

As a bonus task implemented tests to cover item remove feature, you may run it by follow command:
```
npm run cy:run -- --spec "cypress/e2e/remove.cart.items.cy.js"
```

