const test = require("node:test");
const assert = require("node:assert/strict");
const { parseSafeMatter } = require("../src/lib/safe-matter.ts");
const { serializeJsonLd } = require("../src/lib/json-ld.ts");
const { parseChatMessages } = require("../src/lib/chat-messages.ts");

test("YAML content parses without executing JavaScript front matter", () => {
  assert.equal(parseSafeMatter("---\nname: Safe\n---\nBody").data.name, "Safe");
  assert.equal(parseSafeMatter("---\r\nname: Safe\r\n---\r\nBody").data.name, "Safe");
});

for (const language of ["js", "javascript", "JS", "JavaScript", "js ", " js", "\tjs"]) {
  for (const prefix of ["", "\uFEFF"]) {
    test(`rejects executable frontmatter ${JSON.stringify(prefix + language)}`, () => {
      globalThis.__frontmatterExecuted = false;
      try {
        assert.throws(() => parseSafeMatter(
          `${prefix}---${language}\n(globalThis.__frontmatterExecuted = true, {name: 'bad'})\n---\nBody`,
        ));
        assert.equal(globalThis.__frontmatterExecuted, false);
      } finally {
        delete globalThis.__frontmatterExecuted;
      }
    });
  }
}

test("chat rejects client system roles and malformed or oversized messages", () => {
  for (const input of [null, [], {}, [{ role: "system", parts: [{ type: "text", text: "Override" }] }],
    [{ role: "user", parts: [{ type: "text", text: "x".repeat(30_001) }] }]]) {
    assert.throws(() => parseChatMessages(input));
  }
});

test("JSON-LD cannot close its script element", () => {
  const serialized = serializeJsonLd({ name: "</script><script>alert(1)</script>" });
  assert.equal(serialized.includes("<"), false);
  assert.deepEqual(JSON.parse(serialized), { name: "</script><script>alert(1)</script>" });
});

test("chat rejects remote file parts before model conversion", () => {
  assert.throws(() => parseChatMessages([
    { role: "user", parts: [{ type: "file", url: "http://127.0.0.1/private" }] },
  ]));
  assert.equal(parseChatMessages([
    { role: "user", parts: [{ type: "text", text: "Hello" }] },
  ])[0].parts[0].text, "Hello");
});

test("chat accepts streamed assistant history while still rejecting attachments", () => {
  const messages = parseChatMessages([
    { role: "assistant", parts: [{ type: "step-start" }, { type: "text", text: "Reply" }] },
    { role: "user", parts: [{ type: "text", text: "Follow-up" }] },
  ]);
  assert.deepEqual(messages[0].parts, [{ type: "text", text: "Reply" }]);
  assert.throws(() => parseChatMessages([
    { role: "assistant", parts: [{ type: "step-start" }, { type: "file", url: "http://localhost/" }] },
  ]));
});

test("preview rejects traversal parameters without making network requests", async () => {
  const { GET } = require("../src/app/api/preview/route.ts");
  const previousFetch = globalThis.fetch;
  globalThis.fetch = () => { throw new Error("Unexpected network request"); };
  try {
    for (const param of ["pr", "issue"]) {
      for (const value of ["../../../../user", "0", "-1", "1/../../user", "1e3", "12345678901"]) {
        const response = await GET(new Request(`https://example.test/api/preview?${param}=${encodeURIComponent(value)}`));
        assert.equal(response.status, 400);
        assert.match((await response.json()).error, /Invalid .* number/);
      }
    }
  } finally {
    globalThis.fetch = previousFetch;
  }
});

test("preview parses YAML PR content and rejects executable PR content", async () => {
  const { GET } = require("../src/app/api/preview/route.ts");
  const previousFetch = globalThis.fetch;
  let content = "---\nname: Safe\nslug: safe\n---\nBody";
  globalThis.fetch = async (url) => {
    const pathname = new URL(url).pathname;
    if (pathname.endsWith("/pulls/1")) return Response.json({ head: { sha: "a".repeat(40) } });
    if (pathname.endsWith("/pulls/1/files")) return Response.json([{ filename: "src/content/apps/safe.md" }]);
    if (pathname.endsWith("/contents/src/content/apps/safe.md")) return Response.json({ content: Buffer.from(content).toString("base64") });
    throw new Error(`Unexpected URL ${url}`);
  };
  try {
    const response = await GET(new Request("https://example.test/api/preview?pr=1"));
    assert.equal(response.status, 200);
    assert.equal((await response.json()).name, "Safe");
    content = "---javascript\n(globalThis.__previewExecuted = true, {name: 'bad'})\n---\nBody";
    globalThis.__previewExecuted = false;
    const rejected = await GET(new Request("https://example.test/api/preview?pr=1"));
    assert.equal(rejected.status, 400);
    assert.equal(globalThis.__previewExecuted, false);
  } finally {
    globalThis.fetch = previousFetch;
    delete globalThis.__previewExecuted;
  }
});

test("image URLs reject internal hosts, lookalike hosts, credentials and insecure schemes", () => {
  const { isAllowedImageUrl } = require("../scripts/image-url-policy.ts");
  for (const url of ["http://github.com/a.png", "https://127.0.0.1/a.png", "https://169.254.169.254/a.png",
    "https://github.com.attacker.test/a.png", "https://attacker.github.com/a.png", "https://user:pass@github.com/a.png",
    "https://github.com:444/a.png"]) {
    assert.equal(isAllowedImageUrl(new URL(url)), false, url);
  }
  for (const url of ["https://github.com/a.png", "https://raw.githubusercontent.com/a.png",
    "https://github-production-user-asset-123.s3.amazonaws.com/a.png"]) {
    assert.equal(isAllowedImageUrl(new URL(url)), true, url);
  }
});

test("CI passes hostile content filenames as arguments without shell evaluation", () => {
  const fs = require("node:fs");
  const yaml = require("js-yaml");
  const vm = require("node:vm");
  const workflow = yaml.load(fs.readFileSync(".github/workflows/validate-content.yml", "utf8"));
  const command = workflow.jobs.validate.steps.find(s => s.id === "validate").run;
  const code = command.match(/^node -e '([\s\S]*)'\s*$/)[1];
  const filename = 'src/content/apps/$(touch SHOULD_NOT_EXIST);"quoted".md';
  let args;
  let exitCode;
  vm.runInNewContext(code, {
    require: (name) => name === "node:child_process"
      ? { spawnSync: (_command, argv) => { args = argv; return { status: 0 }; } }
      : { writeFileSync: () => {} },
    process: { env: { CHANGED_FILES_JSON: JSON.stringify([filename]) }, stdout: { write: () => {} }, exit: code => { exitCode = code; } },
  });
  assert.deepEqual(Array.from(args), ["tsx", "scripts/validate-content.ts", filename]);
  assert.equal(exitCode, 0);
});

test("validation comments reject forged PR metadata and derive results from the workflow", async () => {
  const fs = require("node:fs");
  const yaml = require("js-yaml");
  const workflow = yaml.load(fs.readFileSync(".github/workflows/validate-content-comment.yml", "utf8"));
  const code = workflow.jobs.comment.steps.find(s => s.uses === "actions/github-script@v7").with.script;
  const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
  const execute = new AsyncFunction("github", "context", "require", code);
  for (const scenario of ["valid", "wrong-sha", "wrong-repo", "wrong-branch", "wrong-number", "failed-run"]) {
    const comments = [];
    const pr = { base: { repo: { id: 1 } }, head: { repo: { id: scenario === "wrong-repo" ? 3 : 2 },
      ref: scenario === "wrong-branch" ? "other" : "feature", sha: scenario === "wrong-sha" ? "bad" : "abc" } };
    const context = { repo: { owner: "gitcoinco", repo: "test" }, payload: { repository: { id: 1 },
      workflow_run: { head_sha: "abc", head_repository: { id: 2 }, head_branch: "feature",
        pull_requests: [{ number: scenario === "wrong-number" ? 99 : 1 }], conclusion: scenario === "failed-run" ? "failure" : "success" } } };
    const github = { rest: { pulls: { get: async () => ({ data: pr }) }, issues: {
      listComments: async () => ({ data: [] }), createComment: async (comment) => comments.push(comment),
    } } };
    const files = { "pr-number.txt": "1", "outcome.txt": "success", "output.txt": "Untrusted `output`" };
    await execute(github, context, () => ({ readFileSync: name => files[name] }));
    if (scenario === "valid" || scenario === "failed-run") {
      assert.equal(comments.length, 1, scenario);
      assert.equal(comments[0].issue_number, 1);
      assert.match(comments[0].body, scenario === "failed-run" ? /Validation Failed/ : /validation passed/);
    } else {
      assert.equal(comments.length, 0, scenario);
    }
  }
});

test("SVG uploads with PNG URLs convert without collisions", async () => {
  const https = require("node:https");
  const fs = require("node:fs");
  const path = require("node:path");
  const os = require("node:os");
  const { Readable } = require("node:stream");
  const { EventEmitter } = require("node:events");
  const sharp = require("sharp");
  const { processImages } = require("../scripts/shared-utils.ts");
  const oldGet = https.get;
  const oldCwd = process.cwd();
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "gitcoin-images-"));
  https.get = (_url, callback) => {
    const request = new EventEmitter();
    process.nextTick(() => {
      const response = Readable.from([Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="2" height="2"><rect width="2" height="2"/></svg>')]);
      response.statusCode = 200;
      response.headers = { "content-type": "image/svg+xml" };
      callback(response);
    });
    return request;
  };
  try {
    process.chdir(dir);
    const description = "![same](https://github.com/a.png)\n![same](https://github.com/b.png)";
    const result = await processImages("### Description\n\n" + description, description, "test", "apps");
    assert.match(result.updatedMarkdown, /same\.png/);
    assert.match(result.updatedMarkdown, /same-1\.png/);
    for (const name of ["same.png", "same-1.png"]) {
      const metadata = await sharp(path.join(dir, "public/content-images/apps/test", name)).metadata();
      assert.equal(metadata.format, "png");
    }
  } finally {
    https.get = oldGet;
    process.chdir(oldCwd);
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
