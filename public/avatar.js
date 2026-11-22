// Profil resimleri: milli teknoloji temalı, kodla çizilen simgeler. Hem tarayıcıda hem sunucuda kullanılır.
// Yeni resim eklemek için listeye {id, ad, renk, cizim} satırı ekleyin. Çizim 48x48'lik alanda, beyaz renkle yapılır;
// "BG" yazan yerler dairenin rengiyle doldurulur (pencere, göz gibi boşluklar için).
(function (kok) {
  const liste = [
    { id: 'iha', ad: 'İHA', renk: '#0B7F86', cizim: '<rect x="22" y="9" width="4" height="27" rx="2"/><rect x="5" y="19" width="38" height="4.5" rx="2.2"/><path d="M24 33l-8 7v2l8-3 8 3v-2z"/>' },
    { id: 'jet', ad: 'Savaş uçağı', renk: '#C8202B', cizim: '<path transform="translate(7 7) rotate(-45 17 17)" d="M31 17 20 13 13 4h-3l3 9H7l-3-3H2l2 7-2 7h2l3-3h6l-3 9h3l7-9 11-4z"/>' },
    { id: 'helikopter', ad: 'Helikopter', renk: '#A85C00', cizim: '<ellipse cx="20" cy="27" rx="10" ry="7"/><rect x="28" y="25" width="14" height="3" rx="1.5"/><rect x="39.5" y="19" width="3" height="10" rx="1.5"/><rect x="6" y="14" width="28" height="2.6" rx="1.3"/><rect x="18.8" y="15" width="2.6" height="6"/><rect x="11" y="37" width="20" height="2.6" rx="1.3"/><rect x="15" y="33" width="2" height="5"/><rect x="24" y="33" width="2" height="5"/><circle cx="15" cy="26" r="3" fill="BG"/>' },
    { id: 'uydu', ad: 'Uydu', renk: '#2B3A9B', cizim: '<g transform="rotate(-35 24 24)"><rect x="19" y="16" width="10" height="16" rx="2"/><rect x="4" y="20" width="13" height="8" rx="1"/><rect x="31" y="20" width="13" height="8" rx="1"/><rect x="10" y="20" width="1.2" height="8" fill="BG"/><rect x="37" y="20" width="1.2" height="8" fill="BG"/></g>' },
    { id: 'roket', ad: 'Roket', renk: '#6B3FA0', cizim: '<path d="M24 5c6 5 8 12 8 21H16c0-9 2-16 8-21z"/><path d="M16 23l-6 9h6zM32 23l6 9h-6z"/><path d="M20 29h8l-4 12z"/><circle cx="24" cy="17" r="3.2" fill="BG"/>' },
    { id: 'astronot', ad: 'Astronot', renk: '#1F6FB5', cizim: '<circle cx="24" cy="19" r="11"/><rect x="16" y="14" width="16" height="10" rx="5" fill="BG"/><path d="M11 43c0-8 5-12 13-12s13 4 13 12z"/>' },
    { id: 'otomobil', ad: 'Elektrikli otomobil', renk: '#18794E', cizim: '<path d="M6 34v-6l4-2 4-7c1-1.500 2-2 4-2h12c2 0 3 0.500 4 2l4 7 4 2v6z"/><path d="M15 25l3-5h12l3 5z" fill="BG"/><circle cx="15" cy="35" r="4.500" fill="BG"/><circle cx="33" cy="35" r="4.500" fill="BG"/><circle cx="15" cy="35" r="2.200"/><circle cx="33" cy="35" r="2.200"/>' },
    { id: 'gemi', ad: 'Gemi', renk: '#22324F', cizim: '<path d="M5 29h38l-6 10H11z"/><rect x="15" y="21" width="18" height="7" rx="1"/><rect x="22" y="11" width="4" height="10"/><rect x="18" y="23" width="3" height="3" fill="BG"/><rect x="27" y="23" width="3" height="3" fill="BG"/>' },
    { id: 'robot', ad: 'Robot', renk: '#B4532A', cizim: '<rect x="12" y="16" width="24" height="19" rx="4"/><circle cx="19" cy="25" r="3.200" fill="BG"/><circle cx="29" cy="25" r="3.200" fill="BG"/><rect x="23" y="8" width="2" height="8"/><circle cx="24" cy="8" r="2.800"/><rect x="18" y="37" width="12" height="4" rx="1.500"/>' }
  ];
  const bul = id => liste.find(a => a.id === id);
  const api = {
    liste,
    gecerli: id => !!bul(id),
    // id tanımsızsa boş metin döner; böylece resim seçmeyen oyuncuda hiçbir şey çizilmez.
    html(id, px) {
      const a = bul(id); if (!a) return '';
      return `<svg class="av" width="${px}" height="${px}" viewBox="0 0 48 48" role="img" aria-label="${a.ad}"><circle cx="24" cy="24" r="24" fill="${a.renk}"/><g fill="#fff">${a.cizim.replace(/BG/g, a.renk)}</g></svg>`;
    }
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else kok.AVATAR = api;
})(this);
