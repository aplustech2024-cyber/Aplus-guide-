// اسم النسخة التخزينية (تغيير الرقم يساعد في تحديث الملفات عند العميل)
const cacheName = 'aplus-v5';

// قائمة الملفات التي سيتم تخزينها لتعمل بدون إنترنت
const assets = [
  './',
  'index.html',
  'manifest.json',
  'logo.png',
  'document.pdf'
];

// مرحلة التثبيت: يتم فيها حفظ الملفات المذكورة أعلاه في ذاكرة المتصفح
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Caching shell assets');
      return cache.addAll(assets);
    })
  );
});

// مرحلة التفعيل: يتم فيها تنظيف النسخ القديمة من الكاش إذا وجدت
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== cacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// مرحلة جلب البيانات: عند طلب أي ملف، يتم البحث عنه في الكاش أولاً
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cacheRes => {
      return cacheRes || fetch(e.request);
    })
  );
});
