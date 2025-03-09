"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, MessageCircle, Bookmark, Share2, ArrowLeft } from "lucide-react"

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
        {/* 도전정신 Post */}
        <div className="bg-white border border-gray-200 rounded-md mb-6">
          <div className="p-4 flex items-center">
            <Image
              src="/placeholder.svg?height=40&width=40&text=Profile"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="ml-3">
              <p className="font-semibold">홍길동 / Hong Gildong</p>
              <p className="text-xs text-gray-500">가치관: 도전정신</p>
            </div>
          </div>

          <Image
            src="/placeholder.svg?height=600&width=600&text=Challenge+Spirit"
            alt="도전정신"
            width={600}
            height={600}
            className="w-full h-auto"
          />

          <div className="p-4">
            <div className="flex justify-between mb-2">
              <div className="flex space-x-4">
                <button onClick={() => handleLike("reason")} className="flex items-center">
                  <Heart className={`h-6 w-6 ${likes.reason > 124 ? "fill-red-500 text-red-500" : ""}`} />
                </button>
                <button className="flex items-center">
                  <MessageCircle className="h-6 w-6" />
                </button>
                <button className="flex items-center">
                  <Share2 className="h-6 w-6" />
                </button>
              </div>
              <button className="flex items-center">
                <Bookmark className="h-6 w-6" />
              </button>
            </div>

            <p className="font-semibold mb-1">{likes.reason} likes</p>

            <div className="mb-2">
              <span className="font-semibold">hongGD</span>{" "}
              <span>
                저의 인생에서 가장 중요한 가치 중 하나는 <strong className="text-blue-600">"세상에 하지 못할 일은 없다"</strong>는 <strong className="text-blue-600">도전정신</strong>입니다. 대학 시절, 남들보다 늦게 러시아어에 도전했지만, 결심한 순간부터 끝까지 해내겠다는 다짐으로 유튜브를 활용한 집중적 학습과 러시아 유학 중 현지 학생들과의 언어 교환을 통해 능력을 향상시켜 관련 자격증을 취득했습니다.
                또한, 해외에서 <strong className="text-blue-600">엔지니어</strong>로 일하고 싶다는 목표로 <strong className="text-blue-600">개발자</strong> 교육에 도전하여 약 1년간의 준비 끝에 일본 <strong className="text-blue-600">개발자</strong>로서 <strong className="text-blue-600">경험</strong>을 쌓았습니다. 이후 <strong className="text-blue-600">로봇 자동화</strong> 분야에서 일하며 일본과 중국의 현장을 <strong className="text-blue-600">경험</strong>했고, 최근에는 웹 <strong className="text-blue-600">개발</strong>과 <strong className="text-blue-600">AI</strong> 기술 분야로 영역을 확장하고 있습니다.
              </span>
            </div>

            <p className="text-gray-500 text-xs">POSTED 2 WEEKS AGO</p>
          </div>
        </div>

        {/* 미래 기술에 대한 확신 Post */}
        <div className="bg-white border border-gray-200 rounded-md mb-6">
          <div className="p-4 flex items-center">
            <Image
              src="/placeholder.svg?height=40&width=40&text=Profile"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="ml-3">
              <p className="font-semibold">홍길동 / Hong Gildong</p>
              <p className="text-xs text-gray-500">가치관: 미래 기술에 대한 확신</p>
            </div>
          </div>

          <Image
            src="/placeholder.svg?height=600&width=600&text=Future+Technology"
            alt="미래 기술"
            width={600}
            height={600}
            className="w-full h-auto"
          />

          <div className="p-4">
            <div className="flex justify-between mb-2">
              <div className="flex space-x-4">
                <button onClick={() => handleLike("code")} className="flex items-center">
                  <Heart className={`h-6 w-6 ${likes.code > 89 ? "fill-red-500 text-red-500" : ""}`} />
                </button>
                <button className="flex items-center">
                  <MessageCircle className="h-6 w-6" />
                </button>
                <button className="flex items-center">
                  <Share2 className="h-6 w-6" />
                </button>
              </div>
              <button className="flex items-center">
                <Bookmark className="h-6 w-6" />
              </button>
            </div>

            <p className="font-semibold mb-1">{likes.code} likes</p>

            <div className="mb-2">
              <span className="font-semibold">hongGD</span>{" "}
              <span>
                2010년대 초 가상화폐가 무존재성으로 인해 가치가 없을 것이라는 일반적 판단이 현재의 미중 가상화폐 주도권 쟁탈전을 보며 완전히 빗나갔듯이, <strong className="text-blue-600">AI</strong> 역시 상용화가 먼 미래라는 예상과 달리 LLM, RAG 기법으로 무장한 <strong className="text-blue-600">AI</strong>는 이미 다양한 분야에서 활용되고 있습니다.
                OpenAI와 중국 유니트리의 인간형 <strong className="text-blue-600">로봇</strong> <strong className="text-blue-600">개발</strong>이 보여주듯, 현재의 기술 지표는 미래가 인공지능 <strong className="text-blue-600">로봇</strong> 중심으로 재편될 것임을 명확히 나타내고 있습니다. 저는 이러한 기술 혁신의 흐름에 확신을 가지고, 인공지능 <strong className="text-blue-600">로봇</strong> 상용화 시대에 준비된 전문가가 되기 위해 끊임없이 학습하고 도전하고 있습니다. 이미 알고 있었던 미래에 대해서 대비를 하지 못했던 <strong className="text-blue-600">경험</strong>이 있습니다. 다시 이를 반복하지 않겠습니다.
              </span>
            </div>

            <p className="text-gray-500 text-xs">POSTED 10 DAYS AGO</p>
          </div>
        </div>

        {/* 부족을 극복하는 사람 Post */}
        <div className="bg-white border border-gray-200 rounded-md mb-6">
          <div className="p-4 flex items-center">
            <Image
              src="/placeholder.svg?height=40&width=40&text=Profile"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="ml-3">
              <p className="font-semibold">홍길동 / Hong Gildong</p>
              <p className="text-xs text-gray-500">핵심역량: 부족을 극복하는 사람</p>
            </div>
          </div>

          <Image
            src="/placeholder.svg?height=600&width=600&text=Overcoming+Challenges"
            alt="부족 극복"
            width={600}
            height={600}
            className="w-full h-auto"
          />

          <div className="p-4">
            <div className="flex justify-between mb-2">
              <div className="flex space-x-4">
                <button onClick={() => handleLike("dream")} className="flex items-center">
                  <Heart className={`h-6 w-6 ${likes.dream > 156 ? "fill-red-500 text-red-500" : ""}`} />
                </button>
                <button className="flex items-center">
                  <MessageCircle className="h-6 w-6" />
                </button>
                <button className="flex items-center">
                  <Share2 className="h-6 w-6" />
                </button>
              </div>
              <button className="flex items-center">
                <Bookmark className="h-6 w-6" />
              </button>
            </div>

            <p className="font-semibold mb-1">{likes.goal} likes</p>

            <div className="mb-2">
              <span className="font-semibold">hongGD</span>{" "}
              <span>
                <strong className="text-blue-600">자동화</strong> 장비 <strong className="text-blue-600">개발 경험</strong>을 통해 현장의 실질적 니즈를 직접 파악하고 적용하는 과정에서 큰 보람을 느꼈습니다. 일본과 중국의 엔지니어 및 클라이언트와 직접 소통하며 제 언어 능력을 활용할 수 있었고, 지방 및 해외 현장을 방문하는 과정도 즐거웠습니다. 특히 "생산이 원활해졌다", "에러가 해결됐다", "이전 장비보다 훨씬 좋다"는 현장의 피드백은 큰 자신감을 심어주었습니다.
                그러나 디자인적 측면과 사용자 <strong className="text-blue-600">경험</strong> 부분에서 부족함을 느꼈습니다. API 활용과 서버에 대한 이해 부족, C#에서의 제한된 UI 디자인 등 UX와 사용자 니즈 측면에서 개선이 필요함을 인식했습니다. 이를 보완하기 위해 개인적인 학습을 진행하다가 지인의 제안을 통해서 챗봇 <strong className="text-blue-600">개발</strong> 웹 스타트업에서 관련 <strong className="text-blue-600">경험</strong>을 쌓게 되었습니다.
              </span>
            </div>

            <p className="text-gray-500 text-xs">POSTED 1 WEEK AGO</p>
          </div>
        </div>

        {/* 로봇 하드웨어에 대한 이해와 경험 Post */}
<div className="bg-white border border-gray-200 rounded-md mb-6">
  <div className="p-4 flex items-center">
    <Image
      src="/placeholder.svg?height=40&width=40&text=Profile"
      alt="Profile"
      width={40}
      height={40}
      className="rounded-full"
    />
    <div className="ml-3">
      <p className="font-semibold">홍길동 / Hong Gildong</p>
      <p className="text-xs text-gray-500">핵심역량: 로봇 하드웨어에 대한 이해와 경험</p>
    </div>
  </div>

  <Image
    src="/placeholder.svg?height=600&width=600&text=Robot+Hardware+Experience"
    alt="로봇 하드웨어 경험"
    width={600}
    height={600}
    className="w-full h-auto"
  />

  <div className="p-4">
    <div className="flex justify-between mb-2">
      <div className="flex space-x-4">
        <button onClick={() => handleLike("hardware")} className="flex items-center">
          <Heart className={`h-6 w-6 ${likes.hardware > 130 ? "fill-red-500 text-red-500" : ""}`} />
        </button>
        <button className="flex items-center">
          <MessageCircle className="h-6 w-6" />
        </button>
        <button className="flex items-center">
          <Share2 className="h-6 w-6" />
        </button>
      </div>
      <button className="flex items-center">
        <Bookmark className="h-6 w-6" />
      </button>
    </div>

    <p className="font-semibold mb-1">{likes.hardware} likes</p>

    <div className="mb-2">
      <span className="font-semibold">hongGD</span>{" "}
      <span>
        코로나라는 특수 상황에서 일본과 중국 현장을 직접 <strong className="text-blue-600">경험</strong>하며 인력 부족으로 하드웨어적 수정을 직접 진행했습니다. 장비 셋업 과정에서 작업 패스라인 조정, 다축 움직임에 따른 진동 및 불협화음 측정, 개선 방안 도출 등을 통해 프로그램이 <strong className="text-blue-600">로봇</strong>에 미치는 영향을 실제로 <strong className="text-blue-600">경험</strong>했습니다. 
        사내 셋업 환경에서의 조명 차이, 장비의 운송시의 렌즈 파손 등 이러한 <strong className="text-blue-600">경험</strong>은 <strong className="text-blue-600">코드</strong>만으로는 볼 수 없는 하드웨어의 현실 및 <strong className="text-blue-600">로봇 개발자</strong>로서의 염두해둬야할 디테일을 파악하게 해주었고, 생산 시퀀스의 효율화(진동 제거) 및 사용자 경험 설계에 적용할 수 있었습니다.
      </span>
    </div>

    <p className="text-gray-500 text-xs">POSTED 5 DAYS AGO</p>
  </div>
</div>

{/* 코드 품질에 대한 중시 Post */}
<div className="bg-white border border-gray-200 rounded-md mb-6">
  <div className="p-4 flex items-center">
    <Image
      src="/placeholder.svg?height=40&width=40&text=Profile"
      alt="Profile"
      width={40}
      height={40}
      className="rounded-full"
    />
    <div className="ml-3">
      <p className="font-semibold">홍길동 / Hong Gildong</p>
      <p className="text-xs text-gray-500">핵심역량: 코드 품질에 대한 중시</p>
    </div>
  </div>

  <Image
    src="/placeholder.svg?height=600&width=600&text=Code+Quality"
    alt="코드 품질"
    width={600}
    height={600}
    className="w-full h-auto"
  />

  <div className="p-4">
    <div className="flex justify-between mb-2">
      <div className="flex space-x-4">
        <button onClick={() => handleLike("code")} className="flex items-center">
          <Heart className={`h-6 w-6 ${likes.code > 105 ? "fill-red-500 text-red-500" : ""}`} />
        </button>
        <button className="flex items-center">
          <MessageCircle className="h-6 w-6" />
        </button>
        <button className="flex items-center">
          <Share2 className="h-6 w-6" />
        </button>
      </div>
      <button className="flex items-center">
        <Bookmark className="h-6 w-6" />
      </button>
    </div>

    <p className="font-semibold mb-1">{likes.code} likes</p>

    <div className="mb-2">
      <span className="font-semibold">hongGD</span>{" "}
      <span>
        처음 <strong className="text-blue-600">자동화</strong> 장비를 접했을 때는 기존 <strong className="text-blue-600">코드</strong> 수정에 두려움이 많았습니다. 컴파일러가 알려주는 수많은 버그와 예상치 못한 사이드 이펙트에 대한 우려로 변화에 보수적이었고, "돌아가기만 하면 된다"는 사고방식을 가지고 있었습니다.
        하지만 챗봇 <strong className="text-blue-600">개발</strong> 과정에서 SOLID 원칙에 따른 <strong className="text-blue-600">개발</strong> 방법론을 접하게 되면서 <strong className="text-blue-600">코드</strong>의 간결성과 구조화의 중요성을 깨달았습니다. 단순히 작동하는 <strong className="text-blue-600">코드</strong>를 넘어, 유지보수가 용이하고 확장 가능한 <strong className="text-blue-600">코드</strong> 작성의 가치를 인식하게 되었습니다. 이러한 <strong className="text-blue-600">경험</strong>은 제 <strong className="text-blue-600">개발</strong> 철학을 근본적으로 변화시켰으며, 더 나은 <strong className="text-blue-600">코드</strong>를 작성하기 위한 끊임없는 노력으로 이어지고 있습니다.
      </span>
    </div>

    <p className="text-gray-500 text-xs">POSTED 1 WEEK AGO</p>
  </div>
</div>

{/* AI 기술의 적극적 활용 Post */}
<div className="bg-white border border-gray-200 rounded-md mb-6">
  <div className="p-4 flex items-center">
    <Image
      src="/placeholder.svg?height=40&width=40&text=Profile"
      alt="Profile"
      width={40}
      height={40}
      className="rounded-full"
    />
    <div className="ml-3">
      <p className="font-semibold">홍길동 / Hong Gildong</p>
      <p className="text-xs text-gray-500">핵심역량: AI 기술의 적극적 활용</p>
    </div>
  </div>

  <Image
    src="/placeholder.svg?height=600&width=600&text=AI+Technology+Application"
    alt="AI 기술 활용"
    width={600}
    height={600}
    className="w-full h-auto"
  />

  <div className="p-4">
    <div className="flex justify-between mb-2">
      <div className="flex space-x-4">
        <button onClick={() => handleLike("ai")} className="flex items-center">
          <Heart className={`h-6 w-6 ${likes.ai > 142 ? "fill-red-500 text-red-500" : ""}`} />
        </button>
        <button className="flex items-center">
          <MessageCircle className="h-6 w-6" />
        </button>
        <button className="flex items-center">
          <Share2 className="h-6 w-6" />
        </button>
      </div>
      <button className="flex items-center">
        <Bookmark className="h-6 w-6" />
      </button>
    </div>

    <p className="font-semibold mb-1">{likes.ai} likes</p>

    <div className="mb-2">
      <span className="font-semibold">hongGD</span>{" "}
      <span>
        최근에는 <strong className="text-blue-600">AI</strong> 도구를 적극 활용하면서 생산성 향상을 <strong className="text-blue-600">경험</strong>했습니다. <strong className="text-blue-600">코드</strong> 작성, 디버깅, 문서화 등 다양한 영역에서 <strong className="text-blue-600">AI</strong> 도구를 활용함으로써 오류를 줄이고 <strong className="text-blue-600">개발</strong> 과정을 더욱 즐겁게 만들 수 있었습니다. 특히 DeepSeek Local 버전을 활용한 프로그램의 <strong className="text-blue-600">AI</strong>화에 관심을 갖고 학습하고 있습니다.
        이러한 <strong className="text-blue-600">경험</strong>을 통해 <strong className="text-blue-600">AI</strong> 기술 관련 뉴스와 동향에 지속적인 관심을 갖게 되었고, <strong className="text-blue-600">로봇 자동화</strong> 분야에 최신 <strong className="text-blue-600">AI</strong> 기술을 어떻게 적용할 수 있을지 항상 고민하게 되었습니다. 저는 이러한 UI/UX와 <strong className="text-blue-600">AI 경험</strong>을 <strong className="text-blue-600">자동화 로봇</strong> 분야에 다시 적용하고 싶은 열망이 있습니다.
      </span>
    </div>

    <p className="text-gray-500 text-xs">POSTED 2 DAYS AGO</p>
  </div>
</div>

      </main>
      <style jsx>{`
        .stars-container {
          z-index: 0;
        }
        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          animation: fall linear;
        }
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(960deg);
          }
        }
      `}</style>
    </div>
  )
}
