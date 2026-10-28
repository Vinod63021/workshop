'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  BarChart3,
  Users,
  IndianRupee,
  Loader2,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { AdminMetrics, BudgetChannel, PaginatedStudents } from '@/lib/types';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminLogin from '@/components/admin/AdminLogin';
import MetricsOverview from '@/components/admin/MetricsOverview';
import SourceChart from '@/components/admin/SourceChart';
import TimelineChart from '@/components/admin/TimelineChart';
import AmbassadorLeaderboard from '@/components/admin/AmbassadorLeaderboard';
import StudentTable from '@/components/admin/StudentTable';
import BudgetTracker from '@/components/admin/BudgetTracker';
import DemoModeModal from '@/components/admin/DemoModeModal';
import { formatDateIndian } from '@/lib/utils';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [adminEmail, setAdminEmail] = useState<string>('');
  const [mode, setMode] = useState<'supabase' | 'demo'>('demo');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'budget'>('overview');

  // Data States
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [budgetChannels, setBudgetChannels] = useState<BudgetChannel[]>([]);
  const [studentsData, setStudentsData] = useState<PaginatedStudents | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [studentsLoading, setStudentsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Student Filter & Search States
  const [search, setSearch] = useState('');
  const [graduationYear, setGraduationYear] = useState('all');
  const [source, setSource] = useState('all');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  // Modals
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // 1. Check Session on Mount
  const checkSession = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/me');
      const data = await res.json();
      if (res.ok && data.isAdmin) {
        setIsAuthenticated(true);
        setAdminEmail(data.email || 'admin@buildsprint.ai');
        setMode(data.mode || 'demo');
      } else {
        setIsAuthenticated(false);
        setMode(data.mode || 'demo');
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  // 2. Fetch Metrics & Budget
  const fetchMetricsAndBudget = useCallback(async () => {
    try {
      const [mRes, bRes] = await Promise.all([
        fetch('/api/admin/metrics'),
        fetch('/api/admin/budget'),
      ]);

      if (mRes.ok) {
        const mData = await mRes.json();
        if (mData.success) setMetrics(mData.metrics);
      }

      if (bRes.ok) {
        const bData = await bRes.json();
        if (bData.success) setBudgetChannels(bData.channels);
      }
    } catch (err: unknown) {
      console.error('Failed to load metrics:', err);
    }
  }, []);

  // 3. Fetch Students with current filters & pagination
  const fetchStudents = useCallback(async () => {
    setStudentsLoading(true);
    try {
      const params = new URLSearchParams({
        search,
        graduation_year: graduationYear,
        source,
        sort_by: sortBy,
        sort_order: sortOrder,
        page: String(page),
        limit: String(limit),
      });

      const res = await fetch(`/api/admin/students?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setStudentsData(data);
        }
      }
    } catch (err) {
      console.error('Failed to load students:', err);
    } finally {
      setStudentsLoading(false);
    }
  }, [search, graduationYear, source, sortBy, sortOrder, page, limit]);

  // Trigger data fetches when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchMetricsAndBudget();
      fetchStudents();
    }
  }, [isAuthenticated, fetchMetricsAndBudget, fetchStudents]);

  // Handlers
  const handleLoginSuccess = (user: { email: string; role: string }, userMode: 'supabase' | 'demo') => {
    setIsAuthenticated(true);
    setAdminEmail(user.email);
    setMode(userMode);
    fetchMetricsAndBudget();
    fetchStudents();
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsAuthenticated(false);
  };

  const handleUpdateBudgetChannel = async (id: string, updates: Partial<BudgetChannel>) => {
    try {
      const res = await fetch('/api/admin/budget', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setBudgetChannels(data.channels);
          fetchMetricsAndBudget(); // Recalculate summary metrics
        }
      }
    } catch (err) {
      console.error('Failed to update channel:', err);
    }
  };

  const handleResetDemoData = async () => {
    if (!confirm('Reset simulation data back to initial seed records?')) return;
    setIsResetting(true);
    try {
      const res = await fetch('/api/admin/reset', { method: 'POST' });
      if (res.ok) {
        await Promise.all([fetchMetricsAndBudget(), fetchStudents()]);
      }
    } catch (err) {
      console.error('Reset error:', err);
    } finally {
      setIsResetting(false);
    }
  };

  const handleSortChange = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  // If initial auth check is running
  if (loading || isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#F8FAFD] dark:bg-[#080C14] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-500 dark:text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 dark:text-indigo-500" />
          <span className="text-sm">Verifying administrator authorization...</span>
        </div>
      </div>
    );
  }

  // If not authenticated, render Login Form
  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} mode={mode} />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFD] dark:bg-[#080C14] text-slate-800 dark:text-slate-100 flex flex-col transition-colors duration-200">
      {/* Header */}
      <AdminHeader
        adminEmail={adminEmail}
        mode={mode}
        onLogout={handleLogout}
        onOpenDemoModal={() => setShowDemoModal(true)}
        onResetDemoData={handleResetDemoData}
        isResetting={isResetting}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Portal Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>500-Target &amp; Growth Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('students')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all whitespace-nowrap ${
                activeTab === 'students'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Student Registrations</span>
              {metrics && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 text-white">
                  {metrics.total_registrations}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('budget')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all whitespace-nowrap ${
                activeTab === 'budget'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <IndianRupee className="w-4 h-4" />
              <span>₹2,000 Budget &amp; CPR</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && metrics && (
          <div className="space-y-8 animate-fade-in">
            {/* KPI Cards */}
            <MetricsOverview metrics={metrics} />

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7">
                <TimelineChart
                  timeline={metrics.timeline}
                  totalGoal={metrics.target_goal}
                />
              </div>
              <div className="lg:col-span-5">
                <SourceChart
                  sources={metrics.sources}
                  total={metrics.total_registrations}
                />
              </div>
            </div>

            {/* Ambassadors & Recent Registrations Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6">
                <AmbassadorLeaderboard ambassadors={metrics.top_ambassadors} />
              </div>

              {/* Recent Registrations Feed */}
              <div className="lg:col-span-6 rounded-2xl bg-[#0B0F19] border border-indigo-500/20 p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-400" />
                    <span>Recent Student Registrations</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('students')}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                  >
                    View All →
                  </button>
                </div>

                <div className="space-y-2.5">
                  {metrics.recent_registrations.map((student) => (
                    <div
                      key={student.id}
                      className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center justify-between text-xs"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white truncate">
                            {student.full_name}
                          </span>
                          <span className="text-[10px] text-indigo-300 bg-indigo-950/60 px-1.5 py-0.2 rounded border border-indigo-500/20">
                            {student.source}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate max-w-xs">
                          {student.college} • Class of {student.graduation_year}
                        </p>
                      </div>

                      <span className="text-[11px] text-slate-500 shrink-0 font-mono">
                        {formatDateIndian(student.created_at)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Students Management */}
        {activeTab === 'students' && (
          <div className="animate-fade-in">
            <StudentTable
              data={studentsData}
              loading={studentsLoading}
              search={search}
              onSearchChange={(val) => {
                setSearch(val);
                setPage(1);
              }}
              graduationYear={graduationYear}
              onGraduationYearChange={(val) => {
                setGraduationYear(val);
                setPage(1);
              }}
              source={source}
              onSourceChange={(val) => {
                setSource(val);
                setPage(1);
              }}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={handleSortChange}
              page={page}
              limit={limit}
              onPageChange={setPage}
              onLimitChange={(newLimit) => {
                setLimit(newLimit);
                setPage(1);
              }}
              onRefresh={fetchStudents}
            />
          </div>
        )}

        {/* Tab 3: Budget & Unit Economics */}
        {activeTab === 'budget' && (
          <div className="animate-fade-in">
            <BudgetTracker
              channels={budgetChannels}
              onUpdateChannel={handleUpdateBudgetChannel}
              totalRegistrations={metrics?.total_registrations || 0}
            />
          </div>
        )}
      </main>

      {/* Database Setup & Demo Modal */}
      {showDemoModal && (
        <DemoModeModal
          mode={mode}
          onClose={() => setShowDemoModal(false)}
          onResetDemoData={handleResetDemoData}
          isResetting={isResetting}
        />
      )}
    </div>
  );
}

