import Link from "next/link";

type PortalIconName =
  | "search"
  | "bookmark"
  | "bell"
  | "arrow"
  | "briefcase"
  | "clock"
  | "building"
  | "spark"
  | "chevron";

function PortalIcon({ name, size = 18 }: { name: PortalIconName; size?: number }) {
  const paths: Record<PortalIconName, React.ReactNode> = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    bookmark: <path d="M6 3h12v18l-6-4-6 4Z" />,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    building: <><path d="M4 21V7l8-4 8 4v14M8 10h2M14 10h2M8 14h2M14 14h2M10 21v-3h4v3" /></>,
    spark: <path d="M12 2c.6 6.2 3.8 9.4 10 10-6.2.6-9.4 3.8-10 10-.6-6.2-3.8-9.4-10-10 6.2-.6 9.4-3.8 10-10Z" />,
    chevron: <path d="m9 5 7 7-7 7" />,
  };

  return (
    <svg aria-hidden="true" className="portal-icon" fill="none" height={size} viewBox="0 0 24 24" width={size}>
      {paths[name]}
    </svg>
  );
}

const products = [
  {
    company: "한빛솔루션",
    title: "모듈형 스마트 쿨링 HBC-40",
    description: "공간별 독립 제어로 전력 사용량을 줄이는 산업용 냉각 시스템",
    reason: "최근 본 냉각 설비와 유사",
    tags: ["에너지 절감", "HACCP"],
    match: 96,
    kind: "cooling",
  },
  {
    company: "네오옵틱",
    title: "AI 비전 검사기 VIX-200",
    description: "생산 라인의 미세 불량을 실시간으로 판별하는 비전 솔루션",
    reason: "스마트팩토리 관심사 기반",
    tags: ["AI 검사", "자동화"],
    match: 93,
    kind: "vision",
  },
  {
    company: "로보웍스",
    title: "경량 협동로봇 P7",
    description: "좁은 공정에도 빠르게 설치할 수 있는 7kg 가반 협동로봇",
    reason: "구매 담당자가 많이 저장",
    tags: ["협동로봇", "안전 인증"],
    match: 89,
    kind: "robot",
  },
  {
    company: "에코패키징",
    title: "재활용 완충 패키지 EC-Cell",
    description: "플라스틱 사용량과 물류 파손률을 함께 낮추는 친환경 포장재",
    reason: "ESG 제품군 신규 등록",
    tags: ["친환경", "물류"],
    match: 84,
    kind: "package",
  },
];

const notices = [
  {
    organization: "충북 지역 공공기관",
    title: "식품 제조시설 에너지 절감 설비 구축",
    budget: "추정 4.8억원",
    deadline: "D-5",
    category: "기계·설비",
    reason: "냉각 설비 관심 키워드와 일치",
    match: 94,
    featured: true,
  },
  {
    organization: "수도권 산하 기관",
    title: "스마트 물류창고 자동화 장비 도입",
    budget: "추정 2.1억원",
    deadline: "D-8",
    category: "물류·자동화",
    reason: "저장한 제품 3개와 연관",
    match: 88,
  },
  {
    organization: "영남 지역 공기업",
    title: "사업장 대기환경 개선장치 구매",
    budget: "추정 1.6억원",
    deadline: "D-11",
    category: "환경·안전",
    reason: "산업용 집진기 검색 이력",
    match: 83,
  },
  {
    organization: "강원 지역 의료기관",
    title: "저온 보관 시스템 교체 및 설치",
    budget: "추정 9,800만원",
    deadline: "D-14",
    category: "냉동·보관",
    reason: "관심 산업과 유사",
    match: 79,
  },
];

const articles = [
  {
    category: "조달 가이드",
    title: "2026년 공공조달, 중소기업이 놓치면 안 될 세 가지 변화",
    summary: "달라진 평가 기준과 우선구매 제도를 실무 관점에서 정리했습니다.",
    meta: "8분 읽기 · 오늘",
    tone: "green",
    number: "01",
  },
  {
    category: "산업 리포트",
    title: "식품 제조 현장의 에너지 절감 설비 도입 트렌드",
    summary: "냉각과 공조 설비를 중심으로 구매 담당자가 보는 핵심 지표를 살펴봅니다.",
    meta: "6분 읽기 · 어제",
    tone: "blue",
    number: "02",
  },
  {
    category: "제품 선택법",
    title: "협동로봇 도입 전 반드시 확인해야 할 안전 인증",
    summary: "설치 환경별 요구 인증과 판매자에게 요청할 자료를 체크리스트로 제공합니다.",
    meta: "5분 읽기 · 2일 전",
    tone: "sand",
    number: "03",
  },
];

function ProductIllustration({ kind }: { kind: string }) {
  if (kind === "vision") {
    return <svg aria-hidden="true" fill="none" viewBox="0 0 180 120"><rect x="34" y="26" width="112" height="68" rx="6" /><circle cx="90" cy="60" r="22" /><circle cx="90" cy="60" r="9" /><path d="M52 100h76M62 94v6M118 94v6M44 45h10M126 45h10" /></svg>;
  }
  if (kind === "robot") {
    return <svg aria-hidden="true" fill="none" viewBox="0 0 180 120"><path d="M54 97h72M75 97V83h35v14M91 83V66l25-12M116 54l-8-18 16-7 8 19-16 6ZM91 66 72 50l10-13 26 18" /><circle cx="91" cy="66" r="6" /><circle cx="76" cy="44" r="6" /></svg>;
  }
  if (kind === "package") {
    return <svg aria-hidden="true" fill="none" viewBox="0 0 180 120"><path d="m90 18 48 24-48 24-48-24 48-24Z" /><path d="m42 42 48 24 48-24v46l-48 24-48-24V42Z" /><path d="M90 66v46M66 30l48 24M65 76c12 4 22 12 25 25" /></svg>;
  }
  return <svg aria-hidden="true" fill="none" viewBox="0 0 180 120"><rect x="34" y="28" width="112" height="68" rx="4" /><path d="M48 42h84M48 54h84M48 82h84M57 96v9M123 96v9" /><circle cx="70" cy="69" r="11" /><circle cx="110" cy="69" r="11" /><path d="M70 58v22M59 69h22M110 58v22M99 69h22" /></svg>;
}

export function BuyerPortal() {
  return (
    <div className="buyer-portal">
      <header className="portal-header">
        <div className="portal-header__inner">
          <Link className="brand portal-brand" href="/" aria-label="GUILD 홈">
            <span className="brand-mark">G</span>
            <span>GUILD</span>
          </Link>
          <nav className="portal-nav" aria-label="구매자 포털 메뉴">
            <a className="is-active" href="#briefing">홈</a>
            <a href="#products">제품 탐색</a>
            <a href="#procurement">조달 공고</a>
            <a href="#insights">인사이트</a>
          </nav>
          <label className="portal-search portal-search--header">
            <PortalIcon name="search" size={17} />
            <input aria-label="포털 검색" placeholder="제품과 기업을 검색하세요" />
          </label>
          <div className="portal-actions">
            <button aria-label="저장 목록" type="button"><PortalIcon name="bookmark" /></button>
            <button aria-label="알림" type="button"><i /><PortalIcon name="bell" /></button>
            <span className="portal-user">김</span>
          </div>
        </div>
      </header>

      <main>
        <section className="portal-briefing" id="briefing">
          <div className="portal-briefing__glow" />
          <div className="portal-container portal-briefing__inner">
            <div className="briefing-copy">
              <span className="portal-overline"><i /> PERSONAL BRIEFING</span>
              <h1>민서님, 새롭게 볼 만한<br /><em>비즈니스 기회가 18개</em> 있어요.</h1>
              <p>관심 분야와 최근 활동을 바탕으로 오늘의 제품과 소식을 모았습니다.</p>
              <label className="portal-search portal-search--hero">
                <PortalIcon name="search" size={20} />
                <input aria-label="AI 제품 검색" placeholder="어떤 제품을 찾고 계신가요? 용도나 조건으로 검색해 보세요." />
                <button type="button">AI로 찾기 <PortalIcon name="arrow" size={16} /></button>
              </label>
              <div className="quick-keywords">
                <span>추천 검색</span>
                <a href="#">에너지 절감 설비</a>
                <a href="#">스마트 물류</a>
                <a href="#">식품 자동화</a>
              </div>
            </div>
            <div className="briefing-summary">
              <span className="briefing-summary__label">지난 방문 이후</span>
              <div className="briefing-metric"><strong>8</strong><span>관심 분야<br />신규 제품</span><i>NEW</i></div>
              <div className="briefing-metric"><strong>4</strong><span>추천<br />조달 공고</span><i>맞춤</i></div>
              <div className="briefing-metric"><strong>6</strong><span>새로운<br />산업 소식</span><i>읽을거리</i></div>
              <a href="#products">브리핑 전체 보기 <PortalIcon name="arrow" size={14} /></a>
            </div>
          </div>
        </section>

        <div className="portal-container portal-body">
          <div className="portal-feed">
            <section className="portal-section" id="products">
              <div className="portal-section__heading">
                <div>
                  <span className="portal-overline"><i /> FOR YOU</span>
                  <h2>민서님을 위한 제품</h2>
                  <p>최근 찾아본 제품과 관심 산업을 바탕으로 골랐어요.</p>
                </div>
                <a className="section-more" href="#">추천 제품 전체 보기 <PortalIcon name="arrow" size={15} /></a>
              </div>
              <div className="product-grid">
                {products.map((product) => (
                  <article className="portal-product-card" key={product.title}>
                    <div className={`product-visual product-visual--${product.kind}`}>
                      <span className="match-pill"><PortalIcon name="spark" size={11} /> {product.match}% 추천</span>
                      <button aria-label={`${product.title} 저장`} type="button"><PortalIcon name="bookmark" size={16} /></button>
                      <ProductIllustration kind={product.kind} />
                    </div>
                    <div className="product-card__body">
                      <small>{product.company}</small>
                      <h3>{product.title}</h3>
                      <p>{product.description}</p>
                      <div className="product-tags">{product.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                      <div className="recommend-reason"><PortalIcon name="spark" size={12} /> {product.reason}</div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="portal-section procurement-section" id="procurement">
              <div className="portal-section__heading">
                <div>
                  <span className="portal-overline"><i /> PUBLIC PROCUREMENT</span>
                  <h2>관심 분야 조달 공고</h2>
                  <p>나라장터의 최근 공고 중 관심사와 가까운 기회를 선별했어요.</p>
                </div>
                <span className="sample-data-badge">샘플 데이터</span>
              </div>

              <div className="procurement-layout">
                <article className="featured-notice">
                  <div className="featured-notice__top">
                    <span className="notice-deadline">{notices[0].deadline}</span>
                    <span className="notice-match"><PortalIcon name="spark" size={12} /> AI 적합도 {notices[0].match}%</span>
                  </div>
                  <span className="notice-category">{notices[0].category}</span>
                  <h3>{notices[0].title}</h3>
                  <div className="notice-details">
                    <span><PortalIcon name="building" size={14} /> {notices[0].organization}</span>
                    <span><PortalIcon name="briefcase" size={14} /> {notices[0].budget}</span>
                  </div>
                  <div className="notice-reason"><PortalIcon name="spark" size={14} /><span><small>추천 이유</small>{notices[0].reason}</span></div>
                  <button className="notice-button" type="button">공고 자세히 보기 <PortalIcon name="arrow" size={15} /></button>
                  <div className="notice-art" aria-hidden="true"><span /><i /><b /></div>
                </article>

                <div className="notice-list">
                  {notices.slice(1).map((notice) => (
                    <article className="notice-list-item" key={notice.title}>
                      <div className="notice-list-item__top">
                        <span>{notice.category}</span>
                        <strong>{notice.deadline}</strong>
                      </div>
                      <h3>{notice.title}</h3>
                      <div className="notice-list-item__meta">
                        <span>{notice.organization}</span><i /> <span>{notice.budget}</span>
                      </div>
                      <div className="notice-list-item__bottom">
                        <span><PortalIcon name="spark" size={11} /> {notice.reason}</span>
                        <strong>{notice.match}%</strong>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              <div className="procurement-note">
                <PortalIcon name="clock" size={15} />
                <span>실제 공고 연동 전 화면 구성을 위한 예시입니다. 나라장터 연동 후 공고번호·원문·마감일을 실시간으로 제공합니다.</span>
                <button type="button">관심 공고 알림 설정</button>
              </div>
            </section>

            <section className="portal-section" id="insights">
              <div className="portal-section__heading">
                <div>
                  <span className="portal-overline"><i /> INSIGHTS</span>
                  <h2>일에 도움이 되는 인사이트</h2>
                  <p>구매와 조달 실무에 바로 활용할 수 있는 내용을 모았습니다.</p>
                </div>
                <a className="section-more" href="#">콘텐츠 전체 보기 <PortalIcon name="arrow" size={15} /></a>
              </div>
              <div className="insight-grid">
                {articles.map((article) => (
                  <article className="insight-card" key={article.title}>
                    <div className={`insight-card__visual insight-card__visual--${article.tone}`}>
                      <span>{article.number}</span>
                      <i /><b />
                    </div>
                    <div className="insight-card__body">
                      <span>{article.category}</span>
                      <h3>{article.title}</h3>
                      <p>{article.summary}</p>
                      <small>{article.meta}</small>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="portal-sidebar">
            <section className="sidebar-card keyword-card">
              <div className="sidebar-card__heading"><h2>내 관심 키워드</h2><button type="button">편집</button></div>
              <p>키워드를 팔로우하면 새로운 제품과 공고를 알려드려요.</p>
              <div className="followed-keywords">
                <span>에너지 절감 <i>8</i></span>
                <span>식품 설비 <i>5</i></span>
                <span>스마트팩토리 <i>12</i></span>
                <button type="button">+ 키워드 추가</button>
              </div>
            </section>

            <section className="sidebar-card trend-card">
              <div className="sidebar-card__heading"><h2>이번 주 인기 분야</h2><small>구매자 검색 기준</small></div>
              <ol>
                <li><strong>01</strong><span>산업 자동화</span><i>↗ 18%</i></li>
                <li><strong>02</strong><span>친환경 패키징</span><i>↗ 12%</i></li>
                <li><strong>03</strong><span>에너지 절감</span><i>↗ 9%</i></li>
                <li><strong>04</strong><span>산업 안전용품</span><i>↗ 7%</i></li>
                <li><strong>05</strong><span>저온 물류</span><i>↗ 4%</i></li>
              </ol>
            </section>

            <section className="sidebar-card activity-card">
              <div className="sidebar-card__heading"><h2>이어서 보기</h2><button type="button">전체</button></div>
              <a href="#"><span className="activity-thumb activity-thumb--one" /><span><strong>산업용 칠러 비교</strong><small>3개 제품 · 어제</small></span><PortalIcon name="chevron" size={14} /></a>
              <a href="#"><span className="activity-thumb activity-thumb--two" /><span><strong>물류 자동화 저장 목록</strong><small>7개 제품 · 3일 전</small></span><PortalIcon name="chevron" size={14} /></a>
              <a href="#"><span className="activity-thumb activity-thumb--three" /><span><strong>세진테크 문의</strong><small>새 답변 1개 · 5일 전</small></span><PortalIcon name="chevron" size={14} /></a>
            </section>

            <section className="briefing-signup">
              <PortalIcon name="spark" size={22} />
              <span>WEEKLY BRIEFING</span>
              <h2>새로운 기회를<br />놓치지 마세요.</h2>
              <p>관심 제품과 조달 공고를 매주 한 번 이메일로 정리해 드려요.</p>
              <button type="button">주간 브리핑 받기</button>
            </section>
          </aside>
        </div>
      </main>

      <footer className="portal-footer">
        <div className="portal-container">
          <Link className="brand" href="/"><span className="brand-mark">G</span><span>GUILD</span></Link>
          <span>기업의 발견이 비즈니스의 기회가 되도록.</span>
          <nav><a href="#">이용약관</a><a href="#">개인정보처리방침</a><a href="#">고객센터</a></nav>
        </div>
      </footer>
    </div>
  );
}
