interface ReadTimeBadgeProps {
  minutes: number;
}

export default function ReadTimeBadge({ minutes }: ReadTimeBadgeProps) {
  return (
    <div className="absolute top-3 right-3 bg-gray-900/80 backdrop-blur-sm text-gray-200 text-xs px-2.5 py-1 rounded-md font-mono">
      {minutes} min read
    </div>
  );
}
