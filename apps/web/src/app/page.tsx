import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Header / Navigation */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              GUILD
            </span>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
              B2B Portal
            </span>
          </div>
          <nav className="flex items-center space-x-4">
            <Link 
              href="/dashboard/buyer" 
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition"
            >
              구매자 포털
            </Link>
            <Link 
              href="/dashboard/seller" 
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition"
            >
              판매자 워크스페이스
            </Link>
            <Link 
              href="/dashboard/admin" 
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition"
            >
              관리자 콘솔
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-slate-100 py-20 px-6 border-b">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
            AI 기반 산업 제품 탐색 & B2B 매칭 솔루션
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            AI가 읽고 연결하는<br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              스마트 B2B 산업 제품 포털
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            기업 브로슈어를 AI가 정밀 분석하여 구매자에게는 최적의 제품과 조달 기회를, 
            판매자에게는 새로운 B2B 비즈니스 판로를 연결합니다.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/dashboard/buyer"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-blue-500/20 transition transform hover:-translate-y-0.5"
            >
              구매자 포털 시작하기
            </Link>
            <Link
              href="/dashboard/seller"
              className="bg-white hover:bg-slate-50 text-slate-800 font-semibold px-8 py-3.5 rounded-xl border border-slate-300 shadow-sm transition transform hover:-translate-y-0.5"
            >
              판매자 워크스페이스
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works / Features */}
      <section className="py-20 px-6 max-w-7xl mx-auto flex-1">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-3">
            GUILD가 제공하는 핵심 가치
          </h2>
          <p className="text-slate-600 max-w-lg mx-auto">
            복잡한 산업 제품 탐색과 조달 과정을 AI 기술로 혁신합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold text-lg mb-6">
              01
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">AI 브로슈어 파싱</h3>
            <p className="text-slate-600 leading-relaxed">
              복잡하고 방대한 제조·산업 브로슈어 및 규격서를 AI가 자동으로 읽고 핵심 스펙과 데이터를 추출합니다.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-lg mb-6">
              02
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">맞춤형 바이어 매칭</h3>
            <p className="text-slate-600 leading-relaxed">
              구매자의 관심 키워드와 조달 요구사항을 분석하여 가장 적합한 제품과 공급사를 정확하게 연결해 줍니다.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold text-lg mb-6">
              03
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">효율적인 영업 & 운영</h3>
            <p className="text-slate-600 leading-relaxed">
              판매자는 실시간 인바운드 문의와 노출 성과를 관리하고, 관리자는 투명한 검토 체계를 누릴 수 있습니다.
            </p>
          </div>
        </div>

        {/* Role Portal Shortcut Banner */}
        <div className="mt-20 bg-slate-900 text-white rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between shadow-xl">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">지금 바로 포털을 체험해보세요</h3>
            <p className="text-slate-400 max-w-md">
              구매자, 판매자, 관리자 역할별 UI 화면을 자유롭게 이동하며 검증하실 수 있습니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/dashboard/buyer"
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium transition"
            >
              구매자 포털 ➔
            </Link>
            <Link
              href="/dashboard/seller"
              className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-medium border border-slate-700 transition"
            >
              판매자 워크스페이스 ➔
            </Link>
            <Link
              href="/dashboard/admin"
              className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-medium border border-slate-700 transition"
            >
              관리자 콘솔 ➔
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-8 px-6 text-center text-sm text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 GUILD B2B Portal. All rights reserved.</p>
          <p className="text-xs text-slate-400">
            현재 화면은 UI 및 제품 흐름 검증을 위한 정적 빌드 버전입니다.
          </p>
        </div>
      </footer>
    </div>
  );
}
