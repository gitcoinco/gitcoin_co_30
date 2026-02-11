interface Stat {
  label: string;
  value: string;
  change?: string;
}

interface StatsProps {
  stats: Stat[];
}

export default function Stats({ stats }: StatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-fit">
      {stats.map((stat) => (
        <div key={stat.label}>
          <p className="text-3xl md:text-4xl heading text-gray-25 mb-1">
            {stat.value}
          </p>
          <p className="text-gray-500 text-sm">{stat.label}</p>
          {stat.change && (
            <p className="text-xs text-gray-25/70 mt-1">{stat.change}</p>
          )}
        </div>
      ))}
    </div>
  );
}
