"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import PostCard from "../components/post-card"

export default function IntroducePage() {
  const [likes, setLikes] = useState({
    reason: 124,
    motive: 89,
    dream: 156,
    goal: 112,
    hardware: 130,
    code: 105,
    ai: 142
  })
  

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
      userName: "홍길동 / Hong Gildong",
      category: "가치관",
      categoryValue: "도전정신",
      postImage: "/placeholder.svg?height=600&width=600&text=Challenge+Spirit",
      postImageAlt: "도전정신",
      likeKey: "reason" as keyof typeof likes,
      content: "저의 인생에서 가장 중요한 가치 중 하나는 \"세상에 하지 못할 일은 없다\"는 도전정신입니다. 대학 시절, 남들보다 늦게 러시아어에 도전했지만, 결심한 순간부터 끝까지 해내겠다는 다짐으로 유튜브를 활용한 집중적 학습과 러시아 유학 중 현지 학생들과의 언어 교환을 통해 능력을 향상시켜 관련 자격증을 취득했습니다. 또한, 해외에서 엔지니어로 일하고 싶다는 목표로 개발자 교육에 도전하여 약 1년간의 준비 끝에 일본 개발자로서 경험을 쌓았습니다. 이후 로봇 자동화 분야에서 일하며 일본과 중국의 현장을 경험했고, 최근에는 웹 개발과 AI 기술 분야로 영역을 확장하고 있습니다. 💪 🎯 ⚔️",
      highlights: ["\"세상에 하지 못할 일은 없다\"", "도전정신", "엔지니어", "개발자", "경험", "로봇 자동화", "개발", "AI"],
      postedTime: "POSTED 2 WEEKS AGO"
    },
    {
      id: 2,
      profileImage: "/placeholder.svg?height=40&width=40&text=Profile",
      userName: "홍길동 / Hong Gildong",
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
      userName: "홍길동 / Hong Gildong",
      category: "핵심역량",
      categoryValue: "부족을 극복하는 사람",
      postImage: "/placeholder.svg?height=600&width=600&text=Overcoming+Weaknesses",
      postImageAlt: "부족을 극복하는 사람",
      likeKey: "motive" as keyof typeof likes,
      content: "저는 제 자신의 부족함을 인정하고 이를 극복하기 위해 끊임없이 노력하는 사람입니다. 특히 프로그래밍 분야에서는 CS 전공자가 아닌 비전공자로서의 한계를 느꼈지만, 이를 극복하기 위해 기초 알고리즘과 자료구조부터 차근차근 학습하며 실력을 쌓았습니다. 또한 영어 회화에 어려움을 느꼈을 때는 매일 아침 영어 스터디에 참여하고, 외국인 친구들과 적극적으로 교류하며 실력을 향상시켰습니다. 저는 이러한 경험을 통해 부족함은 노력으로 극복할 수 있다는 믿음을 갖게 되었고, 이는 제 인생의 중요한 동기부여가 되었습니다. 앞으로도 저는 제 약점을 숨기지 않고 이를 개선하기 위해 적극적으로 행동하는 사람이 되겠습니다. 🧗🏻 🛠️ 🚀",
      highlights: ["부족함", "노력", "극복", "비전공자", "경험", "동기부여"],
      postedTime: "POSTED 1 WEEK AGO"
    },
    {
      id: 4,
      profileImage: "/placeholder.svg?height=40&width=40&text=Profile",
      userName: "홍길동 / Hong Gildong",
      category: "핵심역량",
      categoryValue: "하드웨어와 소프트웨어 이해",
      postImage: "/placeholder.svg?height=600&width=600&text=Hardware+Software",
      postImageAlt: "하드웨어와 소프트웨어",
      likeKey: "hardware" as keyof typeof likes,
      content: "로봇 자동화 엔지니어로서의 경험을 통해 저는 하드웨어와 소프트웨어 양쪽을 모두 이해하는 역량을 갖추게 되었습니다. 로봇 제어 시스템을 설계하고 구현하는 과정에서 센서, 모터, 컨트롤러 등의 하드웨어 지식과 함께 제어 알고리즘, 통신 프로토콜, 사용자 인터페이스 등의 소프트웨어 지식을 동시에 활용했습니다. 이러한 경험은 AI와 로봇 기술이 융합되는 현재 시장에서 큰 강점으로 작용하고 있습니다. 특히 웹 개발 분야에서도 서버 인프라와 네트워크에 대한 이해를 바탕으로 더 효율적인 시스템을 설계할 수 있게 되었습니다. 저는 이러한 융합적 사고를 바탕으로 하드웨어와 소프트웨어의 경계를 넘나들며 혁신적인 솔루션을 제공할 수 있는 개발자로 성장하고 있습니다. 🖥️ 🖨️ ⌨️",
      highlights: ["로봇 자동화", "엔지니어", "하드웨어", "소프트웨어", "경험", "AI", "로봇", "웹 개발", "개발자"],
      postedTime: "POSTED 5 DAYS AGO"
    },
    {
      id: 5,
      profileImage: "/placeholder.svg?height=40&width=40&text=Profile",
      userName: "홍길동 / Hong Gildong",
      category: "핵심역량",
      categoryValue: "목표 지향적 사고",
      postImage: "/placeholder.svg?height=600&width=600&text=Goal+Oriented",
      postImageAlt: "목표 지향적 사고",
      likeKey: "goal" as keyof typeof likes,
      content: "저는 명확한 목표를 설정하고 이를 달성하기 위해 체계적으로 계획하고 실행하는 목표 지향적 사고를 가지고 있습니다. 일본에서 개발자로 일하겠다는 목표를 세웠을 때, 저는 먼저 필요한 기술 스택을 분석하고, 학습 계획을 수립한 후, 매일 진행 상황을 체크하며 꾸준히 실행했습니다. 이러한 접근 방식은 프로젝트 관리에서도 큰 강점으로 작용하여, 복잡한 로봇 자동화 프로젝트에서도 명확한 마일스톤을 설정하고 팀원들과 효과적으로 협업하여 성공적으로 프로젝트를 완수할 수 있었습니다. 현재는 AI와 웹 개발 분야에서의 전문성을 높이는 것을 목표로 삼고, 매일 새로운 기술을 학습하고 실제 프로젝트에 적용하며 꾸준히 성장하고 있습니다. 🎯 🏆 ⚙️",
      highlights: ["목표", "계획", "개발자", "로봇 자동화", "프로젝트", "AI", "웹 개발"],
      postedTime: "POSTED 3 DAYS AGO"
    },
    {
      id: 6,
      profileImage: "/placeholder.svg?height=40&width=40&text=Profile",
      userName: "홍길동 / Hong Gildong",
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
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* 떨어지는 별 배경 효과 */}
      <div className="stars-container absolute inset-0 z-0">
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
      
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-xl mx-auto flex items-center">
          <Link href="/" className="mr-4">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-semibold">나의 가치관과 핵심역량</h1>
        </div>
      </header>

      <main className="max-w-xl mx-auto py-4 relative z-1">
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
          />
        ))}
      </main>
    </div>
  );
}
