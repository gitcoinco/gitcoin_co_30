import { LucideIcon, Search, FileText, Layers } from 'lucide-react'
import Button from './Button'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    href: string
  }
}

export default function EmptyState({
  icon: Icon = FileText,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-lichenpunk-warmGray flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-lichenpunk-slateGray" />
      </div>
      <h3 className="text-xl font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-text-secondary max-w-md mb-6">{description}</p>
      {action && (
        <Button href={action.href} variant="primary">
          {action.label}
        </Button>
      )}
    </div>
  )
}
