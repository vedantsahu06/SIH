import React, { useEffect, useMemo, useRef, useState } from "react";
import StaggeredMenu from "../StaggeredMenu";

// Certificates.jsx
// Single-file React + Tailwind component implementing the design outline the user provided.
// - Mock data with statuses
// - Search / filter / sort
// - Grid of certificate cards with actions: View, Verify (simulate), Download, Add to Portfolio
// - Blockchain verification panel with timeline + tx log
// - Upload modal + floating button

const menuItems = [
  { label: "Profile", ariaLabel: "My profile", link: "/" },
  { label: "Dashboard", ariaLabel: "Analytics", link: "/student" },
  { label: "Activities", ariaLabel: "Activity Tracker", link: "activities" },
  { label: "Digital Portfolio", ariaLabel: "Portfolio", link: "/services" },
  { label: "Skill Gap Analysis", ariaLabel: "Identify your skill gaps", link: "/contact" },
  { label: "Certificates", ariaLabel: "Be job ready", link: "certificates" },
  { label: "Documents", ariaLabel: "Documents", link: "/" },
];

const socialItems = [
  { label: "Twitter", link: "https://twitter.com" },
  { label: "GitHub", link: "https://github.com" },
  { label: "LinkedIn", link: "https://linkedin.com" },
];

export default function CertificatesPage() {
  // ----- Mock data -----
  const initialCertificates = [
    {
      id: "cert-001",
      title: "Data Structures and Algorithms",
      type: "MOOC",
      authority: "Coursera",
      date: "2024-07-10",
      status: "verified",
      thumbnail: null,
      linked: true,
      tx: {
        hash: "0x9a1f...b3c4",
        date: "2024-07-11T10:12:00Z",
      },
    },
    {
      id: "cert-002",
      title: "Advanced Web Dev Internship",
      type: "Internship",
      authority: "Acme Tech",
      date: "2024-12-02",
      status: "pending",
      thumbnail: null,
      linked: false,
      tx: null,
    },
    {
      id: "cert-003",
      title: "College Merit Certificate",
      type: "Academic",
      authority: "State University",
      date: "2023-05-22",
      status: "rejected",
      thumbnail: null,
      linked: false,
      tx: null,
    },
    // more mock items can be added here
  ];

  const [certificates, setCertificates] = useState(initialCertificates);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all"); // all / verified / pending / rejected / linked
  const [sortBy, setSortBy] = useState("date-desc");
  const [viewing, setViewing] = useState(null); // certificate currently previewed
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [summaryCounts, setSummaryCounts] = useState({ total: 0, verified: 0, pending: 0, linked: 0 });
  const fileInputRef = useRef(null);

  // ----- compute derived lists -----
  useEffect(() => {
    const total = certificates.length;
    const verified = certificates.filter((c) => c.status === "verified").length;
    const pending = certificates.filter((c) => c.status === "pending").length;
    const linked = certificates.filter((c) => c.linked).length;
    setSummaryCounts({ total, verified, pending, linked });
  }, [certificates]);

  const filtered = useMemo(() => {
    let list = certificates;
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.type.toLowerCase().includes(q) ||
          c.authority.toLowerCase().includes(q)
      );
    }
    if (filter === "verified") list = list.filter((c) => c.status === "verified");
    if (filter === "pending") list = list.filter((c) => c.status === "pending");
    if (filter === "rejected") list = list.filter((c) => c.status === "rejected");
    if (filter === "linked") list = list.filter((c) => c.linked);

    if (sortBy === "date-desc") list = list.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (sortBy === "date-asc") list = list.sort((a, b) => new Date(a.date) - new Date(b.date));
    if (sortBy === "authority") list = list.sort((a, b) => a.authority.localeCompare(b.authority));

    return list;
  }, [certificates, query, filter, sortBy]);

  // ----- actions -----
  function simulateVerify(certId) {
    // Simulate blockchain verification: update status -> verified, add a fake tx
    setCertificates((prev) =>
      prev.map((c) => {
        if (c.id !== certId) return c;
        const now = new Date();
        return {
          ...c,
          status: "verified",
          tx: { hash: `0x${Math.random().toString(16).slice(2, 12)}`, date: now.toISOString() },
        };
      })
    );
  }

  function toggleLinkPortfolio(certId) {
    setCertificates((prev) => prev.map((c) => (c.id === certId ? { ...c, linked: !c.linked } : c)));
  }

  function handleDownload(cert) {
    // For demo: create a simple text blob as the "file" to download.
    const blob = new Blob([`Certificate: ${cert.title}\nIssued by: ${cert.authority}`], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${cert.title.replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function handleUploadSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const file = data.get("file");
    if (!file || file.size === 0) return;
    setUploading(true);

    // Create thumbnail URL and simulated certificate
    const reader = new FileReader();
    reader.onload = () => {
      const newCert = {
        id: `cert-${Date.now()}`,
        title: data.get("title") || file.name,
        type: data.get("type") || "Other",
        authority: data.get("authority") || "Unknown",
        date: data.get("date") || new Date().toISOString().slice(0, 10),
        status: data.get("verify") === "on" ? "pending" : "pending",
        thumbnail: reader.result,
        linked: data.get("linked") === "on",
        tx: null,
      };
      setCertificates((p) => [newCert, ...p]);
      setUploading(false);
      setUploadOpen(false);
      e.target.reset();
    };
    reader.readAsDataURL(file);
  }

  // ----- small UI components inside file -----
  const StatusPill = ({ status }) => {
    const base = "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium";
    if (status === "verified") return <span className={`${base} bg-green-100 text-green-800`}>Verified</span>;
    if (status === "pending") return <span className={`${base} bg-orange-100 text-orange-800`}>Pending</span>;
    if (status === "rejected") return <span className={`${base} bg-red-100 text-red-800`}>Rejected</span>;
    return <span className={`${base} bg-gray-100 text-gray-800`}>{status}</span>;
  };

  // ----- render -----
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-white text-gray-800">
      {/* Header */}
      {/* <div className="fixed top-0 w-full z-50 h-full">
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials={false}
          displayItemNumbering={true}
          menuButtonColor="#ffffffff"
          openMenuButtonColor="#ff1010"
          changeMenuColorOnOpen={true}
          colors={["#B19EEF", "#5227FF"]}
          logoUrl="/path-to-your-logo.svg"
          accentColor="#ff6b6b"
          onMenuOpen={() => console.log("Menu opened")}
          onMenuClose={() => console.log("Menu closed")}
        />
      </div> */}
      <div className="flex">


        {/* Main content */}
        <main className="flex-1 p-6">
          {/* Hero / Summary */}
          <div className="bg-white rounded-4xl shadow-sm p-6 mt-20 mb-6 flex flex-col md:flex-row items-center justify-between gap-6 w-full">
            <div>
              <h2 className="text-2xl font-semibold">My Certificates</h2>
              <p className="text-sm text-gray-500">Manage, validate, and showcase your achievements securely.</p>
            </div>
            <div className="flex items-center gap-6">
              {/* Animated shield/lock icon (simple SVG with pulse) */}
              <div className="flex items-center gap-4">
                {/* <div className="p-3 rounded-full bg-indigo-50">
                  <svg className="w-10 h-10 animate-pulse" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l7 4v6c0 5-3.5 9.5-7 10-3.5-.5-7-5-7-10V6l7-4z" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="9" y="10" width="6" height="4" rx="1" stroke="#4F46E5" strokeWidth="1.2" />
                  </svg>
                </div> */}

                {/* Quick summary circle widget */}
                <div className="flex items-center gap-3">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-green-100 to-green-50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xl font-bold">{Math.round((summaryCounts.verified / Math.max(1, summaryCounts.total)) * 100)}%</div>
                      <div className="text-xs text-gray-500">verified</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div>Total: <strong>{summaryCounts.total}</strong></div>
                    <div>Pending: <strong>{summaryCounts.pending}</strong></div>
                    <div>Linked: <strong>{summaryCounts.linked}</strong></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <SummaryCard label="Total Certificates" value={summaryCounts.total} />
            <SummaryCard label="Verified" value={summaryCounts.verified} accent="green" />
            <SummaryCard label="Pending" value={summaryCounts.pending} accent="orange" />
            <SummaryCard label="Linked to Portfolio" value={summaryCounts.linked} accent="indigo" />
          </div>

          {/* Filters and sorting */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <FilterPill label="All" active={filter === "all"} onClick={() => setFilter("all")} />
              <FilterPill label="Verified" active={filter === "verified"} onClick={() => setFilter("verified")} />
              <FilterPill label="Pending" active={filter === "pending"} onClick={() => setFilter("pending")} />
              <FilterPill label="Rejected" active={filter === "rejected"} onClick={() => setFilter("rejected")} />
              <FilterPill label="Linked" active={filter === "linked"} onClick={() => setFilter("linked")} />
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm text-white">Sort</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="rounded-xl border px-3 py-1 text-white">
                <option className="text-black" value="date-desc">Date (new → old)</option>
                <option className="text-black" value="date-asc">Date (old → new)</option>
                <option className="text-black" value="authority">Issuing authority</option>
              </select>
            </div>
          </div>

          {/* Certificate Library Grid */}
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((cert) => (
                <article key={cert.id} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                  <div className="h-40 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                    {cert.thumbnail ? (
                      <img src={cert.thumbnail} alt={cert.title} className="object-cover w-full h-full" />
                    ) : (
                      <div className="text-gray-400">Preview</div>
                    )}
                  </div>

                  <div className="mt-3 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold">{cert.title}</h3>
                      <div className="text-xs text-gray-500">{cert.type} • {cert.authority}</div>
                      <div className="text-xs text-gray-400 mt-1">Issued: {cert.date}</div>
                    </div>
                    <div className="text-right">
                      <StatusPill status={cert.status} />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setViewing(cert)} className="text-sm px-3 py-1 rounded-md border hover:bg-gray-50">View</button>
                      <button onClick={() => simulateVerify(cert.id)} className="text-sm px-3 py-1 rounded-md border hover:bg-gray-50">Verify</button>
                      <button onClick={() => handleDownload(cert)} className="text-sm px-3 py-1 rounded-md border hover:bg-gray-50">Download</button>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="inline-flex items-center gap-2 cursor-pointer text-sm">
                        <input type="checkbox" checked={cert.linked} onChange={() => toggleLinkPortfolio(cert.id)} className="h-4 w-4" />
                        <span className="text-xs">Add to Portfolio</span>
                      </label>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="py-12 text-center text-gray-500">No certificates found. Try changing filters or upload a new certificate.</div>
            )}
          </section>

          {/* Blockchain Verification Section */}
          <section className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-3">Blockchain Verification</h3>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-4">Overview of recent verifications and transaction log.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border">
                    <div className="text-sm text-gray-500">Verified %</div>
                    <div className="text-2xl font-bold">{Math.round((summaryCounts.verified / Math.max(1, summaryCounts.total)) * 100)}%</div>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="text-sm text-gray-500">Total TXs</div>
                    <div className="text-2xl font-bold">{certificates.filter((c) => c.tx).length}</div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-96">
                <div className="text-sm text-gray-500 mb-2">Recent Transactions</div>
                <div className="space-y-2 max-h-48 overflow-auto">
                  {certificates
                    .filter((c) => c.tx)
                    .map((c) => (
                      <div key={c.id} className="p-3 rounded-md border flex items-start justify-between">
                        <div>
                          <div className="text-sm font-medium">{c.title}</div>
                          <div className="text-xs text-gray-500">{new Date(c.tx.date).toLocaleString()}</div>
                          <div className="text-xs mt-1">Hash: <a className="text-indigo-600 underline" href={`#`} onClick={(e) => e.preventDefault()}>{c.tx.hash}</a></div>
                        </div>
                        <div className="text-sm text-green-600">Verified</div>
                      </div>
                    ))}

                  {certificates.filter((c) => c.tx).length === 0 && <div className="text-sm text-gray-400">No transactions yet.</div>}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Floating Upload Button */}
      <button
        onClick={() => setUploadOpen(true)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl flex items-center gap-3"
        aria-label="Upload Certificate"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <path d="M12 3v12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Upload
      </button>

      {/* View modal */}
      {viewing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 md:w-3/4 lg:w-1/2 p-6">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-lg font-semibold">{viewing.title}</h4>
                <div className="text-xs text-gray-500">{viewing.type} • {viewing.authority}</div>
              </div>
              <div className="flex items-center gap-2">
                <StatusPill status={viewing.status} />
                <button onClick={() => setViewing(null)} className="text-sm px-3 py-1 rounded-md border">Close</button>
              </div>
            </div>

            <div className="mt-4">
              {viewing.thumbnail ? (
                <img src={viewing.thumbnail} alt="preview" className="w-full max-h-[60vh] object-contain" />
              ) : (
                <div className="w-full h-64 bg-gray-100 rounded-md flex items-center justify-center">No preview available</div>
              )}

              {viewing.tx && (
                <div className="mt-4 p-3 rounded-md border bg-green-50">
                  <div className="text-xs text-gray-700">Transaction: <span className="font-mono text-sm">{viewing.tx.hash}</span></div>
                  <div className="text-xs text-gray-500">{new Date(viewing.tx.date).toLocaleString()}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {uploadOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 md:w-1/2 p-6">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold">Upload Certificate</h4>
              <button onClick={() => setUploadOpen(false)} className="text-sm px-3 py-1 rounded-md border">Close</button>
            </div>

            <form onSubmit={handleUploadSubmit} className="mt-4 space-y-3">
              <div>
                <label className="block text-sm text-gray-600">File (PDF / Image)</label>
                <input ref={fileInputRef} name="file" type="file" accept="application/pdf,image/*" required className="mt-1" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input name="title" placeholder="Certificate title" className="border px-3 py-2 rounded-md" />
                <input name="authority" placeholder="Issuing authority" className="border px-3 py-2 rounded-md" />
                <select name="type" className="border px-3 py-2 rounded-md">
                  <option>Academic</option>
                  <option>Workshop</option>
                  <option>Internship</option>
                  <option>MOOC</option>
                  <option>Other</option>
                </select>
                <input name="date" type="date" className="border px-3 py-2 rounded-md" />
              </div>

              <label className="inline-flex items-center gap-2">
                <input type="checkbox" name="linked" />
                <span className="text-sm text-gray-600">Add to portfolio after upload</span>
              </label>

              <label className="inline-flex items-center gap-2">
                <input type="checkbox" name="verify" />
                <span className="text-sm text-gray-600">Submit for verification (blockchain)</span>
              </label>

              <div className="flex items-center justify-end gap-3">
                <button type="button" onClick={() => setUploadOpen(false)} className="px-4 py-2 rounded-md border">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-md bg-indigo-600 text-white">{uploading ? "Uploading..." : "Submit for Verification"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ----- Helper components -----
function SummaryCard({ label, value, accent = "gray" }) {
  const color = accent === "green" ? "from-green-100 to-green-50" : accent === "orange" ? "from-orange-100 to-orange-50" : accent === "indigo" ? "from-indigo-100 to-indigo-50" : "from-gray-100 to-gray-50";
  return (
    <div className="p-4 rounded-lg bg-white shadow-sm flex items-center gap-4">
      <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${color} flex items-center justify-center`}>📄</div>
      <div>
        <div className="text-sm text-gray-500">{label}</div>
        <div className="text-xl font-semibold">{value}</div>
      </div>
    </div>
  );
}

function FilterPill({ label, active, onClick }) {
  return (
    <button onClick={onClick} className={`${active ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"} px-3 py-1 rounded-full text-sm`}>{label}</button>
  );
}
