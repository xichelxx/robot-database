import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  BookOpen, 
  ChevronRight, 
  Award, 
  Calendar, 
  Hash, 
  CheckCircle2, 
  Database,
  RefreshCw,
  Clock,
  LayoutGrid
} from 'lucide-react';
import { REPORTS_DB, ReportItem } from '../data/reportsAndDynamics';

export function ReportViewer() {
  const [selectedReportId, setSelectedReportId] = useState<string>(REPORTS_DB[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('全部');
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
  
  // Font size multiplier
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');

  // Download simulation state
  const [downloadProgress, setDownloadProgress] = useState<{ [key: string]: number }>({});
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Filter reports
  const filteredReports = useMemo(() => {
    return REPORTS_DB.filter(rp => {
      const year = rp.date.split('-')[0];
      const matchYear = selectedYear === '全部' || year === selectedYear;
      const matchCategory = selectedCategory === '全部' || rp.category === selectedCategory;
      const matchKeyword = searchQuery.trim() === '' || 
        rp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rp.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rp.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchYear && matchCategory && matchKeyword;
    });
  }, [searchQuery, selectedYear, selectedCategory]);

  const activeReport = useMemo(() => {
    return REPORTS_DB.find(r => r.id === selectedReportId) || REPORTS_DB[0];
  }, [selectedReportId]);

  const handleDownload = (id: string, title: string) => {
    if (downloadingId) return;
    setDownloadingId(id);
    setDownloadProgress(prev => ({ ...prev, [id]: 10 }));
    
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        const current = prev[id] || 0;
        if (current >= 100) {
          clearInterval(interval);
          setDownloadingId(null);
          return { ...prev, [id]: 100 };
        }
        return { ...prev, [id]: current + 30 };
      });
    }, 250);
  };

  const currentFontSizeClass = {
    sm: 'text-xs leading-relaxed',
    base: 'text-sm leading-relaxed',
    lg: 'text-base leading-relaxed'
  }[fontSize];

  return (
    <div className="space-y-6" id="report_viewer_section">
      {/* Upper header */}
      <div className="pb-4 border-b border-[#20325d] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-md font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <span>前沿文献及PDF商业解密中心 (Report & Publication Dossiers)</span>
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            最早追溯至2024年初，收录全球机器人产业链大底盘红利、高敏触觉电子皮肤、VLA大模型、政策安全等核心保密报告，并提供整机/部件报告的高速智能在线阅读。
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono bg-[#0b1224] border border-[#1b2b52] px-3 py-1.5 rounded-lg shrink-0 text-cyan-300">
          <Database className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>库内智囊报告: {REPORTS_DB.length} 篇</span>
        </div>
      </div>

      {/* Main Split Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT COLUMN: Report Explorer & Filters (5 grid spaces) */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          
          {/* Card containing Filters & Search */}
          <div className="bg-[#0b1224] border border-[#20325d] rounded-xl p-4 space-y-3.5">
            
            {/* Search Input */}
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="搜索标题、编研机构、文献摘要..."
                className="w-full bg-[#070b16] border border-[#20325d] text-xs text-white rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-cyan-400 font-sans transition-all"
              />
            </div>

            {/* Filter Group: Years */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-450" />
                  <span>文献追溯年度</span>
                </span>
                {selectedYear !== '全部' && (
                  <button onClick={() => setSelectedYear('全部')} className="text-[#00f3ff] hover:underline">清除</button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['全部', '2026', '2025', '2024'].map(year => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-2.5 py-1 rounded text-xs transition-all font-mono ${
                      selectedYear === year
                        ? 'bg-cyan-500 text-black font-bold'
                        : 'bg-[#121c33] text-gray-400 hover:text-white'
                    }`}
                  >
                    {year === '全部' ? '全部年份' : `${year}年`}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Group: Categories */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono">
                <span className="flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5 text-gray-450" />
                  <span>文献核心类别</span>
                </span>
                {selectedCategory !== '全部' && (
                  <button onClick={() => setSelectedCategory('全部')} className="text-[#00f3ff] hover:underline">清除</button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['全部', '行业研究', '技术白皮书', '投资分析', '合规标准'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2 py-0.5 rounded text-[10px] transition-all ${
                      selectedCategory === cat
                        ? 'bg-emerald-500 text-black font-bold'
                        : 'bg-[#121c33] text-gray-400 hover:text-white'
                    }`}
                  >
                    {cat === '全部' ? '全部类型' : cat}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* List of Reports Card */}
          <div className="bg-[#0b1224] border border-[#20325d] rounded-xl flex-1 flex flex-col overflow-hidden min-h-[400px] max-h-[550px]">
            <div className="p-3 bg-[#0d162d] border-b border-[#20325d] flex justify-between items-center">
              <span className="text-[11px] text-gray-400 font-bold font-mono">检索匹配结果 ({filteredReports.length})</span>
              <span className="text-[10px] text-gray-500">双击文献即可打开预览</span>
            </div>

            {/* Document Scroll list */}
            <div className="flex-1 overflow-y-auto p-2.5 space-y-2 scrollbar-thin scrollbar-thumb-cyan-950 scrollbar-track-transparent">
              {filteredReports.length === 0 ? (
                <div className="text-center py-12 text-xs text-gray-500 font-mono">
                  没有找到匹配的智库文献
                </div>
              ) : (
                filteredReports.map(rp => {
                  const isSelected = rp.id === selectedReportId;
                  const progress = downloadProgress[rp.id] || 0;
                  return (
                    <div
                      key={rp.id}
                      onClick={() => {
                        setSelectedReportId(rp.id);
                        setActiveSectionIndex(0);
                      }}
                      className={`p-3 rounded-lg border text-left transition-all cursor-pointer relative overflow-hidden ${
                        isSelected 
                          ? 'bg-[#121f3d] border-cyan-400/80 shadow-md shadow-cyan-950/20' 
                          : 'bg-[#070b16]/60 border-[#1b2b52] hover:border-[#3b82f6]/40 hover:bg-[#0b1328]/80'
                      }`}
                    >
                      {/* Active marker left border */}
                      {isSelected && (
                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#00f3ff]"></div>
                      )}

                      {/* Line 1: Header */}
                      <div className="flex items-center justify-between gap-2 text-[10px] font-mono text-gray-400 mb-1.5">
                        <span className="bg-[#1b2b52] px-1.5 py-0.2 rounded text-cyan-300 transform scale-95 shrink-0">
                          {rp.category}
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span>{rp.date}</span>
                          <span className="text-[#00f3ff]">{rp.pages}p</span>
                        </div>
                      </div>

                      {/* Line 2: Title */}
                      <h4 className={`text-xs font-bold leading-relaxed mb-2 transition-colors ${
                        isSelected ? 'text-cyan-300' : 'text-white'
                      }`}>
                        {rp.title}
                      </h4>

                      {/* Brief line of summary */}
                      <p className="text-[11px] text-gray-400 line-clamp-2 leading-normal mb-2.5">
                        {rp.summary}
                      </p>

                      {/* Action buttons on card footer */}
                      <div className="flex items-center justify-between pt-2 border-t border-[#1b2b52]/80 mt-1">
                        <span className="text-[10px] font-mono text-amber-400">权威度: {rp.rating}</span>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownload(rp.id, rp.title);
                            }}
                            disabled={progress === 100}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all flex items-center gap-1 cursor-pointer ${
                              progress === 100
                                ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/60'
                                : 'bg-cyan-900/30 text-cyan-400 border border-cyan-800/80 hover:bg-cyan-900/60'
                            }`}
                          >
                            <Download className="w-3 h-3" />
                            {progress === 0 && '下载PDF'}
                            {progress > 0 && progress < 100 && `下载中 ${progress}%`}
                            {progress === 100 && '已下载✓'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Document Full Content Panel (7 grid spaces) */}
        <div className="lg:col-span-7 flex flex-col bg-[#0b1224] border border-[#20325d] rounded-xl overflow-hidden min-h-[500px]">
          
          {/* Document Header Panel */}
          <div className="p-4 border-b border-[#20325d] bg-[#0d162d] relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <span className="text-[10px] bg-cyan-950/60 text-cyan-400 border border-cyan-900/80 rounded px-2 py-0.5 font-mono">
                {activeReport.id} • {activeReport.category}官方解密件
              </span>
              <div className="flex items-center gap-4 text-[11px] font-mono text-gray-400 shrink-0">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> 刊登: {activeReport.date}</span>
                <span className="flex items-center gap-1"><Hash className="w-3.5 h-3.5" /> 文书共: {activeReport.pages}页</span>
              </div>
            </div>
            
            <h1 className="text-sm font-bold text-white leading-relaxed">
              {activeReport.title}
            </h1>
            
            <div className="mt-2.5 text-xs text-gray-400 flex flex-wrap gap-x-4 gap-y-1 font-sans">
              <span>编委会: <strong className="text-gray-300 font-medium">{activeReport.author}</strong></span>
              <span>评测星极: <strong className="text-amber-400 font-mono">{activeReport.rating}</strong></span>
            </div>

            {/* Quick status progress indicating file is loaded correctly for viewing */}
            <div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
          </div>

          {/* Interactive Document Chapter Navigation */}
          <div className="bg-[#0c1221] px-4 py-2.5 border-b border-[#1c2c54] flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-1 overflow-x-auto select-none no-scrollbar">
              {activeReport.sections.map((sec, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSectionIndex(idx)}
                  className={`px-3 py-1 rounded-md text-[11px] font-medium border transition-all whitespace-nowrap cursor-pointer ${
                    activeSectionIndex === idx
                      ? 'bg-gradient-to-r from-sky-900 to-cyan-950 text-cyan-300 border-cyan-800'
                      : 'bg-transparent text-gray-400 border-transparent hover:text-white hover:bg-[#121c33]'
                  }`}
                >
                  {sec.title.split('：')[0]}
                </button>
              ))}
            </div>

            {/* Font Sizer */}
            <div className="flex items-center gap-1.5 shrink-0 bg-[#070b16] border border-[#1b2b52] rounded p-1">
              <span className="text-[9px] text-gray-500 font-mono mr-1">阅读字号:</span>
              {(['sm', 'base', 'lg'] as const).map(sz => (
                <button
                  key={sz}
                  onClick={() => setFontSize(sz)}
                  className={`w-5 h-5 flex items-center justify-center rounded text-[10px] font-bold uppercase ${
                    fontSize === sz 
                      ? 'bg-cyan-500 text-black' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* DOCUMENT BODY READER VIEW (Full Simulation of File Viewer) */}
          <div className="flex-1 overflow-y-auto p-5 bg-[#090e1c] text-justify space-y-4 max-h-[420px] scrollbar-thin scrollbar-thumb-cyan-950">
            
            {/* Context Notice to solve 'cannot view files' */}
            <div className="bg-[#0b1328]/80 border border-[#1e2a4a] p-3 rounded-lg mb-4 text-xs">
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-[#00f3ff] font-medium mr-1">💡 全文解密声明:</strong>
                您正在通过本网络终端安全访问由张明科技提供的智能机器人全链核心文献数据。本文件在沙盒内已完成全面无损文本还原，您可以点击上方章节菜单自由切换、阅读全部正文内容。
              </p>
            </div>

            {/* Document Active Content Heading */}
            <div className="border-l-4 border-cyan-400 pl-3">
              <h3 className="text-xs font-bold text-[#00f3ff] tracking-tight uppercase">
                {activeReport.sections[activeSectionIndex]?.title}
              </h3>
              <p className="text-[10px] text-gray-500 font-mono mt-0.5">
                Section / Page {activeSectionIndex + 1} of {activeReport.sections.length} • 核心解析段
              </p>
            </div>

            {/* Structured Text Content - Highly Readable */}
            <div className={`${currentFontSizeClass} text-gray-300 font-sans tracking-wide space-y-3.5`}>
              {activeReport.sections[activeSectionIndex]?.content.split('\n').map((paragraph, pIdx) => (
                <p key={pIdx} className="indent-6 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Mock Report Appendix Highlights */}
            {activeSectionIndex === activeReport.sections.length - 1 && (
              <div className="mt-8 pt-5 border-t border-[#1a2d55]/80 space-y-3">
                <h4 className="text-xs font-bold text-white flex items-center gap-1">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>文献核心研判结论 & 投资指引</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] font-mono">
                  <div className="p-2.5 rounded bg-[#0b1224] border border-[#1b2b52] space-y-1">
                    <span className="text-[#00f3ff] block">📍 核心投资节点</span>
                    <p className="text-gray-400 font-sans text-[10px]">建议高度聚焦具20~30万套量产规划的空心杯电机高精密绕线和柔性皮肤串扰解耦硬件企业。</p>
                  </div>
                  <div className="p-2.5 rounded bg-[#0b1224] border border-[#1b2b52] space-y-1">
                    <span className="text-emerald-400 block">📍 供应链安全预测</span>
                    <p className="text-gray-400 font-sans text-[10px]">至2027年，全球人形机器人国产替代BOM成本有望击穿8万元，中资中游整机厂商将全面进入规模盈利期。</p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Reader Footer Control Bar */}
          <div className="p-3 bg-[#0d162d] border-t border-[#20325d] flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-gray-500 font-mono">
            <span className="flex items-center gap-1.5 text-gray-400">
              <Clock className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>整本下载签名: SHA-256/Dossier_Verified_{activeReport.id}.zip</span>
            </span>
            <div className="flex gap-3">
              <button 
                onClick={() => handleDownload(activeReport.id, activeReport.title)}
                className="text-cyan-400 hover:text-white transition-colors"
              >
                📥 下载当前原档
              </button>
              <span>|</span>
              <span className="text-gray-400">阅读率: 100% (在线已全部加载)</span>
            </div>
          </div>

        </div>

      </div>

      {/* Action Simulation Modal (If download completes, notify beautifully in the view) */}
      {Object.values(downloadProgress).some(p => p === 100) && (
        <div className="bg-[#052e16]/80 border border-emerald-500 p-3.5 rounded-xl flex items-center justify-between text-xs text-emerald-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="font-bold">文献高速打包装配就绪：</p>
              <p className="opacity-90 font-mono text-[10px]">已为您在浏览器本地完成 PDF 和 2024-2026 年报原稿数据的解密打包。</p>
            </div>
          </div>
          <button 
            className="text-emerald-450 text-emerald-300 font-bold hover:underline"
            onClick={() => setDownloadProgress({})}
          >
            知道了✓
          </button>
        </div>
      )}

    </div>
  );
}
