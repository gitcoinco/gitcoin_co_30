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
          <p className="text-3xl md:text-4xl font-bold text-gitcoin-green mb-1">
            {stat.value}
          </p>
          <p className="text-text-secondary text-sm">{stat.label}</p>
          {stat.change && (
            <p className="text-xs text-lichenpunk-moss mt-1">{stat.change}</p>
          )}
        </div>
      ))}
    </div>
  )
}
