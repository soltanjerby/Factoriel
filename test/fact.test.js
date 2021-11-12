/* eslint-disable no-undef */
const assert = require("assert");
const fact = require("../fact");

describe("Simple Factoriel Test", () => {
  it("should return 120", () => {
    assert.equal(fact.factoriel(5), 120);
  });
  it("should return 1", () => {
    assert.equal(fact.factoriel(0), 1);
  });
  it("should return -1", () => {
    assert.equal(fact.factoriel(-5), -1);
  });
});
