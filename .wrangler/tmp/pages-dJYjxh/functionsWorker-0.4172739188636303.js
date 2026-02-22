var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// api/webhook-transformer.ts
var onRequest = /* @__PURE__ */ __name(async (context) => {
  if (context.request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }
  try {
    const formData = await context.request.formData();
    const data = {};
    for (const [key, value] of formData) {
      data[key] = value;
    }
    console.log("Received JotForm data:", data);
    const transformedData = transformJotFormData(data);
    console.log("Transformed data:", transformedData);
    const odooWebhookUrl = "https://002-001-5dd6e535-4d1c-46bc-9bd9-42ad4bc5f082.odoo4projects.com/webhook/47129739-e60b-4944-b6c2-d3fd5ce0991b";
    const odooResponse = await fetch(odooWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(transformedData)
    });
    if (!odooResponse.ok) {
      console.error("Odoo webhook error:", odooResponse.status, await odooResponse.text());
      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to process webhook"
        }),
        { status: 500 }
      );
    }
    return new Response(
      JSON.stringify({
        success: true,
        message: "Webhook processed successfully"
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      }),
      { status: 500 }
    );
  }
}, "onRequest");
function transformJotFormData(jotFormData) {
  const fieldMapping = {
    // Name field variations
    name: "full_name",
    fullName: "full_name",
    full_name: "full_name",
    // Email field variations
    email: "email",
    workEmail: "email",
    work_email: "email",
    // Phone field variations
    phone: "phone",
    mobile: "phone",
    // Company field variations
    company: "company_name",
    companyName: "company_name",
    company_name: "company_name",
    // Location field (exact from form)
    location: "server_location",
    serverLocation: "server_location",
    server_location: "server_location"
  };
  const transformed = {
    source: "jotform_free_trial",
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
  for (const [jotKey, odooKey] of Object.entries(fieldMapping)) {
    const value = findFieldValue(jotFormData, jotKey);
    if (value !== null && value !== void 0 && value !== "") {
      if (jotKey === "location" || jotKey === "serverLocation" || jotKey === "server_location") {
        const fixedLocation = fixLocationValue(value);
        transformed[odooKey] = fixedLocation;
        transformed.database_id = getDatabaseId(fixedLocation);
      } else {
        transformed[odooKey] = value;
      }
    }
  }
  if (jotFormData.submissionID) {
    transformed.submission_id = jotFormData.submissionID;
  }
  if (jotFormData.formID) {
    transformed.form_id = jotFormData.formID;
  }
  return transformed;
}
__name(transformJotFormData, "transformJotFormData");
function findFieldValue(data, fieldName) {
  const lowerFieldName = fieldName.toLowerCase();
  if (data[fieldName]) return data[fieldName];
  if (data[lowerFieldName]) return data[lowerFieldName];
  if (data[`q_${lowerFieldName}`]) return data[`q_${lowerFieldName}`];
  if (data[`q${fieldName}`]) return data[`q${fieldName}`];
  if (data[`q[${lowerFieldName}]`]) return data[`q[${lowerFieldName}]`];
  const camelCase = fieldName.charAt(0).toLowerCase() + fieldName.slice(1);
  if (data[camelCase]) return data[camelCase];
  const snakeCase = fieldName.replace(/([A-Z])/g, "_$1").toLowerCase();
  if (data[snakeCase]) return data[snakeCase];
  if (data[`q_${snakeCase}`]) return data[`q_${snakeCase}`];
  for (const [key, value] of Object.entries(data)) {
    const keyLower = key.toLowerCase().replace(/[q_[\]]/g, "");
    if (keyLower.includes(lowerFieldName) || lowerFieldName.includes(keyLower)) {
      if (value && value !== "") return value;
    }
  }
  return null;
}
__name(findFieldValue, "findFieldValue");
function fixLocationValue(location) {
  if (!location) return location;
  const normalized = location.trim().toLowerCase();
  console.log(`Location received: ${location} \u2192 normalized: ${normalized}`);
  return normalized;
}
__name(fixLocationValue, "fixLocationValue");
function getDatabaseId(location) {
  const location_lower = location.trim().toLowerCase();
  const databaseMap = {
    // Exact values from form dropdown
    manchester: "manchester_eu_1",
    boston: "boston_us_1",
    mumbai: "mumbai_asia_1",
    saopaulo: "saopaulo_br_1",
    meppel: "meppel_eu_1"
  };
  if (databaseMap[location_lower]) {
    return databaseMap[location_lower];
  }
  const dbId = location_lower.replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
  return `${dbId}_db_1`;
}
__name(getDatabaseId, "getDatabaseId");

// webhook-transformer.ts
var onRequest2 = /* @__PURE__ */ __name(async (context) => {
  if (context.request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }
  try {
    const formData = await context.request.formData();
    const data = {};
    for (const [key, value] of formData) {
      data[key] = value;
    }
    console.log("Received JotForm data:", data);
    const transformedData = transformJotFormData2(data);
    console.log("Transformed data:", transformedData);
    const odooWebhookUrl = "https://002-001-5dd6e535-4d1c-46bc-9bd9-42ad4bc5f082.odoo4projects.com/webhook/47129739-e60b-4944-b6c2-d3fd5ce0991b";
    const odooResponse = await fetch(odooWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(transformedData)
    });
    if (!odooResponse.ok) {
      console.error("Odoo webhook error:", odooResponse.status, await odooResponse.text());
      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to process webhook"
        }),
        { status: 500 }
      );
    }
    return new Response(
      JSON.stringify({
        success: true,
        message: "Webhook processed successfully"
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      }),
      { status: 500 }
    );
  }
}, "onRequest");
function transformJotFormData2(jotFormData) {
  const fieldMapping = {
    // Name field variations
    name: "full_name",
    fullName: "full_name",
    full_name: "full_name",
    // Email field variations
    email: "email",
    workEmail: "email",
    work_email: "email",
    // Phone field variations
    phone: "phone",
    mobile: "phone",
    // Company field variations
    company: "company_name",
    companyName: "company_name",
    company_name: "company_name",
    // Location field (exact from form)
    location: "server_location",
    serverLocation: "server_location",
    server_location: "server_location"
  };
  const transformed = {
    source: "jotform_free_trial",
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
  for (const [jotKey, odooKey] of Object.entries(fieldMapping)) {
    const value = findFieldValue2(jotFormData, jotKey);
    if (value !== null && value !== void 0 && value !== "") {
      if (jotKey === "location" || jotKey === "serverLocation" || jotKey === "server_location") {
        const fixedLocation = fixLocationValue2(value);
        transformed[odooKey] = fixedLocation;
        transformed.database_id = getDatabaseId2(fixedLocation);
      } else {
        transformed[odooKey] = value;
      }
    }
  }
  if (jotFormData.submissionID) {
    transformed.submission_id = jotFormData.submissionID;
  }
  if (jotFormData.formID) {
    transformed.form_id = jotFormData.formID;
  }
  return transformed;
}
__name(transformJotFormData2, "transformJotFormData");
function findFieldValue2(data, fieldName) {
  const lowerFieldName = fieldName.toLowerCase();
  if (data[fieldName]) return data[fieldName];
  if (data[lowerFieldName]) return data[lowerFieldName];
  if (data[`q_${lowerFieldName}`]) return data[`q_${lowerFieldName}`];
  if (data[`q${fieldName}`]) return data[`q${fieldName}`];
  if (data[`q[${lowerFieldName}]`]) return data[`q[${lowerFieldName}]`];
  const camelCase = fieldName.charAt(0).toLowerCase() + fieldName.slice(1);
  if (data[camelCase]) return data[camelCase];
  const snakeCase = fieldName.replace(/([A-Z])/g, "_$1").toLowerCase();
  if (data[snakeCase]) return data[snakeCase];
  if (data[`q_${snakeCase}`]) return data[`q_${snakeCase}`];
  for (const [key, value] of Object.entries(data)) {
    const keyLower = key.toLowerCase().replace(/[q_[\]]/g, "");
    if (keyLower.includes(lowerFieldName) || lowerFieldName.includes(keyLower)) {
      if (value && value !== "") return value;
    }
  }
  return null;
}
__name(findFieldValue2, "findFieldValue");
function fixLocationValue2(location) {
  if (!location) return location;
  const normalized = location.trim().toLowerCase();
  console.log(`Location received: ${location} \u2192 normalized: ${normalized}`);
  return normalized;
}
__name(fixLocationValue2, "fixLocationValue");
function getDatabaseId2(location) {
  const location_lower = location.trim().toLowerCase();
  const databaseMap = {
    // Exact values from form dropdown
    manchester: "manchester_eu_1",
    boston: "boston_us_1",
    mumbai: "mumbai_asia_1",
    saopaulo: "saopaulo_br_1",
    meppel: "meppel_eu_1"
  };
  if (databaseMap[location_lower]) {
    return databaseMap[location_lower];
  }
  const dbId = location_lower.replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
  return `${dbId}_db_1`;
}
__name(getDatabaseId2, "getDatabaseId");

// _middleware.ts
async function onRequest3(context) {
  const url = new URL(context.request.url);
  if (url.pathname.match(/\.[a-z0-9]+$/i)) {
    return context.next();
  }
  const response = await context.env.ASSETS.fetch(new URL("/index.html", url.origin));
  return new Response(response.body, {
    ...response,
    headers: {
      ...Object.fromEntries(response.headers),
      "Content-Type": "text/html;charset=UTF-8"
    }
  });
}
__name(onRequest3, "onRequest");

// ../.wrangler/tmp/pages-dJYjxh/functionsRoutes-0.06324681262003673.mjs
var routes = [
  {
    routePath: "/api/webhook-transformer",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest]
  },
  {
    routePath: "/webhook-transformer",
    mountPath: "/",
    method: "",
    middlewares: [],
    modules: [onRequest2]
  },
  {
    routePath: "/",
    mountPath: "/",
    method: "",
    middlewares: [onRequest3],
    modules: []
  }
];

// C:/Users/branm/AppData/Roaming/npm/node_modules/wrangler/node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");

// C:/Users/branm/AppData/Roaming/npm/node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");
export {
  pages_template_worker_default as default
};
