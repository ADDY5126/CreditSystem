/* ============================================================
   TrustTrack — Dashboard JavaScript
   Mock data from 3 platforms: RideConnect, FreelanceHub, BuildDay
   ============================================================ */

/* ——— MOCK WORKER DATA (3 different profiles) ——— */
const WORKERS = [
  {
    id: 0,
    name: 'Ramesh Kumar',
    initials: 'RK',
    location: 'Mumbai, MH · Ride Driver & Builder',
    trustScore: 92,
    scoreChange: '+3 pts this week',
    scoreDirection: 'positive',
    badge: 'Excellent',
    badgeClass: 'excellent',
    completion: 96,
    completionLabel: '96%',
    rating: 4.8,
    ratingLabel: '4.8★',
    income: 78,
    incomeLabel: '78%',
    tenure: 82,
    tenureLabel: '2.1yr',
    dispute: 97,
    disputeLabel: '0.3%',
    metrics: {
      earnings: '₹24,820',
      earningsChange: '▲ 12% vs last month',
      earningsDir: 'up',
      jobs: 431,
      jobsChange: '▲ 24 this month',
      rating: '4.8',
      ratingChange: '▲ 0.1 this week',
      streak: 18,
      streakChange: '🔥 Personal best!',
    },
    platforms: [
      { icon: '🚗', name: 'RideConnect', jobs: '324 trips completed' },
      { icon: '💼', name: 'FreelanceHub', jobs: '18 contracts done' },
      { icon: '🏗️', name: 'BuildDay', jobs: '89 days worked' },
    ],
    earnings14: [820, 1050, 740, 980, 1200, 850, 600, 1100, 950, 880, 1300, 760, 1020, 940],
    earnings6m: [18200, 21400, 19800, 22600, 24100, 24820],
    jobs: [
      { date: 'Apr 01', platform: 'RideConnect', desc: 'Airport Transfer · 28km', amount: '₹380', rating: 5, status: 'completed' },
      { date: 'Apr 01', platform: 'RideConnect', desc: 'City Ride · Andheri to Bandra', amount: '₹220', rating: 5, status: 'completed' },
      { date: 'Mar 31', platform: 'BuildDay', desc: 'Plastering — Malad Site', amount: '₹850', rating: 5, status: 'completed' },
      { date: 'Mar 30', platform: 'FreelanceHub', desc: 'Logo Design for Client', amount: '₹2,400', rating: 5, status: 'completed' },
      { date: 'Mar 29', platform: 'RideConnect', desc: '4 City Rides', amount: '₹760', rating: 4, status: 'completed' },
      { date: 'Mar 28', platform: 'BuildDay', desc: 'Foundation Work · Goregaon', amount: '₹850', rating: 5, status: 'completed' },
      { date: 'Mar 27', platform: 'FreelanceHub', desc: 'Web Research Task', amount: '₹600', rating: 4, status: 'completed' },
      { date: 'Mar 26', platform: 'RideConnect', desc: '6 City Rides', amount: '₹920', rating: 5, status: 'completed' },
      { date: 'Mar 25', platform: 'BuildDay', desc: 'Tile Work — Borivali Site', amount: '₹950', rating: 4, status: 'completed' },
      { date: 'Mar 24', platform: 'RideConnect', desc: '3 Rides + 1 Cancellation', amount: '₹480', rating: 4, status: 'completed' },
    ]
  },
  {
    id: 1,
    name: 'Priya Sharma',
    initials: 'PS',
    location: 'Delhi, DL · Freelancer',
    trustScore: 74,
    scoreChange: '+2 pts this week',
    scoreDirection: 'positive',
    badge: 'Good',
    badgeClass: 'good',
    completion: 80,
    completionLabel: '80%',
    rating: 4.2,
    ratingLabel: '4.2★',
    income: 55,
    incomeLabel: '55%',
    tenure: 55,
    tenureLabel: '0.8yr',
    dispute: 88,
    disputeLabel: '1.2%',
    metrics: {
      earnings: '₹14,200',
      earningsChange: '▲ 4% vs last month',
      earningsDir: 'up',
      jobs: 127,
      jobsChange: '▲ 11 this month',
      rating: '4.2',
      ratingChange: '= No change',
      streak: 5,
      streakChange: '↑ Building streak!',
    },
    platforms: [
      { icon: '💼', name: 'FreelanceHub', jobs: '89 contracts done' },
      { icon: '🚗', name: 'RideConnect', jobs: '38 trips completed' },
      { icon: '🏗️', name: 'BuildDay', jobs: '0 days worked' },
    ],
    earnings14: [500, 800, 200, 1100, 400, 900, 700, 300, 1200, 600, 450, 880, 550, 720],
    earnings6m: [9800, 11200, 10400, 13100, 13700, 14200],
    jobs: [
      { date: 'Apr 01', platform: 'FreelanceHub', desc: 'Data Entry Task', amount: '₹800', rating: 4, status: 'active' },
      { date: 'Mar 31', platform: 'RideConnect', desc: '2 City Rides', amount: '₹340', rating: 5, status: 'completed' },
      { date: 'Mar 30', platform: 'FreelanceHub', desc: 'Transcription · 2 hours', amount: '₹600', rating: 4, status: 'completed' },
      { date: 'Mar 29', platform: 'FreelanceHub', desc: 'Social Media Post Writing', amount: '₹500', rating: 3, status: 'completed' },
      { date: 'Mar 28', platform: 'RideConnect', desc: '3 City Rides', amount: '₹460', rating: 4, status: 'completed' },
      { date: 'Mar 27', platform: 'FreelanceHub', desc: 'Excel Data Analysis', amount: '₹1,200', rating: 5, status: 'completed' },
    ]
  },
  {
    id: 2,
    name: 'Arjun Singh',
    initials: 'AS',
    location: 'Pune, MH · Construction & Rides',
    trustScore: 41,
    scoreChange: '-3 pts this week',
    scoreDirection: 'negative',
    badge: 'Poor',
    badgeClass: 'average',
    completion: 62,
    completionLabel: '62%',
    rating: 3.6,
    ratingLabel: '3.6★',
    income: 40,
    incomeLabel: '40%',
    tenure: 30,
    tenureLabel: '0.3yr',
    dispute: 72,
    disputeLabel: '3.5%',
    metrics: {
      earnings: '₹8,600',
      earningsChange: '▼ 8% vs last month',
      earningsDir: 'down',
      jobs: 64,
      jobsChange: '▲ 6 this month',
      rating: '3.6',
      ratingChange: '▼ 0.2 this week',
      streak: 2,
      streakChange: '⚠ Try for streak!',
    },
    platforms: [
      { icon: '🏗️', name: 'BuildDay', jobs: '41 days worked' },
      { icon: '🚗', name: 'RideConnect', jobs: '23 trips completed' },
      { icon: '💼', name: 'FreelanceHub', jobs: '0 contracts' },
    ],
    earnings14: [300, 850, 0, 700, 400, 0, 800, 200, 650, 0, 900, 400, 550, 300],
    earnings6m: [4200, 5800, 6100, 7200, 8100, 8600],
    jobs: [
      { date: 'Apr 01', platform: 'BuildDay', desc: 'Painting — Kothrud Site', amount: '₹750', rating: 3, status: 'active' },
      { date: 'Mar 30', platform: 'RideConnect', desc: '1 City Ride', amount: '₹180', rating: 4, status: 'completed' },
      { date: 'Mar 28', platform: 'BuildDay', desc: 'Masonry Work', amount: '₹850', rating: 3, status: 'completed' },
      { date: 'Mar 25', platform: 'RideConnect', desc: '2 City Rides + Cancellation', amount: '₹280', rating: 3, status: 'completed' },
      { date: 'Mar 22', platform: 'BuildDay', desc: 'Cleaning & Maintenance', amount: '₹600', rating: 4, status: 'completed' },
    ]
  }
];

/* ——— Platform Colors & Icons ——— */
const PLATFORM_STYLES = {
  'RideConnect':   { color: '#3b82f6', bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.3)', icon: '🚗' },
  'FreelanceHub':  { color: '#10b981', bg: 'rgba(16,185,129,0.15)', border: 'rgba(16,185,129,0.3)', icon: '💼' },
  'BuildDay':      { color: '#f59e0b', bg: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.3)', icon: '🏗️' },
};

let currentWorker = WORKERS[0];
let currentChartMode = 'days';
let currentFilter = 'all';
let refreshTimeout;

/* ——— Render Dashboard ——— */
function renderDashboard(worker) {
  currentWorker = worker;

  // Update worker info
  document.getElementById('dashWorkerName').textContent = `${worker.name}'s Dashboard`;
  document.getElementById('dashWorkerSub').textContent = `${worker.location}`;
  document.getElementById('workerAvatar').textContent = worker.initials;
  document.getElementById('workerFullName').textContent = worker.name;
  document.getElementById('workerLocation').textContent = worker.location;

  // Update score badge dynamically based on score
  const { badge, badgeClass } = getBadge(worker.trustScore);
  const badgeEl = document.getElementById('scoreBadge');
  badgeEl.textContent = badge;
  badgeEl.className = `score-badge ${badgeClass}`;

  // Animate trust score ring
  animateScoreRing(worker.trustScore);
  document.getElementById('bigScoreNum').textContent = worker.trustScore;

  // Score change
  const changeEl = document.getElementById('scoreChange');
  changeEl.textContent = (worker.scoreDirection === 'positive' ? '▲ ' : '▼ ') + worker.scoreChange.replace('+','').replace('-','');
  changeEl.className = `score-change ${worker.scoreDirection}`;

  // Breakdown bars
  animateBar('bar-completion', 'pct-completion', worker.completion, worker.completionLabel);
  animateBar('bar-rating', 'pct-rating', worker.rating / 5 * 100, worker.ratingLabel);
  animateBar('bar-income', 'pct-income', worker.income, worker.incomeLabel);
  animateBar('bar-tenure', 'pct-tenure', worker.tenure, worker.tenureLabel);
  animateBar('bar-dispute', 'pct-dispute', worker.dispute, worker.disputeLabel);

  // Platform connections
  renderPlatforms(worker.platforms);

  // Metrics
  const m = worker.metrics;
  document.getElementById('metricEarnings').textContent = m.earnings;
  document.getElementById('metricEarningsChange').textContent = m.earningsChange;
  document.getElementById('metricEarningsChange').className = `metric-card-change ${m.earningsDir}`;
  document.getElementById('metricJobs').textContent = m.jobs.toLocaleString();
  document.getElementById('metricJobsChange').textContent = m.jobsChange;
  document.getElementById('metricRating').textContent = m.rating;
  document.getElementById('metricRatingChange').textContent = m.ratingChange;
  document.getElementById('metricStreak').textContent = m.streak;
  document.getElementById('metricStreakChange').textContent = m.streakChange;

  // Chart
  renderChart(currentChartMode);

  // Job table
  renderJobTable('all');
}

function getBadge(score) {
  if (score >= 90) return { badge: 'Excellent', badgeClass: 'excellent' };
  if (score >= 80) return { badge: 'Great',    badgeClass: 'excellent' };
  if (score >= 60) return { badge: 'Good',     badgeClass: 'good' };
  if (score >= 50) return { badge: 'Average',  badgeClass: 'average' };
  if (score >= 30) return { badge: 'Poor',     badgeClass: 'average' };
  return                   { badge: 'Trash',   badgeClass: 'poor' };
}

function animateScoreRing(score) {
  const circle = document.getElementById('bigScoreCircle');
  if (!circle) return;
  const circumference = 477.5;
  const offset = circumference - (score / 100) * circumference;
  setTimeout(() => {
    circle.style.transition = 'stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)';
    circle.style.strokeDashoffset = offset;
  }, 100);
}

function animateBar(barId, pctId, pct, label) {
  const bar = document.getElementById(barId);
  const pctEl = document.getElementById(pctId);
  if (bar) {
    bar.style.transition = 'width 1s ease';
    bar.style.width = '0%';
    setTimeout(() => { bar.style.width = `${pct}%`; }, 100);
  }
  if (pctEl) pctEl.textContent = label;
}

function renderPlatforms(platforms) {
  const list = document.getElementById('platformConnectionsList');
  list.innerHTML = platforms.map(p => `
    <div class="connection-item">
      <span class="conn-icon">${p.icon}</span>
      <div class="conn-info">
        <span class="conn-name">${p.name}</span>
        <span class="conn-jobs">${p.jobs}</span>
      </div>
      <div class="conn-status" ${p.jobs.includes('0') ? 'style="background:#4b5563;box-shadow:none"' : ''}></div>
    </div>
  `).join('');
}

/* ——— Earnings Chart ——— */
function renderChart(mode) {
  const container = document.getElementById('earningsChart');
  const data = mode === 'days' ? currentWorker.earnings14 : currentWorker.earnings6m;
  const labels = mode === 'days'
    ? ['18','19','20','21','22','23','24','25','26','27','28','29','30','31']
    : ['Nov','Dec','Jan','Feb','Mar','Apr'];
  const maxVal = Math.max(...data);

  container.innerHTML = data.map((val, i) => {
    const pct = maxVal > 0 ? (val / maxVal) * 100 : 0;
    return `
      <div class="chart-bar-wrap">
        <div class="chart-bar" style="height:${pct}%" data-val="${val > 0 ? '₹'+val.toLocaleString() : 'No work'}"></div>
        <span class="chart-day">${labels[i]}</span>
      </div>
    `;
  }).join('');
}

window.switchChart = function(mode) {
  currentChartMode = mode;
  document.getElementById('btnDays').classList.toggle('active', mode === 'days');
  document.getElementById('btnMonths').classList.toggle('active', mode === 'months');
  renderChart(mode);
};

/* ——— Job Table ——— */
function renderJobTable(filter) {
  currentFilter = filter;
  const jobs = filter === 'all'
    ? currentWorker.jobs
    : currentWorker.jobs.filter(j => j.platform === filter);

  const tbody = document.getElementById('jobTableBody');
  tbody.innerHTML = jobs.map(j => {
    const ps = PLATFORM_STYLES[j.platform] || {};
    const stars = '★'.repeat(j.rating) + '☆'.repeat(5 - j.rating);
    const statusClass = j.status === 'completed' ? 'completed' : j.status === 'active' ? 'active' : 'pending';
    return `
      <tr>
        <td style="color:var(--text-muted)">${j.date}</td>
        <td>
          <span class="job-platform-badge" style="background:${ps.bg};border:1px solid ${ps.border};color:${ps.color}">
            ${ps.icon} ${j.platform}
          </span>
        </td>
        <td>${j.desc}</td>
        <td style="font-weight:700;color:var(--accent-green)">${j.amount}</td>
        <td><span class="rating-stars">${stars}</span></td>
        <td><span class="status-pill ${statusClass}">${j.status}</span></td>
      </tr>
    `;
  }).join('') || `<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:24px">No jobs found for this platform</td></tr>`;
}

window.filterJobs = function(filter) {
  ['filterAll','filterRide','filterFreelance','filterBuild'].forEach(id => {
    document.getElementById(id)?.classList.remove('active');
  });
  const map = { all: 'filterAll', RideConnect: 'filterRide', FreelanceHub: 'filterFreelance', BuildDay: 'filterBuild' };
  document.getElementById(map[filter])?.classList.add('active');
  renderJobTable(filter);
};

/* ——— Worker Selector ——— */
document.getElementById('workerSelector')?.addEventListener('change', function() {
  renderDashboard(WORKERS[parseInt(this.value)]);
});

/* ——— Refresh Button ——— */
document.getElementById('refreshBtn')?.addEventListener('click', function() {
  this.classList.add('spinning');
  this.textContent = ' Refreshing...';
  clearTimeout(refreshTimeout);
  refreshTimeout = setTimeout(() => {
    renderDashboard(currentWorker);
    this.classList.remove('spinning');
    this.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg> Refresh Data`;
  }, 1200);
});

/* ——— Init ——— */
renderDashboard(WORKERS[0]);
console.log('TrustScore Dashboard Loaded ✓ — Powered by 3 mock data sources');
