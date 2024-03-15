# ModuleRaid

ModuleRaid is a versatile utility designed to retrieve modules from `webpack 5` and `comet` functions embedded within WhatsApp Web. It facilitates module retrieval and provides functionalities to navigate through the returned modules efficiently.

## Documentation

- `window.moduleRaid`: It is a global key-value object that stores all modules and prototypes to manipulate the modules

- `moduleRaid.some(predicate)`: Checks if a module exists using a predicate function.
- `moduleRaid.find(predicate)`: Finds a specific module using a predicate function.
- `moduleRaid.filter(predicate)`: Filters modules using a predicate function.
- `moduleRaid.someExport(predicate)`: Checks if a module exists using a predicate export name.
- `moduleRaid.findExport(predicate)`: Finds a specific module using a predicate export name.
- `moduleRaid.filterExport(predicate)`: Filters modules using a predicate export name.

## Examples

```js
const myWebpackModuleByID = moduleRaid[18]; // Get Module By id (Webpack)
const myCometModuleByName = moduleRaid["MySocketModule"]; // Get Module By Name (Comet)

const hasMyModule = moduleRaid.some(mod => mod.fromString); // Returns a boolean value.
const myModule = moduleRaid.find(mod => mod.fromString); // Returns a single result.
const myModules = moduleRaid.filter(mod => mod.fromString); // Returns an array.
```

```js
const hasMyModule = moduleRaid.someExport("fromString"); // Returns a boolean value.
const SocketManager = moduleRaid.findExport("Socket"); // Returns a single result.
const results = moduleRaid.filterExport("Socket"); // Returns an array.
```