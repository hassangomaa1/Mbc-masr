import axios from 'axios';

export default async function handler(req, res) {
    try {
        // صفحة المصدر اللي بنسحب منها الرابط الجديد
        // ملاحظة: دي صفحة تجريبية، يفضل استخدام رابط المصدر الفعلي لقناتك
        const targetUrl = 'https://raw.githubusercontent.com/iptv-org/iptv/master/streams/eg.m3u'; 
        
        // هنا إحنا بنجيب البيانات من المصدر
        const response = await axios.get(targetUrl);
        
        // بنبحث عن رابط mbc masr داخل القائمة
        // (تقدر تبدلها بـ Regex يجيب الرابط المباشر من أي صفحة تانية)
        const lines = response.data.split('\n');
        const mbcLink = lines.find(line => line.includes('mbc-masr') && line.endsWith('.m3u8'));

        if (mbcLink) {
            res.redirect(mbcLink.trim());
        } else {
            // لو مالقناش الرابط الجديد، بنستخدم الرابط الحالي كاحتياطي
            res.redirect('https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-masr/956eac069c78a35d47245db6cdbb1575/index.m3u8');
        }
    } catch (error) {
        // في حالة الخطأ وجهه للرابط اللي كان شغال معاك
        res.redirect('https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-masr/956eac069c78a35d47245db6cdbb1575/index.m3u8');
    }
}
