import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { moods } from './MoodPicker';

interface MoodDashboardProps {
  // In a real app, this would come from a database
  // For now, we'll suggest how to structure it
}

export function MoodDashboard() {
  const { t } = useTranslation();

  // Mock data for demonstration
  const data = useMemo(() => [
    { name: t(`moods.labels.${moods[0].id}`), count: 5, color: '#f97316', emoji: moods[0].emoji },
    { name: t(`moods.labels.${moods[1].id}`), count: 2, color: '#0ea5e9', emoji: moods[1].emoji },
    { name: t(`moods.labels.${moods[2].id}`), count: 8, color: '#a855f7', emoji: moods[2].emoji },
    { name: t(`moods.labels.${moods[3].id}`), count: 3, color: '#ec4899', emoji: moods[3].emoji },
    { name: t(`moods.labels.${moods[4].id}`), count: 1, color: '#64748b', emoji: moods[4].emoji },
  ], [t]);

  return (
    <div className="bg-white/70 dark:bg-neutral-900/60 backdrop-blur-xl rounded-[2rem] p-6 border border-white/60 dark:border-neutral-700/50 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 mb-1">
          {t('dashboard.title')}
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {t('dashboard.subtitle')}
        </p>
      </div>

      <div className="h-[300px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#888', fontSize: 12 }}
            />
            <YAxis hide />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  return (
                    <div className="bg-white dark:bg-neutral-800 p-3 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-lg">
                      <p className="text-sm font-bold flex items-center gap-2">
                        <span>{item.emoji}</span>
                        {item.name}: {item.count} {t('dashboard.tooltipSuffix')}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="count" radius={[10, 10, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
        <div className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/30">
          <p className="text-xs text-orange-600 dark:text-orange-400 font-medium uppercase mb-1">{t('dashboard.stats.frequent')}</p>
          <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">{t(`moods.labels.feliz`)}</p>
        </div>
        <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-900/30">
          <p className="text-xs text-purple-600 dark:text-purple-400 font-medium uppercase mb-1">{t('dashboard.stats.streak')}</p>
          <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">5 🔥</p>
        </div>
        <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30">
          <p className="text-xs text-blue-600 dark:text-blue-400 font-medium uppercase mb-1">{t('dashboard.stats.total')}</p>
          <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">19</p>
        </div>
      </div>
    </div>
  );
}
