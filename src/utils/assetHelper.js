/**
 * Asset URL helper for Vite base path resolution.
 * Automatically prepends import.meta.env.BASE_URL (e.g. '/portfolio/')
 * so static assets in /public load correctly on GitHub Pages and local environments.
 */
export function getAssetUrl(path) {
  if (!path) return "";
  // If already absolute external URL, return as is
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  const baseUrl = import.meta.env.BASE_URL || "/";
  // Remove leading slash if any to avoid double slash
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${baseUrl}${cleanPath}`;
}
