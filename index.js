const { Telegraf } = require('telegraf');
const axios = require('axios');

// التوكن الخاص بك
const bot = new Telegraf('8707360184:AAHMsSRSFOtz8Qpx_zorsGXba1shCkHOG3Y');

// استخدام رابط متغير (إما من السحابة أو الرابط المحلي الافتراضي)
const API_URL = process.env.API_URL || 'http://localhost:3000';

bot.start((ctx) => ctx.reply('مرحباً بك! أنا بوت الحجز. كيف يمكنني مساعدتك اليوم؟'));

bot.command('book', async (ctx) => {
    const bookingData = {
        tenantId: "11111111-1111-1111-1111-111111111111",
        branchId: "22222222-2222-2222-2222-222222222222",
        staffId: "11111111-1111-1111-1111-111111111111",
        serviceId: "33333333-3333-3333-3333-333333333333",
        date: "2026-06-25",
        time: "15:00",
        duration: "30",
        customerName: ctx.from.first_name,
        customerPhone: "0500000000"
    };

    try {
        // نستخدم المتغير API_URL الذي عرفناه في الأعلى
        await axios.post(`${API_URL}/api/book`, bookingData);
        ctx.reply('تم حجز موعدك بنجاح! سيظهر في لوحة التحكم قريباً.');
    } catch (e) {
        console.error('Error details:', e.message); // لمساعدتنا في معرفة الخطأ بالضبط
        ctx.reply('حدث خطأ أثناء الحجز، تأكد أن السيرفر يعمل.');
    }
});

bot.launch();
console.log(`✅ البوت يعمل الآن! ويتصل بـ: ${API_URL}`);