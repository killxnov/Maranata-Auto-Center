type DeploymentEnvironment = {
  NODE_ENV?: string;
  VERCEL?: string;
  VERCEL_ENV?: string;
  VERCEL_TARGET_ENV?: string;
};

export function allowsIndexing(env: DeploymentEnvironment, siteUrl: string): boolean {
  if (env.NODE_ENV && env.NODE_ENV !== "production") return false;
  const deployment = env.VERCEL_TARGET_ENV || env.VERCEL_ENV;
  // Preview/custom environments take precedence over NODE_ENV=production.
  if (
    deployment ? deployment !== "production" : env.VERCEL === "1" || env.NODE_ENV !== "production"
  )
    return false;
  const url = new URL(siteUrl);
  return url.protocol === "https:" && !/^(localhost|127\.|\[::1\])/.test(url.hostname);
}
