# OHIS — سامانه جامع اطلاعات سلامت شغلی و مراکز طب کار
### (Occupational Health Information System)

سامانه سازمانی، چندمستاجری و ماژولار مدیریت فرآیندهای بهداشت حرفه‌ای و طب کار، پرونده الکترونیک سلامت شاغلین، نوبت‌دهی هوشمند، آزمایشگاه، پاراکلینیک، معاینات بالینی، امور مالی و بازآفرینی کامل فرم ۵ صفحه‌ای پرونده رسمی وزارت بهداشت، درمان و آموزش پزشکی.

---

## 🏗️ معماری سیستم (System Architecture)

پروژه بر پایه اصول **Modular Monolith**، **Clean Architecture**، **DDD-ready** و **Security by Design** پیاده‌سازی شده و از ساختار سازمانی **Monorepo** بهره می‌برد:

```text
OHIS/
├── .github/workflows/ci.yml       # خط لوله آزمون و ممیزی خودکار گیت‌هاب (پین‌شده به Commit SHA)
├── pytest.ini                     # تنظیمات رسمی آزمون‌های سطح سیستم
├── backend/                       # سرویس‌های بک‌اند Django 5.2 LTS + Django REST Framework 3.18
│   ├── manage.py                  # اسکریپت مدیریت اجرایی با بارگذاری dotenv
│   ├── Dockerfile                 # تصویر پایتون ۳.۱۱.۱۸ و پینینگ با constraints
│   ├── config/                    # روتینگ کلان، تنظیمات، WSGI/ASGI و ورودی پردازش Celery
│   │   ├── settings/              # تفکیک محیط‌ها (base, development, testing, staging, production)
│   ├── core/                      # هسته معماری و مدل‌های انتزاعی پایه (TimeStampedModel)
│   ├── common/                    # ابزارهای کاربردی و توابع عمومی مشترک
│   ├── apps/                      # ماژول‌های دامنه‌ای سیستم (clinical, ...)
│   ├── requirements/              # نیازمندی‌های تفکیک‌شده به همراه constraints.txt
│   ├── media/                     # ذخیره‌سازی اسناد و تصاویر با ساختار محافظت‌شده
│   └── static/                    # فایل‌های استاتیک جنگو
├── frontend/                      # کلاینت React 19 + TypeScript + Vite با مدیر بسته Bun
│   ├── src/                       # ماژول‌ها، کامپوننت‌های بالینی، داشبورد و ماتریس دسترسی
│   ├── public/                    # دارایی‌های عمومی و فایل‌های راهنما
│   ├── package.json               # تنها مانیفست وابستگی فرانت‌اند
│   ├── bun.lock                   # فایل قفل وابستگی Bun (منجمد)
│   ├── tsconfig.json              # کانفیگ TypeScript فرانت‌اند
│   └── vite.config.ts             # کانفیگ بیلد Vite
├── infrastructure/                # زیرساخت و تمپلیت‌های پایه
├── deployment/                    # مانیفست‌ها و نمونه کانفیگ‌های استقرار
│   └── docker-compose.override.yml.example
├── docs/architecture/             # مستندات معماری و ماتریس متغیرهای محیطی
├── tools/                         # اسکنر جامع اسرار با آزمون خودکار مثبت و منفی
└── tests/integration/             # آزمون‌های سطح سیستم و اثبات سلامت زنده دیتابیس و ردیس
```

### مؤلفه‌های کلیدی فناوری:
1. **بک‌اند:** Python 3.11.18 + Django 5.2 LTS + DRF 3.18.1 + SimpleJWT
2. **فرانت‌اند:** React 19 + TypeScript + Tailwind CSS (راست‌چین و وزیرمتن) با مدیر بسته Bun 1.4+
3. **پایگاه داده:** PostgreSQL 16 (تراکنش‌های بالینی و پرسنلی)
4. **کشینگ و صف پیام:** Redis 7 (مدیریت نشست‌ها و کارتابل‌ها)
5. **پردازش‌های پس‌زمینه:** Celery Worker & Beat
6. **محیط اجرا و استقرار:** Docker & Docker Compose ایزوله فاقد مقادیر پیش‌فرض محرمانه

---

## 🚀 راهنمای سریع راه‌اندازی (Getting Started)

### ۱. راه‌اندازی با Docker Compose (محیط عملیاتی و کانتینری):

```bash
# ایجاد فایل متغیرهای محیطی از روی نمونه امن
cp .env.example .env

# ویرایش و تنظیم مقادیر واقعی SECRET_KEY و گذرواژه‌های دیتابیس
nano .env

# ساخت و اجرای سرویس‌های Postgres, Redis, Celery و Django Backend
docker compose up --build -d

# اجرای مایگریشن‌های پایگاه داده و بارگذاری استاتیک
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py collectstatic --noinput

# ایجاد کاربر ادمین سامانه
docker compose exec backend python manage.py createsuperuser
```

### ۲. راه‌اندازی محلی فرانت‌اند با Bun:

```bash
cd frontend

# نصب وابستگی‌ها با رعایت دقیق Lockfile
bun install --frozen-lockfile

# اعتبارسنجی Type-check
bun run typecheck

# اجرای سرور توسعه
bun run dev
```

---

## 🧪 اجرای آزمون‌ها و اعتبارسنجی کیفی (Testing & Quality Gates)

```bash
# اجرای آزمون‌های یکپارچگی سطح سیستم با اتصال زنده به دیتابیس و ردیس
PYTHONPATH=backend pytest tests/integration/ -v

# اجرای اسکنر جامع اسرار بر روی کل مخزن و تمام تاریخچه Git
python tools/secret_scanner.py --all-refs

# اجرای آزمون‌های خودکار مثبت و منفی اسکنر اسرار
PYTHONPATH=tools python tools/test_secret_scanner.py
```

---

## 🔒 خط‌مشی امنیت و حفظ حریم خصوصی (Security by Design)

- **عدم نشت اسرار:** هیچ کلید محرمانه، پسورد یا توکن واقعی در مخزن گیت ذخیره نمی‌شود.
- **تأییدیه محیط تولید:** در محیط‌های Staging و Production، در صورت عدم تعریف متغیر `SECRET_KEY` در محیط، سیستم با خطای صریح `ImproperlyConfigured` از بالا آمدن ناامن سرویس ممانعت می‌نماید.
- **ایزوله‌سازی خط لوله CI:** در GitHub Actions، از توکن موقت با حداقل اختیارات (`contents: read`) و اکشن‌های پین‌شده به Commit SHA تغییرناپذیر استفاده می‌شود.
