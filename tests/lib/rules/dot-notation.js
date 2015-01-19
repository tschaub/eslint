/**
 * @fileoverview Tests for dot-notation rule.
 * @author Josh Perez
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslint = require("../../../lib/eslint"),
    ESLintTester = require("eslint-tester");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest("lib/rules/dot-notation", {
    valid: [
        "a.b;",
        "a.b.c;",
        "a['12'];",
        "a[b];",
        "a[0];",
        { code: "a.b.c;", args: [2, {allowKeywords: false}] },
        { code: "a[0];", args: [2, {allowKeywords: false}] },
        { code: "a['while'];", args: [2, {allowKeywords: false}] },
        { code: "a['true'];", args: [2, {allowKeywords: false}] },
        { code: "a['null'];", args: [2, {allowKeywords: false}] },
        { code: "a[true];", args: [2, {allowKeywords: false}] },
        { code: "a[null];", args: [2, {allowKeywords: false}] },
        { code: "a.true;", args: [2, {allowKeywords: true}] },
        { code: "a.null;", args: [2, {allowKeywords: true}] },
        { code: "a['snake_case'];", args: [2, {allowSnakeCase: true}] },
        { code: "a['Ugly_case'];", args: [2, {allowSnakeCase: true}] },
        { code: "a['a_long_word'];", args: [2, {allowSnakeCase: true}] },
        "a.true;",
        "a.null;",
        "a[undefined];",
        "a[void 0];",
        "a[b()];"
    ],
    invalid: [
        { code: "a.true;", args: [2, {allowKeywords: false}], errors: [{ message: ".true is a syntax error." }] },
        { code: "a['true'];", errors: [{ message: "[\"true\"] is better written in dot notation." }] },
        { code: "a[null];", errors: [{ message: "[null] is better written in dot notation." }] },
        { code: "a['b'];", errors: [{ message: "[\"b\"] is better written in dot notation." }] },
        { code: "a.b['c'];", errors: [{ message: "[\"c\"] is better written in dot notation." }] },
        { code: "a['_dangle'];", args: [2, {allowSnakeCase: true}], errors: [{ message: "[\"_dangle\"] is better written in dot notation." }] }
    ]
});
