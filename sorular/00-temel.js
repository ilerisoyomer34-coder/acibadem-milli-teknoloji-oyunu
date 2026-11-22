// Soru bankası. a[0] her zaman DOĞRU cevaptır; şıklar oyunda karıştırılır.
// k: kategori, q: soru, a: şıklar (ilki doğru), f: cevaptan sonra gösterilen kısa bilgi.
module.exports = [
 /* ---------- Hava Araçları ---------- */
 {k:"Hava Araçları", q:"Aşağıdaki hava araçlarından hangisinin içinde pilot bulunur?", a:["HÜRJET","Bayraktar TB2","Bayraktar AKINCI","ANKA"], f:"HÜRJET, pilotların eğitim aldığı yerli jet uçağıdır; diğer üçü insansız hava aracıdır."},
 {k:"Hava Araçları", q:"İnsansız hava araçlarını uçuş sırasında kim yönetir?", a:["Yer kontrol istasyonundaki pilotlar","Uçağın içindeki pilot","Yolcular","Hava trafik polisleri"], f:"İHA pilotları, yerdeki bir istasyonda ekranlara bakarak aracı uydu ve radyo bağlantısıyla yönetir."},
 {k:"Hava Araçları", q:"İHA ile SİHA arasındaki fark nedir?", a:["SİHA silah taşıyabilir","SİHA yolcu taşır","SİHA su altında gider","SİHA'nın motoru yoktur"], f:"SİHA, \"Silahlı İnsansız Hava Aracı\" demektir."},
 {k:"Hava Araçları", q:"Milli muharip uçak KAAN ilk uçuşunu hangi yıl yaptı?", a:["2024","2010","2016","2020"], f:"KAAN, 21 Şubat 2024'te Ankara'da ilk kez havalandı."},
 {k:"Hava Araçları", q:"Hem insansız olan hem de jet motoruyla uçan yerli savaş uçağı hangisidir?", a:["Bayraktar KIZILELMA","HÜRKUŞ","GÖKBEY","ATAK"], f:"KIZILELMA ilk uçuşunu Aralık 2022'de yaptı."},
 {k:"Hava Araçları", q:"Bayraktar TB3'ün kanatları neden katlanabilir?", a:["Gemide az yer kaplaması için","Daha hızlı uçması için","Suya inebilmesi için","Yakıt taşıması için"], f:"TB3, kısa pistli gemilerden kalkıp inebilecek şekilde tasarlandı."},
 {k:"Hava Araçları", q:"HÜRKUŞ eğitim uçağı adını kimden alır?", a:["Vecihi Hürkuş","Nuri Demirağ","Hezarfen Ahmed Çelebi","Cahit Arf"], f:"Vecihi Hürkuş, 1925'te kendi tasarladığı uçağı uçuran havacılık öncümüzdür."},
 {k:"Hava Araçları", q:"T129 ATAK ne tür bir hava aracıdır?", a:["Taarruz helikopteri","Yolcu uçağı","Kargo uçağı","Gözlem balonu"], f:"ATAK, sıcak ve yüksek bölgelerde görev yapabilen bir taarruz ve keşif helikopteridir."},
 {k:"Hava Araçları", q:"GÖKBEY helikopteri için geliştirilen yerli motoru hangi kuruluş üretti?", a:["TEI","Togg","Türksat","TÜRASAŞ"], f:"TEI'nin TS1400 motoru, Türkiye'nin ilk yerli helikopter motorudur."},
 {k:"Hava Araçları", q:"\"KAAN\" kelimesinin anlamı nedir?", a:["Hükümdar, kağan","Şimşek","Kartal","Yıldız"], f:"Kaan, eski Türkçede \"hakan, hükümdar\" anlamına gelir."},

 /* ---------- Uzay ---------- */
 {k:"Uzay", q:"İlk Türk astronot Alper Gezeravcı uzayda nerede görev yaptı?", a:["Uluslararası Uzay İstasyonu","Ay yüzeyi","Mars","Hubble Uzay Teleskobu"], f:"Gezeravcı, Ocak 2024'te uzaya gitti ve istasyonda bilimsel deneyler yaptı."},
 {k:"Uzay", q:"Türksat uyduları en çok ne için kullanılır?", a:["Televizyon yayını ve haberleşme","Hava tahmini","Ay'a yolcu taşımak","Deprem ölçmek"], f:"Türksat 6A, Türkiye'nin kendi ürettiği ilk haberleşme uydusudur ve 2024'te fırlatıldı."},
 {k:"Uzay", q:"Haberleşme uyduları Dünya'dan yaklaşık ne kadar yüksekte durur?", a:["36.000 km","36 km","360 km","3.600 km"], f:"Bu yükseklikte uydu Dünya ile aynı hızda döner; bu yüzden gökyüzünde hep aynı noktada görünür."},
 {k:"Uzay", q:"İMECE gibi yer gözlem uydularının çektiği görüntüler hangisinde işe yarar?", a:["Afet bölgelerini ve tarım alanlarını izlemede","Televizyon dizisi yayınlamada","Telefonla konuşmada","Uçaklara yakıt vermede"], f:"İMECE, Nisan 2023'te fırlatılan yerli bir yüksek çözünürlüklü gözlem uydusudur."},
 {k:"Uzay", q:"Milli Uzay Programı'nın en dikkat çeken hedefi hangisidir?", a:["Ay'a ulaşmak","Güneş'e inmek","Jüpiter'e şehir kurmak","Dünya'nın merkezine inmek"], f:"Milli Uzay Programı 2021'de açıklandı ve on hedeften oluşuyor."},
 {k:"Uzay", q:"Uzaya çıkan ikinci Türk astronot kimdir?", a:["Tuva Cihangir Atasever","Selçuk Bayraktar","Aziz Sancar","Vecihi Hürkuş"], f:"Atasever, Haziran 2024'teki yörünge altı uçuşta bilimsel deneyler gerçekleştirdi."},
 {k:"Uzay", q:"Türkiye'nin en büyük teleskobunun bulunduğu Doğu Anadolu Gözlemevi hangi ildedir?", a:["Erzurum","Antalya","İzmir","Edirne"], f:"Gözlemevi 3.170 metre yükseklikte kuruldu; teleskobun aynası 4 metre çapındadır."},

 /* ---------- Kara ve Deniz ---------- */
 {k:"Kara ve Deniz", q:"ALTAY ne tür bir araçtır?", a:["Ana muharebe tankı","Denizaltı","Yolcu treni","Yangın söndürme uçağı"], f:"ALTAY, adını Kurtuluş Savaşı komutanlarından Fahrettin Altay'dan alır."},
 {k:"Kara ve Deniz", q:"Güvertesinden insansız hava araçlarının kalkabildiği, donanmamızın en büyük gemisi hangisidir?", a:["TCG Anadolu","TCG Heybeliada","Nusret","Savarona"], f:"TCG Anadolu 2023'te donanmaya katıldı."},
 {k:"Kara ve Deniz", q:"Savaş gemilerini Türkiye'de tasarlayıp üretmeyi amaçlayan MİLGEM'in açılımı nedir?", a:["Milli Gemi","Milli Gemici Mektebi","Mili Geçen Motor","Milli Gezi Merkezi"], f:"MİLGEM projesinin ilk gemisi TCG Heybeliada'dır."},
 {k:"Kara ve Deniz", q:"Aşağıdakilerden hangisi silahlı bir insansız deniz aracıdır?", a:["ULAQ","GÖKBEY","ALTAY","HÜRJET"], f:"ULAQ, içinde mürettebat olmadan uzaktan yönetilen yerli bir deniz aracıdır."},
 {k:"Kara ve Deniz", q:"Gemilerden atılarak denizdeki hedefleri vuran yerli füze hangisidir?", a:["ATMACA","GÖKBEY","KİRPİ","İMECE"], f:"ATMACA, ROKETSAN'ın geliştirdiği bir gemisavar füzesidir."},
 {k:"Kara ve Deniz", q:"Türkiye'nin katmanlı hava savunma sistemi projesinin adı nedir?", a:["Çelik Kubbe","Demir Kapı","Altın Kalkan","Gök Kale"], f:"Çelik Kubbe; radarları ve farklı menzildeki hava savunma sistemlerini tek ağda birleştirir."},
 {k:"Kara ve Deniz", q:"Radar, telsiz ve elektronik sistemler üreten savunma sanayisi kuruluşumuz hangisidir?", a:["ASELSAN","Togg","TÜRASAŞ","Türksat"], f:"ASELSAN 1975'te kuruldu."},
 {k:"Kara ve Deniz", q:"Pilotların yerde eğitim aldığı uçuş simülatörlerini ve savunma yazılımlarını hangi kuruluş geliştirir?", a:["HAVELSAN","Devrim","Anadol","Deneyap"], f:"Simülatörler sayesinde pilotlar tehlikeli durumları güvenle prova edebilir."},
 {k:"Kara ve Deniz", q:"KİRPİ adlı yerli araç ne işe yarar?", a:["Askerleri mayına karşı korumalı taşır","Yangın söndürür","Tarla sürer","Yolcu taşır"], f:"KİRPİ'nin gövdesi, patlamanın etkisini yanlara dağıtacak şekilde tasarlanmıştır."},

 /* ---------- Ulaşım ---------- */
 {k:"Ulaşım", q:"Yerli otomobil Togg'un fabrikası hangi ilimizdedir?", a:["Bursa","Ankara","İzmir","Konya"], f:"Fabrika Bursa'nın Gemlik ilçesindedir."},
 {k:"Ulaşım", q:"Elektrikli otomobiller enerjiyi nerede depolar?", a:["Bataryada","Benzin deposunda","Egzozda","Radyatörde"], f:"Togg T10X gibi elektrikli araçların egzozu yoktur; batarya şarj edilerek kullanılır."},
 {k:"Ulaşım", q:"Togg'un T10X'ten sonra tanıttığı ikinci model hangisidir?", a:["T10F","T20X","T5S","T100"], f:"T10X bir SUV, T10F ise daha alçak gövdeli bir modeldir."},
 {k:"Ulaşım", q:"1961'de Eskişehir'de yalnızca 129 günde yapılan otomobilin adı nedir?", a:["Devrim","Anadol","Togg","Kartal"], f:"Devrim otomobillerinden biri bugün Eskişehir'de sergileniyor."},
 {k:"Ulaşım", q:"1966'da seri üretimine başlanan ilk Türk otomobili hangisidir?", a:["Anadol","Devrim","Togg","Şahin"], f:"Anadol'un gövdesi çelik yerine cam elyafından (fiberglas) yapılmıştı."},
 {k:"Ulaşım", q:"Milli Elektrikli Tren setleri hangi ilimizde üretildi?", a:["Sakarya","Antalya","Trabzon","Mardin"], f:"Tren saatte 160 km hıza çıkabiliyor ve 2023'te yolcu taşımaya başladı."},
 {k:"Ulaşım", q:"1961'de Eskişehir'de üretilen ilk yerli buharlı lokomotifin adı nedir?", a:["Karakurt","Akıncı","Kızılelma","Gökbey"], f:"Karakurt ile aynı yıl Sivas'ta Bozkurt adlı lokomotif de üretildi."},

 /* ---------- Enerji ve Maden ---------- */
 {k:"Enerji ve Maden", q:"2020'de Karadeniz'de doğal gaz keşfeden sondaj gemimizin adı nedir?", a:["Fatih","Nusret","Piri Reis","Hamidiye"], f:"Türkiye'nin sondaj gemileri Fatih, Yavuz, Kanuni ve Abdülhamid Han adlarını taşır."},
 {k:"Enerji ve Maden", q:"Dünyadaki en büyük rezervi Türkiye'de bulunan, uzay ve savunma sanayisinde kullanılan maden hangisidir?", a:["Bor","Elmas","Uranyum","Altın"], f:"Dünya bor rezervinin yaklaşık dörtte üçü Türkiye'dedir. Bor; zırh, cam ve roket yakıtında kullanılır."},
 {k:"Enerji ve Maden", q:"Bir ülkenin teknolojiyi kendisinin üretmesinin en önemli faydası nedir?", a:["Başka ülkelere bağımlılığın azalması","Ürünlerin daha ağır olması","Fabrikaların kapanması","İthalatın artması"], f:"Kendi teknolojisini üreten ülkeler, bu ürünleri başka ülkelere de satabilir."},

 /* ---------- Bilim ve Sağlık ---------- */
 {k:"Bilim ve Sağlık", q:"2015'te Nobel Kimya Ödülü'nü kazanan Aziz Sancar neyi keşfetti?", a:["Hücrelerin hasarlı DNA'yı nasıl onardığını","Yeni bir gezegeni","Elektrikli motoru","Bir bilgisayar virüsünü"], f:"Aziz Sancar Mardin'in Savur ilçesinde doğdu ve Nobel madalyasını Anıtkabir'e armağan etti."},
 {k:"Bilim ve Sağlık", q:"10 liralık banknotların arkasında resmi bulunan matematikçimiz kimdir?", a:["Cahit Arf","Aziz Sancar","Ali Kuşçu","Nuri Demirağ"], f:"Cahit Arf'ın bulduğu \"Arf değişmezi\" matematikte bugün de kullanılıyor."},
 {k:"Bilim ve Sağlık", q:"Türkiye'nin geliştirdiği yerli Covid-19 aşısının adı nedir?", a:["TURKOVAC","PARDUS","İMECE","ULAK"], f:"TURKOVAC, Erciyes Üniversitesi'nde geliştirildi."},
 {k:"Bilim ve Sağlık", q:"Türk bilim insanları hangi kıtada bilim seferleri düzenleyip bilim üssü kurdu?", a:["Antarktika","Avustralya","Afrika","Güney Amerika"], f:"Seferlerde iklim, buzullar ve deniz canlıları üzerine araştırmalar yapılıyor."},
 {k:"Bilim ve Sağlık", q:"Bilim Çocuk ve Bilim ve Teknik dergilerini hangi kurum yayımlar?", a:["TÜBİTAK","ASELSAN","Türksat","Togg"], f:"TÜBİTAK 1963'te kuruldu; bilim insanlarını ve öğrenci projelerini de destekler."},

 /* ---------- Dijital Teknoloji ---------- */
 {k:"Dijital Teknoloji", q:"Aşağıdakilerden hangisi yerli bir işletim sistemidir?", a:["Pardus","Windows","Android","iOS"], f:"Pardus'u TÜBİTAK geliştirir; adını Anadolu parsından alır."},
 {k:"Dijital Teknoloji", q:"Aşağıdakilerden hangisi yerli bir mesajlaşma uygulamasıdır?", a:["BiP","WhatsApp","Telegram","Signal"], f:"BiP ile mesajlaşmanın yanında görüntülü görüşme de yapılabilir."},
 {k:"Dijital Teknoloji", q:"Vatandaşların pek çok resmi işlemi internetten yapabildiği sistemin adı nedir?", a:["e-Devlet Kapısı","Pardus","TEKNOFEST","Türksat 6A"], f:"e-Devlet sayesinde pek çok belge, kuruma gitmeden birkaç dakikada alınabiliyor."},
 {k:"Dijital Teknoloji", q:"ULAK projesiyle hangi yerli ürün geliştirildi?", a:["Cep telefonu şebekesi için baz istasyonu","Elektrikli otomobil","Gözlem uydusu","Hızlı tren"], f:"Baz istasyonları, cep telefonlarının birbiriyle ve internetle bağlantı kurmasını sağlar."},
 {k:"Dijital Teknoloji", q:"TEKNOFEST'te öğrenci takımları hangisinde yarışabilir?", a:["Kendi yaptıkları roketleri fırlatmada","Halk oyunlarında","Yemek yapmada","Resim çizmede"], f:"TEKNOFEST'te roket, insansız hava aracı, robotik ve yapay zekâ gibi onlarca yarışma vardır."},

 /* ---------- Teknoloji Tarihi ---------- */
 {k:"Teknoloji Tarihi", q:"1930'larda kendi parasıyla İstanbul'da uçak fabrikası kuran iş insanımız kimdir?", a:["Nuri Demirağ","Cahit Arf","Aziz Sancar","Alper Gezeravcı"], f:"Nuri Demirağ'ın fabrikasında Nu.D.38 adlı yolcu uçağı üretildi."},
 {k:"Teknoloji Tarihi", q:"İlk Türk uçağını tasarlayıp 1925'te uçuran havacımız kimdir?", a:["Vecihi Hürkuş","Nuri Demirağ","Ali Kuşçu","Piri Reis"], f:"Hürkuş'un uçağının adı \"Vecihi K-VI\" idi."},
 {k:"Teknoloji Tarihi", q:"Evliya Çelebi'nin anlattığına göre 17. yüzyılda Galata Kulesi'nden kanat takıp uçan kişi kimdir?", a:["Hezarfen Ahmed Çelebi","Mimar Sinan","Ali Kuşçu","Piri Reis"], f:"Anlatıya göre Hezarfen, Boğaz'ı aşıp Üsküdar'a indi."},
 {k:"Teknoloji Tarihi", q:"Türkiye'nin uzaya başarıyla gönderdiği ilk haberleşme uydusu hangisidir?", a:["Türksat 1B","Türksat 6A","İMECE","Göktürk-2"], f:"Türksat 1B 1994'te fırlatıldı."}
];
