    // ─── DATA ───
  const APPRENANT = {
    name: 'Amadou BARRY',
    email: 'amadou.barry@email.com',
    wallet: '0xAB4F3E982C1D7E56B3A9F012D4C8E7B1A5F230D9',
    walletShort: '0xAB...4F3E',
  };

  // Liste dynamique des badges du portfolio
  let portfolioBadges = [
    {
      key: 'js',
      name: 'JavaScript',
      domain: 'Développement Web',
      level: 'Intermédiaire',
      levelClass: 'intermediaire',
      icon: '</>',
      date: '01/05/2026',
    },
    {
      key: 'py',
      name: 'Python',
      domain: 'Intelligence Artificielle',
      level: 'Débutant',
      levelClass: 'debutant',
      icon: '🐍',
      date: '20/04/2026',
    }
  ];

  const WALLET_TRIGGERS = ['0xab', '0xAB', 'amadou', 'ab4f', 'AB4F', '4F3E', '4f3e', '230d9', '230D9'];

  // ─── WHATSAPP SVG ───
  const WA_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;

  // ─── PORTFOLIO RENDER ───
  function renderPortfolio() {
    const grid = document.getElementById('portfolio-badge-grid');
    const countLabel = document.getElementById('badge-count-label');
    const statCount = document.getElementById('stat-count');
    const statLevel = document.getElementById('stat-level');

    // Level priority
    const levelOrder = ['expert', 'avance', 'intermediaire', 'debutant'];
    let maxLevelIdx = levelOrder.length; // worst = last
    for (const b of portfolioBadges) {
      const idx = levelOrder.indexOf(b.levelClass);
      if (idx !== -1 && idx < maxLevelIdx) maxLevelIdx = idx;
    }
    const levelShortLabels = { debutant: 'Débutant', intermediaire: 'Interm.', avance: 'Avancé', expert: 'Expert' };
    const topLevel = maxLevelIdx < levelOrder.length ? levelShortLabels[levelOrder[maxLevelIdx]] : '—';

    // Update stats
    statCount.textContent = portfolioBadges.length;
    statLevel.textContent = portfolioBadges.length > 0 ? topLevel : '—';
    countLabel.textContent = '(' + portfolioBadges.length + ')';

    // Render cards
    grid.innerHTML = portfolioBadges.map((b, i) => `
      <div class="badge-card ${b.levelClass}" style="animation:fadeIn 0.3s ease ${i * 0.08}s both">
        <div class="badge-verified">✓ Vérifié</div>
        <div class="badge-card-icon ${b.levelClass}">${b.icon}</div>
        <div class="badge-card-name">${b.name}</div>
        <div class="badge-card-domain">${b.domain}</div>
        <div class="badge-level-tag ${b.levelClass}">${b.level}</div>
        <div class="badge-card-date">${b.date}</div>
        <button class="btn btn-whatsapp" style="width:100%;justify-content:center;margin-top:4px;font-size:0.78rem;padding:8px"
          onclick="shareOnWhatsApp('${b.key}')">
          ${WA_SVG} Partager
        </button>
      </div>
    `).join('');
  }

  // Appel initial pour synchroniser avec portfolioBadges
  document.addEventListener('DOMContentLoaded', renderPortfolio);

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
    const levelLabels = { debutant: 'Débutant', intermediaire: 'Intermédiaire', avance: 'Avancé', expert: 'Expert' };
    const comp = document.getElementById('f-competence').value.trim();
    const level = levelLabels[currentLevel];
    const domain = document.getElementById('f-domaine').value;

    // ── Vérification doublon ──
    const alreadyExists = portfolioBadges.some(
      b => b.name.toLowerCase() === comp.toLowerCase() && b.levelClass === currentLevel
    );

    if (alreadyExists) {
      showToast('⛔ Ce badge existe déjà dans le portfolio de cet apprenant.', true);
      return; // Ne pas passer à l'étape 3
    }

    // ── Icône par domaine ──
    const domainIcons = {
      'Développement Web': '</>',
      'Intelligence Artificielle': '🤖',
      'Cybersécurité': '🔒',
      'Marketing Digital': '📊',
      'Design UX/UI': '🎨',
    };
    const icon = domainIcons[domain] || '🏅';

    // ── Générer un ID unique ──
    const today = new Date();
    const dateStr = `${String(today.getDate()).padStart(2,'0')}/${String(today.getMonth()+1).padStart(2,'0')}/${today.getFullYear()}`;
    const shortKey = comp.slice(0,3).toUpperCase() + '_' + Date.now().toString(36).toUpperCase();
    const newKey = 'badge_' + Date.now();

    // ── Ajouter au portfolio ──
    portfolioBadges.push({
      key: newKey,
      name: comp,
      domain: domain,
      level: level,
      levelClass: currentLevel,
      icon: icon,
      date: dateStr,
    });

    // ── Mettre à jour BADGES_DATA pour le partage ──
    BADGES_DATA[newKey] = {
      id: 'BADGE_' + shortKey,
      name: comp,
      domain: domain,
      level: level,
      levelClass: currentLevel,
      icon: icon,
      date: dateStr,
      issuer: 'Formateur ABC',
      issuerWallet: '0xF0...982C',
      hash: '0x' + Math.random().toString(16).slice(2,18) + '...',
      hashShort: '0x' + Math.random().toString(16).slice(2,10),
      verifyUrl: 'https://skillbadge.io/verify?badge=BADGE_' + shortKey
    };

    // ── Re-rendre le portfolio ──
    renderPortfolio();

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

  // ─── RECRUTEUR : rendu dynamique des badges ───
  function renderRecruiterBadges() {
    const title = document.getElementById('rec-badges-title');
    const list  = document.getElementById('rec-badges-list');

    title.textContent = `BADGES CERTIFIÉS (${portfolioBadges.length})`;

    list.innerHTML = portfolioBadges.map(b => {
      const bdData = BADGES_DATA[b.key];
      const badgeId   = bdData ? bdData.id   : 'BADGE_' + b.name.slice(0,3).toUpperCase() + '_0xAB';
      const hashShort = bdData ? bdData.hashShort : '0x????...????';
      return `
        <div class="rec-badge-card">
          <div class="badge-card-icon ${b.levelClass}" style="width:48px;height:48px;font-size:1.3rem;border-radius:10px;flex-shrink:0">${b.icon}</div>
          <div class="rec-badge-details">
            <div class="rec-badge-name">${b.name} <span class="badge-level-tag ${b.levelClass}" style="margin-left:6px">${b.level}</span></div>
            <div class="rec-badge-meta">${b.domain} · Émetteur : Formateur ABC · ${b.date}</div>
            <div class="rec-badge-hash">Hash : ${hashShort} · ID : #${badgeId}</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end;flex-shrink:0">
            <div class="authentic-tag">✓ AUTHENTIQUE</div>
            <button class="blockchain-link" onclick="openBadgeDetail('${b.key}')" style="cursor:pointer;border:none;font-family:inherit">🔍 Voir détails</button>
          </div>
        </div>`;
    }).join('');
  }

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
    if (isWallet) {
      renderRecruiterBadges();
      resultWallet.classList.add('visible');
      return;
    }

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
    // Chercher dans BADGES_DATA d'abord, sinon construire depuis portfolioBadges
    let badge = BADGES_DATA[badgeKey];
    if (!badge) {
      const pb = portfolioBadges.find(b => b.key === badgeKey);
      if (pb) {
        badge = {
          id: 'BADGE_' + pb.name.slice(0,3).toUpperCase() + '_0xAB',
          name: pb.name, domain: pb.domain,
          level: pb.level, levelClass: pb.levelClass, icon: pb.icon,
          date: pb.date, issuer: 'Formateur ABC', issuerWallet: '0xF0...982C',
          hash: '0x' + pb.key.replace('badge_','') + '...blockchain',
          hashShort: '0x????...????',
          verifyUrl: 'https://skillbadge.io/verify?badge=BADGE_' + pb.name.slice(0,3).toUpperCase()
        };
      }
    }
    if (!badge) return;
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
    // Cherche d'abord dans BADGES_DATA (badges fixes + nouveaux), sinon dans portfolioBadges
    let badge = BADGES_DATA[badgeKey];
    if (!badge) {
      const pb = portfolioBadges.find(b => b.key === badgeKey);
      if (pb) {
        badge = {
          name: pb.name, domain: pb.domain, level: pb.level,
          date: pb.date, issuer: 'Formateur ABC',
          id: 'BADGE_' + pb.name.slice(0,3).toUpperCase(),
          verifyUrl: 'https://skillbadge.io/verify?badge=BADGE_' + pb.name.slice(0,3).toUpperCase()
        };
      }
    }
    if (!badge) return;
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
  function showToast(msg, isError = false) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.remove('error');
    if (isError) t.classList.add('error');
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 4000);
  }

  // Allow pressing Enter in wallet search
  document.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const active = document.querySelector('.page.active');
      if (active && active.id === 'page-formateur') searchWallet();
      if (active && active.id === 'page-recruteur') recSearch();
    }
  });
