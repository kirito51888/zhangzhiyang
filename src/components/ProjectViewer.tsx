import { useState } from 'react';
import { SoftwareProject } from '../types';
import { 
  Github, 
  ExternalLink, 
  Globe, 
  RefreshCw, 
  Lock, 
  Upload, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign, 
  Workflow, 
  Cpu, 
  ShieldCheck, 
  ArrowRight,
  Database,
  Sliders,
  ChevronDown,
  LayoutDashboard
} from 'lucide-react';

interface ProjectViewerProps {
  project: SoftwareProject;
}

export default function ProjectViewer({ project }: ProjectViewerProps) {
  const [viewMode, setViewMode] = useState<'iframe' | 'simulator'>('iframe');
  const [iframeKey, setIframeKey] = useState(0);

  // AssetPilot-AI Simulator State
  const [selectedAssetIdx, setSelectedAssetIdx] = useState<number>(0);
  const [deprMethod, setDeprMethod] = useState<'linear' | 'double_declining' | 'sum_years'>('linear');
  const [projectionYears, setProjectionYears] = useState<number>(5);

  const assetsList = [
    { name: '大型重型智能机床 (德勤诊断车间)', cost: 1200, life: 10, salvageRate: 0.05, code: 'AP-2026-001' },
    { name: '企业级大模型算力集群 (集团总部)', cost: 450, life: 5, salvageRate: 0.03, code: 'AP-2026-002' },
    { name: '智慧无人立体仓库 (华东制造分厂)', cost: 800, life: 15, salvageRate: 0.08, code: 'AP-2026-003' }
  ];

  const calculateDepreciation = (cost: number, life: number, salvageRate: number, method: 'linear' | 'double_declining' | 'sum_years', years: number) => {
    const salvageValue = cost * salvageRate;
    const depreciableAmount = cost - salvageValue;
    const activeYears = Math.min(years, life);
    
    let accumulated = 0;
    
    if (method === 'linear') {
      const annual = depreciableAmount / life;
      accumulated = annual * activeYears;
    } else if (method === 'double_declining') {
      const rate = 2 / life;
      let tempBookValue = cost;
      for (let i = 1; i <= activeYears; i++) {
        if (i === life) {
          const dep = Math.max(0, tempBookValue - salvageValue);
          accumulated += dep;
          tempBookValue -= dep;
        } else {
          let dep = tempBookValue * rate;
          if (tempBookValue - dep < salvageValue) {
            dep = Math.max(0, tempBookValue - salvageValue);
          }
          accumulated += dep;
          tempBookValue -= dep;
        }
      }
    } else {
      const sum = (life * (life + 1)) / 2;
      for (let i = 1; i <= activeYears; i++) {
        const rate = (life - i + 1) / sum;
        accumulated += depreciableAmount * rate;
      }
    }
    
    const netBookValue = Math.max(salvageValue, cost - accumulated);
    const actualAccumulated = cost - netBookValue;
    const deprPercent = (actualAccumulated / cost) * 100;
    
    let recommendation = '资产处于正常服役期，继续持有';
    let urgencyColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    
    if (deprPercent >= 80 || activeYears >= life) {
      recommendation = '【高危警告】资产已接近折旧年限/残值，建议启动 CapEx 重置计划';
      urgencyColor = 'text-rose-400 bg-rose-500/10 border-rose-500/20';
    } else if (deprPercent >= 50) {
      recommendation = '【预警提示】累计折旧超过 50%，建议在下年度预算中备足重置资金';
      urgencyColor = 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    }
    
    return {
      accumulated: actualAccumulated.toFixed(2),
      netBookValue: netBookValue.toFixed(2),
      deprPercent: deprPercent.toFixed(1),
      recommendation,
      urgencyColor
    };
  };

  // Deloitte-Diagram-Generator Simulator State
  const [selectedProcess, setSelectedProcess] = useState<'p2p' | 'capex' | 'maintenance'>('p2p');
  const [diagramMode, setDiagramMode] = useState<'asis' | 'tobe'>('asis');
  const [isGenerating, setIsGenerating] = useState(false);

  const processTemplates = {
    p2p: {
      name: '采购至付款 (P2P) 业财流程',
      asisBreakpointsCount: 4,
      efficiencyBoost: '+82%',
      asisSteps: [
        { step: 1, title: '供应商准入与报价', desc: '线下微信/纸质沟通报价', tag: '断点：线下先行，无系统记录', status: 'error' },
        { step: 2, title: '采购合同签署', desc: '人工审批盖章，审批流转滞后', tag: '断点：权责交叉，缺少系统联动', status: 'warning' },
        { step: 3, title: '货物到场验收', desc: '库管手工填写纸质送货单', tag: '断点：账实不同步', status: 'error' },
        { step: 4, title: '财务暂估与结算', desc: '月末手工录入发票，平均延迟15天', tag: '断点：暂估滞后，系统断点', status: 'error' },
      ],
      tobeSteps: [
        { step: 1, title: 'SRM 线上供应商准入', desc: '资质自动核验 & 线上询比价', tag: '自动化率 95%', status: 'success' },
        { step: 2, title: '电子合同与规则流转', desc: '智能关联 PO 与资金计划预占', tag: '业财规则自动穿透', status: 'success' },
        { step: 3, title: 'WMS 扫码到货入库', desc: '一物一码识别，实时推送财务', tag: '账实秒级协同', status: 'success' },
        { step: 4, title: 'AI 自动三方匹配结算', desc: '三单匹配自动生成会计凭证', tag: '结算效率提效 80%+', status: 'success' },
      ]
    },
    capex: {
      name: '工程建设与暂估流程',
      asisBreakpointsCount: 3,
      efficiencyBoost: '+85%',
      asisSteps: [
        { step: 1, title: '施工节点推进', desc: '施工方按进度打桩与节点交付', tag: '正常线下施工', status: 'info' },
        { step: 2, title: '监理验收签署', desc: '纸质盖章报告，流转耗时长', tag: '断点：信息传递滞后', status: 'warning' },
        { step: 3, title: '工程暂估处理', desc: '财务未收到通告，季度末补调', tag: '断点：工程暂估严重滞后', status: 'error' },
        { step: 4, title: '资金款项支付', desc: '超期无预警，费用跨期不准', tag: '断点：资金计划失真', status: 'error' },
      ],
      tobeSteps: [
        { step: 1, title: 'PMS 节点线上打卡', desc: '移动端上传图纸与影像凭证', tag: '全程数字留痕', status: 'success' },
        { step: 2, title: 'AI 监理报告分析', desc: '智能识别工程进度与工程量', tag: '自动触发暂估规则', status: 'success' },
        { step: 3, title: '实时工程暂估入账', desc: '自动计算应暂估金额与税额', tag: '规避费用跨期风险', status: 'success' },
        { step: 4, title: '资金计划动态预警', desc: '配合资金流动性预测安排付款', tag: '资金占用降低15%', status: 'success' },
      ]
    },
    maintenance: {
      name: '资产维修与一物一码流程',
      asisBreakpointsCount: 3,
      efficiencyBoost: '+80%',
      asisSteps: [
        { step: 1, title: '设备故障口头报修', desc: '车间人员线下通知维修工', tag: '无工单记录', status: 'warning' },
        { step: 2, title: '领用零星备件', desc: '仓库人工凭纸质条开领', tag: '断点：一物一码缺失', status: 'error' },
        { step: 3, title: '维修成本归集', desc: '成本无法准确分摊至具体设备', tag: '断点：账实不符，归集粗糙', status: 'error' },
      ],
      tobeSteps: [
        { step: 1, title: 'EAM 智能工单生成', desc: 'IoT 自动感知故障报警并派单', tag: '响应时间缩短 70%', status: 'success' },
        { step: 2, title: '扫码领料 & 一物一码', desc: '唯一 RFID/条码全链路追踪', tag: '备件库存 100% 准确', status: 'success' },
        { step: 3, title: 'AI 成本归集与 ROI 分析', desc: '自动计入设备明细账并预测重置', tag: '资产生命周期可溯', status: 'success' },
      ]
    }
  };

  const handleSimulateAIGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setDiagramMode('tobe');
    }, 800);
  };

  // FundControl-AI Simulator State
  const [selectedSubsidiary, setSelectedSubsidiary] = useState<'all' | 'hq' | 'east' | 'oversea'>('all');
  const [simulateAnomalyCount, setSimulateAnomalyCount] = useState(1);

  const getSubData = () => {
    switch (selectedSubsidiary) {
      case 'hq':
        return { cash: '2,450 万元', inflow: '1,200 万元', outflow: '950 万元', anomalies: ['跨期费用：部分数字化软件开发费暂未计提（35万元）'] };
      case 'east':
        return { cash: '1,120 万元', inflow: '650 万元', outflow: '800 万元', anomalies: ['工程暂估滞后：新一期厂房打桩工程已验收未结算暂估（120万元）', '一物一码缺失：2批次零星备件未登记唯一标识条码'] };
      case 'oversea':
        return { cash: '850 万元', inflow: '420 万元', outflow: '310 万元', anomalies: ['海外外汇汇率波动风险敞口未锁汇'] };
      default:
        return { cash: '4,420 万元', inflow: '2,270 万元', outflow: '2,060 万元', anomalies: ['工程暂估滞后（120万）', '跨期费用偏差（35万）', '备件一物一码缺失（2批次）'] };
    }
  };

  const currentSub = getSubData();



  const handleRefreshIframe = () => {
    setIframeKey(prev => prev + 1);
  };

  return (
    <div id={`project-viewer-${project.id}`} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* LEFT COLUMN: THE LIVE WEB PREVIEW / SIMULATOR (Requested "左侧是网页的实际预览") */}
      <div className="lg:col-span-7 flex flex-col">
        {/* Browser Mockup Wrapper */}
        <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 flex-1 flex flex-col overflow-hidden min-h-[500px]">
          {/* Browser Header Mac OS style */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 bg-rose-500 rounded-full inline-block"></span>
              <span className="w-3.5 h-3.5 bg-amber-400 rounded-full inline-block"></span>
              <span className="w-3.5 h-3.5 bg-emerald-400 rounded-full inline-block"></span>
            </div>

            {/* Address Bar */}
            <div className="flex-1 max-w-lg mx-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 rounded-lg text-xs text-slate-400 border border-slate-800 font-mono select-none">
                <Lock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="truncate flex-1 text-slate-300">{project.vercelUrl}</span>
                <button 
                  onClick={handleRefreshIframe}
                  className="hover:text-white transition duration-150 cursor-pointer"
                  title="刷新预览"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* View Tab Switcher */}
            <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 text-[11px] font-medium text-slate-400">
              <button
                onClick={() => setViewMode('iframe')}
                className={`px-3 py-1 rounded-md transition cursor-pointer ${
                  viewMode === 'iframe'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'hover:text-slate-200'
                }`}
              >
                在线实网预览
              </button>
              <button
                onClick={() => setViewMode('simulator')}
                className={`px-3 py-1 rounded-md transition cursor-pointer ${
                  viewMode === 'simulator'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'hover:text-slate-200'
                }`}
              >
                高仿真交互沙盒
              </button>
            </div>
          </div>

          {/* Browser Body View */}
          <div className="flex-1 bg-slate-950 relative min-h-[420px] flex flex-col">
            {viewMode === 'iframe' ? (
              <div className="w-full h-full flex-1 relative bg-slate-950">
                {/* Real Iframe */}
                <iframe
                  key={iframeKey}
                  src={project.vercelUrl}
                  title={`${project.name} Actual Web Preview`}
                  className="w-full h-full min-h-[440px] border-none bg-white"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
                
                {/* Ambient banner in case the iframe fails to render or is blocked */}
                <div className="absolute bottom-3 right-3 left-3 bg-slate-900/90 backdrop-blur-md border border-slate-800 px-4 py-2.5 rounded-xl flex items-center justify-between text-xs text-slate-300 pointer-events-none sm:pointer-events-auto">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-400" />
                    <span>正通过 Vercel 实时载入实际网页...</span>
                  </div>
                  <a 
                    href={project.vercelUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold pointer-events-auto"
                  >
                    在新窗口中打开 <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ) : (
              /* HAND-CRAFTED INTELLIGENT SIMULATOR */
              <div className="flex-1 p-6 text-white flex flex-col overflow-y-auto">
                {/* Simulator Intro Header */}
                <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
                  <span className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
                    <Cpu className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">{project.chineseName} · 演示沙盒</h4>
                    <p className="text-[10px] text-slate-400">基于其真实的业务逻辑设计的离线模拟器，支持即时动态计算与演示</p>
                  </div>
                </div>

                {/* 1. ASSETPILOT-AI SIMULATOR */}
                {project.id === 'assetpilot-ai' && (() => {
                  const currentAsset = assetsList[selectedAssetIdx];
                  const depr = calculateDepreciation(currentAsset.cost, currentAsset.life, currentAsset.salvageRate, deprMethod, projectionYears);
                  
                  return (
                    <div className="flex-1 flex flex-col gap-4 text-slate-300">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        {/* Left: Asset Selection & Config */}
                        <div className="md:col-span-5 space-y-3">
                          {/* Asset selector */}
                          <div className="space-y-1.5">
                            <p className="text-xs font-semibold text-slate-400">选择要分析的资产类别</p>
                            <div className="space-y-1.5">
                              {assetsList.map((asset, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setSelectedAssetIdx(idx)}
                                  className={`w-full p-2.5 rounded-xl border text-left transition duration-200 cursor-pointer flex flex-col gap-0.5 ${
                                    selectedAssetIdx === idx
                                      ? 'bg-slate-800 border-emerald-500 text-white shadow-lg shadow-emerald-500/5'
                                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/40 hover:border-slate-700 text-slate-300'
                                  }`}
                                >
                                  <span className="text-[10px] font-mono text-slate-500">{asset.code}</span>
                                  <span className="text-xs font-semibold truncate">{asset.name}</span>
                                  <span className="text-[11px] text-slate-400 font-mono">原始账面原值: {asset.cost} 万元</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Method Selector */}
                          <div className="space-y-1.5">
                            <p className="text-xs font-semibold text-slate-400">选择折旧方法模型</p>
                            <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-[10px] font-medium text-slate-400">
                              {[
                                { id: 'linear', name: '直线法' },
                                { id: 'double_declining', name: '双倍余额' },
                                { id: 'sum_years', name: '年数总和' }
                              ].map((m) => (
                                <button
                                  key={m.id}
                                  onClick={() => setDeprMethod(m.id as any)}
                                  className={`py-1 px-1 rounded-md transition cursor-pointer text-center ${
                                    deprMethod === m.id
                                      ? 'bg-slate-800 text-white shadow-sm font-semibold'
                                      : 'hover:text-slate-200'
                                  }`}
                                >
                                  {m.name}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Projection Slider */}
                          <div className="space-y-1.5">
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-400">预测折旧年限</span>
                              <span className="text-emerald-400 font-bold font-mono">{projectionYears} 年</span>
                            </div>
                            <input 
                              type="range" 
                              min="1" 
                              max="15" 
                              value={projectionYears}
                              onChange={(e) => setProjectionYears(Number(e.target.value))}
                              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500" 
                            />
                            <p className="text-[9px] text-slate-500">向后推演折旧曲线，评估资产寿命与报表影响</p>
                          </div>
                        </div>

                        {/* Right: Simulation Output */}
                        <div className="md:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between min-h-[250px]">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                              <span className="text-xs font-bold text-slate-300">折旧仿真与资产重置决策看板</span>
                              <span className="text-[10px] font-mono text-slate-500">AssetModel V3.1</span>
                            </div>

                            {/* Data points */}
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/60">
                                <span className="text-[10px] text-slate-500 block">累计折旧总额</span>
                                <span className="text-sm font-bold font-mono text-rose-400">{depr.accumulated} 万元</span>
                                <span className="text-[9px] text-slate-500 block font-mono">折旧占比: {depr.deprPercent}%</span>
                              </div>
                              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/60">
                                <span className="text-[10px] text-slate-500 block">资产账面净值 (Net)</span>
                                <span className="text-sm font-bold font-mono text-emerald-400">{depr.netBookValue} 万元</span>
                                <span className="text-[9px] text-slate-500 block font-mono">预计残值率: {(currentAsset.salvageRate * 100).toFixed(0)}%</span>
                              </div>
                            </div>

                            {/* Intelligently Generated Advice */}
                            <div className={`p-2.5 rounded-lg border text-xs leading-relaxed flex gap-2 items-start ${depr.urgencyColor}`}>
                              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                              <div className="space-y-1">
                                <p className="font-semibold text-slate-200">CapEx 预测与重置规划：</p>
                                <p className="text-slate-300 text-[11px] leading-tight">{depr.recommendation}</p>
                              </div>
                            </div>
                          </div>

                          <div className="border-t border-slate-800 pt-3 mt-3 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                            <span className="flex items-center gap-1">
                              <Sliders className="w-3.5 h-3.5 text-emerald-500" /> 
                              {projectionYears > currentAsset.life ? `注意：预测年数已超该资产 ${currentAsset.life} 年折旧寿命` : '计算依据符合企业会计准则 (CAS 4号)'}
                            </span>
                            <span>模型已穿透</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* 2. DELOITTE-DIAGRAM-GENERATOR SIMULATOR */}
                {project.id === 'deloitte-diagram-generator' && (
                  <div className="flex-1 flex flex-col gap-4 text-slate-300">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                      {/* Left: Template & Controls */}
                      <div className="md:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4">
                        <p className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 border-b border-slate-800 pb-2">
                          <Workflow className="w-3.5 h-3.5 text-emerald-400" /> 选定业务场景模板
                        </p>

                        <div className="space-y-2">
                          {(Object.keys(processTemplates) as Array<keyof typeof processTemplates>).map((key) => {
                            const template = processTemplates[key];
                            return (
                              <button
                                key={key}
                                onClick={() => {
                                  setSelectedProcess(key);
                                  setDiagramMode('asis');
                                }}
                                className={`w-full p-2.5 rounded-xl border text-left transition duration-200 cursor-pointer flex flex-col gap-1 ${
                                  selectedProcess === key
                                    ? 'bg-slate-800 border-emerald-500 text-white shadow-md'
                                    : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/40 text-slate-400'
                                }`}
                              >
                                <span className="text-xs font-bold text-slate-200">{template.name}</span>
                                <div className="flex items-center justify-between text-[10px]">
                                  <span className="text-rose-400 font-mono">发现断点: {template.asisBreakpointsCount} 个</span>
                                  <span className="text-emerald-400 font-bold font-mono">预估提效: {template.efficiencyBoost}</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {/* Trigger AI Auto Flowchart Generation */}
                        <div className="pt-2">
                          <button
                            onClick={handleSimulateAIGenerate}
                            disabled={isGenerating}
                            className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/10 disabled:opacity-50"
                          >
                            <Workflow className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                            <span>{isGenerating ? 'AI 正在解析生成 To-Be 图谱...' : '生成 To-Be 优化流程图'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Right: Flowchart Visualizer Container */}
                      <div className="md:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between min-h-[280px]">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                            <span className="text-xs font-bold text-slate-200 flex items-center gap-2">
                              <span>{processTemplates[selectedProcess].name}</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-semibold ${
                                diagramMode === 'asis' 
                                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              }`}>
                                {diagramMode === 'asis' ? 'As-Is 现状诊断图' : 'To-Be AI 优化图'}
                              </span>
                            </span>

                            <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-[10px] font-medium text-slate-400">
                              <button
                                onClick={() => setDiagramMode('asis')}
                                className={`px-2.5 py-0.5 rounded transition cursor-pointer ${
                                  diagramMode === 'asis' ? 'bg-slate-800 text-rose-300 font-bold' : 'hover:text-slate-200'
                                }`}
                              >
                                As-Is 现状
                              </button>
                              <button
                                onClick={() => setDiagramMode('tobe')}
                                className={`px-2.5 py-0.5 rounded transition cursor-pointer ${
                                  diagramMode === 'tobe' ? 'bg-slate-800 text-emerald-300 font-bold' : 'hover:text-slate-200'
                                }`}
                              >
                                To-Be 目标
                              </button>
                            </div>
                          </div>

                          {/* Flowchart Steps Stream */}
                          <div className="space-y-2 max-h-[190px] overflow-y-auto pr-1">
                            {(diagramMode === 'asis' 
                              ? processTemplates[selectedProcess].asisSteps 
                              : processTemplates[selectedProcess].tobeSteps
                            ).map((item, idx) => (
                              <div 
                                key={idx} 
                                className={`p-2.5 rounded-lg border text-xs flex items-center justify-between transition duration-200 ${
                                  item.status === 'error'
                                    ? 'bg-rose-950/30 border-rose-800/50 text-rose-200'
                                    : item.status === 'warning'
                                    ? 'bg-amber-950/30 border-amber-800/50 text-amber-200'
                                    : 'bg-emerald-950/30 border-emerald-800/50 text-emerald-200'
                                }`}
                              >
                                <div className="space-y-0.5 flex-1 pr-2">
                                  <div className="flex items-center gap-2">
                                    <span className="w-4 h-4 bg-slate-800 text-slate-300 rounded-full font-mono text-[10px] flex items-center justify-center shrink-0">
                                      {item.step}
                                    </span>
                                    <span className="font-bold text-slate-100">{item.title}</span>
                                  </div>
                                  <p className="text-[10px] text-slate-400 pl-6">{item.desc}</p>
                                </div>

                                <span className={`text-[10px] px-2 py-0.5 rounded font-mono shrink-0 font-semibold ${
                                  item.status === 'error'
                                    ? 'bg-rose-500/20 text-rose-300'
                                    : item.status === 'warning'
                                    ? 'bg-amber-500/20 text-amber-300'
                                    : 'bg-emerald-500/20 text-emerald-300'
                                }`}>
                                  {item.tag}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="border-t border-slate-800 pt-2 mt-2 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                          <span className="flex items-center gap-1 text-emerald-400/90">
                            <Workflow className="w-3.5 h-3.5" /> 已连通 Mermaid/BPMN 引擎
                          </span>
                          <span>Deloitte Flowchart Engine V2.0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. FUNDCONTROL-AI SIMULATOR */}
                {project.id === 'fundcontrol-ai' && (
                  <div className="flex-1 flex flex-col gap-4 text-slate-300">
                    <div className="flex flex-wrap gap-2 mb-1">
                      <span className="text-xs font-semibold text-slate-400 flex items-center mr-2">
                        <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400 mr-1" /> 切换查看主体：
                      </span>
                      {[
                        { id: 'all', name: '集团合并' },
                        { id: 'hq', name: '集团总部' },
                        { id: 'east', name: '华东电机制造分厂' },
                        { id: 'oversea', name: '海外咨询事业部' }
                      ].map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => setSelectedSubsidiary(sub.id as any)}
                          className={`px-3 py-1 text-xs rounded-lg transition duration-200 cursor-pointer ${
                            selectedSubsidiary === sub.id
                              ? 'bg-emerald-500 text-white font-medium shadow-md shadow-emerald-500/10'
                              : 'bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          {sub.name}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
                        <p className="text-[10px] text-slate-400">实时资金余额</p>
                        <p className="text-base font-bold font-mono text-emerald-400 mt-1">{currentSub.cash}</p>
                      </div>
                      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
                        <p className="text-[10px] text-slate-400">本月资金计划流入</p>
                        <p className="text-base font-bold font-mono text-slate-200 mt-1">{currentSub.inflow}</p>
                      </div>
                      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
                        <p className="text-[10px] text-slate-400">本月计划流出</p>
                        <p className="text-base font-bold font-mono text-slate-400 mt-1">{currentSub.outflow}</p>
                      </div>
                    </div>

                    {/* Anomalies Detected lists */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-300 flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
                          <AlertTriangle className="w-4 h-4 text-amber-400" />
                          业财流程断点与合规风险警示 ({currentSub.anomalies.length} 项)
                        </p>
                        <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1">
                          {currentSub.anomalies.map((anom, idx) => (
                            <div key={idx} className="p-2.5 bg-slate-950/80 rounded-lg border border-rose-950/50 text-xs text-rose-300 flex gap-2 items-start">
                              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0 mt-1.5"></span>
                              <span>{anom}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-slate-800 pt-3 mt-3 flex items-center justify-between text-[11px] text-slate-500">
                        <span className="flex items-center gap-1"><Database className="w-3.5 h-3.5 text-emerald-400" /> 业财深度穿透 · 资金流穿透分析成功</span>
                        <span>Treasury Control V3.0</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: THE PROJECT DETAILS (Requested "右侧是本小产品的简单介绍和github仓库地址和vercel实际地址 这两个地址分别用小图标超链接") */}
      <div className="lg:col-span-5 flex flex-col justify-between py-2">
        <div className="space-y-6">
          {/* Project Header */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                PROD
              </span>
              {project.tags.map((tag) => (
                <span key={tag} className="text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
            
            <h3 className="text-2xl font-display font-bold text-gray-900 flex items-center gap-2">
              {project.name}
              <span className="text-sm font-medium text-gray-400 font-sans">({project.chineseName})</span>
            </h3>
            
            <p className="text-sm font-semibold text-gray-700 leading-relaxed font-sans">
              {project.tagline}
            </p>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <p className="text-sm text-gray-600 leading-relaxed">
              {project.description}
            </p>

            {/* Highlights bullet points */}
            <div className="space-y-2 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5 mb-2">
                <Workflow className="w-3.5 h-3.5 text-emerald-500" /> 核心功能与商业价值：
              </h4>
              <ul className="space-y-2">
                {project.highlights.map((high, index) => (
                  <li key={index} className="text-xs text-gray-600 leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                    <span>{high}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons with requested links and small icons */}
        <div className="pt-6 border-t border-gray-100 space-y-4">
          <p className="text-xs text-gray-400 flex items-center gap-1.5 font-medium">
            <span>在线发布版本 & 开源物理仓库超链接</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Github Link */}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-gray-950 transition duration-200 shadow-sm shadow-gray-100"
            >
              <Github className="w-4 h-4 text-gray-900" />
              <span>GitHub 源码仓库</span>
              <ExternalLink className="w-3.5 h-3.5 text-gray-400 ml-auto sm:ml-0" />
            </a>

            {/* Vercel Link */}
            <a
              href={project.vercelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition duration-200 shadow-sm"
            >
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>Vercel 实际地址</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 ml-auto sm:ml-0" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
