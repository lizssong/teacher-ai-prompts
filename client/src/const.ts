export interface PromptItem {
  id: string;
  category: string;
  subCategory: string;
  title: string;
  role: string;
  description: string;
  promptText: string;
  tools: ("canva" | "chatgpt" | "gemini" | "flow")[];
  type: "image" | "video" | "text" | "all";
}

export const CATEGORIES = {
  ALL: "전체 보기",
  IMAGE_ART: "🎨 AI아트/이미지",
  VIDEO_SHORTS: "🎬 영상/릴스/쇼츠",
  CLASS_PREP: "📚 수업준비/강의안",
  ADMIN_WORK: "📋 교사업무/행정",
  KIDSNOTE: "😊 알림장/키즈노트",
  BOOK_STORY: "📖 그림책/스토리텔링",
};

export const PROMPTS: PromptItem[] = [
  // 1. AI아트/이미지 카테고리 (어린이집, 유치원, 초등)
  {
    id: "IMG-001",
    category: CATEGORIES.IMAGE_ART,
    subCategory: "입학식/졸업식",
    title: "동화 풍의 따뜻한 입학식 포스터 배경",
    role: "AI 일러스트레이터",
    description: "유치원 및 초등학교 입학식 안내장에 사용할 수 있는 따뜻하고 아기자기한 동화 스타일의 일러스트 배경을 생성합니다. (캔바, ChatGPT 추천)",
    promptText: "A warm and cute fairytale-style illustration of an elementary school entrance ceremony background. Colorful balloons floating in the sunny sky, a welcoming school gate decorated with cute flower arches, green sprouts and cherry blossoms, smiling friendly sun in the corner. Soft pastel color palette, hand-drawn colored pencil texture, cozy and cheerful atmosphere. 8k, highly detailed, empty center space for text placement, --ar 4:3",
    tools: ["canva", "chatgpt"],
    type: "image"
  },
  {
    id: "IMG-002",
    category: CATEGORIES.IMAGE_ART,
    subCategory: "입학식/졸업식",
    title: "3D 디즈니 스타일 졸업식 캐릭터 일러스트",
    role: "3D 캐릭터 아티스트",
    description: "졸업장을 들고 환하게 웃고 있는 귀여운 남녀 어린이 캐릭터를 3D 디즈니/픽사 스타일로 생성합니다. (ChatGPT, 캔바 추천)",
    promptText: "A cute boy and girl holding graduation certificates and smiling brightly, wearing navy blue graduation gowns and caps. 3D Pixar Disney style character design, vibrant colors, soft studio lighting, high-quality clay render, cute big eyes, joyful expressions. Isolated on a clean solid soft-mint background, --ar 1:1",
    tools: ["canva", "chatgpt"],
    type: "image"
  },
  {
    id: "IMG-003",
    category: CATEGORIES.IMAGE_ART,
    subCategory: "아트 스타일",
    title: "리즈·요코·조코 스타일의 교실 마스코트 캐릭터",
    role: "캐릭터 디자이너",
    description: "리즈, 요코, 조코와 같은 귀여운 동물 캐릭터들이 교실에서 함께 공부하고 있는 2D 플랫 일러스트입니다. (캔바, ChatGPT 추천)",
    promptText: "Cute animal mascot characters (a lovely rabbit, a cheerful puppy, and a tiny chick) sitting at a small school desk together, reading a big colorful book in a classroom. 2D flat vector illustration, simple lines, vibrant pastel colors, clean white background, friendly and cozy, highly suitable for kindergarten decoration, --ar 16:9",
    tools: ["canva", "chatgpt"],
    type: "image"
  },
  {
    id: "IMG-004",
    category: CATEGORIES.IMAGE_ART,
    subCategory: "영역별 교구",
    title: "우주와 태양계 과학 교육용 인포그래픽 배경",
    role: "에듀 그래픽 디자이너",
    description: "아이들의 과학 호기심을 자극하는 귀여운 우주선과 행성 일러스트가 포함된 교육용 배경입니다. (캔바, ChatGPT 추천)",
    promptText: "A cute and educational space background for science class. Cartoonish colorful planets (Mars, Saturn, Earth), a friendly smiling sun, a tiny retro rocket ship, and sparkling stars. Deep space blue background, playful paper-cut style, high contrast, visually engaging for children, clean space for educational text, --ar 16:9",
    tools: ["canva", "chatgpt"],
    type: "image"
  },
  {
    id: "IMG-005",
    category: CATEGORIES.IMAGE_ART,
    subCategory: "역사/사회",
    title: "한국 전통 한옥과 한복 입은 아이들 (수채화 풍)",
    role: "동화 수채화 작가",
    description: "한국 전통 명절이나 역사 수업 자료로 쓰기 좋은 한복 입은 아이들과 한옥 풍경의 수채화 일러스트입니다. (캔바, ChatGPT 추천)",
    promptText: "A beautiful watercolor illustration of a traditional Korean Hanok house courtyard. Cute children wearing colorful Hanbok (Korean traditional clothing) playing traditional games (Tuho) and laughing. Soft light, gentle brush strokes, warm golden hour atmosphere, elegant and educational, --ar 4:3",
    tools: ["canva", "chatgpt"],
    type: "image"
  },

  // 2. 영상/릴스/쇼츠 카테고리
  {
    id: "VID-001",
    category: CATEGORIES.VIDEO_SHORTS,
    subCategory: "학급 홍보/쇼츠",
    title: "어린이집/유치원 하루 일과 쇼츠 콘티 및 프롬프트",
    role: "키즈 채널 크리에이티브 디렉터",
    description: "학부모 홍보용 및 학급 브이로그용 쇼츠(9:16) 비디오 제작을 위한 씬별 비주얼 프롬프트와 오디오 대본을 구성합니다. (Flow, 제미나이 추천)",
    promptText: "역할: 전문 키즈 콘텐츠 크리에이터\n\n목표: [어린이집/유치원]의 평화롭고 즐거운 하루 일과를 담은 15초 쇼츠(9:16) 콘티와 비디오 프롬프트를 작성해줘.\n\n[구성 요소]\n1. 0~3초 (등원): 햇살이 비치는 교실로 웃으며 들어오는 아이. 비주얼 프롬프트: 'A cute child running into a bright classroom, warm sunlight, joyful atmosphere, slow motion.'\n2. 3~8초 (수업/놀이): 블록 쌓기를 하며 하이파이브하는 아이들. 비주얼 프롬프트: 'Children building a colorful toy castle together, high-five, laughing, close-up shot.'\n3. 8~12초 (급식/간식): 맛있게 과일을 먹는 아이들의 클로즈업. 비주얼 프롬프트: 'A cute child eating fresh strawberries, smiling, bright and clean kitchen background.'\n4. 12~15초 (하원): 선생님과 인사하며 나가는 아이들. 비주얼 프롬프트: 'A child waving goodbye to the teacher, warm evening light, happy ending.'\n\n각 씬에 들어갈 BGM 분위기(밝고 경쾌한 실로폰 연음)와 자막 가이드라인을 함께 작성해줘.",
    tools: ["chatgpt", "gemini", "flow"],
    type: "video"
  },
  {
    id: "VID-002",
    category: CATEGORIES.VIDEO_SHORTS,
    subCategory: "수업 보조 영상",
    title: "초등 과학 '화산 폭발 실험' 안전 교육 영상 프롬프트",
    role: "교육 영상 PD",
    description: "초등 과학 실험 전 학생들의 집중도를 높이고 안전 수칙을 전달하기 위한 흥미진진한 인트로 영상 프롬프트입니다. (Flow, 제미나이 추천)",
    promptText: "역할: 과학 교육 콘텐츠 영상 연출가\n\n목표: 초등 과학 '화산 폭발 실험' 안전 교육을 위한 30초 인트로 영상의 스토리보드와 생성형 비디오 프롬프트를 작성해줘.\n\n[스토리보드 구성]\n- 씬 1 (호기심 유발): 부글부글 끓어오르는 3D 클레이 스타일의 귀여운 화산. 비디오 프롬프트: 'A cute 3D claymation volcano bubbling with red lava, dramatic but friendly cinematic lighting, 4k.'\n- 씬 2 (안전 장비 착용): 실험 안경과 장갑을 낀 캐릭터 리즈가 엄지를 척 올리는 장면. 비디오 프롬프트: 'A cute rabbit character wearing safety goggles and laboratory gloves, giving a thumbs up, bright background, animated.'\n- 씬 3 (주의 사항): 폭발하는 화산 모형과 뒤로 한 걸음 물러서는 아이들. 비디오 프롬프트: 'A small baking soda volcano erupting on a school desk, children stepping back safely and clapping, slow motion.'\n\n초등학생들이 몰입할 수 있도록 캡션(자막) 문구와 효과음 타이밍을 제미나이/Flow 형식에 맞춰 제공해줘.",
    tools: ["gemini", "flow"],
    type: "video"
  },

  // 3. 수업준비/강의안 카테고리
  {
    id: "CLS-001",
    category: CATEGORIES.CLASS_PREP,
    subCategory: "PPT 강의안",
    title: "초등 사회 '우리 고장의 문화유산' PPT 강의안 및 프롬프트",
    role: "초등 교육 과정 전문가",
    description: "초등학교 3-4학년 대상 사회 수업용 PPT 5슬라이드 분량의 상세 대본과 시각 자료 프롬프트를 원클릭으로 설계합니다. (ChatGPT, 제미나이, 캔바 추천)",
    promptText: "역할: 초등 사회 교육 전문가\n\n목표: 초등 3학년 대상 '우리 고장의 문화유산 탐험' 주제로 5슬라이드 PPT 강의안 및 슬라이드별 시각 자료 생성 프롬프트를 작성해줘.\n\n[슬라이드 구성]\n1. 슬라이드 1: 타이틀 (우리고장 문화유산 탐험대 출발!)\n   - 이미지 프롬프트: 'An ancient Korean treasure map with cute cartoon explorer badges, warm background.'\n2. 슬라이드 2: 문화유산이란 무엇일까요? (유형/무형 문화유산의 정의와 쉬운 예시)\n3. 슬라이드 3: 우리 고장의 대표 문화유산 소개 (교사가 지역명을 입력해 수정할 수 있는 템플릿)\n4. 슬라이드 4: 문화유산을 지키기 위해 우리가 할 수 있는 일\n5. 슬라이드 5: 퀴즈 타임! (오늘 배운 내용을 확인하는 재미있는 객관식/OX 퀴즈 2문제)\n\n학생들이 집중할 수 있는 구어체 대본과 캔바(Canva)에서 바로 활용할 수 있는 슬라이드 레이아웃 팁을 포함해줘.",
    tools: ["canva", "chatgpt", "gemini"],
    type: "text"
  },
  {
    id: "CLS-002",
    category: CATEGORIES.CLASS_PREP,
    subCategory: "영역별 융합",
    title: "누리과정 '자연과 우주' 융합형 놀이 교육 계획안",
    role: "유아교육 학사",
    description: "어린이집/유치원 5세 대상 '우주 여행' 주제의 신체, 미술, 과학 융합 놀이 활동 계획안을 작성합니다. (ChatGPT, 제미나이 추천)",
    promptText: "역할: 유치원 누리과정 교육과정 설계사\n\n목표: 만 5세 유아들을 위한 '반짝반짝 우주 여행' 주제의 융합 놀이 교육 계획안을 작성해줘.\n\n[놀이 영역 구성]\n1. 신체/동작 놀이: 무중력 우주비행사 되어보기 (우주인 훈련 및 우주 걷기 신체 활동)\n2. 미술 놀이: 블랙홀과 은하수 만들기 (물감과 야광 스티커를 활용한 협동 미술)\n3. 과학 놀이: 풍선 로켓 발사 실험 (작용-반작용의 원리를 쉽게 배우는 놀이)\n\n각 활동의 '교사의 발문(질문 예시)', '안전 지도 유의사항', 그리고 '가정 연계 활동'을 학부모 안내용으로 알기 쉽게 정리해줘.",
    tools: ["chatgpt", "gemini"],
    type: "text"
  },

  // 4. 교사업무/행정 카테고리
  {
    id: "ADM-001",
    category: CATEGORIES.ADMIN_WORK,
    subCategory: "업무 효율화",
    title: "노트북LM 기반 '학급 교육과정 설명회' 질의응답 요약 생성기",
    role: "교무부장 교사",
    description: "학기 초 학부모님들께 배포할 학급 교육과정 설명회 자료 및 예상 질문에 대한 답변 요약본을 스마트하게 정리합니다. (ChatGPT, 제미나이 추천)",
    promptText: "역할: 스마트 교육 및 학급 행정 전문가\n\n목표: NotebookLM에 입력할 '학급 교육과정 설명회 안내 및 학부모 안심 가이드 Q&A' 초안을 작성해줘.\n\n[주요 질문 항목]\n1. 올해 학급 경영 철학과 중점 교육 활동은 무엇인가요?\n2. 기초학력 지도 및 독서 교육은 어떻게 진행되나요?\n3. 교우 관계 갈등이나 학교폭력 예방을 위한 학급 규칙은 무엇인가요?\n4. 스마트폰 사용 및 방과후 생활 지도는 어떻게 협조해야 하나요?\n\n학부모님들이 안심하고 교사를 신뢰할 수 있도록 정중하고 신뢰감 있는 어조로 작성해줘. 노트북LM 소스용으로 바로 복사해서 넣을 수 있는 구조화된 마크다운 텍스트로 제공해줘.",
    tools: ["chatgpt", "gemini"],
    type: "text"
  },
  {
    id: "ADM-002",
    category: CATEGORIES.ADMIN_WORK,
    subCategory: "교사 일지",
    title: "어린이집/유치원 일일 보육일지 작성 도우미",
    role: "수석 보육교사",
    description: "하루 동안 진행된 영유아들의 놀이 상황과 개별 관찰 기록을 보육과정 지표에 맞추어 전문적으로 자동 완성합니다. (ChatGPT, 제미나이 추천)",
    promptText: "역할: 평가제 기준에 정통한 보육교사\n\n목표: 아래 놀이 기록과 유아 행동을 바탕으로 평가제 통과 기준에 맞는 '일일 보육일지'와 '유아 관찰 기록'을 작성해줘.\n\n[입력 템플릿]\n- 오늘의 대주제: [예: 봄의 동물과 식물]\n- 소주제/놀이 활동: [예: 실외 놀이터에서 개미 관찰하기]\n- 유아 행동 관찰: [예: 민우가 돋보기로 개미를 보며 '개미가 밥을 먹으러 가요'라고 말함. 서우는 개미를 무서워하며 교사 뒤에 숨음]\n- 보육교사 평가 및 지원 계획: [위 관찰 내용을 토대로 언어, 과학 영역 융합 및 개별 맞춤형 상호작용 기록 작성]\n\n보육교사들의 퇴근 시간을 앞당겨줄 수 있도록, 공문서 양식에 맞추어 격식 있고 간결한 개조식 문체로 작성해줘.",
    tools: ["chatgpt", "gemini", "flow"],
    type: "text"
  },

  // 5. 알림장/키즈노트 카테고리
  {
    id: "KID-001",
    category: CATEGORIES.KIDSNOTE,
    subCategory: "학부모 소통",
    title: "학부모 감동 키즈노트/알림장 만능 템플릿",
    role: "감성 소통 전문가",
    description: "학부모님께 전달할 일일 알림장 문구를 유아의 상황별(칭찬, 갈등 해결, 건강 등)로 감동을 주는 따뜻한 문체로 작성합니다. (ChatGPT, 제미나이 추천)",
    promptText: "역할: 학부모와의 따뜻한 소통을 이끄는 담임 교사\n\n목표: 학부모님께 보낼 키즈노트 알림장 문구를 상황에 맞게 작성해줘.\n\n[상황 선택]\n- 상황: [예: 친구와 놀잇감을 양보하며 사이좋게 놀이함 / 밥을 평소보다 많이 먹고 칭찬받음 / 낮잠 시간에 잠들기 힘들어했으나 토닥여주니 편안히 잠듦]\n- 아동 이름: [예: 지우]\n- 핵심 전달 메시지: [지우가 오늘 교실에서 보여준 긍정적인 행동과 교사의 따뜻한 지도 과정]\n\n[알림장 작성 규칙]\n1. 도입부: 계절이나 날씨에 따른 정겨운 안부 인사.\n2. 본문: 지우의 구체적인 행동 묘사 및 교사가 관찰하며 느낀 감정.\n3. 마무리: 가정에서의 연계 지도 격려 및 교사의 애정 어린 다짐.\n\n학부모님이 읽었을 때 교사의 깊은 관심과 사랑이 느껴지도록 다정하고 세심한 어조로 작성해줘.",
    tools: ["chatgpt", "gemini", "flow"],
    type: "text"
  },

  // 6. 그림책/스토리텔링 카테고리
  {
    id: "BOK-001",
    category: CATEGORIES.BOOK_STORY,
    subCategory: "그림책 제작",
    title: "교실 속 갈등 해결을 위한 창작 동화 스토리보드",
    role: "동화 작가",
    description: "아이들이 자주 겪는 친구 간의 놀잇감 갈등을 스스로 해결할 수 있도록 돕는 6페이지 분량의 창작 동화 글/그림 프롬프트를 기획합니다. (ChatGPT, 캔바 추천)",
    promptText: "역할: 아동 심리 전문 동화 작가\n\n목표: 친구와 장난감을 나누어 쓰는 지혜를 가르쳐주는 6장 분량의 창작 그림책 콘티와 일러스트 프롬프트를 작성해줘.\n\n[등장인물]\n- 토끼 '리즈': 욕심쟁이지만 마음이 여린 캐릭터\n- 다람쥐 '요코': 나누어 놀기를 좋아하는 친절한 캐릭터\n\n[페이지별 구성]\n- 페이지 1: 숲속 놀이터에서 리즈가 혼자 미끄럼틀을 독차지하고 있는 장면.\n  * 일러스트 프롬프트: 'A cute rabbit character Liz sliding down a wooden slide in a sunny forest playground, looking proud, 2D fairytale watercolor style, pastel colors.'\n- 페이지 2: 요코가 같이 타자고 하지만 리즈가 거절하는 장면.\n- 페이지 3: 혼자 놀다가 심심해진 리즈의 모습.\n- 페이지 4: 요코가 다가와 도토리 간식을 나누어 주는 장면.\n- 페이지 5: 감동받은 리즈가 미끄럼틀을 양보하고 함께 타는 장면.\n- 페이지 6: 둘이 손을 잡고 행복하게 웃는 마지막 장면.\n\n각 페이지마다 아이들에게 읽어줄 수 있는 '구연동화 대본'과 '교사의 상호작용 질문'을 포함해줘.",
    tools: ["canva", "chatgpt", "gemini"],
    type: "text"
  }
];
