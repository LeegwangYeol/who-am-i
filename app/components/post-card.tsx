"use client"

// import { useState } from "react"
import Image from "next/image"
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
          ? <strong key={i} className={`${isDarkTheme ? 'text-blue-400' : 'text-blue-600'}`}>{part.text}</strong>
          : <span key={i}>{part.text}</span>
      )}
    </>
  );
};

type LikeKeys = "reason" | "motive" | "dream" | "goal" | "hardware" | "code" | "ai";

interface PostCardProps {
  profileImage: string;
  userName: string;
  category: string;
  categoryValue: string;
  postImage: string;
  postImageAlt: string;
  likeKey: LikeKeys;
  content: string;
  highlights: string[];
  postedTime: string;
  onLike: (post: LikeKeys) => void;
  likes: Record<string, number>;
  isDarkTheme: boolean;
}

const defaultLikes = {
  reason: 0,
  motive: 0,
  dream: 0,
  goal: 0,
  hardware: 0,
  code: 0,
  ai: 0
};

export default function PostCard({
  profileImage,
  userName,
  category,
  categoryValue,
  postImage,
  postImageAlt,
  likeKey,
  content,
  highlights,
  postedTime,
  onLike,
  likes,
  isDarkTheme
}: PostCardProps) {
  
  return (
    <div className={`${isDarkTheme ? 'glassmorphism-dark' : 'glassmorphism-light'} border border-gray-200 rounded-md mb-6`}>
      <div className="p-4 flex items-center">
        <Image
          src={profileImage}
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="ml-3">
          <p className={`font-semibold ${isDarkTheme ? 'text-white' : 'text-black'}`}>{userName}</p>
          <p className={`text-xs ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'}`}>{category}: {categoryValue}</p>
        </div>
      </div>

      <Image
        src={postImage}
        alt={postImageAlt}
        width={600}
        height={600}
        className="w-full h-auto"
      />

      <div className="p-4">
        <div className="flex justify-between mb-2">
          <div className="flex space-x-4">
            <button onClick={() => onLike(likeKey)} className="flex items-center">
              <Heart className={`h-6 w-6 ${likes[likeKey] > defaultLikes[likeKey] ? "fill-red-500 text-red-500" : isDarkTheme ? "text-white" : "text-black"}`} />
            </button>
            <button className="flex items-center">
              <MessageCircle className={`h-6 w-6 ${isDarkTheme ? "text-white" : "text-black"}`} />
            </button>
            <button className="flex items-center">
              <Share2 className={`h-6 w-6 ${isDarkTheme ? "text-white" : "text-black"}`} />
            </button>
          </div>
          <button className="flex items-center">
            <Bookmark className={`h-6 w-6 ${isDarkTheme ? "text-white" : "text-black"}`} />
          </button>
        </div>

        <p className={`font-semibold mb-1 ${isDarkTheme ? 'text-white' : 'text-black'}`}>{likes[likeKey]} likes</p>

        <div className="mb-2">
          <span className={`font-semibold ${isDarkTheme ? 'text-white' : 'text-black'}`}>hongGD</span>{" "}
          <span className={`${isDarkTheme ? 'text-white' : 'text-black'}`}>
            <HighlightedText text={content} highlights={highlights} isDarkTheme={isDarkTheme} />
          </span>
        </div>

        <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-500'} text-xs`}>{postedTime}</p>
      </div>
    </div>
  );
}
