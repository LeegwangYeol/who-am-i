"use client"

import { Heart, MessageCircle, Bookmark, Share2 } from "lucide-react"

// 강조 텍스트를 처리하는 컴포넌트
const HighlightedText = ({ text, highlights, isDarkTheme }: { text: string, highlights: string[], isDarkTheme: boolean }) => {
  // 정규식 패턴을 만들기 위해 특수문자를 이스케이프 처리
  const escapeRegExp = (str: string) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  // 강조할 단어들을 정렬 (긴 단어가 먼저 매칭되도록)
  const sortedHighlights = [...highlights].sort((a, b) => b.length - a.length);
  
  // 텍스트를 분할하여 강조할 부분과 일반 텍스트로 나눔
  let parts: { text: string; highlight: boolean }[] = [{ text, highlight: false }];
  
  sortedHighlights.forEach(highlight => {
    const pattern = new RegExp(`(${escapeRegExp(highlight)})`, 'gi');
    const newParts: typeof parts = [];
    
    parts.forEach(part => {
      if (!part.highlight) {
        const splitText = part.text.split(pattern);
        splitText.forEach((text, i) => {
          if (text.length > 0) {
            newParts.push({
              text,
              highlight: i % 2 === 1 // 패턴과 일치하는 부분만 강조
            });
          }
        });
      } else {
        newParts.push(part);
      }
    });
    
    parts = newParts;
  });
  
  return (
    <>
      {parts.map((part, i) => 
        part.highlight 
          ? <strong key={i} className={`${isDarkTheme ? 'text-indigo-300' : 'text-indigo-600'}`}>{part.text}</strong>
          : <span key={i}>{part.text}</span>
      )}
    </>
  );
};

type LikeKeys = "reason" | "motive" | "dream" | "goal" | "hardware" | "code";

interface ActionLabels {
  like: string;
  comment: string;
  share: string;
  bookmark: string;
}

interface PostCardProps {
  userName: string;
  category: string;
  categoryValue: string;
  likeKey: LikeKeys;
  content: string;
  highlights: string[];
  postedTime: string;
  onLike: (post: LikeKeys) => void;
  likes: Record<string, number>;
  isDarkTheme: boolean;
  /** "{count} likes" 같은 i18n 라벨 (생략 시 "{count} likes" 표시) */
  likesLabel?: string;
  actionLabels?: ActionLabels;
}

const defaultLikes: Record<LikeKeys, number> = {
  reason: 0,
  motive: 0,
  dream: 0,
  goal: 0,
  hardware: 0,
  code: 0,
};

const defaultActionLabels: ActionLabels = {
  like: "Like",
  comment: "Comment",
  share: "Share",
  bookmark: "Save",
};

export default function PostCard({
  userName,
  category,
  categoryValue,
  likeKey,
  content,
  highlights,
  postedTime,
  onLike,
  likes,
  isDarkTheme,
  likesLabel,
  actionLabels = defaultActionLabels,
}: PostCardProps) {
  
  const text = isDarkTheme ? "text-white" : "text-gray-900";
  const textMuted = isDarkTheme ? "text-gray-300" : "text-gray-500";
  const iconColor = isDarkTheme ? "text-gray-200" : "text-gray-700";

  return (
    <article
      className={`${
        isDarkTheme ? "glassmorphism-dark" : "glassmorphism-light"
      } rounded-2xl mb-6 overflow-hidden`}
    >
      <header className="p-4 flex items-center justify-between">
        <div>
          <p className={`font-semibold ${text}`}>{userName}</p>
          <p className={`text-xs ${textMuted} mt-0.5`}>
            <span className="inline-block px-1.5 py-0.5 rounded bg-indigo-500/15 text-indigo-400 mr-1.5 text-[10px] uppercase tracking-wide">
              {category}
            </span>
            {categoryValue}
          </p>
        </div>
      </header>

      <div className="px-4 pb-4">
        <div className="flex justify-between mb-2">
          <div className="flex space-x-4">
            <button onClick={() => onLike(likeKey)} className="flex items-center" aria-label={actionLabels.like}>
              <Heart
                className={`h-6 w-6 transition-colors ${
                  likes[likeKey] > defaultLikes[likeKey]
                    ? "fill-red-500 text-red-500"
                    : iconColor
                }`}
              />
            </button>
            <button className="flex items-center" aria-label={actionLabels.comment}>
              <MessageCircle className={`h-6 w-6 ${iconColor}`} />
            </button>
            <button className="flex items-center" aria-label={actionLabels.share}>
              <Share2 className={`h-6 w-6 ${iconColor}`} />
            </button>
          </div>
          <button className="flex items-center" aria-label={actionLabels.bookmark}>
            <Bookmark className={`h-6 w-6 ${iconColor}`} />
          </button>
        </div>

        <p className={`font-semibold mb-2 ${text}`}>{likesLabel ?? `${likes[likeKey]} likes`}</p>

        <div className={`mb-3 leading-relaxed ${text}`}>
          <HighlightedText text={content} highlights={highlights} isDarkTheme={isDarkTheme} />
        </div>

        <p className={`${textMuted} text-xs font-mono`}>{postedTime}</p>
      </div>
    </article>
  );
}
