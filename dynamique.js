 // ─── DATA ───
  const APPRENANT = {
    name: 'Amadou BARRY',
    email: 'amadou.barry@email.com',
    wallet: '0xAB4F3E982C1D7E56B3A9F012D4C8E7B1A5F230D9',
    walletShort: '0xAB...4F3E',
    badges: ['JavaScript — Intermédiaire', 'Python — Débutant']
  };

  const WALLET_TRIGGERS = ['0xab', '0xAB', 'amadou', 'ab4f', 'AB4F', '4F3E', '4f3e', '230d9', '230D9'];

  // ─── TAB SWITCHING ───
  function switchTab(tab) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('page-' + tab).classList.add('active');
    document.querySelector(`.nav-tab[data-tab="${tab}"]`).classList.add('active');
  }

  // ─── FORMATEUR STEPS ───
  let currentLevel = 'intermediaire';

  function showFormateurStep(n) {
    [1,2,3].forEach(i => {
      document.getElementById('formateur-step-' + i).style.display = i === n ? 'block' : 'none';
      const step = document.getElementById('fstep-' + i);
      step.classList.remove('active', 'done');
      if (i < n) step.classList.add('done');
      if (i === n) step.classList.add('active');
    });
    [1,2].forEach(i => {
      const conn = document.getElementById('conn-' + i);
      conn.classList.toggle('done', i < n);
    });
  }

  function selectLevel(level) {
    currentLevel = level;
    document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('selected'));
    document.querySelector('.level-btn.' + level).classList.add('selected');
    updateBadgePreview();
  }

  function updateBadgePreview() {
    const comp = document.getElementById('f-competence').value || 'Compétence';
    const dom = document.getElementById('f-domaine').value;
    const icon = document.getElementById('preview-icon');
    const name = document.getElementById('preview-name');
    const level = document.getElementById('preview-level');
    const domain = document.getElementById('preview-domain');
    const levelLabels = { debutant: 'Débutant', intermediaire: 'Intermédiaire', avance: 'Avancé', expert: 'Expert' };

    name.textContent = comp;
    domain.textContent = dom;
    level.textContent = levelLabels[currentLevel] || 'Niveau';
    level.className = 'badge-preview-level ' + currentLevel;
    icon.className = 'badge-icon ' + currentLevel;
  }

  // Initialize level
  selectLevel('intermediaire');

  function goToStep2() {
    const comp = document.getElementById('f-competence').value.trim();
    if (!comp) { showToast('⚠ Veuillez renseigner la compétence spécifique'); return; }
    const levelLabels = { debutant: 'Débutant', intermediaire: 'Intermédiaire', avance: 'Avancé', expert: 'Expert' };
    document.getElementById('modal-badge-name').textContent = comp + ' — ' + levelLabels[currentLevel];
    document.getElementById('conf-badge').textContent = comp + ' — ' + levelLabels[currentLevel];
    showFormateurStep(2);
    // Reset wallet
    document.getElementById('wallet-input').value = '';
    document.getElementById('wallet-found').classList.remove('visible');
    document.getElementById('wallet-not-found').classList.remove('visible');
    document.getElementById('btn-attribuer').style.opacity = '0.4';
    document.getElementById('btn-attribuer').style.pointerEvents = 'none';
  }

  function searchWallet() {
    const val = document.getElementById('wallet-input').value.trim();
    const found = document.getElementById('wallet-found');
    const notFound = document.getElementById('wallet-not-found');
    const btn = document.getElementById('btn-attribuer');

    if (val.length < 3) {
      found.classList.remove('visible');
      notFound.classList.remove('visible');
      btn.style.opacity = '0.4';
      btn.style.pointerEvents = 'none';
      return;
    }

    const match = val.toLowerCase().includes('0xab') ||
                  val.toLowerCase().includes('amadou') ||
                  val.toLowerCase().includes('4f3e') ||
                  val.toLowerCase().includes('4f3e982c') ||
                  APPRENANT.wallet.toLowerCase().includes(val.toLowerCase());

    if (match) {
      found.classList.add('visible');
      notFound.classList.remove('visible');
      btn.style.opacity = '1';
      btn.style.pointerEvents = 'auto';
    } else {
      found.classList.remove('visible');
      notFound.classList.add('visible');
      btn.style.opacity = '0.4';
      btn.style.pointerEvents = 'none';
    }
  }

  function goToStep3() {
    showFormateurStep(3);
  }

  function resetForm() {
    document.getElementById('f-competence').value = '';
    selectLevel('intermediaire');
    updateBadgePreview();
    showFormateurStep(1);
  }

  // ─── BADGE DATA ───
  const BADGES_DATA = {
    js: {
      id: 'BADGE_JS_001_0xAB',
      name: 'JavaScript',
      domain: 'Développement Web',
      level: 'Intermédiaire',
      levelClass: 'intermediaire',
      icon: '</>',
      date: '01/05/2026',
      issuer: 'Formateur ABC',
      issuerWallet: '0xF0...982C',
      hash: '0x7f5a8d3c2e1b9a4f6d0e5c8b2a7f3d9c1e4b6a8f2d0c3e5b7a9f1d3c5e7b9a1',
      hashShort: '0x7f5a...d9c1',
      verifyUrl: 'https://skillbadge.io/verify?badge=BADGE_JS_001_0xAB'
    },
    py: {
      id: 'BADGE_PY_002_0xAB',
      name: 'Python',
      domain: 'Intelligence Artificielle',
      level: 'Débutant',
      levelClass: 'debutant',
      icon: '🐍',
      date: '20/04/2026',
      issuer: 'Formateur ABC',
      issuerWallet: '0xF0...982C',
      hash: '0x3c9b1f4e7a2d6c8b0e5a3f9d1c4b7e2a6f8d0c3b5e7a9f1d3c5e7b9a1f3d5c7',
      hashShort: '0x3c9b...e721',
      verifyUrl: 'https://skillbadge.io/verify?badge=BADGE_PY_002_0xAB'
    }
  };

  // ─── RECRUTEUR SEARCH ───
  function recSearch() {
    const val = document.getElementById('rec-search').value.trim().toLowerCase();
    const resultWallet = document.getElementById('rec-result-wallet');
    const resultBadge  = document.getElementById('rec-result-badge');
    const notFound     = document.getElementById('rec-not-found');
    const howItWorks   = document.getElementById('how-it-works');

    resultWallet.classList.remove('visible');
    resultBadge.classList.remove('visible');
    notFound.classList.remove('visible');

    if (val.length < 3) { howItWorks.style.display = 'block'; return; }
    howItWorks.style.display = 'none';

    // Hash/badge ID → single badge view
    if (val.includes('badge_js') || val.includes('0x7f5a') || val.includes('7f5a')) {
      showRecBadge(BADGES_DATA.js); return;
    }
    if (val.includes('badge_py') || val.includes('0x3c9b') || val.includes('3c9b')) {
      showRecBadge(BADGES_DATA.py); return;
    }

    // Wallet → all badges
    const isWallet = val.includes('0xab') || val.includes('4f3e') || val.includes('ab4f') ||
                     APPRENANT.wallet.toLowerCase().includes(val);
    if (isWallet) { resultWallet.classList.add('visible'); return; }

    notFound.classList.add('visible');
  }

  function showRecBadge(badge) {
    const el = document.getElementById('rec-result-badge');
    el.innerHTML = `
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden">
        <div style="background:linear-gradient(135deg,#13131a,#1c1c28);border-bottom:1px solid var(--border);padding:1.5rem;display:flex;align-items:center;gap:1.5rem">
          <div class="badge-card-icon ${badge.levelClass}" style="width:72px;height:72px;font-size:1.8rem;border-radius:14px;flex-shrink:0">${badge.icon}</div>
          <div style="flex:1">
            <div style="font-size:1.4rem;font-weight:800">${badge.name}</div>
            <div style="font-size:0.8rem;color:var(--text-muted)">${badge.domain}</div>
            <div style="margin-top:6px"><span class="badge-level-tag ${badge.levelClass}">${badge.level}</span></div>
          </div>
          <div class="authentic-tag">✓ AUTHENTIQUE</div>
        </div>
        <div style="padding:1.5rem">
          <table class="receipt-table" style="width:100%">
            <tr><td>ID du badge</td><td>#${badge.id}</td></tr>
            <tr><td>Compétence</td><td>${badge.name}</td></tr>
            <tr><td>Domaine</td><td>${badge.domain}</td></tr>
            <tr><td>Niveau</td><td><span class="badge-level-tag ${badge.levelClass}">${badge.level}</span></td></tr>
            <tr><td>Apprenant</td><td>${APPRENANT.name} (${APPRENANT.walletShort})</td></tr>
            <tr><td>Émetteur</td><td>${badge.issuer} (${badge.issuerWallet})</td></tr>
            <tr><td>Date d'émission</td><td>${badge.date}</td></tr>
            <tr><td>Hash blockchain</td><td><span class="hash-value" style="font-size:0.68rem;word-break:break-all">${badge.hash}</span></td></tr>
            <tr><td>Statut</td><td><span class="confirmed-badge">✓ Confirmé sur la blockchain</span></td></tr>
          </table>
          <div style="margin-top:1.2rem;display:flex;gap:10px;flex-wrap:wrap;align-items:center">
            <a class="blockchain-link" href="#" onclick="return false">🔗 Voir la transaction sur la blockchain ↗</a>
            <button class="btn btn-secondary" style="font-size:0.78rem;padding:6px 14px" onclick="document.getElementById('rec-search').value='';recSearch()">← Nouvelle recherche</button>
          </div>
        </div>
      </div>`;
    el.classList.add('visible');
  }

  // ─── BADGE DETAIL MODAL (depuis vue wallet) ───
  function openBadgeDetail(badgeKey) {
    const badge = BADGES_DATA[badgeKey];
    const modal = document.getElementById('badge-modal');
    const body  = document.getElementById('badge-modal-body');
    body.innerHTML = `
      <div style="background:linear-gradient(135deg,#13131a,#1c1c28);border-bottom:1px solid var(--border);padding:1.5rem;display:flex;align-items:center;gap:1.5rem">
        <div class="badge-card-icon ${badge.levelClass}" style="width:72px;height:72px;font-size:1.8rem;border-radius:14px;flex-shrink:0">${badge.icon}</div>
        <div style="flex:1">
          <div style="font-size:1.4rem;font-weight:800">${badge.name}</div>
          <div style="font-size:0.8rem;color:var(--text-muted)">${badge.domain}</div>
          <div style="margin-top:6px"><span class="badge-level-tag ${badge.levelClass}">${badge.level}</span></div>
        </div>
        <div class="authentic-tag">✓ AUTHENTIQUE</div>
      </div>
      <div style="padding:1.5rem">
        <table class="receipt-table" style="width:100%">
          <tr><td>ID du badge</td><td>#${badge.id}</td></tr>
          <tr><td>Compétence</td><td>${badge.name}</td></tr>
          <tr><td>Domaine</td><td>${badge.domain}</td></tr>
          <tr><td>Niveau</td><td><span class="badge-level-tag ${badge.levelClass}">${badge.level}</span></td></tr>
          <tr><td>Apprenant</td><td>${APPRENANT.name} (${APPRENANT.walletShort})</td></tr>
          <tr><td>Émetteur</td><td>${badge.issuer} (${badge.issuerWallet})</td></tr>
          <tr><td>Date d'émission</td><td>${badge.date}</td></tr>
          <tr><td>Hash blockchain</td><td><span class="hash-value" style="font-size:0.68rem;word-break:break-all">${badge.hash}</span></td></tr>
          <tr><td>Statut</td><td><span class="confirmed-badge">✓ Confirmé sur la blockchain</span></td></tr>
        </table>
        <div style="margin-top:1.2rem">
          <a class="blockchain-link" href="#" onclick="return false">🔗 Voir la transaction sur la blockchain ↗</a>
        </div>
      </div>`;
    modal.classList.add('open');
  }

  function closeBadgeModal() {
    document.getElementById('badge-modal').classList.remove('open');
  }

  // ─── WHATSAPP SHARING ───
  function shareOnWhatsApp(badgeKey) {
    const badge = BADGES_DATA[badgeKey];
    const msg = encodeURIComponent(
      `🏅 *SkillBadge — Certification vérifiée*\n\n` +
      `👤 *${APPRENANT.name}*\n` +
      `📛 Badge : *${badge.name} — ${badge.level}*\n` +
      `🎯 Domaine : ${badge.domain}\n` +
      `📅 Obtenu le : ${badge.date}\n` +
      `🏛 Émetteur : ${badge.issuer}\n` +
      `🔑 ID : #${badge.id}\n\n` +
      `✅ Badge authentifié sur la blockchain.\n` +
      `🔗 Voir ce badge : ${badge.verifyUrl}`
    );
    window.open('https://wa.me/?text=' + msg, '_blank');
  }

  function sharePortfolioOnWhatsApp() {
    const portfolioUrl = `https://skillbadge.io/portfolio?wallet=${APPRENANT.wallet}`;
    const msg = encodeURIComponent(
      `🏅 *Mon Portfolio SkillBadge — Certifications blockchain*\n\n` +
      `👤 *${APPRENANT.name}*\n` +
      `🔑 Wallet : ${APPRENANT.walletShort}\n\n` +
      `📛 Mes badges certifiés :\n` +
      `  ✅ JavaScript — Intermédiaire (01/05/2026)\n` +
      `     🔗 ${BADGES_DATA.js.verifyUrl}\n\n` +
      `  ✅ Python — Débutant (20/04/2026)\n` +
      `     🔗 ${BADGES_DATA.py.verifyUrl}\n\n` +
      `🌐 Portfolio complet : ${portfolioUrl}`
    );
    window.open('https://wa.me/?text=' + msg, '_blank');
  }

  // ─── TOAST ───
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
  }

  // Allow pressing Enter in wallet search
  document.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const active = document.querySelector('.page.active');
      if (active && active.id === 'page-formateur') searchWallet();
      if (active && active.id === 'page-recruteur') recSearch();
    }
  });
