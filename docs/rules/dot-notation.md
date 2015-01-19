# Require Dot Notation (dot-notation)

In JavaScript, one can access properties using the dot notation (`foo.bar`) or square-bracket notation (`foo["bar"]`). However, the dot notation is often preferred because it is easier to read, less verbose, and works better with aggressive JavaScript minimizers.

```js
foo["bar"];
```

## Rule Details

This rule is aimed at maintaining code consistency and improving code readability by encouraging use of the dot notation style whenever possible. As such, it will warn when it encounters an unnecessary use of square-bracket notation.

The following patterns are considered warnings:

```js
var x = foo["bar"];
```

The following patterns are not considered warnings:

```js
var x = foo.bar;

var x = foo[bar];    // Property name is a variable, square-bracket notation required
```

### Options

This rule accepts a single options argument with the following defaults:
```js
{
    "rules": {
        "dot-notation": [2, {"allowKeywords": true, "allowSnakeCase": false}]
    }
}
```

#### `allowKeywords`

Set the `allowKeywords` option to `false` (default is `true`) to follow ECMAScript version 3 compatible style, avoiding dot notation for reserved word properties.

```
  "dot-notation": [2, {"allowKeywords": false}],
```

```js
var foo = { "class": "CS 101" }
var x = foo["class"]; // Property name is a reserved word, square-bracket notation required
```

#### `allowSnakeCase`

Set the `allowSnakeCase` option to `true` (default is `false`) to allow bracket notation for [snake cased](http://en.wikipedia.org/wiki/Snake_case) properties.  When preparing data to be sent to an external API, it is often required to use property names that include underscores.  This option can be used in conjunction with the `camelcase` rule to enforce that brackets are only used when assigning to snake cased properties.

Example configuration:
```js
{
    "rules": {
        "camelcase": 2
        "dot-notation": [2, {"allowSnakeCase": true}]
    }
}
```

Example code patterns:
```js
var data = {};
data.foo_bar = 42; // warning from camelcase

var data = {};
data["fooBar"] = 42; // warning from dot-notation

var data = {};
data["foo_bar"] = 42; // no warning
```
