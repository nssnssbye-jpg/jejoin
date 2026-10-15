import Link from "next/link";
import type { DashboardContent, IconName } from "@/lib/dashboard-data";

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9" /><path d="M9 20v-6h6v6" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    message: <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" /><path d="M8 9h8M8 13h5" /></>,
    bookmark: <path d="M6 3h12v18l-6-4-6 4Z" />,
    box: <><path d="m21 8-9 5-9-5 9-5Z" /><path d="m3 8 9 5 9-5v9l-9 5-9-5Z" /><path d="M12 13v9" /></>,
    chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>,
    upload: <><path d="M12 16V3M7 8l5-5 5 5" /><path d="M5 13H3v8h18v-8h-2" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    shield: <><path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Z" /><path d="m9 12 2 2 4-5" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-4v-.09A1.7 1.7 0 0 0 9 19.36a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.63 15 1.7 1.7 0 0 0 3.08 14H3v-4h.09A1.7 1.7 0 0 0 4.64 9a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.63h.01A1.7 1.7 0 0 0 10 3.08V3h4v.09A1.7 1.7 0 0 0 15 4.64a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.37 9v.01A1.7 1.7 0 0 0 20.92 10H21v4h-.09A1.7 1.7 0 0 0 19.4 15Z" /></>,
  };

  return (
    <svg
      aria-hidden="true"
      className="icon"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      {paths[name]}
    </svg>
  );
}

export function DashboardShell({ data }: { data: DashboardContent }) {
  const days = ["월", "화", "수", "목", "금", "토", "일"];

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <Link className="brand brand--sidebar" href="/" aria-label="GUILD 홈">
          <span className="brand-mark">G</span>
          <span>GUILD</span>
        </Link>

        <div className="workspace-label">{data.roleLabel}</div>
        <nav className="dashboard-nav" aria-label="대시보드 메뉴">
          {data.nav.map((item, index) => (
            <a className={index === 0 ? "dashboard-nav__item is-active" : "dashboard-nav__item"} href="#" key={item.label}>
              <Icon name={item.icon} />
              <span>{item.label}</span>
              {index === 0 && <span className="nav-active-dot" />}
            </a>
          ))}
        </nav>

        <div className="sidebar-help">
          <span className="sidebar-help__icon">?</span>
          <strong>도움이 필요하신가요?</strong>
          <p>운영팀이 빠르게 도와드릴게요.</p>
          <a href="#">도움말 보기</a>
        </div>

        <div className="sidebar-profile">
          <span className="avatar">{data.initials}</span>
          <span>
            <strong>{data.name}</strong>
            <small>내 계정</small>
          </span>
          <span className="profile-more">···</span>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <Link className="mobile-brand" href="/">GUILD</Link>
          <label className="dashboard-search">
            <Icon name="search" size={17} />
            <input aria-label="대시보드 검색" placeholder="제품, 문의, 도움말 검색" />
            <kbd>⌘ K</kbd>
          </label>
          <div className="topbar-actions">
            <button aria-label="알림" className="icon-button" type="button">
              <span className="notification-dot" />
              <svg aria-hidden="true" fill="none" height="19" viewBox="0 0 24 24" width="19">
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" />
              </svg>
            </button>
            <span className="topbar-avatar">{data.initials}</span>
          </div>
        </header>

        <div className="dashboard-content">
          <section className="dashboard-welcome">
            <div>
              <span className="eyebrow">안녕하세요, {data.name}님</span>
              <h1>{data.title}</h1>
              <p>{data.description}</p>
            </div>
            <Link className="button button--dark" href={data.actionHref}>
              <span>{data.action}</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </section>

          <section className="stats-grid" aria-label="핵심 지표">
            {data.stats.map((stat) => (
              <article className="stat-card" key={stat.label}>
                <span className="stat-card__label">{stat.label}</span>
                <strong>{stat.value}</strong>
                <span className={stat.positive ? "stat-change is-positive" : "stat-change is-warning"}>
                  {stat.positive ? "↗" : "!"} {stat.change}
                </span>
              </article>
            ))}
          </section>

          <div className="dashboard-grid">
            <section className="panel chart-panel">
              <div className="panel-heading">
                <div>
                  <span className="panel-kicker">INSIGHT</span>
                  <h2>{data.chartTitle}</h2>
                  <p>{data.chartCaption}</p>
                </div>
                <button className="filter-button" type="button">최근 7일⌄</button>
              </div>
              <div className="bar-chart" aria-label={`${data.chartTitle} 막대 차트`}>
                {data.chartValues.map((value, index) => (
                  <div className="bar-chart__item" key={days[index]}>
                    <div className="bar-track">
                      <span className={index === 6 ? "bar is-current" : "bar"} style={{ height: `${value}%` }} />
                    </div>
                    <small>{days[index]}</small>
                  </div>
                ))}
              </div>
            </section>

            <section className="panel tasks-panel">
              <div className="panel-heading panel-heading--compact">
                <div>
                  <span className="panel-kicker">TO DO</span>
                  <h2>오늘 할 일</h2>
                </div>
                <button className="text-button" type="button">전체 보기</button>
              </div>
              <div className="task-list">
                {data.tasks.map((task) => (
                  <a className="task-item" href="#" key={task.title}>
                    <span className={`task-dot task-dot--${task.tone}`} />
                    <span>
                      <strong>{task.title}</strong>
                      <small>{task.detail}</small>
                    </span>
                    <span className="task-arrow">›</span>
                  </a>
                ))}
              </div>
            </section>

            <section className="panel activity-panel">
              <div className="panel-heading panel-heading--compact">
                <div>
                  <span className="panel-kicker">RECENT</span>
                  <h2>최근 활동</h2>
                </div>
                <button className="text-button" type="button">모두 보기</button>
              </div>
              <div className="activity-list">
                {data.activities.map((activity) => (
                  <div className="activity-item" key={activity.title}>
                    <span className="activity-icon"><Icon name={activity.icon} /></span>
                    <span className="activity-copy">
                      <strong>{activity.title}</strong>
                      <small>{activity.detail}</small>
                    </span>
                    <time>{activity.time}</time>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
