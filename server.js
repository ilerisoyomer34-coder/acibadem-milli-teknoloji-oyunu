// Milli Teknoloji Bilgi Yarışı — oyun sunucusu (bağımlılık yok, yalnızca Node çekirdeği)
// Çalıştır:  node server.js      Sunucu ekranı: http://localhost:3000/host
const http = require('http'), fs = require('fs'), path = require('path'), os = require('os'), crypto = require('crypto');
const SORULAR = require('./sorular');
const AVATAR = require('./public/avatar');

const PORT = +process.env.PORT || 3000;
const MAKS = 25;                                   // en fazla oyuncu
// İnternette barındırma (Render vb.): HOST_KEY ortam değişkeni yönetici anahtarıdır.
// Barındırılan kurulumda "kendi bilgisayarımdan geliyor" güveni kapalıdır; sunucu ekranı yalnızca /host?key=ANAHTAR ile açılır.
const BARINDIRMA = !!(process.env.RENDER || process.env.HOST_KEY);
const ANAHTAR = process.env.HOST_KEY || crypto.randomBytes(6).toString('hex');
const EK_ADRESLER = [process.env.RENDER_EXTERNAL_HOSTNAME, ...(process.env.IZINLI_HOST || '').split(',')].map(x => (x || '').trim().toLowerCase()).filter(Boolean);
const ADETLER = [10, 15, 20], SURELER = [15, 20, 30];

/* ---------- PUANLAMA ----------
   Oyunun karakterini bu fonksiyon belirler: hız mı, doğruluk mu, seri mi ödüllensin?
   kalan/toplam: saniye; seri: bu cevapla birlikte art arda kaç doğru yapıldı (1, 2, 3…). */
function puanHesapla(kalan, toplam, seri) {
  const taban = 500;                                 // doğru cevabın garantisi
  const hiz = Math.round(500 * (kalan / toplam));    // hızlı cevaba ek puan
  const bonus = Math.min(seri - 1, 3) * 100;         // seri bonusu, en çok 300
  return taban + hiz + bonus;
}

const karistir = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const yaz = (res, veri) => res.write('data: ' + JSON.stringify(veri) + '\n\n');
const lan = () => Object.values(os.networkInterfaces()).flat().filter(n => n && n.family === 'IPv4' && !n.internal).map(n => n.address);

/* ---------- OYUN DURUMU ---------- */
let G = null;
const hostlar = new Set();

function at(o) { for (const r of [...o.akis]) { yaz(r, { rol: 'oyuncu', faz: 'yok' }); r.end(); } o.akis.clear(); }
function yeniOyun() {
  if (G) { clearTimeout(G.t); for (const o of G.oyuncular.values()) at(o); }
  G = { pin: String(Math.floor(100000 + Math.random() * 900000)), faz: 'lobi', ayar: { adet: 10, sure: 20 },
        oyuncular: new Map(), sorular: [], qi: -1, bitis: 0, t: null };
}
const siralama = () => [...G.oyuncular.values()].sort((a, b) => b.puan - a.puan);
const soruGorunum = () => { const s = G.sorular[G.qi]; return s ? { no: G.qi + 1, toplam: G.sorular.length, k: s.k, q: s.q, siklar: s.siklar.map(x => x.t) } : null; };
const kalanMs = () => (G.faz === 'soru' || G.faz === 'tanit') ? Math.max(0, G.bitis - Date.now()) : 0;

function hostDurum() {
  const s = G.sorular[G.qi], liste = siralama();
  return { rol: 'host', faz: G.faz, pin: G.pin, port: PORT, adresler: lan(), ayar: G.ayar, maks: MAKS,
    oyuncular: liste.map(o => ({ id: o.kod, ad: o.ad, av: o.av, puan: o.puan, dogru: o.dogru, bagli: o.akis.size > 0, cevapladi: !!o.cevap, kazanc: o.kazanc, ok: o.ok })),
    soru: soruGorunum(), kalanMs: kalanMs(),
    sonuc: G.faz === 'sonuc' ? { dogru: s.siklar.findIndex(x => x.dogru), bilgi: s.f,
      sayilar: s.siklar.map((_, i) => liste.filter(o => o.cevap && o.cevap.secim === i).length) } : null };
}
function oyuncuDurum(o) {
  const s = G.sorular[G.qi];
  return { rol: 'oyuncu', faz: G.faz, ad: o.ad, av: o.av, puan: o.puan, dogruSayisi: o.dogru, sira: siralama().indexOf(o) + 1, toplam: G.oyuncular.size,
    soru: soruGorunum(), kalanMs: kalanMs(), secim: o.cevap ? o.cevap.secim : null,
    sonuc: G.faz === 'sonuc' ? { ok: o.ok, kazanc: o.kazanc, seri: o.seri, bos: !o.cevap || o.cevap.secim < 0,
      dogruMetin: s.siklar.find(x => x.dogru).t, bilgi: s.f } : null };
}
function yayinla(herkes = true) {
  const h = hostDurum(); for (const r of hostlar) yaz(r, h);
  if (herkes) for (const o of G.oyuncular.values()) if (o.akis.size) { const d = oyuncuDurum(o); for (const r of o.akis) yaz(r, d); }
}

/* ---------- OYUN AKIŞI: lobi → tanit → soru → sonuc → … → final ---------- */
function basla() {
  // Bilinen sorular (seviye 1) turun başında, orta sorular (seviye 2) sonunda gelir.
  const bilinen = karistir(SORULAR.filter(s => s.z === 1)), orta = karistir(SORULAR.filter(s => s.z !== 1));
  const nBilinen = Math.min(bilinen.length, Math.ceil(G.ayar.adet * 0.6));
  const secilen = [...bilinen.slice(0, nBilinen), ...orta.slice(0, G.ayar.adet - nBilinen)];
  G.sorular = secilen.map(s => ({ ...s, siklar: karistir(s.a.map((t, i) => ({ t, dogru: i === 0 }))) }));
  for (const o of G.oyuncular.values()) Object.assign(o, { puan: 0, seri: 0, dogru: 0, kazanc: 0, ok: false, cevap: null });
  G.qi = 0; tanit();
}
function tanit() {
  clearTimeout(G.t); G.faz = 'tanit';
  for (const o of G.oyuncular.values()) o.cevap = null;
  G.bitis = Date.now() + 3000; G.t = setTimeout(soruAc, 3000); yayinla();
}
function soruAc() {
  G.faz = 'soru'; G.bitis = Date.now() + G.ayar.sure * 1000;
  G.t = setTimeout(soruKapat, G.ayar.sure * 1000); yayinla();
}
function soruKapat() {
  if (G.faz !== 'soru') return;
  clearTimeout(G.t);
  const s = G.sorular[G.qi];
  for (const o of G.oyuncular.values()) {
    const c = o.cevap; o.ok = !!(c && s.siklar[c.secim] && s.siklar[c.secim].dogru);
    if (o.ok) { o.seri++; o.dogru++; o.kazanc = puanHesapla(c.kalan, G.ayar.sure, o.seri); o.puan += o.kazanc; }
    else { o.seri = 0; o.kazanc = 0; }
  }
  G.faz = 'sonuc'; yayinla();
}
function cevapla(o, secim) {
  if (G.faz !== 'soru' || o.cevap || !Number.isInteger(secim) || secim < 0 || secim >= G.sorular[G.qi].siklar.length) return;
  o.cevap = { secim, kalan: Math.max(0, (G.bitis - Date.now()) / 1000) };
  const bagli = [...G.oyuncular.values()].filter(x => x.akis.size);
  if (bagli.length && bagli.every(x => x.cevap)) return soruKapat();   // herkes cevapladı: beklemeden kapat
  yayinla(false); for (const r of o.akis) yaz(r, oyuncuDurum(o));
}
function katil(pin, ad, av) {
  ad = String(ad || '').replace(/\s+/g, ' ').trim().slice(0, 16);
  if (String(pin).trim() !== G.pin) return { hata: 'PIN hatalı. Büyük ekrandaki 6 haneli sayıyı yaz.' };
  if (!ad) return { hata: 'Adını yaz.' };
  if (G.faz === 'final') return { hata: 'Bu oyun bitti. Yeni oyunu bekle.' };
  if (G.oyuncular.size >= MAKS) return { hata: `Oyun dolu (${MAKS} kişi).` };
  const adlar = new Set([...G.oyuncular.values()].map(o => o.ad.toLocaleLowerCase('tr-TR')));
  let son = ad, n = 2; while (adlar.has(son.toLocaleLowerCase('tr-TR'))) son = `${ad.slice(0, 14)} ${n++}`;
  const o = { id: crypto.randomBytes(8).toString('hex'), kod: crypto.randomBytes(4).toString('hex'), ad: son, av: AVATAR.gecerli(av) ? av : '', puan: 0, seri: 0, dogru: 0, kazanc: 0, ok: false, cevap: null, akis: new Set() };
  G.oyuncular.set(o.id, o); yayinla();
  return { id: o.id };
}
function hostIslem(b) {
  switch (b.islem) {
    case 'ayar': if (G.faz === 'lobi') { if (ADETLER.includes(b.adet)) G.ayar.adet = b.adet; if (SURELER.includes(b.sure)) G.ayar.sure = b.sure; yayinla(false); } break;
    case 'basla': if (G.faz === 'lobi' && G.oyuncular.size) basla(); break;
    case 'atla': soruKapat(); break;
    case 'ileri': if (G.faz === 'sonuc') { if (G.qi < G.sorular.length - 1) { G.qi++; tanit(); } else { G.faz = 'final'; yayinla(); } } break;
    case 'tekrar': clearTimeout(G.t); G.faz = 'lobi'; G.qi = -1; G.sorular = [];
      for (const o of G.oyuncular.values()) Object.assign(o, { puan: 0, seri: 0, dogru: 0, kazanc: 0, ok: false, cevap: null }); yayinla(); break;
    case 'yeni': yeniOyun(); yayinla(); break;
    case 'cikar': { const o = [...G.oyuncular.values()].find(x => x.kod === b.id); if (o) { at(o); G.oyuncular.delete(o.id); yayinla(); } } break;
  }
}

/* ---------- HTTP ---------- */
const DOSYA = { '/': ['play.html', 'text/html'], '/host': ['host.html', 'text/html'], '/style.css': ['style.css', 'text/css'], '/qrcode.js': ['qrcode.js', 'text/javascript'], '/avatar.js': ['avatar.js', 'text/javascript'] };
const yerel = req => ['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(req.socket.remoteAddress);

// İstek yalnızca bu sunucunun kendi adreslerine yapılmışsa ve (varsa) Origin aynı adresse kabul edilir.
// Böylece başka bir web sayfası tarayıcı üzerinden bu sunucuya komut gönderemez (CSRF / DNS rebinding).
const izinliAdresler = () => new Set([...['localhost', '127.0.0.1', '[::1]', ...lan()].map(a => `${a}:${PORT}`), ...EK_ADRESLER]);
function adresGecerli(req) {
  const izinli = izinliAdresler();
  if (!izinli.has(String(req.headers.host || '').toLowerCase())) return false;
  const o = req.headers.origin;
  if (o) { try { if (!izinli.has(new URL(o).host.toLowerCase())) return false; } catch { return false; } }
  return true;
}
// Yanlış anahtar denemelerini IP başına sınırla: 8 yanlıştan sonra 5 dakika bekletilir.
const denemeler = new Map();
function anahtarDogru(req, anahtar) {
  const ip = (BARINDIRMA && String(req.headers['x-forwarded-for'] || '').split(',')[0].trim()) || req.socket.remoteAddress;
  const simdi = Date.now(), d = denemeler.get(ip);
  if (d && d.n >= 8 && simdi - d.t < 5 * 60000) return false;
  const a = Buffer.from(String(anahtar || '')), b = Buffer.from(ANAHTAR);
  if (a.length === b.length && crypto.timingSafeEqual(a, b)) { denemeler.delete(ip); return true; }
  if (anahtar) denemeler.set(ip, { n: (d && simdi - d.t < 5 * 60000 ? d.n : 0) + 1, t: simdi });
  return false;
}
const json = (res, kod, veri) => { res.writeHead(kod, { 'Content-Type': 'application/json; charset=utf-8' }); res.end(JSON.stringify(veri)); };
const govde = req => new Promise(coz => { let s = ''; req.on('data', c => { s += c; if (s.length > 4096) req.destroy(); }); req.on('end', () => { try { coz(JSON.parse(s || '{}')); } catch { coz({}); } }); });

http.createServer(async (req, res) => {
  const u = new URL(req.url, 'http://x'), yol = u.pathname;
  const yetkili = anahtar => (!BARINDIRMA && yerel(req)) || anahtarDogru(req, anahtar);
  if (yol === '/saglik') { res.writeHead(200, { 'Content-Type': 'text/plain' }); return res.end('ok'); }   // barındırma servisinin sağlık denetimi
  if (!adresGecerli(req)) { res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' }); return res.end('Geçersiz adres'); }

  if (req.method === 'GET' && yol === '/akis') {
    res.writeHead(200, { 'Content-Type': 'text/event-stream; charset=utf-8', 'Cache-Control': 'no-cache, no-transform', Connection: 'keep-alive', 'X-Accel-Buffering': 'no' });
    res.write('retry: 1500\n\n');
    if (u.searchParams.get('rol') === 'host') {
      if (!yetkili(u.searchParams.get('key'))) { yaz(res, { rol: 'host', faz: 'yetkisiz' }); return res.end(); }
      hostlar.add(res); yaz(res, hostDurum()); req.on('close', () => hostlar.delete(res)); return;
    }
    const o = G.oyuncular.get(u.searchParams.get('id'));
    if (!o) { yaz(res, { rol: 'oyuncu', faz: 'yok' }); return res.end(); }
    o.akis.add(res); yaz(res, oyuncuDurum(o)); yayinla(false);
    req.on('close', () => { o.akis.delete(res); yayinla(false); });
    return;
  }
  if (req.method === 'POST') {
    if (!String(req.headers['content-type'] || '').startsWith('application/json')) return json(res, 415, { hata: 'JSON bekleniyor' });
    const b = await govde(req);
    if (yol === '/api/katil') return json(res, 200, katil(b.pin, b.ad, b.av));
    if (yol === '/api/cevap') { const o = G.oyuncular.get(b.id); if (!o) return json(res, 200, { hata: 'yok' }); cevapla(o, b.secim); return json(res, 200, { tamam: true }); }
    if (yol === '/api/host') { if (!yetkili(b.key)) return json(res, 403, { hata: 'yetkisiz' }); hostIslem(b); return json(res, 200, { tamam: true }); }
    return json(res, 404, { hata: 'yok' });
  }
  const d = DOSYA[yol];
  if (req.method === 'GET' && d) {
    return fs.readFile(path.join(__dirname, 'public', d[0]), (hata, veri) => {
      if (hata) { res.writeHead(404); return res.end(); }
      res.writeHead(200, { 'Content-Type': d[1] + '; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(veri);
    });
  }
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end('Bulunamadı');
}).listen(PORT, '0.0.0.0', () => {
  console.log('\n  Acıbadem Milli Teknoloji Oyunu çalışıyor\n');
  if (BARINDIRMA) {
    const taban = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;
    console.log(`  Oyuncular      : ${taban}`);
    console.log(`  Sunucu ekranı  : ${taban}/host?key=${process.env.HOST_KEY ? '<HOST_KEY değeri>' : ANAHTAR}`);
  } else {
    const ip = lan()[0];
    console.log(`  Sunucu ekranı (bu bilgisayar) : http://localhost:${PORT}/host`);
    console.log(ip ? `  Oyuncular (tablet, aynı Wi-Fi): http://${ip}:${PORT}` : '  UYARI: Wi-Fi adresi bulunamadı. Bilgisayar ağa bağlı mı?');
    if (ip) console.log(`  Sunucu ekranı başka cihazdan  : http://${ip}:${PORT}/host?key=${ANAHTAR}`);
  }
  console.log('\n  Durdurmak için Ctrl+C\n');
});

yeniOyun();
setInterval(() => { for (const r of hostlar) r.write(': ping\n\n'); for (const o of G.oyuncular.values()) for (const r of o.akis) r.write(': ping\n\n'); }, 20000);
