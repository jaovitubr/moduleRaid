try {
    if ("moduleRaid" in window) {
      throw new Error("ModuleRaid is already injected");
    }
  
    function webpackModuleRaid() {
      const modules = {};
  
      const webpack = window["webpackChunkwhatsapp_web_client"];
      const parasiteId = Math.random().toString(36).substring(7);
  
      webpack.push([
        [parasiteId],
        {},
        (e) => {
          for (const key in e.m) {
            modules[key] = () => e(key);
          }
        }
      ]);
  
      return modules;
    }
  
    function cometModuleRaid() {
      const modules = {};
      const modulesIDs = Object.keys(require('__debug')?.modulesMap || {});
  
      function importModule(modId) {
        try {
          window.ErrorGuard.skipGuardGlobal(true);
          return importNamespace(modId);
        } catch (error) {
          throw error;
        } finally {
          window.ErrorGuard.skipGuardGlobal(false);
        }
      }
  
      modulesIDs.forEach(modId => {
        modules[modId] = () => importModule(modId);
      });
  
      return modules;
    }
  
    let modules = {};
  
    if (window.require && window.__d) modules = cometModuleRaid();
    else if (window.webpackChunkwhatsapp_web_client) modules = webpackModuleRaid();
    else throw new Error("Cannot find bundler");
  
    const moduleRaid = {
      debug: false,
    };
  
    Object.entries(modules).forEach(([modId, importModule]) => {
      Object.defineProperty(moduleRaid, modId, {
        get: importModule,
        enumerable: true,
        configurable: false,
      });
    });
  
    function find(predicate) {
      if (typeof predicate !== "function") throw new Error("Missing predicate function");
  
      for (const modId in moduleRaid) {
        try {
          const mod = moduleRaid[modId];
  
          if (predicate(mod)) return mod;
        } catch (error) {
          if (moduleRaid.debug) console.error(error);
          continue;
        }
      }
    }
  
    function some(predicate) {
      return !!find(predicate);
    }
  
    function filter(predicate) {
      if (typeof predicate !== "function") throw new Error("Missing predicate function");
  
      let results = [];
  
      for (const mod of Object.values(moduleRaid)) {
        try {
          if (predicate(mod)) results.push(mod);
        } catch (error) {
          if (moduleRaid.debug) console.error(error);
          continue;
        }
      }
  
      return results;
    }
  
    function findExport(predicate) {
      if (typeof predicate !== "string") throw new Error("Missing predicate export key");
  
      return find((mod) => {
        const keys = [
          ...Object.keys(mod?.default || {}),
          ...Object.keys(mod || {}),
        ];
  
        return keys.includes(predicate);
      });
    }
  
    function someExport(predicate) {
      return !!findExport(predicate);
    }
  
    function filterExport(predicate) {
      if (typeof predicate !== "string") throw new Error("Missing predicate export key");
  
      return filter((mod) => {
        const keys = [
          ...Object.keys(mod?.default || {}),
          ...Object.keys(mod || {}),
        ];
  
        return keys.includes(predicate);
      });
    }
  
    Object.setPrototypeOf(moduleRaid, {
      some,
      find,
      filter,
      someExport,
      findExport,
      filterExport,
    });
  
    Object.defineProperty(window, "moduleRaid", {
      value: moduleRaid,
      writable: false,
      configurable: false,
    });
  
    console.log("%c ModuleRaid.js > Fully injected!", "color: green; font-weight: bold;");
  } catch (ex) {
    console.log("%c ModuleRaid.js > Inject Error:", "color: red; font-weight: bold;", ex);
  }