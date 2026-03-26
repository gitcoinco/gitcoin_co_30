interface InitialAvatarProps {
  name: string;
  className?: string;
  textClassName?: string;
}

export default function InitialAvatar({ name, className = '', textClassName = '' }: InitialAvatarProps) {
  return (
    <div className={`rounded-xl border border-teal-500 flex items-center justify-center shrink-0 ${className}`}>
      <span className={`font-light text-teal-500 font-heading leading-none ${textClassName}`}>
        {name.charAt(0).toUpperCase()}
      </span>
    </div>
  );
}
