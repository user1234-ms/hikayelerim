# Hikaye Görüntüleme Sayacı Sistemi

Bu sistem, hikaye görüntüleme sayılarını tüm platformlarda merkezi olarak takip eder.

## Kurulum

1. **Node.js'i yükleyin** (eğer yüklü değilse):
   - [Node.js İndirme Sayfası](https://nodejs.org/)

2. **Bağımlılıkları yükleyin**:
   ```bash
   npm install
   ```

3. **Sunucuyu başlatın**:
   ```bash
   npm start
   ```

4. **Web sitesini açın**:
   - Tarayıcınızda `http://localhost:3000` adresine gidin

## Nasıl Çalışır

### Eski Sistem (Sorunlu)
- Her tarayıcı/cihaz kendi localStorage'ında sayıları tutuyordu
- Farklı platformlarda farklı sayılar görünüyordu
- Toplam sayı bilgisi yoktu

### Yeni Sistem (Çözüm)
- Merkezi bir JSON dosyasında (`viewCounts.json`) tüm sayılar saklanıyor
- Tüm platformlardan gelen görüntülemeler aynı dosyaya kaydediliyor
- Her platformda aynı toplam sayı görünüyor

## API Endpoints

- `GET /api/viewCounts` - Tüm hikaye görüntüleme sayılarını getirir
- `POST /api/incrementView` - Belirli bir hikayenin görüntüleme sayısını artırır

## Dosya Yapısı

```
├── index.html          # Ana web sayfası
├── server.js           # Node.js sunucu
├── package.json        # Proje bağımlılıkları
├── viewCounts.json     # Görüntüleme sayıları (otomatik oluşur)
└── README.md           # Bu dosya
```

## Fallback Sistemi

Eğer sunucu çalışmıyorsa:
- Sistem otomatik olarak localStorage'a geri döner
- Kullanıcı deneyimi kesintisiz devam eder
- Sunucu tekrar çalıştığında localStorage verileri sunucuya aktarılabilir

## Geliştirme

Geliştirme modunda çalıştırmak için:
```bash
npm run dev
```

Bu komut nodemon kullanarak dosya değişikliklerinde otomatik olarak sunucuyu yeniden başlatır.

## Sorun Giderme

1. **Port 3000 kullanımda**: `server.js` dosyasında PORT değişkenini değiştirin
2. **CORS hatası**: Sunucu çalışıyor mu kontrol edin
3. **Sayılar güncellenmiyor**: Tarayıcı konsolunu kontrol edin

## Notlar

- `viewCounts.json` dosyası otomatik olarak oluşturulur
- Sunucu çalışmadığında localStorage fallback sistemi devreye girer
- Tüm hikaye isimleri Türkçe karakterler içerebilir 