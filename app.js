const STORAGE_KEY = "ai-adoption-submissions-v1";
const ADMIN_PASSWORD = "aicouncil";

const pillars = [
  {
    title: "Manager engagement",
    accent: "#1f6feb",
    purpose: "Understand where teams are today and make AI adoption manager-led.",
    outputs: ["Team maturity baseline", "Blocker summary", "Manager commitments"],
  },
  {
    title: "Role-based enablement",
    accent: "#00a7d8",
    purpose: "Help employees apply AI to real workflows instead of generic training.",
    outputs: ["Use-case library", "Prompt templates", "Office hours"],
  },
  {
    title: "AI champions",
    accent: "#4f46e5",
    purpose: "Create local momentum through peer examples and support.",
    outputs: ["Champion roster", "Success stories", "Feedback loop"],
  },
  {
    title: "Metrics and impact",
    accent: "#16a34a",
    purpose: "Measure adoption, engagement, capability, and business value.",
    outputs: ["Adoption scorecard", "Heatmap", "Impact tracker"],
  },
  {
    title: "Growth alignment",
    accent: "#f59e0b",
    purpose: "Position AI fluency as part of modern execution capability.",
    outputs: ["Promotion criteria", "IPF linkage", "Leadership decisions"],
  },
];

const demoSubmissions = [
  {
    manager: "Allie Johnson",
    team: "Customer Success Ops",
    teamSize: 18,
    approvedTools: "ChatGPT Enterprise, Copilot",
    maturity: 2,
    adoptionBreadth: "Some repeatable workflows",
    confidence: "Medium",
    responsibleConfidence: "Some confidence",
    trainingStatus: "In progress",
    support: "Prompt and workflow templates",
    expectedImpact: "Time saved",
    championStatus: "Needs AI Council support",
    blockers: ["Unclear use cases", "Time and prioritization"],
    currentUsage: "A few people use AI for meeting summaries and first drafts, but usage is inconsistent.",
    useCases: "Summarize customer notes, draft follow-up actions, generate recurring status updates.",
    commitment: "Identify two repeatable workflows and review examples in the next team meeting.",
    councilAsk: "Provide reusable customer follow-up prompts and a short approved-use demo.",
    metricsInput: "Track time saved on follow-up notes and consistency of customer summaries.",
    createdAt: "2026-06-13T09:30:00.000Z",
  },
  {
    manager: "Stefany Ramos",
    team: "Partner Programs",
    teamSize: 11,
    approvedTools: "ChatGPT Enterprise",
    maturity: 1,
    adoptionBreadth: "Limited to a few individuals",
    confidence: "Low",
    responsibleConfidence: "Needs clarity",
    trainingStatus: "Not started",
    support: "Role-based training",
    expectedImpact: "Quality / consistency improved",
    championStatus: "Not identified yet",
    blockers: ["Mindset or confidence", "Data / security concerns", "Unclear use cases"],
    currentUsage: "Usage is mostly exploratory and not yet part of recurring team routines.",
    useCases: "Draft partner comms, summarize program feedback, compare launch readiness notes.",
    commitment: "Nominate an AI champion and schedule a role-based enablement session.",
    councilAsk: "Run a team-specific starter session and clarify responsible data handling.",
    metricsInput: "Track training completion, confidence lift, and number of use cases submitted.",
    createdAt: "2026-06-13T10:15:00.000Z",
  },
  {
    manager: "Marcus Lee",
    team: "Field Enablement",
    teamSize: 24,
    approvedTools: "ChatGPT Enterprise, approved internal assistants",
    maturity: 3,
    adoptionBreadth: "Broad team usage",
    confidence: "High",
    responsibleConfidence: "Confident",
    trainingStatus: "Completed",
    support: "Office hours / demos",
    expectedImpact: "Faster response times",
    championStatus: "Identified",
    blockers: ["Time and prioritization"],
    currentUsage: "Multiple team members use AI for outlines, first drafts, and enablement assets.",
    useCases: "Create enablement outlines, convert call notes into FAQs, draft demo narratives.",
    commitment: "Share one AI-enabled improvement in staff and submit two templates to the library.",
    councilAsk: "Help package two reusable templates for other teams.",
    metricsInput: "Measure reusable assets created and reduction in first-draft cycle time.",
    createdAt: "2026-06-13T11:10:00.000Z",
  },
  {
    manager: "Priya Shah",
    team: "Business Operations",
    teamSize: 15,
    approvedTools: "Copilot",
    maturity: 2,
    adoptionBreadth: "Some repeatable workflows",
    confidence: "Medium",
    responsibleConfidence: "Needs clarity",
    trainingStatus: "In progress",
    support: "Approved tool guidance",
    expectedImpact: "Quality / consistency improved",
    championStatus: "Identified",
    blockers: ["Data / security concerns", "Tool access issues"],
    currentUsage: "AI is used in reporting drafts, but not yet in a consistent operating rhythm.",
    useCases: "Analyze weekly reports, find outliers, draft leadership summaries.",
    commitment: "Clarify approved usage guidance and test AI on two reporting workflows.",
    councilAsk: "Clarify approved data boundaries and tool access path.",
    metricsInput: "Measure reporting cycle time and quality of leadership summaries.",
    createdAt: "2026-06-13T12:05:00.000Z",
  },
];

const maturityLabels = {
  1: "Awareness",
  2: "Experimentation",
  3: "Adoption",
  4: "Embedded",
};

const heatColors = {
  1: "#fee2e2",
  2: "#fef3c7",
  3: "#dbeafe",
  4: "#dcfce7",
};

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getSubmissions() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function setSubmissions(submissions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
}

function getDemoSubmissions() {
  return JSON.parse(JSON.stringify(demoSubmissions));
}

function ensureDemoData() {
  if (getSubmissions().length === 0) {
    setSubmissions(getDemoSubmissions());
  }
}

function renderPillars() {
  const grid = document.querySelector("#pillarGrid");
  grid.innerHTML = pillars
    .map(
      (pillar, index) => `
        <article class="pillar-card" style="--accent:${pillar.accent}">
          <span>${index + 1}</span>
          <h3>${pillar.title}</h3>
          <p>${pillar.purpose}</p>
          <ul>
            ${pillar.outputs.map((output) => `<li>${output}</li>`).join("")}
          </ul>
        </article>
      `,
    )
    .join("");
}

function countUseCases(submissions) {
  return submissions.reduce((total, item) => {
    const count = String(item.useCases || "")
      .split(/,|\n/)
      .map((entry) => entry.trim())
      .filter(Boolean).length;
    return total + Math.max(count, 1);
  }, 0);
}

function getCounts(values) {
  return values.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
}

function averageMaturity(submissions) {
  if (!submissions.length) return "0.0";
  const total = submissions.reduce((sum, item) => sum + Number(item.maturity), 0);
  return (total / submissions.length).toFixed(1);
}

function updateHeroStats(submissions) {
  const blockerCounts = getCounts(submissions.flatMap((item) => item.blockers || []));
  const topBlocker = Object.entries(blockerCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "None";
  document.querySelector("#heroTeamCount").textContent = submissions.length;
  document.querySelector("#heroAvgMaturity").textContent = averageMaturity(submissions);
  document.querySelector("#heroUseCases").textContent = countUseCases(submissions);
  document.querySelector("#heroTopBlocker").textContent = topBlocker;
}

function renderDashboard() {
  const submissions = getSubmissions();
  updateHeroStats(submissions);

  const allBlockers = submissions.flatMap((item) => item.blockers || []);
  const blockerCounts = getCounts(allBlockers);
  const sortedBlockers = Object.entries(blockerCounts).sort((a, b) => b[1] - a[1]);
  const topBlocker = sortedBlockers[0]?.[0] || "None";
  const supportCounts = getCounts(submissions.map((item) => item.support).filter(Boolean));
  const sortedSupport = Object.entries(supportCounts).sort((a, b) => b[1] - a[1]);
  const topSupport = sortedSupport[0]?.[0] || "None";
  const championCount = submissions.filter((item) => item.championStatus === "Identified").length;

  document.querySelector("#teamCount").textContent = submissions.length;
  document.querySelector("#avgMaturity").textContent = averageMaturity(submissions);
  document.querySelector("#useCaseCount").textContent = countUseCases(submissions);
  document.querySelector("#topBlocker").textContent = topBlocker;
  document.querySelector("#topSupport").textContent = topSupport;
  document.querySelector("#championCount").textContent = championCount;

  renderHeatmap(submissions);
  renderBlockerBars(sortedBlockers);
  renderMaturityBars(submissions);
  renderSubmissionList(submissions);
  renderSupportBars(sortedSupport);
  renderCommitmentTracker(submissions);
}

function renderHeatmap(submissions) {
  const heatmap = document.querySelector("#heatmap");
  if (!submissions.length) {
    heatmap.innerHTML = `<p class="status">No submissions yet.</p>`;
    return;
  }

  heatmap.innerHTML = submissions
    .sort((a, b) => Number(a.maturity) - Number(b.maturity))
    .map(
      (item) => `
        <article class="heat-tile" style="--heat-bg:${heatColors[item.maturity]}">
          <strong>${escapeHTML(item.team)}</strong>
          <span>Level ${escapeHTML(item.maturity)} - ${escapeHTML(maturityLabels[item.maturity])}</span>
          <p>${escapeHTML((item.blockers || []).slice(0, 2).join(" • ") || "No blocker selected")}</p>
        </article>
      `,
    )
    .join("");
}

function renderBlockerBars(sortedBlockers) {
  const list = document.querySelector("#blockerBars");
  if (!sortedBlockers.length) {
    list.innerHTML = `<p class="status">No blocker data yet.</p>`;
    return;
  }

  const max = Math.max(...sortedBlockers.map(([, count]) => count), 1);
  list.innerHTML = sortedBlockers
    .map(
      ([label, count]) => `
        <div class="bar-row">
          <span>${escapeHTML(label)}</span>
          <div class="bar-track"><div class="bar-fill" style="--width:${(count / max) * 100}%"></div></div>
          <strong>${count}</strong>
        </div>
      `,
    )
    .join("");
}

function renderMaturityBars(submissions) {
  const list = document.querySelector("#maturityBars");
  const counts = getCounts(submissions.map((item) => `Level ${item.maturity} - ${maturityLabels[item.maturity]}`));
  const rows = [1, 2, 3, 4].map((level) => {
    const label = `Level ${level} - ${maturityLabels[level]}`;
    return [label, counts[label] || 0];
  });
  const max = Math.max(...rows.map(([, count]) => count), 1);
  list.innerHTML = rows
    .map(
      ([label, count]) => `
        <div class="bar-row">
          <span>${escapeHTML(label)}</span>
          <div class="bar-track"><div class="bar-fill" style="--width:${(count / max) * 100}%"></div></div>
          <strong>${count}</strong>
        </div>
      `,
    )
    .join("");
}

function renderSubmissionList(submissions) {
  const list = document.querySelector("#submissionList");
  if (!submissions.length) {
    list.innerHTML = `<p class="status">No submissions yet.</p>`;
    return;
  }

  list.innerHTML = [...submissions]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6)
    .map(
      (item) => `
        <article class="submission-card">
          <h4>${escapeHTML(item.team)} <span>Level ${escapeHTML(item.maturity)}</span></h4>
          <p><strong>${escapeHTML(item.manager)}</strong> | ${escapeHTML(item.confidence)} confidence | ${escapeHTML(item.support)}</p>
          <p>${escapeHTML(item.commitment)}</p>
        </article>
      `,
    )
    .join("");
}

function renderSupportBars(sortedSupport) {
  const list = document.querySelector("#supportBars");
  if (!sortedSupport.length) {
    list.innerHTML = `<p class="status">No support requests yet.</p>`;
    return;
  }

  const max = Math.max(...sortedSupport.map(([, count]) => count), 1);
  list.innerHTML = sortedSupport
    .map(
      ([label, count]) => `
        <div class="bar-row">
          <span>${escapeHTML(label)}</span>
          <div class="bar-track"><div class="bar-fill" style="--width:${(count / max) * 100}%"></div></div>
          <strong>${count}</strong>
        </div>
      `,
    )
    .join("");
}

function renderCommitmentTracker(submissions) {
  const list = document.querySelector("#commitmentList");
  if (!submissions.length) {
    list.innerHTML = `<p class="status">No commitments yet.</p>`;
    return;
  }

  list.innerHTML = [...submissions]
    .sort((a, b) => Number(a.maturity) - Number(b.maturity))
    .slice(0, 6)
    .map(
      (item) => `
        <article class="submission-card priority-${Number(item.maturity) <= 2 ? "high" : "standard"}">
          <h4>${escapeHTML(item.team)} <span>${Number(item.maturity) <= 2 ? "Priority support" : "Monitor"}</span></h4>
          <p><strong>Commitment:</strong> ${escapeHTML(item.commitment)}</p>
          <p><strong>AI Council ask:</strong> ${escapeHTML(item.councilAsk || item.support)}</p>
        </article>
      `,
    )
    .join("");
}

function handleManagerSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const blockers = formData.getAll("blockers");
  if (blockers.length > 3) {
    document.querySelector("#formStatus").textContent = "Choose up to 3 blockers before submitting.";
    return;
  }

  const submission = {
    manager: formData.get("manager").trim(),
    team: formData.get("team").trim(),
    teamSize: Number(formData.get("teamSize")),
    approvedTools: formData.get("approvedTools").trim(),
    maturity: Number(formData.get("maturity")),
    adoptionBreadth: formData.get("adoptionBreadth"),
    confidence: formData.get("confidence"),
    responsibleConfidence: formData.get("responsibleConfidence"),
    trainingStatus: formData.get("trainingStatus"),
    support: formData.get("support"),
    expectedImpact: formData.get("expectedImpact"),
    championStatus: formData.get("championStatus"),
    blockers,
    currentUsage: formData.get("currentUsage").trim(),
    useCases: formData.get("useCases").trim(),
    commitment: formData.get("commitment").trim(),
    councilAsk: formData.get("councilAsk").trim(),
    metricsInput: formData.get("metricsInput").trim(),
    createdAt: new Date().toISOString(),
  };

  const submissions = [submission, ...getSubmissions()];
  setSubmissions(submissions);
  form.reset();
  form.querySelector('[name="teamSize"]').value = 12;
  updateBlockerLimit();
  document.querySelector("#formStatus").textContent = "Baseline submitted. Admin dashboard updated.";
  renderDashboard();
}

function unlockAdmin() {
  const password = document.querySelector("#adminPassword").value;
  const loginStatus = document.querySelector("#loginStatus");
  if (password !== ADMIN_PASSWORD) {
    loginStatus.textContent = "Incorrect password.";
    return;
  }
  document.querySelector("#loginPanel").classList.add("is-hidden");
  document.querySelector("#dashboard").classList.remove("is-hidden");
  loginStatus.textContent = "";
  renderDashboard();
}

function exportCsv() {
  const submissions = getSubmissions();
  const headers = [
    "manager",
    "team",
    "teamSize",
    "approvedTools",
    "maturity",
    "adoptionBreadth",
    "confidence",
    "responsibleConfidence",
    "trainingStatus",
    "support",
    "expectedImpact",
    "championStatus",
    "blockers",
    "currentUsage",
    "useCases",
    "commitment",
    "councilAsk",
    "metricsInput",
    "createdAt",
  ];
  const rows = submissions.map((item) =>
    headers
      .map((key) => {
        const value = Array.isArray(item[key]) ? item[key].join("; ") : item[key];
        return `"${String(value ?? "").replaceAll('"', '""')}"`;
      })
      .join(","),
  );
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "ai-adoption-manager-baseline.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function resetDemoData() {
  const form = document.querySelector("#managerForm");
  if (form) {
    form.reset();
    form.querySelector('[name="teamSize"]').value = 12;
  }
  setSubmissions(getDemoSubmissions());
  updateBlockerLimit();
  renderDashboard();
  document.querySelector("#formStatus").textContent =
    "Demo data loaded. The dashboard is showing sample manager baselines.";
}

function updateBlockerLimit() {
  const checkboxes = [...document.querySelectorAll('input[name="blockers"]')];
  const checked = checkboxes.filter((box) => box.checked);
  checkboxes.forEach((box) => {
    box.disabled = checked.length >= 3 && !box.checked;
  });
}

function init() {
  renderPillars();
  ensureDemoData();
  renderDashboard();

  document.querySelector("#managerForm").addEventListener("submit", handleManagerSubmit);
  document.querySelectorAll('input[name="blockers"]').forEach((box) => {
    box.addEventListener("change", updateBlockerLimit);
  });
  document.querySelector("#adminLogin").addEventListener("click", unlockAdmin);
  document.querySelector("#adminPassword").addEventListener("keydown", (event) => {
    if (event.key === "Enter") unlockAdmin();
  });
  document.querySelector("#loadDemo").addEventListener("click", resetDemoData);
  document.querySelector("#resetData").addEventListener("click", resetDemoData);
  document.querySelector("#exportCsv").addEventListener("click", exportCsv);
  updateBlockerLimit();
}

init();
