# Acıbadem Milli Teknoloji Oyunu

Türkiye'nin milli teknolojileri üzerine, sınıfça oynanan bir bilgi yarışması. Sorular akıllı tahtada açılır, öğrenciler kendi tabletlerinden cevap verir. Aynı anda 1–25 öğrenci oynayabilir.

Kurulum gerekmez; oyun internette çalışır. Tahtada ve tabletlerde bir internet tarayıcısı (Safari, Chrome) yeterlidir.

## Oyun nasıl başlatılır

### 1. Tahtada yönetici sayfasını açın

Akıllı tahtanın tarayıcısında **yönetici adresini** açın. Bu adres size ayrıca iletilmiştir ve şu biçimdedir:

```
https://acibadem-milli-teknoloji-oyunu.onrender.com/host?key=…
```

Sayfa ilk açılışta bir dakika kadar bekletebilir; bu normaldir. Dersten birkaç dakika önce açmanız önerilir.

Ekranda bir **kare kod**, bir **adres** ve 6 haneli bir **PIN** göreceksiniz.

### 2. Öğrenciler tabletten katılsın

Öğrenciler iki yoldan biriyle katılır:

- Tabletin kamerasıyla tahtadaki **kare kodu** okutur, ya da
- Tarayıcıda şu adresi açıp tahtadaki **PIN**'i yazar:
  **https://acibadem-milli-teknoloji-oyunu.onrender.com**

Sonra adını yazar, isterse bir profil resmi seçer ve **Katıl**'a basar. Katılan öğrencinin adı tahtada belirir; tabletinde "Yöneticinin oyunu başlatması bekleniyor" yazar.

### 3. Ayarları seçip başlatın

Tahtada soru sayısını (10, 15 ya da 20) ve soru süresini (15, 20 ya da 30 saniye) seçin. Herkes katılınca **Yarışı başlat**'a basın.

> Süre için 20 ya da 30 saniye önerilir; internet yavaşsa 15 saniye kısa kalabilir.

### 4. Oyunu yönetin

- Her soru hem tahtada hem tabletlerde görünür. Öğrenci cevabını tabletinden seçer.
- Herkes cevaplayınca ya da süre bitince soru kapanır. Beklemek istemezseniz **Süreyi bitir**'e basın.
- Tahtada doğru cevap, her şıkkı kaç kişinin seçtiği, kısa bir "Biliyor muydun?" bilgisi ve sıralama görünür.
- Devam etmek için **Sonraki soru**'ya basın.
- Son sorudan sonra kürsü ve tam sıralama çıkar.

### 5. Yeni tur

- **Aynı oyuncularla tekrar:** Aynı sınıfla yeni bir tur başlatır; öğrencilerin yeniden katılması gerekmez.
- **Yeni oyun (yeni PIN):** Herkesi çıkarır ve yeni bir PIN üretir. Başka bir sınıfa geçerken bunu kullanın.

## Puanlama

- Doğru cevap en az **500 puan** kazandırır.
- Ne kadar hızlı cevaplanırsa o kadar çok puan gelir; en fazla **1.000 puan**.
- Art arda doğru cevaplar **seri bonusu** verir (en fazla +300).
- Yanlış ya da boş cevap puan getirmez ve seriyi sıfırlar.

## Sık karşılaşılan durumlar

| Durum | Ne yapmalı |
|---|---|
| Sayfa uzun süre açılmıyor | Bir dakika bekleyip sayfayı yenileyin. Oyun uzun süre kullanılmayınca uykuya geçer, ilk açılış yavaştır. |
| Öğrenci "PIN hatalı" görüyor | Tahtadaki güncel PIN'e baksın. "Yeni oyun" denildiyse PIN değişmiştir. |
| Tablet ekranı kilitlendi ya da sayfa kapandı | Öğrenci aynı adresi yeniden açsın; puanıyla kaldığı yerden devam eder. |
| Uygunsuz bir isim yazıldı | Oyun başlamadan önce tahtada o ismin üstüne tıklayın; öğrenci oyundan çıkarılır. |
| "Oyun dolu" yazıyor | En fazla 25 öğrenci katılabilir. |
| Ders ortasında oyun sıfırlandı | 15 dakikadan uzun ara verilirse oyun uykuya geçer ve silinir. Yeniden başlatın. |

**Yönetici adresini öğrencilerle paylaşmayın.** O adrese sahip olan kişi oyunu başlatıp bitirebilir.

## Sorular

Yaklaşık 300 soru vardır. Konular: insansız hava araçları, uçak ve helikopterler, uzay ve uydular, kara araçları ve savunma, denizcilik, otomobil ve elektrikli araçlar, raylı sistemler ve büyük projeler, enerji ve maden, bilim insanları, yazılım ve dijital teknoloji, bilim ve teknoloji tarihimiz.

Her turda sorular rastgele seçilir; daha bilinen sorular turun başında, biraz daha zor olanlar sonunda gelir.

Sorular kaynaklardan tek tek doğrulanmamıştır. Hatalı bir soru fark ederseniz aşağıdaki yöntemle düzeltebilir ya da kapatabilirsiniz.

---

## Teknik bilgiler (geliştiriciler için)

### Nasıl çalışıyor

Oyun küçük bir Node.js sunucusudur (`server.js`); ek paket gerektirmez. Süreyi, doğru cevapları ve puanları sunucu tutar; doğru cevap, soru kapanana kadar tabletlere gönderilmez. Sunucu, tahta ve tabletlere anlık güncellemeleri Server-Sent Events ile yollar; cevaplar sıradan HTTP istekleriyle gelir.

### Yayın

Oyun [Render](https://render.com) üzerinde çalışır; ayarı `render.yaml` dosyasındadır. Bu depoya gönderilen her değişiklik oyunu kendiliğinden yeniden kurar. Yeniden kurulum sırasında açık oyun kapanır, bu yüzden ders sırasında değişiklik göndermeyin.

Yönetici anahtarı Render'da servisin **Environment** sekmesindeki `HOST_KEY` değeridir. Yönetici adresi `…/host?key=HOST_KEY_DEĞERİ` biçimindedir. Anahtar en az 12 karakter olmalıdır.

### Kendi bilgisayarında çalıştırma

Node.js 18 ya da üzeri yeterlidir:

```
node server.js
```

Yönetici sayfası `http://localhost:3000/host` adresinde açılır; tabletler terminalde yazan adresten katılır. Bu kullanımda bilgisayar ve tabletler aynı Wi-Fi ağında olmalıdır.

### Soru ekleme ve düzeltme

Sorular `sorular/` klasöründe, konu başına bir dosyadadır. Her satır şu biçimdedir:

```
["soru", "DOĞRU cevap", "yanlış", "yanlış", "yanlış", "cevaptan sonra gösterilen kısa bilgi"]
```

İlk şık her zaman doğru cevaptır; oyun şıkları kendisi karıştırır.

`sorular/seviyeler.json` her dosyadaki sorulara sırayla bir rakam verir: `1` bilinen (turun başında sorulur), `2` orta, `0` kapalı (sorulmaz). Bir soruyu kapatmak için rakamını `0` yapın. Seviyesi yazılmamış yeni sorular `2` sayılır.

### Dosyalar

| Dosya | İş |
|---|---|
| `server.js` | Oyun sunucusu: oyun akışı, süre, puanlama, güvenlik |
| `sorular.js` | Soru dosyalarını birleştirir ve denetler |
| `sorular/` | Sorular ve seviyeleri |
| `public/host.html` | Tahta (yönetici) ekranı |
| `public/play.html` | Tablet (oyuncu) ekranı |
| `public/avatar.js` | Profil resimleri |
| `public/style.css` | Görünüm |
| `public/qrcode.js` | Kare kod üretimi ([qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator), MIT lisansı) |
| `render.yaml`, `package.json` | Yayın ayarları |

Puanlama kuralı `server.js` içindeki `puanHesapla` fonksiyonundadır.
