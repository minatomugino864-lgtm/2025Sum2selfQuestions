
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import { 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Printer,
  Heart,
  BookOpen,
  MailOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types & Constants ---

interface Answer {
  id: number;
  question: string;
  answer: string;
}

const QUESTIONS = [
  { id: 1, text: "Q1. 如果让你用三个词来形容2025，你会选用哪三个词语", quote: "“有些词语，是灵魂的底色。”", author: "—— 佚名" },
  { id: 2, text: "Q2. 站在年末的视角回望这一年会觉得圆满还是有一点遗憾", quote: "“断臂的维纳斯，也是一种圆满。”", author: "—— 艺术论" },
  { id: 3, text: "Q3. 今年有没有尝试过一些以前没有做过的事情，体验如何", quote: "“人的一生，是无数次初遇的集合。”", author: "—— 《初吻》" },
  { id: 4, text: "Q4. 有没有去到一些新地方（之前没有涉足过的空间、城市或者国家...）", quote: "“世界是一本书，不旅行的人只读了其中一页。”", author: "—— 奥古斯丁" },
  { id: 5, text: "Q5. 路上难忘的风景", quote: "“玫瑰色的晚霞，是宇宙寄来的情书。”", author: "—— 抒情诗" },
  { id: 6, text: "Q6. 有没有认识新朋友以及是如何成为朋友的", quote: "“每个人的生命中，都有过客与归人。”", author: "—— 三毛" },
  { id: 7, text: "Q7. 选一首今年很喜欢的歌吧（不止一首也可以^）", quote: "“旋律停下的地方，记忆才刚刚开始。”", author: "—— 乐评人" },
  { id: 8, text: "Q8. 今年让你感到幸福的一个瞬间", quote: "“幸福不是长生不老，而是每个微小的愿望达成。”", author: "—— 《飞屋环游记》" },
  { id: 9, text: "Q9. 有因为什么而落泪过吗", quote: "“眼泪是灵魂溢出的诗。”", author: "—— 佚名" },
  { id: 10, text: "Q10. 有没有让你感觉很难受无法呼吸的时刻，现在走出来了吗", quote: "“万物皆有裂痕，那是光照进来的地方。”", author: "—— 莱昂纳德·科恩" },
  { id: 11, text: "Q11. 想和当时的自己说些什么吗", quote: "“你无需完美，只需真实。”", author: "—— 心理学" },
  { id: 12, text: "Q12. 去年陪伴在你身边的人今年还在吗", quote: "“缘分如流水，有的交汇，有的分流。”", author: "—— 哲思" },
  { id: 13, text: "Q13. 今年让你感觉温暖的一个时刻", quote: "“爱是最小单位的救赎。”", author: "—— 佚名" },
  { id: 14, text: "Q14. 有没有爱上些什么", quote: "“爱上什么，就是赋予世界色彩。”", author: "—— 艺术家" },
  { id: 15, text: "Q15. 有没有后悔的事情，如果再来一次会怎么做", quote: "“遗憾是通往成熟的必经之路。”", author: "—— 文学" },
  { id: 16, text: "Q16. 有没有什么让你觉得今年的自己和去年的不一样了", quote: "“I'm gonna make him an offer he can't refuse.”", author: "—— 《教父》" },
  { id: 17, text: "Q17. 有没有掌握什么新技能或者爱好", quote: "“好奇心是通往自由的唯一阶梯。”", author: "—— 知识论" },
  { id: 18, text: "Q18. 又过去一年有没有什么新的想法、体悟或者人生经验", quote: "“我思，故我在。”", author: "—— 笛卡尔" },
  { id: 19, text: "Q19. 今年有没有特别喜欢的书或者电影或者剧集", quote: "“别人的故事里，藏着你的灵魂。”", author: "—— 影评人" },
  { id: 20, text: "Q20. 假如可以给去年这个时候的自己留一句话会说什么", quote: "“不要怕，往前走。”", author: "—— 对白" },
  { id: 21, text: "附加题. 说一件想要在2026做到的事情吧", quote: "“最好的未来，是尚未到来的那一天。”", author: "—— 预言" },
];

const APP_STATE = {
  INTRO: 'intro',
  QUIZ: 'quiz',
  SUMMARY: 'summary',
  ANALYSIS: 'analysis'
};

// --- Helper Components ---

const Layout = ({ children }: { children?: React.ReactNode }) => (
  <div className="min-h-screen bg-[#f1f0ea] flex items-center justify-center p-4 md:p-12 font-serif text-[#4a4a4a]">
    <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
    <div className="max-w-5xl w-full min-h-[750px] flex flex-col relative animate-fade-in bg-white/40 backdrop-blur-[2px] rounded-3xl p-6 md:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.02)] border border-white/50">
      {children}
    </div>
  </div>
);

// --- Main Components ---

// Added optional key prop to resolve TypeScript error in AnimatePresence
const Intro = ({ onStart }: { onStart: () => void; key?: string }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-grow flex flex-col items-center justify-center text-center space-y-20 py-10">
    <div className="space-y-6">
      <div className="w-20 h-[2px] bg-[#8c927d] mx-auto opacity-40"></div>
      <h1 className="text-4xl md:text-5xl font-light tracking-[0.3em] text-[#3d3d3d] leading-relaxed">
        和 2025 有关的 <br/> <span className="text-3xl tracking-[0.5em] opacity-40 mt-4 block">21 个问题</span>
      </h1>
    </div>
    <div className="space-y-4">
      <p className="text-[#8c927d] italic text-base font-light tracking-widest">"Reflect, Record, and Re-discover."</p>
      <p className="text-stone-400 text-sm font-light tracking-[0.2em]">让记忆在笔尖缓慢流淌</p>
    </div>
    <button onClick={onStart} className="px-16 py-4 border border-[#8c927d]/40 text-[#8c927d] text-xs tracking-[0.5em] hover:bg-[#8c927d] hover:text-white transition-all duration-700 uppercase">
      开启存档
    </button>
  </motion.div>
);

const Quiz = ({ index, answer, onUpdate, onNext, onBack, isLast }: any) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col">
    <div className="flex flex-col items-center space-y-4 pt-4">
      <div className="w-32 h-[1px] bg-[#8c927d]/20 relative">
         <motion.div initial={{ width: 0 }} animate={{ width: `${((index + 1) / QUESTIONS.length) * 100}%` }} className="h-full bg-[#8c927d]" />
      </div>
      <span className="text-[10px] tracking-[0.5em] text-stone-300 font-sans font-bold uppercase">Archive {String(index + 1).padStart(2, '0')}</span>
    </div>
    <div className="flex-grow flex flex-col items-center justify-center space-y-12 px-6 py-10">
      <div className="space-y-8 max-w-3xl text-center">
        <h2 className="text-2xl md:text-3xl font-light text-[#3d3d3d] leading-[1.8] tracking-wide">{QUESTIONS[index].text}</h2>
        <div className="space-y-2 opacity-60">
          <p className="text-stone-400 italic text-sm font-light tracking-wide">{QUESTIONS[index].quote}</p>
          <p className="text-stone-300 text-[10px] tracking-widest uppercase font-light">{QUESTIONS[index].author}</p>
        </div>
      </div>
      <div className="w-full max-w-3xl">
        <textarea autoFocus value={answer} onChange={(e) => onUpdate(e.target.value)} placeholder="写下你的回答..."
          className="w-full bg-white/30 p-8 md:p-10 border border-[#8c927d]/10 rounded-[32px] focus:border-[#8c927d]/40 focus:bg-white/50 outline-none resize-none text-xl text-[#4a4a4a] placeholder:text-stone-200 font-serif leading-relaxed transition-all min-h-[250px] shadow-sm" />
      </div>
    </div>
    <div className="flex justify-between items-center py-6 px-4 text-stone-400 font-sans text-[10px] tracking-[0.3em] uppercase font-bold border-t border-stone-100/30">
      <button onClick={onBack} className="flex items-center gap-2 hover:text-[#8c927d] transition-colors group">
        <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> PREV
      </button>
      <div className="text-stone-300 flex items-center gap-2">Progress <span className="text-[#8c927d]">{index + 1}</span> / {QUESTIONS.length}</div>
      <button onClick={onNext} disabled={!answer.trim()} className={`flex items-center gap-2 transition-all group ${answer.trim() ? 'hover:text-[#8c927d] text-stone-500' : 'opacity-20 cursor-not-allowed'}`}>
        {isLast ? 'FINISH' : 'NEXT'} <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </motion.div>
);

// Added optional key prop to resolve TypeScript error in AnimatePresence
const SummaryPage = ({ answers, onAnalyze }: { answers: Answer[]; onAnalyze: () => void; key?: string }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col">
    {/* 顶部区域：包含标题和“灵魂生成”按钮 */}
    <div className="flex flex-col items-center text-center space-y-6 pt-4 mb-8">
      <div className="w-16 h-px bg-[#8c927d]/30"></div>
      <h2 className="text-3xl font-light tracking-[0.4em] text-[#3d3d3d]">记忆长卷</h2>
      <p className="text-[10px] tracking-[0.6em] text-stone-300 uppercase font-sans">Collected Memories of 2025</p>
      
      {/* 🚀 移动到这里的“灵魂生成”按钮 */}
      <button 
        onClick={onAnalyze} 
        className="mt-2 px-14 py-4 bg-[#3d3d3d] text-white text-[11px] tracking-[0.4em] uppercase font-bold hover:bg-[#8c927d] transition-all font-sans flex items-center gap-3 shadow-xl rounded-full no-print"
      >
        <Sparkles className="w-4 h-4" /> 灵魂生成
      </button>
    </div>

    {/* 中间滚动内容区域 */}
    <div className="flex-grow overflow-y-auto px-8 space-y-16 scrollbar-thin scrollbar-thumb-[#8c927d]/20 scrollbar-track-transparent">
      {answers.map((item) => (
        <div key={item.id} className="max-w-3xl mx-auto space-y-6 border-b border-stone-100/50 pb-12 last:border-0">
          <div className="flex items-center gap-4">
             <span className="text-[10px] font-sans font-bold text-[#8c927d]/40 tracking-widest uppercase">Archive {String(item.id).padStart(2, '0')}</span>
             <div className="h-px flex-grow bg-stone-100/50"></div>
          </div>
          <h3 className="text-xl font-medium text-stone-600 tracking-wide leading-relaxed">{item.question}</h3>
          <p className="text-[#3d3d3d] text-2xl font-light italic whitespace-pre-wrap leading-relaxed opacity-90">{item.answer || "（于沉默中留白）"}</p>
        </div>
      ))}
    </div>

    {/* 底部区域：仅保留下载归档按钮 */}
    <div className="flex justify-center items-center py-8 px-4 no-print border-t border-stone-100/30 mt-6">
      <button onClick={() => window.print()} className="flex items-center gap-2 text-stone-400 hover:text-[#8c927d] transition-all font-sans text-[11px] tracking-[0.2em] uppercase font-bold">
        <Printer className="w-4 h-4" /> 归档下载 (PDF)
      </button>
    </div>
  </motion.div>
);

const AnalysisStep = ({ title, subtitle, icon, content, onBack, onNext, nextLabel, customContent }: any) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="h-full flex flex-col">
    <div className="flex flex-col items-center text-center space-y-6 pt-4 mb-8">
      <div className="text-[#8c927d] opacity-50 mb-2">{icon}</div>
      <h2 className="text-2xl font-light tracking-[0.5em] text-[#3d3d3d] uppercase">{title}</h2>
      <p className="text-[10px] tracking-[0.6em] text-stone-300 uppercase font-sans font-bold">{subtitle}</p>
    </div>
    <div className="flex-grow flex flex-col items-center justify-center px-4 md:px-10 overflow-hidden">
      <div className="w-full max-w-4xl bg-white/20 backdrop-blur-md p-8 md:p-16 border border-white/60 rounded-[40px] shadow-[0_30px_80px_rgba(140,146,125,0.06)] flex flex-col max-h-[550px]">
        <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-[#8c927d]/20 pr-4">
          {customContent ? customContent : (
            <div className="text-[#4a4a4a] text-lg md:text-xl font-light leading-[2.4] text-center tracking-wide font-serif italic">
              {content}
            </div>
          )}
        </div>
      </div>
    </div>
    <div className="flex justify-between items-center py-10 px-4 no-print font-sans text-[11px] tracking-[0.4em] uppercase text-stone-400 font-bold border-t border-stone-50/50 mt-6">
      <button onClick={onBack} className="hover:text-[#8c927d] transition-colors flex items-center gap-2">
        <ChevronLeft className="w-4 h-4" /> PREV
      </button>
      <button onClick={onNext} className="hover:text-[#8c927d] transition-colors flex items-center gap-2">
        {nextLabel || 'NEXT'} <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  </motion.div>
);

// Added optional key prop to resolve TypeScript error in AnimatePresence
const AnalysisPage = ({ answers, onGlobalBack }: { answers: any[]; onGlobalBack: () => void }) => {
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState<{ portrait: string; keywords: string[]; letter: string } | null>(null);

  const cleanText = (text: string, prefixes: string[]) => {
    let cleaned = text.trim();
    prefixes.forEach(p => {
      const regex = new RegExp(`^(\\[${p}\\]|${p})[:：]?`, 'i');
      cleaned = cleaned.replace(regex, '').trim();
    });
    return cleaned;
  };

  useEffect(() => {
    const fetchAIResult = async () => {
      try {
        setLoading(true);
        const promptText = `
        作为一名深邃的心理学家与诗人，请阅读以下21个关于2025年的回答。
        请生成三部分内容，严格遵循要求：
        1. 禁止输出开场白、废话、以及类似“好的”、“这是评价”之类的 meta-talk。
        2. [板块1]：整体画像。约200字。直接深入挖掘对方的内在基调，富有文学性。
        3. [板块2]：年度关键词。提炼3-4个核心词。格式：每个词一行，关键词与描述之间用“：”分隔。不要加粗。
        4. [板块3]：私密书信。约350字。以第二人称“你”撰写。

        输出格式仅限：
        [板块1]
        内容...
        [板块2]
        关键词1：描述...
        关键词2：描述...
        [板块3]
        内容...

        回答内容：
          ${answers.map((a, i) => `Q${i + 1}: ${a.question}\n答：${a.answer}`).join('\n\n')}
        `;

        // @ts-ignore
        const ZHIPU_API_KEY = import.meta.env.VITE_ZHIPU_API_KEY;

        const response = await fetch("https://zhipu-proxy.minatomugino864.workers.dev/api/paas/v4/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${ZHIPU_API_KEY}`
          },
          body: JSON.stringify({
            model: "glm-4.7",
            messages: [{ role: "user", content: promptText }],
            thinking: { type: "enabled" },
            max_tokens: 4096,
            temperature: 0.8
          })
        });

        if (!response.ok) throw new Error("API请求失败");
        const data = await response.json();
        const fullText = data.choices[0].message.content || "";

        const p1 = fullText.match(/\[板块1\]([\s\S]*?)(?=\[板块2\]|$)/i)?.[1] || "";
        const p2 = fullText.match(/\[板块2\]([\s\S]*?)(?=\[板块3\]|$)/i)?.[1] || "";
        const p3 = fullText.match(/\[板块3\]([\s\S]*?)$/i)?.[1] || "";

        setAnalysis({
          portrait: cleanText(p1, ['板块1']),
          keywords: cleanText(p2, ['板块2']).split('\n').map(k => k.trim()).filter(Boolean),
          letter: cleanText(p3, ['板块3'])
        });
      } catch (error) {
        console.error("生成失败:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAIResult();
  }, [answers]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="max-w-2xl mx-auto p-6 space-y-8"
    >
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#8c927d]"></div>
          <p className="text-[#8c927d] animate-pulse">AI 正在深度思考你的 2025...</p>
        </div>
      ) : analysis ? (
        <>
          <section className="space-y-4">
            <h2 className="text-xs tracking-[0.2em] text-[#8c927d] uppercase border-b border-[#8c927d]/20 pb-2">Overall Portrait</h2>
            <p className="text-lg leading-relaxed text-slate-800 whitespace-pre-wrap">{analysis.portrait}</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xs tracking-[0.2em] text-[#8c927d] uppercase border-b border-[#8c927d]/20 pb-2">Keywords</h2>
            <div className="flex flex-wrap gap-3">
              {analysis.keywords.map((word, i) => (
                <span key={i} className="px-4 py-1.5 bg-[#8c927d]/10 text-[#8c927d] rounded-full text-sm font-medium">
                  {word}
                </span>
              ))}
            </div>
          </section>

          <section className="bg-white/40 p-8 rounded-3xl border border-[#8c927d]/10">
            <h2 className="text-xs tracking-[0.2em] text-[#8c927d] uppercase text-center mb-6">A Private Letter</h2>
            <p className="italic text-slate-700 leading-loose whitespace-pre-wrap text-center">{analysis.letter}</p>
          </section>

          <div className="flex justify-center pt-10">
            <button onClick={onGlobalBack} className="text-[#8c927d] text-sm hover:underline tracking-widest uppercase">
              Back to Start
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-20">
          <p>生成失败，请检查网络</p>
          <button onClick={onGlobalBack} className="mt-4 underline">返回重试</button>
        </div>
      )}
    </motion.div>
  );
};

const App = () => {
  const [state, setState] = useState(APP_STATE.INTRO);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>(QUESTIONS.map(q => ({ id: q.id, question: q.text, answer: '' })));

  const handleNext = () => {
    if (idx < QUESTIONS.length - 1) setIdx(i => i + 1);
    else setState(APP_STATE.SUMMARY);
  };

  const handleBack = () => {
    if (idx > 0) setIdx(i => i - 1);
    else setState(APP_STATE.INTRO);
  };

  const updateVal = (val: string) => {
    const next = [...answers];
    next[idx].answer = val;
    setAnswers(next);
  };

  return (
    <Layout>
      <AnimatePresence mode="wait">
        {state === APP_STATE.INTRO && <Intro key="i" onStart={() => setState(APP_STATE.QUIZ)} />}
        {state === APP_STATE.QUIZ && <Quiz key="q" index={idx} answer={answers[idx].answer} onUpdate={updateVal} onNext={handleNext} onBack={handleBack} isLast={idx === QUESTIONS.length - 1} />}
        {state === APP_STATE.SUMMARY && <SummaryPage key="s" answers={answers} onAnalyze={() => setState(APP_STATE.ANALYSIS)} />}
        {state === APP_STATE.ANALYSIS && <AnalysisPage key="a" answers={answers} onGlobalBack={() => setState(APP_STATE.SUMMARY)} />}
      </AnimatePresence>
    </Layout>
  );
};

createRoot(document.getElementById('root')!).render(<App />);
