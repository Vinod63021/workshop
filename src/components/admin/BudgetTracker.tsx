'use client';

import React, { useState } from 'react';
import {
  IndianRupee,
  Save,
  Check,
  AlertCircle,
  HelpCircle,
  TrendingDown,
  Edit2,
  Tag,
} from 'lucide-react';
import { BudgetChannel } from '@/lib/types';
import { formatCurrencyINR } from '@/lib/utils';

interface BudgetTrackerProps {
  channels: BudgetChannel[];
  onUpdateChannel: (id: string, updates: Partial<BudgetChannel>) => Promise<void>;
  totalRegistrations: number;
}

export default function BudgetTracker({
  channels,
  onUpdateChannel,
  totalRegistrations,
}: BudgetTrackerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [plannedSpend, setPlannedSpend] = useState<number>(0);
  const [actualSpend, setActualSpend] = useState<number>(0);
  const [notes, setNotes] = useState<string>('');
  const [isAssumption, setIsAssumption] = useState<boolean>(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  const startEdit = (c: BudgetChannel) => {
    setEditingId(c.id);
    setPlannedSpend(c.planned_spend);
    setActualSpend(c.actual_spend);
    setNotes(c.notes);
    setIsAssumption(c.is_assumption);
  };

  const handleSave = async (id: string) => {
    setSaving(true);
    await onUpdateChannel(id, {
      planned_spend: plannedSpend,
      actual_spend: actualSpend,
      notes,
      is_assumption: isAssumption,
    });
    setSaving(false);
    setEditingId(null);
    setSaveSuccess(id);
    setTimeout(() => setSaveSuccess(null), 2500);
  };

  const TOTAL_BUDGET_CAP = 2000;
  const totalPlanned = channels.reduce((sum, c) => sum + Number(c.planned_spend), 0);
  const totalActual = channels.reduce((sum, c) => sum + Number(c.actual_spend), 0);
  const remainingBudget = TOTAL_BUDGET_CAP - totalActual;
  const isOverBudget = totalActual > TOTAL_BUDGET_CAP;
  const blendedCpr = totalRegistrations > 0 ? totalActual / totalRegistrations : null;

  return (
    <div className="rounded-2xl bg-[#0B0F19] border border-indigo-500/20 p-6 shadow-xl space-y-6">
      {/* Header & Budget Cap Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <IndianRupee className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">
              Campaign Budget &amp; Unit Economics Tracker (₹2,000 Budget)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time tracking of planned vs actual spend, channel-level CPR, and assumption vs actual distinction
          </p>
        </div>

        {/* Budget Status Pill */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[11px] text-slate-400 block">Remaining Budget</span>
            <span
              className={`text-sm font-bold font-mono ${
                isOverBudget ? 'text-rose-400' : 'text-emerald-400'
              }`}
            >
              {formatCurrencyINR(remainingBudget)}
            </span>
          </div>
        </div>
      </div>

      {/* Overview Metric Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] text-slate-400 block">Total Budget Cap</span>
          <span className="text-lg font-bold text-white font-mono">
            {formatCurrencyINR(TOTAL_BUDGET_CAP)}
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] text-slate-400 block">Planned Allocation</span>
          <span className="text-lg font-bold text-indigo-300 font-mono">
            {formatCurrencyINR(totalPlanned)}
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] text-slate-400 block">Actual Spend</span>
          <span
            className={`text-lg font-bold font-mono ${
              isOverBudget ? 'text-rose-400' : 'text-emerald-400'
            }`}
          >
            {formatCurrencyINR(totalActual)}
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] text-slate-400 block">Blended CPR (CAC)</span>
          <span className="text-lg font-bold text-cyan-300 font-mono">
            {blendedCpr !== null ? `${formatCurrencyINR(blendedCpr)}/lead` : 'N/A'}
          </span>
        </div>
      </div>

      {/* Budget Over-Spend Warning */}
      {isOverBudget && (
        <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>
            Warning: Actual spend ({formatCurrencyINR(totalActual)}) exceeds the total ₹2,000 budget cap.
          </span>
        </div>
      )}

      {/* Channel-level Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider">
              <th className="py-3 px-3">Growth Channel</th>
              <th className="py-3 px-3">Type</th>
              <th className="py-3 px-3 text-right">Planned (₹)</th>
              <th className="py-3 px-3 text-right">Actual (₹)</th>
              <th className="py-3 px-3 text-right">Registrations</th>
              <th className="py-3 px-3 text-right">CPR (Cost / Reg)</th>
              <th className="py-3 px-3">Notes &amp; Strategy</th>
              <th className="py-3 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {channels.map((c) => {
              const isEditing = editingId === c.id;

              return (
                <tr
                  key={c.id}
                  className="hover:bg-slate-900/40 transition-colors group"
                >
                  {/* Channel Name */}
                  <td className="py-3 px-3 font-medium text-white max-w-xs">
                    <div>{c.channel_name}</div>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Category: {c.category}
                    </span>
                  </td>

                  {/* Assumption vs Actuals Badge */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    {isEditing ? (
                      <select
                        value={isAssumption ? 'true' : 'false'}
                        onChange={(e) => setIsAssumption(e.target.value === 'true')}
                        className="bg-slate-900 border border-slate-700 text-xs text-white rounded px-2 py-1"
                      >
                        <option value="false">Verified Actual</option>
                        <option value="true">Assumption</option>
                      </select>
                    ) : (
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                          c.is_assumption
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        }`}
                      >
                        {c.is_assumption ? 'Assumption' : 'Verified Actual'}
                      </span>
                    )}
                  </td>

                  {/* Planned Spend */}
                  <td className="py-3 px-3 text-right font-mono text-slate-300">
                    {isEditing ? (
                      <input
                        type="number"
                        value={plannedSpend}
                        onChange={(e) => setPlannedSpend(Number(e.target.value))}
                        className="w-20 bg-slate-900 border border-slate-700 text-right text-xs text-white rounded px-2 py-1"
                      />
                    ) : (
                      formatCurrencyINR(c.planned_spend)
                    )}
                  </td>

                  {/* Actual Spend */}
                  <td className="py-3 px-3 text-right font-mono font-semibold text-white">
                    {isEditing ? (
                      <input
                        type="number"
                        value={actualSpend}
                        onChange={(e) => setActualSpend(Number(e.target.value))}
                        className="w-20 bg-slate-900 border border-slate-700 text-right text-xs text-white rounded px-2 py-1"
                      />
                    ) : (
                      formatCurrencyINR(c.actual_spend)
                    )}
                  </td>

                  {/* Registrations Generated */}
                  <td className="py-3 px-3 text-right font-mono text-slate-200">
                    {c.registrations}
                  </td>

                  {/* CPR (Cost Per Registration) */}
                  <td className="py-3 px-3 text-right font-mono">
                    {c.actual_spend > 0 && c.registrations > 0 ? (
                      <span className="text-emerald-400 font-bold">
                        {formatCurrencyINR(c.cost_per_registration || 0)}
                      </span>
                    ) : c.actual_spend === 0 && c.registrations > 0 ? (
                      <span className="text-cyan-400 text-[11px] font-semibold">
                        ₹0 (Organic)
                      </span>
                    ) : (
                      <span className="text-slate-600 text-[11px]">
                        N/A (No Spend)
                      </span>
                    )}
                  </td>

                  {/* Notes */}
                  <td className="py-3 px-3 text-slate-400 text-[11px] max-w-sm">
                    {isEditing ? (
                      <input
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 text-xs text-white rounded px-2 py-1"
                      />
                    ) : (
                      c.notes
                    )}
                  </td>

                  {/* Edit / Save Action */}
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    {isEditing ? (
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleSave(c.id)}
                          disabled={saving}
                          className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-[11px] flex items-center gap-1"
                        >
                          <Save className="w-3 h-3" />
                          <span>Save</span>
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-2 py-1 rounded bg-slate-800 text-slate-400 hover:text-white text-[11px]"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => startEdit(c)}
                          className="p-1 rounded text-slate-400 hover:text-indigo-300 hover:bg-slate-800 transition-colors"
                          title="Edit Channel Spend"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        {saveSuccess === c.id && (
                          <span className="text-[10px] text-emerald-400 flex items-center gap-0.5">
                            <Check className="w-3 h-3" /> Saved
                          </span>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

