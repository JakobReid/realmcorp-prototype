// Theme Picker — injects a floating picker and swaps CSS custom properties + fonts
(function() {
  var themes = {
    master: {
      label: 'Original',
      fonts: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap",
      ffDisplay: "'Playfair Display', Georgia, serif",
      ffBody: "'DM Sans', system-ui, sans-serif",
      vars: {
        '--navy':'#0B1F3A','--navy-mid':'#16304F','--navy-light':'#1E4168',
        '--cream':'#F7F4EE','--cream-dark':'#EDE8DF',
        '--amber':'#C07B2E','--amber-light':'#D4944A',
        '--text':'#0B1F3A','--text-mid':'#3D5068','--text-muted':'#7A8BA0',
        '--border':'rgba(11,31,58,0.1)','--border-warm':'rgba(11,31,58,0.14)',
        '--r-sm':'4px','--r':'10px','--r-lg':'18px',
        '--shadow-sm':'0 2px 10px rgba(11,31,58,0.09)',
        '--shadow':'0 6px 28px rgba(11,31,58,0.13)',
        '--shadow-lg':'0 16px 56px rgba(11,31,58,0.18)',
        '--shadow-xl':'0 32px 80px rgba(11,31,58,0.22)'
      },
      swatch: '#0B1F3A'
    },
    'live-bright': {
      label: 'Live Bright',
      fonts: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap",
      ffDisplay: "'Outfit', system-ui, sans-serif",
      ffBody: "'Inter', system-ui, sans-serif",
      vars: {
        '--navy':'#015691','--navy-mid':'#0369A8','--navy-light':'#0C7CC0',
        '--cream':'#F8FAFC','--cream-dark':'#F1F5F9',
        '--amber':'#F59E0B','--amber-light':'#FBBF24',
        '--text':'#1E293B','--text-mid':'#475569','--text-muted':'#94A3B8',
        '--border':'rgba(1,86,145,0.1)','--border-warm':'rgba(1,86,145,0.14)',
        '--r-sm':'8px','--r':'14px','--r-lg':'24px',
        '--shadow-sm':'0 2px 10px rgba(1,86,145,0.09)',
        '--shadow':'0 6px 28px rgba(1,86,145,0.13)',
        '--shadow-lg':'0 16px 56px rgba(1,86,145,0.18)',
        '--shadow-xl':'0 32px 80px rgba(1,86,145,0.22)'
      },
      swatch: '#015691'
    },
    'ocean-teal': {
      label: 'Ocean Teal',
      fonts: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap",
      ffDisplay: "'Fraunces', Georgia, serif",
      ffBody: "'Plus Jakarta Sans', system-ui, sans-serif",
      vars: {
        '--navy':'#0F2B3C','--navy-mid':'#164050','--navy-light':'#1B5468',
        '--cream':'#F5F7F6','--cream-dark':'#E8EDEB',
        '--amber':'#0D9488','--amber-light':'#14B8A6',
        '--text':'#0F2B3C','--text-mid':'#3D5C6B','--text-muted':'#7A9BA8',
        '--border':'rgba(15,43,60,0.1)','--border-warm':'rgba(15,43,60,0.14)',
        '--r-sm':'4px','--r':'10px','--r-lg':'18px',
        '--shadow-sm':'0 2px 10px rgba(15,43,60,0.09)',
        '--shadow':'0 6px 28px rgba(15,43,60,0.13)',
        '--shadow-lg':'0 16px 56px rgba(15,43,60,0.18)',
        '--shadow-xl':'0 32px 80px rgba(15,43,60,0.22)'
      },
      swatch: '#0D9488'
    },
    'midnight-luxe': {
      label: 'Midnight Luxe',
      fonts: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Libre+Franklin:wght@300;400;500;600&display=swap",
      ffDisplay: "'Cormorant Garamond', Georgia, serif",
      ffBody: "'Libre Franklin', system-ui, sans-serif",
      vars: {
        '--navy':'#0C1220','--navy-mid':'#151E2E','--navy-light':'#1E2A3E',
        '--cream':'#F4F2EF','--cream-dark':'#E8E4DE',
        '--amber':'#B87333','--amber-light':'#CC8844',
        '--text':'#1A1A2E','--text-mid':'#4A4A5E','--text-muted':'#8A8A9E',
        '--border':'rgba(12,18,32,0.1)','--border-warm':'rgba(12,18,32,0.14)',
        '--r-sm':'3px','--r':'8px','--r-lg':'14px',
        '--shadow-sm':'0 2px 10px rgba(12,18,32,0.09)',
        '--shadow':'0 6px 28px rgba(12,18,32,0.13)',
        '--shadow-lg':'0 16px 56px rgba(12,18,32,0.18)',
        '--shadow-xl':'0 32px 80px rgba(12,18,32,0.22)'
      },
      swatch: '#B87333'
    }
  };

  // Font link element for swapping
  var fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  document.head.appendChild(fontLink);

  function applyTheme(key) {
    var theme = themes[key];
    if (!theme) return;

    // Swap font import
    fontLink.href = theme.fonts;

    // Apply CSS custom properties
    var root = document.documentElement;
    root.style.setProperty('--ff-display', theme.ffDisplay);
    root.style.setProperty('--ff-body', theme.ffBody);
    for (var prop in theme.vars) {
      root.style.setProperty(prop, theme.vars[prop]);
    }

    // Mark active button
    var btns = document.querySelectorAll('.tp-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.toggle('tp-active', btns[i].dataset.theme === key);
    }

    // Persist
    try { localStorage.setItem('realm-theme', key); } catch(e) {}
  }

  // Build picker UI
  var picker = document.createElement('div');
  picker.className = 'theme-picker';
  picker.innerHTML = '<div class="tp-label">Theme</div><div class="tp-buttons"></div>';
  var btnWrap = picker.querySelector('.tp-buttons');

  for (var key in themes) {
    var btn = document.createElement('button');
    btn.className = 'tp-btn';
    btn.dataset.theme = key;
    btn.title = themes[key].label;
    btn.innerHTML = '<span class="tp-swatch" style="background:' + themes[key].swatch + '"></span>' + themes[key].label;
    btn.addEventListener('click', (function(k) {
      return function() { applyTheme(k); };
    })(key));
    btnWrap.appendChild(btn);
  }

  document.body.appendChild(picker);

  // Inject picker styles
  var style = document.createElement('style');
  style.textContent = [
    '.theme-picker { position:fixed; bottom:1.5rem; right:1.5rem; z-index:9999; background:#fff; border:1px solid rgba(0,0,0,0.12); border-radius:12px; padding:0.75rem 1rem; box-shadow:0 8px 32px rgba(0,0,0,0.15); font-family:system-ui,sans-serif; }',
    '.tp-label { font-size:0.6rem; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:#999; margin-bottom:0.5rem; }',
    '.tp-buttons { display:flex; flex-direction:column; gap:0.35rem; }',
    '.tp-btn { display:flex; align-items:center; gap:0.5rem; padding:0.45rem 0.7rem; border:1.5px solid transparent; border-radius:6px; background:none; cursor:pointer; font-size:0.78rem; font-weight:500; color:#333; transition:all 0.15s; white-space:nowrap; }',
    '.tp-btn:hover { background:#f5f5f5; }',
    '.tp-btn.tp-active { border-color:#333; background:#f5f5f5; font-weight:700; }',
    '.tp-swatch { width:14px; height:14px; border-radius:50%; flex-shrink:0; border:1.5px solid rgba(0,0,0,0.1); }'
  ].join('\n');
  document.head.appendChild(style);

  // Load saved theme or default to master
  var saved = null;
  try { saved = localStorage.getItem('realm-theme'); } catch(e) {}
  if (saved && themes[saved]) {
    applyTheme(saved);
  }
})();
