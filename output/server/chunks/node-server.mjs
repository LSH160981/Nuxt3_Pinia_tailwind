globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'node:http';
import { Server } from 'node:https';
import destr from 'destr';
import { defineEventHandler, handleCacheHeaders, createEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, setResponseStatus, setResponseHeader, getRequestHeaders, createError, createApp, createRouter as createRouter$1, toNodeListener, fetchWithEvent, lazyEventHandler } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ofetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import defu, { defuFn } from 'defu';
import { hash } from 'ohash';
import { parseURL, withoutBase, joinURL, withQuery, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { createStorage, prefixStorage } from 'unstorage';
import { toRouteMatcher, createRouter } from 'radix3';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'pathe';

const inlineAppConfig = {};



const appConfig = defuFn(inlineAppConfig);

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"envPrefix":"NUXT_","routeRules":{"/__nuxt_error":{"cache":false},"/tailwindDemo/**":{"prerender":true},"/about":{"ssr":false},"/demo/**":{"redirect":{"to":"/","statusCode":307}},"/**":{"headers":{"cache-control":"s-maxage=114514"}},"/_nuxt/**":{"headers":{"cache-control":"public, max-age=31536000, immutable"}}}},"public":{"publicConst":"This is a public const"},"isServeConst":true,"privateConst":"This is a server cosnt"};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
overrideConfig(_runtimeConfig);
const runtimeConfig = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => runtimeConfig;
deepFreeze(appConfig);
function getEnv(key) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]
  );
}
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject(obj[key])) {
      if (isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

storage.mount('/assets', assets$1);

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  const validate = opts.validate || (() => true);
  async function get(key, resolver, shouldInvalidateCache) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry)) {
          useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = opts.shouldInvalidateCache?.(...args);
    const entry = await get(key, () => fn(...args), shouldInvalidateCache);
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return key.replace(/[^\dA-Za-z]/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const key = await opts.getKey?.(event);
      if (key) {
        return escapeKey(key);
      }
      const url = event.node.req.originalUrl || event.node.req.url;
      const friendlyName = escapeKey(decodeURI(parseURL(url).pathname)).slice(
        0,
        16
      );
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: [opts.integrity, handler]
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const reqProxy = cloneWithProxy(incomingEvent.node.req, { headers: {} });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.context = incomingEvent.context;
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
      headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString();
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      event.node.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(
        event,
        routeRules.redirect.to,
        routeRules.redirect.statusCode
      );
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      }
      return proxyRequest(event, target, {
        fetch: $fetch.raw,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.node.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(path, useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const plugins = [
  
];

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.node.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    event.node.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.node.req.url?.startsWith("/__nuxt_error");
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('./error-500.mjs');
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    event.node.res.end(template(errorObject));
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  event.node.res.end(await res.text());
});

const assets = {
  "/aaa.jpg": {
    "type": "image/jpeg",
    "etag": "\"af7f-wunOWJwqTmT+7lXR3UEUS7+tQKI\"",
    "mtime": "2022-12-29T05:55:59.116Z",
    "size": 44927,
    "path": "../public/aaa.jpg"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"10be-n8egyE9tcb7sKGr/pYCaQ4uWqxI\"",
    "mtime": "2023-04-03T09:53:59.000Z",
    "size": 4286,
    "path": "../public/favicon.ico"
  },
  "/public文件说明.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"168-zW2Q6vnNbGqeVFVeK+GCVEPbaQ0\"",
    "mtime": "2023-04-08T05:52:45.144Z",
    "size": 360,
    "path": "../public/public文件说明.txt"
  },
  "/_nuxt/about.570fdf1b.js": {
    "type": "application/javascript",
    "etag": "\"486-DVyjocqV8wAMujPq1wVXm4tj5s0\"",
    "mtime": "2023-04-21T16:14:21.927Z",
    "size": 1158,
    "path": "../public/_nuxt/about.570fdf1b.js"
  },
  "/_nuxt/admin.7657049d.js": {
    "type": "application/javascript",
    "etag": "\"c2-7W1Zwbs8DxjbY+RHaY+uHZHcPeg\"",
    "mtime": "2023-04-21T16:14:21.927Z",
    "size": 194,
    "path": "../public/_nuxt/admin.7657049d.js"
  },
  "/_nuxt/apple.1a7d16c5.js": {
    "type": "application/javascript",
    "etag": "\"ab-7IHKB5dDDPA6O/HvW1l9v6cTM2k\"",
    "mtime": "2023-04-21T16:14:21.927Z",
    "size": 171,
    "path": "../public/_nuxt/apple.1a7d16c5.js"
  },
  "/_nuxt/bg-lt.b02da87b.png": {
    "type": "image/png",
    "etag": "\"d310-kltWf59cWyYGY7jTkFnvTBbRD4A\"",
    "mtime": "2023-04-21T16:14:21.927Z",
    "size": 54032,
    "path": "../public/_nuxt/bg-lt.b02da87b.png"
  },
  "/_nuxt/create-or-edit.bc15d3d6.js": {
    "type": "application/javascript",
    "etag": "\"33e-+FaikdwofOv0c6Bpkxs2xmZi/i0\"",
    "mtime": "2023-04-21T16:14:21.930Z",
    "size": 830,
    "path": "../public/_nuxt/create-or-edit.bc15d3d6.js"
  },
  "/_nuxt/create-or-edit.bf7ce188.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"33-I2yC6SiWAlu8rFgerjQvCsIMMkA\"",
    "mtime": "2023-04-21T16:14:21.927Z",
    "size": 51,
    "path": "../public/_nuxt/create-or-edit.bf7ce188.css"
  },
  "/_nuxt/entry.449f503e.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"b6b5-BIfeJNxBrPZ1upHIYh/HFDH2toE\"",
    "mtime": "2023-04-21T16:14:21.927Z",
    "size": 46773,
    "path": "../public/_nuxt/entry.449f503e.css"
  },
  "/_nuxt/entry.b965bbe4.js": {
    "type": "application/javascript",
    "etag": "\"23e87-sqIm5QSAODQqE0ie0iyE9BNlhAw\"",
    "mtime": "2023-04-21T16:14:21.930Z",
    "size": 147079,
    "path": "../public/_nuxt/entry.b965bbe4.js"
  },
  "/_nuxt/error-404.23f2309d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e2e-ivsbEmi48+s9HDOqtrSdWFvddYQ\"",
    "mtime": "2023-04-21T16:14:21.927Z",
    "size": 3630,
    "path": "../public/_nuxt/error-404.23f2309d.css"
  },
  "/_nuxt/error-404.5e8491ac.js": {
    "type": "application/javascript",
    "etag": "\"8e2-/q7uDrHsjCEgY7refJ7P6QEOQMk\"",
    "mtime": "2023-04-21T16:14:21.930Z",
    "size": 2274,
    "path": "../public/_nuxt/error-404.5e8491ac.js"
  },
  "/_nuxt/error-500.1672ebb7.js": {
    "type": "application/javascript",
    "etag": "\"78b-B7zod9uvNlxrnIX9eDflabc05vE\"",
    "mtime": "2023-04-21T16:14:21.929Z",
    "size": 1931,
    "path": "../public/_nuxt/error-500.1672ebb7.js"
  },
  "/_nuxt/error-500.aa16ed4d.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"79e-7j4Tsx89siDo85YoIs0XqsPWmPI\"",
    "mtime": "2023-04-21T16:14:21.927Z",
    "size": 1950,
    "path": "../public/_nuxt/error-500.aa16ed4d.css"
  },
  "/_nuxt/error-component.f73e47f6.js": {
    "type": "application/javascript",
    "etag": "\"4b2-Tl0wRb1ytkDzWMopBeAdjoZczIA\"",
    "mtime": "2023-04-21T16:14:21.927Z",
    "size": 1202,
    "path": "../public/_nuxt/error-component.f73e47f6.js"
  },
  "/_nuxt/fetch.7f0d4cf3.js": {
    "type": "application/javascript",
    "etag": "\"2c61-3S8n3q/TXkrjonaTUTN37oN1vSc\"",
    "mtime": "2023-04-21T16:14:21.929Z",
    "size": 11361,
    "path": "../public/_nuxt/fetch.7f0d4cf3.js"
  },
  "/_nuxt/index.045c9846.js": {
    "type": "application/javascript",
    "etag": "\"448-XB93XBPVWdTZfYVgxzocmnS11u8\"",
    "mtime": "2023-04-21T16:14:21.927Z",
    "size": 1096,
    "path": "../public/_nuxt/index.045c9846.js"
  },
  "/_nuxt/index.28a34e7f.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"43-66cyyFLRS2r7JrGCknCl5l3C6U0\"",
    "mtime": "2023-04-21T16:14:21.927Z",
    "size": 67,
    "path": "../public/_nuxt/index.28a34e7f.css"
  },
  "/_nuxt/index.f43dd265.js": {
    "type": "application/javascript",
    "etag": "\"1a1-ZhmL68pUTlky/ZwaRzGGg+srzEg\"",
    "mtime": "2023-04-21T16:14:21.927Z",
    "size": 417,
    "path": "../public/_nuxt/index.f43dd265.js"
  },
  "/_nuxt/other.23434d96.js": {
    "type": "application/javascript",
    "etag": "\"bb-cMJZhkV2nqXe5EQuxJy5ysFqst0\"",
    "mtime": "2023-04-21T16:14:21.927Z",
    "size": 187,
    "path": "../public/_nuxt/other.23434d96.js"
  },
  "/_nuxt/roles.92dd6988.js": {
    "type": "application/javascript",
    "etag": "\"367-1JJeAGxSWiU+7ApqrwAAQHjSnBQ\"",
    "mtime": "2023-04-21T16:14:21.927Z",
    "size": 871,
    "path": "../public/_nuxt/roles.92dd6988.js"
  },
  "/_nuxt/s.7a5889f9.png": {
    "type": "image/png",
    "etag": "\"cc1f6-rXkEN3eLs4iX8QL0Bk54a/2OPac\"",
    "mtime": "2023-04-21T16:14:21.926Z",
    "size": 836086,
    "path": "../public/_nuxt/s.7a5889f9.png"
  },
  "/_nuxt/tailwindDemo.544e7557.js": {
    "type": "application/javascript",
    "etag": "\"287-WGSdc4qsgBi4THsuYFyy3o8dfqU\"",
    "mtime": "2023-04-21T16:14:21.927Z",
    "size": 647,
    "path": "../public/_nuxt/tailwindDemo.544e7557.js"
  },
  "/_nuxt/testPinia.bdc9c346.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6c52-D0HxRxwmCzzPrRE03ZPvstdaS08\"",
    "mtime": "2023-04-21T16:14:21.927Z",
    "size": 27730,
    "path": "../public/_nuxt/testPinia.bdc9c346.css"
  },
  "/_nuxt/testPinia.c3c38e5d.js": {
    "type": "application/javascript",
    "etag": "\"b5e0-mP+udLduKJA3d0kkeRL+DqQbczY\"",
    "mtime": "2023-04-21T16:14:21.930Z",
    "size": 46560,
    "path": "../public/_nuxt/testPinia.c3c38e5d.js"
  },
  "/_nuxt/xxx.d5e9296d.js": {
    "type": "application/javascript",
    "etag": "\"72-MRP9CCnlzj3jWGHiJ5ur7/5XcI4\"",
    "mtime": "2023-04-21T16:14:21.927Z",
    "size": 114,
    "path": "../public/_nuxt/xxx.d5e9296d.js"
  },
  "/_nuxt/_id_.5552f70c.js": {
    "type": "application/javascript",
    "etag": "\"f6-6CPzeEvNH2IBa54Wo0fcer3axRw\"",
    "mtime": "2023-04-21T16:14:21.927Z",
    "size": 246,
    "path": "../public/_nuxt/_id_.5552f70c.js"
  },
  "/_nuxt/_plugin-vue_export-helper.c27b6911.js": {
    "type": "application/javascript",
    "etag": "\"5b-eFCz/UrraTh721pgAl0VxBNR1es\"",
    "mtime": "2023-04-21T16:14:21.927Z",
    "size": 91,
    "path": "../public/_nuxt/_plugin-vue_export-helper.c27b6911.js"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.node.req.method && !METHODS.has(event.node.req.method)) {
    return;
  }
  let id = decodeURIComponent(
    withLeadingSlash(
      withoutTrailingSlash(parseURL(event.node.req.url).pathname)
    )
  );
  let asset;
  const encodingHeader = String(
    event.node.req.headers["accept-encoding"] || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    event.node.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.node.res.removeHeader("cache-control");
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.node.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  const ifModifiedSinceH = event.node.req.headers["if-modified-since"];
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  if (asset.type && !event.node.res.getHeader("Content-Type")) {
    event.node.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag && !event.node.res.getHeader("ETag")) {
    event.node.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime && !event.node.res.getHeader("Last-Modified")) {
    event.node.res.setHeader("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.node.res.getHeader("Content-Encoding")) {
    event.node.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.node.res.getHeader("Content-Length")) {
    event.node.res.setHeader("Content-Length", asset.size);
  }
  return readAsset(id);
});

const _lazy_0ElStp = () => import('./_..._.mjs');
const _lazy_gMPWth = () => import('./aaa.mjs');
const _lazy_vPfgM1 = () => import('./_age_.mjs');
const _lazy_H5qbv3 = () => import('./ccc.get.mjs');
const _lazy_krdCzr = () => import('./ddd.post.mjs');
const _lazy_GaxkMb = () => import('./random.post.mjs');
const _lazy_Y7KdCc = () => import('./renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/api/**', handler: _lazy_0ElStp, lazy: true, middleware: false, method: undefined },
  { route: '/api/aaa', handler: _lazy_gMPWth, lazy: true, middleware: false, method: undefined },
  { route: '/api/bbb/:age', handler: _lazy_vPfgM1, lazy: true, middleware: false, method: undefined },
  { route: '/api/ccc', handler: _lazy_H5qbv3, lazy: true, middleware: false, method: "get" },
  { route: '/api/ddd', handler: _lazy_krdCzr, lazy: true, middleware: false, method: "post" },
  { route: '/api/random', handler: _lazy_GaxkMb, lazy: true, middleware: false, method: "post" },
  { route: '/__nuxt_error', handler: _lazy_Y7KdCc, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_Y7KdCc, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  const router = createRouter$1();
  h3App.use(createRouteRulesHandler());
  const localCall = createCall(toNodeListener(h3App));
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(
    eventHandler((event) => {
      const envContext = event.node.req.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: $fetch });
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const s = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const i = s.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${i.family === "IPv6" ? `[${i.address}]` : i.address}:${i.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
{
  process.on(
    "unhandledRejection",
    (err) => console.error("[nitro] [dev] [unhandledRejection] " + err)
  );
  process.on(
    "uncaughtException",
    (err) => console.error("[nitro] [dev] [uncaughtException] " + err)
  );
}
const nodeServer = {};

export { useRuntimeConfig as a, getRouteRules as g, nodeServer as n, useNitroApp as u };
