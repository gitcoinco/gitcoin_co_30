import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface MarkdownProps {
  content: string;
  className?: string;
}

export function Markdown({ content, className = "" }: MarkdownProps) {
  return (
    <div className={`prose prose-slate prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // Style headings
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-gray-25 mt-12 mb-6 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold text-gray-25 mt-10 mb-5">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold text-gray-25 mt-8 mb-4">
              {children}
            </h3>
          ),
          // Style paragraphs
          p: ({ children }) => (
            <p className="text-gray-400 mb-6 leading-relaxed text-base">
              {children}
            </p>
          ),
          // Style lists
          ul: ({ children }) => (
            <ul className="list-disc list-inside text-gray-400 mb-6 space-y-2 ml-4">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside text-gray-400 mb-6 space-y-2 ml-4">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-gray-400 leading-relaxed">{children}</li>
          ),
          // Style links
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-gray-25 underline"
            >
              {children}
            </a>
          ),
          // Style code
          code: ({ children, className }) => {
            const isInline = !className;
            return isInline ? (
              <code className="bg-gray-800 text-gray-25 px-1.5 py-0.5 rounded text-sm">
                {children}
              </code>
            ) : (
              <code
                className={`${className} block bg-gray-800 text-gray-25 p-4 rounded-lg overflow-x-auto`}
              >
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-gray-800 rounded-lg overflow-hidden mb-4">
              {children}
            </pre>
          ),
          // Style blockquotes
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-25 pl-4 italic text-gray-400 my-4">
              {children}
            </blockquote>
          ),
          // Style images with dark background
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt || ""}
              className="rounded-lg my-8 w-full bg-gray-900 invert"
            />
          ),
          // Style tables
          table: ({ children }) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full border border-gray-800">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-800">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="px-4 py-2 text-left text-gray-25 font-semibold border border-gray-800">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2 text-gray-400 border border-gray-800">
              {children}
            </td>
          ),
          // Style horizontal rules
          hr: () => <hr className="border-t border-gray-800 my-8" />,
          // Style strong/bold
          strong: ({ children }) => (
            <strong className="font-bold text-gray-25">{children}</strong>
          ),
          // Style emphasis/italic
          em: ({ children }) => <em className="italic">{children}</em>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
