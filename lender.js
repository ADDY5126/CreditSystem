/* ============================================================
   TrustTrack — Lender Portal JavaScript
   Loan engine + async queue + data ingestion simulation
   ============================================================ */

/* ——— APPLICANT DATA ——— */
const APPLICANTS = [
  {
    id: 0, name: 'Ramesh Kumar', score: 782,
    completion: 96, rating: 4.8, income: 78,
    completionLabel: '96%', ratingLabel: '4.8★', incomeLabel: '78%',
    maxLoan: 15000, interestMultiplier: 0.8,
  },
  {
    id: 1, name: 'Priya Sharma', score: 634,
    completion: 80, rating: 4.2, income: 55,
    completionLabel: '80%', ratingLabel: '4.2★', incomeLabel: '55%',
    maxLoan: 8000, interestMultiplier: 1.5,
  },
  {
    id: 2, name: 'Arjun Singh', score: 451,
    completion: 62, rating: 3.6, income: 40,
    completionLabel: '62%', ratingLabel: '3.6★', incomeLabel: '40%',
    maxLoan: 3000, interestMultiplier: 2.5,
  },
  {
    id: 3, name: 'New Applicant', score: 380,
    completion: 48, rating: 3.2, income: 30,
    completionLabel: '48%', ratingLabel: '3.2★', incomeLabel: '30%',
    maxLoan: 0, interestMultiplier: 0,
  },
];

/* ——— Loan Decision Engine ——— */
function evaluateLoan(applicant, amount, repayDays) {
  const score = applicant.score;
  // Decision thresholds
  if (score >= 700) return { decision: 'approved', tier: 'A' };
  if (score >= 550) {
    if (amount <= applicant.maxLoan) return { decision: 'approved', tier: 'B' };
    return { decision: 'review', tier: 'B' };
  }
  if (score >= 450) {
    if (amount <= applicant.maxLoan) return { decision: 'review', tier: 'C' };
    return { decision: 'denied', tier: 'D' };
  }
  return { decision: 'denied', tier: 'D' };
}

function getDecisionUI(decision) {
  const map = {
    approved: { cls: 'approved', icon: '✅', titleCls: 'decision-approved', title: 'APPROVED', reason: 'Trust Score meets lending threshold. Auto-repayment enabled.' },
    denied:   { cls: 'denied',   icon: '❌', titleCls: 'decision-denied',   title: 'DENIED',   reason: 'Trust Score below minimum threshold (450). Build more work history.' },
    review:   { cls: 'review',   icon: '⚠️', titleCls: 'decision-review',   title: 'UNDER REVIEW', reason: 'Borderline score. Requested amount exceeds recommended limit.' },
  };
  return map[decision];
}

function calcInterestRate(applicant, repayDays) {
  const base = applicant.interestMultiplier;
  if (repayDays <= 1) return (base * 0.1).toFixed(1) + '%';
  if (repayDays <= 7) return (base * 0.8).toFixed(1) + '%';
  if (repayDays <= 14) return (base * 1.2).toFixed(1) + '%';
  return (base * 1.8).toFixed(1) + '%';
}

/* ——— Submit Loan ——— */
document.getElementById('submitLoanBtn')?.addEventListener('click', function() {
  const applicantIdx = parseInt(document.getElementById('applicantSelect').value);
  const amount = parseInt(document.getElementById('loanAmountSlider').value);
  const repayDays = parseInt(document.getElementById('repaymentWindow').value);
  const applicant = APPLICANTS[applicantIdx];

  const btn = this;
  btn.textContent = '⏳ Evaluating...';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = '⚡ Evaluate & Decide Loan';
    btn.disabled = false;

    const result = evaluateLoan(applicant, amount, repayDays);
    const ui = getDecisionUI(result.decision);

    // Show result
    document.getElementById('loanEmpty').style.display = 'none';
    const decisionEl = document.getElementById('loanDecision');
    decisionEl.style.display = 'flex';
    decisionEl.classList.add('show');

    // Banner
    const banner = document.getElementById('decisionBanner');
    banner.className = `decision-banner ${ui.cls}`;
    document.getElementById('decisionIcon').textContent = ui.icon;
    document.getElementById('decisionTitle').textContent = ui.title;
    document.getElementById('decisionTitle').className = `decision-title ${ui.titleCls}`;
    document.getElementById('decisionReason').textContent = ui.reason;

    // Score bars
    animateLenderBar('lr-trust', 'lv-trust', applicant.score / 1000 * 100, applicant.score);
    animateLenderBar('lr-completion', 'lv-completion', applicant.completion, applicant.completionLabel);
    animateLenderBar('lr-rating', 'lv-rating', applicant.rating / 5 * 100, applicant.ratingLabel);
    animateLenderBar('lr-income', 'lv-income', applicant.income, applicant.incomeLabel);

    // Loan terms
    document.getElementById('termAmount').textContent = `₹${amount.toLocaleString()}`;
    document.getElementById('termRate').textContent = calcInterestRate(applicant, repayDays);
    document.getElementById('termRepay').textContent = repayDays === 1 ? '1 Day' : `${repayDays} Days`;
    document.getElementById('termMax').textContent = applicant.maxLoan > 0 ? `₹${applicant.maxLoan.toLocaleString()}` : 'N/A';
    document.getElementById('termAutoRepay').textContent = result.decision === 'approved' ? 'Enabled' : 'N/A';

    // Disburse button
    const disburseBtn = document.getElementById('disburseLoanBtn');
    if (result.decision === 'approved') {
      disburseBtn.style.display = 'block';
      disburseBtn.onclick = () => {
        disburseBtn.textContent = '✅ Loan Disbursed Successfully!';
        disburseBtn.style.background = 'linear-gradient(135deg,#10b981,#059669)';
        disburseBtn.disabled = true;
        // Add to queue
        addToQueue(applicant, amount, repayDays, result.decision);
      };
    } else {
      disburseBtn.style.display = 'none';
      // Still add to queue
      addToQueue(applicant, amount, repayDays, result.decision);
    }

    banner.style.animation = 'none';
    setTimeout(() => { banner.style.animation = 'fadeInUp 0.4s ease'; }, 10);

  }, 1400);
});

function animateLenderBar(barId, valId, pct, label) {
  const bar = document.getElementById(barId);
  const val = document.getElementById(valId);
  if (bar) { bar.style.width = '0%'; setTimeout(() => { bar.style.transition = 'width 1s ease'; bar.style.width = `${pct}%`; }, 50); }
  if (val) val.textContent = label;
}

/* ——— Loan Amount Slider ——— */
document.getElementById('loanAmountSlider')?.addEventListener('input', function() {
  document.getElementById('sliderVal').textContent = `₹${parseInt(this.value).toLocaleString()}`;
});

/* ——— Application Queue ——— */
const queueData = [];
let queueIdCounter = 1001;

const QUEUE_SAMPLE = [
  { name: 'Meera Nair',    score: 812, amount: 8000,  purpose: 'Daily Pay',  decision: 'approved', processedAt: '10:32:14' },
  { name: 'Vikas Rao',     score: 567, amount: 3000,  purpose: 'Transport',  decision: 'approved', processedAt: '10:30:51' },
  { name: 'Sunita Devi',   score: 423, amount: 5000,  purpose: 'Emergency',  decision: 'denied',   processedAt: '10:28:09' },
  { name: 'Kiran Patil',   score: 689, amount: 6000,  purpose: 'Tools',      decision: 'review',   processedAt: '10:25:33' },
  { name: 'Deepak Joshi',  score: 731, amount: 10000, purpose: 'Training',   decision: 'approved', processedAt: '10:22:47' },
];

QUEUE_SAMPLE.forEach(item => queueData.push(item));
renderQueue();

function addToQueue(applicant, amount, repayDays, decision) {
  const now = new Date();
  const time = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
  queueData.unshift({
    name: applicant.name,
    score: applicant.score,
    amount,
    purpose: document.getElementById('loanPurpose').options[document.getElementById('loanPurpose').selectedIndex].text,
    decision,
    processedAt: time,
  });
  renderQueue();
}

function renderQueue() {
  const tbody = document.getElementById('queueTableBody');
  tbody.innerHTML = queueData.slice(0, 8).map((item, i) => {
    const dStatus = item.decision === 'approved'
      ? '<span class="status-pill completed">✅ Approved</span>'
      : item.decision === 'denied'
      ? '<span class="status-pill" style="background:rgba(239,68,68,0.15);color:#fca5a5">❌ Denied</span>'
      : '<span class="status-pill pending">⚠️ Review</span>';

    const scoreColor = item.score >= 700 ? '#10b981' : item.score >= 500 ? '#3b82f6' : '#ef4444';
    return `
      <tr>
        <td style="color:var(--text-muted);font-family:'Courier New',monospace">#${1000 + queueData.length - i}</td>
        <td style="font-weight:600">${item.name}</td>
        <td style="font-weight:700;color:${scoreColor}">${item.score}</td>
        <td>₹${item.amount.toLocaleString()}</td>
        <td style="color:var(--text-secondary)">${item.purpose}</td>
        <td><span class="status-pill completed" style="background:rgba(16,185,129,0.1);color:#6ee7b7;border:1px solid rgba(16,185,129,0.2)">Processed</span></td>
        <td>${dStatus}</td>
        <td style="color:var(--text-muted);font-family:'Courier New',monospace">${item.processedAt}</td>
      </tr>
    `;
  }).join('');
}

/* ——— Ingestion Simulator ——— */
const RIDE_LOGS = [
  'RECV trip_id=TRP-9821 driver=RK earnings=₹320',
  'SCORE updated for RK: +2pts (trip completion)',
  'RECV trip_id=TRP-9822 driver=VS earnings=₹180',
  'QUEUE [ride-events] size=12 | Processing...',
  'COMMIT worker_id=W011 platform=RideConnect',
  'RECV rating=5 for trip TRP-9821',
  'SCORE updated for RK: +1pt (5-star rating)',
  'ASYNC batch flushed: 8 events processed',
  'RECV trip_id=TRP-9823 driver=PS earnings=₹240',
  'NO_LOCK: async log write (score-audit table)',
];
const FREELANCE_LOGS = [
  'RECV contract_done=FH-4421 worker=PS rating=4',
  'SCORE updated for PS: +3pts (contract complete)',
  'RECV hourly_log=FH-4422 hours=3.5 rate=₹350',
  'QUEUE [freelance-events] size=6 | Processing...',
  'COMMIT worker_id=W022 platform=FreelanceHub',
  'RECV review="Great work!" for FH-4421',
  'SCORE keywords detected: reliable, punctual (+1pt)',
  'ASYNC batch flushed: 5 events processed',
  'RECV dispute=NONE for FH-4420',
];
const BUILD_LOGS = [
  'RECV attendance=PRESENT worker=AS site=KTW-01',
  'SCORE updated for AS: +1pt (attendance)',
  'RECV supervisor_rating=4 for AS site=KTW-01',
  'QUEUE [build-events] size=19 | Processing...',
  'COMMIT worker_id=W033 platform=BuildDay',
  'RECV safety_check=PASS worker=AS',
  'RECV attendance=ABSENT worker=AK site=KTW-01',
  'SCORE updated for AK: -2pts (no-show)',
  'ASYNC batch flushed: 9 events processed',
  'NO_LOCK: async write to score-events table',
];

let rideOffset = 0, freelanceOffset = 0, buildOffset = 0;
let ridePending = 0, freelancePending = 0, buildPending = 0;

function addLog(containerId, logs, offsetRef, pendingRef, pendingElId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const line = logs[offsetRef % logs.length];
  const isError = line.includes('ABSENT') || line.includes('QUEUE');
  const cls = isError ? 'log-warn' : line.includes('SCORE') ? 'log-success' : 'log-info';
  const lineEl = document.createElement('div');
  lineEl.className = `log-line ${cls}`;
  lineEl.textContent = line;
  el.appendChild(lineEl);
  if (el.children.length > 6) el.removeChild(el.firstChild);
  el.scrollTop = el.scrollHeight;
}

function updateQueues() {
  ridePending = Math.floor(Math.random() * 20);
  freelancePending = Math.floor(Math.random() * 15);
  buildPending = Math.floor(Math.random() * 25);

  const r = document.getElementById('rideQueued');
  const f = document.getElementById('freelanceQueued');
  const b = document.getElementById('buildQueued');
  if (r) r.textContent = `Queue: ${ridePending} pending · ${Math.floor(Math.random()*200)+50} processed today`;
  if (f) f.textContent = `Queue: ${freelancePending} pending · ${Math.floor(Math.random()*100)+20} processed today`;
  if (b) b.textContent = `Queue: ${buildPending} pending · ${Math.floor(Math.random()*300)+80} processed today`;
}

// Run log simulators at different intervals
setInterval(() => { addLog('logRide', RIDE_LOGS, rideOffset++, ridePending, 'rideQueued'); }, 1800);
setInterval(() => { addLog('logFreelance', FREELANCE_LOGS, freelanceOffset++, freelancePending, 'freelanceQueued'); }, 2500);
setInterval(() => { addLog('logBuild', BUILD_LOGS, buildOffset++, buildPending, 'buildQueued'); }, 2000);
setInterval(updateQueues, 3000);

// Seed initial logs
setTimeout(() => addLog('logRide', RIDE_LOGS, 0, 0, ''), 100);
setTimeout(() => addLog('logRide', RIDE_LOGS, 1, 0, ''), 300);
setTimeout(() => addLog('logFreelance', FREELANCE_LOGS, 0, 0, ''), 200);
setTimeout(() => addLog('logBuild', BUILD_LOGS, 0, 0, ''), 150);
setTimeout(() => addLog('logBuild', BUILD_LOGS, 1, 0, ''), 400);

console.log('TrustTrack Lender Portal Loaded ✓ — Real-time scoring & async ingestion active');
