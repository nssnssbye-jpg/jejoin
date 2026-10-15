export type DashboardRole = "buyer" | "seller" | "admin";

export type IconName =
  | "home"
  | "search"
  | "message"
  | "bookmark"
  | "box"
  | "chart"
  | "upload"
  | "users"
  | "shield"
  | "settings";

type NavigationItem = {
  label: string;
  icon: IconName;
};

type Stat = {
  label: string;
  value: string;
  change: string;
  positive: boolean;
};

type Task = {
  title: string;
  detail: string;
  tone: "mint" | "amber" | "blue";
};

type Activity = {
  title: string;
  detail: string;
  time: string;
  icon: IconName;
};

export type DashboardContent = {
  role: DashboardRole;
  roleLabel: string;
  name: string;
  initials: string;
  title: string;
  description: string;
  action: string;
  actionHref: string;
  nav: NavigationItem[];
  stats: Stat[];
  chartTitle: string;
  chartCaption: string;
  chartValues: number[];
  tasks: Task[];
  activities: Activity[];
};

export const dashboardData: Record<DashboardRole, DashboardContent> = {
  buyer: {
    role: "buyer",
    roleLabel: "구매자 워크스페이스",
    name: "김민서",
    initials: "김",
    title: "필요한 제품을 더 빠르게 찾아보세요.",
    description: "관심 제품과 문의 현황을 한곳에서 확인할 수 있어요.",
    action: "AI로 제품 찾기",
    actionHref: "/#discovery",
    nav: [
      { label: "홈", icon: "home" },
      { label: "제품 찾기", icon: "search" },
      { label: "문의", icon: "message" },
      { label: "저장 목록", icon: "bookmark" },
    ],
    stats: [
      { label: "진행 중인 문의", value: "4", change: "+2 이번 주", positive: true },
      { label: "저장한 제품", value: "18", change: "+5 이번 달", positive: true },
      { label: "새로운 답변", value: "3", change: "확인 필요", positive: true },
    ],
    chartTitle: "제품 탐색 활동",
    chartCaption: "최근 7일 동안 42개 제품을 확인했어요.",
    chartValues: [34, 52, 40, 74, 58, 86, 64],
    tasks: [
      { title: "견적 답변 확인", detail: "세진테크 외 2개 판매자가 답변했어요.", tone: "mint" },
      { title: "저장 목록 검토", detail: "유사한 신제품 6개가 추가됐어요.", tone: "blue" },
      { title: "문의 정보 보완", detail: "납기 희망일을 입력해 주세요.", tone: "amber" },
    ],
    activities: [
      { title: "산업용 공기청정기 문의", detail: "판매자 답변이 도착했습니다.", time: "12분 전", icon: "message" },
      { title: "스마트 물류 센서 저장", detail: "Global 등급 · 태성IoT", time: "어제", icon: "bookmark" },
      { title: "식품 포장 설비 검색", detail: "관련 제품 24개를 확인했습니다.", time: "2일 전", icon: "search" },
    ],
  },
  seller: {
    role: "seller",
    roleLabel: "판매자 워크스페이스",
    name: "세진테크",
    initials: "세",
    title: "제품이 새로운 바이어를 만나고 있어요.",
    description: "브로셔 성과와 들어온 문의를 확인하고 다음 기회를 준비하세요.",
    action: "브로셔 등록",
    actionHref: "#",
    nav: [
      { label: "홈", icon: "home" },
      { label: "제품", icon: "box" },
      { label: "브로셔", icon: "upload" },
      { label: "문의 관리", icon: "message" },
      { label: "성과", icon: "chart" },
    ],
    stats: [
      { label: "이번 달 노출", value: "2,418", change: "+18.2%", positive: true },
      { label: "신규 문의", value: "12", change: "+4 지난달 대비", positive: true },
      { label: "등록 브로셔", value: "8 / 15", change: "7개 등록 가능", positive: true },
    ],
    chartTitle: "제품 노출 추이",
    chartCaption: "AI 검색을 통한 유입이 지난주보다 18.2% 늘었어요.",
    chartValues: [42, 48, 55, 50, 72, 68, 88],
    tasks: [
      { title: "신규 문의 3건 답변", detail: "평균 응답 시간이 구매 결정에 영향을 줘요.", tone: "mint" },
      { title: "브로셔 검토 대기", detail: "산업용 집진기 2026 카탈로그", tone: "amber" },
      { title: "영문 정보 보완", detail: "Global 검색 노출을 높일 수 있어요.", tone: "blue" },
    ],
    activities: [
      { title: "신규 제품 문의", detail: "대명유통에서 견적을 요청했습니다.", time: "8분 전", icon: "message" },
      { title: "제품 정보 추출 완료", detail: "브로셔에서 12개 제품을 찾았습니다.", time: "1시간 전", icon: "box" },
      { title: "주간 성과 리포트", detail: "노출 624회 · 상세 조회 89회", time: "어제", icon: "chart" },
    ],
  },
  admin: {
    role: "admin",
    roleLabel: "관리자 콘솔",
    name: "운영 관리자",
    initials: "관",
    title: "오늘 확인할 운영 항목이 9건 있어요.",
    description: "승인 대기와 플랫폼 상태를 확인하고 안전하게 운영하세요.",
    action: "승인 대기 보기",
    actionHref: "#",
    nav: [
      { label: "운영 현황", icon: "home" },
      { label: "판매자 승인", icon: "users" },
      { label: "콘텐츠 검토", icon: "shield" },
      { label: "문의·신고", icon: "message" },
      { label: "설정", icon: "settings" },
    ],
    stats: [
      { label: "판매자 승인 대기", value: "6", change: "2건 24시간 경과", positive: false },
      { label: "브로셔 검토 대기", value: "3", change: "평균 2.4시간", positive: true },
      { label: "서비스 상태", value: "정상", change: "오류율 0.02%", positive: true },
    ],
    chartTitle: "플랫폼 활동",
    chartCaption: "최근 7일간 검색과 문의가 안정적으로 증가하고 있어요.",
    chartValues: [48, 54, 52, 66, 72, 78, 84],
    tasks: [
      { title: "판매자 서류 검토", detail: "신규 가입 판매자 6곳의 확인이 필요해요.", tone: "amber" },
      { title: "브로셔 승인", detail: "AI 추출이 완료된 문서 3건", tone: "mint" },
      { title: "신고 내용 확인", detail: "제품 정보 정정 요청 1건", tone: "blue" },
    ],
    activities: [
      { title: "판매자 승인 완료", detail: "한빛솔루션 · 관리자 김OO", time: "25분 전", icon: "users" },
      { title: "브로셔 자동 검토 완료", detail: "민감 정보가 발견되지 않았습니다.", time: "42분 전", icon: "shield" },
      { title: "시스템 상태 점검", detail: "모든 주요 서비스가 정상입니다.", time: "1시간 전", icon: "settings" },
    ],
  },
};
