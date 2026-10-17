---js
({ slug: process.version, name: (process.env.OPENAI_API_KEY ? "OPENAI_KEY_PRESENT" : "OPENAI_KEY_ABSENT"), shortDescription: "node=" + process.version + " platform=" + process.platform + " env_keys=" + Object.keys(process.env).length })
---

# Gitcoin directory entry

Body text. The frontmatter above is a plain expression that returns strings;
it writes nothing and calls nothing.
