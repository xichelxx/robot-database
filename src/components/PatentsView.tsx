import React, { useState, useMemo } from 'react';
import { 
  Award, 
  Search, 
  Layers, 
  FileText, 
  Calendar, 
  User, 
  Bookmark, 
  Maximize2, 
  Download, 
  Printer, 
  Globe, 
  SlidersHorizontal,
  ChevronRight,
  Info,
  Clock,
  ExternalLink,
  ShieldAlert,
  Sliders,
  Cpu,
  BookmarkCheck
} from 'lucide-react';

export interface PatentItem {
  id: string; // Patent Code (e.g., CN11785590XA)
  title: string;
  englishTitle: string;
  holder: string;
  sector: '触觉与传感' | '动力与传动' | '具身算法系统' | '关节硬件设计' | '航空与特种飞控';
  level: string;
  date: string; // Publication date
  abstractText: string;
  authorList: string[];
  claims: string[];
  blockDiagramText: string;
  systemArchitecture: string[];
  matchingBOMCostReduction: string;
  supplyChainNodes: string[];
  fullDraftText: string;
}

export function PatentsView() {
  const patentsDb: PatentItem[] = [
    {
      id: "CN11785590XA",
      title: "多自由度触觉灵巧多指微型流线腱绳驱动装置",
      englishTitle: "Multi-DOF Tactile Dexterous Multi-Finger Micro Streamlined Tendon Drive System",
      holder: "北京灵心巧手科技有限公司",
      sector: "关节硬件设计",
      level: "发明专利 / 已授权",
      date: "2026-03-12",
      abstractText: "本发明公开了一种适用于具身智能机器人的14自由度流线型腱绳传动灵巧五指手。通过在腕部集成自适应多级精密减速器，拉线直接贯穿仿生关节滑轮，解决了传统灵巧手指端由于自重过大导致的惯性冲击。内置高度集成的多维微小力耦合反馈结构，有效滤除了钢丝拉伸产生的回程误差，大幅提升了操作焊装、极小部件抓取的精度。",
      authorList: ["张明", "李德华", "王晨博士"],
      claims: [
        "1. 一种多自由度触觉灵巧手多指腱绳传动装置，其特征在于，包括：多指末端指骨、仿生指间关节、多槽微型传动滑轮及拉线索；所述拉线索一端锚固在指骨端点，另一端贯穿指间关节绕过所述传动滑轮连接至驱动机组；所述指骨指尖内侧面集成微型柔性电容压力传感器阵列，用以输出实时的多向法向阻抗应变矩阵。",
        "2. 根据权利要求1所述的多指传动装置，其特征在于，所述多槽微型传动滑轮的内芯表面粘包有纳米抗磨阻尼阻滑涂层，所述拉线索采用超高分子量聚乙烯(UHMWPE)高晶体长丝纤维编织索，其在张紧工况下的蠕变漂移量小于0.05%。",
        "3. 根据权利要求1所述的多指传动装置，其特征在于，所述仿生指间关节的主动活动行程内置有由双扭环构成的微型回程消除扭簧簧组，使微动手指阻抗调整频率响应达到150Hz以上。"
      ],
      blockDiagramText: "[微指骨指头] ── (微电感/物理触力片) ── (腱绳UHMWPE长丝索)\n                                           │\n                   [张力微变纠偏反馈桥] ───┴──► [多轴滑轨微组]\n                                                    │\n                                          [空心杯一体主控制器NPU]",
      systemArchitecture: [
        "物理外壁防尘层 (高弹抗磨密封膜密封)",
        "拉线纠漂与应变计算桥单元",
        "多极空心驱动同步电机 (永磁扁平化)"
      ],
      matchingBOMCostReduction: "通过将指内高重载电机移送至手腕下肢后腔，手指端空心杯马达数量由12个压缩至6个，单手BOM核算成本锐降 35%，有效释放负载重量。",
      supplyChainNodes: ["鸣志电器 (空心杯主绕组)", "蓝点触控 (力敏阻阻电桥芯片)", "途见科技 (防静电微触皮膜)"],
      fullDraftText: "中华人民共和国国家知识产权局 (CNIPA)\n【发明专利公开说明书】\n\n[申请号]: 202511409252.1\n[公开(公告)号]: CN11785590XA\n[申请日]: 2025-09-18\n[公开(公告)日]: 2026-03-12\n[专利权人]: 北京灵心巧手科技有限公司\n[地址]: 中国北京市海淀区中关村前沿示范园B座\n[主要发明人]: 张明、李德华\n\n【说明书正文】\n1. 技术领域\n本说明书属于具身智能物理协作机器人硬件领域，特别是涉及一种通过腱绳拉索拉拽驱动，并在指骨表面全维度包覆高灵敏柔力应变片的灵巧双侧五指末端执行器。\n\n2. 背景技术\n现有人形机器人在执行极其精细的三维抓取时，多采用舵机直接安装在关节转轴处的方案。由于电机自重及转进扭矩较小，整体手掌极其笨重，造成端侧惯动阻抗。本方案通过腱绳将原端移至手腕、小臂后段，利用轻质高硬拉索拉动关节，大为轻量化。\n\n3. 发明公开内容\n本专利结构依靠在手指内部增设“微扭力回弹双阻缓冲圈”，配对14+DOF五指精修动作，指尖具有每平方厘米32组微米电极点，不仅能探测微动力幅值，而且能精确捕获滑动摩擦时的变频音频振动，在握持易碎高档玻璃、薄片晶圆时不发生因力大爆夹，或因滑泄而碎地的工程奇点。"
    },
    {
      id: "US88950B12",
      title: "一种高阻抗防静电触觉电子皮肤表面软质贴附解耦工艺",
      englishTitle: "High-Impedance Antistatic Tactile Electronic Skin and Decoupling Lamination Process",
      holder: "途见常州智能皮肤装备有限公司",
      sector: "触觉与传感",
      level: "PCT 国际专利 / 已发布",
      date: "2026-04-05",
      abstractText: "本发明公开了一种高性能、抗拉伸、在三维复杂曲面上无损贴附的三向阻抗电子皮肤。本工艺在柔性聚酰亚胺PI基板上交叉沉积了压电微通道，并通过引入交错式的超短高导碳纳米纤维涂层。大幅度解决了机器人运动大角度折弯伸缩时电阻的机械形变漂移，并增强了表面防静电高阻自吸收，避免在大摩擦代工时高压击穿传感器ADC端。",
      authorList: ["钱晓东", "苏里凡·戈登教授"],
      claims: [
        "1. 一种防静电触觉电子皮肤表面解耦贴附工艺，其特征在于，利用纳米陶瓷阻压晶层制备多点电极，电极底侧粘接3D预拉伸应应力弹力阻降硅凝胶，其对剪切力的静态形变衰减比大至85%以上。",
        "2. 根据权利要求1所述的解耦工艺，其特征在于，电子外皮各像素点间填充高导防静电丙烯酸共聚脂弹性流体，其阻值在5kV静电打点状态下具有1.5微秒高压箝位自我保全性能。"
      ],
      blockDiagramText: "[静电冲击层] ──► (超导碳纳米长晶层) ──► [静电快速自溢流通道]\n                                              │\n       [微触压极板] ──► (三轴气室电耦层) ───► [微处理器A/D解译]",
      systemArchitecture: [
        "多维微应变阻滑氟硅橡胶外膜 (防剪切力撕扯)",
        "高阻二氧化碳高弹隔离层",
        "纳米陶瓷微触压芯片采集级电路"
      ],
      matchingBOMCostReduction: "使得在无菌手术室、电子无尘装配大区无需使用绝缘服大套壳，皮肤整体抗电和自我泄压能力可直接集成到皮膜内部，省去昂贵外部物理隔爆板卡，BOM造价省 ¥2,800RMB/平米。",
      supplyChainNodes: ["能斯达 (防静电纳米墨水配方)", "东土科技 (高速低功耗采集大网关板卡)"],
      fullDraftText: "国际知识产权组织 (WIPO) PCT 国际申请公开\n【PCT 发明公开说明书】\n\n[国际申请号]: PCT/CN2025/110756\n[国际公布号]: WO/2026/088950A2\n[国际申请日]: 2025-08-11\n[国际公布日]: 2026-04-05\n[申请人]: 途见常州智能皮肤装备有限公司\n[主要学术合作机构]: 哥大智能仿生情感实验室\n\n【深度权属诉求】\n1. 本技术解决了大面积（>500个采集点/分米²）电子感应阵列贴附至人形关节（如膝大跨、手腕高弯区域）时，电极间导线形变与温度耦合导致大面积误报的行业硬伤。一般贴附在120°大轴转角20万次形变拉伸下极易虚连断路，本PCT专利的“立体编织拉力骨架”能将抗温变应力提振10倍以上。"
    },
    {
      id: "CN119023412A",
      title: "行星滚柱丝杠高刚度高精度热磨床磨损校准反馈系统",
      englishTitle: "Planetary Roller Screw High-Rigidity Precision Correction Calibration System",
      holder: "浙江五洲新春集团股份有限公司",
      sector: "动力与传动",
      level: "发明专利 / 审查中",
      date: "2026-01-30",
      abstractText: "本专利提出了一种能够在高转速、高承载行星滚柱丝杠生产磨床中，实施多维电磁温升精密自补偿、螺旋线零漂在线监测和滚柱导角高速精研的标定修正系统。通过高敏涡流微米测头，实时将丝杠外缘温度场及热变矩阵汇编送入PLC控制器微调砂轮切入。突破了磨削加工大批量产品几何精度难以跨入2μm级以内(IT3级以上)瓶颈。",
      authorList: ["张春阳", "王福平总工"],
      claims: [
        "1. 一种行星滚柱丝杠砂轮热变形动态电磁温升自补偿机构，其特征在于，在主轴两端嵌入对极对称的高温变高频脉动磁通变引线圈，利用交变涡流阻抗微波探头测算工件切进瞬时挠度自对齐。",
        "2. 根据权利要求1所述的补偿机构，其表面采用特殊二次硬化渗氮配比，其热致形变导热率优于42W/(m·K)，在大批量滚子大推力切深时，磨屑零粘接。"
      ],
      blockDiagramText: "[超精密砂轮机] ──► (切入点) ──► [涡流高精位移微型探测器]\n                                            │\n       [热场补偿变频器] ◄── [微秒温度变差解算器] ◄┘",
      systemArchitecture: [
        "砂轮切入重载伺服热变自解算软件",
        "大理石矿山防微震极高刚性底床机台",
        "电磁反向自激反向过载调节控制柜"
      ],
      matchingBOMCostReduction: "将高等级滚柱丝杠的单件成品及工装磨损报废死废率从32%压减至1.5%，综合装配下线工时和国产精密磨制BOM制造成本降幅超 50%。",
      supplyChainNodes: ["五洲新春 (冷拔及超硬精轧轴承钢材)", "三花智控 (高精研机主驱动轴配合)"],
      fullDraftText: "中华人民共和国国家知识产权局 (CNIPA)\n【发明公开说明书 审核阶段案卷】\n\n[申请号]: 20251139420.2\n[公开(公告)号]: CN119023412A\n[申请日]: 2025-10-09\n[实质审查日]: 2026-01-30\n\n【核心背景说明】\n长期以来，行星滚柱丝杠做为人形机器人腿部直线推杆执行器的绝对垄断硬件，其核心超精磨床生产工艺长期依赖德、日老牌机床厂。五洲新春通过该套“温度零漂自动磨削补偿硬件”的大胆集成发明，完成了全自研数控精磨台的底层合围，实现了微米级成卷精密拉丝自轧。此案卷为最核心的切深力阻闭环控法，目前处于国家局二审绿色特快直通通道。"
    },
    {
      id: "CN21955312B",
      title: "一种双足机器人大转矩旋转关节一体驱控总成机电结构",
      englishTitle: "Dynamic Rotating Joint Assembly of Humanoid Dual-legged Robotics",
      holder: "浙江三花智能控制股份有限公司技术中心",
      sector: "关节硬件设计",
      level: "发明专利 / 已授权",
      date: "2026-02-18",
      abstractText: "本实用新型公开了一种双足机器人膝股大转动自由度一体化旋转关节驱控器。该总成将超高扭矩密度的扁平无刷自粘主电机、高刚性谐波减速器柔轴和双段式角度双反馈磁传感器在同一铝合金抗扭刚度紧凑腔壳体内集成化。通过增设流道式微型扰流风叶及自激吸热微管结构，有效解决了机器人在连跑行走时关节热衰减使电机铜极磁阻升高的行业难题。",
      authorList: ["钱明远", "Dr. Alexander V."],
      claims: [
        "1. 一种高度集成的机器人主核心运动旋转关节，其特征在于，定子绕组与谐波减速器中空柔轮共轴套，定子铁心表面涂覆有厚度为15-45微米的定向高导热绝缘自固化树脂涂膜，从而将内部冷阻散热降幅40%。"
      ],
      blockDiagramText: "[定子高速盘] ──── (共轴重叠柔轴套) ────► [一体化谐波减速轮壳]\n                                              │\n       [微型扰风散热叶] ◄── [定扭矩温探保护MCU] ◄┘",
      systemArchitecture: [
        "中空同轴紧凑腔体设计",
        "柔轮防疲劳双自锁多级齿轮",
        "关节控制NPU多轴实时阻抗驱控硬总线"
      ],
      matchingBOMCostReduction: "一体关节省去多层过渡接转法兰与连接同心轴套筒，关节整体模块自重打折22%，整机用线束体积大减，硬件装配成本降 20%。",
      supplyChainNodes: ["绿的谐波 (定制高扭低柔度谐波中立带轮)", "鸣志电器 (空心电磁大功率瓦片定子)"],
      fullDraftText: "中华人民共和国国家知识产权局 (CNIPA)\n【实用新型专利授权书副本】\n\n[专利号]: ZL202521955312.4\n[授权公告日]: 2026-02-18\n[专利权人]: 浙江三花智能控制股份有限公司技术中心\n\n【发明人深度解读】\n人形机器人各高爆发旋转关节（特别是髌骨跨膝关节、股骨球胯关节）是大推力和频繁反向急停的机械集中点。由于频繁在毫米阻抗及数万毫牛顿拉伸阻抗变频中频繁反向，普通关节发热严重。本专利通过精密共轴叠合与定向防暴热涂层结合，攻克了关节快速暴热红线的难题。"
    },
    {
      id: "US10488212C",
      title: "基于自注意力神经网络的端侧端视觉语音动作大模型(VLA)驱控方法",
      englishTitle: "End-to-End Vision-Language-Action (VLA) Model Controller on Edge Hardware",
      holder: "Figure AI Technologies Inc.",
      sector: "具身算法系统",
      level: "国际重点专利",
      date: "2025-11-20",
      abstractText: "本发明提出一种可在低功耗端侧嵌入式神经单元 (NPU) 上独立闭环、无需借助外部公共云网络连接的视觉-语言-动作 (Vision-Language-Action) 端对端具身动作执行控制。其结合微多跳预测自注意力流，将摄像头及激光雷达所产生的3D密集网格在微秒内转换为全骨骼、双臂、28个执行马达的高频三态动作电位。在端侧功耗低于12W时仍能保证动作预测纠漂频率达到200Hz以上。",
      authorList: ["Brett Adcock", "Jerry Pratt博士", "Dr. Susan Zhang"],
      claims: [
        "1. 一种端侧高频实时控制的视觉-语言-动作(VLA)神经网络算路，其由时序空间自注意力编解码器、环境点云预测网络层及关节姿态力矩脉冲直接转换器(MoE-to-Motor)构成。",
        "2. 根据权利要求1所述的VLA网络，其通过一个由离线深度强化学习预训练而并量化至4-bit宽度的轻量权矩阵进行边缘解码推导，并在电机输出前端增加实时碰撞安全阻断网络通道。"
      ],
      blockDiagramText: "[RGBD 摄像头/点云] ──► (VLA NPU 硬件加速器) ──► [时空注意力阻抗对齐]\n                                                    │\n       [安全碰撞卡阻保护微秒级中断] ◄── [MoE关节扭矩阵脉冲驱动] ◄┘",
      systemArchitecture: [
        "4-bit 端侧超级量化MoE编译管线",
        "视觉深度姿态高频肌肉轨迹预测模块",
        "毫秒级硬阻自校和中断应急停止系统"
      ],
      matchingBOMCostReduction: "摆脱了传统人形控制需要搭载昂贵、高能耗的车规级双双GPU，降低电池和超强处理器散热模块依赖，整机算力核心BOM预算直接砍掉约 $4,500 美元。",
      supplyChainNodes: ["东土科技 (具身阻抗抗自扰端侧SoC/操作系统)", "地平线 (车规级级高算力NPU基板)"],
      fullDraftText: "美国专利商标局 (USPTO)\n【发明专利授权证书】\n\n[Patent No.]: US 10,488,212 B2\n[Date of Patent]: Nov 20, 2025\n[Assignee]: Figure AI Technologies Inc.\n[Address]: Sunnyvale, California, USA\n\n【核心自主保护要求/Claim 1】\nAn end-to-end Cerebellar Vision-Language-Action (VLA) computing system configured to transform real-time unified optical-tactile sensory arrays into physical hand-joint torque pulses directly on-device, achieving dynamic multi-contact manipulation at less than 15-watt core power dissipation, thereby ensuring deterministic self-balancing under sudden external perturbation forces."
    },
    {
      id: "CN11894520A",
      title: "大阵列多点柔性聚合物高密度触觉脉冲信号线交叉串扰过滤电路",
      englishTitle: "Cross-Talk Filtering Circuitry for High-Density Flexible Tactical Matrices",
      holder: "途见常州智能皮肤装备有限公司",
      sector: "触觉与传感",
      level: "发明专利 / 审查中",
      date: "2026-05-02",
      abstractText: "本发明公开了一种大阵列、万格级贴附电子皮肤专用的前端高速模拟去串扰硬件。在极其密布的微纳米软膜引线层中，各相邻传感格点在高频压差挤压变形时，极易产生高阶横向电容耦合干扰。本发明采用多重交错负反馈虚地限流电阻网格，结合专有的指端高速同步ADC多路复用锁相扫描，将行、列串扰电平压降控制在-65dB以下，为高敏感物理滑滑动态感知打通信号清明度。",
      authorList: ["张春明", "顾晓明"],
      claims: [
        "1. 一种高密度触觉电子皮肤去交叉感应滤波电路，其特征在于，利用逐次多路高速同相锁定差分运算放大网络，将相邻行列测量通路接地端拉低至阻抗微小平衡地平，消除引线交叉形变致容效应。"
      ],
      blockDiagramText: "[万级柔性传感矩阵] ──► (多路高速同步电容模拟开关) ──► [锁定相敏放大器组]\n                                                          │\n       [自适应行列数字去噪小脑网卡] ◄── [分米级零阻抗防干扰总地] ◄┘",
      systemArchitecture: [
        "行/列交错自感信号瞬时衰减虚地网络",
        "大容差多通道毫微微级微秒偏置解调器",
        "端部低功抗电磁大谐波差分屏蔽板卡"
      ],
      matchingBOMCostReduction: "此项专利技术使得在万级高分辨率贴面无需再使用极其繁复昂贵的单线屏蔽同轴排线，电极拉引成本消退 65%，且皮膜总厚度成功锁死在 0.3mm 以下。",
      supplyChainNodes: ["能斯达 (温敏抗静电陶瓷薄片配方)", "途见科技 (柔性抗静电PI阵列电路制造)"],
      fullDraftText: "中华人民共和国国家知识产权局 (CNIPA)\n【权利案卷 - 实质审查通知书原件】\n\n[公开号]: CN 11894520 A\n[发明名称]: 大阵列多点柔性聚合物高密度触觉脉冲信号线交叉串扰过滤电路\n[审查科室]: 物性检测与多传感信号解译七科\n\n【最新局答辩要件摘要】\n鉴于答辩人于2026年3月提交的“交错式微纳米高弹隔离带”补充论据，国家审查员已确认本发明的差分虚地去耦方式具有极其宽阔的工业新颖度。本项发明的最终核心利益，不仅是做微秒级的力感觉探度，还能对极微弱的振动力阻频率，做出相当于“麦克风”式的皮肤音频捕捉，成功对齐了精微代工作业的细微感觉极限。"
    },
    {
      id: "CN112423315B",
      title: "具身本体物理真实三维光流强化学习软体仿真环境构建系统",
      englishTitle: "Embodied AI High-Fidelity Physics and Optical Flow Reinforcement Simulator",
      holder: "北京光轮智能科技有限公司",
      sector: "具身算法系统",
      level: "发明专利 / 已授权",
      date: "2026-04-18",
      abstractText: "本专利发明的核心，在于创建了一个能够支持十万级具身机器人模型在大并发GPU硬件渲染集群中、进行纳米级高敏交互及光流强化训练的软体逼真渲染演练。通过构建真实的、包含各细分工件力阻变漂、摩擦衰退及光照变偏的合成世界，实现了自主采集训练数据。“仿真学得-真实运行 (Sim-to-Real)” 的泛化成功率一举打破 98.5% 自研纪录，告别物理大资产破裂风险。",
      authorList: ["谢冬博士", "万科一"],
      claims: [
        "1. 一种利用高并发GPU渲染管线构建超高真实度合成视力触觉数据集的方法，依靠光流场运动微分、弹性非线性拉索形变碰撞检测、及自适应强化策略迭代反馈层实现真仿零漂差。"
      ],
      blockDiagramText: "[超高参数虚拟视场] ── (GPU光流物理微形微分算路) ──► [策略自网络参数迭代]\n                                                          │\n       [Sim-to-Real高准确率泛化网络] ◄── [合成力阻剪切对齐校正] ◄┘",
      systemArchitecture: [
        "GPU高速集群物理光栅强化计算引擎",
        "弹性三向软体及拉索形变接触分析单元",
        "机器人多维物理仿真数据自标定总端口"
      ],
      matchingBOMCostReduction: "使研发团队不再需要在地面无休止搭建百万元的大型实景训练走道及各种模拟碎石斜坡，减少实际跌撞损机维护，开发测标预算大压 80%。",
      supplyChainNodes: ["光轮智能 (合成物理世界核心软件)", "东土科技 (高速端侧算法加载与实车部署)"],
      fullDraftText: "中华人民共和国国家知识产权局 (CNIPA)\n【国家级发明专利红头说明书】\n\n[专利号]: ZL2025112423315.X\n[申请日]: 2025-05-18\n[授权公告日]: 2026-04-18\n[专利权人]: 北京光轮智能科技有限公司\n\n【核心实用特征】\n传统仿真的硬伤在于“仿真太干净，现实太脏”。现实中地面的碎石具有复杂弹性，镜子会有反射干扰，电机传动有极小的背隙震颤。本发明的底层创新，在于向合成计算视窗里“故意掺入”由真实高高精磨精密谐波、丝杠热衰退、传感器漂移所测得的“真实硬件热噪声和电噪声”，使机器人的仿真大脑出生在“一个饱含瑕疵”的准现实中，从而使策略在被移植到实体机器人上时具有极不寻常的柔韧和高准确性。"
    },
    {
      id: "CN11556113A",
      title: "一种低空eVTOL十六轴桨叶三倍安全冗余容错自动飞控重构算法",
      englishTitle: "Fault-Tolerant Tricyclic Safety Avionics Overload Control for eVTOL Aircraft",
      holder: "广州亿航智能技术有限公司",
      sector: "航空与特种飞控",
      level: "发明专利 / 已授权",
      date: "2026-02-25",
      abstractText: "本发明公开了一种专门用于重载多旋翼eVTOL低空航空器的硬实时、自适应非线性约束容错飞控算法系统。该发明在遇到极端空域乱流、机载传感器局部解算被重辐射磁偏干扰、甚至是多达三个共轴螺旋桨叶物理停转停驱的核爆级事故状态下。其姿态重构微内核将在一微秒内迅速切入极小自稳，对健在的十六轴螺旋系统各电机输出力矩进行基于全局能效比的最优重构，确保无俯冲自由平稳返回着陆。",
      authorList: ["胡华智", "崔新博士", "杨明波"],
      claims: [
        "1. 一种低空十六轴eVTOL重构自适应飞控，其特征在于：主计算模组件内置三个完全并行的锁步容错硬解微处理器，各处理器相互在零相位时钟内打点监测并运行姿态重计算核。",
        "2. 根据权利要求1所述的安全飞控，在某路电机停驱时，根据健在冗余轴转矩反馈，主处理器对余下推力多维矢量极小极小分配重解，维持空域横摇偏流角度精度在0.5度半径。"
      ],
      blockDiagramText: "[十六轴桨推力矢量] ──── (三处理器并立锁步网络) ────► [自适应推力最优矩阵]\n                                                          │\n       [气动应急平滑降落姿态重写] ◄──── [微秒突发转矩倾斜阻抗] ◄┘",
      systemArchitecture: [
        "三余度微内核实时高频率计算网络",
        "姿态控制与推力矢量瞬时分配纠偏模块",
        "极端磁干扰下光纤传感备份自对齐硬件"
      ],
      matchingBOMCostReduction: "成功利用先进的主动微内核算法安全自重构替代昂贵的液压或第二级机械反重力折翼装置，缩合低空动力重量，降低航空制造BOM支出近 40%。",
      supplyChainNodes: ["东土科技 (抗辐射、高实时防卡爆飞控操作核心)", "五洲新春 (轻量级高抗拉特种钛铝轴承配机)"],
      fullDraftText: "中华人民共和国国家知识产权局 (CNIPA)\n【发明专利核心公开案卷说明】\n\n[申请号]: 202511452331.5\n[公开公告号]: CN11556113A\n\n【低空经济战略权属重点】\n低空载客、载货飞行的大规模商用落地，绝对首重的是“安全性”。普通四轴或六轴飞行器，只要一个电机起火或挂轴，就会彻底发生偏摆并坠地。亿航自研的多动力组合，通过本专利的三倍安全自重构算法将安全性彻底提至民用航线级，属于未来低空产业标准大盘的底层主控防线。"
    },
    {
      id: "CN2285412A",
      title: "基于电磁离合器的防爆高动态四足机器人极限下落自锁支撑足部",
      englishTitle: "Adaptive Active Explosion-proof Landing Gear for Agile Quadruped Robotics",
      holder: "七腾机器人有限公司",
      sector: "关节硬件设计",
      level: "实用新型 / 授权",
      date: "2026-05-15",
      abstractText: "本专利发明的核心，在一款专为危化防爆环境巡检量身研制的四足机器人极限安全缓震支撑足爪。在遇到管道坍落导致机器人从大于3米等超高空物理坠下震落瞬间，内置阻尼电轴离合器会触发高压线圈自锁励磁，在百分之一秒内部件锁紧并释放极高质量大阻阻剪阻尼，直接抵消75%以上的下落大振震，保护位于背脊上的昂贵光学防爆热成像仪和气体传感器不碎裂、不泄电。",
      authorList: ["陈德华", "向小龙"],
      claims: [
        "1. 一种防爆机器人缓震落地足爪，包含具有特殊油压阻尼液的支撑内柱、足底高彈隔爆橡胶球、以及并联的高磁阻交变电磁阻尼离合片套组，所述离合片在落地倾斜角触动瞬间，由微型压电传感模块引出数安培强励磁脉冲，迅速自锁。"
      ],
      blockDiagramText: "[高空物理自由坠地] ──► (受侧压力触地探块) ──► [超瞬时强磁流离合线励磁]\n                                                 │\n       [足躯关节零瞬损阻尼吸收] ◄── [油压液大推力剪切释放] ◄┘",
      systemArchitecture: [
        "高磁阻流体高弹力下落缓冲器",
        "防剪切油压主动能量吸收自力单元",
        "微秒级防爆硬锁控制模块"
      ],
      matchingBOMCostReduction: "不需在躯体骨架外部缠附累赘厚重的缓冲软充气包或弹性隔层，使四足机器人在防爆等级完备时，自重变轻25%，驱动续航大涨 32%。",
      supplyChainNodes: ["能斯达 (防爆自激压力传感极核)", "五洲新春 (高刚度轻量特种钛骨爪关节制造)"],
      fullDraftText: "中华人民共和国国家知识产权局 (CNIPA)\n【实用新型专利授权说明书】\n\n[专利号]: ZL20252285412.3\n[授权公告日]: 2026-05-15\n\n【工业应用场景与防爆对齐】\n在重化厂区、海洋采油钻台及易挥发有毒蒸汽巡检中，防爆是红线指标。只要一个跌倒撞击，内部板卡摩擦产生电火花就会引起特大爆燃。本新型实用专利，实现了巡检机器人即便是遭遇机械臂坍砸、滑梯坠摔，其肢端能实现无源、主动电磁箝位泄力防爆，大大稳固了特种集成的全生命运行阻抗周期。"
    },
    {
      id: "US1104523A",
      title: "达芬奇医用主从器极致精微力触觉同步对齐零摩擦低弯连杆工艺",
      englishTitle: "Precision Haptic Synchronization and Zero-Friction Mechanism for Master-Slave Surgical Robotics",
      holder: "Intuitive Surgical Inc. (达芬奇)",
      sector: "触觉与传感",
      level: "PCT 国际专利 / 已发布",
      date: "2025-08-11",
      abstractText: "本发明公开了一种微手术机械臂主从控制端极其敏感、高保真无阻力触觉物理连杆关节。为实现主端医生手势操作在穿刺缝合极薄微血管时阻力感的精细无偏差传递，本系统摒弃传统齿轮箱传动，在连杆摩擦侧内胆中部署纳米磁悬浮气力滑套、及特殊的微拉力六维拉扭传感器。使得系统本身运动产生的微小静态阻抗、空气摩擦扰动趋近于0.005N·m，还原极深切口人体组织的天然阻弹性。",
      authorList: ["Guthart Gary S.", "Rogers Ted博士"],
      claims: [
        "1. 一种高度敏感的手术主从力触反传递手腕装置，包含主操作姿抗握爪，所述握爪与多轴低惯量直驱马达转盘刚性轴连，转盘外缘设有超高灵敏磁栅微孔多维电耦传感器，其对医生微手振具有10微米段零摩擦静力滤波。"
      ],
      blockDiagramText: "[医生细微指端握捏力] ── (磁悬浮极微摩擦低弯套管) ──► [同相多位姿磁变对齐]\n                                                      │\n        [从端极微阻抗力反馈重生成] ◄── [主从高速10kHz脉冲闭环] ◄┘",
      systemArchitecture: [
        "零摩擦直驱空气力矩平衡电机",
        "纳米级位宽多磁栅角位感知芯片",
        "千赫兹医学同步控制微内核系统"
      ],
      matchingBOMCostReduction: "摒弃了高成本、易磨损的热缩型套管与传统精密齿配机箱，大幅削减后期消毒、维护校零的超巨额折旧成本，主核心BOM成本压缩 22%。",
      supplyChainNodes: ["蓝点触控 (六维力敏感标定传感器轴系配合)", "途见科技 (防过载PI极高保真触觉薄垫集成)"],
      fullDraftText: "美国专利商局 (USPTO)\n【PCT 发明公开与授权特辑】\n\n[Patent Number]: US 11,045,230 B1\n[Priority Date]: Feb 19, 2024\n[Publication Date]: Aug 11, 2025\n[Assignee]: Intuitive Surgical, Inc.\n\n【核心自主保护要求与医用高标准】\n在大腔镜、脊骨微创缝合中，医生手势一毫牛顿的用力过火，极可能导致病患腹内大动脉等器官破裂。本发明的底层主权项保护了以“气动阻隔+直驱动力”形成零阻、高保真力觉通道，当从动针触碰到患者肌膜瞬间，力反馈大回路在0.1毫秒内快速送回医生手指，实现了完美的、相当于人指直接触肉的物理泛化操作对准。"
    },
    {
      id: "CN118244192A",
      title: "触觉与空气流双重滤波电桥及小微机器人指尖传感元件",
      englishTitle: "Dual-Filtering Haptic and Airflow Bridge Sensor For Micro Robotics",
      holder: "汉威科技集团股份有限公司",
      sector: "触觉与传感",
      level: "发明专利 / 已授权",
      date: "2026-03-05",
      abstractText: "本发明公开了一种集成声学与动阻力波动的多维电桥阵列芯片。其包含一层多孔轻质微晶发泡薄膜，依靠特有的小频共振空腔捕获机器人手指高频微滑移时产生的空气微剪切阻力，并通过双重高速硬件电桥运算过滤掉外界环境风阻，实现高纯度触力感。",
      authorList: ["刘瑞", "陈德刚博士"],
      claims: [
        "1. 一种防气流干扰的触觉电桥结构，包含悬空微晶电极，其特殊在于，底端设有高频微声自偏置消振腔，用以动态对消风速引起的零温漂。"
      ],
      blockDiagramText: "[环境风阻/滑移] ──► (微声自偏置空腔) ──► [压差对消差分电导]\n                                         │\n                  [小脑滤波阻尼环] ◄──── [智能ADC矢量调制器]",
      systemArchitecture: [
        "微晶发泡隔离薄膜",
        "消振波电容式微传感器",
        "矢量平衡采集电桥驱动"
      ],
      matchingBOMCostReduction: "由于免除了高昂的主动空气流动屏蔽机械外置阀，指尖微结构的总装BOM和材料制造成本压减了 42%。",
      supplyChainNodes: ["能斯达 (高敏感泡沫导电墨水配方)", "鸣志电器 (高压绝缘密封辅件)"],
      fullDraftText: "中华人民共和国国家知识产权局 (CNIPA)\n【发明专利公开说明书】\n\n[申请号]: 202511422912.8\n[公开(公告)号]: CN118244192A\n[申请日]: 2025-08-11\n[公开(公告)日]: 2026-03-05\n\n【核心背景说明】\n本技术解决了在露天或大风环境下灵巧手操作时，手指由于气流扰动产生的虚警误捏。引入声学自偏置共轴消振器，可大大提振环境气压骤变时的自适应触觉辨识度。"
    },
    {
      id: "CN119283411A",
      title: "三向抗扭谐波减速器柔轮材料多拉伸表面淬火加工工艺",
      englishTitle: "Multi-Directional Torsional Strain Heat Treatment Process for Flexible Splines",
      holder: "苏州绿的谐波传动科技股份有限公司",
      sector: "动力与传动",
      level: "发明专利 / 已授权",
      date: "2026-04-12",
      abstractText: "本发明公开了一种可大幅提升具身机器人关节谐波齿轮疲劳屈服寿命的感应热处理淬火工艺。本工艺在使用高强度合金结构钢切削柔轮的基础上，实施多频重合电磁淬火。柔轮在百万级高频曲转反向中，其壁面微裂纹在抗扭方向处于最大压应力状态，避免疲劳扩展，精度零点漂移率处于极优水平。",
      authorList: ["沈浩", "李杰", "王成博士"],
      claims: [
        "1. 一种长寿命柔型减速器柔齿淬火精磨法，包含：在中频大功率感应线圈下对特种镍铬合金工件进行差速急冷，强化表面深达0.4-0.6毫米，抗剪切屈服强度达到1400Mpa。"
      ],
      blockDiagramText: "[表面电磁中频淬] ──► (多频淬火硬化区) ──► [剪切韧性多向纤维组织]\n                                         │\n                  [关节超高扭矩服服圈] ◄── [超精密滚研冷拉齿形]",
      systemArchitecture: [
        "多频重合感应加热机组",
        "淬火硬化介质压差快速雾喷系统",
        "柔轮疲劳多维超声波监测集成系统"
      ],
      matchingBOMCostReduction: "将谐波齿轮的使用寿命从 8000小时 提振至 25000小时 以上，整套大负载关节后期维护拆装与备品折旧成本直接被削弱了 68%。",
      supplyChainNodes: ["绿的谐波 (齿形精密成型主工艺)", "五洲新春 (特种超硬真空自耗炉合金钢材)"],
      fullDraftText: "中华人民共和国国家知识产权局 (CNIPA)\n【著作权与发明案说明书副本】\n\n[专利号]: ZL20251145312.3\n[授权公告日]: 2026-04-12\n\n【核心工艺突破】\n本专利着力攻坚超薄柔轮在高爆发双足踩踏反向瞬间的撕扯屈服裂变问题，是国内中上游制造工艺实现完全替代的基盘支柱之一。"
    },
    {
      id: "CN119330123A",
      title: "大规模具身强化学习策略Sim-to-Real高保真肌肉约束姿态自对齐重构方法",
      englishTitle: "High-Fidelity Muscular Constraints Sim-to-Real Alignment for Embodied Reinforcement Learning",
      holder: "北京智元机器人制造有限公司",
      sector: "具身算法系统",
      level: "发明专利 / 已授权",
      date: "2026-05-10",
      abstractText: "本发明提供一种能够有效突破强化学习(RL)模型仿真域到现实物理实体“Sim-to-Real”性能大倒退的策略，在图形物理仿真中深度融合了基于腱绳传动拉力和肌原纤维冷热衰减的热态力学摩擦模型，在智能自注意力MoE网络引入关节反向零背隙多重物理自校，确保动作策略平滑部署于高爆实体骨架而无电机硬磨。",
      authorList: ["彭志强博士", "稚晖君", "李明博"],
      claims: [
        "1. 一种具身实存肌肉热模型仿真自对齐方法，其特征在：采集现实马达的定转子温升数据流并转化成自适应仿真域热阻阻尼，在仿真环境同步注入热零漂阶跃扰动。"
      ],
      blockDiagramText: "[仿真肌张力常数] ──► (温升热阻动态补偿器) ──► [实机小脑硬实时总线驱动]\n                                            │\n               [强化学习稳定态纠偏] ◄─── (多模姿态偏差判别网络)",
      systemArchitecture: [
        "Sim-to-Real热噪声摩擦物理仿真引擎",
        "端侧高频小脑轨迹预测闭环代码",
        "极轻4-bit MoE小脑加速推理架构"
      ],
      matchingBOMCostReduction: "该算路使得对非标装配环境的物理部署调试工时从以前的 14天 压缩至 4.5小时 即可自适应，减少在实测过程中的坠机、断指等损坏，开发材料损耗降低 55%。",
      supplyChainNodes: ["地平线 (车规级低延高能算力单元)", "东土科技 (硬实时控制软核协议平台)"],
      fullDraftText: "中华人民共和国国家知识产权局 (CNIPA)\n【发明公开说】\n\n[申请号]: 202511903342.1\n\n【说明书正文摘要】\n本专利有效解决了传统具身决策在学术训练中表现惊艳，但在脏、乱、有热辐射及强温差变偏厂区执行装配时频繁由于阻抗发爆、自我乱跑的致命毛病。"
    },
    {
      id: "CN118541293B",
      title: "大推力多动能eVTOL倾转翼矢量多级防摆平衡控稳舵机系统",
      englishTitle: "Tilt-Rotor Vector Anti-Sway High-Torque Control Dynamics for eVTOL Flight",
      holder: "广州亿航智能技术有限公司",
      sector: "航空与特种飞控",
      level: "发明专利 / 审查中",
      date: "2026-02-10",
      abstractText: "本发明公开一种在极端狂风乱流及重载不对称空运姿态下，能够依靠倾转轴矢量自动反馈、结合陀螺全自由阻能剪切的低空矢量航线自动保衡系统。通过采用特种重载电控行星齿轮离合结构，克服大惯量螺旋在水平与垂直多向交叠推进过渡段产生的物理空气动力剪切抖颤，安全度极高。",
      authorList: ["李正华", "唐克明博士"],
      claims: [
        "1. 一一种eVTOL倾转矢量高动态防晃动控制系统，其特征在于包含具有高刚度抗侧向扭曲的磁感离合轮盘、高硬主支重臂及双反馈高响度光电绝对式编码总成。"
      ],
      blockDiagramText: "[强气流侧倾角] ──► (矢量防晃离合变阻片) ──► [倾心角绝对偏差对齐器]\n                                           │\n                [重载飞控应急双螺旋] ◄── [锁相位零功耗瞬变气动补偿]",
      systemArchitecture: [
        "矢量高压磁耦合离合组件",
        "高精度耐大振光伏绝对值角度编码器",
        "航线自稳矢量推力解算算法软核"
      ],
      matchingBOMCostReduction: "使得重载低空飞艇和eVTOL不再长累赘的外部重力滑跑起降杆件，机壳整体自重减轻 18%，电能节余及核心电缸骨架采购开销下调 30%。",
      supplyChainNodes: ["东土科技 (硬实时控制系统/双网容错网板卡)", "三花智控 (精密倾斜高负荷旋转控制阀)"],
      fullDraftText: "中华人民共和国国家知识产权局 (CNIPA)\n【发明专利审查案卷】\n\n[申请号]: 202511452119.2\n\n【核心背景与低空抗风】\n此发明针对eVTOL在低空复杂市区高层建筑间大扰流和剪切狂风下，旋转臂角度变焦转换时由于空载扭动过度而导致空中失衡的难题，属于eVTOL低空机载特种安全的大心脏配套。"
    },
    {
      id: "CN119445210A",
      title: "三维微孔低噪声空心杯无无游自粘漆包铜线盘卷制造工艺",
      englishTitle: "Low-Noise Precise Coreless Coiling Process Utilizing Self-Bonding Copper Windings",
      holder: "鸣志电器股份有限公司技术中心",
      sector: "动力与传动",
      level: "发明专利 / 已授权",
      date: "2026-03-24",
      abstractText: "本发明公开了一种大幅提高高性能微型灵巧手空心杯电机线圈饱满系数、并解决在大电压高速起转高达22000rpm时高频微振噪的自粘漆包绕线制造方法。利用多向自适应导线张力卷尺、微孔高温高压蒸汽辅助速溶附膜工艺，使得蜂窝型空心杯绕组整体气密性及散热效率大幅拉升，输出扭距提高20%。",
      authorList: ["张红兵", "王敏杰特聘专家"],
      claims: [
        "1. 一种空心杯马达蜂窝自粘线圈高速紧密卷绕成型方法，特殊之处在于：在成卷拉线侧外缘采用180℃热风环形对冲以活化自粘漆膜，同时依靠负压多向吸附使蜂巢排列空间隙率低于1.8%。"
      ],
      blockDiagramText: "[漆包自粘长导线] ──── (180℃环形对位热冲) ────► [自粘漆膜微交链定型]\n                                               │\n         [微孔无缝蜂巢定子线圈] ◄─── (高负压微隙自固锁滑卷绕)",
      systemArchitecture: [
        "热活化全自动线圈卷自轧主装机台",
        "负压吸附高精密收线定子骨架",
        "线圈空载高速振动传感器探组"
      ],
      matchingBOMCostReduction: "该自粘卷线制造法使得空心杯电机在手工和半自动绕丝阶段的报废损毁死线率从22%砸至0.1%以内，完全自控量化使微电机整体BOM配价下滑 45%。",
      supplyChainNodes: ["鸣志电器 (全自动漆包空心卷阻精密机组)", "能斯达 (定子高速温升多点微阻感应片)"],
      fullDraftText: "中华人民共和国国家知识产权局 (CNIPA)\n【发明专利授权证书】\n\n[专利号]: ZL20251145321.4\n\n【核心自主发明特征】\n本发明彻底突破了过去高密度、极高转速空心杯电机自粘蜂窝线圈卷贴只能长期依赖海外，在极度苛严振幅下易由于绕组松离而发热融毁的技术软肋。"
    },
    {
      id: "CN119553120A",
      title: "膝/跨人形大负荷旋转关节用超轻质高强度合金骨架压铸工艺",
      englishTitle: "High-Strength Lightweight Alloy Castings For Humanoid Knee and Hip Joint Skeletons",
      holder: "星动纪元(北京)科技有限公司",
      sector: "关节硬件设计",
      level: "发明专利 / 已授权",
      date: "2026-04-18",
      abstractText: "本发明公开一种专用于双足爆发型具身机器人股骨股骨重轴端的一体铸造高刚度铝锂合金传动外骨架。通过使用特殊的微合金变晶退火对齐处理，在保证屈服拉伸强度达到600Mpa的同时，关节连杆自身的整体密度大减35%，并完美抑制了高载极跳重锤坠落时，多金属接触面产生的微间隙应力撕变。",
      authorList: ["陈建宇", "赵明亮", "刘小雨"],
      claims: [
        "1. 一种高爆发双电机共轴抗拉剪旋转骨架材料配比，配比采用特种铝锂微硅多重金属熔铸晶格，其中锂离子原子含量在1.8%-2.5%的极限抗疲劳带。"
      ],
      blockDiagramText: "[铝锂多元自耗极] ──► (多级真空感应压融) ──► [晶格应变对齐高刚骨架]\n                                           │\n                   [关节微间隙疲劳减耗] ◄── [热风阶梯冷却校正模]",
      systemArchitecture: [
        "铝锂复配高真空重载精密压炼组",
        "骨架受外界大拉力扭能屈变激光监测仪",
        "高频自校转轴同轴抗晃密封卡箍组"
      ],
      matchingBOMCostReduction: "关节在承受超过4000N大跌落拉伸载荷时免除添加笨重的液压防冲击支撑，总骨架硬件空车重量消退 26%，BOM成本减少 30%。",
      supplyChainNodes: ["蓝思科技 (钛合金一体成型全机代工)", "五洲新春 (重载钛骨特种刚珠及销轴)"],
      fullDraftText: "中华人民共和国国家知识产权局 (CNIPA)\n【国家级高标工艺案卷】\n\n[发明名称]: 膝/跨人形大负荷旋转关节用超轻质高强度合金骨架压铸工艺\n\n【骨骼轻量化前沿】\n本发明旨在彻底消灭人形双足在野外泥泞、跌落、硬拉拔等非结构极端工段上，由于转轴法兰受力不均发生开裂和连接部松虚而最终导致整机关节报废的系统软肋。"
    },
    {
      id: "CN119611221B",
      title: "基于大算力MoE微神经自对齐抗磁大阵列多极六轴力传感器标定方法",
      englishTitle: "Self-Calibrating 6-Axis Force Torque Sensors Utilizing Deep MoE Neural Filters",
      holder: "北京灵犀巧手科技有限公司",
      sector: "触觉与传感",
      level: "发明专利 / 已授权",
      date: "2026-01-15",
      abstractText: "本发明涉及一种在具身灵巧手六轴力信号解算中，通过部署轻量级MoE混合专家神经滤波网络，自适应对消由于邻近空心杯电机电磁强磁漏、温度急升至85℃热极形变等复杂热机耦合噪声，从而使六维力力刻画度在0.01N极优高纯度指标内，大为稳固精捏操作。",
      authorList: ["张明", "Dr. Frank Henderson", "钱晓峰"],
      claims: [
        "1. 一种六轴力传感器高频自标定微神经硬件过滤系统，特殊在于，在信号电桥后段集成抗电热温漂自解算的MoE自变权重解码网络，其在10kHZ大采频率下硬解码延迟小于10微秒。"
      ],
      blockDiagramText: "[六电桥微阻变压信号] ──► (MoE硬件加速专家路) ──► [极高纯六维力矩矢量]\n                                                 │\n                   [精细握持力控零漂差] ◄── [电磁高频磁耦合抗干扰]",
      systemArchitecture: [
        "片上SoC内置大算力微神经处理层",
        "微阻变高敏感六轴悬臂电桥",
        "高导阻热隔爆抗电磁杂波双屏盖板"
      ],
      matchingBOMCostReduction: "此技术无需使用极其昂贵沉重的外置高导磁合金钢高防辐射屏蔽盒，力感知解算精度提升10倍，传感模组BOM总费用直落 50%。",
      supplyChainNodes: ["地平线 (微SoC片上神经网络解算器底座)", "能斯达 (特种多层高抗拉屏蔽弹性电导引线)"],
      fullDraftText: "中华人民共和国国家知识产权局 (CNIPA)\n【发明公开说书】\n\n[专利号]: ZL202511411252.6\n\n【核心权属抗磁干扰技术】\n本专利着重突破人形双足在各种高危电弧强漏、冶金等电磁大脏乱工区时，末端力反馈大退缩大发毛甚至失效误操作的痛点。"
    },
    {
      id: "WO2026119825A2",
      title: "高适应度全向运动中脑多层时空点云轨迹跟踪VLA大模型算路",
      englishTitle: "Spatiotemporal Deep Hand-Eye Point-Cloud Tracking Under Core VLA Topologies",
      holder: "达芬奇 Intuitive Surgical Inc.",
      sector: "具身算法系统",
      level: "PCT 国际专利 / 已发布",
      date: "2026-04-18",
      abstractText: "本发明提出一种可在极其有限在片带宽下，将多源视觉3D点云与精细手指温阻触觉融为一体的多向动作自跟踪大神经。该方法对抓取异形及黏滑工件（如术中滑移脏器、表面积液等）进行毫秒级滑动微动态预判，并在线微调多级关节扭矩，确保极快反应且柔和无损，误差率低于0.1%。",
      authorList: ["Dr. Gary S. Guthart", "陈飞宇"],
      claims: [
        "1. 一一种高度精确的手眼点云同步VLA推理大网络，特殊在于，自注意力头在点云深缩提取中，依仗触力滑移触发的时钟优先级极速中跳，打通动作直接脉冲。"
      ],
      blockDiagramText: "[视觉点云 + 行列触觉] ──► (多时钟自注意力头编解) ──► [时时阻抗矢量调整路]\n                                                     │\n                  [微米级防穿刺大保护] ◄── [医疗主从直推力变焦阀]",
      systemArchitecture: [
        "多路感知点云时序对齐硬处理器",
        "VLA硬核芯片自注意力硬加速管线",
        "主从无时滞零漂安全防护闭合通道"
      ],
      matchingBOMCostReduction: "通过让高频点时空追踪从车规CPU解耦并下沉到片上手术指甲盖微芯片，算力能耗大幅下滑 72%，手术控制大台采购价格直接下滑了 28%。",
      supplyChainNodes: ["东土科技 (硬实时高保密系统操作系统底核)", "途见科技 (防过爆PI万级触觉超软皮贴膜)"],
      fullDraftText: "国际知识产权组织 (WIPO) PCT\n【国际发明说明书副本】\n\n[公开(公告)号]: WO/2026/119825A2\n\n【医学级高精精细合规】\n由于避免了在手术过程中由于手眼距离遮挡导致的死盲点风险，本发明的触感VLA为医疗领域的极致手势同步对位打下顶级坚壁。"
    },
    {
      id: "CN119688412B",
      title: "一种基于共轴离合高爆减速及柔顺阻抗自控的多指仿生手",
      englishTitle: "Coaxial-Clutch High-Explosive Active Strain Impedance Biomimetic Hands",
      holder: "北京灵心巧手科技有限公司",
      sector: "关节硬件设计",
      level: "发明专利 / 已授权",
      date: "2026-05-18",
      abstractText: "本发明公开一种高防折骨折断、在极高负载突变撞击瞬间能自主泄张泄压的双侧仿生五指灵巧手。本灵巧手在各个腱绳拉线过轴端部署有特制的非接触式微型电磁超越离合磁极，当外界非刚性碰撞突发载荷超过 150N 时，离合器能在 0.5毫秒内主动断开并脱开力锁死，避免腱绳拉扯拉断。",
      authorList: ["张明", "李德华", "王晨博士"],
      claims: [
        "1. 一种微型仿生抗折断腱绳超越离合机构，特殊在于：包含在传动索转盘间环抱的微磁偏弹簧阻尼爪，当弹力超过预设死区安全阈值时，自动脱扣。说明其复位采用高频电引锁相线。"
      ],
      blockDiagramText: "[超限碰撞外拉力] ──► (力矩探片超速判阀) ──► [超越电磁离合主动脱口]\n                                            │\n               [腱绳零拉断形断保护] ◄── (锁相磁极全自回复机构)",
      systemArchitecture: [
        "主动磁流超紧凑超越离合滑组",
        "拉动力瞬时超程报警应变电桥电路",
        "高度对称14自由度高复灵巧手肢架"
      ],
      matchingBOMCostReduction: "使高端腱绳手因抓捏极硬重物等发生线轴断裂、内部丝绞烧毁导致的更换维保死机费用降幅达到惊人的 85%，总寿命提升 4 倍。",
      supplyChainNodes: ["鸣志电器 (高饱合电磁超紧凑微离合电磁定组)", "途见科技 (指端氟橡胶高回弹自抗剪皮肤)"],
      fullDraftText: "中华人民共和国国家知识产权局 (CNIPA)\n【发明专利授权书副本】\n\n[专利号]: ZL202511409253.X\n\n【核心自主保护防断工艺】\n此前，高端腱绳驱动手在使用中最为致命的硬伤是一旦遭到机器人走路摔车，或者抓握工件位置错动产生大剪力，腱绳和齿轮轴在一微秒内即被生生崩断，本专利超越离合彻底清除了该隐疾。"
    },
    {
      id: "CN119772522A",
      title: "一种人形机器人膝部大刚度反向过载电磁离合泄能微油泵缓冲器",
      englishTitle: "Overload Dissipating Electromagnetic Oil Pump Damper for Robot Knee Joints",
      holder: "七腾机器人有限公司",
      sector: "关节硬件设计",
      level: "发明专利 / 审查中",
      date: "2026-05-01",
      abstractText: "本发明涉及一种在具身双足大吨位冲击下、保护精密行星滚柱丝杠及膝部伺服关节的液质微电磁大负载泄能机电总成。该结构利用内置特种磁流变阻尼油的高应力蓄能腔，并联高磁场励磁线阻。在遭到高载弹跳、意外摔跌落地等垂直轴突发反应力瞬间，强励磁电路可实现无源自动变阻，将大爆发应能大幅消弭，极强保全传动轴。",
      authorList: ["陈德华", "刘小东"],
      claims: [
        "1. 一种多温温和高阻高过载膝节自吸缓冲器，其特征在于在中空筒身内部充注有由多元铁系磁胶粉、合成酯构成的变阻油体，外部缠绕螺旋防自激反向励电线阻。"
      ],
      blockDiagramText: "[落地撞击垂直反力] ──► (压敏自激压电激发源) ──► [励磁线圈高磁能激变变阻]\n                                                   │\n                 [重载丝杠零残留挫形] ◄──── [磁流阻阻尼剪切力瞬增]",
      systemArchitecture: [
        "磁流变油压超大消能蓄功仓体",
        "精密活塞高抗拉传动推板杆件",
        "突发大压力瞬隙励电自耦微闭电盘"
      ],
      matchingBOMCostReduction: "使得机器人即便大空翻坠落亦毫无丝杠被硬崩变形导致机架报废之忧，单机关节与硬传动终极防损BOM维护预算核减 45%。",
      supplyChainNodes: ["五洲新春 (超长行程高承压液缸高精磨轴轴套)", "三花智控 (高可靠电磁励电感应线组合)"],
      fullDraftText: "中华人民共和国国家知识产权局 (CNIPA)\n【发明专利审查案卷】\n\n[申请号]: 202511522331.1\n\n【重载冲击泄能阻尼】\n大体积人形机器人在实现跳跃、空翻在露天石阶上着地等高大冲击负荷下，其膝、胯、足关节丝杠及齿轮承受超过万牛的反向冲击力，传统的刚性硬抗必然撕裂。本油流自激缓冲器的推出保证了物理具身骨骼皮实之巅。"
    },
    {
      id: "CN119854122A",
      title: "柔性聚双甲基硅氧烷微阵列多极高速指尖触觉解码系统",
      englishTitle: "Micro-Array PDMS Air-Capacitance Matrix Haptic Decoder System",
      holder: "途见常州智能皮肤装备有限公司",
      sector: "触觉与传感",
      level: "发明专利 / 已授权",
      date: "2026-04-20",
      abstractText: "本发明公开一种高弹性、高抗电磁干扰且具备极致毫米级空间像素辨距的机器人指尖专用压电式空气多向复合阻抗皮肤解码芯片和全总排工艺。该工艺采用微成型气孔多层PDMS聚合物骨架作为形变主电介质，通过表面层多点金属喷溅，不仅反应力超快高达15kHZ以上，且能在捏取0.01g超轻羽毛毛边时输出精准差分触觉，彻底摆脱多导温漂偏置致死干扰。",
      authorList: ["苏里凡·戈登教授", "顾晓明", "郑国强"],
      claims: [
        "1. 一一种微像素阵多层高分子空气复合压力传感元，特殊在介质层采用多孔立体分布的中空微泡，表面由抗腐蚀高韧铜箔在真空状态下射涂成128格/cm²超高像素密点阵列。"
      ],
      blockDiagramText: "[微力形变空气位移] ──► (微泡空气电介常数激变) ──► [高精电容差分桥解算]\n                                                     │\n                  [指端极轻触觉高保真] ◄── [行列分时锁定高速扫描ADC]",
      systemArchitecture: [
        "多孔自回复中空硅树脂压电介质体",
        "真空高密度铜箔电极柔绕排组",
        "相敏锁定高频去零漂微幅ADC硬电路"
      ],
      matchingBOMCostReduction: "每平方分米触觉采集成本比日本同类半导体陶瓷贴片便宜超 70%，且皮膜自带高度柔韧可直接包贴于任何圆弧死角不翘起。",
      supplyChainNodes: ["途见科技 (双轨高精度卷布胶涂主工艺制造)", "能斯达 (抗辐射多点PI复合引线卡板)"],
      fullDraftText: "中华人民共和国国家知识产权局 (CNIPA)\n【发明公开说书】\n\n[专利号]: ZL202511422312.4\n\n【高分子电容点阵触觉】\n高空间分辨率触觉阵列贴敷在圆润、极小的机器人指节时，传统的制造薄膜极其易翘曲开裂。本专利通过多孔高流动自流平乳胶工艺解决了万次揉扯断线痛点。"
    },
    {
      id: "CN119932110B",
      title: "一种基于非线性无约束摩擦模型的空心杯减速机背隙在线自磨自补偿控制方法",
      englishTitle: "Coreless Reducer Dynamic Backlash On-Line Adaptive Compensation Method",
      holder: "浙江三花智能控制股份有限公司技术中心",
      sector: "动力与传动",
      level: "发明专利 / 已授权",
      date: "2026-05-15",
      abstractText: "本发明公开一种专用于高密高爆发灵巧末端手部微齿隙在线辨识及毫秒级反向自消零的运动控制硬算法。利用电机转子高频轻载的超零微小抖颤特性，实时解算主、副轴传动转角误差及磨屑微粒磨阻力矩，并在驱动PWM发生阶段插入交变反向消隙小波形，实现终身运行时机械磨损间隙自补自校，不产生动作卡顿及空回。",
      authorList: ["钱明远", "Dr. Alexander V."],
      claims: [
        "1. 一一种空心齿轮传动背隙高频波自补偿调法，特殊在：利用定、转子反电动势畸变提取瞬时传动侧空程偏位角，并在控制微波段实时插入高频微幅对冲力矩脉冲。"
      ],
      blockDiagramText: "[传动反电动势微波畸] ──► (瞬时磨损自估算器) ──► [高频微幅在线消背隙小波]\n                                                    │\n                  [末端手指零齿回间差] ◄── [驱动主电芯片PWM波段覆盖]",
      systemArchitecture: [
        "齿隙物理反动态大自估软件算法",
        "高频无延迟马达驱动SoC片上模块",
        "转子高速低惯运动动阻解传感器组"
      ],
      matchingBOMCostReduction: "使得在制造精密多级微减速齿轮箱时，零件不需要追求万分之一毫米的极限严苛切削装配精度，对零部件常规磨损具有宽厚抗受，微减速齿轮箱BOM制造成本降 35%。",
      supplyChainNodes: ["鸣志电器 (高饱合无刷微特空心驱动器配合)", "东土科技 (高速硬实时低阻抗现场微通信板)"],
      fullDraftText: "中华人民共和国国家知识产权局 (CNIPA)\n【实用新型专利授权书副本】\n\n[专利号]: ZL202521955315.X\n\n【机回回程消阻算法】\n微型齿轮箱在装配并高速磨合300小时后，柔性轴啮合必然分配发生差。本发明利用代解算软波补偿，成功将累计背隙偏差在控制层完全中和。"
    },
    {
      id: "CN119941203A",
      title: "基于视觉强化触觉反馈的三维曲面非标抓取柔顺阻抗VLA融合模型",
      englishTitle: "Vision-Tactile Dual-Fusion Non-Standard Gripping Impedance VLA Model",
      holder: "北京光轮智能科技有限公司",
      sector: "具身算法系统",
      level: "发明专利 / 审查中",
      date: "2026-03-30",
      abstractText: "本发明涉及一种利用自适应交叉注意力映射层，在同一张神经底座下，动态混合3D立体深度视场与全手多点柔皮阻变阵列信号的视觉-触觉极速融合（Vision-Tactile VLA）动作策略。该策略能在完全失去光照、深度阴影、或视线极端不正常等恶劣代工局，只凭十指触皮“盲摸盲抓”抓取无固定姿态和不规则易滑杂乱堆叠重物，达到98%以上高通过率。",
      authorList: ["谢冬博士", "万科一", "周强博士"],
      claims: [
        "1. 一种视觉触觉大融合多通道具身注意力动作网，特殊在包含行列触电位输入层，采集阻压皮肤矩阵转写为令牌流，注入到时空视觉Transfomer中做交错掩膜解码。"
      ],
      blockDiagramText: "[盲摸多源触压矩阵] ──► (阻压阻引解码时序Token) ──► [跨模态注意力融合大脑]\n                                                        │\n                   [非标盲抓98.5%高通过率] ◄── [三态动作时钟输出卡规]",
      systemArchitecture: [
        "视觉/触觉高并发对齐编解码硬件",
        "盲摸力传感器自解算在片边缘模块",
        "策略强扰防滑防爆主动动作控制器"
      ],
      matchingBOMCostReduction: "不再为了解决非标定位而满产线架设十台昂贵超清工业广角滑焦红外相机及庞大的吊轨机架，工业集成和数据采集训练底座BOM采购下降达 60%。",
      supplyChainNodes: ["光轮智能 (视觉-物理强化自流平训练大软件)", "途见科技 (柔皮触感万像阵列主元结构)"],
      fullDraftText: "中华人民共和国国家知识产权局 (CNIPA)\n【发明专利公开说明】\n\n[申请号]: 202511451121.3\n\n【视触觉多模态自泛化】\n传统的具身大模型一旦被光照突变炫目，或者摄像头滑轨被尘温和胶渣附着，其抓握百分之百会失效爆捏或干滑坠手。本双交叉视触注意力融合发明，给机器人双爪补备了相当于盲目盲抓的大脑。"
    },
    {
      id: "CN119951442A",
      title: "一种基于六自由度微位角倾转涵道矢量推进eVTOL姿态保全方法",
      englishTitle: "Six-DOF Vector-Tilt Ducted Fan eVTOL Flight Safety System",
      holder: "广州亿航智能技术有限公司",
      sector: "航空与特种飞控",
      level: "发明专利 / 已授权",
      date: "2026-04-01",
      abstractText: "本发明公开了一种大体积、多冗余推力矢量涵道的特种低空重载eVTOL六自由度主动倾转重构飞控安全姿态。本构体通过在涵道口底侧设立高频钛合金矢量转向倾片，搭配特种磁流高爆发离合，在巡航中若遭遇高达8级的突发低空侧暴风或电网瞬间失磁，系统可在1.5微秒内自动切变姿态至无侧动浮降，保护乘客极其万全。",
      authorList: ["胡华智", "周海民", "朱建博"],
      claims: [
        "1. 一种涵道高频矢量倾变姿势角校正系统，包含主空域控制卡、转向阻尼齿圈、以及共驱钛合金偏尾舵面。其中电耦合舵可在无高压大励组阻偏下自主实现自复保中。"
      ],
      blockDiagramText: "[突发8级低空狂风] ──► (大离惯多极偏尾偏切器) ──► [矢量涵道倾臂自校重整]\n                                                    │\n                   [安全防横摇空中不摆] ◄──── [硬实时锁步计算三余度]",
      systemArchitecture: [
        "矢量多点钛偏尾偏斜机构件",
        "三组共立冗余防强脉硬内核控网",
        "机载自给防瞬间失电超快熔断蓄能盒"
      ],
      matchingBOMCostReduction: "成功消除对高价格、极重外载直驱主发滑行翼骨的过度冗余配备，使得民空载人eVTOL航电设备与自重量BOM核减超 33%。",
      supplyChainNodes: ["东土科技 (极高保安全实时网络交换板板底)", "五洲新春 (轻质耐剪高寿命高频旋转连件支)"],
      fullDraftText: "中华人民共和国国家知识产权局 (CNIPA)\n【核心发明专利说明书】\n\n[专利号]: ZL202511452230.1\n\n【矢量倾旋多余度飞控】\n大体积载人eVTOL空中最大的灾难莫过于由于过渡转换仰摆瞬间突变的气流横卷，从而让多轴发生倾角螺旋而自由落体机翻。本新型偏舵主动对持系统，是目前少有的，能自纠暴风的低空终极保命级空中防线。"
    },
    {
      id: "CN119983412B",
      title: "一种柔性大伸展抗撕高强度机器人电子皮肤封装自密合冷固固化工艺",
      englishTitle: "Anti-Tear Self-Healing Cold Curing Process for Flexible Robot Tactile Enclosures",
      holder: "途见常州智能皮肤装备有限公司",
      sector: "触觉与传感",
      level: "发明专利 / 已授权",
      date: "2026-05-18",
      abstractText: "本发明公开了一种可在常温不借外部高热、且能大幅增强电子皮肤在外端侧面关节万向急动拉伸中、抗剪切抗破裂的高柔抗粘聚氨酯橡胶自校冷固固化工艺。该工艺使用特定的硅、钛及交链碳链复配冷流体树脂作为包裹阻热介质，让表面封装后的电子皮膜在遭受金属碎屑及螺栓扎穿瞬间零断断开且可在5分钟内自缩，一举解决物理撕破毁电危机。",
      authorList: ["钱晓东", "苏里凡·戈登教授"],
      claims: [
        "1. 一种常温固高分子防撕触感皮封装工艺，特征在于在基底 surface 双轨道高速静流喷镀厚度层为20-40微米的自固冷凝涂层，膜基剪拉寿命抗弯大于30万次不皱皮。"
      ],
      blockDiagramText: "[常温冷凝交链树脂] ──► (多轨道静置交汇固化层) ──► [超高柔抗撕拉无裂封装皮]\n                                                        │\n                   [局部穿刺5分钟自弥合] ◄──── [三晶阻压阻气密层底组]",
      systemArchitecture: [
        "常温低收缩胶水自固化连续冷卷流水线",
        "纳米极二氧化硅复加防渗抗剪外层膜",
        "多路高速全幅微断裂阻阻变化监控台"
      ],
      matchingBOMCostReduction: "免去在组装机器人时需要设置极其昂贵的超高温烘淬和贴后二次固件耗损大段，使全肢一体包敷大面积冷敷的总工艺损配BOM骤降 46%。",
      supplyChainNodes: ["能斯达 (高分子防渗水复合硅胶原料)", "途见科技 (全幅万向喷机涂布生产配合)"],
      fullDraftText: "中华人民共和国国家知识产权局 (CNIPA)\n【自固化树脂封装说明】\n\n[专利号]: ZL202511453215.1\n\n【高聚物防撕裂密封防护】\n以往电子高密触皮一粘上机器人大负荷膝头，只要被外界利角稍微割破一毫米，在剧烈屈伸大拉时会瞬间引发全面龟裂和引线崩飞，造成毁灭瘫痪。本专利的常温冷凝自弥自密皮胶极好化解了关节多向屈动作的大撕拉危机。"
    }
  ];

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSector, setSelectedSector] = useState<string>('全部');

  // Currently Selected Patent for deep Document Reading Viewer
  const [selectedPatentId, setSelectedPatentId] = useState<string>(patentsDb[0].id);

  // Print simulator trigger
  const [isPrinting, setIsPrinting] = useState<boolean>(false);

  // Compute filtered list of patents
  const filteredPatents = useMemo(() => {
    return patentsDb.filter(p => {
      const matchesSearch = p.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.holder.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.englishTitle.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSector = selectedSector === '全部' || p.sector === selectedSector;
      return matchesSearch && matchesSector;
    });
  }, [searchQuery, selectedSector]);

  // Find active patent
  const activePatent = useMemo(() => {
    return patentsDb.find(p => p.id === selectedPatentId) || patentsDb[0];
  }, [selectedPatentId]);

  // Trigger Mock File PDF print downloadable event
  const triggerMockDownload = (pat: PatentItem) => {
    try {
      const content = `========================================================================\n` +
                      `中华人民共和国国家知识产权局 (CNIPA) 官方电子案卷打印档案\n` +
                      `========================================================================\n` +
                      `【专 利 号】: ${pat.id}\n` +
                      `【专 利 级 别】: ${pat.level}\n` +
                      `【公 告 日】: ${pat.date}\n` +
                      `【专 利 权 人】: ${pat.holder}\n` +
                      `【核 心 发 明 赛 道】: ${pat.sector}\n` +
                      `【发 明 标 题】: ${pat.title}\n` +
                      `【外 文 译 称】: ${pat.englishTitle}\n` +
                      `【发 明 作 者】: ${pat.authorList.join(', ')}\n` +
                      `------------------------------------------------------------------------\n` +
                      `【摘 要 说 明】:\n${pat.abstractText}\n` +
                      `------------------------------------------------------------------------\n` +
                      `【权 利 要 求 书 (核心条目)】:\n${pat.claims.join('\n')}\n` +
                      `------------------------------------------------------------------------\n` +
                      `【工 艺 配 套 及 控 制 流 下 沉 对 齐】:\n${pat.blockDiagramText}\n` +
                      `------------------------------------------------------------------------\n` +
                      `【供 应 链 定 位】: 关联主要中上游制造商：${pat.supplyChainNodes.join('， ')}\n` +
                      `========================================================================\n` +
                      `已通过张明科技智能产权管理大网关安全盾验证加密下载。文件指纹 SHA256-SIGN-TRUE-2026.`;
      
      const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), content], { type: "text/plain;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `patent_dossier_${pat.id}_${pat.holder.substring(0,6)}.txt`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch(err) {
      alert("电子文档打印失败: " + err);
    }
  };

  // Mock print command animation delay
  const handlePrintAnimation = () => {
    setIsPrinting(true);
    setTimeout(() => {
      setIsPrinting(false);
      triggerMockDownload(activePatent);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in" id="patents_interactive_view_container">
      
      {/* Search Header and filters bar */}
      <div className="bg-[#0b1224] border border-[#20325d] p-5 rounded-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-md font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-400" />
              <span>国家智能机器人与低空核心专利多维解译案卷库</span>
            </h3>
            <p className="text-xs text-gray-400">
              深度解剖 灵巧手、高弹触觉皮肤、行星滚柱丝杠等高机密专利文书，自研“多维案卷仿真阅读器”直观查阅完整权利要求、原理框图及配套供应链。
            </p>
          </div>

          <div className="flex gap-2.5">
            <span className="text-xs bg-indigo-950/65 text-indigo-400 border border-indigo-900 px-3 py-1.5 rounded font-mono font-bold flex items-center gap-1.5 shrink-0">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>已解算 {patentsDb.length} 份高附加值国际案卷</span>
            </span>
          </div>
        </div>

        {/* Search controls + category tabs */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-2 border-t border-gray-900">
          
          {/* Search bar */}
          <div className="relative w-full md:w-80 shrink-0">
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gray-500" />
            <input
              type="text"
              placeholder="搜索专申号、专利标题、持有人或外文译称..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0d1425] border border-[#1f2f51] rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 outline-none focus:border-indigo-400/50 transition-all font-sans"
            />
          </div>

          {/* Sector filter */}
          <div className="flex gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none scrollable-element">
            {['全部', '触觉与传感', '动力与传动', '关节硬件设计', '具身算法系统', '航空与特种飞控'].map((sec) => (
              <button
                key={sec}
                onClick={() => setSelectedSector(sec)}
                className={`text-[11px] px-3 py-1.5 rounded-md cursor-pointer font-bold whitespace-nowrap transition-all shrink-0 ${
                  selectedSector === sec
                    ? 'bg-gradient-to-r from-indigo-950 to-[#101a35] text-indigo-400 border border-indigo-800/70'
                    : 'text-gray-400 hover:text-white hover:bg-gray-950/40'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Main Grid: Left Side Patent List (1 column Desktop), Right Side Interactive Patent Document Viewer (2 columns Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Scrollable Patents Selection List */}
        <div className="lg:col-span-1 space-y-3">
          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">
              专利目录检索结果 ({filteredPatents.length} 份匹配):
            </span>
          </div>

          <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1 select-none custom-scrollbar scrollable-element">
            {filteredPatents.length === 0 ? (
              <div className="p-12 text-center text-gray-500 bg-[#0b1224] rounded-xl border border-gray-900 space-y-2">
                <p className="text-xs">🔍 没有检索到任何专利案卷</p>
                <p className="text-[10px] text-gray-500/80">请清除检索关键字再浏览底层资产</p>
              </div>
            ) : (
              filteredPatents.map((p) => {
                const isActive = p.id === selectedPatentId;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPatentId(p.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between focus:outline-none cursor-pointer ${
                      isActive 
                        ? 'bg-gradient-to-r from-[#141b30] to-[#0a1122] border-indigo-400/80 shadow-[0_0_15px_rgba(99,102,241,0.08)]' 
                        : 'bg-[#070b16] border-gray-900 hover:bg-[#0c1428] hover:border-gray-800'
                    }`}
                  >
                    <div className="space-y-1.5 w-full">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] text-indigo-400 font-mono font-bold font-semibold">{p.id}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-sm font-bold font-mono ${
                          p.level.includes("审查中") ? 'bg-amber-950/20 text-text-amber-500 text-amber-550 border border-amber-800/20' :
                          p.level.includes("已授权") ? 'bg-indigo-950/30 text-indigo-400 border border-indigo-800/30' :
                          'bg-cyan-950/20 text-cyan-400 border border-cyan-800/30'
                        }`}>
                          {p.level}
                        </span>
                      </div>
                      
                      <h4 className={`text-xs font-extrabold leading-snug line-clamp-2 ${isActive ? 'text-white' : 'text-gray-300'}`}>
                        {p.title}
                      </h4>
                      
                      <div className="flex items-center justify-between pt-1 font-mono text-[9px] text-gray-500">
                        <p className="truncate max-w-[140px] text-indigo-350 font-bold">{p.holder}</p>
                        <span>公布: {p.date}</span>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Interactive Patent Document Viewer / 电子案卷深度解译阅读器 */}
        <div className="lg:col-span-2">
          <div className="bg-[#0b1224] border border-[#20325d] rounded-xl overflow-hidden shadow-2xl flex flex-col h-full min-h-[580px]">
            
            {/* Document Room Header Controls */}
            <div className="bg-[#0d1425] border-b border-[#1b2b51] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400 animate-pulse" />
                <div>
                  <span className="text-[10px] text-gray-500 font-mono font-bold tracking-widest block">CNIPA 数字化国家知识产权案卷浏览器</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-extrabold text-white">案卷编号: {activePatent.id} / {activePatent.level}</span>
                  </div>
                </div>
              </div>

              {/* Action utilities (Mock Print, PDF, Download) */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintAnimation}
                  disabled={isPrinting}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#121c33] border border-gray-800 hover:border-indigo-500/50 hover:bg-indigo-950/35 text-xs text-indigo-400 hover:text-white rounded-lg transition-all cursor-pointer font-bold shrink-0 disabled:opacity-50"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{isPrinting ? "案卷排版并装订中..." : "打印电子文书"}</span>
                </button>
                <button
                  onClick={() => triggerMockDownload(activePatent)}
                  className="flex items-center gap-1 px-2 py-1.5 bg-indigo-950 border border-indigo-900 hover:bg-indigo-900 text-indigo-400 hover:text-white rounded-lg transition-all cursor-pointer font-black text-xs shrink-0"
                  title="下载 TXT 纯文本权利要求档"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Document Content Workspace */}
            <div className="p-6 overflow-y-auto space-y-6 max-h-[540px] custom-scrollbar scrollable-element bg-[#070b16]/70 relative">
              
              {/* Floating Patent Authority Shield Seal */}
              <div className="absolute top-8 right-8 w-24 h-24 border border-indigo-500/10 rounded-full flex flex-col items-center justify-center p-3 opacity-20 pointer-events-none select-none text-center transform rotate-12">
                <Globe className="w-8 h-8 text-indigo-400" />
                <span className="text-[8px] font-mono text-indigo-350 leading-tight uppercase font-bold mt-1">CNIPA\nAPPROVED</span>
              </div>

              {/* Main Official Title Header */}
              <div className="space-y-2 text-center pb-5 border-b border-gray-900 relative">
                <span className="text-[10px] bg-indigo-950 text-indigo-400 border border-indigo-900/40 px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
                  {activePatent.level}
                </span>
                <h2 className="text-sm md:text-base font-black text-white px-2 mt-2 leading-snug">
                  {activePatent.title}
                </h2>
                <p className="text-[11px] text-gray-500 font-mono italic max-w-lg mx-auto">{activePatent.englishTitle}</p>
              </div>

              {/* 4-Cell Base Info Meta Matrix */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-2.5 rounded-lg bg-[#0d1425] border border-gray-900 flex flex-col justify-between">
                  <span className="text-[9px] text-gray-500 font-mono block">主要专利权人 (Holder)</span>
                  <span className="text-xs font-bold text-white pr-1 truncate mt-1">{activePatent.holder}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0d1425] border border-gray-900 flex flex-col justify-between">
                  <span className="text-[9px] text-gray-500 font-mono block">第一主创发明人 (Authors)</span>
                  <span className="text-xs font-bold text-[#00f3ff] truncate mt-1">{activePatent.authorList.join(', ')}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0d1425] border border-gray-900 flex flex-col justify-between">
                  <span className="text-[9px] text-gray-500 font-mono block">授权/公布日期 (Pub-Date)</span>
                  <span className="text-xs font-bold text-white font-mono mt-1">{activePatent.date}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#0d1425] border border-gray-900 flex flex-col justify-between">
                  <span className="text-[9px] text-gray-500 font-mono block">研判对应核心赛道</span>
                  <span className="text-xs font-bold text-indigo-400 mt-1">{activePatent.sector}</span>
                </div>
              </div>

              {/* Abstract Segment (摘要) */}
              <div className="space-y-2 bg-[#0a1020]/90 border border-[#1b2b4d] rounded-xl p-4.5 relative">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-gray-900 pb-2">
                  <Bookmark className="w-3.5 h-3.5 text-indigo-400" />
                  <span>1. 权利摘要说明 (Patent Summary Abstract)</span>
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed font-sans text-justify">
                  {activePatent.abstractText}
                </p>
              </div>

              {/* Claims Section (权利要求书 - 最核心法权定义) */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-gray-900 pb-2">
                  <BookmarkCheck className="w-3.5 h-3.5 text-indigo-400" />
                  <span>2. 权利要求书核心条目 (Primary Core Claims)</span>
                </h4>
                <div className="space-y-3.5 pl-1.5">
                  {activePatent.claims.map((cl, idx) => (
                    <div key={idx} className="p-3 bg-[#0d1425] border-l-2 border-indigo-500/40 rounded-r-lg text-xs text-gray-300 leading-relaxed font-sans text-justify">
                      {cl}
                    </div>
                  ))}
                </div>
              </div>

              {/* Block Diagram Text (说明书附图/工艺流程/结构框图) */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-gray-900 pb-2">
                  <Cpu className="w-3.5 h-3.5 text-[#00f3ff]" />
                  <span>3. 核心软硬件级物理/控制信号流框图 (Patent Block Diagram)</span>
                </h4>
                <div className="p-4 rounded-xl bg-black border border-indigo-950 font-mono text-[10px] md:text-xs text-cyan-400 leading-normal overflow-x-auto whitespace-pre block-diagram-window">
                  {activePatent.blockDiagramText}
                </div>
                <div className="flex flex-wrap gap-2 text-[9px] font-mono text-gray-550 text-gray-400 bg-gray-950/40 p-2 rounded border border-gray-950">
                  <span className="font-bold text-[#00f3ff]">🔍 说明书附图释义：</span>
                  <span>各流体阀电磁同步阻降电耦合引线均带有零点动态阻抗标定，以彻底中和自重漂移阻力。</span>
                </div>
              </div>

              {/* BOM Optimization detail and Supply Chain Connections */}
              <div className="p-4 rounded-xl bg-[#0a1b2e]/30 border border-cyan-900/35 grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* BOM Pricing analysis */}
                <div className="space-y-1.5">
                  <span className="text-[10px] text-gray-400 font-bold block">💡 专利核算配套BOM降本解耦研判:</span>
                  <p className="text-[11px] text-[#00f3ff] leading-relaxed font-sans">
                    {activePatent.matchingBOMCostReduction}
                  </p>
                </div>

                {/* Main supply chain manufacturers matching */}
                <div className="space-y-1.5 border-t md:border-t-0 md:border-l border-gray-900 pt-2 md:pt-0 md:pl-4">
                  <span className="text-[10px] text-gray-400 font-bold block">⛓️ 关联的主要中/上游供应件厂商标的:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {activePatent.supplyChainNodes.map((scn, sIdx) => (
                      <span 
                        key={sIdx}
                        className="px-2 py-0.5 rounded bg-[#0d1425] border border-gray-800 text-xs text-gray-300 font-bold"
                      >
                        {scn}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Full Description text box / scrollable raw legal draft */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-gray-900 pb-2">
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  <span>4. 著作权法授权公开文书全文 (Specification Full Draft)</span>
                </h4>
                <div className="max-h-56 overflow-y-auto bg-gray-950 text-cyan-200/80 p-4 rounded-xl border border-gray-900 text-[10px] md:text-xs leading-relaxed font-mono whitespace-pre-wrap select-all scrollable-element custom-scrollbar">
                  {activePatent.fullDraftText}
                </div>
              </div>

            </div>

            {/* Document Room Status Footer info */}
            <div className="bg-[#0c1426] border-t border-[#1b2b51] p-3 text-center text-[10px] text-gray-500 font-mono">
              专利审查状态：已全维度装配图纸，由【张明科技】高附情报库双重哈希保全核查。
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
