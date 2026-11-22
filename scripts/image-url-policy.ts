const IMAGE_HOSTS = [
  "github.com",
  "user-images.githubusercontent.com",
  "raw.githubusercontent.com",
  "objects.githubusercontent.com",
  "avatars.githubusercontent.com",
];

export function isAllowedImageUrl(url: URL): boolean {
  return url.protocol === "https:" && !url.username && !url.password &&
    (!url.port || url.port === "443") &&
    (IMAGE_HOSTS.includes(url.hostname) ||
      /^github-production-[a-z0-9-]+\.s3\.amazonaws\.com$/.test(url.hostname));
}
