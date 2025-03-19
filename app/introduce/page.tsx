"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import PostCard from "../components/post-card"
import { useThemeStore, toggleTheme } from "@/store/theme"

export default function IntroducePage() {
  const { isDarkTheme } = useThemeStore();
  const [likes, setLikes] = useState({
    reason: 124,
    motive: 89,
    dream: 156,
    goal: 112,
    hardware: 130,
    code: 105,
    ai: 142
  })
  

  const handleToggleTheme = () => {
    toggleTheme();
  }

  const handleLike = (post: keyof typeof likes) => {
    setLikes((prev) => ({
      ...prev,
      [post]: prev[post] + 1,
    }))
  }

  // 별이 떨어지는 배경 효과를 위한 상태와 효과
  const [stars, setStars] = useState<Array<{id: number, left: string, animationDuration: string, opacity: number}>>([]);

  useEffect(() => {
    const createStar = () => {
      const newStar = {
        id: Math.random(),
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        opacity: Math.random(),
      };
      setStars(prevStars => [...prevStars, newStar]);
      
      // 별이 너무 많아지지 않도록 일정 시간 후 제거
      setTimeout(() => {
        setStars(prevStars => prevStars.filter(s => s.id !== newStar.id));
      }, parseInt(newStar.animationDuration) * 1000);
    };

    const interval = setInterval(createStar, 300);
    return () => clearInterval(interval);
  }, []);

  // 포스트 데이터
  const posts = [
    {
      id: 1,
      profileImage: "/placeholder.svg?height=40&width=40&text=Profile",
      userName: "이광열 / Lee Gwangyeol",
      category: "가치관",
      categoryValue: "도전정신",
      postImage: "/placeholder.svg?height=600&width=600&text=Challenge+Spirit",
      postImageAlt: "도전정신",
      likeKey: "reason" as keyof typeof likes,
      content: "저의 인생에서 가장 중요한 가치 중 하나는 \"세상에 하지 못할 일은 없다\"는 도전정신입니다. 대학 시절, 남들보다 늦게 러시아어에 도전했지만, 결심한 순간부터 끝까지 해내겠다는 다짐으로 유튜브를 활용한 집중적 학습과 러시아 유학 중 현지 학생들과의 언어 교환을 통해 능력을 향상시켜 관련 자격증을 취득했습니다.또한, 해외에서 엔지니어로 일하고 싶다는 목표로 개발자 교육에 도전하여 약 1년간의 준비 끝에 일본 개발자로서 경력을 쌓았습니다. 이후 로봇 자동화 분야에서 일하며 일본과 중국의 현장을 경험했고, 최근에는 웹 개발과 AI 기술 분야로 영역을 확장하고 있습니다. 💪 🎯 ⚔️",
      highlights: ["\"세상에 하지 못할 일은 없다\"", "도전정신", "엔지니어", "개발자", "경험", "로봇 자동화", "개발", "AI"],
      postedTime: "POSTED 2 WEEKS AGO"
    },
    {
      id: 2,
      profileImage: "/placeholder.svg?height=40&width=40&text=Profile",
      userName: "이광열 / Lee Gwangyeol",
      category: "가치관",
      categoryValue: "미래 기술에 대한 확신",
      postImage: "/placeholder.svg?height=600&width=600&text=Future+Technology",
      postImageAlt: "미래 기술",
      likeKey: "code" as keyof typeof likes,
      content: "2010년대 초 가상화폐가 무존재성으로 인해 가치가 없을 것이라는 일반적 판단이 현재의 미중 가상화폐 주도권 쟁탈전을 보며 완전히 빗나갔듯이, AI 역시 상용화가 먼 미래라는 예상과 달리 LLM, RAG 기법으로 무장한 AI는 이미 다양한 분야에서 활용되고 있습니다. OpenAI와 중국 유니트리의 인간형 로봇 개발이 보여주듯, 현재의 기술 지표는 미래가 인공지능 로봇 중심으로 재편될 것임을 명확히 나타내고 있습니다. 저는 이러한 기술 혁신의 흐름에 확신을 가지고, 인공지능 로봇 상용화 시대에 준비된 전문가가 되기 위해 끊임없이 학습하고 도전하고 있습니다. 이미 알고 있었던 미래에 대해서 대비를 하지 못했던 경험이 있습니다. 다시 이를 반복하지 않겠습니다. 🤖 💻 🧑‍💻",
      highlights: ["AI", "로봇", "개발", "경험"],
      postedTime: "POSTED 10 DAYS AGO"
    },
    {
      id: 3,
      profileImage: "/placeholder.svg?height=40&width=40&text=Profile",
      userName: "이광열 / Lee Gwangyeol",
      category: "핵심역량",
      categoryValue: "부족을 극복하는 사람",
      postImage: "/placeholder.svg?height=600&width=600&text=Overcoming+Weaknesses",
      postImageAlt: "부족을 극복하는 사람",
      likeKey: "motive" as keyof typeof likes,
      content: "자동화 장비 개발 경험을 통해 현장의 실질적 니즈를 직접 파악하고 적용하는 과정에서 큰 보람을 느꼈습니다. 일본과 중국의 엔지니어 및 클라이언트와 직접 소통하며 제 언어 능력을 활용할 수 있었고, 지방 및 해외 현장을 방문하는 과정도 즐거웠습니다. 특히 '생산이 원활해졌다', '러가 해결됐다', '이전 장비보다 훨씬 좋다'는 현장의 피드백은 큰 자신감을 심어주었습니다. 그러나 디자인적 측면과 사용자 경험 부분에서 부족함을 느꼈습니다. API 활용과 서버에 대한 이해 부족, C#에서의 제한된 UI 디자인 등 UX와 사용자 니즈 측면에서 개선이 필요함을 인식했습니다. 이를 보완하기 위해 개인적인 학습을 진행하다가 지인의 제안을 통해서 챗봇 개발 웹 스타트업에서 관련 경험을 쌓게 되었습니다. 🧗🏻 🛠️ 🚀",
      highlights: ["부족함", "노력", "극복", "비전공자", "경험", "동기부여"],
      postedTime: "POSTED 1 WEEK AGO"
    },
    {
      id: 4,
      profileImage: "/placeholder.svg?height=40&width=40&text=Profile",
      userName: "이광열 / Lee GwangYeol",
      category: "핵심역량",
      categoryValue: "하드웨어와 소프트웨어 이해",
      postImage: "/placeholder.svg?height=600&width=600&text=Hardware+Software",
      postImageAlt: "하드웨어와 소프트웨어",
      likeKey: "hardware" as keyof typeof likes,
      content: "코로나라는 특수 상황에서 일본과 중국 현장을 직접 경험하며 인력 부족으로 하드웨어적 수정을 직접 진행했습니다. 장비 셋업 과정에서 작업 패스라인 조정, 다축 움직임에 따른 진동 및 불협화음 측정, 개선 방안 도출 등을 통해 프로그램이 로봇에 미치는 영향을 실제로 경험했습니다.사내 셋업 환경에서의 조명 차이, 장비의 운송시의 렌즈 파손 등 이러한 경험은 코드만으로는 볼 수 없는 하드웨어의 현실 및 로봇 개발자로서의 염두해둬야할 디테일을 파악하게 해주었고, 생산 시퀀스의 효율화(진동 제거) 및 사용자 경험 설계에 적용할 수 있었습니다. 🖥️ 🖨️ ⌨️",
      highlights: ["로봇 자동화", "엔지니어", "하드웨어", "소프트웨어", "경험", "AI", "로봇", "웹 개발", "개발자"],
      postedTime: "POSTED 5 DAYS AGO"
    },
    {
      id: 5,
      profileImage: "/placeholder.svg?height=40&width=40&text=Profile",
      userName: "이광열 / Lee Gwangyeol",
      category: "핵심역량",
      categoryValue: "코드 품질에 대한 인식 변화",
      postImage: "/placeholder.svg?height=600&width=600&text=Goal+Oriented",
      postImageAlt: "코드 품질에 대한 인식 변화",
      likeKey: "goal" as keyof typeof likes,
      content: "처음 자동화 장비를 접했을 때는 기존 코드 수정에 두려움이 많았습니다. 컴파일러가 알려주는 수많은 버그와 예상치 못한 사이드 이펙트에 대한 우려로 변화에 보수적이었고, '돌아가기만 하면 된다'는 사고방식을 가지고 있었습니다.하지만 챗봇 개발 과정에서 SOLID 원칙에 따른 개발 방법론을 접하게 되면서 코드의 간결성과 구조화의 중요성을 깨달았습니다. 단순히 작동하는 코드를 넘어, 유지보수가 용이하고 확장 가능한 코드 작성의 가치를 인식하게 되었습니다. 이러한 경험은 제 개발 철학을 근본적으로 변화시켰으며, 더 나은 코드를 작성하기 위한 끊임없는 노력으로 이어지고 있습니다. 🎯 🏆 ⚙️",
      highlights: ["목표", "계획", "개발자", "로봇 자동화", "프로젝트", "AI", "웹 개발"],
      postedTime: "POSTED 3 DAYS AGO"
    },
    {
      id: 6,
      profileImage: "/placeholder.svg?height=40&width=40&text=Profile",
      userName: "이광열 / Lee Gwangyeol",
      category: "핵심역량",
      categoryValue: "꿈을 현실로 만드는 능력",
      postImage: "/placeholder.svg?height=600&width=600&text=Dreams+To+Reality",
      postImageAlt: "꿈을 현실로",
      likeKey: "dream" as keyof typeof likes,
      content: "저는 꿈을 단순한 상상으로 남기지 않고 이를 현실로 만들어내는 능력을 가지고 있습니다. 대학 시절 러시아어를 배우고 싶다는 꿈은 실제 러시아 유학과 자격증 취득으로 이어졌고, 해외에서 일하고 싶다는 꿈은 일본과 중국에서의 실제 근무 경험으로 실현되었습니다. 이러한 과정에서 저는 꿈을 이루기 위해 필요한 구체적인 단계를 설정하고, 각 단계마다 실질적인 행동을 취하는 것의 중요성을 깨달았습니다. 현재 저의 꿈은 AI와 로봇 기술을 활용하여 사회적 가치를 창출하는 혁신적인 서비스를 개발하는 것입니다. 이를 위해 저는 관련 기술을 꾸준히 학습하고, 다양한 프로젝트에 참여하며, 실제 서비스를 구현하기 위한 준비를 차근차근 진행하고 있습니다. ✨ 🌛 💫",
      highlights: ["꿈", "현실", "경험", "AI", "로봇", "개발"],
      postedTime: "POSTED 1 DAY AGO"
    }
  ];


  return (
    <div className={`min-h-screen ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-200'} relative`}>
      <div className="stars-container fixed w-screen h-screen">
        {stars.map(star => (
          <div
            key={star.id}
            className="star"
            style={{
              left: star.left,
              animationDuration: star.animationDuration,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>
      
      <header className={`${isDarkTheme ? 'glassmorphism-dark' : 'glassmorphism-light'} shadow`}>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center">
          <Link href="/" className="flex items-center text-blue-500 hover:text-blue-700 mr-4">
            <ArrowLeft className={`h-5 w-5 mr-1 ${isDarkTheme ? 'text-gray-200' : 'text-gray-900'}`} />
            <span>Back</span>
          </Link>
          <h1 className={`text-3xl font-bold ${isDarkTheme ? 'text-gray-200' : 'text-gray-900'}`}>
            이광열의 자기소개
          </h1>
        </div>
      </header>
      
      <main className={`max-w-2xl mx-auto py-6 sm:px-6 lg:px-8 ${isDarkTheme ? 'glassmorphism-dark' : 'glassmorphism-light'}`}>
        <div className="px-4 py-6 sm:px-0 space-y-6">
          {posts.map(post => (
            <PostCard
              key={post.id}
              profileImage={post.profileImage}
              userName={post.userName}
              category={post.category}
              categoryValue={post.categoryValue}
              postImage={post.postImage}
              postImageAlt={post.postImageAlt}
              likeKey={post.likeKey}
              content={post.content}
              highlights={post.highlights}
              postedTime={post.postedTime}
              onLike={handleLike}
              likes={likes}
              isDarkTheme={isDarkTheme}
            />
          ))}
        </div>
      </main>
      
      <button
        onClick={handleToggleTheme}
        className={`fixed top-8 right-12 z-50 text-4xl rounded-full shadow-lg text-white transition-colors p-2  ${isDarkTheme ? 'glassmorphism-dark' : 'glassmorphism-light'}`}
      >
        <i className={`fab fa-grav ${isDarkTheme ? 'text-gray-200' : 'text-gray-900'}`}></i>
      </button>
    </div>
  );
}
