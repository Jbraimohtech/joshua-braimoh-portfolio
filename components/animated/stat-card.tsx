type StatCardProps = {
  value: string;
  label: string;
  delay?: number;
  accent?: boolean;
};

export function StatCard({
  value,
  label,
  delay = 0,
  accent = false,
}: StatCardProps) {
  return (
    <div
      className={`stat-card ${accent ? "stat-card--accent" : ""}`.trim()}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-2xl font-bold text-inherit sm:text-3xl">{value}</div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.12em] text-current/70 sm:text-xs sm:tracking-[0.2em]">
        {label}
      </div>
    </div>
  );
}
