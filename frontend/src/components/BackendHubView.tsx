import React, { useState } from 'react';
import {
  Terminal,
  Server,
  Database,
  Layers,
  Key,
  Play,
  CheckCircle2,
  Copy,
  Download,
  Code2,
  GitBranch,
  ShieldCheck,
  Cpu,
} from 'lucide-react';

export const BackendHubView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'docker' | 'django' | 'jwt-api' | 'github'>('architecture');
  const [copiedCode, setCopiedCode] = useState(false);

  // Live JWT & API simulator state
  const [apiEndpoint, setApiEndpoint] = useState('/api/v1/auth/login/');
  const [apiMethod, setApiMethod] = useState<'POST' | 'GET'>('POST');
  const [apiRole, setApiRole] = useState('doctor');
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [isLoadingApi, setIsLoadingApi] = useState(false);

  const handleRunApiTest = () => {
    setIsLoadingApi(true);
    setTimeout(() => {
      if (apiEndpoint === '/api/v1/auth/login/') {
        const dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzg1ODAwMDAwLCJqdGkiOiJmY2EzNGQ5OCIsInVzZXJfaWQiOjE0MiwiZW1haWwiOiJkb2N0b3JAb2hpcy5pciIsInJvbGUiOiJkb2N0b3IiLCJ0ZW5hbnRfaWQiOiJjdXN0b20tY2VudGVyLTAxIn0.bA8eF349V_dummySigOHIS';
        setApiResponse({
          status: 200,
          statusText: 'OK',
          data: {
            access: dummyToken,
            refresh: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTgwMTYwMDAwMCwidXNlcl9pZCI6MTQyfQ.dummyRefreshToken',
            user: {
              id: 142,
              username: 'dr_sadeghi',
              fullName: 'دکتر محمدرضا صادقی',
              role: apiRole,
              medicalCouncilCode: '54218',
              tenant: 'مرکز طب کار سلامت البرز',
            },
            claims: {
              iss: 'https://ohis.ir',
              role: apiRole,
              permissions: ['clinical.view', 'clinical.examine', 'clinical.refer', 'clinical.lock'],
            },
          },
        });
      } else if (apiEndpoint === '/api/v1/dossiers/OHIS-1405-9A2B/') {
        setApiResponse({
          status: 200,
          statusText: 'OK',
          data: {
            dossier_number: 'OHIS-1405-9A2B',
            national_id: '0012345678',
            examinee_name: 'حسن کریمی',
            company: 'صنایع فلزی البرز',
            status: 'DOCTOR_REVIEW',
            is_locked: false,
            cache_hit: true,
            cache_driver: 'Redis 7.2 (DB 1)',
            audit_trail_count: 14,
          },
        });
      } else if (apiEndpoint === '/api/v1/clinical/lock-dossier/') {
        setApiResponse({
          status: 200,
          statusText: 'OK',
          data: {
            success: true,
            message: 'پرونده پزشکی شاغل با موفقیت قفل گردید و هش دیجیتال آن ثبت شد.',
            dossier_hash: 'sha256-e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
            locked_at: new Date().toISOString(),
            signed_by: 'دکتر محمدرضا صادقی',
            celery_task_id: 'task-celery-pdf-gen-883a21',
            status: 'COMPLETED_LOCKED',
          },
        });
      }
      setIsLoadingApi(false);
    }, 450);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-l from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-lg border border-indigo-900/50">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-indigo-500/20 text-indigo-300 text-xs px-3 py-1 rounded-full font-bold border border-indigo-500/30">
              <Terminal className="w-3.5 h-3.5" />
              <span>معماری بک‌اند، داکر و زیرساخت Enterprise</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              Django REST + PostgreSQL + Redis + Celery + Docker Architecture Hub
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              پیاده‌سازی دقیق نیازمندی‌های درخواستی: احراز هویت بدون وضعیت با JWT، معماری ماژولار Modular Monolith در جنگو، پایگاه داده رابطه‌ای PostgreSQL، صف تسک‌های غیرهمزمان با Celery و کشینگ سریع با Redis.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('jwt-api')}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-bold shadow transition flex items-center gap-1.5"
            >
              <Key className="w-4 h-4" />
              <span>تست زنده REST API & JWT</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl p-2 border border-slate-200 shadow-xs flex flex-wrap gap-1 text-xs font-bold">
        {[
          { id: 'architecture', label: 'معماری و کامپوننت‌ها', icon: Layers },
          { id: 'docker', label: 'داکر و Docker Compose', icon: Server },
          { id: 'django', label: 'کدهای بک‌اند جنگو (Models & Views)', icon: Code2 },
          { id: 'jwt-api', label: 'کنسول شبیه‌ساز JWT & REST API', icon: Play },
          { id: 'github', label: 'راهنمای استقرار و گیت‌هاب', icon: GitBranch },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: ARCHITECTURE DIAGRAM */}
      {activeTab === 'architecture' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-600" />
              <span>طراحی لایه‌ای سامانه (Clean Modular Monolith Architecture)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2">
                <span className="font-extrabold text-blue-900 block text-sm">۱. لایه کلاینت (Frontend)</span>
                <p className="text-slate-700">React 19 + TypeScript + Tailwind CSS</p>
                <ul className="space-y-1 text-slate-600 list-disc list-inside text-[11px]">
                  <li>رابط کاربری کاملاً راست‌چین (RTL)</li>
                  <li>فرم رسمی ۵ صفحه‌ای وزارت بهداشت</li>
                  <li>کلاینت احراز هویت با JWT</li>
                  <li>مدیریت State با معماری Domain-driven</li>
                </ul>
              </div>

              <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-2">
                <span className="font-extrabold text-indigo-900 block text-sm">۲. سرور API (Backend)</span>
                <p className="text-slate-700">Django 5 + Django REST Framework</p>
                <ul className="space-y-1 text-slate-600 list-disc list-inside text-[11px]">
                  <li>احراز هویت بدون وضعیت با SimpleJWT</li>
                  <li>موتور مجوزهای RBAC و Center Isolation</li>
                  <li>فرآیند قفل غیرقابل بازگشت پرونده بالینی</li>
                  <li>ردپای حسابرسی تغییرات (Audit Log)</li>
                </ul>
              </div>

              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
                <span className="font-extrabold text-emerald-900 block text-sm">۳. پایگاه داده (Data Store)</span>
                <p className="text-slate-700">PostgreSQL 16</p>
                <ul className="space-y-1 text-slate-600 list-disc list-inside text-[11px]">
                  <li>مدل‌های تفکیک‌شده جداول ۱ تا ۹</li>
                  <li>شناسه‌های امن UUID و ایندکس‌های کد ملی</li>
                  <li>یکپارچگی تراکنشی (ACID Compliance)</li>
                  <li>قیدهای یکتایی و روابط چندمستأجری</li>
                </ul>
              </div>

              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
                <span className="font-extrabold text-amber-900 block text-sm">۴. صف و کش (Queue & Cache)</span>
                <p className="text-slate-700">Redis 7 + Celery Worker & Beat</p>
                <ul className="space-y-1 text-slate-600 list-disc list-inside text-[11px]">
                  <li>صف ارسال پیامک‌های OTP و نوبت‌دهی</li>
                  <li>تولید پس‌زمینه PDFهای سنگین ۵ صفحه‌ای</li>
                  <li>کشینگ کوئری‌های تکراری قراردادها</li>
                  <li>مدیریت Session و Rate Limit</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DOCKER COMPOSE */}
      {activeTab === 'docker' && (
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Server className="w-5 h-5 text-indigo-600" />
              <span>فایل آماده اجرای داکر (docker-compose.yml)</span>
            </h3>
            <button
              onClick={() => copyToClipboard(DOCKER_COMPOSE_PREVIEW)}
              className="flex items-center gap-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg font-bold transition"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedCode ? 'کپی شد!' : 'کپی کد Docker'}</span>
            </button>
          </div>

          <pre className="bg-slate-950 text-slate-200 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-[460px] dir-ltr text-left">
            <code>{DOCKER_COMPOSE_PREVIEW}</code>
          </pre>
        </div>
      )}

      {/* TAB 3: DJANGO CODE */}
      {activeTab === 'django' && (
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Code2 className="w-5 h-5 text-indigo-600" />
              <span>کدهای ماژول بالینی جنگو (backend/apps/clinical/models.py & views.py)</span>
            </h3>
            <button
              onClick={() => copyToClipboard(DJANGO_CODE_PREVIEW)}
              className="flex items-center gap-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg font-bold transition"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedCode ? 'کپی شد!' : 'کپی کد جنگو'}</span>
            </button>
          </div>

          <pre className="bg-slate-950 text-emerald-400 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-[460px] dir-ltr text-left">
            <code>{DJANGO_CODE_PREVIEW}</code>
          </pre>
        </div>
      )}

      {/* TAB 4: LIVE JWT & REST API TESTER */}
      {activeTab === 'jwt-api' && (
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2 flex items-center gap-2">
            <Play className="w-5 h-5 text-indigo-600" />
            <span>کنسول اجرای زنده و آزمایش اندپوینت‌های REST API و توکن JWT</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">انتخاب اندپوینت API</label>
              <select
                value={apiEndpoint}
                onChange={(e) => setApiEndpoint(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2 font-mono"
              >
                <option value="/api/v1/auth/login/">POST /api/v1/auth/login/ (احراز هویت و صدور JWT)</option>
                <option value="/api/v1/dossiers/OHIS-1405-9A2B/">GET /api/v1/dossiers/OHIS-1405-9A2B/ (استعلام پرونده و کش)</option>
                <option value="/api/v1/clinical/lock-dossier/">POST /api/v1/clinical/lock-dossier/ (قفل قطعی پرونده)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">نقش ارسال‌کننده (Role Claim)</label>
              <select
                value={apiRole}
                onChange={(e) => setApiRole(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2 font-bold"
              >
                <option value="doctor">پزشک متخصص طب کار (Doctor)</option>
                <option value="reception">پذیرش (Reception)</option>
                <option value="lab">تکنسین آزمایشگاه (Lab)</option>
                <option value="hse">کارشناس HSE</option>
                <option value="superadmin">مدیر پلتفرم (SuperAdmin)</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleRunApiTest}
                disabled={isLoadingApi}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg font-bold transition flex items-center justify-center gap-2 shadow"
              >
                <Play className="w-4 h-4" />
                <span>{isLoadingApi ? 'در حال ارسال درخواست...' : 'ارسال درخواست به بک‌اند'}</span>
              </button>
            </div>
          </div>

          {/* Response Box */}
          {apiResponse && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">پاسخ دریافتی (JSON Response):</span>
                <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-bold">
                  HTTP 200 OK
                </span>
              </div>
              <pre className="bg-slate-950 text-slate-200 p-4 rounded-xl text-xs font-mono overflow-x-auto dir-ltr text-left">
                <code>{JSON.stringify(apiResponse, null, 2)}</code>
              </pre>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: GITHUB INSTRUCTIONS */}
      {activeTab === 'github' && (
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2 flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-indigo-600" />
            <span>دستورات بارگذاری در گیت‌هاب و اجرای یک‌خطی با داکر</span>
          </h3>

          <div className="space-y-3">
            <p className="text-slate-700 leading-relaxed">
              این ریپازیتوری کاملاً آماده است و به عنوان یک <strong>Monorepo</strong> ساختاریافته شامل بک‌اند جنگو، فرانت‌اند ری‌اکت، داکر، ردیس و پستگرس طراحی شده است. به محض ارسال لینک ریپازیتوری گیت‌هاب توسط شما، دستورات زیر پروژه را فوراً Push و مستقر می‌کنند:
            </p>

            <div className="bg-slate-950 text-emerald-400 p-4 rounded-xl font-mono dir-ltr text-left space-y-2">
              <div># ۱. راه‌اندازی سریع محیط کامل با Docker Compose</div>
              <div className="text-white">docker compose up --build -d</div>
              <div className="text-slate-400"># بک‌اند روی پورت 8000، فرانت‌اند روی پورت 3000 و پایگاه‌داده روی 5432 بالا می‌آید</div>
              <div className="pt-2"># ۲. اجرای مایگریشن‌های اولیه پایگاه‌داده پستگرس</div>
              <div className="text-white">docker compose exec backend python manage.py migrate</div>
              <div className="pt-2"># ۳. بارگذاری پروژه به گیت‌هاب شما</div>
              <div className="text-white">git init</div>
              <div className="text-white">git remote add origin https://github.com/YOUR_USERNAME/OHIS.git</div>
              <div className="text-white">git add .</div>
              <div className="text-white">git commit -m "feat(core): initial production release of OHIS with Django, React, Postgres, Redis, and Celery"</div>
              <div className="text-white">git branch -M main</div>
              <div className="text-white">git push -u origin main</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DOCKER_COMPOSE_PREVIEW = `version: '3.9'

services:
  postgres:
    image: postgres:16-alpine
    container_name: ohis_postgres
    restart: always
    environment:
      POSTGRES_DB: \${POSTGRES_DB:-ohis_db}
      POSTGRES_USER: \${POSTGRES_USER:-ohis_admin}
      POSTGRES_PASSWORD: \${POSTGRES_PASSWORD:-secure_ohis_secret_2026}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U \${POSTGRES_USER:-ohis_admin} -d \${POSTGRES_DB:-ohis_db}"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7.2-alpine
    container_name: ohis_redis
    restart: always
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: ohis_django_backend
    restart: always
    command: >
      sh -c "python manage.py migrate &&
             gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 4 --threads 2"
    environment:
      - DJANGO_SETTINGS_MODULE=config.settings.production
      - SECRET_KEY=\${DJANGO_SECRET_KEY:-django-insecure-ohis-prod-key-2026}
      - DB_NAME=\${POSTGRES_DB:-ohis_db}
      - DB_USER=\${POSTGRES_USER:-ohis_admin}
      - DB_PASSWORD=\${POSTGRES_PASSWORD:-secure_ohis_secret_2026}
      - DB_HOST=postgres
      - DB_PORT=5432
      - REDIS_URL=redis://redis:6379/1
      - CELERY_BROKER_URL=redis://redis:6379/0
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_started
    ports:
      - "8000:8000"

  celery_worker:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: ohis_celery_worker
    restart: always
    command: celery -A config worker -l info -c 4
    environment:
      - DJANGO_SETTINGS_MODULE=config.settings.production
      - DB_HOST=postgres
      - REDIS_URL=redis://redis:6379/1
      - CELERY_BROKER_URL=redis://redis:6379/0
    depends_on:
      - backend
      - redis

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: ohis_react_frontend
    restart: always
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  postgres_data:
  redis_data:
`;

const DJANGO_CODE_PREVIEW = `"""
OHIS Clinical Domain Models & REST API Views
Django 5 + Django REST Framework + SimpleJWT
"""
from django.db import models
from django.core.exceptions import ValidationError
import uuid

class DossierStatus(models.TextChoices):
    RECEPTION = 'RECEPTION', 'پذیرش'
    LAB_PENDING = 'LAB_PENDING', 'در انتظار آزمایشگاه'
    PARACLINIC_PENDING = 'PARACLINIC_PENDING', 'در انتظار پاراکلینیک'
    HSE_PENDING = 'HSE_PENDING', 'در انتظار بهداشت حرفه‌ای'
    DOCTOR_REVIEW = 'DOCTOR_REVIEW', 'در انتظار پزشک طب کار'
    COMPLETED_LOCKED = 'COMPLETED_LOCKED', 'تکمیل و قفل قطعی'

class MedicalRecord(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    dossier_number = models.CharField(max_length=32, unique=True, db_index=True)
    national_id = models.CharField(max_length=10, db_index=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    status = models.CharField(max_length=32, choices=DossierStatus.choices, default=DossierStatus.RECEPTION)
    is_locked = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def lock_record(self, doctor_opinion, recommendations, doctor_user):
        # Strict clinical guard: Cannot lock if pending referrals exist!
        if self.referrals.filter(status='PENDING').exists():
            raise ValidationError("نظریه نهایی منوط به تعیین تکلیف ارجاعات تخصصی است.")
        self.is_locked = True
        self.status = DossierStatus.COMPLETED_LOCKED
        self.save()
        # Trigger Celery async task for official 5-page PDF generation
        from .tasks import generate_official_dossier_pdf
        generate_official_dossier_pdf.delay(str(self.id))
`;
