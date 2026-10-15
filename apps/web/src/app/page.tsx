import Link from "next/link";

const roles = [
  {
    number: "01",
    eyebrow: "BUYER",
    title: "구매자",
    description: "복잡한 제품명을 몰라도 괜찮아요. 필요한 조건을 말하면 AI가 근거와 함께 찾아드려요.",
    href: "/dashboard/buyer",
    link: "구매자 화면 보기",
    accent: "lime",
  },
  {
    number: "02",
    eyebrow: "SELLER",
    title: "판매자",
    description: "브로셔 한 장이면 제품 등록이 끝나요. 제품을 찾는 바이어에게 더 정확하게 노출하세요.",
    href: "/dashboard/seller",
    link: "판매자 화면 보기",
    accent: "mint",
  },
  {
    number: "03",
    eyebrow: "OPERATOR",
    title: "관리자",
    description: "판매자 승인부터 콘텐츠 검토, 서비스 상태까지 하나의 운영 화면에서 관리하세요.",
    href: "/dashboard/admin",
    link: "관리자 화면 보기",
    accent: "sand",
  },
];

const steps = [
  { number: "01", title: "자연어로 질문", text: "원하는 제품의 용도와 조건을 평소 말하듯 입력하세요." },
  { number: "02", title: "AI가 문서를 탐색", text: "검증된 브로셔의 제품 정보와 근거 문장을 함께 찾아요." },
  { number: "03", title: "기업과 바로 연결", text: "제품을 비교하고 판매자에게 안전하게 문의를 보내세요." },
];

function ArrowIcon() {
  return <span aria-hidden="true" className="arrow-icon">↗</span>;
}

function SparkIcon() {
  return (
    <svg aria-hidden="true" className="spark-icon" fill="none" viewBox="0 0 28 28">
      <path d="M14 2c.7 7.5 4.5 11.3 12 12-7.5.7-11.3 4.5-12 12-.7-7.5-4.5-11.3-12-12C9.5 13.3 13.3 9.5 14 2Z" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="landing-page">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="GUILD 홈">
          <span className="brand-mark">G</span>
          <span>GUILD</span>
        </Link>
        <nav className="site-nav" aria-label="주요 메뉴">
          <a href="#discovery">제품 탐색</a>
          <a href="#for-sellers">판매자 안내</a>
          <a href="#about">서비스 소개</a>
        </nav>
        <div className="header-actions">
          <Link className="login-link" href="/dashboard/buyer">로그인</Link>
          <Link className="button button--small button--dark" href="/dashboard/seller">
            시작하기 <ArrowIcon />
          </Link>
        </div>
      </header>

      <section className="hero" id="about">
        <div className="hero-orbit hero-orbit--one" />
        <div className="hero-orbit hero-orbit--two" />
        <div className="hero-copy">
          <span className="eyebrow eyebrow--hero"><span /> AI PRODUCT DISCOVERY FOR B2B</span>
          <h1>
            좋은 제품이,
            <span>필요한 곳에 닿도록.</span>
          </h1>
          <p>
            흩어진 기업 브로셔를 AI가 읽고 이해합니다.<br />
            찾는 사람에게는 정확한 제품을, 만드는 기업에는 새로운 기회를 연결해요.
          </p>
          <div className="hero-actions">
            <a className="button button--light" href="#discovery">제품 찾아보기 <ArrowIcon /></a>
            <Link className="button button--ghost" href="/dashboard/seller">판매자로 시작하기</Link>
          </div>
          <div className="hero-proof">
            <div className="avatar-stack" aria-hidden="true">
              <span>한</span><span>세</span><span>대</span><span>+</span>
            </div>
            <p><strong>320+ 국내 기업</strong><br />검증된 제품 정보를 만나보세요.</p>
          </div>
        </div>

        <div className="hero-demo" id="discovery">
          <div className="demo-window">
            <div className="demo-window__top">
              <span className="demo-logo"><SparkIcon /></span>
              <span>AI 제품 탐색</span>
              <span className="demo-live"><i /> LIVE</span>
            </div>
            <div className="query-card">
              <span className="query-avatar">김</span>
              <p>식품 공장에 설치할 수 있는<br /><strong>에너지 효율이 높은 냉각 설비</strong>를 찾아줘.</p>
            </div>
            <div className="ai-answer">
              <div className="ai-answer__heading">
                <span><SparkIcon /></span>
                <p><strong>조건에 맞는 제품 12개</strong>를 찾았어요.<br />인증과 에너지 효율을 우선 비교했어요.</p>
              </div>
              <div className="result-card">
                <span className="result-card__visual result-card__visual--blue">
                  <svg aria-hidden="true" fill="none" viewBox="0 0 64 64">
                    <path d="M16 48V20l16-8 16 8v28H16Z" /><path d="M24 48V30h16v18M25 22h14M29 30v18M35 30v18" />
                  </svg>
                </span>
                <span className="result-card__copy">
                  <small>세진테크 · 식품 설비</small>
                  <strong>고효율 산업용 칠러 ST-C800</strong>
                  <span className="result-meta"><i>에너지 1등급</i><i>HACCP</i></span>
                </span>
                <span className="match-score"><strong>96</strong><small>매칭</small></span>
              </div>
              <div className="result-card result-card--muted">
                <span className="result-card__visual result-card__visual--green">
                  <svg aria-hidden="true" fill="none" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="17" /><path d="M32 15v34M15 32h34M20 20l24 24M44 20 20 44" />
                  </svg>
                </span>
                <span className="result-card__copy">
                  <small>한빛솔루션 · 냉각 시스템</small>
                  <strong>모듈형 스마트 쿨링 HBC-40</strong>
                </span>
                <span className="match-score"><strong>91</strong><small>매칭</small></span>
              </div>
            </div>
            <div className="demo-input">
              <span>추가로 궁금한 점을 물어보세요</span>
              <button aria-label="질문 보내기" type="button">↑</button>
            </div>
          </div>
          <div className="floating-note floating-note--verified"><span>✓</span><p><strong>검증된 정보</strong><small>브로셔 원문 근거 제공</small></p></div>
          <div className="floating-note floating-note--global"><span>あ</span><p><strong>글로벌 검색</strong><small>한국어 · English · 日本語</small></p></div>
        </div>
      </section>

      <section className="trust-strip" aria-label="서비스 특징">
        <span>검증된 기업 정보</span><i />
        <span>브로셔 원문 기반</span><i />
        <span>다국어 제품 탐색</span><i />
        <span>안전한 B2B 문의</span>
      </section>

      <section className="story-section" id="for-sellers">
        <div className="section-heading">
          <div>
            <span className="eyebrow"><span /> ONE PLATFORM, EVERY OPPORTUNITY</span>
            <h2>누구에게나<br />더 나은 연결.</h2>
          </div>
          <p>제품을 찾는 순간부터 비즈니스가 시작되는 순간까지,<br />각자의 목적에 맞는 경험을 제공합니다.</p>
        </div>

        <div className="role-grid">
          {roles.map((role) => (
            <Link className={`role-card role-card--${role.accent}`} href={role.href} key={role.title}>
              <div className="role-card__top"><span>{role.number}</span><small>{role.eyebrow}</small></div>
              <div className="role-card__art" aria-hidden="true">
                <span className="art-ring" /><span className="art-dot" /><span className="art-line" />
              </div>
              <h3>{role.title}</h3>
              <p>{role.description}</p>
              <span className="role-link">{role.link} <ArrowIcon /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="process-section">
        <div className="process-heading">
          <span className="eyebrow eyebrow--light"><span /> HOW IT WORKS</span>
          <h2>질문 하나로 시작하는<br />새로운 제품 탐색.</h2>
        </div>
        <div className="process-grid">
          {steps.map((step) => (
            <article className="process-step" key={step.number}>
              <span>{step.number}</span>
              <div className="process-line" />
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
        <div className="process-cta">
          <div><SparkIcon /><span>GUILD AI</span></div>
          <p>찾고 있는 제품이 있나요?</p>
          <Link className="button button--lime" href="/dashboard/buyer">지금 탐색해 보기 <ArrowIcon /></Link>
        </div>
      </section>

      <footer className="site-footer">
        <Link className="brand" href="/"><span className="brand-mark">G</span><span>GUILD</span></Link>
        <p>좋은 제품과 새로운 비즈니스 기회를 연결합니다.</p>
        <div className="footer-links"><a href="#">이용약관</a><a href="#">개인정보처리방침</a><a href="#">고객센터</a></div>
        <small>© 2026 GUILD. All rights reserved.</small>
      </footer>
    </main>
  );
}
