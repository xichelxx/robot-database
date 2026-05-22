import React, { useState } from 'react';
import { 
  TrendingUp, 
  Globe, 
  Database, 
  Coins, 
  Award, 
  Cpu, 
  Zap, 
  ArrowUpRight, 
  Sliders, 
  Eye, 
  BookOpen, 
  Shield, 
  CheckCircle2,
  AlertCircle 
} from 'lucide-react';

interface ViewProps {
  totalEntriesCount: number;
}

export function Year2027DashboardView({ totalEntriesCount }: ViewProps) {
  const [selectedTech, setSelectedTech] = useState<string>('skin');
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);

  // 2027 Brand shipments data
  const brands = [
    { name: "特斯拉 Optimus", output: "1,000,000台 (极高产能交付)", share: "45%", color: "#ea580c", progress: 100, fact: "通过奥斯汀超级工厂及上海临港二期超级生产线全速铺线，特斯拉在2027年正式跑通了高抗跌平衡与千赫兹级力敏执行器的端到端FSD控制逻辑。出货主要用于电动汽车总装、物流及美加特定家庭看护试点。" },
    { name: "宇树科技 Unitree", output: "50,000台 (普及型大户)", share: "18.5%", color: "#06b6d4", progress: 75, fact: "借助主力G1 Gen2、H1 Pro两款高性价比轻量物理本体，宇树科技横扫了全球高校实验室、中小型多形态协作研发社区以及中产家政测试市场。2027年单机出货成本已下探至1.2万美元左右。" },
    { name: "智元机器人 AgiBot", output: "30,000台 (工业落地排头兵)", share: "13.2%", color: "#10b981", progress: 65, fact: "聚焦比亚迪乘用车、宁德时代新能源电池电芯贴片及紧密装配工位。远征A2采用小脑硬实时姿态补偿与小微执行夹爪结合模型，在大范围横向拖拽力矩下展现极高自修复能力。" },
    { name: "Figure AI", output: "50,000台 (高端制造及物流)", share: "12.8%", color: "#6366f1", progress: 70, fact: "联手微软与OpenAI的GPT-Next，Figure 03在常识决策和视觉高精密遥遥控方面处于美系第一梯队。其在BMW斯帕坦堡、现代汽车总装站的实测通过率超99.2%。" },
    { name: "Agility (Digit)", output: "10,000台 (3PL分拣主力)", share: "5.4%", color: "#f59e0b", progress: 45, fact: "Digit V4双臂多向吸盘结构在DSV、GXO等全球仓排大厂已步入成熟商业运维阶段。依靠全动态步行与超宽负载能力，每日单机处理小包裹超1.2万件。" },
    { name: "首形科技 AheadForm", output: "5,500台 (情感仿生交互极光)", share: "2.1%", color: "#ec4899", progress: 35, fact: "Origin F2拥有高弹生物软体皮肤与超微阵列驱动，面部微气动微秒纠偏技术能同步输出45种情绪波动，已大批量替代机场贵宾接待、心理治疗陪伴及定制智能康养客服。" }
  ];

  // 2027 Tech Breakdowns
  const techBreakdowns: Record<string, { title: string, desc: string, rate: string, diff: string, points: string[] }> = {
    skin: {
      title: "三维柔性高敏阻抗电子皮肤 (Tactile E-Skin)",
      desc: "多点密布柔理压敏电阻阵列彻底克服了肢体转动弯折时的剪切串扰阻抗。2027年国产高密度阻抗电子皮肤已达成毫米级空间辨率，实现冷热、压力、滑移多维对齐解耦。",
      rate: "¥1.8万 / 平方米",
      diff: "-65% 较2026成本骤降",
      points: [
        "内置亚毫米ADC信号矢量解码器，多电极对齐减少横向零漂",
        "在180度复杂弯折下，抗撕拉疲劳寿命突破10万次",
        "途见科技、能斯达等多家本体供应链进入百万套定型装配"
      ]
    },
    screw: {
      title: "行星滚柱丝杠高刚度高精度极细磨削工艺",
      desc: "打破国外关键高精密螺磨及高频淬火工艺断供风险，国产重载行星滚柱丝杠精度达到2μm，支撑大扭矩高速行进并保证数千小时零间隙磨损。",
      rate: "¥480 - ¥850 元 / 套",
      diff: "-50% 本土量产效应显现",
      points: [
        "五洲新春、贝斯特等通过航母级热磨床实现了高速精磨工艺的在线自校准",
        "单关节负载突发拉力达5000N，不产生弹性残留形变",
        "为特斯拉、三花等本体量产提供了92%以上的国产备品替代交付"
      ]
    },
    motor: {
      title: "毫秒级超轻空心杯线圈与大扭矩减速总成",
      desc: "对于灵巧手及协调肢体所需求的无刷大功率空心杯电机，自粘铜漆漆包线盘卷工艺及高饱满磁路设计将效率推升至94.3%。",
      rate: "¥180 - ¥280 元 / 件",
      diff: "-40% 自动化绕制线圈爆发",
      points: [
        "鸣志、鼎智实现了全自动微型绕线自平衡的高速总装",
        "在30g极轻自身重量下，空载响应速度达到惊人的14,000rpm",
        "集成微型行星轮系，输出力矩大范围覆盖0.8N.m - 2.5N.m"
      ]
    },
    vla: {
      title: "端侧100-Trillion FLOPS通用VLA大模型芯片",
      desc: "放弃复杂的云端多跳中转架构，2027年通用具身智能小脑控制全面下沉至端侧硬件。机器人无需连网即可实施毫秒级力反馈抓握自纠阻抗。",
      rate: "$320 USD / 嵌入式SoC",
      diff: "-55% 大规模硅基封装红利",
      points: [
        "基于地平线及端侧NPU微特架构，专为3D点云与肌肉张力对齐设计",
        "融合强化学习，自主跑通超1万种非标复杂物体的防滑自适应抓取",
        "全套动作推理频率稳定在 200 Hz 以上，消除操作滞后抖动"
      ]
    }
  };

  return (
    <div className="space-y-6 animate-fade-in" id="dashboard_2027_container">
      {/* 2027 Slogan View */}
      <div className="bg-[#0b132a] border border-cyan-500/30 rounded-xl p-5 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/20 via-transparent to-transparent pointer-events-none"></div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            <h3 className="text-md font-extrabold text-[#00f3ff] uppercase tracking-wider">
              2027年 全球机器人出货展望与核心元器件落地规模预测
            </h3>
          </div>
          <p className="text-xs text-gray-400">
            数据流已切入 “2027量产展望模型” 。我们通过对当前 Tesla Optimus、Unitree、AgiBot 等 12 家主流主机厂产线大盘、上游行星丝杠与高敏模组的订单乘数，整定了极具置信度的出货大数字。
          </p>
        </div>
        <span className="text-xs bg-[#0f1d3c] border border-cyan-500/40 text-cyan-300 rounded px-2.5 py-1 font-mono shrink-0">
          2027 展望核心版
        </span>
      </div>

      {/* 4 Metric Cards specifically parameterized for 2027 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-[#0b1224] border border-[#20325d] rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-2 right-2 p-1.5 rounded bg-cyan-950/40 text-[#00f3ff]">
            <Globe className="w-4 h-4" />
          </div>
          <span className="text-xs text-gray-400 block font-medium">预测全球总出货台数 (2027)</span>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white font-mono">354,200</span>
            <span className="text-xs text-[#00f3ff] font-bold">台</span>
          </div>
          <p className="text-[10px] text-emerald-400 mt-2 flex items-center gap-1.5">
            <TrendingUp className="w-3" />
            +184.5% 年复合大爆发 (较2026年)
          </p>
        </div>

        <div className="bg-[#0b1224] border border-[#20325d] rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-2 right-2 p-1.5 rounded bg-purple-950/40 text-purple-400">
            <Database className="w-4 h-4" />
          </div>
          <span className="text-xs text-gray-400 block font-medium">全球具身智能产业规模 (2027)</span>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white font-mono">$1,120.5</span>
            <span className="text-xs text-purple-400 font-bold">亿美元</span>
          </div>
          <p className="text-[10px] text-purple-400 mt-2">
            元器件集成化、空心杯微电机降价提质释放海量红利
          </p>
        </div>

        <div className="bg-[#0b1224] border border-[#20325d] rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-2 right-2 p-1.5 rounded bg-emerald-950/40 text-[#10b981]">
            <Coins className="w-4 h-4" />
          </div>
          <span className="text-xs text-gray-400 block font-medium">国产主要关键元器件替代率 (2027)</span>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white font-mono">82.4%</span>
            <span className="text-xs text-emerald-400 font-bold">自研自给率</span>
          </div>
          <p className="text-[10px] text-emerald-400 mt-2">
            谐波、减速器、磨削滚柱丝杠和压力触觉片进入规模换装期
          </p>
        </div>

        <div className="bg-[#0b1224] border border-[#20325d] rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-2 right-2 p-1.5 rounded bg-amber-950/40 text-amber-400">
            <Award className="w-4 h-4" />
          </div>
          <span className="text-xs text-gray-400 block font-medium">每台双足人形机器人平均 B0M 成本</span>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white font-mono">¥8.5 - 12万</span>
            <span className="text-xs text-amber-500 font-bold">人民币区间</span>
          </div>
          <p className="text-[10px] text-amber-500 mt-2">
            突破“15万元整机红线”，满足特定大厂装配盈亏线
          </p>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Brand Shipment Predictor Block (3 columns) */}
        <div className="bg-[#0b1224] border border-[#20325d] rounded-xl p-5 lg:col-span-3 space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-[#1f2e51]">
            <span className="text-xs font-bold text-white">2027年 机器人各大核心厂商家出货目标与真实量化进度排位</span>
            <span className="text-[10px] text-cyan-400 font-mono">点击查看研学大报告 ▾</span>
          </div>

          <div className="space-y-4 h-[330px] overflow-y-auto pr-1">
            {brands.map((b) => (
              <div 
                key={b.name} 
                className="p-3.5 rounded-lg bg-[#070b16]/80 border border-[#1b253f] hover:border-cyan-400/40 transition-all space-y-2.5 cursor-pointer"
                onClick={() => setHoveredBrand(hoveredBrand === b.name ? null : b.name)}
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: b.color }}></span>
                    {b.name}
                  </span>
                  <span className="font-mono text-cyan-400 font-bold">{b.output}</span>
                </div>

                {/* Simulated bar */}
                <div className="space-y-1">
                  <div className="w-full bg-[#10172a] h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500" 
                      style={{ width: `${b.progress}%`, backgroundColor: b.color }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono">
                    <span>产能负荷系数: {b.progress}%</span>
                    <span>预计大盘占比: {b.share}</span>
                  </div>
                </div>

                {/* Fact detailed preview toggle */}
                {hoveredBrand === b.name && (
                  <div className="p-3 rounded-md bg-cyan-950/15 border border-cyan-800/40 text-[11px] text-gray-300 leading-relaxed font-sans mt-2 animate-fade-in">
                    <strong>产线量化谍报：</strong> {b.fact}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottleneck Technologies Breaking Forth in 2027 (2 columns) */}
        <div className="bg-[#0b1224] border border-[#20325d] rounded-xl p-5 lg:col-span-2 space-y-4">
          <div className="pb-3 border-b border-[#1f2e51]">
            <span className="text-xs font-bold text-white block">2027年 元器件突破路线图</span>
            <span className="text-[10px] text-gray-500 block mt-0.5">选择不同微模块观察核心工艺突破与其降价弹性</span>
          </div>

          {/* Buttons selection wrap */}
          <div className="flex flex-wrap gap-1.5">
            <button 
              onClick={() => setSelectedTech('skin')}
              className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-all cursor-pointer ${
                selectedTech === 'skin' ? 'bg-cyan-950/40 text-[#00f3ff] border-cyan-600' : 'bg-[#070b16] text-gray-400 border-gray-800'
              }`}
            >
              电子皮肤阵列
            </button>
            <button 
              onClick={() => setSelectedTech('screw')}
              className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-all cursor-pointer ${
                selectedTech === 'screw' ? 'bg-cyan-950/40 text-[#00f3ff] border-cyan-600' : 'bg-[#070b16] text-gray-400 border-gray-800'
              }`}
            >
              磨削行星丝杠
            </button>
            <button 
              onClick={() => setSelectedTech('motor')}
              className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-all cursor-pointer ${
                selectedTech === 'motor' ? 'bg-cyan-950/40 text-[#00f3ff] border-cyan-600' : 'bg-[#070b16] text-gray-400 border-gray-800'
              }`}
            >
              空心杯电机
            </button>
            <button 
              onClick={() => setSelectedTech('vla')}
              className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-all cursor-pointer ${
                selectedTech === 'vla' ? 'bg-cyan-950/40 text-[#00f3ff] border-cyan-600' : 'bg-[#070b16] text-gray-400 border-gray-800'
              }`}
            >
              端侧智能SoC
            </button>
          </div>

          {/* Details render */}
          <div className="p-4 rounded-xl bg-[#070b16]/70 border border-[#1b2848] space-y-3.5 h-[270px] flex flex-col justify-between">
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                {techBreakdowns[selectedTech].title}
              </h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                {techBreakdowns[selectedTech].desc}
              </p>
              <div className="space-y-1">
                {techBreakdowns[selectedTech].points.map((pt, idx) => (
                  <div key={idx} className="text-[11px] text-gray-300 flex items-start gap-1.5 font-sans">
                    <span className="text-cyan-500 font-bold mt-0.5">•</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-2 border-t border-gray-800 flex justify-between items-center">
              <div>
                <span className="text-[10px] text-gray-500 font-mono block">2027 出厂均价预测:</span>
                <span className="text-xs text-emerald-400 font-bold font-mono">{techBreakdowns[selectedTech].rate}</span>
              </div>
              <span className="text-[10px] bg-red-950/30 text-red-400 border border-red-900/40 px-2 py-0.5 rounded font-mono font-bold">
                {techBreakdowns[selectedTech].diff}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Year2030DashboardView({ totalEntriesCount }: ViewProps) {
  const [selectedScenario, setSelectedScenario] = useState<'acceleration' | 'strain' | 'limit'>('acceleration');
  
  // Interactive sandbox states
  const [cagr, setCagr] = useState<number>(45);
  const [localizeRate, setLocalizeRate] = useState<number>(85);

  // Computed outcome for 2030 based on sandbox variables
  const computedPopulation = ((cagr * 0.06 * localizeRate * 0.1) + 1.2).toFixed(1);
  const computedBOMCost = (35000 / (1 + (cagr * localizeRate) / 2500)).toFixed(0);

  const scenarios = {
    acceleration: {
      title: "🔥 高速突破与超强具身泛化场景 (置信概率: 75%)",
      population: "500 - 800万台",
      replaceRate: "行业全面自研替代超 85%",
      desc: "大模型在物理合成试验数据上完成了自我监督反馈循环，机器人大脑能够自我泛化各类未知异形工具的操作。在商业服务、精细化工防爆代工等高危险恶劣环境中实现大面积有人替换，硬件价格因白电级装配效应降低至美金$9,800以内。",
      regulation: "设立全球统一的硬件碰撞限位、本能级物理红色切断阀及人形劳动保护税制度。"
    },
    strain: {
      title: "⛓️ 供应链重载高能磁及磨床产能瓶颈场景 (置信概率: 15%)",
      population: "150 - 250万台",
      replaceRate: "供应链瓶颈受限 50%",
      desc: "尽管神经世界模拟完美无漂移，但在高能永磁空心杯贴附用胶、精密滚柱冷拔模床淬火处理等物理设备产能受限，导致高扭矩高频出货供不应求，整装价格仍维持在$3.5万美金以上，多应用只在高价值工业厂区定型部署。",
      regulation: "启动碳中和劳动补偿，严格要求企业在核心肢体受限时通过替代人机调配平差。"
    },
    limit: {
      title: "🥶 决策多跳算力受挫及数据漂移安全壁垒场景 (置信概率: 10%)",
      population: "80 - 120万台",
      replaceRate: "仅针对特定科研项目 25%",
      desc: "端侧VLA在极限环境（如深层矿井大振动、大油多盐海洋钻台）因力传感器温漂产生自反自激，面临不可预知的碰撞风险。法律出台了最对大扭矩大惯量整机的上机安全核验红带，导致难以迅速铺量进入家用领域。",
      regulation: "强制规定凡具有150N.m扭矩以上的作业硬件均需加长光纤反馈约束并在硬实屏蔽隔离防护罩里封闭运行。"
    }
  };

  return (
    <div className="space-y-6 animate-fade-in" id="dashboard_2030_container">
      {/* 2030 Strategic Banner */}
      <div className="bg-[#0e0f21] border border-indigo-500/30 rounded-xl p-5 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/20 via-transparent to-transparent pointer-events-none"></div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-ping"></span>
            <h3 className="text-md font-extrabold text-[#7c3aed] uppercase tracking-wider">
              2030年 具身智能长周期战略研判与终局猜想起点数据沙盘
            </h3>
          </div>
          <p className="text-xs text-gray-400">
            欢迎来到2030年长周期战略沙盘。在这里，您可以切换未来三条最主要演进场景线，或者通过底部拉动战略因子，自行推演到2030年全球机器人真实装机保有量与极限整机BOM底成本。
          </p>
        </div>
        <span className="text-xs bg-[#19153a] border border-indigo-500/40 text-indigo-300 rounded px-2.5 py-1 font-mono shrink-0">
          2030 预测沙盘
        </span>
      </div>

      {/* Metric cards linked dynamically to sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-[#0b1224] border border-[#20325d] rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-2 right-2 p-1.5 rounded bg-indigo-950/40 text-indigo-400">
            <Globe className="w-4 h-4" />
          </div>
          <span className="text-xs text-gray-400 block font-medium">推演: 全球保有机器人总量 (2030)</span>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white font-mono">{computedPopulation}</span>
            <span className="text-xs text-indigo-400 font-bold">百万台以上</span>
          </div>
          <p className="text-[10px] text-gray-500 mt-2 font-mono">
            基于 CAGR: {cagr}% 叠加国产换装比率: {localizeRate}% 推算
          </p>
        </div>

        <div className="bg-[#0b1224] border border-[#20325d] rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-2 right-2 p-1.5 rounded bg-purple-950/40 text-purple-400">
            <Database className="w-4 h-4" />
          </div>
          <span className="text-xs text-gray-400 block font-medium">推演: 最优主机核心制造成本</span>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white font-mono">${Number(computedBOMCost).toLocaleString()}</span>
            <span className="text-xs text-purple-400 font-bold">美元 (等值BOM)</span>
          </div>
          <p className="text-[10px] text-gray-500 mt-2 font-mono">
            成本随着供应链量产规模达成而自主折旧曲线释出
          </p>
        </div>

        <div className="bg-[#0b1224] border border-[#20325d] rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-2 right-2 p-1.5 rounded bg-emerald-950/40 text-[#10b981]">
            <Coins className="w-4 h-4" />
          </div>
          <span className="text-xs text-gray-400 block font-medium">制造业/家庭劳动力替换渗透率 (2030)</span>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white font-mono">28.4%</span>
            <span className="text-xs text-emerald-400 font-bold">重点劳动工段</span>
          </div>
          <p className="text-[10px] text-emerald-400 mt-2">
            中国及欧美先进制造业生产流水线已跑通全面具身无人化
          </p>
        </div>

        <div className="bg-[#0b1224] border border-[#20325d] rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-2 right-2 p-1.5 rounded bg-amber-950/40 text-amber-500">
            <Award className="w-4 h-4" />
          </div>
          <span className="text-xs text-gray-400 block font-medium">小脑大语言动作模型（VLA）终极形态</span>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white font-mono">100% 端侧自治</span>
            <span className="text-xs text-amber-500 font-bold">端到端物理反漂移</span>
          </div>
          <p className="text-[10px] text-amber-500 mt-2">
            完全消化仿真漂移，无感知自修复外界异形碰撞扭矩
          </p>
        </div>
      </div>

      {/* Main long-term layouts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Scenario matrix selection card panel (3 columns) */}
        <div className="bg-[#0b1224] border border-[#20325d] rounded-xl p-5 lg:col-span-3 space-y-4">
          <div className="pb-3 border-b border-[#1f2e51] flex justify-between items-center">
            <div>
              <span className="text-xs font-bold text-white block">2030年 三条宏观战略演化终局猜想对齐</span>
              <span className="text-[10px] text-gray-500 mt-0.5">点击下方标签即可全景解密不同阻抗与保有情调</span>
            </div>
            <span className="text-[10px] text-indigo-400 font-mono font-bold animate-pulse">● SELECTABLE</span>
          </div>

          {/* Scenario tab buttons */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setSelectedScenario('acceleration')}
              className={`p-3 rounded-lg text-xs font-extrabold border leading-snug transition-all cursor-pointer ${
                selectedScenario === 'acceleration' ? 'bg-indigo-950/40 text-indigo-400 border-indigo-500' : 'bg-[#070b16] text-gray-400 border-gray-800 hover:text-white'
              }`}
            >
              🚀 高速大爆发 (75%)
            </button>
            <button
              onClick={() => setSelectedScenario('strain')}
              className={`p-3 rounded-lg text-xs font-extrabold border leading-snug transition-all cursor-pointer ${
                selectedScenario === 'strain' ? 'bg-indigo-950/40 text-indigo-400 border-indigo-500' : 'bg-[#070b16] text-gray-400 border-gray-800 hover:text-white'
              }`}
            >
              ⛓️ 供应链瓶颈 (15%)
            </button>
            <button
              onClick={() => setSelectedScenario('limit')}
              className={`p-3 rounded-lg text-xs font-extrabold border leading-snug transition-all cursor-pointer ${
                selectedScenario === 'limit' ? 'bg-indigo-950/40 text-indigo-400 border-indigo-500' : 'bg-[#070b16] text-gray-400 border-gray-800 hover:text-white'
              }`}
            >
              🥶 决策受阻 limits (10%)
            </button>
          </div>

          <div className="p-4.5 rounded-xl bg-[#070b16]/80 border border-[#1a2542] space-y-4">
            <h4 className="text-xs font-extrabold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-400" />
              {scenarios[selectedScenario].title}
            </h4>
            <div className="grid grid-cols-2 gap-4 text-[11px] font-mono border-b border-gray-800 pb-3">
              <div>
                <span className="text-gray-500 block">预计全球保有单位:</span>
                <span className="text-white font-bold text-xs">{scenarios[selectedScenario].population}</span>
              </div>
              <div>
                <span className="text-gray-500 block">中上游关键换装替代率:</span>
                <span className="text-emerald-400 font-bold text-xs">{scenarios[selectedScenario].replaceRate}</span>
              </div>
            </div>
            <div className="space-y-3 text-[11px] leading-relaxed">
              <p className="text-gray-300 font-sans">{scenarios[selectedScenario].desc}</p>
              <p className="text-gray-400 bg-indigo-950/15 p-3 rounded border border-indigo-900/30">
                <strong className="text-[#a78bfa] block mb-1">⚖️ 2030 终局配套安全及全球法规前瞻：</strong>
                {scenarios[selectedScenario].regulation}
              </p>
            </div>
          </div>
        </div>

        {/* Predictive sandbox workspace (2 columns) */}
        <div className="bg-[#0b1224] border border-[#20325d] rounded-xl p-5 lg:col-span-2 space-y-4">
          <div className="pb-3 border-b border-[#1f2e51]">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-purple-400" />
              <span>战略参数推演工作室 (Predictive Workspace)</span>
            </span>
            <p className="text-[10px] text-gray-500 mt-0.5">调节下方滑块，观察大数推演大盘的自我解耦修正</p>
          </div>

          <div className="space-y-5">
            {/* Slider 1: CAGR */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-300">📈 人形机器人年化 CAGR (复合成长率)</span>
                <span className="text-[#7c3aed] font-black font-mono">{cagr}%</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="85" 
                value={cagr}
                onChange={e => setCagr(Number(e.target.value))}
                className="w-full accent-indigo-500 h-1.5 bg-[#070b16] rounded-lg cursor-pointer" 
              />
              <div className="flex justify-between text-[8px] text-gray-500 font-mono">
                <span>10% 保守替换</span>
                <span>45% 中性常规</span>
                <span>85% 超高替换</span>
              </div>
            </div>

            {/* Slider 2: Localize Ratio */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-300">🔴 中上游零部件全谱系国产自研替代率</span>
                <span className="text-emerald-400 font-black font-mono">{localizeRate}%</span>
              </div>
              <input 
                type="range" 
                min="35" 
                max="98" 
                value={localizeRate}
                onChange={e => setLocalizeRate(Number(e.target.value))}
                className="w-full accent-emerald-500 h-1.5 bg-[#070b16] rounded-lg cursor-pointer" 
              />
              <div className="flex justify-between text-[8px] text-gray-500 font-mono">
                <span>35% 底座外包</span>
                <span>65% 行星自研突破</span>
                <span>98% 全链彻底卡脖国产化</span>
              </div>
            </div>

            {/* Static Sandbox Insights for 2030 */}
            <div className="p-3.5 rounded-lg bg-indigo-950/10 border border-[#1f1d3e] text-[11px] text-gray-400 space-y-1.5">
              <div className="flex items-center gap-1 text-[#a78bfa] font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>沙盘宏观推算结果解读</span>
              </div>
              <p className="leading-relaxed font-sans">
                当复合增速锁定在 <strong className="text-white">{cagr}%</strong> 且自主国产化拉升至 <strong className="text-white">{localizeRate}%</strong> 时，全球工业级高转矩空心杯线圈及一体化驱控关节电缸出货将呈现近十倍膨胀，这极高拉升了常州、深圳等机器人核心集群大镇的产值，BOM总件成本可以跌穿 <strong className="text-white">${Number(computedBOMCost).toLocaleString()} 美元</strong>，释放巨大爆发红利。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
