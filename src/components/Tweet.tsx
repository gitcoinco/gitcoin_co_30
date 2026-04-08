interface TweetProps {
  url: string;
  author: string;
  date: string;
  noConversation?: boolean;
  children: React.ReactNode;
}

export default function Tweet({ url, author, date, noConversation, children }: TweetProps) {
  return (
    <blockquote
      className="twitter-tweet"
      {...(noConversation ? { "data-conversation": "none" } : {})}
    >
      <p lang="en" dir="ltr">{children}</p>
      &mdash; {author}{" "}
      <a href={url}>{date}</a>
    </blockquote>
  );
}
