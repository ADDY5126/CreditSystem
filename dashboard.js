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
    // AI Engine Inputs
    responseTimeMinutes: 4,
    cancellationRatePct: 2,
    textReviews: [
      { text: 'Excellent driver, very punctual and professional. Highly recommended!', weight: 1 },
      { text: 'Outstanding work on the construction site. Reliable and dedicated.', weight: 1 },
      { text: 'Great freelancer, delivered amazing results on time.', weight: 0.8 },
      { text: 'Very trustworthy and consistent. Will hire again.', weight: 1 },
      { text: 'Brilliant work ethic. Extremely professional.', weight: 0.9 },
    ],
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
    // AI Engine Inputs
    responseTimeMinutes: 18,
    cancellationRatePct: 11,
    textReviews: [
      { text: 'Good work overall, somewhat slow but delivered decent results.', weight: 1 },
      { text: 'Average quality, did not follow instructions completely.', weight: 1 },
      { text: 'Nice freelancer, cooperative and friendly. Quite helpful.', weight: 0.9 },
      { text: 'Inconsistent quality but generally satisfactory work.', weight: 0.8 },
    ],
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
    // AI Engine Inputs
    responseTimeMinutes: 55,
    cancellationRatePct: 28,
    textReviews: [
      { text: 'Terrible attitude and very slow. Did not complete work properly.', weight: 1 },
      { text: 'Poor performance, arrived late multiple times. Disappointing.', weight: 1 },
      { text: 'Bad experience. Cancelled last minute without notice. Unreliable.', weight: 1 },
      { text: 'Average at best. Careless with instructions.', weight: 0.8 },
    ],
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

  // AI Panel (non-blocking, fires after DOM settles)
  if (typeof renderAIAnalysisPanel === 'function') {
    renderAIAnalysisPanel(worker);
  }
}

function getBadge(score) {
  if (score >= 90) return { badge: 'Excellent', badgeClass: 'excellent' };
  if (score >= 80) return { badge: 'Great',    badgeClass: 'excellent' };
  if (score >= 60) return { badge: 'Good',     badgeClass: 'good' };
  if (score >= 50) return { badge: 'Average',  badgeClass: 'average' };
  if (score >= 30) return { badge: 'Poor',     badgeClass: 'average' };
  return                   { badge: 'Trash',   badgeClass: 'poor' };
}

function getScoreColors(score) {
  if (score >= 80) return { from: '#005F02', to: '#C0B87A' };   // green → gold
  if (score >= 50) return { from: '#b45309', to: '#fbbf24' };   // amber → yellow
  return              { from: '#991b1b', to: '#ef4444' };        // dark red → red
}

function animateScoreRing(score) {
  const circle = document.getElementById('bigScoreCircle');
  if (!circle) return;

  // Update gradient colors based on score
  const grad = document.getElementById('bigScoreGrad');
  if (grad) {
    const { from, to } = getScoreColors(score);
    const stops = grad.querySelectorAll('stop');
    if (stops[0]) stops[0].setAttribute('stop-color', from);
    if (stops[1]) stops[1].setAttribute('stop-color', to);
  }

  // Also recolor the background track ring to match faintly
  const track = circle.previousElementSibling;
  if (track && track.tagName === 'circle') {
    const score80 = score >= 80;
    const score50 = score >= 50;
    track.setAttribute('stroke',
      score80 ? 'rgba(0,95,2,0.12)' :
      score50 ? 'rgba(180,83,9,0.12)' :
                'rgba(153,27,27,0.12)'
    );
  }

  // Animate arc
  const circumference = 477.5;
  const offset = circumference - (score / 100) * circumference;
  setTimeout(() => {
    circle.style.transition = 'stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)';
    circle.style.strokeDashoffset = offset;
  }, 100);
}

function scoreColor(pct) {
  if (pct >= 80) return 'linear-gradient(90deg, #005F02, #C0B87A)';   // green → gold
  if (pct >= 50) return 'linear-gradient(90deg, #b45309, #fbbf24)';   // amber → yellow
  return              'linear-gradient(90deg, #991b1b, #ef4444)';      // dark red → red
}

function animateBar(barId, pctId, pct, label) {
  const bar = document.getElementById(barId);
  const pctEl = document.getElementById(pctId);
  if (bar) {
    bar.style.background = scoreColor(pct);
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

  const workerScore = currentWorker.trustScore;
  const barBg = scoreColor(workerScore);

  container.innerHTML = data.map((val, i) => {
    const pct = maxVal > 0 ? (val / maxVal) * 100 : 0;
    return `
      <div class="chart-bar-wrap">
        <div class="chart-bar" style="height:${pct}%;background:${barBg}" data-val="${val > 0 ? '\u20B9'+val.toLocaleString() : 'No work'}"></div>
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

/* ——— AI Analysis Panel ——— */
function renderAIAnalysisPanel(worker) {
  const panel = document.getElementById('aiAnalysisPanel');
  if (!panel || typeof TrustScoreAI === 'undefined') return;

  // Show loading state
  panel.innerHTML = `
    <div class="ai-panel-loading">
      <div class="ai-spinner"></div>
      <span>AI Agent analyzing ${worker.name}'s profile...</span>
    </div>`;

  // Simulate async processing
  setTimeout(() => {
    const result = TrustScoreAI.analyzeFromWorkerRecord(worker);
    const { trustScore, trustCategory, recommendation, factorScores, explanation } = result;
    const { keyFactors, penalties, suggestions, narrative, adaptiveRules } = explanation;

    const trustColor = trustCategory.color;
    const priorityClass = { critical: 'penalty-critical', high: 'penalty-high', moderate: 'penalty-moderate', low: 'penalty-low', info: 'penalty-info' };
    const sugPriClass   = { critical: 'sug-critical', high: 'sug-high', medium: 'sug-medium', low: 'sug-low', info: 'sug-info' };
    const classMap = { excellent: 'fi-excellent', good: 'fi-good', average: 'fi-average', poor: 'fi-poor' };

    panel.innerHTML = `
      <!-- Header -->
      <div class="ai-panel-header">
        <div class="ai-header-left">
          <div class="ai-brain-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M12 2a4 4 0 0 1 4 4c0 .34-.05.67-.13.99A4 4 0 0 1 19 10a4 4 0 0 1-2 3.46V14a4 4 0 0 1-4 4H11a4 4 0 0 1-4-4v-.54A4 4 0 0 1 5 10a4 4 0 0 1 3.13-3.88A4 4 0 0 1 12 2z"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
          </div>
          <div>
            <h3 class="ai-panel-title">AI Credit Analysis</h3>
            <p class="ai-panel-sub">Intelligent heuristic agent · ${new Date().toLocaleTimeString()}</p>
          </div>
        </div>
        <div class="ai-trust-badge" style="background:${trustCategory.bgColor};border-color:${trustColor};color:${trustColor}">
          <span class="ai-trust-icon">${trustCategory.icon}</span>
          <span>${trustCategory.label}</span>
        </div>
      </div>

      <!-- Narrative -->
      <div class="ai-narrative">
        <div class="ai-narrative-icon">🤖</div>
        <p class="ai-narrative-text">${narrative}</p>
      </div>

      <!-- Score + Recommendation Row -->
      <div class="ai-score-rec-row">
        <div class="ai-score-block">
          <div class="ai-score-ring-wrap">
            <svg width="110" height="110" viewBox="0 0 110 110">
              <circle cx="55" cy="55" r="46" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="10"/>
              <circle cx="55" cy="55" r="46" fill="none" stroke="${trustColor}" stroke-width="10"
                stroke-dasharray="289" stroke-dashoffset="${289 - (trustScore/100)*289}"
                stroke-linecap="round" transform="rotate(-90 55 55)"
                style="filter:drop-shadow(0 0 8px ${trustColor}60)"/>
            </svg>
            <div class="ai-score-center">
              <span class="ai-score-num" style="color:${trustColor}">${trustScore}</span>
              <span class="ai-score-sub">/100</span>
            </div>
          </div>
          <div class="ai-score-labels">
            <div class="ai-score-label-item">Trust Score</div>
            <div class="ai-score-raw">Raw: ${result.rawScore}</div>
          </div>
        </div>
        <div class="ai-rec-block" style="border-color:${
          recommendation.action==='APPROVE'?'rgba(34,197,94,0.3)':
          recommendation.action==='CONDITIONAL'?'rgba(245,158,11,0.3)':'rgba(239,68,68,0.3)'
        };background:${
          recommendation.action==='APPROVE'?'rgba(34,197,94,0.07)':
          recommendation.action==='CONDITIONAL'?'rgba(245,158,11,0.07)':'rgba(239,68,68,0.07)'
        }">
          <div class="ai-rec-action-label">
            <span class="ai-rec-icon">${recommendation.action==='APPROVE'?'✓':recommendation.action==='CONDITIONAL'?'◎':'✗'}</span>
            <span class="ai-rec-action" style="color:${
              recommendation.action==='APPROVE'?'#22c55e':
              recommendation.action==='CONDITIONAL'?'#f59e0b':'#ef4444'
            }">${recommendation.label}</span>
          </div>
          <p class="ai-rec-detail">${recommendation.detail}</p>
          <div class="ai-rec-meta">
            ${recommendation.action !== 'REJECT' ? `<span>Rate: ${recommendation.interestRate}</span>` : ''}
            ${recommendation.maxEligible > 0 ? `<span>Max: ₹${recommendation.maxEligible.toLocaleString('en-IN')}</span>` : ''}
            <span>Confidence: ${recommendation.confidence}</span>
          </div>
        </div>
      </div>

      <!-- Factor Breakdown -->
      <div class="ai-section">
        <h4 class="ai-section-title">🔍 Key Contributing Factors</h4>
        <div class="ai-factors-grid">
          ${keyFactors.map(f => `
            <div class="ai-factor-item ${classMap[f.classification] || ''}">
              <div class="ai-factor-header">
                <span class="ai-factor-label">${f.label}</span>
                <span class="ai-factor-score" style="color:${
                  f.classification==='excellent'?'#22c55e':
                  f.classification==='good'?'#a3e635':
                  f.classification==='average'?'#f59e0b':'#ef4444'
                }">${f.score.toFixed(0)}/100</span>
              </div>
              <div class="ai-factor-bar-wrap">
                <div class="ai-factor-bar" style="width:${f.score}%;background:${
                  f.classification==='excellent'?'linear-gradient(90deg,#166534,#22c55e)':
                  f.classification==='good'?'linear-gradient(90deg,#3f6212,#a3e635)':
                  f.classification==='average'?'linear-gradient(90deg,#92400e,#f59e0b)':'linear-gradient(90deg,#7f1d1d,#ef4444)'
                }"></div>
              </div>
              <div class="ai-factor-meta">Weight: ${f.weight.toFixed(1)}% — Impact: ${f.impact.toFixed(1)} pts</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Penalties -->
      ${penalties.length > 0 ? `
      <div class="ai-section">
        <h4 class="ai-section-title">⚠ Penalties Applied</h4>
        <div class="ai-penalties-list">
          ${penalties.map(p => `
            <div class="ai-penalty-item ${priorityClass[p.severity] || ''}"> 
              <div class="ai-penalty-label">
                <span class="ai-penalty-dot"></span>
                <span><strong>${p.label}</strong> · ${p.severity.toUpperCase()}</span>
              </div>
              <p class="ai-penalty-msg">${p.message}</p>
            </div>
          `).join('')}
        </div>
      </div>` : ''}

      <!-- Adaptive Rules -->
      ${adaptiveRules.length > 0 ? `
      <div class="ai-section">
        <h4 class="ai-section-title">🧠 Adaptive Reasoning Applied</h4>
        <div class="ai-rules-list">
          ${adaptiveRules.map(r => `
            <div class="ai-rule-item">
              <div class="ai-rule-adj" style="color:${r.adjustment >= 0 ? '#22c55e' : '#ef4444'}">${r.adjustment >= 0 ? '+' : ''}${r.adjustment} pts</div>
              <div>
                <div class="ai-rule-id">${r.id.replace(/_/g,' ')}</div>
                <div class="ai-rule-desc">${r.description}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>` : ''}

      <!-- Suggestions -->
      <div class="ai-section">
        <h4 class="ai-section-title">💡 How to Improve Your Score</h4>
        <div class="ai-suggestions-list">
          ${suggestions.map(s => `
            <div class="ai-suggestion ${sugPriClass[s.priority] || ''}">
              <div class="ai-sug-header">
                <span class="ai-sug-icon">${s.icon}</span>
                <span class="ai-sug-title">${s.title}</span>
                <span class="ai-sug-priority ${sugPriClass[s.priority] || ''}">${s.priority}</span>
              </div>
              <p class="ai-sug-action">${s.action}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Sentiment Details -->
      ${result._debug.sentimentResult && result._debug.sentimentResult.breakdown.length > 0 ? `
      <div class="ai-section">
        <h4 class="ai-section-title">💬 Sentiment Analysis on Reviews</h4>
        <div class="ai-sentiment-list">
          ${result._debug.sentimentResult.breakdown.map(b => `
            <div class="ai-sentiment-item">
              <div class="ai-sentiment-tag ${b.sentiment}">${b.sentiment}</div>
              <p class="ai-sentiment-text">&quot;${b.text}&quot;</p>
              <div class="ai-sentiment-score">Score: ${b.score.toFixed(2)}</div>
            </div>
          `).join('')}
        </div>
      </div>` : ''}
    `;
  }, 900);
}

/* ——— Init ——— */
renderDashboard(WORKERS[0]);
console.log('TrustScore Dashboard Loaded ✓ — AI Engine + 3 mock data sources');
