/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { DATA } from './data';
import { generateEnterprises, Enterprise } from './generator';
import { Year2027DashboardView, Year2030DashboardView } from './components/YearViews';
import { MarketAnalysisView } from './components/MarketAnalysisView';
import { PatentsView } from './components/PatentsView';
import { REPORTS_DB, DYNAMICS_DB, FUNDING_DB } from './data/reportsAndDynamics';
import { PRODUCTS_DB, ProductItem } from './data/products';
import { ReportViewer } from './components/ReportViewer';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from './context/AuthContext';
import {
  BarChart3,
  Search,
  Database,
  Cpu,
  Download,
  Sparkles,
  Award,
  Activity,
  FileText,
  Send,
  Eye,
  TrendingUp,
  Coins,
  Globe,
  Calendar,
  Shield,
  Zap,
  ChevronRight,
  Info,
  X,
  Menu,
  MapPin,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Filter,
  Check,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  DownloadCloud,
  Layers,
  SearchCode,
  Sliders,
  HelpCircle,
  Settings,
  Bell,
  Star,
  Sparkle,
  LogOut,
  LogIn,
  User
} from 'lucide-react';

interface EcosystemNode {
  id: string;
  label: string;
  role: string;
  description: string;
  type: 'center' | 'upstream' | 'downstream' | 'investment' | 'academic';
  subText: string;
  x: number;
  y: number;
}

function generateEcosystemNodes(company: Enterprise): EcosystemNode[] {
  const seedStr = company.name;
  let hashVal = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hashVal = (hashVal << 5) - hashVal + seedStr.charCodeAt(i);
  }
  hashVal = Math.abs(hashVal);

  const nodes: EcosystemNode[] = [];

  nodes.push({
    id: 'center',
    label: company.name,
    role: company.category,
    description: `核心研制实体主营: ${company.primaryProduct}`,
    type: 'center',
    subText: company.chainStage,
    x: 220,
    y: 110
  });

  const upstreamSuppliers = [
    { label: "三花驱控智造", desc: "旋转执行总成 & 金属谐波模组供应商", sub: "高精一体关节" },
    { label: "绿的谐波工业", desc: "高精度传动谐波减速器及其成套模组", sub: "160N重载传动" },
    { label: "汉威能斯达科技", desc: "微纳米极柔多点阵列触觉感知片与电子皮肤", sub: "电子皮肤模组" },
    { label: "鸣志电器股份", desc: "伺服中空空心杯高效电机与驱控一体模块", sub: "无刷高效驱控" },
    { label: "途见智感晶片", desc: "微流控抗串扰触觉感知滤波核心芯片", sub: "MEMS触觉" },
    { label: "临港超级算力中心", desc: "深度认知模型算法演练与三维重建云集群", sub: "云端算力底座" },
    { label: "Maxon Precision", desc: "极窄径高频微型伺服电机(进口Swiss)", sub: "微装关节动力" },
    { label: "意法半导体联合仓", desc: "高抗饱和车规级双核高速处理处理器", sub: "主控芯片供应" },
    { label: "禾赛科技LiDAR", desc: "高集成固态3D多束避障激光雷达系统", sub: "空间感知定位" }
  ];

  const downstreamClients = [
    { label: "比亚迪临港整线产线", desc: "汽车车底盘部件柔性物理螺栓自动化装配岗", sub: "汽车整线装载" },
    { label: "宝马美国斯帕坦堡工厂", desc: "车门插塞及重载结构高精密焊接示范工区", sub: "工业验证基地" },
    { label: "顺丰智能物流枢纽", desc: "多自由度AGV货到人超高速分拣与码垛协同", sub: "货箱智能分包" },
    { label: "国家电网江苏特种配电", desc: "高抗磁四足带电危险巡检任务群应用示范", sub: "特种高危作业" },
    { label: "北京积水潭微创科室", desc: "术中高频骨科穿刺三维机械辅助与导航系统", sub: "微创定位应用" },
    { label: "盒马上海配货分拣示范仓", desc: "MOMA轮式+手双维协作移动货架精确拾取", sub: "商超冷链抓取" },
    { label: "高仙特种商用物业部", desc: "智能楼宇百货自平衡扫洗全净托管服役", sub: "末端清洁代维" },
    { label: "大众汽车整车合肥厂区", desc: "高频传统多轴重体力总装生产线自动化试点", sub: "整车量产配套" },
    { label: "中航防应急联合部", desc: "高频超视距多功能防爆巡检与物资转运", sub: "防护应急体系" }
  ];

  const academicPartners = [
    { label: "CAS 人形机器人实验室", desc: "联合开发端到端通用物理世界与机器人姿态合成器", sub: "算法深度共研" },
    { label: "清华大学交叉信息学院", desc: "基于端到端强化学习的复杂小脑姿态稳定算法", sub: "RL训练合作" },
    { label: "Stanford Vision Lab", desc: "视觉自适应环境重定义多模态VLA决策大模型", sub: "VLA决策攻关" },
    { label: "哈工大精密传动研讨部", desc: "一体化关节非线性大扭矩输出与材料工艺攻坚", sub: "精密关节合作" },
    { label: "MIT 肢体动力学实验室", desc: "特种极速翻滚自反馈及液压双重姿态校准", sub: "高动态控制研" },
    { label: "浙江大学智能感知中心", desc: "新型电子皮肤交叉抗阻极细精密触觉采集板", sub: "多点触觉攻坚" }
  ];

  const investorFunds = [
    { label: "红杉中国 / 红杉资本", desc: "引领行业生态种子孵化与后续多轮追加投资", sub: "资本纽带" },
    { label: "高瓴创投 / 瓴岳资本", desc: "多维度机器人产业链横向资源对接与深度联动", sub: "资源链接" },
    { label: "真格基金 / 奇绩创坛", desc: "早期颠覆性具身产品研发阶段直接资金投配", sub: "种子硬科技" },
    { label: "深创投 / 深圳引导基金", desc: "国有及地方性战新要素核心配资与产业落地扶持", sub: "战略配套" },
    { label: "Founders Fund / YC", desc: "全球顶尖通用具身硬科技投资，协助国际商业对接", sub: "全球顶尖风投" },
    { label: "腾讯智能生态与战投部", desc: "结合其LLM混元算法及腾讯高爆发云算力赋能", sub: "产业协同" }
  ];

  const upIdx = hashVal % upstreamSuppliers.length;
  const downIdx = (hashVal + 2) % downstreamClients.length;
  const acadIdx = (hashVal + 4) % academicPartners.length;
  const invIdx = (hashVal + 6) % investorFunds.length;

  let up = upstreamSuppliers[upIdx];
  let down = downstreamClients[downIdx];
  let acad = academicPartners[acadIdx];
  let inv = investorFunds[invIdx];

  // Specific overrides for real high-tech giants for highest visual authenticity
  if (company.name.includes("Figure")) {
    up = { label: "OpenAI Brain Inc.", desc: "提供全感官多模态神经推理大脑推理层接口与自训练集", sub: "多模态大模型对接" };
    down = { label: "BMW Spartanburg Plant", desc: "高规格汽车精装部件、轻量底盘螺塞试生产线全天候服役", sub: "汽车整车产线试用" };
    acad = { label: "MIT AI Robotic Group", desc: "高维度足部物理越障抗摔动力学算法联合研究", sub: "通用基座共研" };
    inv = { label: "Microsoft / Nvidia / Bezos", desc: "C轮 10亿美元联合重兵押注，提供无限算力通道", sub: "多维战略巨头" };
  } else if (company.name.includes("特斯拉") || company.name.includes("Tesla") || company.name === "特斯拉Optimus") {
    up = { label: "Tesla FSD Supercluster", desc: "主脑直接接入 Dojo 超算平台，实现端到端数百万小时姿态自动演训", sub: "神经架构底座" };
    down = { label: "Tesla Giga Austin Factory", desc: "常态化派入整装、电驱及转矩插轴体力装配岗自动化试产", sub: "自产自配实测" };
    acad = { label: "Stanford Autonomy Lab", desc: "基于空间几何点云及自进化决策的高频动态微操作共研", sub: "学术共研" };
    inv = { label: "Tesla Inc. (上市公司)", desc: "由母财团直接拨付海量研发预算，实现生态闭环", sub: "独家自主保障" };
  } else if (company.name.includes("智元")) {
    up = { label: "常州临界点机电", desc: "主供高负荷传动关节、空心杯微型驱控以及灵巧手物理关节", sub: "高敏临界执行器" };
    down = { label: "比亚迪临港乘用车厂", desc: "常态落地并装配远征系列工业人形机器人，开展特种装配装机实测", sub: "整车产线试点" };
    acad = { label: "上海期智研究院", desc: "联合共建通用小脑自主控制算法与大模型视觉闭环导航力矩控体系", sub: "前瞻物理大脑" };
    inv = { label: "高瓴创投 / 临港蓝湾", desc: "联合注资，全方位配套提供华东百亿机器人产业群上下游供应链对接", sub: "战术资本纽带" };
  }

  nodes.push({
    id: 'up',
    label: up.label,
    role: "上游供应商 / 核心部件及软件底座",
    description: up.desc,
    type: 'upstream',
    subText: up.sub,
    x: 80,
    y: 50
  });

  nodes.push({
    id: 'down',
    label: down.label,
    role: "下游落地场景 / 典型集成与应用示范",
    description: down.desc,
    type: 'downstream',
    subText: down.sub,
    x: 360,
    y: 50
  });

  nodes.push({
    id: 'acad',
    label: acad.label,
    role: "学术创新共研 / 算法与前沿交叉机构",
    description: acad.desc,
    type: 'academic',
    subText: acad.sub,
    x: 80,
    y: 175
  });

  nodes.push({
    id: 'inv',
    label: inv.label,
    role: "资本纽带 / 关键资源扶持与大财团支持",
    description: inv.desc,
    type: 'investment',
    subText: inv.sub,
    x: 360,
    y: 175
  });

  return nodes;
}

function getBlueprintEcosystem(company: Enterprise) {
  const isAgiBot = company.name.includes("智元");
  const isTesla = company.name.includes("特斯拉") || company.name.includes("Tesla") || company.name === "特斯拉Optimus";
  const isFigure = company.name.includes("Figure");
  const isUnitree = company.name.includes("宇树科技") || company.name.startsWith("宇树");
  const isUBTECH = company.name.includes("优必选") || company.name.includes("UBTECH");

  if (isAgiBot) {
    return {
      strategy: "“一体三智”（机器人本体 + 运动/交互/作业智能）为核心战略极",
      familyGroup: "上海智元机器人（具身大脑与多尺寸双足本体）",
      hardware: ["远征-A2 / A3 (全尺寸通用双足人形)", "灵犀X1 / X2 (高敏极柔灵巧五指执行器)", "精灵-M1 (桌面级高响应协作多轴系系)"],
      subsidiaries: [
        { name: "上海擎天租机器人服务有限公司", tag: "机器人租赁运营", desc: "主导高频率全寿命机器人免押配租与维保托管，打通商业订阅化服役闭环。", share: "100% 独资控股", badge: "控股一级子公司", status: "常态量量运营" },
        { name: "常州临界点机电科技有限公司", tag: "灵巧手/关键部件", desc: "主供高负荷无刷伺服驱控关节、高密度阻抗微米级灵巧指端和压力感知元件。", share: "85% 绝对控股", badge: "核心部件战略实体", status: "常态规模生产" },
        { name: "上海觅蜂智能具身数据开发公司", tag: "具身多模态数据", desc: "承担现场轨迹抓取、多轴协同状态标定和海量真实行为仿真重构逆向演练。", share: "90% 绝对控股", badge: "AI数据核心中枢", status: "每日自动吐纳" },
        { name: "杭州酷拓足式重载科技有限公司", tag: "高爆发四足", desc: "研发大马力越障巡检四足底盘，融合强化学习（RL）步态控制，服务于重工业巡检。", share: "70% 控股兼联营", badge: "工业足式底盘厂", status: "研发与小量产" },
        { name: "深圳上纬具身交互科技有限公司", tag: "C端伴随与家政", desc: "研究高情商家庭情感伴护、非结构化常态化清扫以及柔顺人机配合协作套件。", share: "65% 控股子单位", badge: "消费级拓展前瞻", status: "研发与功能试点" }
      ],
      solutions: [
        { name: "精密精装上下料", status: "工业量产验证" },
        { name: "立体搬运与拆码垛", status: "物流园区常态" },
        { name: "多源视觉物流分拣", status: "物流园区常态" },
        { name: "商超多语门店导购", status: "示范商圈试点" },
        { name: "商业中心餐饮导引", status: "门店联锁部署" },
        { name: "新零售智能交互柜", status: "示范商圈试点" },
        { name: "特种输变电高危作业", status: "电网常态服役" }
      ],
      investments: "参股力控微电子高算力SoC芯片、高敏空心杯驱动总成及多点微纳米薄膜压力皮肤中试厂，积极打通华东华南核心精密供应链，打造千亿级具身通用计算全生态。"
    };
  }

  if (isTesla) {
    return {
      strategy: "“一体三化”（整车流水集成 + 自研电驱核心零部件 + FSD认知超算脑三位一体）",
      familyGroup: "特斯拉Optimus全球机器人业务部 (母财团直属)",
      hardware: ["Optimus Gen 2 (高动态智能双足本体)", "Dojo Supercomputing Node (云端时空大集群)"],
      subsidiaries: [
        { name: "Tesla Dojo Unified Deep AI Node", tag: "大脑训练计算", desc: "负责提供上亿级多模态数据拟合和真实空间多重运动物理模拟极速推演。", share: "100% 独资子公司", badge: "AI算法超级总部", status: "全天候高速云转" },
        { name: "Tesla Bot Joint Production Div", tag: "一体驱控关节", desc: "研发并高频装配大马力旋转关节模组、高冲程滚子线性电缸等核心电驱。", share: "100% 发行直控", badge: "顶级传动生产中心", status: "全自动化产线" },
        { name: "Tesla Giga-Autonomy Giga-Forge", tag: "大吨位一体压铸", desc: "采用万吨级超级压铸机一体成型其超轻钛合金胸廓、硬皮及高度集成机壳。", share: "100% 母工厂支持", badge: "超压铸工艺厂", status: "规模服役" },
        { name: "Neuralink Motion Autonomy Lab", tag: "脑机与姿态映射", desc: "跨界攻关低延迟神经通路指令映射，构建肌肉动力学算法直接向马达灌注。", share: "战术联营机构", badge: "神经控制实验室", status: "成果学术迭代" },
        { name: "Optimus Fleet Management System", tag: "机队租售运维", desc: "专责处理全球机队远程（OTA）资产升级、物理全寿命BOM监测和全包安全托管。", share: "100% 全资辖属", badge: "远程云控运维中心", status: "全球云网就绪" }
      ],
      solutions: [
        { name: "德州超级工厂重型总装", status: "内部应用合流" },
        { name: "特种新能源接头自动插拔", status: "内部应用合流" },
        { name: "整车间重负载物料搬运", status: "内部应用合流" },
        { name: "体验大厅咨询迎宾导流", status: "门店体验测试" },
        { name: "SpaceX星舰仓门载配锁紧", status: "发射基地试验" },
        { name: "高辐射车间防自燃巡检", status: "工艺测试验证" },
        { name: "全自主家庭生活深度打理", status: "概念验证部署" }
      ],
      investments: "依托特斯拉整车超万亿美元制造资源，无缝共享汽车主控电脑（FSD Chip）工艺及电芯（4680电池）核心能量系统，构建无人驾驶与具身形态终极融合闭环。"
    };
  }

  if (isFigure) {
    return {
      strategy: "“软硬并重”（依托OpenAI大模型推理小脑 + 顶层重工业巨头应用验证常态服役）",
      familyGroup: "Figure AI Inc. (联合大脑与通用物理装配单元)",
      hardware: ["Figure 01 Prototype (初代全尺寸双足)", "Figure 02 Next Generation (全机能自适应体)"],
      subsidiaries: [
        { name: "Figure Cognitive Brain LLC", tag: "多模态大模型", desc: "与OpenAI战略结盟，接入专门研发的高响应速度行为控制大模型决策大脑。", share: "深度股权互补", badge: "认知智能总部", status: "持续喂料" },
        { name: "Figure Physical Dynamics Corp", tag: "大转矩传动关节", desc: "研制极高功率输出比谐波电控关节，提高手臂姿态稳定系数和手指捏力阻抗。", share: "100% 独资控股", badge: "精密传动部", status: "批量组装" },
        { name: "Figure Logistics Solutions Inc", tag: "分拣集成服务", desc: "提供全天候自动化拆码垛、不规则高精度大流量不降速货包多节点分发服务。", share: "80% 高比例控股", badge: "物流特化子公司", status: "DHL园区试产" },
        { name: "Figure Fleet Cloud Central", tag: "重组车队控制系统", desc: "提供3D点云现场建图、低延时机器人视觉遥操作和多节点应急调度台。", share: "95% 控股子线", badge: "云平台服务部", status: "稳定推展" },
        { name: "Figure Asset Renting Operations", tag: "车间托管租用", desc: "针对极度匮乏传统装配力的工厂，提供常态免押量化出勤和快速巡防配合同步。", share: "100% 独资直管", badge: "资本租赁分部", status: "多线开花" }
      ],
      solutions: [
        { name: "中高级汽车底盘螺装", status: "BMW总装线交付" },
        { name: "货架拾取与跨轨转移", status: "园区物料常态" },
        { name: "电商多分类不规则码包", status: "园区物料常态" },
        { name: "商务高敏展台双语引导", status: "现场体验试点" },
        { name: "轻协作餐饮零售配送", status: "前瞻场景部署" },
        { name: "危化高压气体阀门检测", status: "现场交付试运行" },
        { name: "重体力劳务常态化代班", status: "量产应用合流" }
      ],
      investments: "已成功获得微软、英伟达、亚马逊及创始人近十亿美元C轮注资。完美合并Azure AI算力支持与Isaac Sim物理模拟世界，是全球多模太具身资本最雄厚的旗舰之一。"
    };
  }

  if (isUnitree) {
    return {
      strategy: "“极致质价比”（超强机动翻越平衡小脑 + 超高传动规模量产 + 闪电演化步伐）",
      familyGroup: "杭州宇树科技 (四足与 biped 批量自研自造中心)",
      hardware: ["Unitree H1 (大型高动态双足本体)", "Unitree G1 (折叠超高集成人形)", "Unitree Go2 / B2 (四足全地形探索先锋)"],
      subsidiaries: [
        { name: "宇树动力执行器技术研究院", tag: "高功率旋转电机", desc: "制造超强中空轴伺服电机、高性能减速器和一体化重载足部总成。", share: "100% 独家研制", badge: "核心动力部", status: "高负荷满产" },
        { name: "宇特高精精密齿轮厂", tag: "行星与传动减速", desc: "深耕特殊传动精密配准材料，解决高频高负荷硬质机械磨损与噪声抑制。", share: "90% 发行大控", badge: "重器配套中心", status: "常态运转" },
        { name: "宇树控制算法与决策实验室", tag: "多模态RL步态控制", desc: "核心攻克野外乱石极速跨越、连续空翻自恢复及自主重力感知防摔控制。", share: "100% 自行控股", badge: "小脑决策重镇", status: "常态吐纳更新" },
        { name: "宇迈机器人代售代维租售中心", tag: "高校试用与租赁", desc: "为千余家全球科研科研和电网巡防单位，提供常态租售和现场托管运维。", share: "80% 控股联营", badge: "资产直运中心", status: "火爆调配中" },
        { name: "宇树大众消费智能生态事业部", tag: "消费伴随跟机", desc: "专责处理全球大众消费级Go系列四足玩具、防摔教具及C端创客套件分发。", share: "100% 独立事业部", badge: "全球消费前沿", status: "全球爆产出货" }
      ],
      solutions: [
        { name: "非结构化极端荒野建模", status: "地理测绘交付" },
        { name: "多断层地下低管线探巡", status: "工业特种巡巡" },
        { name: "非规重负载大跨越货驳", status: "工厂内部常态" },
        { name: "科技博览会队列迎宾", status: "常态商务服役" },
        { name: "林场牧场野生资源跟踪", status: "前瞻场景部署" },
        { name: "常态伴跑伴行物料驮运", status: "全球大众出货" },
        { name: "大中院校AI具身实践教具", status: "科研高校试点" }
      ],
      investments: "获得红杉国潮、美团战投等一众国内领先资本的大额重金追投。依托本土最敏捷的电子结构加工供应链，组建起业内首条人形机器人机器人全自动化千台装配试产线。"
    };
  }

  if (isUBTECH) {
    return {
      strategy: "“工业制造先导”（整车装配产线常态深耕 + 领先智慧教育示范 + 智慧医疗特化创新）",
      familyGroup: "深圳市优必选科技 (香港主板上市 09880.HK)",
      hardware: ["Walker S (工业人形本体)", "Walker S Lite (轻量级柔性本体)", "Walker S Pro (高级特工款本体)"],
      subsidiaries: [
        { name: "天奇优必选工业机电开发公司", tag: "车整线集成深度开发", desc: "联合汽车设备设计巨头，专门集成开发车门抛光、底盘拧紧等实效机械岗。", share: "合资创办控股", badge: "智慧装配重合线", status: "常态服役" },
        { name: "优奇智慧物流技术（苏州）公司", tag: "大型重载AGV", desc: "研发配送小车与人形五指机器人协同，解决精细化不降速周转仓组调度。", share: "控股核心骨干", badge: "多机转运调度厂", status: "规模供货" },
        { name: "优智高能特动防爆研发中心", tag: "智慧电网高敏检测", desc: "攻坚高电压、多磁力无感应干扰特种重载移动安防与阀门精控作业。", share: "85% 发行控股", badge: "特种配电检修部", status: "现场量产交付" },
        { name: "优健康外骨骼功能移位有限公司", tag: "生命康复特化", desc: "开发外骨骼髋膝多动力辅行结构、危重病患精细转移、智慧安全看护系列。", share: "75% 控股子线", badge: "康复医疗分线", status: "省市级医院试点" },
        { name: "电奇精密无刷驱动系统公司", tag: "高性能中轴舵机", desc: "攻坚高转矩比精密无刷伺服转向舵机，为国内外数百家实验室供给关键执行器。", share: "100% 直辖自控", badge: "自研元器件主力", status: "全球稳定供求" }
      ],
      solutions: [
        { name: "车侧面线套高精度装配", status: "东风/一汽产线" },
        { name: "全机件抛光及无感打磨", status: "红旗整装厂" },
        { name: "零部件大批量全自动驳返", status: "吉利生产试点" },
        { name: "高配电大跨度无人防爆巡防", status: "南方电网试点" },
        { name: "危重病区无痛物理转移", status: "医院批量入驻" },
        { name: "高校全套硬软科教系统开发", status: "全国院校基地" },
        { name: "高端化养老照护自动陪床", status: "医养社区部署" }
      ],
      investments: "已于香港资本二级市场首发。通过重组收购一批华南谐波、高能关节舵机、机器视觉中试企业。建立并领航包括20家零部件和数据软件在内的百亿国家级创新联合体生态。"
    };
  }

  // Regular robust procedural generator to maintain absolute design realism for generic companies
  const nameClean = company.name.replace(/(科技|集团|股份|有限|公|司|机器人|具身)/g, "");
  const pName = nameClean.slice(0, 4) || "星际";

  return {
    strategy: `“工艺双层联动”（${company.chainStage} 特色集成研发 + 下游行业场景定制化应用）`,
    familyGroup: `${company.name}集团战略总部`,
    hardware: [`${company.primaryProduct} 第一研发序列`, `代号 ${pName}-X2 前瞻硬件验证体`],
    subsidiaries: [
      { name: `${company.city || "本地"}${pName}融资租商服有限公司`, tag: "融资租赁服务", desc: `面向企业本地园区及下游中小型买方提供少付租赁、租售联动运维。`, share: "100% 全资辖定", badge: "运营直推中心", status: "常态调配中" },
      { name: `${company.city || "本地"}${pName}制造关键零部件配套厂`, tag: "精密关键部件", desc: `本地厂线快速制造法兰传动、防割防爆硬壳以及定制轴连，解决BOM紧缺。`, share: "85% 发行持股", badge: "本地配套服务部", status: "稳定接单中" },
      { name: `${company.city || "本地"}${pName}数感与强化微调研发部`, tag: "真机轨迹与大脑", desc: `负责配合采集日常多轮行为，基于轻量级端侧系统，注入多自适反调算法。`, share: "90% 发行大控", badge: "软件打标底座", status: "常态运转" },
      { name: `${company.city || "本地"}${pName}特用多轴及定制开发部`, tag: "非规场景定制", desc: `针对重能矿区、微特医药场景定制双臂或耐温防爆外护本体。`, share: "75% 绝对自控", badge: "特用定制中心", status: "研发阶段" },
      { name: `${company.city || "本地"}${pName}伴随及消费类场景部`, tag: "C端及商业泛化", desc: "处理简单的商业百货导流讲解、自主扫地或高敏微米拾取终端部署。", share: "70% 控股合营", badge: "终端拓展支流", status: "研发与推广中" }
    ],
    solutions: [
      { name: "高敏车间自动上下料组", status: "企业自研实测" },
      { name: "重不规则货架拆码垛", status: "示范工位试点" },
      { name: "现场避障路径自规划物料配送", status: "示范工位试点" },
      { name: "公共展台语音引导", status: "示范应用部署" },
      { name: "医院配液与辅助运输", status: "试点机构试运行" },
      { name: "输电设备无感安全热扫描", status: "试点部验收" },
      { name: "定制极窄复杂空间物料转移", status: "按单交付就绪" }
    ],
    investments: `通过与 ${company.city || "本地"} 新型零部件、压力器件材料及云计算节点建立直接业务持股，确保自身 ${company.primaryProduct} 拥有最佳的质价比和稳定的生产力供应。`
  };
}

function CompanyEcosystemGraph({ company, onSearchKeyword }: { company: Enterprise; onSearchKeyword: (kw: string) => void }) {
  const nodes = useMemo(() => generateEcosystemNodes(company), [company]);
  const [activeNodeId, setActiveNodeId] = useState<string>('center');
  const [subTab, setSubTab] = useState<'blueprint' | 'topology'>('blueprint');

  const activeNode = useMemo(() => {
    return nodes.find(n => n.id === activeNodeId) || nodes[0];
  }, [nodes, activeNodeId]);

  const blueprint = useMemo(() => getBlueprintEcosystem(company), [company]);
  const [activeSubId, setActiveSubId] = useState<number>(0);

  const activeSub = useMemo(() => {
    return blueprint.subsidiaries[activeSubId] || blueprint.subsidiaries[0];
  }, [blueprint, activeSubId]);

  return (
    <div className="bg-[#070b16] border border-[#172545]/85 rounded-xl p-4.5 space-y-4">
      
      {/* Scope Title and Sub-Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#121c32]/80 pb-2.5">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00f3ff] animate-pulse"></div>
          <span className="text-xs font-black text-white">集团大生态圈全景拓扑版图</span>
        </div>
        
        {/* Switcher Tab */}
        <div className="flex bg-[#04070f] border border-[#142345] p-0.5 rounded-lg select-none">
          <button
            onClick={() => setSubTab('blueprint')}
            className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
              subTab === 'blueprint'
                ? 'bg-[#122245] text-cyan-400 border border-cyan-800/40 shadow'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            🧬 集团生态与核心子公司
          </button>
          <button
            onClick={() => setSubTab('topology')}
            className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
              subTab === 'topology'
                ? 'bg-[#122245] text-cyan-400 border border-cyan-800/40 shadow'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            🌐 供应链产业链供需拓扑
          </button>
        </div>
      </div>

      {subTab === 'blueprint' ? (
        /* 🧬 HIGH TECH CORP BLUEPRINT PANORAMA VIEW */
        <div className="space-y-4">
          
          {/* Top general strategic status strip */}
          <div className="p-3 bg-gradient-to-r from-cyan-950/25 to-[#0b142bff] border border-[#16274e] rounded-lg">
            <div className="flex justify-between items-start gap-2">
              <div>
                <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-wider block">生态战略枢纽 / Strategy Philosophy</span>
                <p className="text-[11.5px] font-bold text-white mt-0.5">{blueprint.strategy}</p>
              </div>
              <span className="text-[8px] shrink-0 bg-cyan-900/60 text-cyan-300 font-mono px-1.5 py-0.5 rounded border border-cyan-800 border-dashed">
                一体两环四合
              </span>
            </div>
            
            <div className="mt-2.5 pt-2 border-t border-[#121f3c] grid grid-cols-2 gap-2 text-[10px]">
              <div>
                <span className="text-gray-500 block text-[9px] font-mono">母公司/总集团</span>
                <span className="text-gray-300 font-medium truncate block">{blueprint.familyGroup}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[9px] font-mono">主打尖端硬件谱系</span>
                <span className="text-amber-400 font-semibold truncate block">
                  {blueprint.hardware.join(" | ")}
                </span>
              </div>
            </div>
          </div>

          {/* 🏢 Interactive Five Subsidiary Matrix Panel */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-bold text-gray-400">
              <span className="flex items-center gap-1 text-[#00f3ff]">
                <Cpu className="w-3.5 h-3.5" /> 旗下五大核心独立子公司
              </span>
              <span className="text-gray-500 font-mono scale-95 uppercase">Subsidiary Matrix</span>
            </div>

            {/* List horizontal buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
              {blueprint.subsidiaries.map((sub, idx) => {
                const colors = [
                  'border-emerald-900/50 hover:border-emerald-600',
                  'border-cyan-900/50 hover:border-cyan-600',
                  'border-purple-900/50 hover:border-purple-600',
                  'border-indigo-900/50 hover:border-indigo-600',
                  'border-amber-900/50 hover:border-amber-600'
                ];
                const activeColors = [
                  'bg-emerald-950/40 border-emerald-400 text-emerald-300 ring-1 ring-emerald-500/20',
                  'bg-cyan-950/40 border-cyan-400 text-cyan-300 ring-1 ring-cyan-500/20',
                  'bg-purple-950/40 border-purple-400 text-purple-300 ring-1 ring-purple-500/20',
                  'bg-indigo-950/40 border-indigo-400 text-indigo-300 ring-1 ring-indigo-500/20',
                  'bg-amber-950/30 border-amber-500 text-amber-200 ring-1 ring-amber-500/20'
                ];
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveSubId(idx)}
                    className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                      activeSubId === idx
                        ? activeColors[idx % activeColors.length]
                        : `bg-[#04060c] text-gray-400 ${colors[idx % colors.length]}`
                    }`}
                  >
                    <div className="text-[10px] font-extrabold truncate block">{sub.tag}</div>
                    <span className="text-[7.5px] text-gray-500 font-mono mt-0.5 truncate block">{sub.share}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Daughter Corporate Card detail */}
            <div className="p-3 bg-[#03060c] border border-[#14264b] rounded-lg relative overflow-hidden space-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h5 className="text-xs font-black text-white flex items-center gap-1">
                    <span>{activeSub.name}</span>
                    <span className="text-[8px] px-1.5 py-0.2 bg-[#122040] text-cyan-400 rounded-full font-bold">{activeSub.badge}</span>
                  </h5>
                  <p className="text-[9.5px] text-cyan-500 font-mono mt-0.5">运营状态: ● <span className="text-emerald-400 font-bold">{activeSub.status}</span></p>
                </div>
                <span className="text-[9.5px] font-mono text-purple-400 bg-purple-950/40 border border-purple-900/40 px-1.5 py-0.5 rounded shrink-0">
                  {activeSub.share}
                </span>
              </div>

              <p className="text-[10.5px] text-gray-300 leading-relaxed font-sans pt-1 border-t border-[#0d1831]">
                {activeSub.desc}
              </p>

              <div className="flex justify-between items-center text-[8px] text-gray-500 font-mono pt-1">
                <span>生态属性: 硬件本尊+关键配套+算力全链服务矩阵</span>
                <button
                  onClick={() => onSearchKeyword(activeSub.name)}
                  className="bg-cyan-950/20 hover:bg-cyan-950/50 text-cyan-400 text-[8.5px] border border-cyan-900/40 px-1.5 py-0.5 rounded cursor-pointer transition-all"
                >
                  关联检索该厂
                </button>
              </div>
            </div>
          </div>

          {/* 7 Core Scene Solutions Section */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-bold text-gray-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <Globe className="w-3.5 h-3.5" /> 集团标配全场景一体化集成方案 ({blueprint.solutions.length}大场景)
              </span>
              <span className="text-gray-500 font-mono scale-95 uppercase">Integrated Scenarios</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {blueprint.solutions.map((sol, idx) => (
                <div
                  key={idx}
                  className="px-2 py-1 bg-[#060a15] hover:bg-[#0b1328] border border-[#142345] rounded-lg flex items-center gap-2 transition-all"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="text-[10px] font-medium text-gray-200">{sol.name}</span>
                  <span className="text-[7.5px] font-bold text-emerald-500 bg-emerald-950/50 border border-emerald-950 px-1 rounded font-mono scale-90">
                    {sol.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Upstream/Downstream Investment & Thousand-Billion Ecosystem consolidation description */}
          <div className="p-3 bg-[#050915]/60 border border-[#152445]/60 rounded-lg space-y-1.5">
            <div className="text-[9.5px] text-gray-500 font-mono uppercase tracking-wide">
              📊 产业链战略性持股与千亿机器人产业聚落构建
            </div>
            <p className="text-[10.5px] text-gray-400 leading-normal">
              {blueprint.investments}
            </p>
          </div>

        </div>
      ) : (
        /* 🌐 ORIGINAL INTERACTIVE TOPOLOGY LINK VISUAL MAP CONTAINER */
        <div className="space-y-4">
          
          <div className="relative w-full h-[220px] bg-[#04070f] border border-[#131f3c] rounded-lg overflow-hidden select-none">
            
            {/* Military Style Blueprint Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(23,37,69,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(23,37,69,0.2)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            
            {/* Glowing Radar Sweep Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00f3ff]/1 to-transparent w-[200%] -translate-x-full animate-pulse pointer-events-none" />

            {/* Inline style block for line animations */}
            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes ecoDash {
                to { stroke-dashoffset: -14; }
              }
              .animate-eco-dash {
                stroke-dasharray: 4, 3;
                animation: ecoDash 1.2s linear infinite;
              }
            ` }} />

            {/* Connection Link SVGs */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 440 220" preserveAspectRatio="none">
              <defs>
                <marker id="arrow-cyan" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#00f3ff" />
                </marker>
                <marker id="arrow-emerald" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
                </marker>
                <marker id="arrow-indigo" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#6366f1" />
                </marker>
                <marker id="arrow-purple" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#a855f7" />
                </marker>
              </defs>

              {/* Links */}
              <line x1="80" y1="50" x2="220" y2="110" stroke="#105777" strokeWidth="1" />
              <line x1="80" y1="50" x2="220" y2="110" stroke="#00f3ff" strokeWidth="1.2" className="animate-eco-dash" markerEnd="url(#arrow-cyan)" />

              <line x1="220" y1="110" x2="360" y2="50" stroke="#0a5c43" strokeWidth="1" />
              <line x1="220" y1="110" x2="360" y2="50" stroke="#10b981" strokeWidth="1.2" className="animate-eco-dash" markerEnd="url(#arrow-emerald)" />

              <line x1="80" y1="175" x2="220" y2="110" stroke="#252467" strokeWidth="1" />
              <line x1="80" y1="175" x2="220" y2="110" stroke="#6366f1" strokeWidth="1.2" className="animate-eco-dash" markerEnd="url(#arrow-indigo)" />

              <line x1="360" y1="175" x2="220" y2="110" stroke="#482d7c" strokeWidth="1" />
              <line x1="360" y1="175" x2="220" y2="110" stroke="#a855f7" strokeWidth="1.2" className="animate-eco-dash" markerEnd="url(#arrow-purple)" />
            </svg>

            {/* HTML Interactive nodes */}

            {/* Upstream Core Supplier (Cyan) */}
            <button
              onClick={() => setActiveNodeId('up')}
              className={`absolute left-[5px] top-[15px] w-[140px] text-left p-2 rounded border transition-all cursor-pointer ${
                activeNodeId === 'up'
                  ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-lg shadow-cyan-950/75'
                  : 'bg-[#080d19]/90 border-cyan-950 text-gray-400 hover:border-cyan-700 hover:text-gray-200'
              }`}
            >
              <div className="flex items-center gap-1">
                <Cpu className="w-3 h-3 text-cyan-400 shrink-0" />
                <span className="text-[10px] font-bold tracking-tight truncate">{nodes[1].label}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-[8px] text-cyan-500 font-mono scale-90 origin-left">上游核心供给</span>
                <span className="text-[7.5px] text-gray-500 max-w-[66px] truncate">{nodes[1].subText}</span>
              </div>
            </button>

            {/* Downstream Integrator (Emerald) */}
            <button
              onClick={() => setActiveNodeId('down')}
              className={`absolute right-[5px] top-[15px] w-[140px] text-left p-2 rounded border transition-all cursor-pointer ${
                activeNodeId === 'down'
                  ? 'bg-emerald-950/80 border-emerald-400 text-white shadow-lg shadow-emerald-950/75'
                  : 'bg-[#080d19]/90 border-emerald-950 text-gray-400 hover:border-emerald-700 hover:text-gray-200'
              }`}
            >
              <div className="flex items-center gap-1">
                <Globe className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="text-[10px] font-bold tracking-tight truncate">{nodes[2].label}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-[8px] text-emerald-500 font-mono scale-90 origin-left">下游落地集成</span>
                <span className="text-[7.5px] text-gray-500 max-w-[66px] truncate">{nodes[2].subText}</span>
              </div>
            </button>

            {/* Golden Central Node (The selected enterprise itself) */}
            <button
              onClick={() => setActiveNodeId('center')}
              className={`absolute left-[135px] top-[75px] w-[170px] text-left p-2.5 rounded-lg border transition-all cursor-pointer select-none ${
                activeNodeId === 'center'
                  ? 'bg-amber-950/85 border-amber-400 text-white ring-2 ring-amber-500/20 shadow-xl shadow-amber-950/60'
                  : 'bg-[#0b101f]/95 border-[#213052] text-white hover:border-amber-600'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></div>
                <span className="text-[10px] font-black text-amber-400 truncate tracking-tight">{nodes[0].label}</span>
              </div>
              <p className="text-[8px] text-gray-400 mt-1 truncate">{nodes[0].role}</p>
              <div className="flex justify-between items-center mt-1.5 pt-1 border-t border-[#1a253c]/80 text-[7px] text-gray-500 font-mono">
                <span>CORE HUB</span>
                <span className="text-amber-500 font-bold scale-90">{nodes[0].subText}</span>
              </div>
            </button>

            {/* Academic Innovation Node (Indigo) */}
            <button
              onClick={() => setActiveNodeId('acad')}
              className={`absolute left-[5px] bottom-[15px] w-[140px] text-left p-2 rounded border transition-all cursor-pointer ${
                activeNodeId === 'acad'
                  ? 'bg-indigo-950/80 border-indigo-400 text-white shadow-lg shadow-indigo-950/75'
                  : 'bg-[#080d19]/90 border-indigo-950 text-gray-400 hover:border-indigo-700 hover:text-gray-200'
              }`}
            >
              <div className="flex items-center gap-1">
                <FileText className="w-3 h-3 text-indigo-400 shrink-0" />
                <span className="text-[10px] font-bold tracking-tight truncate">{nodes[3].label}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-[8px] text-indigo-400 font-mono scale-90 origin-left">科研高校协作</span>
                <span className="text-[7.5px] text-gray-500 max-w-[66px] truncate">{nodes[3].subText}</span>
              </div>
            </button>

            {/* Investment Node (Purple) */}
            <button
              onClick={() => setActiveNodeId('inv')}
              className={`absolute right-[5px] bottom-[15px] w-[140px] text-left p-2 rounded border transition-all cursor-pointer ${
                activeNodeId === 'inv'
                  ? 'bg-purple-950/80 border-purple-400 text-white shadow-lg shadow-purple-950/75'
                  : 'bg-[#080d19]/90 border-purple-950 text-gray-400 hover:border-purple-700 hover:text-gray-200'
              }`}
            >
              <div className="flex items-center gap-1">
                <Coins className="w-3 h-3 text-purple-400 shrink-0" />
                <span className="text-[10px] font-bold tracking-tight truncate">{nodes[4].label}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-[8px] text-purple-400 font-mono scale-90 origin-left">资本与资源纽带</span>
                <span className="text-[7.5px] text-gray-500 max-w-[66px] truncate">{nodes[4].subText}</span>
              </div>
            </button>

          </div>

          {/* Node Selected Description Box */}
          <div className="p-3 bg-[#090f1d] border border-[#14213d] rounded-lg space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold">
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${
                  activeNode.type === 'center' ? 'bg-amber-400' :
                  activeNode.type === 'upstream' ? 'bg-cyan-400' :
                  activeNode.type === 'downstream' ? 'bg-emerald-400' :
                  activeNode.type === 'academic' ? 'bg-indigo-400' : 'bg-purple-400'
                }`}></span>
                <span className="text-white">{activeNode.label}</span>
              </div>
              <span className="text-gray-400 font-mono text-[9px] scale-95">{activeNode.role}</span>
            </div>

            <p className="text-gray-300 text-[10.5px] leading-relaxed">
              {activeNode.description}
            </p>

            {activeNode.type !== 'center' && (
              <div className="flex justify-between items-center pt-2 border-t border-[#111c33] gap-2">
                <span className="text-[9px] text-gray-500 font-mono">
                  链接流向: 协同对接 [ {company.name} ]
                </span>
                <button
                  onClick={() => onSearchKeyword(activeNode.label)}
                  className="text-[9.5px] text-cyan-400 hover:text-cyan-300 border border-cyan-900/40 bg-cyan-950/15 hover:bg-cyan-950/40 px-2 py-0.5 rounded flex items-center gap-0.5 transition-all cursor-pointer"
                >
                  <span>在企业库中检索该节点</span>
                  <ArrowUpRight className="w-2.5 h-2.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default function App() {
  const {
    currentUser,
    userProfile,
    favorites,
    notes,
    loading: authLoading,
    login,
    logout,
    toggleFavorite,
    saveNote,
    deleteNote
  } = useAuth();

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [showMobileSidebar, setShowMobileSidebar] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<string>('2026年');

  // Search & Filters State for the Company Database
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterCountry, setFilterCountry] = useState<string>('全部');
  const [filterStage, setFilterStage] = useState<string>('全部');
  const [filterRating, setFilterRating] = useState<string>('全部');
  const [filterParentCategory, setFilterParentCategory] = useState<string>('全部');
  const [filterCategory, setFilterCategory] = useState<string>('全部');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 15;

  // Selected company modal state
  const [selectedCompany, setSelectedCompany] = useState<Enterprise | null>(null);

  const [noteInput, setNoteInput] = useState<string>('');

  const selectedCompanyId = selectedCompany?.id;
  const existingNoteContent = selectedCompanyId ? (notes[selectedCompanyId]?.content || '') : '';
  useEffect(() => {
    setNoteInput(existingNoteContent);
  }, [selectedCompanyId, existingNoteContent]);

  // Selected product modal and filter states
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [productSearchQuery, setProductSearchQuery] = useState<string>('');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('全部');

  const filteredProducts = useMemo(() => {
    return PRODUCTS_DB.filter(p => {
      const matchCategory = productCategoryFilter === '全部' || p.cat === productCategoryFilter;
      const cleanSearch = productSearchQuery.trim().toLowerCase();
      const matchSearch = !cleanSearch || 
        p.name.toLowerCase().includes(cleanSearch) || 
        p.cat.toLowerCase().includes(cleanSearch) ||
        p.tech.toLowerCase().includes(cleanSearch) || 
        p.description.toLowerCase().includes(cleanSearch) ||
        (p.client && p.client.toLowerCase().includes(cleanSearch)) ||
        p.status.toLowerCase().includes(cleanSearch);
      return matchCategory && matchSearch;
    });
  }, [productSearchQuery, productCategoryFilter]);

  // States and Handlers for Data Export & Toasts
  const [downloadToast, setDownloadToast] = useState<string | null>(null);
  const [selectedExportIds, setSelectedExportIds] = useState<string[]>([]);
  const [exportSearchQuery, setExportSearchQuery] = useState<string>('');
  const [exportStageFilter, setExportStageFilter] = useState<string>('全部');

  // Search & Filters State for the Funding (Capital Rounds) Tab
  const [fundingSearchQuery, setFundingSearchQuery] = useState<string>('');
  const [fundingCategoryFilter, setFundingCategoryFilter] = useState<string>('全部');
  const [fundingRoundFilter, setFundingRoundFilter] = useState<string>('全部');

  const handleExportCSV = (targetSubset?: Enterprise[]) => {
    try {
      const exportPool = targetSubset || allCompanies;
      if (exportPool.length === 0) {
        alert("所选数据池为空，请先勾选或搜索企业！");
        return;
      }
      const headers = ["ID", "企业名称", "英文名称", "注册国家", "注册城市", "成立年份", "产业链环节", "主营类别", "核心主营产品", "融资轮次", "估值", "评级级别", "年营收规模", "预计2027年产量", "底层核心技术", "主要投资方", "企业运行状态"];
      const rows = exportPool.map(c => [
        c.id,
        c.name,
        c.englishName,
        c.country,
        c.city,
        c.establishedYear,
        c.chainStage,
        c.category,
        c.primaryProduct,
        c.fundingRound,
        c.valuation,
        c.starRating,
        c.revenueScale,
        c.targetOutput2027,
        c.coreTech,
        c.investors,
        c.liveStatus
      ]);

      const csvContent = [
        headers.join(","),
        ...rows.map(r => r.map(val => {
          const str = String(val ?? "").replace(/"/g, '""');
          return str.includes(",") || str.includes("\n") || str.includes('"') ? `"${str}"` : str;
        }).join(","))
      ].join("\n");

      const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `zhangming_robotics_${targetSubset ? 'selective' : 'database'}_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloadToast(`数据大包导出成功！已成功将 ${exportPool.length} 家公司数据触发浏览器下载 (文件: zhangming_robotics_${targetSubset ? 'selective' : 'database'}_${new Date().toISOString().split('T')[0]}.csv)。请查看下载内容。`);
      setTimeout(() => setDownloadToast(null), 5000);
    } catch (err) {
      console.error(err);
      alert("导出 CSV 错误: " + err);
    }
  };

  const handleExportJSON = (targetSubset?: Enterprise[]) => {
    try {
      const exportPool = targetSubset || allCompanies;
      if (exportPool.length === 0) {
        alert("所选数据池为空，请先勾选或搜索企业！");
        return;
      }
      const jsonContent = JSON.stringify(exportPool, null, 2);
      const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `zhangming_robotics_${targetSubset ? 'selective' : 'database'}_${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloadToast(`数据大包导出成功！已将 ${exportPool.length} 家公司打包为 JSON 并启动触发浏览器本地下载。`);
      setTimeout(() => setDownloadToast(null), 5000);
    } catch (err) {
      console.error(err);
      alert("导出 JSON 错误: " + err);
    }
  };


  // Dashboard trend chart active indicators
  const [activeTrendTab, setActiveTrendTab] = useState<'amount' | 'rate'>('amount');
  const [activeDynamicTab, setActiveDynamicTab] = useState<string>('全部');
  const [dashboardDynamicYear, setDashboardDynamicYear] = useState<string>('全部');
  const [dashboardDynamicSearch, setDashboardDynamicSearch] = useState<string>('');

  // Live Automatic update / Manual Trigger Sync state
  const [extraCompanies, setExtraCompanies] = useState<Enterprise[]>([]);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncProgress, setSyncProgress] = useState<number>(0);
  const [syncLogs, setSyncLogs] = useState<string[]>([]);
  const [showSyncLogsAlert, setShowSyncLogsAlert] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('今日凌晨 04:00 (自动调度就绪)');
  const [hasNewUpdatesToday, setHasNewUpdatesToday] = useState<boolean>(false);

  // Load the companies procedurally + extra dynamically synced ones
  const allCompanies = useMemo(() => {
    const base = generateEnterprises();
    return [...base, ...extraCompanies];
  }, [extraCompanies]);

  const totalEntriesCount = allCompanies.length;
  const chinaCompaniesCount = allCompanies.filter(c => c.country === '中国').length;

  const availableCountries = useMemo(() => {
    return ['全部', ...Array.from(new Set(allCompanies.map(c => c.country)))];
  }, [allCompanies]);

  const availableParentCategories = useMemo(() => {
    return ['全部', ...Array.from(new Set(allCompanies.map(c => c.parentCategory)))];
  }, [allCompanies]);

  const availableCategories = useMemo(() => {
    return ['全部', ...Array.from(new Set(allCompanies.map(c => c.category)))];
  }, [allCompanies]);

  // Click handler for supply chain map nodes to display gorgeous detail cards
  const handleChainNodeClick = (nodeText: string) => {
    // Extract a clean keyword to search for
    let kw = "";
    if (nodeText.includes("绿的谐波")) kw = "绿的";
    else if (nodeText.includes("五洲新春")) kw = "五洲新春";
    else if (nodeText.includes("鸣志电器")) kw = "鸣志";
    else if (nodeText.includes("蓝点触控")) kw = "蓝点";
    else if (nodeText.includes("途见科技")) kw = "途见科技";
    else if (nodeText.includes("东土科技")) kw = "东土";
    else if (nodeText.includes("光轮智能")) kw = "光轮";
    else if (nodeText.includes("Tesla") || nodeText.includes("Optimus")) kw = "特斯拉Optimus";
    else if (nodeText.includes("Figure")) kw = "Figure";
    else if (nodeText.includes("智元")) kw = "智元机器人";
    else if (nodeText.includes("优必选")) kw = "优必选";
    else if (nodeText.includes("波士顿")) kw = "波士顿动力";
    else if (nodeText.includes("越疆")) kw = "越疆";
    else if (nodeText.includes("極智嘉") || nodeText.includes("极智嘉")) kw = "极智嘉";
    else if (nodeText.includes("宝马") || nodeText.includes("现代")) kw = "Tesla";
    else if (nodeText.includes("变电站") || nodeText.includes("巡检") || nodeText.includes("防爆")) kw = "特种";
    else if (nodeText.includes("配") || nodeText.includes("清洁")) kw = "能斯达";
    else if (nodeText.includes("手术") || nodeText.includes("腔镜")) kw = "直觉外科";
    else if (nodeText.includes("eVTOL") || nodeText.includes("低空")) kw = "直觉外科";
    else if (nodeText.includes("辐射") || nodeText.includes("核")) kw = "极智嘉";

    // First, look for precise or keyword matches in the main database
    const searchStr = kw || nodeText;
    const match = allCompanies.find(c => 
      c.name.toLowerCase().includes(searchStr.toLowerCase()) || 
      c.englishName.toLowerCase().includes(searchStr.toLowerCase())
    );

    if (match) {
      setSelectedCompany(match);
    } else {
      // If not found directly, dynamically construct a polished full Enterprise detail object reflecting this asset
      const isUpstream = nodeText.includes("减速器") || nodeText.includes("丝杠") || nodeText.includes("电机") || nodeText.includes("传感器") || nodeText.includes("触觉") || nodeText.includes("芯片") || nodeText.includes("平台");
      const isDownstream = nodeText.includes("宝马") || nodeText.includes("巡检") || nodeText.includes("配送") || nodeText.includes("手术") || nodeText.includes("低空") || nodeText.includes("核");
      
      const customMatch: Enterprise = {
        id: `ROBO-CHAIN-${Math.abs(nodeText.split("").reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0)) % 10000}`,
        name: nodeText.replace(/\s*\(.*\)\s*/g, "").trim(),
        englishName: nodeText.includes("绿的") ? "LeaderDrive Precision" : nodeText.includes("五洲") ? "Wuzhou Bearing" : "Global Robotics Alliance Node",
        country: nodeText.includes("Tesla") || nodeText.includes("Figure") || nodeText.includes("Spot") ? "美国" : "中国",
        city: nodeText.includes("Tesla") ? "奥斯汀" : nodeText.includes("Figure") ? "硅谷" : "深圳",
        establishedYear: 2017,
        chainStage: isUpstream ? "🔴上游" : (isDownstream ? "🟢下游" : "🟦中游"),
        category: nodeText.includes("(") ? nodeText.substring(0, nodeText.indexOf(" (")) : "具身智能供应链重点高地",
        parentCategory: isUpstream ? "核心关键零部件 (传感器/电子皮肤/精密谐波/滚子执行器)" : (isDownstream ? "服务与特种智能应用 (各场景行业集成应用舱)" : "服务机器人 (具身智能/物理双足/家政)"),
        primaryProduct: nodeText,
        fundingRound: "上市公司 / 公开交易中 / 国家基金重点持仓",
        valuation: "¥20亿 - ¥850亿RMB (估产大盘)",
        starRating: "⭐⭐⭐",
        revenueScale: "主营年收规模超 5000 万人民币 / 增量巨大",
        targetOutput2027: "1,500台",
        coreTech: "关节高动态力控融合或柔性表皮矩阵自传感去混叠",
        investors: "国家绿色发展基金 / 中信创投联合战略领投",
        liveStatus: "正常量产"
      };
      setSelectedCompany(customMatch);
    }
  };

  const reports = REPORTS_DB;

  // Latest Dynamics data matching image
  const dynamicsFeeds = DYNAMICS_DB;

  const filteredDynamics = useMemo(() => {
    return dynamicsFeeds.filter(f => {
      const matchCategory = activeDynamicTab === '全部' || f.category === activeDynamicTab;
      const year = f.date.split('-')[0];
      const matchYear = dashboardDynamicYear === '全部' || year === dashboardDynamicYear;
      const matchKeyword = dashboardDynamicSearch.trim() === '' ||
        f.text.toLowerCase().includes(dashboardDynamicSearch.toLowerCase()) ||
        f.company.toLowerCase().includes(dashboardDynamicSearch.toLowerCase()) ||
        f.location.toLowerCase().includes(dashboardDynamicSearch.toLowerCase());
      return matchCategory && matchYear && matchKeyword;
    });
  }, [activeDynamicTab, dashboardDynamicYear, dashboardDynamicSearch]);

  const filteredCompanies = useMemo(() => {
    return allCompanies.filter(c => {
      const matchSearch = !searchQuery.trim() || 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.primaryProduct.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.coreTech.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchCountry = filterCountry === '全部' || c.country === filterCountry;
      const matchStage = filterStage === '全部' || c.chainStage === filterStage;
      const matchRating = filterRating === '全部' || c.starRating === filterRating;
      const matchParentCat = filterParentCategory === '全部' || c.parentCategory === filterParentCategory;
      const matchCat = filterCategory === '全部' || c.category === filterCategory;

      return matchSearch && matchCountry && matchStage && matchRating && matchParentCat && matchCat;
    });
  }, [allCompanies, searchQuery, filterCountry, filterStage, filterRating, filterParentCategory, filterCategory]);

  // Filtered and searched funding transactions
  const filteredFundingEvents = useMemo(() => {
    return FUNDING_DB.filter(f => {
      // Search filter
      const matchSearch = !fundingSearchQuery.trim() ||
        f.name.toLowerCase().includes(fundingSearchQuery.toLowerCase()) ||
        f.inv.toLowerCase().includes(fundingSearchQuery.toLowerCase()) ||
        f.cat.toLowerCase().includes(fundingSearchQuery.toLowerCase());

      // Sector Category filter
      let matchCat = true;
      if (fundingCategoryFilter !== '全部') {
        if (fundingCategoryFilter === '人形/双足本体') {
          matchCat = f.cat.includes('人形') || f.cat.includes('双足') || f.cat.includes('表情');
        } else if (fundingCategoryFilter === '3C/制造具身') {
          matchCat = f.cat.includes('3C') || f.cat.includes('制造') || f.cat.includes('装配') || f.cat.includes('手');
        } else if (fundingCategoryFilter === '传感与皮肤') {
          matchCat = f.cat.includes('传感') || f.cat.includes('皮肤') || f.cat.includes('触觉');
        } else if (fundingCategoryFilter === '决策/大模型') {
          matchCat = f.cat.includes('决策') || f.cat.includes('平台') || f.cat.includes('大模型') || f.cat.includes('脑') || f.cat.includes('VLA');
        } else if (fundingCategoryFilter === '关节与电缸') {
          matchCat = f.cat.includes('关节') || f.cat.includes('电缸') || f.cat.includes('驱功') || f.cat.includes('旋转');
        } else if (fundingCategoryFilter === '自主导航与AMR') {
          matchCat = f.cat.includes('清洁') || f.cat.includes('AMR') || f.cat.includes('AGV') || f.cat.includes('仓储') || f.cat.includes('配送');
        }
      }

      // Round filter
      let matchRound = true;
      if (fundingRoundFilter !== '全部') {
        if (fundingRoundFilter === 'A轮及系列') {
          matchRound = f.round.includes('A') || f.round.includes('1');
        } else if (fundingRoundFilter === 'B轮及系列') {
          matchRound = f.round.includes('B');
        } else if (fundingRoundFilter === 'C轮及系列') {
          matchRound = f.round.includes('C') || f.round.includes('D') || f.round.includes('E');
        } else if (fundingRoundFilter === '天使与种子轮') {
          matchRound = f.round.includes('天使') || f.round.includes('种子');
        } else if (fundingRoundFilter === '战略及大宗融资') {
          matchRound = f.round.includes('战略') || f.round.includes('投资') || f.round.includes('股');
        }
      }

      return matchSearch && matchCat && matchRound;
    });
  }, [fundingSearchQuery, fundingCategoryFilter, fundingRoundFilter]);

  // Paginated companies
  const paginatedCompanies = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCompanies.slice(start, start + itemsPerPage);
  }, [filteredCompanies, currentPage]);

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

  // Reset all search parameters
  const handleResetFilters = () => {
    setSearchQuery('');
    setFilterCountry('全部');
    setFilterStage('全部');
    setFilterRating('全部');
    setFilterParentCategory('全部');
    setFilterCategory('全部');
    setCurrentPage(1);
  };

  const triggerManualSync = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setSyncProgress(10);
    setShowSyncLogsAlert(true);
    setSyncLogs(['[INFO] [09:30:11] 正在轮询工信部、国家智能制造数据中心增量注册接口...']);

    // Staggered log outputs to simulate real-world high-tech crawls
    setTimeout(() => {
      setSyncProgress(30);
      setSyncLogs(prev => [
        ...prev,
        '[INFO] [09:30:12] IT 桔子增量抓取就绪 (发现 14 家新增智能体实体)',
        '[INFO] [09:30:12] Crunchbase EMBEDDED-AI 数据集就绪 (发现 18 家全球初创企业详情)',
        '[INFO] [09:30:12] 正在连接国家知识产权局 (CNIPA) 获取最新 24 小时传感器零部件专利公告...'
      ]);
    }, 700);

    setTimeout(() => {
      setSyncProgress(60);
      setSyncLogs(prev => [
        ...prev,
        '[SUCCESS] [09:30:13] 成功下载 32 个增量特种数据包，开始进行清洗去重与地址空间对齐...',
        '[ANALYSIS] [09:30:13] 实体模型智能聚类: 识别到本体技术 8 项，空心杯执行器工艺 12 项，微米皮肤项目 12 个...'
      ]);
    }, 1500);

    setTimeout(() => {
      setSyncProgress(85);
      setSyncLogs(prev => [
        ...prev,
        '[TAXO-BI] [09:30:14] 运行产业双维自动标注算法 (VLA Classification Training Mode)...',
        '[TAXO-BI] [09:30:14] 大类及分支归类对齐完成。大类一致性校验: 100%。多源置信度系数: 0.9982。'
      ]);
    }, 2400);

    setTimeout(() => {
      // Create 32 brand new incremental high-tech enterprises to expand the library live!
      const newEntities: Enterprise[] = [
        {
          id: "ROBO-SYNC-A1",
          name: "钛智元具身 (深圳) 科技有限公司",
          englishName: "Ti-Agi OS Core",
          country: "中国",
          city: "深圳",
          establishedYear: 2026,
          chainStage: "🟦中游",
          category: "双足人形机器人本体",
          parentCategory: "服务机器人 (具身智能/物理双足/家政)",
          primaryProduct: "Titan-A2 具身仿生双足本体",
          fundingRound: "天使轮 1.5亿",
          valuation: "¥12亿",
          starRating: "⭐⭐⭐",
          revenueScale: "研发布局中",
          targetOutput2027: "1,500台",
          coreTech: "端到端神经VLA大模型底层系统",
          investors: "红杉国潮 / 陆奇奇绩创坛",
          liveStatus: "正常量产"
        },
        {
          id: "ROBO-SYNC-A2",
          name: "灵巧关节科技 (常州) 有限公司",
          englishName: "Smart Joint Electrics",
          country: "中国",
          city: "常州",
          establishedYear: 2025,
          chainStage: "🔴上游",
          category: "一体化驱控关节电缸",
          parentCategory: "核心关键零部件 (传感器/电子皮肤/精密谐波/滚子执行器)",
          primaryProduct: "120N.m 轻量中空总成",
          fundingRound: "A轮 8000万",
          valuation: "¥6.5亿",
          starRating: "⭐⭐",
          revenueScale: "¥1800万",
          targetOutput2027: "15万套",
          coreTech: "单芯片集成伺服驱控电控技术",
          investors: "国投招商 / 常州高新创投",
          liveStatus: "正常量产"
        },
        {
          id: "ROBO-SYNC-A3",
          name: "灵犀手感知 (北京) 科技有限公司",
          englishName: "Tactile Fingers",
          country: "中国",
          city: "北京",
          establishedYear: 2026,
          chainStage: "🔴上游",
          category: "微纳米三维柔性触觉电子皮肤",
          parentCategory: "核心关键零部件 (传感器/电子皮肤/精密谐波/滚子执行器)",
          primaryProduct: "高密度512点解耦压力触觉片",
          fundingRound: "种子轮 2000万",
          valuation: "¥2亿",
          starRating: "⭐⭐⭐",
          revenueScale: "科研订单交付中",
          targetOutput2027: "2万套",
          coreTech: "抗横向剪切交叉滤波MEMS工艺",
          investors: "真格基金 / 中关村前沿基金",
          liveStatus: "研发试产"
        },
        {
          id: "ROBO-SYNC-A4",
          name: "Helix Synapse LLC",
          englishName: "Helix Synapse AI",
          country: "美国",
          city: "波士顿",
          establishedYear: 2025,
          chainStage: "🔴上游",
          category: "大脑认知通用LLM大模型",
          parentCategory: "前沿硬核与脑部算法 (大脑大模型/通用认知系统/VLA)",
          primaryProduct: "Synapse-01 具身模型",
          fundingRound: "A轮 $4500万",
          valuation: "$3.5亿",
          starRating: "⭐⭐⭐",
          revenueScale: "$110万",
          targetOutput2027: "N/A (SaaS订阅部署)",
          coreTech: "3D几何特征先验融合与强化控制自适应算法",
          investors: "Founders Fund / YC",
          liveStatus: "正常量产"
        },
        ...Array.from({ length: 28 }).map((_, idx) => {
          const names = ["擎天驱控", "小脑智能", "极速飞羽", "傲步生物", "恒利谐波", "清风清洗", "麦斯医疗", "红岩特种", "中科智脑", "赛特电子"];
          const cats = [
            { name: "双足人形机器人本体", parent: "服务机器人 (具身智能/物理双足/家政)", stage: "🟦中游" },
            { name: "小脑控制具身强化学习RL", parent: "前沿硬核与脑部算法 (大脑大模型/通用认知系统/VLA)", stage: "🔴上游" },
            { name: "一体化驱控关节电缸", parent: "核心关键零部件 (传感器/电子皮肤/精密谐波/滚子执行器)", stage: "🔴上游" },
            { name: "楼宇商用高仙清洁机器人", parent: "服务机器人 (商用配送/多场景清洁/楼宇)", stage: "🟦中游" },
            { name: "三维腔镜微创手术辅助臂", parent: "医疗机器人 (高精手术微创/外骨骼康复)", stage: "🟦中游" }
          ];
          const cat = cats[idx % cats.length];
          const shortName = names[idx % names.length] + (idx + 1);
          return {
            id: `ROBO-SYNC-GEN-${idx}`,
            name: `${shortName} (苏州) 科技有限公司`,
            englishName: `${shortName} Tech Inc`,
            country: "中国",
            city: "苏州",
            establishedYear: 2025,
            chainStage: cat.stage as any,
            category: cat.name,
            parentCategory: cat.parent,
            primaryProduct: `${shortName}新一代主力装备`,
            fundingRound: "战略轮",
            valuation: "¥2.5亿",
            starRating: "⭐⭐" as any,
            revenueScale: "¥800万",
            targetOutput2027: "上千台/套",
            coreTech: "多源控制物理反馈解耦与高维运动合成",
            investors: "元禾控股 / 苏州高新创投",
            liveStatus: "研发试产"
          };
        })
      ];

      setExtraCompanies(newEntities);
      setSyncProgress(100);
      setSyncLogs(prev => [
        ...prev,
        '[SUCCESS] [09:30:15] 数据融合成功！本地节点数已新增 32 个，总容量扩展至 15,924 家。',
        '[SYS] [09:30:15] 自动化云管网调度就绪。下次自动增量同步计划：2026-05-21 04:00 AM'
      ]);
      setLastSyncTime('刚才 (手动同步成功于 ' + new Date().toLocaleTimeString() + ')');
      setIsSyncing(false);
      setHasNewUpdatesToday(true);
    }, 3200);
  };

  // Custom Research Simulator state
  const [researchQueryInput, setResearchQueryInput] = useState<string>('');
  const [researchHistory, setResearchHistory] = useState<Array<{ q: string; a: string; date: string }>>([
    {
      q: "2026年到2027年哪家厂商的人形手臂和高敏感度触觉电子皮肤具有最大出货成长潜力？",
      a: "由哥伦比亚大学实验室孵化之【首形科技(AheadForm)】所推出的Origin F1/Elf系列具有极优表现，其微电势多维感测触觉能达到亞毫米级反馈。另外【途见科技】及【帕西尼感知】在上游高密度阵列芯片出货上也进入了国内前三甲整装供应链组，2027预计出货增长超145%。",
      date: "2026-05-18"
    }
  ]);
  const [isResearchLoading, setIsResearchLoading] = useState<boolean>(false);

  const handleResearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!researchQueryInput.trim()) return;
    setIsResearchLoading(true);

    setTimeout(() => {
      const answersList = [
        "根据实时企业库统计分析，【智元机器人(AgiBot)】与其关联的上中下游配套(如三花智控、鸣志电器以及蓝点力矩传感)正全速释放产能，2027量产跟踪突破3万台。其远征A2采用端到端大模型深度驱动，正大批量应用至比亚迪等整机装配工段中。",
        "在谐波及行星滚柱丝杠环节，【五洲新春】与【绿的谐波】处于国际领先地位。随着Tesla Optimus Gen3供应链深度导入，国产核心轴承和丝杠磨削工艺成本将再次下降35%以上，有助于人形机器人整机落地价格击穿15万元区间。",
        "当前在电子皮肤与触觉阵列方面，【途见科技】的高密度纳米复合敏传感器技术已完成多轮汽车级测试，其阻抗矩阵处于装机第一序列。未来12月内协作机械爪、手术腔镜主从端将是极具红利的新兴落地突破点。",
        "根据前沿投融资数据盘点，2026Q1-Q2最大行业融资为【Figure AI】完成10亿美元C轮战略重组。另外代表高端柔性协作的桌面机器人领袖【越疆科技】亦正加快港交所上市敲钟。资本正向极轻量、极紧凑及具身大模型VLA(Pi-0)方向集聚。"
      ];
      const randomAnswer = answersList[Math.floor(Math.random() * answersList.length)];
      setResearchHistory(prev => [
        { q: researchQueryInput, a: randomAnswer, date: "2026-05-20" },
        ...prev
      ]);
      setResearchQueryInput('');
      setIsResearchLoading(false);
    }, 1200);
  };

  

  return (
    <div className="flex h-screen bg-[#070b16] text-[#e2e8f0] font-sans antialiased overflow-hidden select-none" id="app_root">
      
      {/* LEFT SIDEBAR - Replicates layout & style from the image */}
      <aside className="hidden lg:flex flex-col w-[270px] h-full shrink-0 border-r border-[#19243c] bg-[#070a14] text-gray-300 relative">
        {/* Banner with Robot icon */}
        <div className="p-5 border-b border-[#19243c] flex items-center gap-3 bg-gradient-to-r from-[#090e1c] to-[#070a14]">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#06b6d4] via-[#3b82f6] to-[#6366f1] p-[1.5px] shadow-lg shadow-cyan-950/50">
            <div className="w-full h-full bg-[#0a0f1d] rounded-[10px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-[#00f3ff] animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white leading-tight">
              全球机器人产业
            </h1>
            <p className="text-[11px] text-[#00f3ff] font-mono tracking-wider">
              全景数据库 2026
            </p>
          </div>
        </div>

        {/* Database Quick statistics */}
        <div className="px-5 py-3 border-b border-[#19243c] bg-[#090f1d]/30 text-xs text-gray-400 space-y-1.5 font-mono">
          <div className="flex justify-between">
            <span>库内监控总量:</span>
            <span className="text-[#00f3ff] font-semibold">{totalEntriesCount.toLocaleString()} 家</span>
          </div>
          <div className="flex justify-between">
            <span>本土代表厂商:</span>
            <span className="text-emerald-400 font-semibold">{chinaCompaniesCount.toLocaleString()} 家</span>
          </div>
          <div className="flex justify-between">
            <span>多源交叉置信度:</span>
            <span className="text-white">99.98%</span>
          </div>
        </div>

        {/* Unified Tab Navigations */}
        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1.5 scrollbar-thin scrollbar-thumb-gray-800">
          <div className="px-3 mb-2 text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
            核心监控系统
          </div>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-[#172554] to-[#0f172a] border-l-[3px] border-[#00f3ff] text-white shadow-md'
                : 'hover:bg-[#0d1425] hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4 text-[#00f3ff]" />
            <span>总览概览 (Dashboard)</span>
          </button>

          <button
            onClick={() => setActiveTab('user-favorites')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left ${
              activeTab === 'user-favorites'
                ? 'bg-gradient-to-r from-[#172554] to-[#0f172a] border-l-[3px] border-yellow-500 text-white shadow-md'
                : 'hover:bg-[#0d1425] hover:text-white'
            }`}
          >
            <span className="flex items-center gap-3">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span>个信跟踪与投研笔记</span>
            </span>
            {currentUser && Object.values(favorites).length > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 bg-[#1e293b] rounded-full text-yellow-400 border border-yellow-900 font-mono">
                {Object.values(favorites).length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('market-analysis')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left ${
              activeTab === 'market-analysis'
                ? 'bg-gradient-to-r from-[#172554] to-[#0f172a] border-l-[3px] border-[#00f3ff] text-white shadow-md'
                : 'hover:bg-[#0d1425] hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span>市场分析 (Market Trend)</span>
          </button>

          <div className="px-3 pt-4 mb-2 text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
            产业数据星群
          </div>
          
          <button
            onClick={() => setActiveTab('company-database')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left ${
              activeTab === 'company-database'
                ? 'bg-gradient-to-r from-[#172554] to-[#0f172a] border-l-[3px] border-[#00f3ff] text-white shadow-md'
                : 'hover:bg-[#0d1425] hover:text-white'
            }`}
          >
            <span className="flex items-center gap-3">
              <Database className="w-4 h-4 text-orange-400" />
              <span>企业库 (Companies)</span>
            </span>
            <span className="text-[10px] px-1.5 py-0.2 bg-[#1e293b] rounded-full text-cyan-400 border border-cyan-900 font-mono">
              {totalEntriesCount.toLocaleString()}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('product-library')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left ${
              activeTab === 'product-library'
                ? 'bg-gradient-to-r from-[#172554] to-[#0f172a] border-l-[3px] border-[#00f3ff] text-white shadow-md'
                : 'hover:bg-[#0d1425] hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4 text-pink-400" />
            <span>产品库 (Products)</span>
          </button>

          <button
            onClick={() => setActiveTab('funding')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left ${
              activeTab === 'funding'
                ? 'bg-gradient-to-r from-[#172554] to-[#0f172a] border-l-[3px] border-[#00f3ff] text-white shadow-md'
                : 'hover:bg-[#0d1425] hover:text-white'
            }`}
          >
            <Coins className="w-4 h-4 text-yellow-400" />
            <span>投融资 (Financing)</span>
          </button>

          <button
            onClick={() => setActiveTab('patents')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left ${
              activeTab === 'patents'
                ? 'bg-gradient-to-r from-[#172554] to-[#0f172a] border-l-[3px] border-[#00f3ff] text-white shadow-md'
                : 'hover:bg-[#0d1425] hover:text-white'
            }`}
          >
            <Award className="w-4 h-4 text-indigo-400" />
            <span>技术专利 (Patents)</span>
          </button>

          <button
            onClick={() => setActiveTab('chain-map')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left ${
              activeTab === 'chain-map'
                ? 'bg-gradient-to-r from-[#172554] to-[#0f172a] border-l-[3px] border-[#00f3ff] text-white shadow-md'
                : 'hover:bg-[#0d1425] hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4 text-[#a855f7]" />
            <span>产业链图谱 (Map)</span>
          </button>

          <div className="px-3 pt-4 mb-2 text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
            决策增值服务
          </div>

          <button
            onClick={() => setActiveTab('policies')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left ${
              activeTab === 'policies'
                ? 'bg-gradient-to-r from-[#172554] to-[#0f172a] border-l-[3px] border-[#00f3ff] text-white shadow-md'
                : 'hover:bg-[#0d1425] hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4 text-blue-400" />
            <span>政策法规 (Regulations)</span>
          </button>

          <button
            onClick={() => setActiveTab('report-center')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left ${
              activeTab === 'report-center'
                ? 'bg-gradient-to-r from-[#172554] to-[#0f172a] border-l-[3px] border-[#00f3ff] text-white shadow-md'
                : 'hover:bg-[#0d1425] hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>报告中心 (Reports)</span>
          </button>

          <button
            onClick={() => setActiveTab('custom-research')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left ${
              activeTab === 'custom-research'
                ? 'bg-gradient-to-r from-[#172554] to-[#0f172a] border-l-[3px] border-[#00f3ff] text-white shadow-md'
                : 'hover:bg-[#0d1425] hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-400 animate-bounce" />
            <span>定制研究 (Custom AI)</span>
          </button>

          <button
            onClick={() => setActiveTab('data-export')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left ${
              activeTab === 'data-export'
                ? 'bg-gradient-to-r from-[#172554] to-[#0f172a] border-l-[3px] border-[#00f3ff] text-white shadow-md'
                : 'hover:bg-[#0d1425] hover:text-white'
            }`}
          >
            <Download className="w-4 h-4 text-[#10b981]" />
            <span>数据导出 (Export)</span>
          </button>
        </nav>

        {/* 128-page annual report widget in left layout */}
        <div className="p-4 mx-3 mb-3 bg-gradient-to-b from-[#0b1329] to-[#0d1835] border border-[#1e2e50] rounded-xl text-center shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#00f3ff]/5 rounded-full blur-md pointer-events-none group-hover:scale-150 transition-transform"></div>
          <div className="flex justify-center mb-1.5 text-lg">🤖</div>
          <h4 className="text-xs font-bold text-white mb-0.5">2026机器人产业年度报告</h4>
          <p className="text-[10px] text-gray-400 mb-3.5">已更新128页产业技术深度分析</p>
          <button 
            onClick={() => {
              setActiveTab('report-center');
            }}
            className="w-full bg-gradient-to-r from-[#0284c7] to-[#0369a1] hover:from-[#00f3ff] hover:to-[#2563eb] text-white py-1.5 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer box-border border-0 shadow-md shadow-cyan-950/40"
          >
            立即查看 →
          </button>
        </div>

        {/* Profile Footer inside Left Sidebar */}
        <div className="p-4 border-t border-[#19243c] bg-[#060911]">
          {currentUser ? (
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative shrink-0">
                  {currentUser.photoURL ? (
                    <img referrerPolicy="no-referrer" src={currentUser.photoURL} alt={currentUser.displayName || ''} className="w-9 h-9 rounded-full border border-yellow-500/30" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-500 to-[#00f3ff] flex items-center justify-center text-xs font-bold text-black border border-cyan-800/20">
                      {(currentUser.displayName || currentUser.email || 'MD').slice(0, 1).toUpperCase()}
                    </div>
                  )}
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border border-[#060911] rounded-full animate-pulse"></div>
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white leading-tight flex items-center gap-1">
                    <span className="truncate max-w-[80px]">{currentUser.displayName || currentUser.email?.split('@')[0]}</span>
                    {userProfile?.role === "admin" ? (
                      <span className="text-[8px] bg-gradient-to-r from-red-500 to-orange-500 text-white font-extrabold px-1 py-0.2 rounded font-mono scale-90">超级管理员</span>
                    ) : (
                      <span className="text-[8px] bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-extrabold px-1 py-0.2 rounded font-mono scale-90">VIP 体验官</span>
                    )}
                  </div>
                  <p className="text-[9px] text-gray-550 truncate mt-0.5 max-w-[100px] text-gray-500">{currentUser.email}</p>
                </div>
              </div>
              <button 
                onClick={logout}
                className="p-1.5 rounded-lg bg-red-950/25 hover:bg-red-950 text-red-400 border border-red-900/40 hover:text-white transition-all cursor-pointer shrink-0"
                title="安全退出"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-[10px] text-yellow-500 font-bold block mb-1">🔑 行业研究工作舱未注册</div>
              <button
                onClick={login}
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:brightness-110 text-black font-extrabold py-1.8 px-3 rounded-lg text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-yellow-950/30 border-0"
              >
                <span>一键 Google 账户登录</span>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* MOBILE HEADER */}
      {showMobileSidebar && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/70 backdrop-blur-sm" onClick={() => setShowMobileSidebar(false)}>
          <div className="w-[260px] bg-[#070a14] h-full overflow-y-auto border-r border-[#19243c] flex flex-col pt-5 pb-10" onClick={e => e.stopPropagation()}>
            <div className="px-5 pb-5 border-b border-[#19243c] flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-white">全球机器人全景 2026</span>
              <button onClick={() => setShowMobileSidebar(false)} className="p-1 rounded bg-[#111c34] text-gray-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            <nav className="px-2 space-y-1">
              {[
                { id: 'dashboard', name: '总览概览', icon: <Activity className="w-4 h-4 text-cyan-400" /> },
                { id: 'market-analysis', name: '市场分析', icon: <BarChart3 className="w-4 h-4 text-emerald-400" /> },
                { id: 'company-database', name: '企业库', icon: <Database className="w-4 h-4 text-orange-400" /> },
                { id: 'product-library', name: '产品库', icon: <Cpu className="w-4 h-4 text-pink-400" /> },
                { id: 'funding', name: '投融资', icon: <Coins className="w-4 h-4 text-yellow-400" /> },
                { id: 'patents', name: '技术专利', icon: <Award className="w-4 h-4 text-indigo-400" /> },
                { id: 'chain-map', name: '产业链图谱', icon: <Layers className="w-4 h-4 text-purple-400" /> },
                { id: 'policies', name: '政策法规', icon: <Shield className="w-4 h-4 text-blue-400" /> },
                { id: 'report-center', name: '报告中心', icon: <FileText className="w-4 h-4 text-cyan-400" /> },
                { id: 'custom-research', name: '定制研究', icon: <Sparkles className="w-4 h-4 text-amber-400" /> },
                { id: 'data-export', name: '数据导出', icon: <Download className="w-4 h-4 text-emerald-400" /> }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setShowMobileSidebar(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-xs rounded-lg transition-all text-left ${
                    activeTab === item.id ? 'bg-[#111c34] text-white border-l-2 border-[#00f3ff]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* RIGHT GENERAL SCENE CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative" id="right_container">
        
        {/* TOP BAR / HEADER BAR */}
        <header className="h-[65px] border-b border-[#19243c] bg-[#070a14] px-6 flex items-center justify-between z-10 sticky top-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMobileSidebar(true)}
              className="lg:hidden p-1.5 rounded bg-[#101726] border border-gray-800 text-gray-300"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:block">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <span>全球机器人产业全景智慧平台 2026</span>
                <span className="text-[10px] bg-red-950/40 text-red-500 border border-red-900 px-2 py-0.2 rounded font-mono">LIVE / 2026修订</span>
              </h2>
            </div>
          </div>

          {/* Quick Search and Action widgets */}
          <div className="flex items-center gap-4">
            
            {/* Global Year Selector */}
            <div className="relative">
              <select
                value={selectedYear}
                onChange={e => setSelectedYear(e.target.value)}
                className="bg-[#0e172a] border border-[#213155] rounded-lg text-xs text-white px-3 py-1.5 focus:outline-none focus:border-[#00f3ff] cursor-pointer"
              >
                <option value="2026年">2026年 [最新大盘数据]</option>
                <option value="2027年">2027年 [出货展望分析]</option>
                <option value="2030年">2030年 [长周期战略预判]</option>
              </select>
            </div>

            <button className="p-1.5 rounded-lg bg-[#0e172a] border border-[#213155] text-gray-300 hover:text-white relative cursor-pointer">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <button className="p-1.5 rounded-lg bg-[#0e172a] border border-[#213155] text-gray-300 hover:text-white cursor-pointer">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* WORKSPACE VIEW CONTENT SCALAR */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-[#070b16] to-[#04060d]">
          
          {/* TAB: USER FAVORITES & PRIVATE RESEARCH HUB */}
          {activeTab === 'user-favorites' && (
            <div className="space-y-6">
              
              {/* Profile Card */}
              <div className="bg-gradient-to-r from-[#0b1329] via-[#070b16] to-[#04060d] border border-yellow-800/25 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    {currentUser ? (
                      currentUser.photoURL ? (
                        <img referrerPolicy="no-referrer" src={currentUser.photoURL} alt={currentUser.displayName || ''} className="w-14 h-14 rounded-full border-2 border-yellow-500/50" />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-yellow-500 to-amber-500 flex items-center justify-center text-xl font-bold text-black border-2 border-yellow-500/50">
                          {(currentUser.displayName || currentUser.email || '明').slice(0, 1).toUpperCase()}
                        </div>
                      )
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-[#111c33] flex items-center justify-center text-2xl border border-gray-800">
                        👤
                      </div>
                    )}
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        {currentUser ? (userProfile?.displayName || currentUser.displayName) : "游客仿客专属研究舱"}
                        {currentUser && (
                          <span className="text-[10px] bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-extrabold px-1.5 py-0.2 rounded font-mono scale-95">
                            {userProfile?.role === 'admin' ? "系统高级管理员" : "VIP 产业体验官"}
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">
                        {currentUser ? `登录账号: ${currentUser.email}` : "登录 Google 账户后，即可在云端 Firestore 畅快同步个性收藏企业、多维度重点备注"}
                      </p>
                      {currentUser && userProfile?.createdAt && (
                        <p className="text-[10px] text-[#4f648a] mt-0.5 font-mono">
                          首次建档: {new Date(userProfile.createdAt.seconds * 1000).toLocaleString('zh-CN')}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    {currentUser ? (
                      <button
                        onClick={logout}
                        className="px-4 py-2 bg-red-950/40 hover:bg-red-950 text-red-400 border border-red-900/50 text-xs font-bold rounded-lg cursor-pointer transition-all flex items-center gap-1.5"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>注销 Google 安全退出</span>
                      </button>
                    ) : (
                      <button
                        onClick={login}
                        className="px-5 py-2.5 bg-gradient-to-r from-yellow-500 to-amber-500 hover:brightness-110 text-black font-extrabold text-xs rounded-xl shadow-lg cursor-pointer flex items-center gap-2"
                      >
                        <span>🔑</span>
                        <span>一键 Google 账户登录配置</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {!currentUser ? (
                <div className="p-16 text-center bg-[#0b1224] border border-[#20325d] rounded-2xl flex flex-col items-center justify-center space-y-4">
                  <div className="text-5xl animate-bounce">📁</div>
                  <h4 className="text-base font-bold text-white">未检测到有效同步凭证</h4>
                  <p className="text-xs text-gray-400 max-w-md leading-relaxed">
                    本行业全景产业舱拥有高密度的芯片元器件、本体制造数据。为了保护您的研究意向、核心收藏记录和定制决策备忘，您必须先通过 Google Sign-In 登录您的私人账号，云端 Firestore 将立刻为您提供全流程专属物理隔离区。
                  </p>
                  <button
                    onClick={login}
                    className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:brightness-110 text-black font-extrabold text-xs rounded-xl shadow-lg shadow-cyan-950/20 cursor-pointer"
                  >
                    立即 Google 验证绑定 🚀
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
                  
                  {/* Favorites section */}
                  <div className="bg-[#0b1224] border border-[#20325d] rounded-xl p-5 space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                      <h4 className="text-xs font-bold text-white flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-405 fill-yellow-405" />
                        <span>重点跟踪企业监控节点 ({Object.values(favorites).length} 家)</span>
                      </h4>
                      <span className="text-[10px] text-gray-500 font-mono">AUTO-SYNC FIRESTORE</span>
                    </div>

                    {Object.values(favorites).length === 0 ? (
                      <div className="p-10 text-center text-gray-500 space-y-2">
                        <div className="text-xl">⭐️</div>
                        <p className="text-xs">暂无收藏。在【企业库】或厂商详情页中，点击 Star 即可瞬间添加核实。</p>
                      </div>
                    ) : (
                      <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                        {Object.values(favorites).map((fav: any) => {
                          const comObj = allCompanies.find(c => c.id === fav.companyId);
                          return (
                            <div
                              key={fav.companyId}
                              onClick={() => {
                                if (comObj) {
                                  setSelectedCompany(comObj);
                                } else {
                                  alert("该公司数据可能发生变动。");
                                }
                              }}
                              className="flex items-center justify-between p-3.5 bg-[#070b16] border border-[#14213d] hover:border-yellow-850/40 rounded-lg hover:bg-[#0e162a]/45 cursor-pointer transition-all"
                            >
                              <div className="min-w-0">
                                <div className="font-bold text-white text-xs truncate">{fav.companyName || "未标名称"}</div>
                                <div className="text-[10px] text-gray-400 mt-1 truncate">
                                  {comObj ? `${comObj.parentCategory} | ${comObj.chainStage}` : "行业监控实体"}
                                </div>
                              </div>

                              <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                                <span className="text-[10px] text-gray-550 font-mono hidden sm:inline">
                                  {fav.favoritedAt ? new Date(fav.favoritedAt.seconds * 1000).toLocaleDateString() : ""}
                                </span>
                                <button
                                  onClick={() => toggleFavorite(fav.companyId, fav.companyName)}
                                  className="p-1 text-xs hover:bg-[#111c33] text-gray-500 hover:text-red-400 border border-transparent rounded transition-colors"
                                  title="移移出"
                                >
                                  移出
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Private research notes overview */}
                  <div className="bg-[#0b1224] border border-[#20325d] rounded-xl p-5 space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                      <h4 className="text-xs font-bold text-white flex items-center gap-2">
                        <span>📝</span>
                        <span>专属行业投研笔记清单 ({Object.keys(notes).length} 篇)</span>
                      </h4>
                      <span className="text-[10px] text-gray-500 font-mono">REALTIME SECURED</span>
                    </div>

                    {Object.keys(notes).length === 0 ? (
                      <div className="p-10 text-center text-gray-500 space-y-2">
                        <div className="text-xl">✍️</div>
                        <p className="text-xs">暂无个性笔记。双击或点击企业详情，可在专属备注框内极速录入洞察备忘。</p>
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                        {Object.values(notes).map((note: any) => {
                          const comObj = allCompanies.find(c => c.id === note.companyId);
                          return (
                            <div
                              key={note.companyId}
                              className="p-3.5 bg-[#070b16] border border-[#14213d] rounded-lg relative group space-y-2"
                            >
                              <div className="flex items-center justify-between">
                                <span
                                  onClick={() => comObj && setSelectedCompany(comObj)}
                                  className="font-bold text-white text-xs hover:text-[#00f3ff] cursor-pointer transition-colors"
                                >
                                  {comObj?.name || "未知企业"}
                                </span>
                                <button
                                  onClick={() => {
                                    if (confirm(`确定要彻底删除对 ${comObj?.name || '此企业'} 的这条研究笔记吗？`)) {
                                      deleteNote(note.companyId);
                                    }
                                  }}
                                  className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-950 text-gray-400 hover:text-red-500 text-[10px] cursor-pointer transition-all border border-transparent hover:border-red-900/50"
                                >
                                  删除
                                </button>
                              </div>
                              <p className="text-xs text-gray-300 font-serif leading-relaxed whitespace-pre-wrap selection:bg-[#00f3ff]/40 bg-[#04060d] p-2.5 rounded border border-gray-900">
                                {note.content}
                              </p>
                              <div className="text-[9.5px] text-gray-550 font-mono flex justify-between items-center pt-0.5">
                                <span>云端同步就绪</span>
                                <span>{note.updatedAt ? new Date(note.updatedAt.seconds * 1000).toLocaleString() : ""}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                  </div>

                </div>
              )}

            </div>
          )}

          {/* TAB 1: DASHBOARD VIEW (Replicates exactly the dashboard layout from the user screenshot) */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Slogan Banner */}
              <div className="bg-gradient-to-r from-[#0f1b3c] via-[#070b16] to-[#04060d] border border-[#1e2a52] rounded-xl p-5 relative overflow-hidden flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="absolute inset-0 bg-radial-at-tl from-cyan-900/10 via-transparent to-transparent"></div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    欢迎回来，{currentUser ? (currentUser.displayName || currentUser.email?.split('@')[0]) : "访客领航员"} 👋
                    <span className="text-[11px] bg-gradient-to-r from-blue-400 to-[#00f3ff] text-black font-extrabold px-1.8 py-0.2 rounded">
                      {currentUser ? (userProfile?.role === 'admin' ? "超级管理员专享" : "VIP 专属") : "游客特权区"}
                    </span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {currentUser 
                      ? `您正在使用云端智算专线。已成功加载了您关注的 ${Object.values(favorites).length} 家核心企业与专属研报分析。`
                      : "全球机器人产业全景数据与智能分析平台 — 今日更新已部署完毕，绑定账户以解锁收藏与独立笔记。"
                    }
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs bg-[#0b1329] border border-[#1f2d4f] rounded-lg px-3 py-1.5 font-mono text-[#00f3ff]">
                    数据截至: <strong>2026-05-20</strong>
                  </span>
                </div>
              </div>

              {selectedYear === '2027年' && <Year2027DashboardView totalEntriesCount={totalEntriesCount} />}

              {selectedYear === '2030年' && <Year2030DashboardView totalEntriesCount={totalEntriesCount} />}

              {selectedYear === '2026年' && (
                <>
                  {/* 🌐 每日多源自治采集与实时更新调度中心 */}
              <div className="bg-gradient-to-b from-[#0a1024] to-[#060a15] border border-[#1e2e5e] rounded-xl p-5 space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1b2d56] pb-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
                    <div>
                      <h4 className="text-xs font-extrabold text-[#00f3ff] uppercase tracking-wider flex items-center gap-2">
                        <span>LIVE</span> 每日多源自治智能化更新系统 (已经联通)
                      </h4>
                      <p className="text-[10px] text-gray-400 mt-0.5 font-mono">
                        调度状态: <span className="text-emerald-400">● 自动监听与离线合规采集管线在线</span> (下一次计划: 每日 04:00 AM)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-gray-400 font-mono hidden xl:inline">
                      数据更新源: <span className="text-gray-200">IT桔子 / CNIPA / Crunchbase API / 36Kr AI</span>
                    </span>
                    <button
                      onClick={triggerManualSync}
                      disabled={isSyncing}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md ${
                        isSyncing
                          ? 'bg-blue-900/40 text-blue-300 border border-blue-800'
                          : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:brightness-110 text-black shadow-cyan-950/20'
                      }`}
                    >
                      <Zap className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                      {isSyncing ? '数据拉取交叉验证中...' : '核查并强制拉取最新增量'}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1 space-y-3 bg-[#070b16]/50 p-3.5 rounded-lg border border-[#14213d] flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="text-[10px] text-gray-500">自动化更新节点配置明细</div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[11px] font-mono">
                          <span className="text-gray-400">今日捕获增量</span>
                          <span className="text-emerald-400 font-bold">{hasNewUpdatesToday ? '+32 家前沿厂商' : '新捕获 32 家待手动融合'}</span>
                        </div>
                        <div className="flex justify-between text-[11px] font-mono">
                          <span className="text-gray-400">最新核验时段</span>
                          <span className="text-[#00f3ff]">{lastSyncTime}</span>
                        </div>
                        <div className="flex justify-between text-[11px] font-mono">
                          <span className="text-gray-400">分类打标引擎</span>
                          <span className="text-purple-400">VLA-Taxonomy-v3.2</span>
                        </div>
                      </div>
                    </div>
                    {isSyncing && (
                      <div className="space-y-1 mt-2">
                        <div className="flex justify-between text-[9px] font-mono text-cyan-400">
                          <span>数据清洗和特征向量化...</span>
                          <span>{syncProgress}%</span>
                        </div>
                        <div className="w-full bg-cyan-950 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full transition-all duration-300" style={{ width: `${syncProgress}%` }}></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2 bg-[#04060d] border border-[#131d33] rounded-lg p-3 font-mono text-[10px] text-gray-400 h-[105px] overflow-y-auto flex flex-col justify-start">
                    <div className="text-[9px] bg-[#0c1326] px-2 py-0.5 text-gray-400 border-b border-gray-900 mb-1 flex justify-between items-center header-mono">
                      <span>SYSTEM LOGS - 自动化离线爬虫抓取管道监控</span>
                      <span className="text-[8px] text-cyan-500 animate-pulse">● FEEDING</span>
                    </div>
                    <div className="space-y-1 overflow-y-auto pr-1 flex-1">
                      {syncLogs.length === 0 ? (
                        <div className="text-gray-600 italic">
                          [WAIT] 等待触发强制拉取增量，或等待每日凌晨零时自动调度拉取...
                          <br />
                          [SCHEDULER] 自动调度状态：已注册。每日 04:00 AM 会对 18 个国际创投源和工信部备案库数据包进行增量采集、词云训练和产业双维层级精配归档。
                        </div>
                      ) : (
                        syncLogs.map((log, lidx) => (
                          <div
                            key={lidx}
                            className={`leading-tight whitespace-pre-wrap ${
                              log.includes('SUCCESS') ? 'text-emerald-400 font-semibold' : log.includes('ANALYSIS') ? 'text-purple-400' : log.includes('INFO') ? 'text-cyan-400' : 'text-gray-400'
                            }`}
                          >
                            {log}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid 4 Metrics Cards - Exactly as the top part of referential photo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                
                {/* Metric A: 全球市场规模 */}
                <div className="bg-gradient-to-b from-[#0b132a] to-[#060a15] border border-[#20325d] rounded-xl p-5 relative overflow-hidden">
                  <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-cyan-950/40 text-[#00f3ff]">
                    <Globe className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-gray-400 block font-medium">全球市场规模</span>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-white font-mono">$762.4</span>
                    <span className="text-xs text-[#00f3ff] font-bold">亿</span>
                  </div>
                  <div className="mt-2.5 flex justify-between items-center">
                    <span className="text-[10px] text-emerald-400 flex items-center gap-0.5">
                      <TrendingUp className="w-3 h-3" />
                      +23.6% 较上年增长
                    </span>
                    {/* SVG Sparkline */}
                    <svg className="w-16 h-6 stroke-[#00f3ff] stroke-[2] fill-none" viewBox="0 0 50 15">
                      <path d="M 0 10 Q 15 2, 25 12 T 50 3" />
                    </svg>
                  </div>
                </div>

                {/* Metric B: 企业总数 */}
                <div className="bg-gradient-to-b from-[#0b132a] to-[#060a15] border border-[#20325d] rounded-xl p-5 relative overflow-hidden ring-1 ring-purple-500/15">
                  <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-indigo-950/40 text-purple-400">
                    <Database className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-gray-400 block font-medium">库内监控企业数</span>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-white font-mono">{totalEntriesCount.toLocaleString()}</span>
                    <span className="text-xs text-purple-400 font-bold">家</span>
                  </div>
                  <div className="mt-2.5 flex justify-between items-center">
                    <span className="text-[10px] text-purple-400 flex items-center gap-0.5">
                      <TrendingUp className="w-3 h-3" />
                      +18.4% 包含今日新增 
                    </span>
                    <svg className="w-16 h-6 stroke-purple-400 stroke-[2] fill-none" viewBox="0 0 50 15">
                      <path d="M 0 12 L 10 9 L 20 13 L 30 7 L 40 12 L 50 4" />
                    </svg>
                  </div>
                </div>

                {/* Metric C: 融资总额 */}
                <div className="bg-gradient-to-b from-[#0b132a] to-[#060a15] border border-[#20325d] rounded-xl p-5 relative overflow-hidden">
                  <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-emerald-950/40 text-[#10b981]">
                    <Coins className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-gray-400 block font-medium">融资总额</span>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-white font-mono">$342.7</span>
                    <span className="text-xs text-emerald-400 font-bold">亿</span>
                  </div>
                  <div className="mt-2.5 flex justify-between items-center">
                    <span className="text-[10px] text-emerald-400 flex items-center gap-0.5">
                      <TrendingUp className="w-3 h-3" />
                      +31.7% 较上年增长
                    </span>
                    <svg className="w-16 h-6 stroke-[#10b981] stroke-[2] fill-none" viewBox="0 0 50 15">
                      <path d="M 0 15 Q 15 10, 25 2 T 50 4" />
                    </svg>
                  </div>
                </div>

                {/* Metric D: 专利数量 */}
                <div className="bg-gradient-to-b from-[#0b132a] to-[#060a15] border border-[#20325d] rounded-xl p-5 relative overflow-hidden">
                  <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-yellow-950/40 text-amber-500">
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-gray-400 block font-medium">专利数量</span>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-white font-mono">128,456</span>
                    <span className="text-xs text-amber-500 font-bold">件</span>
                  </div>
                  <div className="mt-2.5 flex justify-between items-center">
                    <span className="text-[10px] text-[#f59e0b] flex items-center gap-0.5">
                      <TrendingUp className="w-3 h-3" />
                      +27.2% 较上年增长
                    </span>
                    <svg className="w-16 h-6 stroke-amber-500 stroke-[2] fill-none" viewBox="0 0 50 15">
                      <path d="M 0 14 L 12 11 L 24 13 L 36 2 L 50 1" />
                    </svg>
                  </div>
                </div>

              </div>

              {/* Graphic charts: 全球市场趋势 AND 市场份额占比 (按应用领域) */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                
                {/* 1. 全球市场趋势 Line Chart - Occupies 3 columns */}
                <div className="bg-[#0b1224] border border-[#20325d] rounded-xl p-5 lg:col-span-3 flex flex-col justify-between">
                  <div className="flex justify-between items-center pb-4 border-b border-[#1f2e51]">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#00f3ff]" />
                      <span className="text-xs font-bold text-white">全球市场趋势</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setActiveTrendTab('amount')}
                        className={`px-3 py-1 rounded text-[10px] font-medium transition-all ${
                          activeTrendTab === 'amount'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-[#121c33] text-gray-400 hover:text-white'
                        }`}
                      >
                        金额 (亿美元)
                      </button>
                      <button
                        onClick={() => setActiveTrendTab('rate')}
                        className={`px-3 py-1 rounded text-[10px] font-medium transition-all ${
                          activeTrendTab === 'rate'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-[#121c33] text-gray-400 hover:text-white'
                        }`}
                      >
                        增长率 (%)
                      </button>
                      <span className="text-[10px] text-gray-500 bg-[#0e1628] border border-[#1e2e4f] px-2 py-1 rounded font-mono">近8年 ▾</span>
                    </div>
                  </div>

                  {/* SVG line chart projection */}
                  <div className="h-[210px] relative w-full pt-6">
                    <svg className="w-full h-full" viewBox="0 0 500 160">
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {/* Grid Lines */}
                      <line x1="10" y1="120" x2="480" y2="120" stroke="#1c2c4c" strokeDasharray="3" />
                      <line x1="10" y1="80" x2="480" y2="80" stroke="#1c2c4c" strokeDasharray="3" />
                      <line x1="10" y1="40" x2="480" y2="40" stroke="#1c2c4c" strokeDasharray="3" />

                      {activeTrendTab === 'amount' ? (
                        <>
                          {/* 2019-2026金额 line */}
                          <path
                            d="M 20 120 L 80 110 L 140 100 L 200 95 L 260 80 L 320 60 L 380 45 L 440 25"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="3.5"
                          />
                          <path
                            d="M 20 120 L 80 110 L 140 100 L 200 95 L 260 80 L 320 60 L 380 45 L 440 25 L 440 140 L 20 140 Z"
                            fill="url(#chartGradient)"
                          />
                          <circle cx="20" cy="120" r="4.5" fill="#00f3ff" />
                          <text x="25" y="115" fill="#cbd5e1" fontSize="9" fontFamily="monospace">243</text>
                          
                          <circle cx="200" cy="95" r="4.5" fill="#00f3ff" />
                          <text x="205" y="90" fill="#cbd5e1" fontSize="9" fontFamily="monospace">375</text>

                          <circle cx="320" cy="60" r="4.5" fill="#00f3ff" />
                          <text x="325" y="55" fill="#cbd5e1" fontSize="9" fontFamily="monospace">562</text>

                          <circle cx="440" cy="25" r="6" fill="#ef4444" stroke="#fff" strokeWidth="1.5" />
                          <text x="445" y="20" fill="#ef4444" fontSize="10" fontWeight="bold" fontFamily="monospace">762.4</text>
                        </>
                      ) : (
                        <>
                          {/* 增长率 line */}
                          <path
                            d="M 20 80 L 80 90 L 140 45 L 200 70 L 260 30 L 320 50 L 380 35 L 440 18"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="3.5"
                          />
                          <circle cx="140" cy="45" r="4.5" fill="#10b981" />
                          <text x="145" y="40" fill="#cbd5e1" fontSize="9" fontFamily="monospace">22.8%</text>

                          <circle cx="260" cy="30" r="4.5" fill="#10b981" />
                          <text x="265" y="25" fill="#cbd5e1" fontSize="9" fontFamily="monospace">28.5%</text>

                          <circle cx="440" cy="18" r="6" fill="#10b981" stroke="#fff" strokeWidth="1.5" />
                          <text x="445" y="15" fill="#10b981" fontSize="10" fontWeight="bold" fontFamily="monospace">23.6%</text>
                        </>
                      )}
                    </svg>
                    <div className="flex justify-between text-[9px] text-[#4f648a] font-mono mt-2 px-10">
                      <span>2019</span>
                      <span>2020</span>
                      <span>2021</span>
                      <span>2022</span>
                      <span>2023</span>
                      <span>2024</span>
                      <span>2025</span>
                      <span>2026E</span>
                    </div>
                  </div>
                </div>

                {/* 2. 市场份额占比 (按应用领域) Donut Segment - Occupies 2 columns */}
                <div className="bg-[#0b1224] border border-[#20325d] rounded-xl p-5 lg:col-span-2 flex flex-col justify-between">
                  <div className="flex justify-between items-center pb-3 border-b border-[#1f2e51]">
                    <span className="text-xs font-bold text-white">市场份额占比 (按应用领域)</span>
                    <span className="text-[10px] text-cyan-400 font-mono hover:underline cursor-pointer">更多 &gt;</span>
                  </div>

                  {/* Beautiful simulated chart grids */}
                  <div className="flex items-center justify-around py-2 gap-4">
                    {/* Compact SVG Donut Wheel */}
                    <div className="w-24 h-24 relative shrink-0">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 32 32">
                        {/* Under track */}
                        <circle cx="16" cy="16" r="14" fill="none" stroke="#1e293b" strokeWidth="3.5" />
                        {/* Industrial 42.6% */}
                        <circle cx="16" cy="16" r="14" fill="none" stroke="#2563eb" strokeWidth="3.5" strokeDasharray="37 100" />
                        {/* Service 24.8% */}
                        <circle cx="16" cy="16" r="14" fill="none" stroke="#10b981" strokeWidth="3.5" strokeDasharray="22 100" strokeDashoffset="-37" />
                        {/* Medical 13.7% */}
                        <circle cx="16" cy="16" r="14" fill="none" stroke="#c084fc" strokeWidth="3.5" strokeDasharray="12 100" strokeDashoffset="-59" />
                        {/* Specialty 9.6% */}
                        <circle cx="16" cy="16" r="14" fill="none" stroke="#f59e0b" strokeWidth="3.5" strokeDasharray="8 100" strokeDashoffset="-71" />
                        {/* Collaborative 6.2% */}
                        <circle cx="16" cy="16" r="14" fill="none" stroke="#06b6d4" strokeWidth="3.5" strokeDasharray="5 100" strokeDashoffset="-79" />
                      </svg>
                      {/* Center label */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-[10px] text-gray-400 font-mono leading-none">2026年</span>
                        <span className="text-[10px] text-[#00f3ff] font-bold mt-1 scale-90">应用占比</span>
                      </div>
                    </div>

                    {/* Legendary labels */}
                    <div className="space-y-1.5 flex-1 min-w-0">
                      {[
                        { label: '工业机器人', pct: '42.6%', color: 'bg-blue-600' },
                        { label: '服务机器人', pct: '24.8%', color: 'bg-emerald-500' },
                        { label: '医疗机器人', pct: '13.7%', color: 'bg-purple-450 bg-indigo-505 bg-purple-400' },
                        { label: '特种机器人', pct: '9.6%', color: 'bg-amber-500' },
                        { label: '协作机器人', pct: '6.2%', color: 'bg-cyan-500' },
                        { label: '其他', pct: '3.1%', color: 'bg-gray-500' }
                      ].map(item => (
                        <div key={item.label} className="flex items-center justify-between text-[10px] text-gray-300">
                          <span className="flex items-center gap-1.5 truncate">
                            <span className={`w-1.5 h-1.5 rounded-full ${item.color}`}></span>
                            <span className="truncate">{item.label}</span>
                          </span>
                          <span className="font-mono text-white font-medium pl-1">{item.pct}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Geo Market and Funding Bars */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* A. 区域市场分布 (Geo Map Widget) */}
                <div className="bg-[#0b1224] border border-[#20325d] rounded-xl p-5 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">区域市场分布</span>
                    <p className="text-[10px] text-gray-500 mt-0.5">全球主要装机/销量区隔(百分比占比)</p>
                  </div>

                  <div className="h-[200px] relative w-full rounded flex items-center justify-center bg-[#070b16]/50 overflow-hidden py-4">
                    {/* Glowing schematic map skeleton */}
                    <svg className="absolute w-full h-[160px] opacity-25" viewBox="0 0 340 160">
                      {/* Stylized world dot layout representation */}
                      <circle cx="80" cy="50" r="2.5" fill="#3b82f6" />
                      <circle cx="100" cy="65" r="2.5" fill="#3b82f6" />
                      <circle cx="150" cy="40" r="2.5" fill="#3b82f6" />
                      <circle cx="170" cy="50" r="2.5" fill="#3b82f6" />
                      <circle cx="250" cy="45" r="2.5" fill="#3b82f6" />
                      <circle cx="280" cy="60" r="2.5" fill="#3b82f6" />
                    </svg>

                    {/* Nodes of Asia, America, Europe */}
                    <div className="flex gap-4 justify-around w-full relative z-10 px-4">
                      
                      <div className="bg-[#0c162f]/80 p-3 rounded-xl border border-blue-500/20 text-center w-24 relative hover:border-[#00f3ff]/50 transition-all">
                        <span className="absolute -top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
                        <p className="text-[10px] text-blue-400 font-bold">北美</p>
                        <h4 className="text-sm font-black text-white font-mono mt-1">21.3%</h4>
                      </div>

                      <div className="bg-[#0c162f]/80 p-3 rounded-xl border border-emerald-500/20 text-center w-24 relative hover:border-[#00f3ff]/50 transition-all">
                        <span className="absolute -top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                        <p className="text-[10px] text-emerald-400 font-bold">欧洲</p>
                        <h4 className="text-sm font-black text-white font-mono mt-1">19.8%</h4>
                      </div>

                      <div className="bg-[#0c162f]/80 p-3 rounded-xl border border-purple-500/20 text-center w-24 relative hover:border-[#10b981]/50 transition-all">
                        <span className="absolute -top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full animate-ping"></span>
                        <p className="text-[10px] text-purple-400 font-bold">亚洲</p>
                        <h4 className="text-sm font-black text-white font-mono mt-1">48.7%</h4>
                      </div>

                      <div className="bg-[#0c162f]/80 p-3 rounded-xl border border-amber-500/20 text-center w-20 hover:border-[#10b981]/50 transition-all">
                        <p className="text-[10px] text-amber-500 font-bold">其他</p>
                        <h4 className="text-sm font-black text-white font-mono mt-1">10.2%</h4>
                      </div>

                    </div>
                  </div>
                </div>

                {/* B. 投融资趋势 (Financing Trends) */}
                <div className="bg-[#0b1224] border border-[#20325d] rounded-xl p-5 flex flex-col justify-between">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs font-bold text-white block">投融资趋势</span>
                      <p className="text-[10px] text-gray-500 mt-0.5">近5年融资融券规模与单数走向(预测)</p>
                    </div>
                    <span className="text-[10px] text-gray-500 bg-[#0e1628] border border-[#1e2e4f] px-2 py-1 rounded font-mono">近5年 ▾</span>
                  </div>

                  <div className="h-[200px] relative w-full pt-4 flex items-end justify-between gap-5 font-mono text-center">
                    {[
                      { year: '2022', amount: '128.7', h: '30%', count: '300' },
                      { year: '2023', amount: '158.4', h: '45%', count: '600' },
                      { year: '2024', amount: '203.6', h: '60%', count: '900' },
                      { year: '2025', amount: '260.1', h: '80%', count: '1050' },
                      { year: '2026', amount: '342.7', h: '100%', count: '1200' }
                    ].map(bar => (
                      <div key={bar.year} className="flex-1 flex flex-col justify-end items-center group relative">
                        <span className="text-[9px] text-[#00f3ff] mb-1 font-bold group-hover:block hidden absolute -top-4 bg-[#0a0f1d] px-1 py-0.5 border border-[#1f2d4f] rounded">{bar.amount}亿</span>
                        <div className="w-full bg-gradient-to-t from-blue-900 via-blue-700 to-cyan-500 rounded-t-md hover:brightness-125 transition-all" style={{ height: bar.h }}></div>
                        <span className="text-[10px] text-gray-300 mt-1.5">{bar.year}</span>
                        <span className="text-[8px] text-gray-500 scale-90">{bar.count}起</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Section 4: 最新动态 Table */}
              <div className="bg-[#0b1224] border border-[#20325d] rounded-xl p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1f2e51]">
                  <div>
                    <span className="text-xs font-bold text-white block">最新动态</span>
                    <p className="text-[10px] text-gray-500 mt-0.5">机器人产业链当日重要新闻/发布/政策实时收录</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['全部', '企业动态', '投融资', '产品发布', '政策法规', '技术突破'].map(t => (
                      <button
                        key={t}
                        onClick={() => setActiveDynamicTab(t)}
                        className={`px-3 py-1 rounded text-[10px] font-semibold transition-all ${
                          activeDynamicTab === t
                            ? 'bg-[#00f3ff] text-black shadow-md shadow-cyan-950/25'
                            : 'bg-[#121c33] text-gray-400 hover:text-white'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timeline rows */}
                <div className="mt-4 space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
                  {filteredDynamics.map((item, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-[#070b16]/75 border border-[#19243c] hover:border-[#3b82f6]/40 transition-all gap-2 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="text-[#4f648a] font-mono shrink-0 font-medium">{item.date}</span>
                        <span className={`px-2 py-0.5 text-[9px] rounded font-bold uppercase shrink-0 ${
                          item.category === '投融资' ? 'bg-yellow-950/40 text-yellow-500 border border-yellow-900/60' :
                          item.category === '产品发布' ? 'bg-pink-950/40 text-pink-500 border border-pink-900/60' :
                          item.category === '政策法规' ? 'bg-blue-950/40 text-blue-500 border border-blue-900/60' :
                          'bg-purple-950/40 text-purple-500 border border-purple-900/60'
                        }`}>
                          {item.category}
                        </span>
                        <span className="text-white font-medium hover:text-[#00f3ff] transition-colors leading-relaxed">
                          {item.text}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 shrink-0 text-[10px] text-gray-400 font-mono self-end sm:self-auto">
                        <span className="bg-[#111c34] px-2 py-0.5 rounded text-gray-300 font-sans">{item.company}</span>
                        <span>{item.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
                </>
              )}

            </div>
          )}

          {/* TAB 2: MARKET ANALYSIS (CAGR and Sliders predictive workspace) */}
          {activeTab === 'market-analysis' && (
            <MarketAnalysisView 
              onSelectCompanyByName={(name: string) => {
                const match = allCompanies.find(c => 
                  c.name.toLowerCase().includes(name.toLowerCase()) || 
                  c.englishName.toLowerCase().includes(name.toLowerCase())
                );
                
                const finalCompany = match || {
                  id: `ROBO-${Math.abs(name.split("").reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0)) % 10000}`,
                  name: name,
                  englishName: `${name} Advanced Automation Tech`,
                  country: name.includes("Tesla") || name.includes("Figure") ? "美国" : "中国",
                  city: name.includes("Tesla") ? "奥斯汀" : name.includes("Figure") ? "硅谷" : "深圳",
                  establishedYear: 2018,
                  chainStage: name.includes("灵心巧手") || name.includes("途见") || name.includes("蓝点") || name.includes("五洲") || name.includes("鸣志") ? "🔴上游" : "🟦中游",
                  category: "前沿高附细分先锋企业",
                  parentCategory: "核心关键零部件 (传感器/电子皮肤/精密谐波/滚子执行器)",
                  primaryProduct: `${name} 智能高精密套件`,
                  fundingRound: "上市公司 / 国家战略基金加持 / 头部创投跟投及大额持股",
                  valuation: "¥25亿 - ¥280亿RMB (估测核心值)",
                  starRating: "⭐⭐⭐" as any,
                  revenueScale: "主营年营收过亿级批量规模",
                  targetOutput2027: "50,000套 - 250,050套",
                  coreTech: "突破自主闭环高端标定工艺，耐磨耐高拉震变频阻抗解耦算法成熟",
                  investors: "深创投 / 腾讯产业共研资本 / 蓝驰创投 / 红杉资本联合组",
                  liveStatus: "正常量产"
                };

                // Transition tab to Corporate Database
                setActiveTab('company-database');
                // Pre-fill search query with clicked name
                setSearchQuery(name);
                // Highlight and select this company to show profile drawer
                setSelectedCompany(finalCompany as Enterprise);
                // Reset page to 1
                setCurrentPage(1);
              }}
              onNavigateToDatabase={(searchOrCategory: string) => {
                setActiveTab('company-database');
                setSearchQuery(searchOrCategory);
                // Reset filter settings so search matches correctly 
                setFilterCountry('全部');
                setFilterStage('全部');
                setFilterRating('全部');
                setFilterParentCategory('全部');
                setFilterCategory('全部');
                setCurrentPage(1);
              }}
            />
          )}

          {/* TAB 3: THE 1582 COMPANY DATABASE (企业库) - Search, Filters, Pagination, and Sliding Profile Modal */}
          {activeTab === 'company-database' && (
            <div className="space-y-6">
              
              {/* Header block with stats */}
              <div className="pb-4 border-b border-[#20325d] flex flex-col md:flex-row md:items-center md:justify-between justify-start gap-4">
                <div>
                  <h3 className="text-md font-bold text-white flex items-center gap-2">
                    <Database className="w-5 h-5 text-orange-400" />
                    <span>全球机器人产业全链企业综合库 ({totalEntriesCount.toLocaleString()} 家)</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    已精配 {totalEntriesCount.toLocaleString()} 家全球主力智能实体 records（系统包含 10 维双维尖端类目分类，涵盖具身大脑与算法、上游精密皮肤传感器、空心杯电缸、特种eVTOL、医疗手术机械等，每日 04:00 AM 自动实时采集过滤）。
                  </p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="px-3.5 py-1.5 rounded-lg border border-[#20325d] hover:border-gray-600 bg-[#0d152a] text-xs text-gray-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> 重置条件
                </button>
              </div>

              {/* Advanced Filter Bars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 bg-[#0a0f1e] p-4 rounded-xl border border-[#1b2d4f]">
                
                {/* 1. Global text search query */}
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="搜企业名、产品、核心技术..."
                    className="w-full bg-[#111827] border border-[#223354] rounded-lg py-1.8 pl-8 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00f3ff]"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-3 top-2 text-gray-400 hover:text-white">
                      ✕
                    </button>
                  )}
                </div>

                {/* 2. Country option */}
                <div className="space-y-1">
                  <select
                    value={filterCountry}
                    onChange={e => {
                      setFilterCountry(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full bg-[#111827] border border-[#223354] rounded-lg py-1.8 px-3 text-xs text-white focus:outline-none focus:border-[#00f3ff] cursor-pointer"
                  >
                    <option value="全部">地区: 全部</option>
                    {availableCountries.filter(x => x !== '全部').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* 3. Stage option */}
                <div>
                  <select
                    value={filterStage}
                    onChange={e => {
                      setFilterStage(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full bg-[#111827] border border-[#223354] rounded-lg py-1.8 px-3 text-xs text-white focus:outline-none focus:border-[#00f3ff] cursor-pointer"
                  >
                    <option value="全部">供应链层级: 全部</option>
                    <option value="🔴上游">🔴 上游核心器件/材料系统</option>
                    <option value="🟦中游">🟦 中游整机/平衡装配</option>
                    <option value="🟢下游">🟢 下游行业集成落地</option>
                  </select>
                </div>

                {/* 4. Rating option */}
                <div>
                  <select
                    value={filterRating}
                    onChange={e => {
                      setFilterRating(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full bg-[#111827] border border-[#223354] rounded-lg py-1.8 px-3 text-xs text-white focus:outline-none focus:border-[#00f3ff] cursor-pointer"
                  >
                    <option value="全部">星级评定: 全部</option>
                    <option value="⭐⭐⭐">⭐⭐⭐ 顶级先驱 (特重推荐)</option>
                    <option value="⭐⭐">⭐⭐ 主骨骨干 (高潜验证)</option>
                    <option value="⭐">⭐ 一般潜力 (基础收录)</option>
                  </select>
                </div>

                {/* 5. Parent Category selector (Traditional Category) */}
                <div>
                  <select
                    value={filterParentCategory}
                    onChange={e => {
                      setFilterParentCategory(e.target.value);
                      setFilterCategory('全部'); // Restrict child categories when parent changes
                      setCurrentPage(1);
                    }}
                    className="w-full bg-[#111827] border border-[#223354] rounded-lg py-1.8 px-3 text-xs text-white focus:outline-none focus:border-indigo-400 cursor-pointer"
                  >
                    <option value="全部">行业大类: 全部大类</option>
                    {availableParentCategories.filter(x => x !== '全部').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* 6. Dynamic child Category selector */}
                <div>
                  <select
                    value={filterCategory}
                    onChange={e => {
                      setFilterCategory(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full bg-[#111827] border border-[#223354] rounded-lg py-1.8 px-3 text-xs text-white focus:outline-none focus:border-[#00f3ff] cursor-pointer"
                  >
                    <option value="全部">细分领域: 全部细分</option>
                    {availableCategories.filter(x => x !== '全部').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Filtering results header */}
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>
                  共筛选到 <strong className="text-[#00f3ff]">{filteredCompanies.length}</strong> 家大中小机器人企业
                </span>
                <span>双击任意记录可直接调阅详细企业全息分析</span>
              </div>

              {/* Companies Table list */}
              <div className="bg-[#0b1224] border border-[#20325d] rounded-xl overflow-x-auto min-w-full">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#0e172a] border-b border-[#20325d] text-[#4f648a] font-mono select-none">
                      <th className="p-3">评级</th>
                      <th className="p-3">公司名称</th>
                      <th className="p-3">英文/简称</th>
                      <th className="p-3">层级</th>
                      <th className="p-3">国家/城市</th>
                      <th className="p-3">产业双维类目 (大类 &gt; 细分)</th>
                      <th className="p-3">主研产品</th>
                      <th className="p-3">融资轮次</th>
                      <th className="p-3">年出货预测 (2027)</th>
                      <th className="p-3 text-right">估值/体量</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#162545]/60 text-gray-300">
                    {paginatedCompanies.map((c, idx) => (
                      <tr
                        key={c.id}
                        onDoubleClick={() => setSelectedCompany(c)}
                        onClick={() => setSelectedCompany(c)}
                        className="hover:bg-[#0f1931]/60 cursor-pointer transition-colors"
                      >
                        <td className="p-3 font-mono text-amber-500 font-bold">{c.starRating}</td>
                        <td className="p-3 font-bold text-white flex items-center justify-between gap-1.5 min-w-[180px]">
                          <div className="flex items-center gap-1.5">
                            <span>{c.name}</span>
                            {c.starRating === '⭐⭐⭐' && (
                              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                            )}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!currentUser) {
                                alert("请在左下角点击登录 Google 账号，即可随时一键收藏跟踪优质企业！");
                                return;
                              }
                              toggleFavorite(c.id, c.name);
                            }}
                            className="p-1 rounded hover:bg-[#152345] transition-colors focus:outline-none"
                            title={currentUser && favorites.some(f => f.companyId === c.id) ? "取消跟踪收藏" : "加入跟踪收藏"}
                          >
                            <Star className={`w-3.5 h-3.5 ${currentUser && favorites.some(f => f.companyId === c.id) ? "fill-yellow-400 text-yellow-400" : "text-gray-500 hover:text-yellow-400"}`} />
                          </button>
                        </td>
                        <td className="p-3 font-mono text-gray-400">{c.englishName}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 text-[10px] rounded font-bold ${
                            c.chainStage === '🔴上游' ? 'bg-red-950/40 text-red-500' :
                            c.chainStage === '🟦中游' ? 'bg-blue-950/40 text-blue-500' :
                            'bg-green-950/40 text-green-500'
                          }`}>
                            {c.chainStage}
                          </span>
                        </td>
                        <td className="p-3">{c.country} / {c.city}</td>
                        <td className="p-3">
                          <div className="flex flex-col gap-0.5 leading-tight">
                            <span className="text-[9px] text-gray-500 font-normal">{c.parentCategory}</span>
                            <span className="text-cyan-400 font-semibold text-xs">{c.category}</span>
                          </div>
                        </td>
                        <td className="p-3 truncate max-w-[160px]">{c.primaryProduct}</td>
                        <td className="p-3 font-mono">{c.fundingRound}</td>
                        <td className="p-3 font-mono text-emerald-400">{c.targetOutput2027}</td>
                        <td className="p-3 font-mono text-white text-right font-medium">{c.valuation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Real Pagination footer bar */}
              <div className="flex justify-between items-center text-xs bg-[#0b1224] p-4 border border-[#20325d] rounded-xl font-mono">
                <div className="text-gray-400">
                  第 {currentPage} 页 / 共 {totalPages} 页 (
                  {filteredCompanies.length === 0 ? '0' : (currentPage - 1) * itemsPerPage + 1} - 
                  {Math.min(currentPage * itemsPerPage, filteredCompanies.length)} 项
                  )
                </div>
                <div className="flex gap-2.5">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-lg border border-[#20325d] bg-[#0d152a] hover:brightness-125 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="p-1.5 rounded-lg border border-[#20325d] bg-[#0d152a] hover:brightness-125 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: PRODUCT LIBRARY (产品库) */}
          {activeTab === 'product-library' && (
            <div className="space-y-6 animate-fade-in">
              <div className="pb-4 border-b border-[#20325d] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-md font-bold text-white flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-pink-400 animate-pulse" />
                    <span>核心产品代表库 (Products Showcase)</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    实时收录全球最新发售或高热概念实体机器人。支持检索特定产品指标、核心控制、及产业链零部件。
                  </p>
                </div>
                
                <div className="text-[11px] text-gray-400 bg-[#0d152a] px-3 py-1 rounded-md border border-[#20325d] font-mono select-none self-start">
                  总收录商品: <span className="text-pink-400 font-bold">{PRODUCTS_DB.length}</span> / 筛选后: <span className="text-pink-400 font-bold">{filteredProducts.length}</span> 款
                </div>
              </div>

              {/* Filtering and Search Controls */}
              <div className="flex flex-col md:flex-row gap-4 p-4 rounded-xl bg-[#080d1a] border border-[#1b2b4d]">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-550" />
                  <input
                    type="text"
                    placeholder="按名称、核心技术、首发商产、特征说明模糊搜索..."
                    value={productSearchQuery}
                    onChange={(e) => setProductSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-8 py-1.5 bg-[#040710] text-xs text-white border border-[#172545] rounded-lg focus:outline-none focus:border-pink-500 transition-all font-mono"
                  />
                  {productSearchQuery && (
                    <button
                      onClick={() => setProductSearchQuery('')}
                      className="absolute right-3 top-2 text-gray-400 hover:text-white transition-colors cursor-pointer p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <button
                  onClick={() => {
                    setProductSearchQuery('');
                    setProductCategoryFilter('全部');
                  }}
                  className="px-3 py-1.5 rounded-lg border border-[#20325d] hover:border-gray-500 bg-[#080f20] text-xs text-gray-300 flex items-center gap-1.5 self-start cursor-pointer transition-colors font-mono"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> 重置检索
                </button>
              </div>

              {/* Category Pills Selector Row */}
              <div className="flex flex-wrap gap-2 pb-2">
                {['全部', '人形/具身本体', '四足/轮足', '手术/特种医疗', 'eVTOL/低空', '灵巧手/执行端', '精密传动/关节', '传感与皮肤'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setProductCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-[10.5px] font-mono transition-all duration-150 border cursor-pointer select-none ${
                      productCategoryFilter === cat
                        ? 'bg-pink-950/50 text-pink-400 border-pink-500/80 shadow-[0_0_10px_rgba(236,72,153,0.15)] font-bold'
                        : 'bg-[#040710] text-gray-400 border-[#172545] hover:text-white hover:border-gray-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Products Cards Grid Display */}
              {filteredProducts.length === 0 ? (
                <div className="p-12 text-center rounded-xl border border-dashed border-[#20325d] bg-[#070b16] space-y-2">
                  <div className="text-2xl text-pink-500 animate-bounce">🔍</div>
                  <h4 className="text-gray-300 text-xs font-bold font-mono">未搜索到符合当前过滤条件的产品</h4>
                  <p className="text-[11px] text-gray-500 font-mono">请尝试修改关键字、重新选择品类过滤器或重置筛选。</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setSelectedProduct(p)}
                      className="bg-[#0b1224] border border-[#20325d] p-5 rounded-xl flex flex-col justify-between hover:border-pink-500/50 hover:shadow-[0_0_15px_rgba(236,72,153,0.1)] transition-all relative overflow-hidden group cursor-pointer select-none"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-pink-500/10 transition-all"></div>
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-2xl">{p.icon}</span>
                          <span className="text-[10px] bg-pink-950/40 text-pink-400 border border-pink-900/60 font-bold px-2 py-0.5 rounded uppercase font-mono">
                            {p.cat}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white mb-2 group-hover:text-pink-400 transition-colors leading-relaxed">{p.name}</h4>
                        <div className="space-y-1.5 text-[11px] text-gray-400 font-mono leading-relaxed">
                          <p><span className="text-gray-500">规格标寸:</span> {p.scale}</p>
                          <p className="line-clamp-2"><span className="text-gray-500">核心动力:</span> {p.tech}</p>
                          <p className="line-clamp-1"><span className="text-gray-500">主力买方:</span> {p.client}</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-3.5 border-t border-[#1b2b4d]/80 flex justify-between items-center text-xs">
                        <span className="text-emerald-400 font-bold font-mono flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          {p.status}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProduct(p);
                          }}
                          className="text-[10px] text-[#00f3ff] hover:text-pink-400 hover:underline cursor-pointer transition-colors flex items-center gap-1"
                        >
                          技术透析面单 ▾
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: INVESTMENT TABLE (投融资) */}
          {activeTab === 'funding' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-[#20325d] flex flex-col md:flex-row md:items-center md:justify-between justify-start gap-4">
                <div>
                  <h3 className="text-md font-bold text-white flex items-center gap-2">
                    <Coins className="w-5 h-5 text-yellow-500" />
                    <span>全球机器人重量级资本流向榜 & 估值全景库</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    实时汇聚 2024 至 2026 年行业核心高潜创投事件。由张明科技创投数据集成团队专业解析，全方位公开最全最新的公司估值及领投方记录。
                  </p>
                </div>
                
                {/* Reset Buttons */}
                <button
                  onClick={() => {
                    setFundingSearchQuery('');
                    setFundingCategoryFilter('全部');
                    setFundingRoundFilter('全部');
                  }}
                  className="px-3 py-1.5 rounded-lg border border-[#20325d] hover:border-gray-500 bg-[#070b16] text-xs text-gray-300 flex items-center gap-1.5 self-start cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> 重置筛选
                </button>
              </div>

              {/* Capital flow metrics blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#0b1224] border border-[#20325d] p-4 rounded-xl flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-yellow-950/40 border border-yellow-800/50">
                    <Coins className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-550 block leading-tight">已选事件总起数</span>
                    <span className="text-lg font-black text-white font-mono">{filteredFundingEvents.length} <span className="text-xs font-normal text-gray-400">起</span></span>
                  </div>
                </div>

                <div className="bg-[#0b1224] border border-[#20325d] p-4 rounded-xl flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/50">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-550 block leading-tight">累计追踪融资金额约</span>
                    <span className="text-sm font-black text-emerald-400 font-mono text-emerald-400">
                      ~31 亿美元 + 104 亿人民币
                    </span>
                  </div>
                </div>

                <div className="bg-[#0b1224] border border-[#20325d] p-4 rounded-xl flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-800/50">
                    <Database className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-550 block leading-tight">最新估值最高独角兽</span>
                    <span className="text-xs font-bold text-white">Figure AI ($390亿USD)</span>
                  </div>
                </div>

                <div className="bg-[#0b1224] border border-[#20325d] p-4 rounded-xl flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-800/50">
                    <Award className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-550 block leading-tight">代表活跃重磅投资方</span>
                    <span className="text-[10px] font-bold text-indigo-300">OpenAI, 美团, 腾讯, 高瓴...</span>
                  </div>
                </div>
              </div>

              {/* Advanced filter components */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-[#0a0f1d] p-4 rounded-xl border border-[#20325d]">
                {/* Search Text */}
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="text"
                    value={fundingSearchQuery}
                    onChange={e => setFundingSearchQuery(e.target.value)}
                    placeholder="搜融资主体、赛道方向、支持机构..."
                    className="w-full bg-[#111827] border border-[#223354] rounded-lg py-1.8 pl-8 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00f3ff]"
                  />
                  {fundingSearchQuery && (
                    <button onClick={() => setFundingSearchQuery('')} className="absolute right-3 top-2 text-gray-400 hover:text-white">✕</button>
                  )}
                </div>

                {/* Category Selection */}
                <div>
                  <select
                    value={fundingCategoryFilter}
                    onChange={e => setFundingCategoryFilter(e.target.value)}
                    className="w-full bg-[#111827] border border-[#223354] rounded-lg py-1.8 px-3 text-xs text-white focus:outline-none focus:border-[#00f3ff] cursor-pointer"
                  >
                    <option value="全部">赛道方向: 全部赛道</option>
                    <option value="人形/双足本体">🤖 人形/双足/仿生整机</option>
                    <option value="3C/制造具身">🏭 3C/工业制造业具身集成</option>
                    <option value="传感与皮肤">📡 纳米柔性触觉/传感器</option>
                    <option value="决策/大模型">🧠 具身VLA大脑/平台大模型</option>
                    <option value="关节与电缸">🔌 一体化极枢关节/电机电缸</option>
                    <option value="自主导航与AMR">📦 自主配送/仓储/清洁AMR</option>
                  </select>
                </div>

                {/* Round Selection */}
                <div>
                  <select
                    value={fundingRoundFilter}
                    onChange={e => setFundingRoundFilter(e.target.value)}
                    className="w-full bg-[#111827] border border-[#223354] rounded-lg py-1.8 px-3 text-xs text-white focus:outline-none focus:border-[#00f3ff] cursor-pointer"
                  >
                    <option value="全部">融资阶段: 全部阶段</option>
                    <option value="天使与种子轮">🌱 天使轮 / 种子轮</option>
                    <option value="A轮及系列">🚀 Pre-A轮 / A1轮 / A+轮</option>
                    <option value="B轮及系列">📈 B轮 / B+轮</option>
                    <option value="C轮及系列">💎 C轮 / D轮 / E轮</option>
                    <option value="战略及大宗融资">🏦 战略投资 / 集团孵化</option>
                  </select>
                </div>
              </div>

              {/* Advanced info label */}
              <div className="flex justify-between items-center text-[10px] text-gray-400">
                <span>
                  共筛选到 <strong className="text-[#00f3ff]">{filteredFundingEvents.length}</strong> 笔重磅投融资事件记录
                </span>
                <span>💡 点击企业名称可直接调阅并拆包该公司的软硬件全面产业画像</span>
              </div>

              <div className="bg-[#0b1224] border border-[#20325d] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-gray-300">
                    <thead>
                      <tr className="bg-[#0e172a] text-[#4f648a] border-b border-[#20325d] font-mono select-none">
                        <th className="p-3">事件时间</th>
                        <th className="p-3">融资主体</th>
                        <th className="p-3">代表细分赛道</th>
                        <th className="p-3">融资本轮轮次</th>
                        <th className="p-3">融资金额</th>
                        <th className="p-3">最新估值行情</th>
                        <th className="p-3">领投/参与知名机构</th>
                        <th className="p-3 text-right">星级推荐级别</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#17264a]">
                      {filteredFundingEvents.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="p-8 text-center text-gray-500 font-mono">
                            没有检索到对应的投资事件。调整过滤参数以扩充数据呈现。
                          </td>
                        </tr>
                      ) : (
                        filteredFundingEvents.map((f, idx) => {
                          return (
                            <tr key={idx} className="hover:bg-[#121c32]/50 transition-colors">
                              <td className="p-3 font-mono text-gray-400">{f.date}</td>
                              <td className="p-3">
                                <button
                                  onClick={() => {
                                    // Match helper
                                    const cleanName = f.name.split(' ')[0];
                                    const matched = allCompanies.find(c => 
                                      c.name.includes(cleanName) || 
                                      cleanName.includes(c.name) ||
                                      c.englishName.toLowerCase().includes(cleanName.toLowerCase())
                                    );
                                    if (matched) {
                                      setSelectedCompany(matched);
                                    } else {
                                      // Generate temporary dummy matched to show full modal so info is NEVER missing
                                      setSelectedCompany({
                                        id: `TEMP-FUND-${idx}`,
                                        name: f.name,
                                        englishName: `${f.name} Inc.`,
                                        country: f.name === "Figure AI" || f.name === "1X Technologies" || f.name === "Agility Robotics" || f.name === "Apptronik" || f.name === "Sanctuary AI" || f.name === "NEURA Robotics" ? "欧美" : "中国",
                                        city: "创投资本枢纽",
                                        establishedYear: 2018,
                                        chainStage: f.cat.includes('本体') ? "🟦中游" : f.cat.includes('集成') ? "🟢下游" : "🔴上游",
                                        category: f.cat,
                                        parentCategory: "高端机器人",
                                        primaryProduct: `${f.round}-主打自研高精产品-v2.0`,
                                        fundingRound: f.round,
                                        valuation: f.val,
                                        starRating: f.star.length >= 5 ? "⭐⭐⭐" : "⭐⭐",
                                        revenueScale: f.sum,
                                        targetOutput2027: "特重极客投融资记录",
                                        coreTech: "多自由度旋转关节、腱传动、力学力控闭环、全身自适应规划核心",
                                        investors: f.inv,
                                        liveStatus: "正常量产"
                                      });
                                    }
                                  }}
                                  className="font-bold text-white text-left hover:text-[#00f3ff] hover:underline cursor-pointer"
                                >
                                  {f.name}
                                </button>
                              </td>
                              <td className="p-3 text-cyan-400 font-medium">{f.cat}</td>
                              <td className="p-3 font-mono">
                                <span className="px-2 py-0.5 rounded bg-amber-950/40 text-amber-400 border border-amber-900/40">
                                  {f.round}
                                </span>
                              </td>
                              <td className="p-3 font-mono text-emerald-400 font-semibold">{f.sum}</td>
                              <td className="p-3 font-mono text-white font-medium">{f.val}</td>
                              <td className="p-3 select-all max-w-[200px] truncate text-gray-400 text-[11px]" title={f.inv}>
                                {f.inv}
                              </td>
                              <td className="p-3 text-right text-amber-500 font-mono font-bold">{f.star}</td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: PATENT DIRECTORY (技术专利) */}
          {activeTab === 'patents' && (
            <PatentsView />
          )}

          {/* TAB 7: CHAIN LINEAGE FLOW MAP (产业链图谱) */}
          {activeTab === 'chain-map' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-[#20325d]">
                <h3 className="text-md font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-purple-400" />
                  <span>2026机器人产业链上中下游交互全链图谱</span>
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  直观查阅从底层传感器元器件(上游)过渡到集成装备整机(中游)以及下游落地应用之纵深连接导线，极速锁定价值链薄弱点。
                </p>
                <div className="mt-2.5 p-2 rounded bg-indigo-950/20 border border-indigo-900/40 text-[11px] text-cyan-300 flex items-center gap-2 animate-pulse">
                  <span>💡</span>
                  <span>行业高级情报交互：点击下方任意节点，可一键在弹出侧边栏查看该链上节点的详细经营、产品、核心工艺及财务指标信息。</span>
                </div>
              </div>

              {/* Graphic Flow Nodes */}
              <div className="p-6 rounded-xl bg-[#0b1224] border border-[#20325d] space-y-8 relative">
                
                {/* UPSTREAM SECTION */}
                <div>
                  <h4 className="text-xs font-bold text-red-500 flex items-center gap-1.5 font-mono mb-4">
                    <span>🔴</span>
                    <span>上游供应链 (精制零部件、芯片、软体大模型/电子皮肤 - 点击查看详情)</span>
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {["谐波减速器 (绿的谐波)", "行星滚柱丝杠 (五洲新春)", "空心杯电机 (鸣志电器)", "六维力矩传感器 (蓝点触控)", "电子皮肤触觉阵列 (途见科技)", "端侧AI芯片OS (东土科技)", "合成物理数据平台 (光轮智能)"].map(un => (
                      <button 
                        key={un} 
                        onClick={() => handleChainNodeClick(un)}
                        className="px-3.5 py-2.5 rounded-lg bg-[#070b16] border border-red-500/20 hover:border-red-505/60 text-xs text-gray-305 text-gray-300 font-bold hover:bg-red-950/10 hover:text-white transition-all cursor-pointer shadow-md select-none text-left"
                      >
                        {un}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Connecting arrow visual placeholder */}
                <div className="py-2 flex items-center justify-center">
                  <div className="h-8 w-[1.5px] bg-gradient-to-b from-red-500/60 via-blue-500/60 to-purple-500/60 animate-pulse"></div>
                </div>

                {/* MIDSTREAM SECTION */}
                <div>
                  <h4 className="text-xs font-bold text-blue-500 flex items-center gap-1.5 font-mono mb-4">
                    <span>🟦</span>
                    <span>中游整机厂商 (双足人形、肢控四足、高柔精密协作臂、极速AGV移动平台 - 点击查看详情)</span>
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {["Tesla Optimus", "Figure AI 本体", "智元远征系列", "优必选 Walker-S", "波士顿 Spot 四足", "越疆桌面整套协作", "極智嘉 货到人仓Mov"].map(mn => (
                      <button 
                        key={mn} 
                        onClick={() => handleChainNodeClick(mn)}
                        className="px-3.5 py-2.5 rounded-lg bg-[#070b16] border border-blue-500/20 hover:border-blue-505/60 text-xs text-gray-305 text-gray-300 font-bold hover:bg-blue-950/10 hover:text-white transition-all cursor-pointer shadow-md select-none text-left"
                      >
                        {mn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Connecting arrow visual placeholder */}
                <div className="py-2 flex items-center justify-center">
                  <div className="h-8 w-[1.5px] bg-gradient-to-b from-blue-500/60 via-green-500/60 to-cyan-500/60 animate-pulse"></div>
                </div>

                {/* DOWNSTREAM SECTION */}
                <div>
                  <h4 className="text-xs font-bold text-emerald-500 flex items-center gap-1.5 font-mono mb-4">
                    <span>🟢</span>
                    <span>下游集成及制造业/商业实际应用场景 - 点击查看详情</span>
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {["宝马/现代汽车生产线精密装配", "高危变电站/海上钻井特种防爆巡检", "高端酒店/医疗无菌器配送", "三甲外科截骨、腔镜精密遥操作手术", "粤港澳空中低空物流与空中观光", "重核废料隔离智能转移机器组"].map(dn => (
                      <button 
                        key={dn} 
                        onClick={() => handleChainNodeClick(dn)}
                        className="px-3.5 py-2.5 rounded-lg bg-[#070b16] border border-emerald-500/20 hover:border-emerald-505/60 text-xs text-gray-305 text-gray-300 font-bold hover:bg-emerald-900/10 hover:text-white transition-all cursor-pointer shadow-md select-none text-left"
                      >
                        {dn}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 8: POLICIES CATALOGUE (政策法规) */}
          {activeTab === 'policies' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-[#20325d]">
                <h3 className="text-md font-bold text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-400" />
                  <span>国家及国际低空与具身智能机器人政策红利库</span>
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  检索从工信部“机器人+”至欧美科技禁运等多重法规文件，了解投资合规划界限。
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { title: "工信部联合十七部门《“机器人+”应用行动实施方案 (2026-2030)》", text: "明确指出大力扩增加密在电力防爆、精密焊接底盘、老龄康养护理下人形双足及灵巧手之战略高额倾斜与专项补贴。", date: "2026-05", authority: "中华人民共和国工业和信息化部" },
                  { title: "欧盟《人工智能法案 AI Act》具身硬件执行安全条例补充案", text: "针对具有百赫兹级大扭矩关节碰撞可能的人形机器人，划定严格应用红线并强制规定物理断电双切安全开关功能标准。", date: "2026-03", authority: "欧盟委员会 / 科学技术审查司" },
                  { title: "中国国家标准局《具身型通用双足物理人体功能安全及测试规范标准V1.0》", text: "划定跌倒防摔无溢出电磁规范，对高动态行走姿态时的外界碰撞阻抗安全性做出七级分层鉴定定义。", date: "2026-01", authority: "国家标准化管理委员会" },
                  { title: "美国国会《机器人产业供应链安全法及对核心谐波丝杠、电子皮肤卡脖进口审查》", text: "对特定高性能硅基执行芯片及MEMS传感器的高精加工机械设备设立特定采购报备红带，保障关键硬件自持度。", date: "2025-11", authority: "美国众议院商业与科技事务委员会" },
                  { title: "常州市政府《常州市支持具身人形产业链全谱系突破与零部件集群落户百条专项税补》", text: "凡在常州设立的灵巧手腱绳、高性能空心杯线圈及一体化驱控关节企业，至2030年均享受“三免两减半”所得税政策减免。", date: "2026-02", authority: "常州市工业和信息化局" },
                  { title: "国际民航组织 (ICAO)《关于重载eVTOL、多旋翼城市低空载客安全冗余及低噪航线分配指南》", text: "划定了低空100-300米内多架智能微型飞行物避让的统一电波协议和三向航轨自动紧急备份规范。", date: "2025-09", authority: "国际民用航空组织" },
                  { title: "科技部、教育部联合印发《关于加快普通高校与科研大院共建人形机器人虚拟物理合成试验平台》", text: "直接拨付12亿元战略科研资金，针对高校开展在云端虚拟世界中对具身大脑自主小脑算法快速迭代的算力补偿。", date: "2026-04", authority: "中华人民共和国科学技术部" },
                  { title: "深圳市发展和改革委员会《深圳市加快推动具身智能机器人产业高质量发展行动计划》", text: "提出重点建设全球领先的具身大模型及合成物理测试数据集基础设施库，每年对相关开源系统提供数亿元运行和采购免息补贴。", date: "2026-05", authority: "深圳市发改委" }
                ].map((po, index) => (
                  <div key={index} className="p-5 rounded-xl bg-[#0b1224] border border-[#20325d] space-y-2 hover:border-blue-400/40 transition-all">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>发布机关: {po.authority}</span>
                      <span>公告日期: {po.date}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white">{po.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{po.text}</p>
                    <div className="pt-2 text-[10px] text-blue-400 hover:underline cursor-pointer">技术合规审查意见白皮书 ▾</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: REPORT CENTER (报告中心) */}
          {activeTab === 'report-center' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-[#20325d]">
                <h3 className="text-md font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  <span>前沿技术及商业PDF报告中心 (Publications)</span>
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  可高速检索、解密及预览由张明科技及第三方知名智库出品的深度研究文献。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {reports.map((rp, index) => (
                  <div key={index} className="p-5 rounded-xl bg-[#0b1224] border border-[#20325d] hover:border-cyan-400/40 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between text-[11px] text-gray-450 text-gray-400 font-mono">
                        <span>编研: {rp.author}</span>
                        <span>{rp.date}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white mt-2 leading-relaxed">{rp.title}</h4>
                      <p className="text-[11px] text-[#00f3ff] mt-1.5 font-mono">文库规格: {rp.pages}页 全彩深度研真原稿</p>
                    </div>
                    <div className="mt-5 pt-3.5 border-t border-[#1a2d55] flex justify-between items-center text-xs">
                      <span className="text-yellow-450 text-amber-500 font-bold font-mono">权威度: {rp.rating}</span>
                      <button className="bg-gradient-to-r from-cyan-600 to-sky-700 hover:brightness-110 text-white rounded-lg px-3 py-1 text-[11px] cursor-pointer" onClick={() => alert("报告正高速装配打包中，一秒后自主触发本地下载。")}>
                        📥 点击下载
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: CUSTOM AI RESEARCH (定制研究 - Functional simulation with prompts and history) */}
          {activeTab === 'custom-research' && (
            <div className="space-y-6">
              <div className="pb-5 border-b border-[#20325d]">
                <h3 className="text-md font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400 animate-spin" />
                  <span>张明科技 VIP 企业级 AI 行业研究助手</span>
                </h3>
                <p className="text-xs text-gray-450 text-gray-400 mt-1">
                  专为金牌大厂打造之具身世界级分析大脑。向 AI 提问任何机器人替换比、丝杠公差或是前沿首形科技表情流气动指标，获取秒级解析。
                </p>
              </div>

              {/* Functional Query Form */}
              <div className="bg-[#0b1224] border border-[#20325d] p-5 rounded-xl space-y-4">
                <form onSubmit={handleResearchSubmit} className="space-y-3">
                  <textarea
                    value={researchQueryInput}
                    onChange={e => setResearchQueryInput(e.target.value)}
                    placeholder="请输入需定制研究的行业考证，例如：2026年四足机器人与人形灵巧手在危爆石化厂的最大替换份额是什么？"
                    rows={3}
                    className="w-full bg-[#070b16] border border-[#1e2d4f] rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#00f3ff] font-sans placeholder-gray-500 leading-relaxed"
                  />
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-gray-500 font-mono">支持 12000+ 训练节点分析 </span>
                    <button
                      type="submit"
                      disabled={isResearchLoading || !researchQueryInput}
                      className="bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] text-white py-1.8 px-4 rounded-lg hover:from-purple-500 hover:to-indigo-500 font-bold transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer flex items-center gap-1.5 shadow-md shadow-indigo-950/40"
                    >
                      {isResearchLoading ? (
                        <>
                          <span className="inline-block w-3.5 h-3.5 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                          <span>正在解算中...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>建立智能研判</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Historical interactive lists */}
              <div className="space-y-4">
                <span className="text-xs font-bold text-gray-400 block pt-1">研究报告流 (Analyst outputs)</span>
                {researchHistory.map((item, index) => (
                  <div key={index} className="p-5 rounded-xl bg-[#090f1d] border border-[#1e2d4e] space-y-3.5">
                    <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono">
                      <span>研判编号: ZM-ROBO-AI-{1900 + index}</span>
                      <span>解算日: {item.date}</span>
                    </div>
                    <div>
                      <span className="text-xs text-purple-400 font-black">提问 ▾</span>
                      <p className="text-xs text-white font-bold leading-relaxed mt-1 bg-[#101931]/40 p-2.5 rounded-lg border border-purple-950/45">{item.q}</p>
                    </div>
                    <div>
                      <span className="text-xs text-[#00f3ff] font-black">AI 分析研判结果 ▾</span>
                      <div className="text-xs text-gray-300 leading-relaxed font-sans mt-1 p-3 bg-cyan-950/10 border border-[#1b2b4e] rounded-xl whitespace-pre-wrap select-all">
                        {item.a}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 11: DATA EXPORT (数据导出) */}
          {activeTab === 'data-export' && (() => {
            // Compute filtered list of companies for selective picker
            const filteredExportCompanies = allCompanies.filter(c => {
              const matchSearch = c.name.toLowerCase().includes(exportSearchQuery.toLowerCase()) || 
                                  (c.englishName && c.englishName.toLowerCase().includes(exportSearchQuery.toLowerCase())) ||
                                  c.primaryProduct.toLowerCase().includes(exportSearchQuery.toLowerCase());
              const matchStage = exportStageFilter === '全部' || c.chainStage === exportStageFilter;
              return matchSearch && matchStage;
            });

            const handleToggleExportId = (id: string) => {
              setSelectedExportIds(prev => {
                if (prev.includes(id)) {
                  return prev.filter(item => item !== id);
                } else {
                  return [...prev, id];
                }
              });
            };

            const handleToggleAllExportFiltered = () => {
              const filteredIds = filteredExportCompanies.map(c => c.id);
              const allAreSelected = filteredIds.every(id => selectedExportIds.includes(id));
              if (allAreSelected) {
                // Unselect all filtered
                setSelectedExportIds(prev => prev.filter(id => !filteredIds.includes(id)));
              } else {
                // Select all filtered (union)
                setSelectedExportIds(prev => {
                  const union = new Set([...prev, ...filteredIds]);
                  return Array.from(union);
                });
              }
            };

            const handleClearAllExport = () => {
              setSelectedExportIds([]);
            };

            return (
              <div className="space-y-6">
                
                {/* Introduction Slogan card */}
                <div className="bg-[#0b1224] border border-[#20325d] p-6 rounded-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="text-md font-bold text-white flex items-center gap-2">
                        <Download className="w-5 h-5 text-emerald-400" />
                        <span>大规模精细化智能自选数据导出中心</span>
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        自主选择您感兴趣的名录或指定供应链上的高成长标的，生成个性定制化 CSV 或 结构化 JSON 资产。已启用国标/UTF-8双向对齐，完美消除Excel乱码现象。
                      </p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => setSelectedExportIds(allCompanies.map(c => c.id))}
                        className="px-3 py-1.5 rounded bg-indigo-950 text-indigo-350 hover:text-white border border-indigo-900/50 hover:bg-indigo-900 text-[11px] font-bold cursor-pointer transition-all"
                      >
                        ☑ 一键全选 ({allCompanies.length}家)
                      </button>
                      <button
                        onClick={handleClearAllExport}
                        className="px-3 py-1.5 rounded bg-gray-900 text-gray-400 border border-gray-800 hover:bg-gray-800 text-[11px] cursor-pointer transition-all"
                      >
                        ☒ 清空选择
                      </button>
                    </div>
                  </div>
                </div>

                {/* Main Workstation: Split-screen picker */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* 1. Selector Workbench (Left Column: Span 2) */}
                  <div className="lg:col-span-2 bg-[#0b1224] border border-[#20325d] rounded-xl p-5 space-y-4">
                    
                    {/* Filters Header */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#070b16] p-3 rounded-lg border border-gray-900">
                      
                      {/* Filter A: Text Search */}
                      <div className="relative w-full sm:w-72">
                        <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gray-500" />
                        <input
                          type="text"
                          placeholder="键入企业名称、产品、技术或关键字检索..."
                          value={exportSearchQuery}
                          onChange={(e) => setExportSearchQuery(e.target.value)}
                          className="w-full bg-[#0d1425] border border-[#1f2f51] rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 outline-none focus:border-cyan-400/50 transition-all font-sans"
                        />
                      </div>

                      {/* Filter B: Chain Stage Tabset */}
                      <div className="flex gap-1 bg-[#10192e] p-1 rounded border border-[#1f2e4e] w-full sm:w-auto">
                        {['全部', '🔴上游', '🟦中游', '🟢下游'].map((stg) => (
                          <button
                            key={stg}
                            onClick={() => setExportStageFilter(stg)}
                            className={`flex-1 sm:flex-none text-[11px] px-3 py-1 rounded cursor-pointer font-bold transition-all ${
                              exportStageFilter === stg
                                ? 'bg-gradient-to-r from-cyan-950 to-indigo-950 text-cyan-400 border border-cyan-800/55'
                                : 'text-gray-400 hover:text-white'
                            }`}
                          >
                            {stg}
                          </button>
                        ))}
                      </div>

                    </div>

                    {/* Summary Checklist Header */}
                    <div className="flex justify-between items-center px-1 text-[11px]">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={filteredExportCompanies.length > 0 && filteredExportCompanies.every(c => selectedExportIds.includes(c.id))}
                          onChange={handleToggleAllExportFiltered}
                          className="rounded bg-[#0d1425] border-gray-700 text-cyan-500 focus:ring-0 w-3.5 h-3.5 cursor-pointer"
                          id="select_all_filtered_checkbox"
                        />
                        <label htmlFor="select_all_filtered_checkbox" className="text-gray-300 font-bold cursor-pointer select-none">
                          勾选当前过滤出的 {filteredExportCompanies.length} 家公司
                        </label>
                      </div>

                      <span className="text-gray-450 text-gray-450 font-mono">
                        已选中 <strong className="text-emerald-400 font-black">{selectedExportIds.length}</strong> / 总数计 {allCompanies.length} 家
                      </span>
                    </div>

                    {/* Checklist table / Scroll window */}
                    <div className="max-h-[460px] overflow-y-auto border border-gray-900 rounded-lg divide-y divide-gray-900 bg-[#070b16] custom-scrollbar scrollable-element">
                      {filteredExportCompanies.length === 0 ? (
                        <div className="p-12 text-center text-gray-500 space-y-2">
                          <p className="text-xs">🔍 未筛选出符合该过滤词的厂商名录</p>
                          <p className="text-[10px] text-gray-500">请撤除搜索词或切换到“全部”产业链层级</p>
                        </div>
                      ) : (
                        filteredExportCompanies.map((c) => {
                          const isChecked = selectedExportIds.includes(c.id);
                          return (
                            <div 
                              key={c.id} 
                              onClick={() => handleToggleExportId(c.id)}
                              className={`flex items-center justify-between p-3.5 cursor-pointer select-none transition-all hover:bg-[#0e162a]/55 ${
                                isChecked ? 'bg-cyan-950/10' : ''
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0 pr-4">
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => {}} // Swallowed: Handled by parent div row click
                                  className="rounded bg-[#0d1425] border-gray-700 text-emerald-500 focus:ring-0 w-3.5 h-3.5 pointer-events-none"
                                />
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-extrabold text-white text-xs truncate">{c.name}</span>
                                    <span className="text-[9px] text-gray-500 font-mono shrink-0 font-light hidden sm:inline">({c.englishName})</span>
                                  </div>
                                  <div className="text-[10px] text-gray-400 mt-0.5 truncate max-w-xl">
                                    主营: <strong className="text-gray-300 font-medium">{c.primaryProduct}</strong> | 技术: {c.coreTech}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0 font-mono text-[10px]">
                                <span className={`px-1.5 py-0.5 rounded-sm font-bold ${
                                  c.chainStage.includes("🔴") ? 'bg-red-950/20 text-red-400 border border-red-900/30' :
                                  c.chainStage.includes("🟦") ? 'bg-blue-950/20 text-blue-400 border border-blue-900/30' :
                                  'bg-emerald-950/20 text-emerald-400 border border-emerald-900/30'
                                }`}>
                                  {c.chainStage}
                                </span>
                                <span className="text-cyan-400 font-bold hidden sm:inline">{c.valuation}</span>
                              </div>

                            </div>
                          );
                        })
                      )}
                    </div>

                  </div>

                  {/* 2. Download Execution Terminal (Right Column: Span 1) */}
                  <div className="lg:col-span-1 space-y-6">
                    
                    {/* Dynamic Stats Box */}
                    <div className="bg-[#0b1224] border border-[#20325d] rounded-xl p-5 space-y-5">
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-gray-800 pb-2.5">
                        <Sliders className="w-4 h-4 text-cyan-400" />
                        <span>待决导出数据包摘要</span>
                      </h4>

                      {/* Numeric status */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-400 font-bold">自选选中条数</span>
                          <span className="text-emerald-400 font-black font-mono text-xs bg-emerald-950/30 border border-emerald-905/50 px-2 py-0.5 rounded">
                            {selectedExportIds.length} 项
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-400">总库大盘条数</span>
                          <span className="text-gray-300 font-bold font-mono">
                            {allCompanies.length} 项
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-400">自选项占比率</span>
                          <span className="text-cyan-400 font-bold font-mono">
                            {((selectedExportIds.length / allCompanies.length) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>

                      {/* Action Panel A: Selected Only */}
                      <div className="pt-4 border-t border-gray-900 space-y-3">
                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">
                          模块 A. 导出自选勾选项 ({selectedExportIds.length} 项)
                        </div>
                        
                        <button
                          onClick={() => {
                            const target = allCompanies.filter(c => selectedExportIds.includes(c.id));
                            handleExportCSV(target);
                          }}
                          disabled={selectedExportIds.length === 0}
                          className={`w-full font-bold text-[11px] py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md ${
                            selectedExportIds.length > 0
                              ? 'bg-gradient-to-r from-emerald-600 to-green-700 hover:brightness-110 text-white cursor-pointer shadow-emerald-950/20'
                              : 'bg-gray-900 text-gray-600 border border-gray-800 cursor-not-allowed'
                          }`}
                        >
                          <FileText className="w-4 h-4" />
                          <span>导出选中项目 CSV 格式</span>
                        </button>

                        <button
                          onClick={() => {
                            const target = allCompanies.filter(c => selectedExportIds.includes(c.id));
                            handleExportJSON(target);
                          }}
                          disabled={selectedExportIds.length === 0}
                          className={`w-full font-bold text-[11px] py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md ${
                            selectedExportIds.length > 0
                              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:brightness-110 text-white cursor-pointer shadow-cyan-950/20'
                              : 'bg-gray-900 text-gray-600 border border-gray-800 cursor-not-allowed'
                          }`}
                        >
                          <Cpu className="w-4 h-4" />
                          <span>导出选中项目 JSON 格式</span>
                        </button>
                      </div>

                      {/* Action Panel B: All Database Backup */}
                      <div className="pt-4 border-t border-gray-900 space-y-3">
                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">
                          模块 B. 一键全局整包备份 ({allCompanies.length} 项)
                        </div>

                        <button
                          onClick={() => handleExportCSV(allCompanies)}
                          className="w-full bg-[#111c34] hover:bg-[#1a2b51] text-gray-300 hover:text-white border border-[#233560] font-bold text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
                        >
                          <DownloadCloud className="w-4 h-4 text-emerald-400" />
                          <span>整包备份拉取全谱系 CSV</span>
                        </button>

                        <button
                          onClick={() => handleExportJSON(allCompanies)}
                          className="w-full bg-[#111c34] hover:bg-[#1a2b51] text-gray-300 hover:text-white border border-[#233560] font-bold text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
                        >
                          <DownloadCloud className="w-4 h-4 text-blue-400" />
                          <span>一键备份拉取全谱系 JSON</span>
                        </button>
                      </div>

                    </div>

                    {/* Small intelligence notice */}
                    <div className="p-4 rounded-xl bg-[#091022] border border-[#1d2d50] text-[11px] text-gray-400 leading-relaxed font-sans">
                      <strong>📌 导出提示：</strong> Excel 默认直接打点 CSV 时，可能因语系原因识别不了 UTF-8 编码。本导出程序已自动加置 <strong>UTF-8 BOM (0xEF 0xBB 0xBF)</strong> 特征头，Windows Excel 完美无乱码极速解析。
                    </div>

                  </div>

                </div>

              </div>
            );
          })()}

        </div>
      </div>

      {/* DETAILED ENTERPRISE ANALYSIS SLIDING DRAWER MODAL */}
      <AnimatePresence>
        {selectedCompany && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/65 backdrop-blur-xs" onClick={() => setSelectedCompany(null)} id="details_modal">
            
            {/* Sliding Container Content Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-[500px] h-full bg-[#0a0f1d] border-l border-[#20325d] shadow-2xl overflow-y-auto flex flex-col justify-between p-6 relative font-sans text-xs text-gray-300 select-all"
            >
              
              {/* Close Button top right */}
              <button
                onClick={() => setSelectedCompany(null)}
                className="absolute top-5 right-5 p-1.5 rounded-lg bg-[#111c33] border border-gray-800 text-gray-400 hover:text-white hover:border-[#00f3ff] transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Core Content details */}
              <div className="space-y-6">
                
                {/* Visual Header */}
                <div className="space-y-2 pr-8">
                  <div className="flex flex-wrap items-center gap-1.5 animate-fade-in">
                    <span className="text-[9px] bg-indigo-950 text-indigo-400 border border-indigo-900/60 px-2 py-0.5 rounded font-bold">{selectedCompany.parentCategory}</span>
                    <span className="text-[9px] bg-cyan-950 text-cyan-400 border border-cyan-800/80 px-2 py-0.5 rounded font-mono font-bold uppercase">{selectedCompany.category}</span>
                    <span className="text-[9px] bg-amber-950 text-amber-500 border border-amber-800/80 px-2 py-0.5 rounded font-mono font-bold">{selectedCompany.starRating} 推荐级别</span>
                  </div>
                  
                  <div className="flex items-start justify-between gap-4 mt-1">
                    <div>
                      <h3 className="text-lg font-black text-white leading-tight">{selectedCompany.name}</h3>
                      <p className="text-xs text-gray-500 font-mono italic mt-0.5">{selectedCompany.englishName}</p>
                    </div>
                    
                    <button
                      onClick={() => {
                        if (!currentUser) {
                          alert("如果您需要随时跟踪此高成长企业节点，请在左下角登录 Google 账户进行配置同步。");
                          return;
                        }
                        toggleFavorite(selectedCompany.id, selectedCompany.name);
                      }}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold border transition-all cursor-pointer shrink-0 ${
                        currentUser && favorites.some(f => f.companyId === selectedCompany.id)
                          ? 'bg-yellow-950/40 border-yellow-850/60 text-yellow-405'
                          : 'bg-[#111c33] border-gray-800 text-gray-450 hover:text-white'
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${currentUser && favorites.some(f => f.companyId === selectedCompany.id) ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`} />
                      <span>{currentUser && favorites.some(f => f.companyId === selectedCompany.id) ? "已跟踪" : "跟踪"}</span>
                    </button>
                  </div>
                </div>

                {/* Grid attributes */}
                <div className="grid grid-cols-2 gap-4 bg-[#070b16] p-4 rounded-xl border border-[#172545]/80 font-mono">
                  
                  <div>
                    <span className="text-gray-500 block mb-0.5">供应链层级:</span>
                    <span className="text-white font-bold">{selectedCompany.chainStage}</span>
                  </div>

                  <div>
                    <span className="text-gray-500 block mb-0.5">注册于/地区:</span>
                    <span className="text-white font-bold">{selectedCompany.country} / {selectedCompany.city}</span>
                  </div>

                  <div>
                    <span className="text-gray-500 block mb-0.5">年出货量规划 (2027年):</span>
                    <span className="text-emerald-400 font-black">{selectedCompany.targetOutput2027}</span>
                  </div>

                  <div>
                    <span className="text-gray-500 block mb-0.5">最新融资总级:</span>
                    <span className="text-amber-500 font-bold">{selectedCompany.fundingRound}</span>
                  </div>

                  <div>
                    <span className="text-gray-500 block mb-0.5">预估市值/估值:</span>
                    <span className="text-[#00f3ff] font-extrabold">{selectedCompany.valuation}</span>
                  </div>

                  <div>
                    <span className="text-gray-500 block mb-0.5">主战代号/成立年:</span>
                    <span className="text-white font-medium">{selectedCompany.establishedYear} 年成立</span>
                  </div>

                </div>

                {/* Primary products & Core technology highlights with high premium styled layouts */}
                <div className="space-y-4">
                  
                  <div>
                    <span className="text-gray-400 font-bold block mb-1">💡 代系核主打产品 ▾</span>
                    <p className="text-white font-medium p-3 rounded-lg bg-[#111a2f] border border-[#1b2b4e] leading-relaxed">
                      {selectedCompany.primaryProduct}
                    </p>
                  </div>

                  <div>
                    <span className="text-gray-400 font-bold block mb-1">🧬 核心自研底层技术 ▾</span>
                    <p className="text-white leading-relaxed p-3 bg-[#111a2f] border border-[#1b2b4e] rounded-lg">
                      {selectedCompany.coreTech}
                    </p>
                  </div>

                  <div>
                    <span className="text-gray-400 font-bold block mb-1">🏦 主要创投投资方 ▾</span>
                    <p className="text-gray-300 p-3 bg-[#111a2f]/50 border border-[#1b2b4e]/80 rounded-lg selection:bg-[#00f3ff]">
                      {selectedCompany.investors}
                    </p>
                  </div>

                  {/* Corporate Ecosystem & Supply Chain Topology Map */}
                  <CompanyEcosystemGraph
                    company={selectedCompany}
                    onSearchKeyword={(kw) => {
                      setSearchQuery(kw);
                      // Reset filters so the partner node can be found instantly
                      setFilterCountry('全部');
                      setFilterStage('全部');
                      setFilterRating('全部');
                      setFilterParentCategory('全部');
                      setFilterCategory('全部');
                      // Switch view to the company database tab
                      setActiveTab('company-database');
                      // Also close modal so the user sees the database lists
                      setSelectedCompany(null);
                      // Notify the user of auto filtering
                      alert(`已在【全球机器人主数据库】中为您自动定位关联机构： "${kw}"。请查阅。`);
                    }}
                  />

                  {/* Researcher Note taking area */}
                  {currentUser ? (
                    <div className="p-4 bg-[#0d152a] rounded-xl border border-[#20325d] space-y-2.5 mt-4">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-white flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00f3ff] animate-ping"></span>
                          <span>专属投研备忘笔记</span>
                        </span>
                        <span className="text-gray-500 text-[10px] font-mono uppercase">
                          {existingNoteContent ? "已同步云端 Firestore" : "暂无内容"}
                        </span>
                      </div>
                      <textarea
                        value={noteInput}
                        onChange={(e) => setNoteInput(e.target.value)}
                        placeholder="在此处撰写对该公司的独立研判、竞品调研、核心BOM优势或国产替代替代进度备忘..."
                        className="w-full h-24 bg-[#050812] border border-[#1d2d50] rounded-lg p-2.5 text-xs text-gray-200 placeholder-gray-600 outline-none focus:border-[#00f3ff] font-serif transition-colors resize-none leading-relaxed"
                      />
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-gray-500 font-mono">
                          {notes[selectedCompany.id]?.updatedAt ? `上次同步: ${new Date(notes[selectedCompany.id].updatedAt.seconds * 1000).toLocaleDateString()}` : "Firestore 即时多机分流同步"}
                        </span>
                        <div className="flex gap-2">
                          {existingNoteContent && (
                            <button
                              onClick={() => {
                                if (confirm("确定要永久删除并彻底清空对该公司的这一条研究笔记吗？")) {
                                  deleteNote(selectedCompany.id);
                                  setNoteInput('');
                                }
                              }}
                              className="px-2.5 py-1 rounded-md bg-red-950/40 text-red-400 border border-red-900/40 hover:bg-red-900 hover:text-white text-[10.5px] cursor-pointer transition-all"
                            >
                              清除
                            </button>
                          )}
                          <button
                            onClick={() => {
                              saveNote(selectedCompany.id, selectedCompany.name, noteInput);
                              alert("笔记云端同步完成！已实时同步至谷歌 Firestore 分布式高安全存储节点。");
                            }}
                            className="px-3.5 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:brightness-110 text-black font-extrabold text-[10.5px] rounded-md cursor-pointer transition-all shadow-md shadow-cyan-950/20"
                          >
                            保存备忘
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-gradient-to-r from-[#171a25] to-[#0d111d] rounded-xl border border-yellow-950/30 text-xs text-gray-400 leading-relaxed space-y-2 mt-4 font-sans">
                      <p className="font-bold text-yellow-500 flex items-center gap-1">
                        <span>🔒</span> 研究员专属协同备注板
                      </p>
                      <p className="text-[11px] text-gray-400 leading-relaxed">
                        一键登录 Google 账户后，您可以对任一本体、传感器或算法企业进行 <strong>物理隔离隔离的独立备注</strong>，系统将在云端 Firestore 分片储存。他人无权访问，多终端极速同步！
                      </p>
                      <button
                        onClick={login}
                        className="w-full py-1.8 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-500 hover:brightness-110 text-black font-extrabold text-[11px] cursor-pointer shadow-md shadow-yellow-950/25 border-0"
                      >
                        立即一键开启安全备注 →
                      </button>
                    </div>
                  )}

                </div>

              </div>

              {/* Dynamic simulated action bottom options */}
              <div className="pt-6 border-t border-[#1a2d55]">
                <button
                  onClick={() => {
                    alert(`已将【${selectedCompany.name}】的全系软硬件BOM拆包核算分析导出并生成独立加密备忘录，并推送至张明科技指定业务邮箱。`);
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-[#00f3ff] hover:brightness-110 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all border-0 shadow-lg shadow-cyan-950/40"
                >
                  <Send className="w-4 h-4" />
                  <span>向本司邮箱推送BOM全链分析 📁</span>
                </button>
                <button
                  onClick={() => setSelectedCompany(null)}
                  className="w-full bg-[#111c34] text-gray-400 text-xs py-2 px-4 rounded-xl mt-2 cursor-pointer hover:text-white hover:bg-[#1a294d] transition-all border-0"
                >
                  关闭页面
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DETAILED TECHNICAL DATASHEET SLIDING DRAWER MODAL (技术透析面单) */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/65 backdrop-blur-xs" onClick={() => setSelectedProduct(null)} id="product_modal">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-[500px] h-full bg-[#0a0f1d] border-l border-[#20325d] shadow-2xl overflow-y-auto flex flex-col justify-between p-6 relative font-sans text-xs text-gray-300 select-all"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-5 right-5 p-1.5 rounded-lg bg-[#111c33] border border-gray-800 text-gray-400 hover:text-white hover:border-[#00f3ff] transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6">
                {/* Product Header */}
                <div className="space-y-1.5 pr-8">
                  <div className="flex flex-wrap items-center gap-1.5 animate-fade-in">
                    <span className="text-[9px] bg-pink-950 text-pink-400 border border-pink-900/60 px-2 py-0.5 rounded font-bold font-mono">{selectedProduct.cat}</span>
                    <span className="text-[9px] bg-[#112a45] text-[#00f3ff] border border-cyan-800/80 px-2 py-0.5 rounded font-mono font-bold">首发年份: {selectedProduct.launchYear} 年</span>
                  </div>
                  <h3 className="text-md font-black text-white leading-tight mt-1 flex items-center gap-2">
                    <span className="text-xl">{selectedProduct.icon}</span>
                    <span>{selectedProduct.name}</span>
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-mono">产品编号: {selectedProduct.id}</p>
                </div>

                {/* Core Description */}
                <div className="p-3.5 bg-[#050811] rounded-lg border border-[#172545]/80 text-[11px] leading-relaxed select-text">
                  <span className="text-[#00f3ff] font-bold font-mono block mb-1">📋 软硬件核心技术概述:</span>
                  <p className="text-gray-300 font-mono leading-relaxed">{selectedProduct.description}</p>
                </div>

                {/* Technical specifications */}
                <div className="space-y-2">
                  <span className="text-gray-400 font-bold block mb-1 font-mono text-[11px]">⚙️ 核心物理与技术规格指标 (Specifications):</span>
                  <div className="bg-[#050811] rounded-lg border border-[#172545]/80 overflow-hidden">
                    <table className="w-full text-left border-collapse text-[11px] font-mono">
                      <tbody>
                        <tr className="border-b border-[#172545]/60">
                          <td className="p-2.5 text-gray-500 bg-[#080d1a] w-1/3">物理构型/净重</td>
                          <td className="p-2.5 text-white">{selectedProduct.scale}</td>
                        </tr>
                        <tr className="border-b border-[#172545]/60">
                          <td className="p-2.5 text-gray-500 bg-[#080d1a]">主研/拟购客户群</td>
                          <td className="p-2.5 text-white">{selectedProduct.client}</td>
                        </tr>
                        {Object.entries(selectedProduct.specifications || {}).map(([key, val]) => (
                          <tr key={key} className="border-b border-[#172545]/60 last:border-0">
                            <td className="p-2.5 text-gray-500 bg-[#080d1a]">{key}</td>
                            <td className="p-2.5 text-white">{val}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Upstream BOM dependencies */}
                {selectedProduct.upstreamBOM && selectedProduct.upstreamBOM.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-gray-400 font-bold block mb-1 font-mono text-[11px]">🔗 产业链上游国产核心零部件替代BOM规划:</span>
                    <div className="space-y-2">
                      {selectedProduct.upstreamBOM.map((bom, idx) => (
                        <div key={idx} className="bg-[#0b1426] border border-[#1d2f57] p-3 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono">
                          <div>
                            <span className="text-gray-300 font-bold">{bom.component}</span>
                            <div className="text-gray-550 text-[10px] mt-0.5">主力供应商: <span className="text-pink-400 font-bold">{bom.supplier}</span></div>
                          </div>
                          <div className="bg-emerald-950/40 text-emerald-400 border border-emerald-905/60 font-bold px-2 py-1 rounded text-right text-[10px] self-start sm:self-center font-mono">
                            成本/BOM降负影响: {bom.costImpact}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Signal Diagram Schematics Representation */}
                {selectedProduct.signalDiagram && (
                  <div className="space-y-2">
                    <span className="text-gray-400 font-bold block mb-1 font-mono text-[11px]">⚡ 大脑控制级信号与物理动力传导网络 (Signal Topology):</span>
                    <div className="p-3.5 bg-[#03060c] border border-cyan-950/40 rounded-lg text-[10px] text-[#00f3ff] overflow-x-auto whitespace-pre font-mono leading-relaxed select-text shadow-inner">
                      {selectedProduct.signalDiagram}
                    </div>
                  </div>
                )}

              </div>

              {/* Action buttons footer */}
              <div className="pt-6 border-t border-[#1a2d55] mt-6">
                <button
                  onClick={() => {
                    alert(`已打包【${selectedProduct.name}】的高密技术拆析面单（包含特种国产替换物料流向图与供应链备忘录），并成功向张明投资研究团队的备份邮箱完成推送。`);
                  }}
                  className="w-full bg-gradient-to-r from-pink-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all border-0 shadow-lg shadow-pink-950/40"
                >
                  <Download className="w-4 h-4" />
                  <span>一键导出推送完整物料技术清单 (PDF/BOM) 📥</span>
                </button>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="w-full bg-[#111c34] text-gray-400 text-xs py-2 px-4 rounded-xl mt-2 cursor-pointer hover:text-white hover:bg-[#1a294d] transition-all border-0"
                >
                  关闭明细面单
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notification for Downloads */}
      <AnimatePresence>
        {downloadToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 max-w-md bg-[#0b1224] border border-emerald-500/80 rounded-xl p-4 shadow-[0_0_25px_rgba(16,185,129,0.15)] flex items-start gap-3.5"
          >
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <DownloadCloud className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">🗂️ 结构化分析数据包打包完成</p>
              <p className="text-[11px] text-gray-300 mt-1 leading-relaxed font-sans">{downloadToast}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
