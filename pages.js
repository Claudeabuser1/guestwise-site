// shared bits for the small pages: language switch (same setting as the home page) and the social links
window.GW = (() => {
  // add the handle / link here when the account exists, e.g. instagram: 'https://instagram.com/guestwise'
  const SOCIALS = { instagram: '', linkedin: '', tiktok: '' };
  const ICONS = {
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.4" cy="6.6" r="1.3" fill="currentColor"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 10.5v6M8 7.6v.1M11.6 16.5v-6M11.6 13c0-1.6 1-2.6 2.3-2.6s2.1.9 2.1 2.6v3.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.4 2.6 2.1 4.3 5 4.6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };
  const NAMES = { instagram: 'Instagram', linkedin: 'LinkedIn', tiktok: 'TikTok' };

  function page({ en, after }) {
    const orig = {}; document.querySelectorAll('[data-t]').forEach((el) => { orig[el.dataset.t] = el.textContent; });
    const svTitle = document.title;
    let lang = 'sv', saved = null;
    try { saved = localStorage.getItem('gw-lang'); } catch (e) {}
    if (saved === 'en' || (!saved && !/^sv\b/i.test(navigator.language || 'sv'))) lang = 'en';
    const btn = document.getElementById('lang');

    function socials() {
      const box = document.getElementById('socials'); if (!box) return;
      box.innerHTML = '';
      Object.keys(SOCIALS).forEach((k) => {
        const url = SOCIALS[k], el = document.createElement(url ? 'a' : 'span');
        el.className = 'soc' + (url ? '' : ' soon');
        if (url) { el.href = url; el.target = '_blank'; el.rel = 'noopener'; }
        el.innerHTML = ICONS[k] + NAMES[k] + (url ? '' : ' <small>' + (lang === 'en' ? 'soon' : 'snart') + '</small>');
        box.appendChild(el);
      });
    }
    function apply() {
      document.documentElement.lang = lang;
      document.querySelectorAll('[data-t]').forEach((el) => { el.textContent = lang === 'en' && en[el.dataset.t] ? en[el.dataset.t] : orig[el.dataset.t]; });
      document.title = lang === 'en' && en.title ? en.title : svTitle;
      btn.textContent = lang === 'en' ? 'SV' : 'EN';
      btn.setAttribute('aria-label', lang === 'en' ? 'Byt till svenska' : 'Switch to English');
      socials();
      if (after) after(lang);
    }
    btn.addEventListener('click', () => { lang = lang === 'en' ? 'sv' : 'en'; try { localStorage.setItem('gw-lang', lang); } catch (e) {} apply(); });
    apply();
  }
  return { page };
})();
