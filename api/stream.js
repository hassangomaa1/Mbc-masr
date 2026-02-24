import axios from 'axios';

export default async function handler(req, res) {
    // تفعيل خاصية الـ CORS عشان المتصفح ميعملش بلوك
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    try {
        // محاولة جلب روابط من قائمة IPTV محدثة
        const response = await axios.get('https://iptv-org.github.io/iptv/countries/eg.m3u', { timeout: 5000 });
        const lines = response.data.split('\n');
        
        // البحث عن قناة MBC Masr
        const mbcLink = lines.find(line => line.toLowerCase().includes('mbc_masr') && line.includes('.m3u8'));

        if (mbcLink) {
            return res.redirect(mbcLink.trim());
        }
    } catch (e) {
        console.log("Error fetching dynamic link, using fallback.");
    }

    // إذا فشل في جلب رابط جديد، بيحول الزائر للرابط اللي معاك (الاحتياطي)
    res.redirect('https://shd-gcp-live.edgenextcdn.net/live/bitmovin-mbc-masr/956eac069c78a35d47245db6cdbb1575/index.m3u8');
}
