import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  Search, Copy, Check, Sparkles, Heart, RefreshCw, BookOpen, FileText, 
  Video, Image as ImageIcon, Laptop, MessageSquare, Award, ArrowRight, Star
} from "lucide-react";
import { PROMPTS, CATEGORIES, PromptItem } from "../const";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("전체 보기");
  const [selectedTool, setSelectedTool] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // 명화 만들기 탭 상태
  const [artStyle, setArtStyle] = useState<string>("");
  const [artSubject, setArtStyleSubject] = useState("");
  const [artMood, setArtMood] = useState("");
  const [generatedArtPrompt, setGeneratedArtPrompt] = useState("");

  // 프롬프트 개선기 상태
  const [originalPrompt, setOriginalPrompt] = useState("");
  const [improveDirection, setImproveDirection] = useState("구체적으로");
  const [improvedPrompt, setImprovedPrompt] = useState("");
  const [isImproving, setIsImproving] = useState(false);

  // 1. 프롬프트 필터링
  const filteredPrompts = useMemo(() => {
    return PROMPTS.filter((item) => {
      // 카테고리 필터
      const matchesCategory = 
        selectedCategory === "전체 보기" || item.category === selectedCategory;
      
      // 도구 필터
      const matchesTool = 
        selectedTool === "all" || item.tools.includes(selectedTool as any);
      
      // 검색어 필터
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.promptText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.role.toLowerCase().includes(searchQuery.toLowerCase());

      // 즐겨찾기 필터
      const matchesFavorite = !showFavoritesOnly || favorites.includes(item.id);

      return matchesCategory && matchesTool && matchesSearch && matchesFavorite;
    });
  }, [searchQuery, selectedCategory, selectedTool, favorites, showFavoritesOnly]);

  // 2. 즐겨찾기 토글
  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
    toast.success(
      favorites.includes(id) ? "즐겨찾기에서 해제되었습니다." : "즐겨찾기에 추가되었습니다."
    );
  };

  // 3. 복사 기능
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("프롬프트가 클립보드에 복사되었습니다!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  // 4. 명화 스타일 프롬프트 빌더
  const artStyles = [
    { name: "모네 인상주의", desc: "빛과 색채의 순간적 인상을 포착하는 몽환적 화풍", prompt: "Claude Monet style impressionism, soft brushstrokes, vibrant natural light, shimmering reflections" },
    { name: "반 고흐 후기인상주의", desc: "소용돌이치는 붓터치와 강렬한 감정 표현의 화풍", prompt: "Vincent van Gogh style post-impressionism, swirling brushstrokes, thick impasto texture, intense emotional colors" },
    { name: "클림트 아르누보", desc: "황금빛 장식과 화려한 패턴이 어우러진 상징주의 화풍", prompt: "Gustav Klimt style Art Nouveau, golden leaf details, intricate mosaic patterns, rich decorative textures" },
    { name: "지브리 애니메이션", desc: "따뜻하고 감성적인 수채화 풍의 애니메이션 화풍", prompt: "Studio Ghibli style anime illustration, warm nostalgic watercolor background, hand-drawn aesthetic, charming and detailed" },
    { name: "3D 디즈니/픽사", desc: "귀엽고 입체감 넘치는 고품질 클레이 캐릭터 화풍", prompt: "3D Disney Pixar style, cute clay render, soft volumetric lighting, vibrant colors, expressive cartoon features" },
    { name: "동화책 일러스트", desc: "아기자기한 색연필 텍스트의 감성 동화 화풍", prompt: "Charming fairytale children's book illustration, colored pencil texture, soft pastel colors, whimsical and cozy" }
  ];

  const artMoods = [
    { label: "평화롭고 고요한", value: "peaceful, calm, serene atmosphere" },
    { label: "몽환적이고 신비로운", value: "dreamy, mystical, magical fantasy vibe" },
    { label: "밝고 생동감 있는", value: "bright, cheerful, energetic, full of life" },
    { label: "따뜻하고 아늑한", value: "warm, cozy, nostalgic, soft golden lighting" }
  ];

  const handleGenerateArtPrompt = () => {
    if (!artStyle) {
      toast.error("화풍을 먼저 선택해주세요!");
      return;
    }
    if (!artSubject) {
      toast.error("그리고 싶은 주제를 입력해주세요!");
      return;
    }

    const selectedStyleObj = artStyles.find(s => s.name === artStyle);
    const stylePrompt = selectedStyleObj ? selectedStyleObj.prompt : "";
    const moodPrompt = artMood ? `, ${artMood}` : "";
    
    const finalPrompt = `A high-quality educational illustration of [${artSubject}]. Style: ${stylePrompt}${moodPrompt}. Designed for children, friendly, heartwarming, high resolution, 8k --ar 16:9`;
    
    setGeneratedArtPrompt(finalPrompt);
    toast.success("맞춤형 아트 프롬프트가 발행되었습니다!");
  };

  // 5. 프롬프트 개선 기능 (시뮬레이션)
  const handleImprovePrompt = () => {
    if (!originalPrompt.trim()) {
      toast.error("개선할 원본 프롬프트를 입력해주세요!");
      return;
    }

    setIsImproving(true);
    setTimeout(() => {
      let improved = "";
      if (improveDirection === "구체적으로") {
        improved = `[역할: 초등 교육 및 아동 심리 전문가]\n\n당신은 아동 발달 단계를 깊이 이해하고 있는 전문 교사입니다. 내가 제안한 다음 주제에 대해 아이들이 직관적으로 이해할 수 있도록 구체적인 비주얼 요소와 단계별 상호작용 가이드를 포함하여 발전시켜줘.\n\n주제: ${originalPrompt}\n\n[추가된 구체적 요소]\n- 대상 연령 맞춤화 (어린이집/유치원/초등 저학년)\n- 캔바(Canva)에서 바로 활용 가능한 레이아웃 가이드\n- 시각 자료 생성용 상세 영어 프롬프트 동시 제공`;
      } else if (improveDirection === "창의적으로") {
        improved = `[역할: 창의적 에듀테크 콘텐츠 디렉터]\n\n당신은 교육에 재미를 불어넣는 게이미피케이션(Gamification) 전문가입니다. 다음 프롬프트를 학생들이 주도적으로 참여하고 흥미를 느낄 수 있도록 독창적인 역할극이나 미션 수행 형태로 완전히 새롭게 리디자인해줘.\n\n원본 아이디어: ${originalPrompt}\n\n[창의적 요소]\n- 리즈, 요코, 조코 캐릭터 스토리텔링 연계\n- 미션 카드 형태의 구조화\n- ChatGPT 및 제미나이 멀티모달 상호작용 설계`;
      } else {
        improved = `[역할: 수석 교무교사 및 교육행정 전문가]\n\n당신은 공문서 및 학부모 소통 양식에 정통한 교육 행정 전문가입니다. 다음 내용을 학교 및 교육청 공식 보고서, 혹은 학부모 알림장(키즈노트)에 바로 사용할 수 있도록 격식 있고 품격 있는 문체로 깔끔하게 구조화해줘.\n\n내용: ${originalPrompt}\n\n[개선 방향]\n- 두괄식 개조식 요약 적용\n- 평가제 및 장학 지도 지표 키워드 반영\n- 신뢰감을 주는 정중하고 따뜻한 어조 최적화`;
      }

      setImprovedPrompt(improved);
      setIsImproving(false);
      toast.success("프롬프트가 더 강력하게 개선되었습니다!");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-800 font-sans">
      {/* 1. 프리미엄 헤더 영역 */}
      <header className="border-b border-stone-200 bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-emerald-500 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-stone-900 flex items-center gap-2">
                교사 AI 프롬프트 발행기
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-medium">
                  교사 전용 v1.0
                </Badge>
              </h1>
              <p className="text-xs text-stone-500 font-medium">송민경 AI융합콘텐츠강사 × 위드AI솔루션</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant={showFavoritesOnly ? "default" : "outline"}
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`gap-2 rounded-xl transition-all ${showFavoritesOnly ? "bg-amber-500 hover:bg-amber-600 text-white" : "border-stone-200 hover:bg-stone-50"}`}
            >
              <Star className={`w-4 h-4 ${showFavoritesOnly ? "fill-white" : "text-amber-500"}`} />
              <span>즐겨찾기 {favorites.length > 0 && `(${favorites.length})`}</span>
            </Button>
          </div>
        </div>
      </header>

      {/* 2. 메인 배너 영역 (생성한 고품질 이미지 적용) */}
      <section className="relative overflow-hidden py-16 bg-gradient-to-b from-amber-50/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-amber-100/60 text-amber-800 px-3 py-1.5 rounded-full text-xs font-semibold border border-amber-200">
              <Heart className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
              <span>어린이집 · 유치원 · 초등학교 선생님을 위한 따뜻한 선물</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-stone-900 leading-tight">
              수업 준비부터 행정 업무까지,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-amber-500">
                원클릭 AI 프롬프트 발행기
              </span>
            </h2>
            <p className="text-stone-600 text-base lg:text-lg max-w-xl leading-relaxed">
              캔바(Canva), ChatGPT, 제미나이(Gemini), Flow에 최적화된 고품질 교육용 프롬프트입니다. 영유아 맞춤형 아트부터 학부모 소통 키즈노트까지 지금 바로 경험해 보세요.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-sm text-xs font-medium">
                <Badge className="bg-emerald-500 text-white p-1 rounded h-4 w-4 flex items-center justify-center">C</Badge> 캔바 디자인
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-sm text-xs font-medium">
                <Badge className="bg-green-600 text-white p-1 rounded h-4 w-4 flex items-center justify-center">G</Badge> ChatGPT
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-sm text-xs font-medium">
                <Badge className="bg-blue-500 text-white p-1 rounded h-4 w-4 flex items-center justify-center">Ge</Badge> 제미나이
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-sm text-xs font-medium">
                <Badge className="bg-purple-500 text-white p-1 rounded h-4 w-4 flex items-center justify-center">F</Badge> Flow 비디오
              </div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/114049990/LEiZ7jpjp3X5gW2d4TrC49/teacher-banner-iXxDy7WugTUNYvotVmKEHj.webp" 
                alt="따뜻한 교실 일러스트" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                <p className="text-xs font-medium text-amber-200">리즈·요코·조코의 행복한 교실</p>
                <p className="text-sm font-bold">선생님들의 행복한 교육 라이프를 응원합니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 메인 기능 탭 컨테이너 */}
      <main className="max-w-7xl mx-auto px-4 pb-24">
        <Tabs defaultValue="prompts" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 lg:w-[600px] bg-stone-100 p-1 rounded-2xl border border-stone-200">
            <TabsTrigger value="prompts" className="rounded-xl font-semibold text-sm py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <BookOpen className="w-4 h-4 mr-2" /> 프롬프트 100선
            </TabsTrigger>
            <TabsTrigger value="art-maker" className="rounded-xl font-semibold text-sm py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <ImageIcon className="w-4 h-4 mr-2" /> 명화 아트 만들기
            </TabsTrigger>
            <TabsTrigger value="improver" className="rounded-xl font-semibold text-sm py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <RefreshCw className="w-4 h-4 mr-2" /> 프롬프트 개선기
            </TabsTrigger>
          </TabsList>

          {/* 탭 1: 프롬프트 100선 */}
          <TabsContent value="prompts" className="space-y-8">
            {/* 검색 및 필터 패널 */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-6">
              <div className="grid md:grid-cols-12 gap-4">
                <div className="md:col-span-8 relative">
                  <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5" />
                  <Input 
                    type="text" 
                    placeholder="프롬프트 제목, 내용, 키워드로 검색해보세요..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-11 h-12 bg-stone-50 border-stone-200 focus:bg-white rounded-xl text-sm"
                  />
                </div>
                <div className="md:col-span-4">
                  <select 
                    value={selectedTool}
                    onChange={(e) => setSelectedTool(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-stone-200 bg-stone-50 text-sm font-semibold text-stone-700 focus:outline-none focus:bg-white cursor-pointer"
                  >
                    <option value="all">모든 AI 도구 최적화</option>
                    <option value="canva">🎨 캔바 (Canva)</option>
                    <option value="chatgpt">🤖 ChatGPT</option>
                    <option value="gemini">✨ 제미나이 (Gemini)</option>
                    <option value="flow">🎬 Flow 비디오</option>
                  </select>
                </div>
              </div>

              {/* 카테고리 가로 스크롤 필터 */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {Object.values(CATEGORIES).map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full px-4 py-1.5 h-auto text-xs font-bold transition-all shrink-0 ${
                      selectedCategory === cat 
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                        : "border-stone-200 hover:bg-stone-50 text-stone-600"
                    }`}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>

            {/* 결과 건수 */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-stone-500">
                검색 결과 <span className="text-emerald-600 font-extrabold">{filteredPrompts.length}</span>건의 프롬프트가 있습니다.
              </p>
            </div>

            {/* 프롬프트 그리드 */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrompts.map((item) => (
                <Card key={item.id} className="bg-white border-stone-200 hover:border-emerald-300 hover:shadow-md transition-all rounded-2xl overflow-hidden flex flex-col h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="bg-stone-50 border-stone-200 text-stone-600 text-[10px] font-bold">
                        {item.subCategory}
                      </Badge>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => toggleFavorite(item.id)}
                        className="h-8 w-8 text-stone-400 hover:text-amber-500"
                      >
                        <Star className={`w-4 h-4 ${favorites.includes(item.id) ? "fill-amber-400 text-amber-500" : ""}`} />
                      </Button>
                    </div>
                    <CardTitle className="text-lg font-bold text-stone-900 leading-snug line-clamp-1">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" /> 역할: {item.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4 flex-grow space-y-3">
                    <p className="text-xs text-stone-500 leading-relaxed line-clamp-3 bg-stone-50 p-3 rounded-xl">
                      {item.description}
                    </p>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">최적화 도구</span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.tools.map(tool => (
                          <Badge 
                            key={tool} 
                            variant="secondary" 
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                              tool === 'canva' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                              tool === 'chatgpt' ? 'bg-green-50 text-green-700 border border-green-200' :
                              tool === 'gemini' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                              'bg-purple-50 text-purple-700 border border-purple-200'
                            }`}
                          >
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 border-t border-stone-100 bg-stone-50/50 p-4">
                    <Button 
                      onClick={() => handleCopy(item.promptText, item.id)}
                      className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold py-5"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-4 h-4" /> 복사 완료!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" /> 프롬프트 복사하기
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}

              {filteredPrompts.length === 0 && (
                <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-stone-200">
                  <FileText className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                  <p className="text-stone-500 font-semibold">검색 조건에 맞는 프롬프트가 없습니다.</p>
                  <p className="text-xs text-stone-400 mt-1">다른 검색어나 카테고리를 선택해 보세요.</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* 탭 2: 명화 아트 만들기 */}
          <TabsContent value="art-maker" className="space-y-8">
            <div className="grid lg:grid-cols-12 gap-8">
              {/* 왼쪽: 빌더 옵션 */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-6">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-stone-800 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">1</span>
                      명화 화풍 스타일 선택
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {artStyles.map((style) => (
                        <button
                          key={style.name}
                          onClick={() => setArtStyle(style.name)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            artStyle === style.name
                              ? "border-emerald-500 bg-emerald-50/50 ring-1 ring-emerald-500"
                              : "border-stone-200 hover:border-stone-300 hover:bg-stone-50"
                          }`}
                        >
                          <p className="text-xs font-bold text-stone-900">{style.name}</p>
                          <p className="text-[10px] text-stone-500 mt-1 line-clamp-1">{style.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-bold text-stone-800 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">2</span>
                      그리고 싶은 주제 입력
                    </label>
                    <Input
                      type="text"
                      placeholder="예: 봄날의 벚꽃 나무 아래 소풍 나온 고양이 가족"
                      value={artSubject}
                      onChange={(e) => setArtStyleSubject(e.target.value)}
                      className="h-11 bg-stone-50 border-stone-200 focus:bg-white rounded-xl text-sm"
                    />
                    <div className="flex flex-wrap gap-1.5">
                      {["봄날의 벚꽃 교실", "우주를 나는 아기 토끼", "가을 단풍 아래 한옥", "신비로운 바닷속 고래"].map((rec) => (
                        <button
                          key={rec}
                          onClick={() => setArtStyleSubject(rec)}
                          className="text-[10px] font-bold bg-stone-100 hover:bg-stone-200 text-stone-600 px-2 py-1 rounded-md"
                        >
                          {rec}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-bold text-stone-800 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">3</span>
                      분위기 선택 (선택사항)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {artMoods.map((mood) => (
                        <button
                          key={mood.label}
                          onClick={() => setArtMood(artMood === mood.value ? "" : mood.value)}
                          className={`p-2 rounded-xl border text-center text-xs font-semibold transition-all ${
                            artMood === mood.value
                              ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                              : "border-stone-200 hover:bg-stone-50"
                          }`}
                        >
                          {mood.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handleGenerateArtPrompt}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold py-6"
                  >
                    <Sparkles className="w-4 h-4 mr-2" /> 나만의 아트 프롬프트 발행하기
                  </Button>
                </div>
              </div>

              {/* 오른쪽: 결과 및 복사 */}
              <div className="lg:col-span-7">
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm h-full flex flex-col justify-between space-y-6">
                  <div className="space-y-4 flex-grow">
                    <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                      <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-amber-500" /> 발행된 맞춤형 프롬프트
                      </h3>
                      {generatedArtPrompt && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setArtStyle("");
                            setArtStyleSubject("");
                            setArtMood("");
                            setGeneratedArtPrompt("");
                          }}
                          className="text-xs text-stone-400 hover:text-stone-600"
                        >
                          초기화
                        </Button>
                      )}
                    </div>

                    {generatedArtPrompt ? (
                      <div className="space-y-4">
                        <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 font-mono text-xs leading-relaxed text-stone-700 select-all whitespace-pre-wrap">
                          {generatedArtPrompt}
                        </div>
                        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-800 space-y-2">
                          <p className="font-bold">💡 추천 사용법:</p>
                          <p className="leading-relaxed">
                            발행된 영문 프롬프트를 복사하여 <strong>ChatGPT (DALL-E 3)</strong>, <strong>캔바 AI 이미지 생성기</strong>에 붙여넣으면 원하는 스타일의 교육용 일러스트가 고화질로 생성됩니다.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="py-20 text-center text-stone-400 space-y-3">
                        <ImageIcon className="w-12 h-12 text-stone-200 mx-auto" />
                        <p className="font-bold text-sm">왼쪽에서 스타일과 주제를 입력한 후 발행 버튼을 누르세요!</p>
                        <p className="text-xs text-stone-400">교실 꾸미기, 교구 제작, 그림책 만들기에 유용한 아트 프롬프트가 자동 생성됩니다.</p>
                      </div>
                    )}
                  </div>

                  {generatedArtPrompt && (
                    <Button
                      onClick={() => handleCopy(generatedArtPrompt, "art-gen")}
                      className="w-full bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold py-6"
                    >
                      <Copy className="w-4 h-4 mr-2" /> 프롬프트 복사하기
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* 탭 3: 프롬프트 개선기 */}
          <TabsContent value="improver" className="space-y-8">
            <div className="grid lg:grid-cols-12 gap-8">
              {/* 왼쪽: 입력 및 개선 옵션 */}
              <div className="lg:col-span-6 space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-6">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-stone-800">
                      개선할 원본 아이디어 또는 프롬프트 입력
                    </label>
                    <Textarea
                      placeholder="예: 초등학교 1학년 수학 덧셈을 재미있게 가르칠 수 있는 아이디어와 수업자료 프롬프트 만들어줘."
                      value={originalPrompt}
                      onChange={(e) => setOriginalPrompt(e.target.value)}
                      className="min-h-[180px] bg-stone-50 border-stone-200 focus:bg-white rounded-2xl text-sm p-4 leading-relaxed"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-bold text-stone-800">
                      원하는 개선 방향 선택
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: "더 구체적으로", value: "구체적으로", desc: "연령별 맞춤 및 상세가이드" },
                        { label: "더 창의적으로", value: "창의적으로", desc: "게이미피케이션 및 스토리" },
                        { label: "더 전문적으로", value: "전문적으로", desc: "평가제 및 행정용 구조화" }
                      ].map((dir) => (
                        <button
                          key={dir.value}
                          onClick={() => setImproveDirection(dir.value)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            improveDirection === dir.value
                              ? "border-emerald-500 bg-emerald-50/50 ring-1 ring-emerald-500"
                              : "border-stone-200 hover:bg-stone-50"
                          }`}
                        >
                          <p className="text-xs font-bold text-stone-900">{dir.label}</p>
                          <p className="text-[9px] text-stone-500 mt-1">{dir.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handleImprovePrompt}
                    disabled={isImproving}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold py-6"
                  >
                    {isImproving ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> 프롬프트 개선 중...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" /> AI 프롬프트 개선하기
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* 오른쪽: 개선된 프롬프트 결과 */}
              <div className="lg:col-span-6">
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm h-full flex flex-col justify-between space-y-6">
                  <div className="space-y-4 flex-grow">
                    <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                      <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-emerald-600" /> 개선 완료된 고품질 프롬프트
                      </h3>
                      {improvedPrompt && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setOriginalPrompt("");
                            setImprovedPrompt("");
                          }}
                          className="text-xs text-stone-400 hover:text-stone-600"
                        >
                          초기화
                        </Button>
                      )}
                    </div>

                    {improvedPrompt ? (
                      <div className="space-y-4">
                        <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 font-mono text-xs leading-relaxed text-stone-700 whitespace-pre-wrap select-all">
                          {improvedPrompt}
                        </div>
                        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-xs text-emerald-800">
                          <p className="font-bold">✨ 교사 맞춤형 개선 팁:</p>
                          <p className="leading-relaxed mt-1">
                            개선된 프롬프트에는 교육 현장에 바로 투입할 수 있도록 <strong>교사 역할 부여(Role-Playing)</strong>, <strong>구조화된 출력 형식</strong>이 자동으로 탑재되어 더 명확한 AI 결과물을 도출해 냅니다.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="py-24 text-center text-stone-400 space-y-3">
                        <RefreshCw className="w-12 h-12 text-stone-200 mx-auto" />
                        <p className="font-bold text-sm">왼쪽에 아이디어를 입력하고 개선 버튼을 누르세요!</p>
                        <p className="text-xs text-stone-400">교안 설계, 관찰 일지 등 모호한 프롬프트가 최적화된 마스터 프롬프트로 재탄생합니다.</p>
                      </div>
                    )}
                  </div>

                  {improvedPrompt && (
                    <Button
                      onClick={() => handleCopy(improvedPrompt, "improved-gen")}
                      className="w-full bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold py-6"
                    >
                      <Copy className="w-4 h-4 mr-2" /> 개선된 프롬프트 복사하기
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* 푸터 영역 */}
      <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h4 className="text-white font-bold text-lg mb-2">교사 AI 프롬프트 발행기</h4>
            <p className="text-sm">어린이집, 유치원, 초등학교 선생님들의 행정 업무와 수업 준비를 스마트하게 지원합니다.</p>
            <p className="text-xs text-stone-500 mt-4">© 2026 송민경 AI융합콘텐츠강사 × 위드AI솔루션. All rights reserved.</p>
          </div>
          <div className="md:text-right space-y-2">
            <p className="text-sm font-semibold text-white">송민경 AI융합마케팅콘텐츠 강사</p>
            <p className="text-xs">크리메타쏭 대표 · 캔바지국장 · 캐릭터 리즈/요코/조코 작가</p>
            <p className="text-xs">생성형 AI, 캔바, 캐릭터이모티콘디자인 전문 강의 및 컨설팅</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
