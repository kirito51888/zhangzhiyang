import { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  GraduationCap, 
  Award, 
  Briefcase, 
  Code, 
  Sparkles, 
  CheckCircle, 
  ArrowUpRight, 
  Download,
  Flame,
  MessageSquare,
  Building,
  Target,
  BookmarkCheck,
  Globe,
  Github
} from 'lucide-react';
import { educationData, internshipData, businessProjects, softwareProjects, skillGroups } from './data';
import ProjectViewer from './components/ProjectViewer';
import ResumeChatbot from './components/ResumeChatbot';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(softwareProjects[0].id);

  // Find the currently selected software project
  const currentProject = softwareProjects.find(p => p.id === selectedProjectId) || softwareProjects[0];

  const handleDownloadResume = () => {
    // Elegant toast or alert simulation as we don't have direct pdf asset, 
    // but we can trigger printing of the page, which is a perfect professional trick!
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50/40 text-slate-900 selection:bg-emerald-500 selection:text-white antialiased flex flex-col">
      
      {/* 1. Header / Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center text-white font-display font-bold text-sm tracking-wide shadow-md">
              ZY
            </div>
            <div>
              <span className="font-display font-bold text-base tracking-tight text-gray-900">张志洋</span>
              <span className="text-xs text-emerald-600 font-medium ml-2 font-mono bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                AI + 财经 数字化先锋
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
            <a href="#hero" className="hover:text-slate-950 transition duration-150">个人简介</a>
            <a href="#products" className="hover:text-slate-950 transition duration-150">自研 AI 作品</a>
            <a href="#internships" className="hover:text-slate-950 transition duration-150">名企实习</a>
            <a href="#competitions" className="hover:text-slate-950 transition duration-150">商业大赛</a>
            <a href="#skills" className="hover:text-slate-950 transition duration-150">专业技能</a>
            <a href="#ai-assistant" className="hover:text-slate-950 transition duration-150 flex items-center gap-1.5 text-emerald-600 bg-emerald-50/80 px-2.5 py-1 rounded-full border border-emerald-100">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>AI 简历助理</span>
            </a>
          </nav>

          <button 
            onClick={handleDownloadResume}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition duration-200 cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>打印/导出简历</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 space-y-24">

        {/* 2. Hero Section */}
        <section id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-4">
          {/* Hero details */}
          <motion.div 
            className="lg:col-span-7 space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-slate-900/5 px-3 py-1.5 rounded-full border border-slate-900/10 text-xs font-semibold text-slate-800">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>2027届毕业生 · 聚焦财务数字化转型/咨询/供应链相关岗位</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-gray-900 leading-[1.1]">
                跨越 <span className="text-emerald-600 underline decoration-wavy decoration-emerald-500/30">硬核财务</span> 与<br />
                <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">前沿 AI 技术</span> 的数字化推手
              </h1>
              
              <p className="text-base text-gray-600 max-w-xl leading-relaxed">
                我是张志洋，就读于上海立信会计金融学院审计学专业。通过<b>上海电气（内审/财务）</b>与<b>上海市人民政府发展研究中心（财务合规）</b>的实习经历，我逐步熟悉了企业财务与业务流程、信息系统及关键风险控制点；在<b>德勤中国（数字化转型咨询）</b>实习中，进一步参与大模型应用、数据分析等数字技术在业务流程优化与数字化转型项目中的落地。我希望连接业务、财务与技术，运用数字化工具进行转型。
              </p>
            </div>

            {/* Quick Contact & Bio Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm shadow-gray-100/50">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gray-50 text-gray-500 rounded-xl">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400">联系电话</p>
                  <a href="tel:18016212685" className="text-xs font-semibold text-gray-800 hover:text-emerald-600">180 1621 2685</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gray-50 text-gray-500 rounded-xl">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400">电子邮箱</p>
                  <a href="mailto:zhiyang0301@163.com" className="text-xs font-semibold text-gray-800 hover:text-emerald-600">zhiyang0301@163.com</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gray-50 text-gray-500 rounded-xl">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400">工作意向地</p>
                  <p className="text-xs font-semibold text-gray-800">上海市 (可常驻)</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a 
                href="#products" 
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold transition duration-150 inline-flex items-center gap-1.5 shadow-md shadow-slate-900/5 cursor-pointer"
              >
                <span>浏览自研 AI 项目</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a 
                href="#ai-assistant" 
                className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-800 rounded-xl text-sm font-semibold border border-gray-200 transition duration-150 inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>与 AI 助手在线聊聊</span>
                <MessageSquare className="w-4 h-4 text-emerald-500" />
              </a>
            </div>
          </motion.div>

          {/* Portrait and Education Card */}
          <motion.div 
            className="lg:col-span-5 space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            {/* Visual Portrait Container */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl text-white relative overflow-hidden shadow-xl min-h-[300px] flex flex-col justify-between">
              {/* Background ambient light */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono tracking-wider text-emerald-400 uppercase bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 rounded-full">
                    Academic Background
                  </span>
                  <GraduationCap className="w-6 h-6 text-slate-400" />
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-xl font-display font-bold text-slate-100">{educationData.school}</h4>
                  <p className="text-xs text-slate-300 font-semibold">{educationData.college} · {educationData.major} (本科)</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-mono">GPA 绩点</p>
                    <p className="text-sm font-bold text-slate-200">{educationData.gpa}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-mono">在读期间</p>
                    <p className="text-sm font-bold text-slate-200">{educationData.period}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mt-6 pt-4 border-t border-slate-800">
                <p className="text-[10px] text-slate-500 uppercase font-mono flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-400" /> 曾获荣誉奖学金
                </p>
                <div className="space-y-1">
                  {educationData.awards.map((award, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{award}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Resume Bullet Tags */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-3 shadow-sm">
              <h5 className="text-xs font-bold uppercase tracking-wider text-gray-400">复合型硬实力指标</h5>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-medium text-gray-700 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                  <BookmarkCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>初级会计师证书</span>
                </span>
                <span className="text-xs font-medium text-gray-700 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                  <BookmarkCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>CET-6 英语 577 分 (工作语言)</span>
                </span>
                <span className="text-xs font-medium text-gray-700 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                  <BookmarkCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>曾任院辩论队队长 (精于沟通)</span>
                </span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 3. Selected Software Projects Section (Main Core Request) */}
        <section id="products" className="space-y-8 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-display font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              自研 AI + 财经创新作品集
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              根据我在德勤咨询、上海电气等名企内控审计中的痛点洞察，我全栈设计并开发了以下三款小产品。支持<b>在线实际预览</b>和<b>高仿真交互沙盒演示</b>。
            </p>
          </div>

          {/* Project Tabs Selector */}
          <div className="flex justify-center border-b border-gray-200">
            <div className="flex gap-2 sm:gap-6 p-1 bg-gray-100 rounded-2xl border border-gray-200/50">
              {softwareProjects.map((proj) => (
                <button
                  key={proj.id}
                  onClick={() => setSelectedProjectId(proj.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition duration-200 cursor-pointer ${
                    selectedProjectId === proj.id
                      ? 'bg-white text-slate-900 shadow-sm border border-gray-200/10'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {proj.name}
                  <span className="hidden sm:inline text-[11px] font-normal text-gray-400 ml-1">({proj.chineseName})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Project Viewer Wrapper */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProjectId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <ProjectViewer project={currentProject} />
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* 4. Professional Experiences Timeline Section */}
        <section id="internships" className="space-y-8 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-5">
            <div className="space-y-2">
              <h2 className="text-3xl font-display font-extrabold text-gray-900 tracking-tight">
                名企及政府实习经历
              </h2>
              <p className="text-sm text-gray-500">
                深入顶级咨询公司、地方政府核心财务智囊和大型工业集团，打造高标准专业内控与数字化技能。
              </p>
            </div>
            <div className="flex items-center gap-1 bg-slate-900 text-white font-mono text-[11px] px-3 py-1.5 rounded-full font-semibold">
              <Briefcase className="w-3.5 h-3.5" />
              <span>3 段硬核岗位背书</span>
            </div>
          </div>

          {/* Timeline list */}
          <div className="space-y-12 relative before:absolute before:inset-0 before:left-6 before:md:left-1/2 before:-translate-x-px before:bg-gray-100 before:pointer-events-none">
            {internshipData.map((job, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div 
                  key={idx} 
                  className={`flex flex-col md:flex-row relative gap-8 md:gap-0 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                >
                  {/* Timeline Dot Indicator */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-slate-900 rounded-full z-10 top-1.5 shadow-sm"></div>

                  {/* Date Column */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8 flex md:justify-end text-left md:text-right">
                    <div className={`space-y-1 ${isEven ? 'md:text-left md:mr-auto' : 'md:text-right md:ml-auto'}`}>
                      <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                        {job.period}
                      </span>
                      <h4 className="text-lg font-display font-bold text-gray-900 mt-2">{job.company}</h4>
                      <p className="text-sm font-semibold text-slate-500">{job.title}</p>
                    </div>
                  </div>

                  {/* Space / Content Column */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-200 space-y-4">
                      {job.highlights.map((high, hIdx) => (
                        <div key={hIdx} className="space-y-1 text-xs text-gray-600 leading-relaxed">
                          {/* Parse bold titles in resume bullets if any */}
                          {high.includes('：') ? (
                            <p>
                              <b className="text-slate-800">{high.split('：')[0]}：</b>
                              <span>{high.split('：')[1]}</span>
                            </p>
                          ) : (
                            <p>{high}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* 5. Competitions & Achievements Section */}
        <section id="competitions" className="space-y-8 scroll-mt-20">
          <motion.div 
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-lg"
            initial={{ opacity: 0, scale: 0.98, y: 25 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            {businessProjects.map((proj, idx) => (
              <div key={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                <div className="lg:col-span-4 space-y-4">
                  <span className="text-xs font-mono font-bold tracking-wider text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1.5 rounded-full uppercase">
                    National High-Level Award
                  </span>
                  
                  <h3 className="text-2xl md:text-3xl font-display font-extrabold tracking-tight text-white leading-snug">
                    {proj.title}
                  </h3>

                  <div className="flex items-center gap-2 text-amber-400 font-display font-bold text-lg border-y border-slate-800 py-3 my-2">
                    <Award className="w-5 h-5 text-amber-400 shrink-0" />
                    <span>国家级二等奖</span>
                  </div>

                  <div className="space-y-1 text-xs text-slate-400">
                    <p className="flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5" /> 角色：<b>{proj.role}</b>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> 参赛时间：<b>{proj.period}</b>
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-8 space-y-6">
                  <h4 className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                    美的集团商业案例分析成果
                  </h4>
                  <div className="space-y-4">
                    {proj.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="bg-white/5 border border-white/5 rounded-2xl p-5 text-xs text-slate-300 leading-relaxed space-y-1">
                        {item.includes('：') ? (
                          <p>
                            <span className="font-semibold text-white text-sm block mb-1.5">{item.split('：')[0]}</span>
                            <span>{item.split('：')[1]}</span>
                          </p>
                        ) : (
                          <p>{item}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* 6. Technical & Professional Skills Section */}
        <section id="skills" className="grid grid-cols-1 lg:grid-cols-12 gap-12 scroll-mt-20">
          <motion.div 
            className="lg:col-span-4 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="space-y-3">
              <h2 className="text-3xl font-display font-extrabold text-gray-900 tracking-tight">
                专业技能与心智模型
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                完美的“财务-技术-沟通”铁三角。不仅精通财务内控与分析，更有出色的逻辑架构与现场答辩水平。
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
              <h4 className="text-xs font-bold uppercase text-gray-400">核心能力配比面板</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-gray-600">审计与内控审查</span>
                  <span className="text-emerald-600 font-bold font-mono">Expert</span>
                </div>
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-gray-600">SQL 与商业分析</span>
                  <span className="text-emerald-600 font-bold font-mono">Proficient</span>
                </div>
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-gray-600">Claude Code 与 AI 系统开发</span>
                  <span className="text-emerald-600 font-bold font-mono">Advanced</span>
                </div>
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-gray-600">英语工作沟通 (CET-6 577)</span>
                  <span className="text-emerald-600 font-bold font-mono">Fluent</span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {skillGroups.map((group, idx) => (
              <motion.div 
                key={idx} 
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              >
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-900 flex items-center gap-1.5 border-b border-gray-100 pb-3 mb-4">
                    <Code className="w-4 h-4 text-emerald-500" />
                    {group.category}
                  </h4>
                  <div className="space-y-4">
                    {group.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="space-y-1">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-gray-700 truncate max-w-[150px]">{skill.name}</span>
                          <span className="text-gray-400 font-mono text-[10px]">{skill.level}%</span>
                        </div>
                        {/* Custom progress bar */}
                        <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-slate-900 rounded-full" 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: sIdx * 0.05 + idx * 0.1, ease: "easeOut" }}
                          ></motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 7. AI Resume Assistant (Chatbot Panel) */}
        <section id="ai-assistant" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center scroll-mt-20">
          <motion.div 
            className="lg:col-span-5 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold font-mono">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>Interact with AI</span>
              </div>
              <h2 className="text-3xl font-display font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                张志洋的 AI 简历助理
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                想快速了解更多他没有在纸面简历展开的业务实力？我作为他的 AI 助理，能够实时回答关于他的<b>德勤工作详情、上海电气审计项目、全国商赛答辩细节</b>以及个人优势，欢迎与我对话！
              </p>
            </div>

            <div className="space-y-3 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm text-xs text-gray-600">
              <h5 className="font-bold text-slate-800">📌 您可以试着问我：</h5>
              <ul className="space-y-1.5 list-disc pl-4 text-gray-600">
                <li>“他在德勤的 AI 流程图提效了多少？”</li>
                <li>“他的 3 个财经创新系统如何部署的？”</li>
                <li>“他在上海电气的内控测试中提出了什么优化建议？”</li>
                <li>“他做过哪些数字化 ROI 价值估算？”</li>
              </ul>
            </div>
          </motion.div>

          <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <ResumeChatbot />
          </motion.div>
        </section>

      </main>

      {/* 8. Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 mt-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-500">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center text-white font-display font-bold text-xs">
                ZY
              </div>
              <span className="font-display font-bold text-slate-900">张志洋</span>
            </div>
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} Zhiyang Zhang. Designed & Programmed with 💻 and AI. All Rights Reserved.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            <a href="#hero" className="hover:text-slate-900 transition duration-150">个人简介</a>
            <a href="#products" className="hover:text-slate-900 transition duration-150">自研 AI 作品</a>
            <a href="#internships" className="hover:text-slate-900 transition duration-150">名企实习</a>
            <a href="#competitions" className="hover:text-slate-900 transition duration-150">商赛成绩</a>
            <a href="#skills" className="hover:text-slate-900 transition duration-150">专业能力</a>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400 font-mono">
              IP: Shanghai, China
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
