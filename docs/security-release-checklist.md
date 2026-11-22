# Security hardening release checklist

Merging the code does not complete incident response. The deployment owner should
record the production deployment URL, commit SHA, and the results below in the
private incident tracker. Keep credentials, logs, and reporter information private.

## Immediately after merge

1. Confirm the production deployment has finished and serves the merged commit.
   If deployment is blocked, temporarily disable the public preview endpoint until
   the fix is live.
2. Replace potentially exposed GitHub and OpenAI credentials at their providers,
   update every affected deployment environment, redeploy, and revoke the old
   credentials promptly. Give the replacement GitHub token only the repository
   access the application needs. Review other secrets available to the affected
   serverless function as well.
3. Review OpenAI vector-store access and contents. A vector-store ID is an identifier,
   not an authentication credential; replacing the API key is essential. Recreate
   a store only if the access/data review calls for it.
4. Close the known public proof-of-concept PRs listed in the private bounty report
   once the fix is deployed. Closing a PR does not remove the need to deploy or
   rotate credentials.

## Verify production

- A malformed issue or PR number sent to `/api/preview` returns HTTP 400.
- A normal YAML content preview still works. Test JavaScript-frontmatter rejection
  in a controlled preview deployment using a harmless fixture; do not execute the
  public exploit against production.
- The homepage and a content detail page load normally, with valid JSON-LD.
- An existing `/content-images/...svg` URL receives `Content-Security-Policy:
  sandbox`, `Content-Disposition: attachment`, and `X-Content-Type-Options: nosniff`.
- Text chat still works, including a follow-up after an assistant response.
- Check `/research` for the availability problem reported separately. A successful
  local build does not establish production availability.
- Confirm the new security regression workflow passes. The privileged validation
  comment workflow must also be checked after merge, since `workflow_run` uses the
  workflow definition on the default branch. Verify one passing content PR and
  one failing content PR get the correct comments.

## Incident follow-through

- Preserve and review hosting, GitHub, and OpenAI access/activity logs, API usage,
  unexpected charges, and changes made with the exposed credentials. Investigate
  possible data access; a clean code deployment cannot establish whether prior
  compromise occurred.
- Have the Beacon service owner address the separately reported production and
  staging SSRF. This repository does not contain that service's implementation.
- Have the Survey service owner validate monetary/session fields and identify and
  remove the test rows listed in the private report.

## Urgent follow-up work outside this PR

- Enforce team-only publishing fields, protect existing author links, reject slug
  collisions, use a YAML serializer, and make publishing validation mandatory.
- Confine Markdown and OG-image file reads to their intended directories.
- Fix the search redirect backslash bypass and introduce a tested site-wide CSP.
- Review the generator proxy, Brain OAuth registration, stale DNS records, and
  Metabase deployment with their owners.

This PR adds a CSP for stored SVG assets only. It does not add a site-wide CSP,
per-IP chat rate limiting, an OpenAI spending cap, or the separate service fixes.
