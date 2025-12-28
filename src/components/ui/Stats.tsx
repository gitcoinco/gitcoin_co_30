interface Stat {
  label: string
  value: string
  change?: string
}

interface StatsProps {
  stats: Stat[]
}

export default function Stats({ stats }: StatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <p className="text-3xl md:text-4xl font-bold text-light-white mb-1">
            {stat.value}
          </p>
          <p className="text-muted-gray text-sm">{stat.label}</p>
          {stat.change && (
            <p className="text-xs text-light-white/70 mt-1">{stat.change}</p>
          )}
        </div>
      ))}
    </div>
  )
}
