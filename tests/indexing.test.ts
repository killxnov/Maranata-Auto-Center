import assert from "node:assert/strict";
import test from "node:test";
import { allowsIndexing } from "../src/lib/indexing.ts";

const url = "https://maranata-autocenter.vercel.app";
test("only public production allows indexing, including Vercel environment precedence", () => {
  assert.equal(allowsIndexing({ NODE_ENV: "production" }, url), true);
  assert.equal(allowsIndexing({ NODE_ENV: "development" }, url), false);
  assert.equal(allowsIndexing({ NODE_ENV: "development", VERCEL_ENV: "production" }, url), false);
  assert.equal(allowsIndexing({ NODE_ENV: "production", VERCEL_ENV: "preview" }, url), false);
  assert.equal(allowsIndexing({ NODE_ENV: "production", VERCEL_ENV: "development" }, url), false);
  assert.equal(allowsIndexing({ VERCEL_ENV: "production" }, url), true);
  assert.equal(
    allowsIndexing({ VERCEL_ENV: "production", VERCEL_TARGET_ENV: "staging" }, url),
    false,
  );
  assert.equal(allowsIndexing({ NODE_ENV: "production", VERCEL: "1" }, url), false);
  assert.equal(allowsIndexing({ NODE_ENV: "production" }, "http://localhost:3000"), false);
});
