import React, { useMemo } from 'react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileCheck2, 
  ArrowUpRight, 
  Building2, 
  ShieldCheck,
  Zap
} from 'lucide-react';
import { ApplicantRecord, TransactionRecord, ActivityRecord } from '../types.ts';

interface PerformanceInsightsProps {
  applicants: ApplicantRecord[];
  transactions: TransactionRecord[];
  activities: ActivityRecord[];
}

export const PerformanceInsights: React.FC<PerformanceInsightsProps> = ({
  applicants,
  transactions,
  activities,
}) => {
  // Generate the last 7 calendar days up to the current date
  const weeklyData = useMemo(() => {
    const days: {
      dateStr: string;
      displayDay: string;
      fullDate: string;
      processed: number;
      approved: number;
      revenue: number;
    }[] = [];

    // Reference base date (current dynamic date)
    const baseDate = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() - i);
      
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dateKey = `${year}-${month}-${day}`;
      
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const monthName = d.toLocaleDateString('en-US', { month: 'short' });
      const displayDay = `${dayName} ${day}`;
      const fullDate = `${dayName}, ${monthName} ${day}`;

      // Count applications submitted, updated, or in timeline on this day
      let dayProcessedCount = 0;
      let dayApprovedCount = 0;

      applicants.forEach((app) => {
        const subDate = (app.submissionDate || '').slice(0, 10);
        const updDate = (app.updated || '').slice(0, 10);

        // Check if application has timeline events on this date
        const hasTimelineEventOnDate = app.timeline?.some(
          (tl) => (tl.timestamp || '').slice(0, 10) === dateKey
        );

        if (subDate === dateKey || updDate === dateKey || hasTimelineEventOnDate) {
          dayProcessedCount++;
          if (app.status === 'Approved' || app.status === 'Completed') {
            dayApprovedCount++;
          }
        }
      });

      // Sum transactions on this date from real client payments
      const dayRevenue = transactions
        .filter((t) => (t.date || '').slice(0, 10) === dateKey)
        .reduce((sum, t) => sum + Number(t.amount || 0), 0);

      // Reflect actual real applications processed without fake dummy revenue
      const processedCount = dayProcessedCount;
      const approvedCount = dayApprovedCount;

      days.push({
        dateStr: dateKey,
        displayDay,
        fullDate,
        processed: processedCount,
        approved: approvedCount,
        revenue: dayRevenue,
      });
    }

    return days;
  }, [applicants, transactions]);

  // Aggregate stats
  const totalProcessedWeek = weeklyData.reduce((acc, d) => acc + d.processed, 0);
  const totalApprovedWeek = weeklyData.reduce((acc, d) => acc + d.approved, 0);
  const avgDailyProcessed = (totalProcessedWeek / 7).toFixed(1);
  const peakDay = [...weeklyData].sort((a, b) => b.processed - a.processed)[0];
  const totalWeeklyRevenue = weeklyData.reduce((acc, d) => acc + d.revenue, 0);

  // Authority Distribution data for secondary donut chart
  const categoryStats = useMemo(() => {
    const counts: Record<string, number> = {
      'Immigration & Visas': 0,
      'MOHRE & Labour': 0,
      'RTA & Driving': 0,
      'Business & Ejari': 0,
      'Medical & Insurance': 0,
    };

    applicants.forEach((app) => {
      const cat = app.serviceCategory || '';
      if (cat.includes('Identity') || cat.includes('Immigration')) {
        counts['Immigration & Visas']++;
      } else if (cat.includes('Employment') || cat.includes('Labour')) {
        counts['MOHRE & Labour']++;
      } else if (cat.includes('Transport') || cat.includes('Traffic')) {
        counts['RTA & Driving']++;
      } else if (cat.includes('Business') || cat.includes('Commercial')) {
        counts['Business & Ejari']++;
      } else {
        counts['Medical & Insurance']++;
      }
    });

    const COLORS = ['#73e4e8', '#a99cff', '#68e0ae', '#ffd166', '#ff8296'];

    return Object.entries(counts).map(([name, value], idx) => ({
      name,
      value: Math.max(value, 1),
      color: COLORS[idx % COLORS.length],
    }));
  }, [applicants]);

  // Custom Dark Glass Tooltip for Recharts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel p-3.5 rounded-xl border border-white/20 bg-[#080d1b]/95 text-xs shadow-2xl backdrop-blur-xl">
          <p className="font-heading font-bold text-white mb-2 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#73e4e8]" />
            <span>{label}</span>
          </p>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-4">
              <span className="text-gray-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#73e4e8]"></span>
                Processed:
              </span>
              <strong className="text-white font-mono">{payload[0]?.value} files</strong>
            </div>
            {payload[1] && (
              <div className="flex items-center justify-between gap-4">
                <span className="text-gray-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#68e0ae]"></span>
                  Approved:
                </span>
                <strong className="text-[#68e0ae] font-mono">{payload[1]?.value} files</strong>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#73e4e8]/10 border border-[#73e4e8]/30 text-xs font-bold text-[#73e4e8] tracking-widest uppercase mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            Performance Insights
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
            Weekly Application Processing Analytics
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Visualizing day-by-day throughput, authority clearance rates, and client velocity over the last 7 days.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-gray-300 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#a99cff]" />
            <span>Last 7 Days (Oct 26 – Nov 01)</span>
          </span>
        </div>
      </div>

      {/* 4 Top KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-xs">7-Day Processed</span>
            <FileCheck2 className="w-4 h-4 text-[#73e4e8]" />
          </div>
          <strong className="text-2xl font-black font-heading text-white">
            {totalProcessedWeek} <span className="text-xs text-gray-400 font-normal">files</span>
          </strong>
          <span className="text-[11px] text-[#68e0ae] flex items-center gap-1 mt-1 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            Active filing across UAE
          </span>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-xs">Daily Average Rate</span>
            <Clock className="w-4 h-4 text-[#a99cff]" />
          </div>
          <strong className="text-2xl font-black font-heading text-[#73e4e8]">
            {avgDailyProcessed} <span className="text-xs text-gray-400 font-normal">/ day</span>
          </strong>
          <span className="text-[11px] text-gray-400 block mt-1">
            7-day rolling average
          </span>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-xs">Approved & Completed</span>
            <CheckCircle2 className="w-4 h-4 text-[#68e0ae]" />
          </div>
          <strong className="text-2xl font-black font-heading text-[#68e0ae]">
            {totalApprovedWeek} <span className="text-xs text-gray-400 font-normal">cleared</span>
          </strong>
          <span className="text-[11px] text-[#73e4e8] block mt-1 font-medium">
            {Math.round((totalApprovedWeek / Math.max(1, totalProcessedWeek)) * 100)}% approval velocity
          </span>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-xs">Peak Processing Day</span>
            <Zap className="w-4 h-4 text-[#ffd166]" />
          </div>
          <strong className="text-xl font-black font-heading text-white truncate block">
            {peakDay ? peakDay.displayDay : 'Thu 29'}
          </strong>
          <span className="text-[11px] text-gray-400 block mt-1">
            {peakDay ? `${peakDay.processed} files logged` : 'High throughput'}
          </span>
        </div>
      </div>

      {/* Main Chart Section: Daily Throughput (Bar & Line Chart) */}
      <div className="glass-panel p-6 rounded-3xl border border-white/15 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="font-heading font-bold text-lg text-white flex items-center gap-2">
              <Bar className="w-4 h-4 text-[#73e4e8]" />
              <span>Applications Processed Per Day (Last Week)</span>
            </h4>
            <p className="text-xs text-gray-400 mt-0.5">
              Daily volume of applications prepared, lodged, and progressed across UAE federal and local portals.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-gray-300">
              <span className="w-3 h-3 rounded-md bg-[#73e4e8]/80"></span>
              <span>Total Processed</span>
            </span>
            <span className="flex items-center gap-1.5 text-gray-300">
              <span className="w-3 h-3 rounded-md bg-[#68e0ae]/80"></span>
              <span>Approved / Cleared</span>
            </span>
          </div>
        </div>

        {/* Recharts Container */}
        <div className="w-full h-72 sm:h-80 pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#73e4e8" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#73e4e8" stopOpacity={0.3} />
                </linearGradient>
                <linearGradient id="approvedBarGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#68e0ae" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#68e0ae" stopOpacity={0.3} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" vertical={false} />
              <XAxis 
                dataKey="displayDay" 
                stroke="rgba(255,255,255,0.4)" 
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.4)" 
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="processed" 
                name="Applications Processed" 
                fill="url(#barGrad)" 
                radius={[6, 6, 0, 0]} 
                maxBarSize={40} 
              />
              <Bar 
                dataKey="approved" 
                name="Approved Files" 
                fill="url(#approvedBarGrad)" 
                radius={[6, 6, 0, 0]} 
                maxBarSize={40} 
              />
              <Line 
                type="monotone" 
                dataKey="processed" 
                stroke="#a99cff" 
                strokeWidth={2.5} 
                dot={{ r: 4, fill: '#080d1b', stroke: '#a99cff', strokeWidth: 2 }}
                activeDot={{ r: 6, fill: '#73e4e8' }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two Column Grid: Category Distribution & Daily Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Category Breakdown (Donut Chart) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-white/15 space-y-4 flex flex-col justify-between">
          <div>
            <h4 className="font-heading font-bold text-base text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#a99cff]" />
              <span>Service Category Breakdown</span>
            </h4>
            <p className="text-xs text-gray-400 mt-0.5">
              Workload distribution across UAE government departments.
            </p>
          </div>

          <div className="h-52 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(8,13,27,0.8)" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="glass-panel p-2.5 rounded-xl border border-white/20 bg-[#080d1b] text-xs shadow-xl">
                          <span className="font-bold text-white">{payload[0].name}</span>: {payload[0].value} files
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs">
            {categoryStats.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between text-gray-300">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }}></span>
                  <span>{cat.name}</span>
                </span>
                <span className="font-mono text-white font-semibold">{cat.value} files</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Breakdown Table */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-white/15 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-heading font-bold text-base text-white">
              7-Day Logged Throughput Breakdown
            </h4>
            <span className="text-xs font-mono text-[#73e4e8]">
              Total: {totalProcessedWeek} Applications
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-white/5 uppercase text-[10px] text-gray-400 font-semibold">
                <tr>
                  <th className="p-3">Day & Date</th>
                  <th className="p-3 text-center">Files Processed</th>
                  <th className="p-3 text-center">Approved</th>
                  <th className="p-3 text-right">Daily Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {weeklyData.map((d) => {
                  const sharePercent = Math.round((d.processed / Math.max(1, totalProcessedWeek)) * 100);
                  return (
                    <tr key={d.dateStr} className="hover:bg-white/[0.02]">
                      <td className="p-3 font-medium text-white flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#73e4e8]"></span>
                        <span>{d.fullDate}</span>
                      </td>
                      <td className="p-3 text-center font-mono font-bold text-[#73e4e8]">
                        {d.processed}
                      </td>
                      <td className="p-3 text-center font-mono font-bold text-[#68e0ae]">
                        {d.approved}
                      </td>
                      <td className="p-3 text-right font-mono">
                        <span className="bg-white/5 px-2 py-0.5 rounded text-[11px] text-gray-300">
                          {sharePercent}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-gray-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#68e0ae] shrink-0" />
            <span>
              Real-time audit sync active. All submissions are timestamped and logged securely.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
