# OHIS — سامانه جامع اطلاعات سلامت شغلی و مراکز طب کار
### (Occupational Health Information System)

سامانه سازمانی و پیشرفته مدیریت فرآیندهای طب کار، پرونده الکترونیک سلامت شاغلین، نوبت‌دهی هوشمند، آزمایشگاه، پاراکلینیک، معاینات بالینی، امور مالی و **بازآفرینی کامل فرم رسمی ۵ صفحه‌ای وزارت بهداشت، درمان و آموزش پزشکی**.

---

## 🏗️ معماری سیستم (System Architecture)

این پروژه با ساختار **Monorepo** و الگوی **Modular Monolith** پیاده‌سازی شده است:

```
OHIS/
├── backend/                  # سرویس‌های بک‌اند Django REST Framework
│   ├── apps/
│   │   ├── clinical/         # مدیریت پرونده‌ها، جداول ۱ تا ۹، ارجاعات و قفل
│   │   ├── contracts/        # قراردادها و سازمان‌های طرف قرارداد
│   │   ├── finance/          # صندوق مالی و تراکنش‌های پوز
│   │   └── ticketing/        # سیستم تیکتینگ و پشتیبانی
│   ├── core/                 # احراز هویت با JWT، لاگ حسابرسی و مدل‌های پایه
│   ├── config/               # تنظیمات Django، URLs و Celery
│   ├── requirements/         # وابستگی‌های پایتون (base.txt, production.txt)
│   ├── Dockerfile            # ایمیج اختصاصی پایتون ۳.۱۲
│   └── manage.py
├── frontend/                 # اپلیکیشن وب SPA با React 19 و TypeScript
│   ├── src/
│   │   ├── components/       # فرم ۵ صفحه‌ای رسمی، جداول بالینی، داشبورد
│   │   ├── domain/           # منطق دامنه و قوانین بالینی (Rules & RBAC)
│   │   ├── data/             # داده‌های آزمایشی استاندارد طب کار
│   │   └── types/            # تعاریف داده و تایپ‌های سیستم
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml        # ارکستراسیون کانتینرهای Postgres، Redis، Celery و Web
└── README.md
```

### مؤلفه‌های کلیدی:
1. **بک‌اند**: Django 5 + Django REST Framework + SimpleJWT
2. **فرانت‌اند**: React 19 + TypeScript + Tailwind CSS (راست‌چین و فونت وزیرمتن)
3. **پایگاه داده**: PostgreSQL 16
4. **کشینگ و صف پیام**: Redis 7.2
5. **پردازش‌های ناهمگام**: Celery Worker & Beat (ارسال پیامک و رندر PDF)
6. **محیط اجرا**: Docker & Docker Compose

---

## 🚀 راهنمای سریع راه‌اندازی با داکر (Quickstart)

برای راه‌اندازی کل پشته با یک دستور:

```bash
# ۱. راه‌اندازی سرویس‌های Postgres, Redis, Celery, Django و React
docker compose up --build -d

# ۲. اجرای مایگریشن‌های اولیه پایگاه‌داده
docker compose exec backend python manage.py migrate

# ۳. ایجاد کاربر مدیر ارشد (Superuser)
docker compose exec backend python manage.py createsuperuser
```

پس از بالا آمدن:
- **وب‌اپلیکیشن**: [http://localhost:3000](http://localhost:3000)
- **سرویس API جنگو**: [http://localhost:8000/api/v1/](http://localhost:8000/api/v1/)
- **مستندات Swagger / OpenAPI**: [http://localhost:8000/api/docs/](http://localhost:8000/api/docs/)

---

## 📦 نحوه بارگذاری در گیت‌هاب (Push to GitHub)

برای قرار دادن پروژه روی ریپازیتوری شخصی گیت‌هاب:

```bash
git init
git remote add origin https://github.com/USERNAME/OHIS.git
git add .
git commit -m "feat: initial production release of OHIS with Django, React, Postgres, Redis, and Celery"
git branch -M main
git push -u origin main
```

---

## 📋 پوشش جداول و الزامات فرم رسمی وزارت بهداشت

- **صفحه ۱**: مشخصات فردی (جدول ۱)، سوابق شغلی (جدول ۲)، ارزیابی عوامل زیان‌آور ۵گانه فیزیکی، شیمیایی، بیولوژیک، ارگونومیک و روانی HSE (جدول ۳).
- **صفحه ۲**: ۱۶ سؤال خوداظهاری پزشکی شاغل (جدول ۴)، کادر امضا و اثر انگشت، علائم حیاتی و معاینات اولیه ارگان‌های عمومی، چشم، پوست، گوش و حلق (جدول ۵).
- **صفحه ۳**: ادامه معاینات بالینی ریه، قلب و عروق، شکم و لگن، کلیه و مجاری، اسکلتی-عضلانی، سیستم عصبی، اعصاب و روان و مشخصات پزشک معاینه‌کننده.
- **صفحه ۴**: نتایج آزمایشگاه CBC، ادرار و بیوشیمی (جدول ۶)، اپتومتری، اودیومتری ۸ فرکانس و اسپیرومتری با تفسیر الگوها (جدول ۷).
- **صفحه ۵**: گرافی CXR و نوار قلب ECG، ثبت مشاوره‌ها و ارجاعات تخصصی (جدول ۸)، **نظریه نهایی پزشک متخصص طب کار (بلامانع، مشروط، عدم صلاحیت) و قفل قطعی پرونده (جدول ۹)**.
