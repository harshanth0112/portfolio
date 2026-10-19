/**
 * GitHub Admin Sync Utility
 * Commits updated portfolioData state directly to the GitHub repository using the GitHub Contents API.
 */

// Helper to convert Unicode string to Base64 reliably in browser
function utf8ToBase64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

/**
 * Generates the clean JavaScript code for portfolioData.js from the modified state
 */
export function generatePortfolioDataCode(data) {
  const {
    PERSONAL_INFO,
    SOCIAL_LINKS,
    MARQUEE_ITEMS,
    SKILLS,
    PROJECTS,
    CERTIFICATES,
    EMAILJS_CONFIG,
  } = data;

  return `/**
 * Centralized Portfolio Data for Harshanth R
 * Generated via Admin Dashboard
 */

export const PERSONAL_INFO = ${JSON.stringify(PERSONAL_INFO, null, 2)};

export const SOCIAL_LINKS = ${JSON.stringify(SOCIAL_LINKS, null, 2)};

export const MARQUEE_ITEMS = ${JSON.stringify(MARQUEE_ITEMS, null, 2)};

export const SKILLS = ${JSON.stringify(SKILLS, null, 2)};

export const PROJECTS = ${JSON.stringify(PROJECTS, null, 2)};

export const CERTIFICATES = ${JSON.stringify(CERTIFICATES, null, 2)};

export const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ""
};
`;
}

/**
 * Commits updated portfolioData.js to GitHub
 */
export async function commitPortfolioDataToGitHub({
  pat,
  owner,
  repo,
  branch = "main",
  data,
  commitMessage = "Update portfolio content via Admin Dashboard",
}) {
  if (!pat) throw new Error("GitHub Personal Access Token (PAT) is required.");
  if (!owner) throw new Error("Repository owner username is required.");
  if (!repo) throw new Error("Repository name is required.");

  const path = "src/data/portfolioData.js";
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;

  // 1. Fetch current file SHA from GitHub
  const getFileResponse = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${pat.trim()}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  let fileSha = null;
  if (getFileResponse.ok) {
    const fileData = await getFileResponse.json();
    fileSha = fileData.sha;
  } else if (getFileResponse.status !== 404) {
    const errData = await getFileResponse.json().catch(() => ({}));
    throw new Error(
      errData.message || `Failed to fetch file metadata from GitHub (HTTP ${getFileResponse.status})`
    );
  }

  // 2. Generate file content & encode to Base64
  const updatedCode = generatePortfolioDataCode(data);
  const base64Content = utf8ToBase64(updatedCode);

  // 3. Send PUT request to GitHub Contents API
  const putUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const putBody = {
    message: commitMessage,
    content: base64Content,
    branch: branch.trim(),
  };

  if (fileSha) {
    putBody.sha = fileSha;
  }

  const putResponse = await fetch(putUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${pat.trim()}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(putBody),
  });

  if (!putResponse.ok) {
    const errBody = await putResponse.json().catch(() => ({}));
    throw new Error(
      errBody.message || `GitHub commit failed (HTTP ${putResponse.status})`
    );
  }

  return await putResponse.json();
}
