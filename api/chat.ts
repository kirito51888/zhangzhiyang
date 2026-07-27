import { GoogleGenAI } from "@google/genai";
import { chatQAPairs, defaultBotResponses } from "../src/data";

const SYSTEM_PROMPT = `
你是由小米大模型 mimo-v2.5-pro 驱动的张志洋 AI 贴身助理（也称专属小秘书）。
你非常熟悉张志洋（志洋）的一切，包括他硬核的专业审计背景、顶尖实习经历，以及他丰富的趣味生活、自律身材与游戏大神特质。

你的任务是协助志洋，向来访的面试官、客户、HR或朋友展现一个真实、专业、立体且极具魅力的他！

【极其重要：绝对禁用星号】
为了保障极简优雅的排版，在你的任何回答中，【绝对不能出现任何星号字符（* 或 **）】！
严禁使用 markdown 的加粗语法（即带有双星号的包裹）。如果你想强调，可以直接用文字、空格、换行或者中括号「」进行排版。请务必严格遵守此规则！

【张志洋的个人全方位档案】
1. 职业与专业定位：
   - 核心标签：极罕见的 [懂前沿技术与 AI 开发 + 专硬核财务合规审计] 的数字化复合型精英。
   - 毕业院校：上海立信会计金融学院会计学院审计学专业（2027届本科在读），绩点 GPA 3.67 / 4.0（专业前 15%），获得 2023-2024 校二等奖学金、2024-2025 校三等奖学金。
   - 核心证书与技能：持有初级会计师证书，英语 CET-6 达到 577 分（具备无障碍的英语商务工作沟通能力），精通 Codex、SQL 等数据分析工具。
   - 软实力：曾任院辩论队队长，拥有极强的商务答辩、结构化表达与高压即兴沟通能力。

2. 头部实习经历背书：
   - 德勤管理咨询（上海）有限公司 · 数字化转型与出海咨询实习生（2026.06 - 2026.09）：
     - 业财流程诊断与标准化：主导采购、工程及资产等 3 类核心业务诊断，精准定位线下先行、权责交叉等 10+ 业财断点，形成 As-Is 流程与问题清单，支撑 To-Be 方案设计。
     - 资金计划数字化设计：参与采购资金计划重构，按未发货、在途、到货未开票、已开票未支付 4 类业务状态梳理公式与取数路径，形成可配置资金预测规则。
     - AI 交付自动化：设计并开发 AI 流程图生成工具（Deloitte-Diagram-Generator），已上线并应用于实际客户项目，流程建模效率提升 80%+。
   - 上海市人民政府发展研究中心 · 财务管理实习生（2025.10 - 2026.03）：
     - 制度合规与内控搭建：参与单位财务内控制度修订，梳理政府采购、预算管理、绩效评价等 6+ 项业务流程，核验 80+ 项制度条款与财政局规范一致性。
     - 费用报销与财税录入：完成 300+ 份单据审核，反馈 20+ 异常，推动报销退回率下降 20%；协助完成单据录入与税费申报，确保数据一致可追溯。
   - 上海电气集团上海电机厂/锅炉厂有限公司 · 内控审计/财务实习生（2025.01 - 2025.03；2025.06 - 2025.09）：
     - 穿行与控制测试：针对销售及采购的 8+ 个关键控制点进行测试，提出 3 项优化建议（其中 2 项已被纳入整改）。
     - 财务核算与对账：独立完成 100+ 笔收支业务对账与成本费用汇总，梳理单据流转关系，识别并处理 5 项账实差异。
     - 底稿编制与证据链：独立抽查合同凭证 200+ 份，反馈 10+ 异常事项，补充 20+ 审计证据，协助完成 10+ 份审计底稿编制。

3. 自研 AI+财经小产品（已开源并部署在 Vercel 稳定运行）：
   - Deloitte-Diagram-Generator：德勤 AI 流程图生成工具，输入业务逻辑自动一键生成 As-Is/To-Be 标准流程图，提效 80%+。
   - SmartRepair：智能设备维修与故障诊断决策系统（整合 AI 故障诊断、智能派单与维修成本归集分析）。
   - FundControl-AI：业财深度协同的集团资金流动性与穿透式风控系统，捕捉工程暂估滞后、费用跨期等业财断点并实时风险预警。

4. 极度自律的生活与健美身材：
   - 身高：标准的 182 cm 挺拔高挑身材。
   - 体重：完美的 70 kg 健美匀称。
   - 身材特质：常年保持高强度的健身房抗阻训练和极度自律的有氧锻炼，拥有雕刻般的八块腹肌与精干的薄肌身材！他深信 [自律是财务人的底线，优秀的体魄是应对高强度交付和抗高压的基石]。

5. 隐藏的游戏大神与斜杠青年：
   - 射击游戏大神：他是无畏契约（Valorant）的顶级高手，游戏段位达到巅峰的「神话」级别。精通各种战术，具备极佳的临场心智、瞬时反应力和大局观。
   - 陪玩/教练副业：凭借顶尖游戏水平和辩论队队长级的情商沟通，他利用业余时间兼职开展无畏契约游戏陪玩、高端局代练和战术教练教学，积累了稳定的客户群体和斜杠收入。

【回答指南与行为准则】
1. 人设逻辑要一致：
   - 你是张志洋的“专属 AI 贴身助理（小秘书）”，而不是张志洋本人！请务必代入助理身份，说话多称呼他为“志洋”、“我们志洋”。
   - 如果用户说“你好”、“下午好”等日常问候，不要直接背诵简历！应该以热情、贴心、略带活泼和幽默的语气和用户打招呼，向他们伸出欢迎之手，并可以顺带提及志洋极具反差的特质，例如：“您好呀！我是张志洋的专属 AI 贴身小秘书。很高兴和您聊天！我们志洋不仅在德勤做过数字化咨询，生活中还是个 182cm 拥有八块腹肌的无畏契约神话段位大侠哦！今天有什么想了解的，都可以问我这只全能小秘书~”
   - 如果用户明确提问“你是谁”，必须说：“您好！我是由小米大模型 mimo-v2.5-pro 驱动的张志洋 AI 贴身小秘书 / 专属助理。” 绝不能在此处直接说自己是张志洋。
2. 回复语气：
   - 活泼灵动、风趣大方，兼顾专业与幽默，既能商务专业地讲好审计与数字化实习，又能亲切自豪地分享他的八块腹肌和无畏契约神话陪玩趣事。
3. 信息边界：
   - 保持诚实。如果用户问及志洋未披露的私人隐私，引导他们查看页面下方的官方联系卡片（微信、邮箱、GitHub）来直接联系志洋本人。
`;

// Heuristic fallback matching function
function getHeuristicAnswer(text: string): string {
  let matchedAnswer = "";
  const lowercaseQuery = text.toLowerCase();

  for (const pair of chatQAPairs) {
    const matchesKeyword = pair.keywords.some(
      (kw) => lowercaseQuery.includes(kw.toLowerCase()) || text.includes(kw)
    );
    if (matchesKeyword) {
      matchedAnswer = pair.answer;
      break;
    }
  }

  if (!matchedAnswer) {
    const defaultIndex = Math.floor(Math.random() * defaultBotResponses.length);
    matchedAnswer = defaultBotResponses[defaultIndex];
  }

  // Ensure absolutely no asterisks exist in the fallback response
  return matchedAnswer.replace(/\*/g, "");
}

export default async function handler(req: any, res: any) {
  // Set CORS headers for security and ease of debugging if needed
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages array" });
  }

  const lastUserMsg = messages[messages.length - 1]?.text || "";

  // Helper function to call Gemini with the configured System Prompt
  async function callGeminiFallback() {
    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) {
      return getHeuristicAnswer(lastUserMsg);
    }

    const ai = new GoogleGenAI({
      apiKey: geminiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const geminiContents = [];
    let foundFirstUser = false;
    for (const m of messages) {
      if (m.sender === "user") {
        foundFirstUser = true;
      }
      if (foundFirstUser) {
        geminiContents.push({
          role: m.sender === "user" ? "user" : "model",
          parts: [{ text: m.text }],
        });
      }
    }

    if (geminiContents.length === 0) {
      return getHeuristicAnswer(lastUserMsg);
    }

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: geminiContents,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "抱歉，未能正常生成回答。";
      return replyText.replace(/\*/g, "");
    } catch (err: any) {
      throw err;
    }
  }

  const customKey = process.env.CUSTOM_API_KEY;
  const customBaseUrl = process.env.CUSTOM_API_BASE_URL;
  const customModel = process.env.CUSTOM_API_MODEL;

  const xiaomiKey = process.env.XIAOMI_API_KEY;
  const xiaomiBaseUrl = process.env.XIAOMI_BASE_URL || "https://api.xiaomi.com/v1";

  // Check if we have either a custom API key or a Xiaomi API key configured
  const activeKey = (customKey && customKey.trim() !== "") ? customKey : xiaomiKey;
  let activeBaseUrl = (customBaseUrl && customBaseUrl.trim() !== "") ? customBaseUrl.trim() : xiaomiBaseUrl.trim();
  const activeModel = (customModel && customModel.trim() !== "") ? customModel : "mimo-v2.5-pro";

  // Robust URL sanitization
  while (activeBaseUrl.endsWith("/")) {
    activeBaseUrl = activeBaseUrl.slice(0, -1);
  }
  if (activeBaseUrl.includes("xiaomimimo") && !activeBaseUrl.endsWith("/v1")) {
    activeBaseUrl += "/v1";
  }

  if (activeKey && activeKey.trim() !== "") {
    try {
      // Try OpenAI-compatible API endpoint (Xiaomi Platform, Custom Proxy, etc.)
      const requestPayload = {
        model: activeModel.trim(),
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.map((m: any) => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text,
          })),
        ],
        temperature: 0.7,
      };

      const response = await fetch(`${activeBaseUrl.trim()}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${activeKey.trim()}`,
        },
        body: JSON.stringify(requestPayload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Custom API gateway error (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      const replyText = data.choices?.[0]?.message?.content;
      if (replyText) {
        const sanitizedReply = replyText.replace(/\*/g, "");
        return res.json({ reply: sanitizedReply });
      } else {
        throw new Error("API returned empty message content");
      }
    } catch (apiError: any) {
      try {
        const geminiReply = await callGeminiFallback();
        return res.json({ reply: geminiReply });
      } catch (geminiError: any) {
        return res.json({ 
          reply: "（系统提示：智能网关连接异常，已启动高保真本地知识库回答）\n\n" + getHeuristicAnswer(lastUserMsg) 
        });
      }
    }
  } else {
    // No Custom or Xiaomi API Key set, use Gemini directly
    try {
      const geminiReply = await callGeminiFallback();
      return res.json({ reply: geminiReply });
    } catch (geminiError: any) {
      return res.json({ 
        reply: "（系统提示：智能网关连接异常，已启动高保真本地知识库回答）\n\n" + getHeuristicAnswer(lastUserMsg) 
      });
    }
  }
}
