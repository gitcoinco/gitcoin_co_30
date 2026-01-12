import Badge from "./Badge";

interface TagsListProps {
  tags: string[];
  maxTags?: number;
  variant?: "default" | "active";
  size?: "sm" | "md";
}

export default function TagsList({
  tags,
  maxTags = 3,
  variant = "default",
  size = "sm",
}: TagsListProps) {
  if (tags.length === 0) return null;

  return (
    <div>
      <div className="flex flex-wrap gap-1 items-center">
        {tags.slice(0, maxTags).map((tag) => (
          <Badge key={tag} variant={variant} size={size}>
            {tag}
          </Badge>
        ))}
        {tags.length > maxTags && (
          <span className="text-xs text-gray-400">
            +{tags.length - maxTags}
          </span>
        )}
      </div>
    </div>
  );
}
