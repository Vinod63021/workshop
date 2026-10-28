'use client';

import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Eye,
  Loader2,
  RefreshCw,
  XCircle,
  Tag,
  Building,
  Calendar,
} from 'lucide-react';
import {
  ALLOWED_SOURCES,
  GRADUATION_YEARS,
  PaginatedStudents,
  Registration,
  SourceCategory,
} from '@/lib/types';
import { formatDateIndian } from '@/lib/utils';
import StudentDetailModal from './StudentDetailModal';

interface StudentTableProps {
  data: PaginatedStudents | null;
  loading: boolean;
  search: string;
  onSearchChange: (val: string) => void;
  graduationYear: string;
  onGraduationYearChange: (val: string) => void;
  source: string;
  onSourceChange: (val: string) => void;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSortChange: (field: string) => void;
  page: number;
  limit: number;
  onPageChange: (newPage: number) => void;
  onLimitChange: (newLimit: number) => void;
  onRefresh: () => void;
}

export default function StudentTable({
  data,
  loading,
  search,
  onSearchChange,
  graduationYear,
  onGraduationYearChange,
  source,
  onSourceChange,
  sortBy,
  sortOrder,
  onSortChange,
  page,
  limit,
  onPageChange,
  onLimitChange,
  onRefresh,
}: StudentTableProps) {
  const [selectedStudent, setSelectedStudent] = useState<Registration | null>(null);
  const [exporting, setExporting] = useState(false);

  const handleExportCsv = async () => {
    setExporting(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (graduationYear && graduationYear !== 'all') params.set('graduation_year', graduationYear);
      if (source && source !== 'all') params.set('source', source);

      const url = `/api/admin/export?${params.toString()}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Export failed');

      const blob = await res.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      const today = new Date().toISOString().split('T')[0];
      a.download = `buildsprint_registrations_${today}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error('Export error:', err);
    } finally {
      setExporting(false);
    }
  };

  const clearFilters = () => {
    onSearchChange('');
    onGraduationYearChange('all');
    onSourceChange('all');
  };

  const hasActiveFilters = Boolean(search || (graduationYear && graduationYear !== 'all') || (source && source !== 'all'));

  return (
    <div className="rounded-2xl bg-[#0B0F19] border border-indigo-500/20 p-6 shadow-xl space-y-5">
      {/* Table Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white">Student Registration Records</h3>
            {data && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 font-mono border border-indigo-500/20">
                {data.total} Total
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Search, filter, inspect details, and export verified registrations
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onRefresh}
            disabled={loading}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
            title="Refresh Table Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleExportCsv}
            disabled={exporting || loading}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/25 transition-all disabled:opacity-50"
          >
            {exporting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
        {/* Search Input */}
        <div className="lg:col-span-5 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search name, email, college, referral code..."
            className="w-full bg-[#080C14] border border-slate-800 focus:border-indigo-500 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Filter Graduation Year */}
        <div className="lg:col-span-3">
          <select
            value={graduationYear}
            onChange={(e) => onGraduationYearChange(e.target.value)}
            className="w-full bg-[#080C14] border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none transition-colors"
          >
            <option value="all">Graduation Year: All</option>
            {GRADUATION_YEARS.map((y) => (
              <option key={y} value={y}>
                Class of {y} {y === 2025 ? '(Final Year)' : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Filter Source */}
        <div className="lg:col-span-4">
          <select
            value={source}
            onChange={(e) => onSourceChange(e.target.value)}
            className="w-full bg-[#080C14] border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none transition-colors capitalize"
          >
            <option value="all">Acquisition Source: All</option>
            {ALLOWED_SOURCES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active filter reset notice */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-indigo-950/30 border border-indigo-500/20 text-xs">
          <span className="text-indigo-200">
            Active filters applied. Showing matching records.
          </span>
          <button
            onClick={clearFilters}
            className="text-xs text-indigo-300 hover:text-white underline font-semibold flex items-center gap-1"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

      {/* Main Students Data Table */}
      <div className="overflow-x-auto border border-slate-800/80 rounded-xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-[#0E1422] border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider">
            <tr>
              <th
                onClick={() => onSortChange('full_name')}
                className="py-3 px-3 cursor-pointer hover:text-white"
              >
                <div className="flex items-center gap-1">
                  <span>Student Name</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-3">Email Address</th>
              <th
                onClick={() => onSortChange('college')}
                className="py-3 px-3 cursor-pointer hover:text-white"
              >
                <div className="flex items-center gap-1">
                  <span>College / Branch</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-3 text-center">Batch Year</th>
              <th className="py-3 px-3">Acquisition Source</th>
              <th className="py-3 px-3">Referral Code</th>
              <th
                onClick={() => onSortChange('created_at')}
                className="py-3 px-3 cursor-pointer hover:text-white"
              >
                <div className="flex items-center gap-1">
                  <span>Registered At</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/60 bg-[#0B0F19]">
            {loading ? (
              // Loading Skeleton
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Loader2 className="w-6 h-6 animate-spin text-indigo-400" />
                    <span className="text-xs">Loading registration records...</span>
                  </div>
                </td>
              </tr>
            ) : !data || data.students.length === 0 ? (
              // Empty or No Results State
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-400">
                  <div className="max-w-sm mx-auto space-y-2">
                    <p className="text-sm font-semibold text-white">No registrations found</p>
                    <p className="text-xs text-slate-500">
                      {hasActiveFilters
                        ? 'Try modifying your search or filter settings.'
                        : 'No student registrations recorded yet.'}
                    </p>
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="mt-2 text-xs text-indigo-400 hover:text-indigo-300 font-semibold underline"
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              // Rows
              data.students.map((student) => {
                return (
                  <tr
                    key={student.id}
                    className="hover:bg-slate-900/50 transition-colors group"
                  >
                    {/* Name + Live/Demo Badge */}
                    <td className="py-3 px-3 font-medium text-white whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span>{student.full_name}</span>
                        {student.is_demo ? (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                            Demo Seed
                          </span>
                        ) : (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            Live Submission
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-3 px-3 text-slate-300 font-mono text-[11px]">
                      {student.email}
                    </td>

                    {/* College & Branch */}
                    <td className="py-3 px-3 max-w-xs">
                      <div className="text-white truncate" title={student.college}>
                        {student.college}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate" title={student.branch}>
                        {student.branch}
                      </div>
                    </td>

                    {/* Graduation Year */}
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <span className="font-mono text-slate-300 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                        {student.graduation_year}
                      </span>
                    </td>

                    {/* Source */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-950/60 text-indigo-300 border border-indigo-500/20 capitalize">
                        {student.source}
                      </span>
                    </td>

                    {/* Referral Code */}
                    <td className="py-3 px-3 whitespace-nowrap font-mono text-[11px] text-cyan-300">
                      {student.referral_code}
                      {student.referred_by_code && (
                        <div className="text-[9px] text-slate-500">
                          Ref by: {student.referred_by_code}
                        </div>
                      )}
                    </td>

                    {/* Registration Time */}
                    <td className="py-3 px-3 text-slate-400 whitespace-nowrap text-[11px]">
                      {formatDateIndian(student.created_at)}
                    </td>

                    {/* View Action */}
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-300 hover:bg-slate-800 transition-colors"
                        title="View Full Student Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer Bar */}
      {data && data.total_pages > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-slate-800 gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span>
              Showing {Math.min((page - 1) * limit + 1, data.total)} to{' '}
              {Math.min(page * limit, data.total)} of {data.total} students
            </span>

            {/* Limit selector */}
            <select
              value={limit}
              onChange={(e) => onLimitChange(Number(e.target.value))}
              className="bg-[#080C14] border border-slate-800 rounded px-2 py-1 text-slate-300 focus:outline-none"
            >
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-200">
              Page {page} of {data.total_pages}
            </span>
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= data.total_pages}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Student Detail Modal */}
      {selectedStudent && (
        <StudentDetailModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}

