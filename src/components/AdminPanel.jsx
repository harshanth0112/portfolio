import React, { useState, useEffect } from "react";
import {
  X,
  Lock,
  Unlock,
  Save,
  GitCommit,
  CheckCircle2,
  AlertCircle,
  Loader2,
  User,
  Share2,
  Cpu,
  FolderGit2,
  Award,
  Settings,
  Plus,
  Trash2,
  KeyRound,
  Download,
} from "lucide-react";
import * as InitialData from "../data/portfolioData";
import { generatePortfolioDataCode } from "../utils/githubAdminSync";

export default function AdminPanel({ isOpen, onClose }) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  // Active Tab: 'profile' | 'social' | 'skills' | 'projects' | 'certs' | 'github'
  const [activeTab, setActiveTab] = useState("profile");

  // Editable Portfolio State (deep-cloned from InitialData)
  const [data, setData] = useState(() => JSON.parse(JSON.stringify(InitialData)));

  // Syncing state
  const [syncStatus, setSyncStatus] = useState("idle"); // idle | syncing | success | error
  const [syncMessage, setSyncMessage] = useState("");

  // Check persistent session on mount
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem("hr_admin_session");
    if (sessionAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Save GH config to localStorage on change
  const handleGhConfigChange = (key, val) => {
    const updated = { ...ghConfig, [key]: val };
    setGhConfig(updated);
    localStorage.setItem(`hr_gh_${key}`, val);
  };

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";
    if (passwordInput === adminPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem("hr_admin_session", "true");
      setAuthError("");
    } else {
      setAuthError("Incorrect password. Please verify your VITE_ADMIN_PASSWORD.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("hr_admin_session");
  };

  // Download modified portfolioData.js directly
  const handleDownloadDataFile = () => {
    const code = generatePortfolioDataCode(data);
    const blob = new Blob([code], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "portfolioData.js";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[3000] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-10 animate-fadeIn"
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-dialog-title"
        className="bg-surface border border-border rounded-lg w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative"
      >
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-accent/10 border border-accent/40 flex items-center justify-center text-accent" aria-hidden="true">
              {isAuthenticated ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </div>
            <div>
              <h2 id="admin-dialog-title" className="font-display text-xl tracking-wider text-[#F0EDE8]">
                ADMIN CONTROL PANEL
              </h2>
              <p className="font-mono text-xs text-muted">
                {isAuthenticated ? "Live Portfolio Content Management & GitHub Sync" : "Authentication Required"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="text-xs font-mono text-muted hover:text-white uppercase transition-colors"
              >
                Logout
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded hover:bg-surface3 text-muted hover:text-accent transition-colors"
              aria-label="Close Admin Panel"
              title="Close Panel"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Sync Status Banner */}
        {syncStatus === "success" && (
          <div className="px-6 py-3 bg-accent/10 border-b border-accent/40 text-accent font-mono text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{syncMessage}</span>
          </div>
        )}
        {syncStatus === "error" && (
          <div className="px-6 py-3 bg-red-500/10 border-b border-red-500/40 text-red-400 font-mono text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{syncMessage}</span>
          </div>
        )}

        {/* Main Content Area */}
        {!isAuthenticated ? (
          /* Login Screen */
          <div className="flex-1 p-8 sm:p-12 flex flex-col items-center justify-center max-w-md mx-auto w-full">
            <div className="w-14 h-14 rounded-full bg-surface2 border border-border flex items-center justify-center text-accent mb-6">
              <KeyRound className="w-7 h-7" />
            </div>
            <h3 className="font-display text-2xl tracking-wide text-[#F0EDE8] mb-2 text-center">
              ACCESS PROTECTED
            </h3>
            <p className="font-mono text-xs text-muted text-center mb-6 leading-relaxed">
              Enter your master administrative password to unlock content configuration and repository synchronization.
            </p>

            <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
              <div className="relative">
                <input
                  type="password"
                  placeholder="Master Password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-surface2 border border-border focus:border-accent text-sm font-mono px-4 py-3 text-[#F0EDE8] rounded-sm focus:outline-none"
                  autoFocus
                />
              </div>

              {authError && (
                <div className="text-red-400 text-xs font-mono flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-accent text-black font-mono text-xs uppercase tracking-widest font-semibold rounded-sm hover:shadow-[0_0_15px_rgba(200,255,0,0.4)] transition-all"
              >
                Unlock Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-56 bg-surface2/60 border-r border-border p-4 flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto">
              {[
                { id: "profile", label: "Profile & Bio", icon: User },
                { id: "social", label: "Social Links", icon: Share2 },
                { id: "skills", label: "Skills", icon: Cpu },
                { id: "projects", label: "Projects", icon: FolderGit2 },
                { id: "certs", label: "Certificates", icon: Award },
                { id: "github", label: "Export Data", icon: Download },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-sm font-mono text-xs uppercase tracking-wider transition-all whitespace-nowrap text-left ${
                      isActive
                        ? "bg-accent text-black font-semibold shadow-sm"
                        : "text-muted hover:text-white hover:bg-surface"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}

              <div className="mt-auto hidden md:block pt-4 border-t border-border">
                <button
                  onClick={handleDownloadDataFile}
                  className="w-full py-2.5 px-3 bg-accent text-black font-mono text-[11px] uppercase tracking-wider font-semibold rounded-sm transition-all flex items-center justify-center gap-1.5 hover:shadow-[0_0_12px_rgba(200,255,0,0.4)] cursor-pointer"
                  title="Download updated portfolioData.js"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Data File</span>
                </button>
              </div>
            </aside>

            {/* Tab Panels */}
            <div className="flex-1 p-6 md:p-8 overflow-y-auto bg-surface/50">
              
              {/* TAB 1: Profile & Bio */}
              {activeTab === "profile" && (
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <h3 className="font-display text-2xl tracking-wide text-[#F0EDE8]">
                      PROFILE &amp; HEADLINE
                    </h3>
                    <p className="font-mono text-xs text-muted">
                      Modify hero banner headlines, status pill, and about biography.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-muted mb-1.5">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={data.PERSONAL_INFO.firstName}
                        onChange={(e) =>
                          setData({
                            ...data,
                            PERSONAL_INFO: { ...data.PERSONAL_INFO, firstName: e.target.value },
                          })
                        }
                        className="w-full bg-surface2 border border-border text-sm font-mono p-2.5 text-[#F0EDE8] rounded-sm focus:border-accent focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-muted mb-1.5">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={data.PERSONAL_INFO.lastName}
                        onChange={(e) =>
                          setData({
                            ...data,
                            PERSONAL_INFO: { ...data.PERSONAL_INFO, lastName: e.target.value },
                          })
                        }
                        className="w-full bg-surface2 border border-border text-sm font-mono p-2.5 text-[#F0EDE8] rounded-sm focus:border-accent focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-muted mb-1.5">
                      Hero Tags Line
                    </label>
                    <input
                      type="text"
                      value={data.PERSONAL_INFO.heroTags}
                      onChange={(e) =>
                        setData({
                          ...data,
                          PERSONAL_INFO: { ...data.PERSONAL_INFO, heroTags: e.target.value },
                        })
                      }
                      className="w-full bg-surface2 border border-border text-sm font-mono p-2.5 text-[#F0EDE8] rounded-sm focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-muted mb-1.5">
                      Hero Description
                    </label>
                    <textarea
                      rows={3}
                      value={data.PERSONAL_INFO.heroDescription}
                      onChange={(e) =>
                        setData({
                          ...data,
                          PERSONAL_INFO: { ...data.PERSONAL_INFO, heroDescription: e.target.value },
                        })
                      }
                      className="w-full bg-surface2 border border-border text-sm font-mono p-2.5 text-[#F0EDE8] rounded-sm focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-muted mb-1.5">
                      About Paragraphs (Line by Line)
                    </label>
                    <textarea
                      rows={4}
                      value={data.PERSONAL_INFO.aboutParagraphs.join("\n\n")}
                      onChange={(e) =>
                        setData({
                          ...data,
                          PERSONAL_INFO: {
                            ...data.PERSONAL_INFO,
                            aboutParagraphs: e.target.value.split("\n\n").filter(Boolean),
                          },
                        })
                      }
                      className="w-full bg-surface2 border border-border text-sm font-mono p-2.5 text-[#F0EDE8] rounded-sm focus:border-accent focus:outline-none"
                    />
                  </div>

                  {/* Stats */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-muted mb-2">
                      Stats Counters
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {data.PERSONAL_INFO.stats.map((stat, i) => (
                        <div key={i} className="p-3 bg-surface2 border border-border rounded-sm">
                          <input
                            type="text"
                            value={stat.label}
                            onChange={(e) => {
                              const newStats = [...data.PERSONAL_INFO.stats];
                              newStats[i].label = e.target.value;
                              setData({
                                ...data,
                                PERSONAL_INFO: { ...data.PERSONAL_INFO, stats: newStats },
                              });
                            }}
                            className="w-full bg-transparent text-[11px] font-mono text-muted uppercase mb-1 focus:outline-none"
                          />
                          <input
                            type="number"
                            value={stat.target}
                            onChange={(e) => {
                              const newStats = [...data.PERSONAL_INFO.stats];
                              newStats[i].target = Number(e.target.value);
                              setData({
                                ...data,
                                PERSONAL_INFO: { ...data.PERSONAL_INFO, stats: newStats },
                              });
                            }}
                            className="w-full bg-transparent text-lg font-display text-accent focus:outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Social Links */}
              {activeTab === "social" && (
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <h3 className="font-display text-2xl tracking-wide text-[#F0EDE8]">
                      SOCIAL &amp; CONTACT CHANNELS
                    </h3>
                    <p className="font-mono text-xs text-muted">
                      Update external profile links and direct contact details.
                    </p>
                  </div>

                  {Object.entries(data.SOCIAL_LINKS).map(([key, val]) => (
                    <div key={key} className="p-4 bg-surface2 border border-border rounded-sm">
                      <div className="text-xs font-mono uppercase text-accent font-semibold mb-2">
                        {val.label || key}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {val.username !== undefined && (
                          <div>
                            <span className="text-[10px] font-mono uppercase text-muted">Username</span>
                            <input
                              type="text"
                              value={val.username}
                              onChange={(e) => {
                                const newSocial = { ...data.SOCIAL_LINKS };
                                newSocial[key].username = e.target.value;
                                setData({ ...data, SOCIAL_LINKS: newSocial });
                              }}
                              className="w-full bg-surface border border-border text-xs font-mono p-2 text-[#F0EDE8] rounded-sm focus:border-accent focus:outline-none mt-1"
                            />
                          </div>
                        )}
                        {val.url !== undefined && (
                          <div className={val.username === undefined ? "sm:col-span-2" : ""}>
                            <span className="text-[10px] font-mono uppercase text-muted">URL</span>
                            <input
                              type="text"
                              value={val.url}
                              onChange={(e) => {
                                const newSocial = { ...data.SOCIAL_LINKS };
                                newSocial[key].url = e.target.value;
                                setData({ ...data, SOCIAL_LINKS: newSocial });
                              }}
                              className="w-full bg-surface border border-border text-xs font-mono p-2 text-[#F0EDE8] rounded-sm focus:border-accent focus:outline-none mt-1"
                            />
                          </div>
                        )}
                        {val.value !== undefined && (
                          <div className="sm:col-span-2">
                            <span className="text-[10px] font-mono uppercase text-muted">Value</span>
                            <input
                              type="text"
                              value={val.value}
                              onChange={(e) => {
                                const newSocial = { ...data.SOCIAL_LINKS };
                                newSocial[key].value = e.target.value;
                                setData({ ...data, SOCIAL_LINKS: newSocial });
                              }}
                              className="w-full bg-surface border border-border text-xs font-mono p-2 text-[#F0EDE8] rounded-sm focus:border-accent focus:outline-none mt-1"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: Skills Manager */}
              {activeTab === "skills" && (
                <div className="space-y-6 max-w-3xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-2xl tracking-wide text-[#F0EDE8]">
                        SKILLS MANAGER
                      </h3>
                      <p className="font-mono text-xs text-muted">
                        Configure categorized technical competencies.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setData({
                          ...data,
                          SKILLS: [...data.SKILLS, { category: "AI / ML", name: "New Skill Group" }],
                        });
                      }}
                      className="px-3 py-1.5 bg-accent text-black font-mono text-xs uppercase tracking-wider font-semibold rounded-sm flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Skill</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {data.SKILLS.map((skill, index) => (
                      <div
                        key={index}
                        className="p-3 bg-surface2 border border-border rounded-sm flex items-center gap-3"
                      >
                        <input
                          type="text"
                          value={skill.category}
                          onChange={(e) => {
                            const newSkills = [...data.SKILLS];
                            newSkills[index].category = e.target.value;
                            setData({ ...data, SKILLS: newSkills });
                          }}
                          className="w-36 bg-surface border border-border text-xs font-mono p-2 text-accent rounded-sm focus:border-accent focus:outline-none uppercase"
                          placeholder="Category"
                        />
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => {
                            const newSkills = [...data.SKILLS];
                            newSkills[index].name = e.target.value;
                            setData({ ...data, SKILLS: newSkills });
                          }}
                          className="flex-1 bg-surface border border-border text-xs font-mono p-2 text-[#F0EDE8] rounded-sm focus:border-accent focus:outline-none"
                          placeholder="Skill list (comma separated)"
                        />
                        <button
                          onClick={() => {
                            setData({
                              ...data,
                              SKILLS: data.SKILLS.filter((_, i) => i !== index),
                            });
                          }}
                          className="p-2 text-muted hover:text-red-400 transition-colors"
                          title="Delete skill"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: Projects Manager */}
              {activeTab === "projects" && (
                <div className="space-y-6 max-w-4xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-2xl tracking-wide text-[#F0EDE8]">
                        PROJECTS MANAGER
                      </h3>
                      <p className="font-mono text-xs text-muted">
                        Curate your flagship showcased projects.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const newNum = String(data.PROJECTS.length + 1).padStart(2, "0");
                        setData({
                          ...data,
                          PROJECTS: [
                            ...data.PROJECTS,
                            {
                              num: newNum,
                              title: "New Project",
                              description: "Brief summary of problem solved and tools used.",
                              tags: ["Python", "React"],
                              githubUrl: "https://github.com/harshanth0112",
                            },
                          ],
                        });
                      }}
                      className="px-3 py-1.5 bg-accent text-black font-mono text-xs uppercase tracking-wider font-semibold rounded-sm flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Project</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {data.PROJECTS.map((project, index) => (
                      <div
                        key={index}
                        className="p-4 bg-surface2 border border-border rounded-sm space-y-3 relative group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs text-accent font-bold">
                              #{project.num}
                            </span>
                            <input
                              type="text"
                              value={project.title}
                              onChange={(e) => {
                                const newProj = [...data.PROJECTS];
                                newProj[index].title = e.target.value;
                                setData({ ...data, PROJECTS: newProj });
                              }}
                              className="bg-surface border border-border text-sm font-display p-2 text-[#F0EDE8] rounded-sm w-72 focus:border-accent focus:outline-none"
                              placeholder="Project Title"
                            />
                          </div>

                          <button
                            onClick={() => {
                              const newProj = data.PROJECTS.filter((_, i) => i !== index).map(
                                (p, i) => ({ ...p, num: String(i + 1).padStart(2, "0") })
                              );
                              setData({ ...data, PROJECTS: newProj });
                            }}
                            className="text-muted hover:text-red-400 p-1.5 transition-colors"
                            title="Delete project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div>
                          <textarea
                            rows={2}
                            value={project.description}
                            onChange={(e) => {
                              const newProj = [...data.PROJECTS];
                              newProj[index].description = e.target.value;
                              setData({ ...data, PROJECTS: newProj });
                            }}
                            className="w-full bg-surface border border-border text-xs font-mono p-2 text-[#F0EDE8] rounded-sm focus:border-accent focus:outline-none"
                            placeholder="Description"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <span className="text-[10px] font-mono uppercase text-muted">
                              Tags (Comma separated)
                            </span>
                            <input
                              type="text"
                              value={project.tags.join(", ")}
                              onChange={(e) => {
                                const newProj = [...data.PROJECTS];
                                newProj[index].tags = e.target.value
                                  .split(",")
                                  .map((t) => t.trim())
                                  .filter(Boolean);
                                setData({ ...data, PROJECTS: newProj });
                              }}
                              className="w-full bg-surface border border-border text-xs font-mono p-2 text-[#F0EDE8] rounded-sm focus:border-accent focus:outline-none mt-1"
                            />
                          </div>

                          <div>
                            <span className="text-[10px] font-mono uppercase text-muted">
                              GitHub Repo URL
                            </span>
                            <input
                              type="text"
                              value={project.githubUrl}
                              onChange={(e) => {
                                const newProj = [...data.PROJECTS];
                                newProj[index].githubUrl = e.target.value;
                                setData({ ...data, PROJECTS: newProj });
                              }}
                              className="w-full bg-surface border border-border text-xs font-mono p-2 text-[#F0EDE8] rounded-sm focus:border-accent focus:outline-none mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: Certifications Manager */}
              {activeTab === "certs" && (
                <div className="space-y-6 max-w-4xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-2xl tracking-wide text-[#F0EDE8]">
                        CERTIFICATIONS MANAGER
                      </h3>
                      <p className="font-mono text-xs text-muted">
                        Manage all verified proof badges and image paths.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const newId = `cert-${Date.now()}`;
                        setData({
                          ...data,
                          CERTIFICATES: [
                            {
                              id: newId,
                              title: "New Certification",
                              issuer: "Issuing Organization",
                              date: "2026",
                              category: "AI & Cloud",
                              image: "/pdftoimage/wipro.png",
                            },
                            ...data.CERTIFICATES,
                          ],
                        });
                      }}
                      className="px-3 py-1.5 bg-accent text-black font-mono text-xs uppercase tracking-wider font-semibold rounded-sm flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Certificate</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {data.CERTIFICATES.map((cert, index) => (
                      <div
                        key={cert.id || index}
                        className="p-3 bg-surface2 border border-border rounded-sm grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
                      >
                        <div className="sm:col-span-4">
                          <span className="text-[10px] font-mono uppercase text-muted block mb-0.5">Title</span>
                          <input
                            type="text"
                            value={cert.title}
                            onChange={(e) => {
                              const newCerts = [...data.CERTIFICATES];
                              newCerts[index].title = e.target.value;
                              setData({ ...data, CERTIFICATES: newCerts });
                            }}
                            className="w-full bg-surface border border-border text-xs font-mono p-1.5 text-[#F0EDE8] rounded-sm focus:border-accent focus:outline-none"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <span className="text-[10px] font-mono uppercase text-muted block mb-0.5">Issuer</span>
                          <input
                            type="text"
                            value={cert.issuer}
                            onChange={(e) => {
                              const newCerts = [...data.CERTIFICATES];
                              newCerts[index].issuer = e.target.value;
                              setData({ ...data, CERTIFICATES: newCerts });
                            }}
                            className="w-full bg-surface border border-border text-xs font-mono p-1.5 text-[#F0EDE8] rounded-sm focus:border-accent focus:outline-none"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <span className="text-[10px] font-mono uppercase text-muted block mb-0.5">Date</span>
                          <input
                            type="text"
                            value={cert.date}
                            onChange={(e) => {
                              const newCerts = [...data.CERTIFICATES];
                              newCerts[index].date = e.target.value;
                              setData({ ...data, CERTIFICATES: newCerts });
                            }}
                            className="w-full bg-surface border border-border text-xs font-mono p-1.5 text-[#F0EDE8] rounded-sm focus:border-accent focus:outline-none"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <span className="text-[10px] font-mono uppercase text-muted block mb-0.5">Category</span>
                          <input
                            type="text"
                            value={cert.category}
                            onChange={(e) => {
                              const newCerts = [...data.CERTIFICATES];
                              newCerts[index].category = e.target.value;
                              setData({ ...data, CERTIFICATES: newCerts });
                            }}
                            className="w-full bg-surface border border-border text-xs font-mono p-1.5 text-accent rounded-sm focus:border-accent focus:outline-none"
                          />
                        </div>

                        <div className="sm:col-span-1 flex justify-end">
                          <button
                            onClick={() => {
                              setData({
                                ...data,
                                CERTIFICATES: data.CERTIFICATES.filter((_, i) => i !== index),
                              });
                            }}
                            className="text-muted hover:text-red-400 p-1.5 transition-colors"
                            title="Delete certificate"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: Export & Save Settings */}
              {activeTab === "github" && (
                <div className="space-y-6 max-w-2xl">
                  <div>
                    <h3 className="font-display text-2xl tracking-wide text-[#F0EDE8]">
                      EXPORT &amp; SAVE DATA
                    </h3>
                    <p className="font-mono text-xs text-muted">
                      Download your updated portfolio data file directly with one click and save it into your project.
                    </p>
                  </div>

                  <div className="p-6 bg-surface2 border border-border rounded-sm space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded bg-accent/10 border border-accent/40 flex items-center justify-center text-accent flex-shrink-0">
                        <Download className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-display text-lg tracking-wide text-[#F0EDE8]">
                          Download portfolioData.js
                        </h4>
                        <p className="font-body text-sm text-muted mt-1 leading-relaxed">
                          Exports all your changes (profile bio, metrics, technical skills, projects, and certificates) into a clean, ready-to-use JavaScript file.
                        </p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleDownloadDataFile}
                        className="w-full sm:w-auto px-7 py-3.5 bg-accent text-black font-mono text-xs uppercase tracking-widest font-semibold rounded-sm hover:shadow-[0_0_20px_rgba(200,255,0,0.5)] transition-all flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download portfolioData.js</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-5 bg-surface border border-border rounded-sm space-y-2 font-mono text-xs text-muted">
                    <div className="text-accent uppercase tracking-wider text-[11px] font-semibold">// How to save:</div>
                    <ol className="list-decimal list-inside space-y-1 text-muted/90 leading-relaxed">
                      <li>Click the button above to download <span className="text-[#F0EDE8]">portfolioData.js</span>.</li>
                      <li>Place the file into your repository at <span className="text-accent">src/data/portfolioData.js</span>.</li>
                      <li>Commit and push to GitHub anytime.</li>
                    </ol>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
