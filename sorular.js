// Soru bankası birleştirici: sorular/ klasöründeki bütün .js dosyalarını okur.
// İki biçim desteklenir:
//   1) Dizi:  [{k, q, a:[doğru, y1, y2, y3], f}, ...]
//   2) Kısa:  {k:"Kategori", s:[["soru","doğru","yanlış1","yanlış2","yanlış3","bilgi"], ...]}
// sorular/seviyeler.json her soruya bir seviye verir: 1 = bilinen (önce sorulur), 2 = orta, 0 = kapalı.
// Seviyesi yazılmamış sorular 2 sayılır. Hatalı ya da tekrar eden sorular atlanır ve terminalde bildirilir.
const fs = require('fs'), path = require('path');
const klasor = path.join(__dirname, 'sorular');
let seviyeler = {};
try { seviyeler = JSON.parse(fs.readFileSync(path.join(klasor, 'seviyeler.json'), 'utf8')); } catch (e) { console.warn('  seviyeler.json okunamadı; bütün sorular açık.'); }

const hepsi = [], gorulen = new Set();
let atlanan = 0;

for (const dosya of fs.readdirSync(klasor).filter(d => d.endsWith('.js')).sort()) {
  const m = require(path.join(klasor, dosya));
  const liste = Array.isArray(m) ? m : m.s.map(x => ({ k: m.k, q: x[0], a: x.slice(1, 5), f: x[5] || '' }));
  const sv = String(seviyeler[dosya] || '').replace(/\s/g, '');
  if (sv && sv.length !== liste.length) console.warn(`  Uyarı: ${dosya} için ${liste.length} soru var ama ${sv.length} seviye yazılmış.`);
  liste.forEach((s, i) => {
    const z = sv[i] === undefined ? 2 : +sv[i];
    if (z === 0) return;                                   // kapalı soru
    const anahtar = String(s.q).toLocaleLowerCase('tr-TR').replace(/\s+/g, ' ').trim();
    const gecerli = s.k && s.q && Array.isArray(s.a) && s.a.length === 4 && new Set(s.a).size === 4 && s.a.every(Boolean);
    if (!gecerli || gorulen.has(anahtar)) { atlanan++; console.warn(`  Soru atlandı (${dosya}): ${s.q}`); return; }
    gorulen.add(anahtar); hepsi.push({ ...s, z: z === 1 ? 1 : 2 });
  });
}
if (atlanan) console.warn(`  ${atlanan} soru atlandı.`);
module.exports = hepsi;
