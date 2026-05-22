import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  Cpu, 
  Sliders, 
  HelpCircle, 
  CheckCircle2, 
  ArrowUpRight, 
  TrendingUp, 
  Zap, 
  DollarSign, 
  ChevronRight, 
  Target, 
  ShieldAlert,
  Server,
  Activity,
  Layers,
  Compass
} from 'lucide-react';

interface MarketAnalysisProps {
  onSelectCompanyByName?: (name: string) => void;
  onNavigateToDatabase?: (searchOrCategory: string) => void;
}

interface SectorDetails {
  id: string;
  name: string;
  english: string;
  icon: React.ReactNode;
  cagrText: string;
  cagrVal: number; // e.g. 52
  marketSize2024: number; // in hundred million RMB
  marketSize2026: number;
  marketSize2030: number;
  bomCost2024: number; // RMB per unit
  bomCost2026: number;
  bomCost2030: number;
  localize2024: number; // percentage
  localize2026: number;
  localize2030: number;
  bottleneck: string;
  leadCompanies: string[];
  techRoutes: string[];
  description: string;
  prospectiveInsight: string;
}

export function MarketAnalysisView({ onSelectCompanyByName, onNavigateToDatabase }: MarketAnalysisProps) {
  // 8 High-Frontier Sub-Sectors (8大前沿细分赛道)
  const sectors: SectorDetails[] = [
    {
      id: 'dexterous-hand',
      name: '灵巧手、腱绳与末端多指执行器',
      english: 'Dexterous Hands & Tendon Clutches',
      icon: <Activity className="w-5 h-5 text-pink-400" />,
      cagrText: '+58.4%',
      cagrVal: 58.4,
      marketSize2024: 12.5,
      marketSize2026: 38.0,
      marketSize2030: 245.0,
      bomCost2024: 25000,
      bomCost2026: 12000,
      bomCost2030: 3500,
      localize2024: 20,
      localize2026: 52,
      localize2030: 88,
      bottleneck: '14+自由度极限体积内的微扭矩保持力、柔韧腱绳高强度碳流纤维在50万回阻抗磨损后的应变零漂。',
      leadCompanies: ['灵心巧手', '智元机器人', 'Tesla Optimus', '优必选', 'Figure AI'],
      techRoutes: [
        '拉线/腱绳多滑轮微机组传动 (轻量高频响应, 适宜人面/日常抓握)',
        '连杆硬质关节直接电机直驱动 (刚性输出强, 适宜汽车装酸工段)',
        '气动微形人工肌肉软体驱动器 (高容错仿生性, 适宜医疗辅助)'
      ],
      description: '灵巧手是具身智能最终跑通精细化物理操作的唯一通道。其包含大量高附加值微传感器及多路阻抗反馈，其成本占人形硬件BOM价值的近15%。',
      prospectiveInsight: '到2030年，随着自粘微绕组空心杯一体成型与触觉解耦算法下沉到指尖MCU，国产灵巧手单手BOM成本有望彻底砸穿 ¥3,000 元，迎来万物皆可抓的爆发极点。'
    },
    {
      id: 'roller-screw',
      name: '行星滚柱丝杠及高频线性电缸组',
      english: 'Planetary Roller Screws & Linear Actuators',
      icon: <Layers className="w-5 h-5 text-cyan-400" />,
      cagrText: '+46.8%',
      cagrVal: 46.8,
      marketSize2024: 28.0,
      marketSize2026: 82.5,
      marketSize2030: 410.0,
      bomCost2024: 6500,
      bomCost2026: 3200,
      bomCost2030: 950,
      localize2024: 15,
      localize2026: 45,
      localize2030: 82,
      bottleneck: '大批量磨削状态下的2μm级螺旋线精度误差控制，以及表面硬化频淬深度的均匀度硬伤。',
      leadCompanies: ['五洲新春', '贝斯特', '恒立液压', '三花智控', 'Tesla'],
      techRoutes: [
        '行星滚柱冷拔精磨工艺 (重载承重达几吨, 特有千赫兹刚度响应)',
        '精轧圆球循环滚珠丝杠 (常规型降本方案, 寿命中等响应略低)',
        '超高频直驱液电联合线性缸 (高防爆重污染高扭矩, 属于军工特种型)'
      ],
      description: '行星滚柱丝杠主要用于中枢躯干、大腿跨关节、膝部小腿执行段，是人形硬件最能承压的骨骼。2027年前全球该核心磨床产能几乎由少数外资锁定，属兵家必争重器。',
      prospectiveInsight: '随着国内自主研发的多轴联动伺服精磨床在常州、无锡等骨干轴承厂投入使用，行星滚柱丝杠有望对常规人形及重载协作机器人实现全谱系装配覆盖，彻底告别进口垄断。'
    },
    {
      id: 'flexible-skin',
      name: '三维多点柔性触觉电子皮肤',
      english: 'Tactile Flexible Electronic Skins',
      icon: <Activity className="w-5 h-5 text-purple-400" />,
      cagrText: '+72.5%',
      cagrVal: 72.5,
      marketSize2024: 5.5,
      marketSize2026: 22.0,
      marketSize2030: 195.0,
      bomCost2024: 18000,
      bomCost2026: 6200,
      bomCost2030: 1100, // per square meter
      localize2024: 30,
      localize2026: 65,
      localize2030: 90,
      bottleneck: '像素阵列多点引线大范围布设时的相互感应串扰、复杂形变拉伸下温度漂移偏置之极细算法解耦。',
      leadCompanies: ['途见科技', '能斯达', '帕西尼感知', '首形科技'],
      techRoutes: [
        '聚酰亚胺(PI)微纳米阻压敏感阵列 (极好静态力反馈速度快)',
        '纳米陶瓷压电弹性薄膜 (仅响应动态滑移变频, 无外电压功耗)',
        '气柱形光导微通道触觉层 (视觉传感器映射感知, 极耐高压强)'
      ],
      description: '电子皮肤赋予了机器人触力。在安全人机协作及复杂曲面抓握中，仅靠视觉多维重合会出现不可避免的遮挡盲区，必须辅以全幅电子皮肤阻抗矩阵。',
      prospectiveInsight: '中、美两方的顶尖实验室已在2026年攻克了“极温变电子阻抗微温漂自校对”，途见科技等先锋企业已在常州量产线上部署自研多点柔皮，标志着真正的具身小脑力控走向成熟。'
    },
    {
      id: 'edge-vla',
      name: '端侧VLA具身大模型及智能小脑SoC',
      english: 'Edge VLA & Cerebellar Movement Chips',
      icon: <Cpu className="w-5 h-5 text-indigo-400" />,
      cagrText: '+64.2%',
      cagrVal: 64.2,
      marketSize2024: 18.0,
      marketSize2026: 64.0,
      marketSize2030: 380.0,
      bomCost2024: 3500, // per controller system
      bomCost2026: 1800,
      bomCost2030: 450,
      localize2024: 10,
      localize2026: 38,
      localize2030: 75,
      bottleneck: '3D原生多模点云及100Hz动态肌肉反馈的多跳深度推理极限制。必须在低于15瓦端侧功耗下实现200FPS实时运算。',
      leadCompanies: ['地平线', '东土科技', 'Figure AI', 'Tesla (FSD/NPU)', '光轮智能'],
      techRoutes: [
        '原生端侧点云肌肉大模型NPU (直发三轴脉冲, 极速响应纠偏)',
        '云、端两级动态解耦神经系统 (低频慢常识靠云, 高频危小脑靠端)',
        '阻抗硬实时操作微内核指令集系统 (保障在遭受突发振动时安全软自锁)'
      ],
      description: '大模型是具身智能的灵魂。从传统“离散轨迹编程”转向全新的端到端“视觉-语言-动作 (VLA)”，标志着通用零标注自主抓取真正成为现实。',
      prospectiveInsight: '随着大参数硬件芯片算力快速迭代，2027年起端侧VLA不再依赖频繁连网。这为处于工业防爆、医疗微创等绝对断网或长距离通信延迟的恶劣现场扫清了安全盲区。'
    },
    {
      id: 'hollow-cup',
      name: '永磁空心杯无刷高效微特电机',
      english: 'Coreless Brushless Micro-Motors',
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      cagrText: '+39.4%',
      cagrVal: 39.4,
      marketSize2024: 45.0,
      marketSize2026: 110.0,
      marketSize2030: 350.0,
      bomCost2024: 1200, // per piece
      bomCost2026: 450,
      bomCost2030: 120,
      localize2024: 35,
      localize2026: 68,
      localize2030: 92,
      bottleneck: '极小外壁(DN<8mm)状态下的多极密排线圈自粘自动绕制、极快启动速度下(15,000rpm)的微转子动平衡度震颤。',
      leadCompanies: ['鸣志电器', '鼎智科技', '特斯拉(Optimus灵巧主)', '拓普集团'],
      techRoutes: [
        '空心无齿铁芯蜂窝无刷绕线工艺 (超轻自重及极高能效比93%+)',
        '扁平化定子叠片短粗永磁关节 (大极板扭力高响应略显震颤)',
        '直线式小齿驱控滑块连杆组合马达 (高轴向推力，体积紧凑化)'
      ],
      description: '灵巧手需要10-20套独立的微电机，空心杯无无游铁芯、高加速效率是其不二之选。其自动化排线和自粘漆包线的国产自动化机台正处于彻底扩产期。',
      prospectiveInsight: '目前，长三角的领先微电机骨干已经从手工/半自动绕线顺利过渡到全链高速一键全自动绕制，生产量纲放大百倍，驱使空心杯出厂均价彻底下泄，支撑大爆款落地。'
    },
    {
      id: 'harmonic-reducer',
      name: '高精密谐波与硬轴行星减速器',
      english: 'Precision Harmonic Reducers',
      icon: <Compass className="w-5 h-5 text-emerald-400" />,
      cagrText: '+35.1%',
      cagrVal: 35.1,
      marketSize2024: 52.0,
      marketSize2026: 118.0,
      marketSize2030: 290.0,
      bomCost2024: 2800,
      bomCost2026: 1300,
      bomCost2030: 450,
      localize2024: 45,
      localize2026: 72,
      localize2030: 94,
      bottleneck: '柔轮疲劳屈服极限寿命。在高负荷高速行走到150万次振幅后，柔边微裂纹扩张引起的转速间隙变形问题。',
      leadCompanies: ['绿的谐波', '双环传动', '三花智控', '中大力德'],
      techRoutes: [
        '柔弹性齿轮圆周谐波弹性波齿啮合 (同等重功最轻，最适双肢核心关节)',
        '摆线针轮RV行星精齿组合 (大载重最强，最适腰肢重载阻断大扭矩)',
        '高强度合金微型微型精轧减速箱 (体积最小多见于少儿/伴护微手指)'
      ],
      description: '工业机器人及人形重载双足最核心的核心中枢，利用柔轴圆环传动转换极度降速增扭。国产绿的谐波、双环已经完成大批量技术换代。',
      prospectiveInsight: '随着材料提纯与柔齿磨削工艺突破自给阀值，2027年长周期来看，高寿命低齿距谐波减速器国产率可超94%，实现万台主机的全面低廉高精度配换。'
    },
    {
      id: 'force-sensor',
      name: '六轴多维联合力矩力传感器组',
      english: '6-Axis Force Torque Sensors',
      icon: <Sliders className="w-5 h-5 text-blue-400" />,
      cagrText: '+49.2%',
      cagrVal: 49.2,
      marketSize2024: 15.0,
      marketSize2026: 42.0,
      marketSize2030: 175.0,
      bomCost2024: 6800,
      bomCost2026: 2800,
      bomCost2030: 620,
      localize2024: 25,
      localize2026: 58,
      localize2030: 85,
      bottleneck: '复杂耦合应变结构、超零漂多维电桥高速ADC信号解译、多级变频震动自反平衡校准和工艺误差。',
      leadCompanies: ['蓝点触控', '宇树科技', '帕西尼', '智元机器人'],
      techRoutes: [
        '硅基微机械悬臂应变片电桥测量 (体积纤细精度极佳，单价偏高)',
        '多点压阻式复合阻抗晶体层测力 (价格稍低硬度高，抗侧向过载保护略弱)',
        '电容微变隙阵列差动式多向力矩 (温漂大，但绝对应变极快，适宜高速行走端)'
      ],
      description: '人形双足在各种倾斜非标碎石地面行走时，足踝、手腕两端必须通过六维力敏感器精确把控外界大回弹，使本体一毫秒内实现重力小脑对齐自衡。',
      prospectiveInsight: '六维触力传感器的最大壁垒主要在于精密对标标定工艺。随着全自动流水精密标定台的量产使用，产品的一致性将有近十倍提振，大幅降低灵巧控制阻抗门槛。'
    },
    {
      id: 'low-altitude-evtol',
      name: '低空重载动力及eVTOL飞控系统',
      english: 'Low-Altitude UAV & eVTOL Avionics',
      icon: <Server className="w-5 h-5 text-teal-400" />,
      cagrText: '+51.3%',
      cagrVal: 51.3,
      marketSize2024: 35.0,
      marketSize2026: 98.0,
      marketSize2030: 480.0,
      bomCost2024: 240000, // per composite vehicle power set
      bomCost2026: 110000,
      bomCost2030: 18000,
      localize2024: 40,
      localize2026: 75,
      localize2030: 95,
      bottleneck: '16轴/24联载重多变动力电机在空中突发横向风阻下的三向热饱和飞控算法重构、大功率快充碳陶瓷极长寿命电池充发平衡安全保护。',
      leadCompanies: ['亿航智能', '小鹏汇天', '峰飞航空', '东土科技'],
      techRoutes: [
        '多级宽频同步永磁电机驱多向共轴桨 (大推力备份高，适宜城市空中观光)',
        '涵道风扇矢量倾转推力系统 (巡航航程长起降静音强，最难倾合过渡算法)',
        '油电大功率高密度混合多动能飞控 (超长续航重型拉货，污染稍多噪音大)'
      ],
      description: '低空经济（eVTOL、载人多旋翼）在2026年全速爆破。其需要极其稳健的防卡爆、硬实时多向动力及多余度飞控逻辑，也是具身中枢算力扩展的重要场景。',
      prospectiveInsight: '大盘数据已彻底切入。随着粤港澳、苏浙沪首批重点低空观光旅游及医疗快递常态化运营，低空装备的供应链已完全契合国内高速空心电机和一体化驱控关节产线，达到完美的低空对齐。'
    }
  ];

  // Selected Sector ID state
  const [selectedSectorId, setSelectedSectorId] = useState<string>('dexterous-hand');

  const getSearchTerm = (id: string) => {
    switch (id) {
      case 'dexterous-hand': return '灵巧手';
      case 'roller-screw': return '丝杠';
      case 'flexible-skin': return '电子皮肤';
      case 'edge-vla': return 'VLA';
      case 'hollow-cup': return '电机';
      case 'harmonic-reducer': return '减速器';
      case 'force-sensor': return '传感器';
      case 'low-altitude-evtol': return '低空';
      default: return '';
    }
  };

  // Interactive Sandbox states inside Market Analysis View
  const [scaleInput, setScaleInput] = useState<number>(50); // index 0 to 100
  const [localSpeedInput, setLocalSpeedInput] = useState<number>(60); // percentage

  // Find currently active sector object
  const activeSector = useMemo(() => {
    return sectors.find(s => s.id === selectedSectorId) || sectors[0];
  }, [selectedSectorId]);

  // Compute sandbox outputs dynamically based on inputs
  const simulatedValues = useMemo(() => {
    // scale factor base on slider
    const factorMultiplier = 0.5 + (scaleInput / 50); // ranges from 0.5 to 2.5
    const localMultiplier = localSpeedInput / 100; // ranges from 0 to 1.0

    const marketSize2030Computed = activeSector.marketSize2030 * factorMultiplier;
    // B0M cost decreases as localization speed increases
    const bomCost2030Computed = activeSector.bomCost2030 * (1.3 - (localMultiplier * 0.5));
    // Localization value towards 2030 adapts to customized inputs
    const localize2030Computed = Math.min(100, Math.max(30, Math.round(activeSector.localize2030 * (0.8 + 0.3 * localMultiplier))));

    return {
      size: marketSize2030Computed.toFixed(1),
      bom: Math.round(bomCost2030Computed).toLocaleString(),
      loc: localize2030Computed
    };
  }, [activeSector, scaleInput, localSpeedInput]);

  return (
    <div className="space-y-6 animate-fade-in" id="market_analysis_interactive_view">
      
      {/* 2026-2030 Slogan & Guide Banner */}
      <div className="bg-gradient-to-r from-[#0d1632] via-[#080d19] to-[#04060c] border border-cyan-500/20 rounded-xl p-5 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none"></div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00f3ff] animate-ping"></span>
            <h3 className="text-md font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
              <span>八大前沿细分赛道深度解构与沙盘推演总控制台</span>
            </h3>
          </div>
          <p className="text-xs text-gray-400">
            精研具身智能硬件BOM与低空装备中的核心高附高爆元器件，提供极具置信度的大盘趋势、技术路线与卡脖子制造瓶颈剖析。
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <button
            onClick={() => onNavigateToDatabase && onNavigateToDatabase("")}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/50 text-xs font-bold rounded transition-all cursor-pointer shadow-md"
          >
            📂 点击进入主数据库查看大盘
          </button>
          <span className="text-xs bg-[#122345] border border-cyan-400/30 text-cyan-300 rounded px-3 py-1.5 font-mono font-bold shrink-0">
            决策增值情报库
          </span>
        </div>
      </div>

      {/* Main Grid: Sector Tabs on Left (1 column Desktop), Details Panel on Right (3 columns Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Side: Sector Selectable Buttons */}
        <div className="space-y-2.5 lg:col-span-1">
          <div className="px-2 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
            请选择前沿高附细分赛道:
          </div>
          <div className="flex flex-col gap-2">
            {sectors.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSectorId(s.id)}
                className={`w-full flex items-center gap-2.5 p-3 rounded-lg text-left text-xs transition-all border outline-none cursor-pointer ${
                  selectedSectorId === s.id 
                    ? 'bg-gradient-to-r from-[#111f3d] to-[#080d1a] border-[#00f3ff] text-white shadow-md' 
                    : 'bg-[#070b16] border-[#1e2e50] text-gray-400 hover:bg-[#0c162f] hover:text-white'
                }`}
              >
                <span className="shrink-0">{s.icon}</span>
                <div className="truncate">
                  <p className="font-extrabold truncate">{s.name}</p>
                  <p className="text-[9px] text-gray-500 font-mono mt-0.5 truncate">{s.english}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Deep Analysis Deck */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-[#0b1224] border border-[#20325d] rounded-xl p-5 md:p-6 space-y-6">
            
            {/* Header containing Name and CAGR */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1b2d56]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {activeSector.icon}
                  <h3 className="text-sm md:text-base font-extrabold text-white flex items-center gap-1.5">
                    {activeSector.name}
                  </h3>
                </div>
                <p className="text-xs text-gray-400 font-mono italic">{activeSector.english}</p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      const term = getSearchTerm(activeSector.id);
                      if (onNavigateToDatabase) onNavigateToDatabase(term);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 hover:border-cyan-400/50 text-[11px] font-bold rounded transition-all cursor-pointer shadow-sm"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>去主数据库检索「{getSearchTerm(activeSector.id)}」相关企业</span>
                  </button>
                </div>
              </div>
              <div className="bg-emerald-950/45 border border-emerald-500/40 px-3.5 py-1.5 rounded-lg text-right shrink-0">
                <span className="text-[10px] text-emerald-400 font-mono block">复合年化增长率 (CAGR)</span>
                <span className="text-sm font-black text-[#10b981] font-mono">{activeSector.cagrText}</span>
              </div>
            </div>

            {/* Core Description Text */}
            <div className="text-xs text-gray-300 leading-relaxed font-sans bg-[#070b16]/80 p-4 rounded-xl border border-[#172544] relative">
              <span className="absolute top-2.5 right-3 text-cyan-500 font-mono text-[9px] pointer-events-none select-none">DESCR.</span>
              <p>{activeSector.description}</p>
            </div>

            {/* 3 Metric Progress Blocks: Market Size, Unit BOM, Localization */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Metric 1: Track Market Size */}
              <div className="p-4 rounded-xl bg-[#070b16] border border-[#1f2f54] space-y-3">
                <span className="text-[11px] text-gray-400 font-bold block">赛道大盘规模 (亿元 - RMB)</span>
                <div className="space-y-2">
                  <div className="flex justify-between items-end text-xs">
                    <span className="text-gray-500 font-mono">2024</span>
                    <span className="text-white font-mono font-bold">¥{activeSector.marketSize2024}亿</span>
                  </div>
                  <div className="flex justify-between items-end text-xs">
                    <span className="text-gray-500 font-mono">2026年 </span>
                    <span className="text-[#00f3ff] font-mono font-bold">¥{activeSector.marketSize2026}亿</span>
                  </div>
                  <div className="flex justify-between items-end text-xs">
                    <span className="text-gray-500 font-mono">2030 (研判)</span>
                    <span className="text-white font-mono font-bold text-xs">¥{activeSector.marketSize2030}亿</span>
                  </div>
                </div>
                {/* Micro trend visualization */}
                <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden flex">
                  <div className="h-full bg-cyan-700" style={{ width: '15%' }}></div>
                  <div className="h-full bg-cyan-500" style={{ width: '30%' }}></div>
                  <div className="h-full bg-cyan-300" style={{ width: '55%' }}></div>
                </div>
              </div>

              {/* Metric 2: Unit BOM Reference Pricing */}
              <div className="p-4 rounded-xl bg-[#070b16] border border-[#1f2f54] space-y-3">
                <span className="text-[11px] text-gray-400 font-bold block">单套/单关节BOM出厂均价较</span>
                <div className="space-y-2">
                  <div className="flex justify-between items-end text-xs">
                    <span className="text-gray-500 font-mono">2024</span>
                    <span className="text-gray-400 font-mono font-medium">¥{activeSector.bomCost2024.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-end text-xs">
                    <span className="text-gray-500 font-mono">2026年 </span>
                    <span className="text-amber-500 font-mono font-bold">¥{activeSector.bomCost2026.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-end text-xs">
                    <span className="text-gray-500 font-mono">2030年组 </span>
                    <span className="text-emerald-400 font-mono font-bold">¥{activeSector.bomCost2030.toLocaleString()}</span>
                  </div>
                </div>
                {/* Cost reduction percentage tag */}
                <div className="pt-1.5 border-t border-gray-800 text-[10px] text-emerald-400 font-mono flex items-center justify-between">
                  <span>累积跌幅:</span>
                  <span className="font-bold">-{Math.round(((activeSector.bomCost2024 - activeSector.bomCost2030) / activeSector.bomCost2024) * 100)}%</span>
                </div>
              </div>

              {/* Metric 3: National Localization Ratio */}
              <div className="p-4 rounded-xl bg-[#070b16] border border-[#1f2f54] space-y-3">
                <span className="text-[11px] text-gray-400 font-bold block">核心核心元器国产化自给率</span>
                <div className="space-y-2">
                  <div className="flex justify-between items-end text-xs">
                    <span className="text-gray-500 font-mono">2024</span>
                    <span className="text-gray-400 font-mono">{activeSector.localize2024}%</span>
                  </div>
                  <div className="flex justify-between items-end text-xs">
                    <span className="text-gray-500 font-mono">2026年 </span>
                    <span className="text-cyan-400 font-mono font-bold">{activeSector.localize2026}%</span>
                  </div>
                  <div className="flex justify-between items-end text-xs">
                    <span className="text-gray-500 font-mono">2030年 </span>
                    <span className="text-emerald-400 font-mono font-bold">{activeSector.localize2030}%</span>
                  </div>
                </div>
                {/* Visual meter */}
                <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all duration-300" style={{ width: `${activeSector.localize2030}%` }}></div>
                </div>
              </div>

            </div>

            {/* Technical Routes / Process and Blockers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
              
              {/* A. Blockers */}
              <div className="p-4 rounded-xl bg-red-950/10 border border-red-900/40 space-y-2.5">
                <span className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" />
                  <span>核心技术 / 工艺难点卡脖系数 (Bottleneck)</span>
                </span>
                <p className="text-[11px] text-gray-300 leading-relaxed font-sans">
                  {activeSector.bottleneck}
                </p>
                <div className="text-[10px] bg-red-950/40 text-red-300 p-2 rounded border border-red-950/70 font-mono">
                  🚨 主要阻碍：高维校准极为繁琐、物理疲劳及大惯量温漂极易自激。
                </div>
              </div>

              {/* B. Core Technical Routes */}
              <div className="p-4 rounded-xl bg-[#091124] border border-[#1b2b52] space-y-2.5">
                <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                  <Compass className="w-4 h-4" />
                  <span>主流工艺路线特征 (Typical Tech Paths)</span>
                </span>
                <div className="space-y-1.5">
                  {activeSector.techRoutes.map((rt, idx) => (
                    <div key={idx} className="text-[11px] text-gray-300 leading-relaxed flex items-start gap-1">
                      <span className="text-cyan-500 font-bold mt-0.5">•</span>
                      <span>{rt}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Core Leading Players Interactive Tags */}
            <div className="p-4 rounded-xl bg-gray-950/20 border border-gray-800 space-y-3 font-sans">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-white flex items-center gap-1.5 shrink-0">
                  <Target className="w-4 h-4 text-purple-400" />
                  <span>代表对标龙头厂商/资本标的 (关联推荐)</span>
                </span>
                <button
                  onClick={() => {
                    const term = getSearchTerm(activeSector.id);
                    if (onNavigateToDatabase) onNavigateToDatabase(term);
                  }}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 font-extrabold flex items-center gap-1 transition-all bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 hover:border-cyan-400/60 rounded-md px-2.5 py-1 cursor-pointer shadow-sm shrink-0 self-start sm:self-auto"
                >
                  <span>📂 点击进入主数据库查看「{getSearchTerm(activeSector.id)}」相关企业</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {activeSector.leadCompanies.map((cName) => (
                  <button
                    key={cName}
                    onClick={() => onSelectCompanyByName && onSelectCompanyByName(cName)}
                    className="px-3 py-1.5 rounded-lg bg-[#070b16] border border-gray-800 text-gray-350 text-gray-300 text-xs font-bold hover:border-[#00f3ff] hover:text-[#00f3ff] hover:bg-[#0c162f] transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span>{cName}</span>
                    <ArrowUpRight className="w-3 h-3 text-gray-500 group-hover:text-[#00f3ff]" />
                  </button>
                ))}
              </div>
            </div>

            {/* Sandbox Simulation Widget Inside Sector Details */}
            <div className="p-5.5 rounded-xl bg-gradient-to-r from-[#0d142b] to-[#070b16] border border-[#1e2e4e] space-y-4">
              <div className="border-b border-gray-800/80 pb-2.5 flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-emerald-400" />
                    <span>该赛道 2030 年大盘增值预测模拟器</span>
                  </h4>
                  <p className="text-[10px] text-gray-500 mt-0.5">自调该赛道的年复合量产及国产替代增速，观察对2030年行业终局的解耦对齐影响</p>
                </div>
                <span className="text-[10px] bg-emerald-950/30 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold border border-emerald-900/50">SANDBOX</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Slider 1: Production Multiplier */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">📈 人形/低空主机全球爆发乘数</span>
                    <span className="text-cyan-400 font-bold font-mono">{(0.5 + (scaleInput/50)).toFixed(1)} 倍</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="100" 
                    value={scaleInput} 
                    onChange={(e) => setScaleInput(Number(e.target.value))}
                    className="w-full accent-cyan-400 h-1.5 bg-gray-900 rounded-lg cursor-pointer animate-pulse" 
                  />
                  <div className="flex justify-between text-[8px] font-mono text-gray-600">
                    <span>保守 (0.7x)</span>
                    <span>均衡 (1.5x)</span>
                    <span>极限核爆级 (2.5x)</span>
                  </div>
                </div>

                {/* Slider 2: Localization Speed */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-300">🔴 国产核心零部件替代深度对齐</span>
                    <span className="text-[#10b981] font-bold font-mono">{localSpeedInput}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="100" 
                    value={localSpeedInput} 
                    onChange={(e) => setLocalSpeedInput(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-1.5 bg-gray-900 rounded-lg cursor-pointer" 
                  />
                  <div className="flex justify-between text-[8px] font-mono text-gray-600">
                    <span>仅供科研自留 (15%)</span>
                    <span>主力成型换代 (60%)</span>
                    <span>全生命周期国产化 (100%)</span>
                  </div>
                </div>
              </div>

              {/* Dynamic computed indicators */}
              <div className="p-4 rounded-xl bg-gray-950/40 border border-gray-800 grid grid-cols-3 gap-3 text-center">
                <div>
                  <span className="text-[10px] text-gray-500 block">推估: 2030赛道大容量:</span>
                  <span className="text-xs md:text-sm text-cyan-400 font-black font-mono">¥{simulatedValues.size} 亿元</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block">推估: 单件/套出厂BOM下探:</span>
                  <span className="text-xs md:text-sm text-emerald-400 font-black font-mono">¥{simulatedValues.bom} 元</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 block">推估: 终局国产自给率:</span>
                  <span className="text-xs md:text-sm text-white font-black font-mono">{simulatedValues.loc}% 深度自持</span>
                </div>
              </div>

              {/* Prospective detailed comment */}
              <div className="p-3 bg-cyan-950/10 rounded-lg border border-[#1e2e4e] text-[11px] text-[#00f3ff]/90 leading-relaxed font-sans">
                <strong>💡 推演研习解读：</strong> 
                {activeSector.prospectiveInsight}
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
