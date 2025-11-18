// SupervisorsSection.jsx
import React, { useState } from "react";

/**
 * Example supervisors data.
 * Replace with your API data (id, name, image, project, startDate, endDate, location, description, status, lat, lng).
 */
const initialSupervisors = [
  {
    id: 1,
    name: "Rohit Sharma",
    image: "", // put real image paths
    project: "Road Repair - Sector 7",
    startDate: "2025-09-01",
    endDate: "2025-12-15",
    location: "Sector 7, Nagpur",
    lat: 21.1458,
    lng: 79.0882,
    description:
      "Repairing damaged asphalt on the main east-west artery. Task includes digging, relaying, and compaction. Team size: 6.",
    status: "active",
  },
  {
    id: 2,
    name: "Anita Verma",
    image: "",
    project: "Water Pipeline Replacement",
    startDate: "2025-07-10",
    endDate: "2025-11-30",
    location: "Block B, Newtown",
    lat: 22.5726,
    lng: 88.3639,
    description:
      "Replacing 1.2km of aged pipeline; coordinating with municipal consent and traffic diversions. Team size: 8.",
    status: "active",
  },
  {
    id: 3,
    name: "Suresh Patel",
    image: "",
    project: "Community Park Renovation",
    startDate: "2025-03-01",
    endDate: "2025-06-30",
    location: "Green Park",
    lat: 19.0760,
    lng: 72.8777,
    description:
      "Finished landscaping and playground installations. Final inspections pending. Team size: 4.",
    status: "completed",
  },
];

function formatDate(dateStr) {
  // Format YYYY-MM-DD to readable format (e.g., Aug 10, 2025)
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

function computeProgressPercent(startDate, endDate) {
  const now = new Date();
  const start = new Date(startDate + "T00:00:00");
  const end = new Date(endDate + "T23:59:59"); // include end day

  const total = end - start; // milliseconds
  const elapsed = now - start;

  if (total <= 0) return 100; // if end <= start, treat as complete
  const pct = Math.round((elapsed / total) * 100);
  return Math.max(0, Math.min(100, pct));
}

export default function SupervisorsSection() {
  const [supervisors] = useState(initialSupervisors);
  const [expandedId, setExpandedId] = useState(null);

  const activeCount = supervisors.filter((s) => s.status === "active").length;

  return (
    <section className="space-y-6">
      {/* Header / summary */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-white p-4 rounded shadow-sm">
            <div className="text-sm text-gray-500">Active Supervisors</div>
            <div className="text-2xl font-semibold text-gray-800">{activeCount}</div>
          </div>

          <div className="bg-white p-4 rounded shadow-sm">
            <div className="text-sm text-gray-500">Total Projects</div>
            <div className="text-2xl font-semibold text-gray-800">
              {new Set(supervisors.map((s) => s.project)).size}
            </div>
          </div>
        </div>

        {/* Quick text on right */}
        <div className="text-sm text-gray-600">
          Click a supervisor card to expand and view project duration, description and location.
        </div>
      </div>

      {/* Main grid: left (cards) and right filters/stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Cards area (span 2) */}
        <div className="md:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {supervisors.map((s) => {
              const isOpen = expandedId === s.id;
              const progress = computeProgressPercent(s.startDate, s.endDate);

              return (
                <article
                  key={s.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden border"
                >
                  {/* image on top */}
                  <div className="h-40 w-full bg-gray-100 overflow-hidden">
                    <img
                      src={s.image}
                      alt={`${s.name} photo`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // fallback image if missing
                        e.currentTarget.src = "/default-profile.png";
                      }}
                    />
                  </div>

                  {/* card content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{s.name}</h3>
                        <p className="text-sm text-gray-500">{s.project}</p>
                      </div>

                      <div className="text-right">
                        <span
                          className={`inline-block px-2 py-1 text-xs rounded ${
                            s.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {s.status === "active" ? "Active" : "Completed"}
                        </span>
                      </div>
                    </div>

                    {/* dates */}
                    <div className="mt-3 text-sm text-gray-600 grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-xs text-gray-400">Start</div>
                        <div className="text-sm text-gray-800">{formatDate(s.startDate)}</div>
                      </div>

                      <div>
                        <div className="text-xs text-gray-400">End</div>
                        <div className="text-sm text-gray-800">{formatDate(s.endDate)}</div>
                      </div>
                    </div>

                    {/* progress bar */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${progress}%`,
                            background:
                              progress >= 90 ? "linear-gradient(90deg,#16a34a,#84cc16)" : "#06b6d4",
                          }}
                        />
                      </div>
                    </div>

                    {/* location and expand */}
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="text-sm text-gray-600">
                        <div className="text-xs text-gray-400">Location</div>
                        <div className="text-sm text-gray-800">{s.location}</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`https://www.google.com/maps?q=${s.lat},${s.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Open in Maps
                        </a>

                        <button
                          onClick={() => setExpandedId(isOpen ? null : s.id)}
                          className="text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700"
                          aria-expanded={isOpen}
                          aria-controls={`supervisor-${s.id}-panel`}
                        >
                          {isOpen ? "Collapse" : "View"}
                        </button>
                      </div>
                    </div>

                    {/* expandable panel */}
                    <div
                      id={`supervisor-${s.id}-panel`}
                      className={`mt-4 text-sm text-gray-700 transition-all duration-300 ${
                        isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                      } overflow-hidden`}
                    >
                      <div className="pb-3">
                        <div className="text-xs text-gray-400">Project details</div>
                        <p className="mt-1">{s.description}</p>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div>
                          <div className="text-xs text-gray-400">Team Size</div>
                          <div className="text-sm text-gray-800">—</div>
                        </div>

                        <div>
                          <div className="text-xs text-gray-400">Expected Duration</div>
                          <div className="text-sm text-gray-800">
                            {formatDate(s.startDate)} — {formatDate(s.endDate)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Right column: filters & aggregated stats */}
        <aside className="bg-white p-4 rounded shadow-sm">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Supervisor Filters & Stats</h4>

          <div className="text-sm text-gray-600 mb-4">
            <div className="flex justify-between">
              <span>Active</span>
              <span className="font-medium">{activeCount}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Completed</span>
              <span className="font-medium">
                {supervisors.filter((s) => s.status !== "active").length}
              </span>
            </div>
          </div>

          {/* Example quick filters (no functionality here - add handlers as needed) */}
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 bg-gray-100 rounded hover:bg-gray-200">
              All Supervisors
            </button>
            <button className="w-full text-left px-3 py-2 bg-gray-100 rounded hover:bg-gray-200">
              Active Only
            </button>
            <button className="w-full text-left px-3 py-2 bg-gray-100 rounded hover:bg-gray-200">
              By Project
            </button>
          </div>
        </aside>
      </div>

      {/* Bottom: a full-width section for cards/table (same as your placeholder) */}
      <div className="bg-white p-4 rounded shadow-sm">Supervisor cards or table</div>
    </section>
  );
}
