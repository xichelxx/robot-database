# 全球机器人产业全景数据库

覆盖 **15,900+ 家企业**、**25+ 国家/地区**的全球机器人产业综合数据库 Web 应用。

**在线预览：** https://xichelxx.github.io/robot-database

## 数据规模

| 指标 | 数值 |
|------|------|
| 企业总数 | ~15,900 家 |
| 真实锚点企业 | ~50 家（手动录入） |
| 程序生成覆盖 | ~15,850 家（确定性算法） |
| 国家/地区 | 25+ |
| 产业链分类 | 上游 / 中游 / 下游 |
| 细分赛道 | 人形机器人、四足、协作、AGV/AMR、手术医疗、无人机、传感器、减速器、芯片等 30+ 类 |

## 数据来源

- IFR 国际机器人联合会
- Counterpoint Research
- Crunchbase / PitchBook
- QY Research、MarketsandMarkets、IDC
- 各公司财报及公开信息
- 行业报告与媒体综合

数据截至 2026 年 5 月。

## 快速开始

```bash
npm install
npm run dev
```

浏览器打开 `http://localhost:3000`。

## 构建生产版本

```bash
npm run build
```

产出在 `dist/` 目录，可直接部署到任意静态托管平台（GitHub Pages、Vercel、Netlify 等）。

## 项目结构

```
src/
├── App.tsx                   # 主应用（企业库、搜索筛选、生态图谱）
├── generator.ts              # 企业数据生成引擎（锚点 + 程序生成）
├── companies_patch.ts        # 补充企业数据（352 家真实企业）
├── data.ts                   # 分类工作表数据（24 张产业链表）
├── data/
│   ├── products.ts           # 产品详细数据（BOM、架构图）
│   └── reportsAndDynamics.ts # 行业报告与动态
├── components/
│   ├── YearViews.tsx         # 年度产量/市场视图
│   ├── MarketAnalysisView.tsx # 市场分析视图
│   ├── PatentsView.tsx       # 专利分析视图
│   └── ReportViewer.tsx      # 报告阅读器
└── context/
    └── AuthContext.tsx        # Firebase 认证
```

## 企业数据修改指南

### 添加真实企业

编辑 `src/companies_patch.ts`，按以下格式追加：

```typescript
{
  n: "企业名",          // name
  e: "EnglishName",    // englishName
  ct: "城市",          // city
  co: "国家",          // country（默认"中国"）
  y: 2024,             // year（成立年份）
  s: "🟦中游",         // stage（🔴上游/🟦中游/🟢下游）
  c: "双足人形机器人本体", // category
  p: "主营产品",        // product
  r: "A轮 1亿",        // round（融资轮次）
  v: "¥10亿",          // valuation（估值）
  stars: "⭐⭐⭐",       // stars（⭐/⭐⭐/⭐⭐⭐）
  rev: "¥5000万",      // revenue（营收）
  o: "10,000台",       // output2027
  t: "核心技术",        // tech
  i: "投资方"           // investors
}
```

添加后运行 `npm run build` 重新构建即可。

### 可用 Category

人形机器人、四足机器人、协作机器人、AGV/AMR、服务机器人、手术医疗机器人、传感器、灵巧手、机器人大脑 AI、芯片、减速器、电机、无人机、eVTOL、自动驾驶、末端执行器 等。

### 添加国家/地区标记

`co` 字段支持的国家：中国、日本、韩国、美国、德国、英国、法国、瑞士、瑞典、丹麦、挪威、芬兰、荷兰、西班牙、意大利、以色列、印度、新加坡、马来西亚、加拿大、澳大利亚 等。

## 技术栈

- React 19 + TypeScript
- Vite 6
- Tailwind CSS 4
- Firebase（认证 + Firestore）
- Framer Motion

## License

Apache-2.0
