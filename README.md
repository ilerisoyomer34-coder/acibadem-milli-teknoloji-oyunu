# Milli Teknoloji Bilgi Yarışı

Ortaokul öğrencileri için, Türkiye'nin milli teknolojileri üzerine çok oyunculu bilgi yarışması. Sorular akıllı tahtada açılır; 1–25 öğrenci kendi tabletinden PIN ve isimle katılıp cevap verir.

## Çalıştırma

Node.js 18 veya üzeri yeterlidir; kurulacak paket yoktur.

```
node server.js
```

- **Sunucu ekranı (akıllı tahta):** `http://localhost:3000/host`
- **Oyuncular (tablet):** terminalde ve sunucu ekranında yazan adres, örneğin `http://192.168.1.7:3000`. Kare kod da okutulabilir.

macOS'te `Baslat.command` dosyasına çift tıklamak aynı işi yapar. Bilgisayar ile tabletler aynı Wi-Fi ağında olmalıdır.

## Oyun

- Süreli, dört şıklı sorular; hızlı ve doğru cevap daha çok puan getirir, art arda doğrular seri bonusu kazandırır.
- Her sorudan sonra doğru cevap, şık dağılımı, kısa bir "Biliyor muydun?" bilgisi ve sıralama gösterilir.
- Öğrenciler isteğe bağlı olarak milli teknoloji temalı bir profil resmi seçebilir.
- Tur başına 10, 15 ya da 20 soru; soru süresi 15, 20 ya da 30 saniye.

## Sorular

Sorular `sorular/` klasöründe, kategori başına bir dosyadadır. Her satır şu biçimdedir:

```
["soru", "DOĞRU cevap", "yanlış", "yanlış", "yanlış", "kısa bilgi"]
```

`sorular/seviyeler.json` her soruya bir seviye verir: `1` bilinen (turun başında sorulur), `2` orta, `0` kapalı. Sorular kaynaklardan tek tek doğrulanmamıştır; sınıfta kullanmadan önce gözden geçirin.

## Dosyalar

| Dosya | İş |
|---|---|
| `server.js` | Oyun sunucusu: oyun akışı, süre, puanlama |
| `sorular.js` | Soru dosyalarını birleştirir ve denetler |
| `public/host.html` | Akıllı tahta ekranı |
| `public/play.html` | Tablet ekranı |
| `public/avatar.js` | Profil resimleri |
| `public/qrcode.js` | Kare kod üretimi ([qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator), MIT lisansı) |

Puanlama kuralı `server.js` içindeki `puanHesapla` fonksiyonundadır.
