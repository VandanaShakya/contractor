import React, { useEffect, useRef, useState } from "react";

/* ---------- helpers: image compression ---------- */
async function compressImageFile(file, maxWidth = 1200, quality = 0.7) {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("FileReader failed"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Image load failed"));
      img.onload = () => {
        const ratio = img.width / img.height || 1;
        const width = Math.min(maxWidth, img.width);
        const height = Math.round(width / ratio);
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL("image/jpeg", quality);
        resolve(compressed);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

/* ---------- localStorage helpers ---------- */
const LS_PROJECTS_KEY = "supervisor_projects_v1";
const LS_PROFILE_KEY = "supervisor_profile_v1";

function loadProjectsFromStorage() {
  try {
    const raw = localStorage.getItem(LS_PROJECTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveProjectsToStorage(items) {
  try {
    localStorage.setItem(LS_PROJECTS_KEY, JSON.stringify(items));
  } catch (err) {
    console.warn("Failed saving projects to localStorage:", err);
    try {
      const stripped = items.map((p) => {
        const { id, name, startDate, endDate, completed, createdAt } = p;
        return { id, name, startDate, endDate, completed, createdAt };
      });
      localStorage.setItem(LS_PROJECTS_KEY, JSON.stringify(stripped));
      alert(
        "Local storage quota exceeded. Projects saved without images. Consider using server storage or IndexedDB for images."
      );
    } catch {
      // ignore
    }
  }
}

function loadProfileFromStorage() {
  try {
    const raw = localStorage.getItem(LS_PROFILE_KEY);
    return raw
      ? JSON.parse(raw)
      : {
          dp: null,
          name: "Supervisor Name",
          email: "supervisor@example.com",
          profession: "Supervisor",
          about: "Short bio about supervisor...",
          rating: 4.5,
          experience: "5 years",
        };
  } catch {
    return {
      dp: null,
      name: "Supervisor Name",
      email: "supervisor@example.com",
      profession: "Supervisor",
      about: "Short bio about supervisor...",
      rating: 4.5,
      experience: "5 years",
    };
  }
}
function saveProfileToStorage(profile) {
  try {
    localStorage.setItem(LS_PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.warn("Failed saving profile", e);
  }
}

/* ---------- Component ---------- */
export default function SupervisorDashboard() {
  const [projects, setProjects] = useState(() => loadProjectsFromStorage());
  const [selectedNav, setSelectedNav] = useState("projects"); // sidebar selection

  // Modal form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [formStart, setFormStart] = useState("");
  const [formEnd, setFormEnd] = useState("");
  const [formImagePreview, setFormImagePreview] = useState(null);
  const [formEditingId, setFormEditingId] = useState(null);
  const fileInputRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);

  // Profile panel state
  const [profileOpen, setProfileOpen] = useState(false);
  const [profile, setProfile] = useState(() => loadProfileFromStorage());
  const profileFileRef = useRef(null);

  // Mobile sidebar toggle (small screens)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Persist projects & profile
  useEffect(() => {
    saveProjectsToStorage(projects);
  }, [projects]);
  useEffect(() => {
    saveProfileToStorage(profile);
  }, [profile]);

  /* ---------- project actions ---------- */
  function openCreateModal() {
    setFormName("");
    setFormStart("");
    setFormEnd("");
    setFormImagePreview(null);
    setFormEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
    setIsModalOpen(true);
  }

  function openEditModal(project) {
    setFormEditingId(project.id);
    setFormName(project.name);
    setFormStart(project.startDate || "");
    setFormEnd(project.endDate || "");
    setFormImagePreview(project.image || null);
    setIsModalOpen(true);
  }

  async function handleImageFileChange(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) {
      setFormImagePreview(null);
      return;
    }
    try {
      setIsSaving(true);
      const compressed = await compressImageFile(f, 1000, 0.7);
      setFormImagePreview(compressed);
    } catch (err) {
      console.error("compress error", err);
      const reader = new FileReader();
      reader.onload = (ev) => setFormImagePreview(ev.target.result);
      reader.readAsDataURL(f);
    } finally {
      setIsSaving(false);
    }
  }

  function validateProjectForm() {
    if (!formName.trim()) return "Please enter project name.";
    if (!formStart) return "Please select a start date.";
    if (!formEnd) return "Please select an end date.";
    if (new Date(formStart) > new Date(formEnd)) return "Start date cannot be after end date.";
    if (!formImagePreview) return "Please upload a project image.";
    return null;
  }

  function handleModalSave() {
    const err = validateProjectForm();
    if (err) {
      alert(err);
      return;
    }

    if (formEditingId) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === formEditingId
            ? { ...p, name: formName, startDate: formStart, endDate: formEnd, image: formImagePreview, updatedAt: new Date().toISOString() }
            : p
        )
      );
      setIsModalOpen(false);
      return;
    }

    const newProject = {
      id: Date.now().toString(),
      name: formName,
      startDate: formStart,
      endDate: formEnd,
      image: formImagePreview,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setProjects((prev) => [newProject, ...prev]);
    setIsModalOpen(false);
  }

  function markCompleted(id) {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, completed: true, updatedAt: new Date().toISOString() } : p)));
  }
  function reopenProject(id) {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, completed: false, updatedAt: new Date().toISOString() } : p)));
  }
  function deleteProject(id) {
    if (!confirm("Delete this project?")) return;
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  /* ---------- profile actions ---------- */
  async function handleProfileDPChange(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    try {
      setIsSaving(true);
      const compressed = await compressImageFile(f, 600, 0.75);
      setProfile((prev) => ({ ...prev, dp: compressed }));
    } catch (err) {
      console.error("Profile compress failed", err);
    } finally {
      setIsSaving(false);
    }
  }

  function updateProfileField(field, value) {
    setProfile((prev) => ({ ...prev, [field]: value }));
  }

  /* ---------- UI helpers ---------- */
  const pendingProjects = projects.filter((p) => !p.completed);
  const completedProjects = projects.filter((p) => p.completed);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Top bar for small screens */}
      <header className="w-full md:hidden bg-white shadow p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* profile on top-left for mobile */}
          <button
            onClick={() => setProfileOpen((s) => !s)}
            className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center border"
            title="Profile"
          >
            {profile.dp ? <img src={profile.dp} alt="dp" className="w-full h-full object-cover" /> : <span className="text-sm text-gray-600">{(profile.name || "S").slice(0, 1)}</span>}
          </button>

          <div>
            <div className="text-sm font-semibold">Supervisor</div>
            <div className="text-xs text-gray-500">Projects</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen((s) => !s)}
            className="p-2 rounded hover:bg-slate-100"
            aria-label="open menu"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <button onClick={openCreateModal} className="px-3 py-1 bg-emerald-600 text-white rounded text-sm">
            Create
          </button>
        </div>
      </header>

      {/* Mobile slide-down menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow p-3">
          <nav className="flex gap-2">
            <button onClick={() => { setSelectedNav("projects"); setMobileMenuOpen(false); }} className={`px-3 py-2 rounded ${selectedNav === "projects" ? "bg-slate-100" : "hover:bg-slate-50"}`}>Projects</button>
            <button onClick={() => { setSelectedNav("overview"); setMobileMenuOpen(false); }} className={`px-3 py-2 rounded ${selectedNav === "overview" ? "bg-slate-100" : "hover:bg-slate-50"}`}>Overview</button>
            <button onClick={() => { setSelectedNav("contractors"); setMobileMenuOpen(false); }} className={`px-3 py-2 rounded ${selectedNav === "contractors" ? "bg-slate-100" : "hover:bg-slate-50"}`}>Contractors</button>
            <button onClick={() => { setSelectedNav("reports"); setMobileMenuOpen(false); }} className={`px-3 py-2 rounded ${selectedNav === "reports" ? "bg-slate-100" : "hover:bg-slate-50"}`}>Reports</button>
          </nav>
        </div>
      )}

      {/* ---------- Sidebar (desktop) ---------- */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white shadow h-screen sticky top-0 p-6 flex-shrink-0">
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Supervisor</h2>
            <div className="text-xs text-gray-500">Admin / Contractor view</div>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setSelectedNav("projects")}
              className={`w-full text-left px-3 py-2 rounded ${selectedNav === "projects" ? "bg-slate-100 font-medium" : "hover:bg-slate-50"}`}
            >
              Projects
            </button>
            <button
              onClick={() => setSelectedNav("overview")}
              className={`w-full text-left px-3 py-2 rounded ${selectedNav === "overview" ? "bg-slate-100 font-medium" : "hover:bg-slate-50"}`}
            >
              Overview
            </button>
            <button
              onClick={() => setSelectedNav("contractors")}
              className={`w-full text-left px-3 py-2 rounded ${selectedNav === "contractors" ? "bg-slate-100 font-medium" : "hover:bg-slate-50"}`}
            >
              Contractors
            </button>
            <button
              onClick={() => setSelectedNav("reports")}
              className={`w-full text-left px-3 py-2 rounded ${selectedNav === "reports" ? "bg-slate-100 font-medium" : "hover:bg-slate-50"}`}
            >
              Reports
            </button>
          </nav>
        </div>

        <div className="space-y-3 mt-auto">
          <div className="text-xs text-gray-500">Quick Stats</div>
          <div className="flex items-center justify-between text-sm">
            <div>All</div>
            <div className="font-semibold">{projects.length}</div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div>Pending</div>
            <div className="font-semibold">{pendingProjects.length}</div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div>Completed</div>
            <div className="font-semibold">{completedProjects.length}</div>
          </div>
           </div>
      </aside>

      {/* ---------- Main content (right) ---------- */}
      <main className="flex-1 p-4 md:p-6 overflow-auto">
        <header className="flex items-center justify-between mb-4 md:mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold">Projects</h1>
            <p className="text-sm text-gray-600">Manage assigned projects — pending and completed</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-700 pr-3 border-r hidden md:block">{completedProjects.length} completed</div>
            <button onClick={openCreateModal} className="px-3 py-1 md:px-4 md:py-2 bg-emerald-600 text-white rounded text-sm">
              Create New Project
            </button>
          </div>
        </header>

        {/* Two-column layout: Pending (left) / Completed (right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Pending */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">Pending Projects ({pendingProjects.length})</h2>
              <div className="text-xs text-gray-500">Newest on top</div>
            </div>

            {pendingProjects.length === 0 ? (
              <div className="bg-white rounded shadow p-4 md:p-6 text-gray-600">No pending projects.</div>
            ) : (
              <div className="space-y-3">
                {pendingProjects.map((p) => (
                  <article key={p.id} className="bg-white rounded shadow overflow-hidden flex flex-col md:flex-row">
                    <div className="w-full md:w-36 h-48 md:h-28 flex-shrink-0 bg-gray-100 border-b md:border-b-0 md:border-r">
                      {p.image ? <img src={p.image} alt={p.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>}
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="font-semibold">{p.name}</h4>
                          <div className="text-xs text-gray-500">Created: {new Date(p.createdAt).toLocaleString()}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => markCompleted(p.id)} className="px-3 py-1 text-sm bg-emerald-600 text-white rounded">Mark Completed</button>
                          <button onClick={() => openEditModal(p)} className="px-3 py-1 text-sm border rounded">Edit</button>
                          <button onClick={() => deleteProject(p.id)} className="px-3 py-1 text-sm bg-red-600 text-white rounded">Delete</button>
                        </div>
                      </div>
                      <div className="mt-3 text-sm text-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div><strong>Start:</strong> {p.startDate}</div>
                        <div><strong>End:</strong> {p.endDate}</div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* Completed */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">Completed Projects ({completedProjects.length})</h2>
              <div className="text-xs text-gray-500">Review or reopen</div>
            </div>

            {completedProjects.length === 0 ? (
              <div className="bg-white rounded shadow p-4 md:p-6 text-gray-600">No completed projects.</div>
            ) : (
              <div className="space-y-3">
                {completedProjects.map((p) => (
                  <article key={p.id} className="bg-white rounded shadow overflow-hidden flex flex-col md:flex-row">
                    <div className="w-full md:w-36 h-48 md:h-28 flex-shrink-0 bg-gray-100 border-b md:border-b-0 md:border-r">
                      {p.image ? <img src={p.image} alt={p.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>}
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="font-semibold">{p.name}</h4>
                          <div className="text-xs text-gray-500">Completed on: {p.updatedAt ? new Date(p.updatedAt).toLocaleString() : "—"}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => reopenProject(p.id)} className="px-3 py-1 text-sm border rounded">Reopen</button>
                          <button onClick={() => openEditModal(p)} className="px-3 py-1 text-sm border rounded">Edit</button>
                          <button onClick={() => deleteProject(p.id)} className="px-3 py-1 text-sm bg-red-600 text-white rounded">Delete</button>
                        </div>
                      </div>
                      <div className="mt-3 text-sm text-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div><strong>Start:</strong> {p.startDate}</div>
                        <div><strong>End:</strong> {p.endDate}</div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* ---------------- Modal: Create / Edit project ---------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl z-50 p-4 md:p-6">
            <header className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">{formEditingId ? "Edit Project" : "Create New Project"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">Close</button>
            </header>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Project Name</label>
                <input value={formName} onChange={(e) => setFormName(e.target.value)} className="w-full border rounded p-2" placeholder="Project title" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <input type="date" value={formStart} onChange={(e) => setFormStart(e.target.value)} className="w-full border rounded p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <input type="date" value={formEnd} onChange={(e) => setFormEnd(e.target.value)} className="w-full border rounded p-2" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Project Image</label>
                  <div className="flex items-center gap-2">
                    <input ref={fileInputRef} onChange={handleImageFileChange} type="file" accept="image/*" className="hidden" id="projImageInput" />
                    <label htmlFor="projImageInput" className="px-3 py-2 bg-slate-800 text-white rounded cursor-pointer select-none">Choose Image</label>
                    <div className="text-sm text-gray-600">{isSaving ? "Processing..." : formImagePreview ? "Image ready" : "No image chosen"}</div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Tip: choose a clear image. It will be compressed before saving.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Preview</label>
                  <div className="w-full h-24 border rounded bg-gray-50 flex items-center justify-center overflow-hidden">
                    {formImagePreview ? <img src={formImagePreview} alt="preview" className="w-full h-full object-contain" /> : <div className="text-sm text-gray-400">No preview</div>}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
                <button onClick={handleModalSave} className="px-4 py-2 bg-emerald-600 text-white rounded">
                  {formEditingId ? "Save Changes" : "Create Project"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- Profile panel (responsive position) ---------------- */}
      {/* - On small screens: fixed top-left (top-4 left-4) panel
          - On md+: floating bottom-left as before */}
      {profileOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
          <aside className="fixed z-50 bg-white rounded shadow p-4 w-72
                           left-4 top-4 md:left-6 md:bottom-24 md:top-auto">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100">
                {profile.dp ? <img src={profile.dp} alt="dp" className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full text-xl text-gray-600">{(profile.name || "S").slice(0, 1)}</div>}
              </div>
              <div className="flex-1">
                <div className="font-semibold">{profile.name}</div>
                <div className="text-xs text-gray-500">{profile.profession}</div>
                <div className="text-xs text-gray-500">{profile.email}</div>
              </div>
            </div>

            <div className="mt-3 text-sm text-gray-700">
              <div className="mb-2"><strong>About</strong><div className="text-xs text-gray-600 mt-1">{profile.about}</div></div>
              <div className="mb-2"><strong>Rating</strong><div className="text-xs text-gray-600 mt-1">{profile.rating} / 5</div></div>
              <div className="mb-2"><strong>Experience</strong><div className="text-xs text-gray-600 mt-1">{profile.experience}</div></div>
            </div>

            <hr className="my-2" />

            <div className="space-y-2">
              <label className="block text-xs text-gray-600">Change DP</label>
              <input ref={profileFileRef} onChange={handleProfileDPChange} type="file" accept="image/*" className="text-sm" />

              <label className="block text-xs text-gray-600">Name</label>
              <input value={profile.name} onChange={(e) => updateProfileField("name", e.target.value)} className="w-full border rounded p-1 text-sm" />

              <label className="block text-xs text-gray-600">Email</label>
              <input value={profile.email} onChange={(e) => updateProfileField("email", e.target.value)} className="w-full border rounded p-1 text-sm" />

              <label className="block text-xs text-gray-600">Profession</label>
              <input value={profile.profession} onChange={(e) => updateProfileField("profession", e.target.value)} className="w-full border rounded p-1 text-sm" />

              <label className="block text-xs text-gray-600">About</label>
              <textarea value={profile.about} onChange={(e) => updateProfileField("about", e.target.value)} className="w-full border rounded p-1 text-sm h-16" />

              <label className="block text-xs text-gray-600">Rating</label>
              <input type="number" step="0.1" min="0" max="5" value={profile.rating} onChange={(e) => updateProfileField("rating", Number(e.target.value))} className="w-full border rounded p-1 text-sm" />

              <label className="block text-xs text-gray-600">Experience</label>
              <input value={profile.experience} onChange={(e) => updateProfileField("experience", e.target.value)} className="w-full border rounded p-1 text-sm" />

              <div className="pt-2 flex justify-end gap-2">
                <button onClick={() => { saveProfileToStorage(profile); setProfileOpen(false); }} className="px-3 py-1 bg-emerald-600 text-white rounded text-sm">Save</button>
                <button onClick={() => setProfileOpen(false)} className="px-3 py-1 border rounded text-sm">Close</button>
              </div>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}
