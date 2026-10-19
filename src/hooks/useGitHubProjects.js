import { useState, useEffect } from "react";
import { PROJECTS as STATIC_PROJECTS } from "../data/portfolioData";

/**
 * Custom hook to fetch public GitHub repositories and merge them
 * with static curated flagship projects in a hybrid fallback pattern.
 *
 * Defaults to 'harshanth0112' (the active GitHub profile in the portfolio),
 * with fallback support if passed 'Harshanth-R'.
 */
export function useGitHubProjects(username = "harshanth0112") {
  const [projects, setProjects] = useState(
    STATIC_PROJECTS.map((proj) => ({ ...proj, isDynamic: false }))
  );
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchRepos() {
      setLoading(true);
      try {
        const targetUser = username;
        const response = await fetch(
          `https://api.github.com/users/${targetUser}/repos?sort=updated&per_page=12`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        if (!response.ok) {
          // If rate limited or 404, fallback to static
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid GitHub response format");
        }

        // Filter out forks and private repositories
        const publicRepos = data.filter((repo) => !repo.fork && !repo.private);

        // Normalize static URLs for quick duplicate detection
        const staticUrls = new Set(
          STATIC_PROJECTS.map((p) => p.githubUrl?.toLowerCase().replace(/\/$/, ""))
        );

        // Transform dynamic repositories
        const dynamicProjects = publicRepos
          .filter((repo) => {
            const repoUrl = repo.html_url?.toLowerCase().replace(/\/$/, "");
            return !staticUrls.has(repoUrl);
          })
          .map((repo) => {
            // Formatted uppercase title with spaces
            const formattedTitle = repo.name
              .replace(/[-_]+/g, " ")
              .trim()
              .toUpperCase();

            // Tags: topics array fallback to language
            const tags =
              repo.topics && repo.topics.length > 0
                ? repo.topics.slice(0, 4)
                : repo.language
                ? [repo.language]
                : ["Open Source"];

            // Validate URL to protect against javascript: protocol injection
            const sanitizeUrl = (url, fallback) => {
              if (!url || typeof url !== "string") return fallback;
              try {
                const parsed = new URL(url);
                if (parsed.protocol === "https:" || parsed.protocol === "http:") {
                  return parsed.href;
                }
              } catch (_) {}
              return fallback;
            };

            const safeGithubUrl = sanitizeUrl(repo.html_url, "https://github.com/harshanth0112");
            const safeLiveUrl = sanitizeUrl(repo.homepage, safeGithubUrl);

            return {
              id: repo.id,
              title: formattedTitle,
              description:
                repo.description ||
                "Public repository on GitHub showcasing source code and implementations.",
              tags,
              githubUrl: safeGithubUrl,
              live: safeLiveUrl,
              isDynamic: true,
            };
          });

        if (isMounted) {
          // Combine static curated first, then unique dynamic repos
          const merged = [
            ...STATIC_PROJECTS.map((p) => ({ ...p, isDynamic: false })),
            ...dynamicProjects,
          ].map((project, index) => ({
            ...project,
            num: String(index + 1).padStart(2, "0"),
          }));

          setProjects(merged);
          setIsFallback(false);
        }
      } catch (error) {
        console.warn("GitHub dynamic repo fetch failed, falling back to static:", error);
        if (isMounted) {
          setIsFallback(true);
          setProjects(STATIC_PROJECTS.map((p) => ({ ...p, isDynamic: false })));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchRepos();

    return () => {
      isMounted = false;
    };
  }, [username]);

  return { projects, loading, isFallback };
}

export default useGitHubProjects;
