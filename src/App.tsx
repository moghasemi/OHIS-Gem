import React, { useState } from 'react';
import { UserRole } from './domain/rules.ts';
import { Patient } from './types/index.ts';
import { INITIAL_PATIENTS } from './data/mockData.ts';
import { Header } from './components/Header.tsx';
import { Sidebar } from './components/Sidebar.tsx';
import { DashboardView } from './components/DashboardView.tsx';
import { ReceptionView } from './components/ReceptionView.tsx';
import { LabView } from './components/LabView.tsx';
import { ParaclinicView } from './components/ParaclinicView.tsx';
import { HSEView } from './components/HSEView.tsx';
import { DoctorView } from './components/DoctorView.tsx';
import { OfficialFormPrint } from './components/OfficialFormPrint.tsx';
import { OrgPortalView } from './components/OrgPortalView.tsx';
import { PatientPortalView } from './components/PatientPortalView.tsx';
import { FinanceView } from './components/FinanceView.tsx';
import { TicketsView } from './components/TicketsView.tsx';
import { CalendarView } from './components/CalendarView.tsx';
import { RoleMatrixView } from './components/RoleMatrixView.tsx';
import { BackendHubView } from './components/BackendHubView.tsx';
import { SettingsView } from './components/SettingsView.tsx';
import { StaffManagementView } from './components/StaffManagementView.tsx';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('clinic_admin');
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [selectedPatient, setSelectedPatient] = useState<Patient>(INITIAL_PATIENTS[0]);

  const handleUpdatePatient = (updated: Patient) => {
    setPatients((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    if (selectedPatient.id === updated.id) {
      setSelectedPatient(updated);
    }
  };

  const handleAddPatient = (newPatient: Patient) => {
    setPatients((prev) => [newPatient, ...prev]);
    setSelectedPatient(newPatient);
  };

  const handleOpenOfficialForm = (patientToOpen?: Patient) => {
    if (patientToOpen) {
      setSelectedPatient(patientToOpen);
    }
    setCurrentTab('official-form');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900" dir="rtl">
      {/* Top Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={(newRole) => {
          setCurrentRole(newRole);
          // If current tab is restricted, default back to dashboard
          setCurrentTab('dashboard');
        }}
        selectedPatient={selectedPatient}
        patients={patients}
        onSelectPatient={setSelectedPatient}
        onOpenOfficialForm={() => handleOpenOfficialForm(selectedPatient)}
        onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Body with Sidebar + View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          currentRole={currentRole}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {currentTab === 'dashboard' && (
            <DashboardView
              patients={patients}
              onSelectPatient={setSelectedPatient}
              onNavigateTab={setCurrentTab}
              onOpenOfficialForm={handleOpenOfficialForm}
            />
          )}

          {currentTab === 'reception' && (
            <ReceptionView
              patients={patients}
              onAddPatient={handleAddPatient}
              onSelectPatient={setSelectedPatient}
            />
          )}

          {currentTab === 'lab' && (
            <LabView
              patient={selectedPatient}
              onUpdatePatient={handleUpdatePatient}
              onNavigateTab={setCurrentTab}
            />
          )}

          {currentTab === 'para' && (
            <ParaclinicView
              patient={selectedPatient}
              onUpdatePatient={handleUpdatePatient}
              onNavigateTab={setCurrentTab}
            />
          )}

          {currentTab === 'hse' && (
            <HSEView
              patient={selectedPatient}
              onUpdatePatient={handleUpdatePatient}
              onNavigateTab={setCurrentTab}
            />
          )}

          {currentTab === 'doctor' && (
            <DoctorView
              patient={selectedPatient}
              onUpdatePatient={handleUpdatePatient}
              onOpenOfficialForm={handleOpenOfficialForm}
            />
          )}

          {currentTab === 'official-form' && (
            <OfficialFormPrint
              patient={selectedPatient}
              onBack={() => setCurrentTab('dashboard')}
            />
          )}

          {currentTab === 'org' && <OrgPortalView patients={patients} />}

          {currentTab === 'staff' && <StaffManagementView />}

          {currentTab === 'self' && (
            <PatientPortalView
              patient={selectedPatient}
              onOpenOfficialForm={handleOpenOfficialForm}
            />
          )}

          {currentTab === 'finance' && <FinanceView patients={patients} />}

          {currentTab === 'tickets' && <TicketsView />}

          {currentTab === 'calendar' && (
            <CalendarView
              patients={patients}
              onSelectPatient={setSelectedPatient}
              onNavigateTab={setCurrentTab}
            />
          )}

          {currentTab === 'role-matrix' && <RoleMatrixView />}

          {currentTab === 'backend-hub' && <BackendHubView />}

          {currentTab === 'settings' && <SettingsView />}

          {currentTab === 'superadmin' && (
            <div className="space-y-6">
              <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg border border-slate-800">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <span>🔐 پنل مدیریت متمرکز پلتفرم (Platform SuperAdmin)</span>
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  نظارت بر تمام ۲۵ مرکز طب کار متصل، اشتراک‌های سازمانی، تخصیص منابع ابری و پشتیبان‌گیری متمرکز PostgreSQL.
                </p>
              </div>
              <DashboardView
                patients={patients}
                onSelectPatient={setSelectedPatient}
                onNavigateTab={setCurrentTab}
                onOpenOfficialForm={handleOpenOfficialForm}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
