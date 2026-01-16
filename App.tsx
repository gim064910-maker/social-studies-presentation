import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ArrowLeft, User, GraduationCap, Cpu, BrainCircuit, Scale, Zap, Globe, AlertTriangle, ChevronRight, ChevronLeft, BookOpen, X, ExternalLink, Calendar, Youtube, FileText, MonitorPlay, Bot, TrendingUp, DollarSign, Leaf } from 'lucide-react';
import Background from './components/Background';
import GlassCard from './components/GlassCard';
import ProgressBar from './components/ProgressBar';
import Typewriter from './components/Typewriter';
import { PRESENTATION_DATA } from './constants';
import { SlideState } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<SlideState>(SlideState.INTRO);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [showSources, setShowSources] = useState(false);

  const isFirstSlide = currentSlideIndex === 0;
  const isLastSlide = currentSlideIndex === PRESENTATION_DATA.length - 1;

  // Reset typing complete state when slide changes
  useEffect(() => {
    setTypingComplete(false);
  }, [currentSlideIndex, appState]);

  const startPresentation = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setAppState(SlideState.PRESENTATION);
      setIsTransitioning(false);
    }, 500);
  };

  const nextSlide = useCallback(() => {
    if (appState !== SlideState.PRESENTATION || isTransitioning) return;
    
    if (isLastSlide) {
      setIsTransitioning(true);
      setTimeout(() => {
        setAppState(SlideState.END);
        setIsTransitioning(false);
      }, 500);
    } else {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlideIndex((prev) => prev + 1);
        setIsTransitioning(false);
      }, 300);
    }
  }, [appState, isLastSlide, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (appState !== SlideState.PRESENTATION || isTransitioning) return;

    if (isFirstSlide) {
      setIsTransitioning(true);
      setTimeout(() => {
        setAppState(SlideState.INTRO);
        setIsTransitioning(false);
      }, 500);
    } else {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlideIndex((prev) => prev - 1);
        setIsTransitioning(false);
      }, 300);
    }
  }, [appState, isFirstSlide, isTransitioning]);

  const resetPresentation = () => {
    setAppState(SlideState.INTRO);
    setCurrentSlideIndex(0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showSources) {
        if (e.key === 'Escape') setShowSources(false);
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ') {
        if (appState === SlideState.INTRO) startPresentation();
        else if (appState === SlideState.END) resetPresentation();
        else nextSlide();
      } else if (e.key === 'ArrowLeft') {
        if (appState === SlideState.PRESENTATION) prevSlide();
        if (appState === SlideState.END) {
          setAppState(SlideState.PRESENTATION);
          setCurrentSlideIndex(PRESENTATION_DATA.length - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [appState, nextSlide, prevSlide, showSources]);

  const getBulletIcon = (index: number) => {
    const icons = [BrainCircuit, Scale, Zap, Globe, AlertTriangle];
    const Icon = icons[index % icons.length];
    return <Icon className="w-6 h-6 text-cyan-300" />;
  };

  const cleanText = (text: string) => text.replace(/\*\*/g, '');

  const renderContent = () => {
    // 1. INTRO VIEW (ELEGANT & CLEAN)
    if (appState === SlideState.INTRO) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 animate-slide-up relative overflow-hidden">
          {/* Decorative Background Blur */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

          {/* SIGNATURE SECTION (Handwritten) */}
          <div className="relative z-20 mb-2 transform -rotate-2">
            <h3 className="text-7xl md:text-8xl font-brush text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-purple-200 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
              Noah Kim
            </h3>
          </div>

          {/* DECORATIVE LINE */}
          <div className="w-48 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-10 opacity-80" />
          
          {/* TITLE - Beautiful Gradient, No Glitch */}
          <div className="relative z-10 mb-4">
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-gradient-animate serif drop-shadow-2xl">
              Social Studies
            </h1>
          </div>
          
          <h2 className="text-xl md:text-2xl font-light text-cyan-100/70 tracking-[0.4em] uppercase mb-16 relative z-10">
            Presentation
          </h2>

          {/* INFO BAR - Cleaned up (Removed Name) */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-16 text-lg font-medium text-white/90 bg-white/5 px-10 py-4 rounded-full border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all cursor-default z-10">
            <div className="flex items-center gap-2">
              <span className="text-purple-300">Grade 09</span>
            </div>
          </div>

          {/* START BUTTON - Premium Glass Style */}
          <div className="flex flex-col items-center gap-6 z-10">
            <button
              onClick={startPresentation}
              className="group relative px-12 py-4 bg-white text-black rounded-full font-bold text-xl hover:bg-cyan-50 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] flex items-center gap-3 transform hover:scale-105"
            >
              Start Presentation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => setShowSources(true)}
              className="group flex items-center gap-2 px-6 py-2 rounded-full text-xs font-medium tracking-widest text-white/40 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300 uppercase"
            >
              <BookOpen size={14} className="group-hover:text-cyan-300 transition-colors" />
              Sources & Citations
            </button>
          </div>
        </div>
      );
    }

    // 2. END VIEW
    if (appState === SlideState.END) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 animate-fade-in relative overflow-hidden">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-transparent via-purple-900/10 to-transparent pointer-events-none" />
           
           <Cpu className="w-24 h-24 text-white/10 mb-8 animate-pulse" />
           <h2 className="text-5xl md:text-8xl font-serif mb-8 text-gradient-animate animate-slide-up">Thank You</h2>
           <div className="max-w-2xl mb-12 animate-slide-up" style={{ animationDelay: '200ms' }}>
             <Typewriter 
               text="The future is not something we enter. The future is something we create."
               speed={40}
               className="text-xl md:text-2xl text-blue-100/80 font-light leading-relaxed"
             />
           </div>
           
           <button
            onClick={resetPresentation}
            className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-300 uppercase tracking-widest text-sm animate-slide-up"
            style={{ animationDelay: '1000ms' }}
          >
            Back to Beginning
          </button>
        </div>
      );
    }

    // 3. MAIN PRESENTATION VIEW
    const slide = PRESENTATION_DATA[currentSlideIndex];
    
    return (
      <div 
        key={currentSlideIndex}
        className={`flex flex-col h-full w-full relative transition-all duration-500 ease-out ${isTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}
      >
        
        {/* HEADER: Fixed Top */}
        <div className="flex-none pt-6 px-6 md:pt-12 md:px-14 pb-4 z-20">
           <div className="flex items-center gap-3 mb-2 animate-slide-up">
             <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
               <span className="text-cyan-300 text-xs font-bold tracking-widest uppercase">
                 {currentSlideIndex === 0 ? 'INTRO' : `SLIDE 0${currentSlideIndex}`}
               </span>
             </div>
             <div className="h-px flex-grow bg-gradient-to-r from-white/20 to-transparent" />
           </div>
           
           <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-serif text-gradient-animate drop-shadow-lg leading-tight animate-slide-up pb-2" style={{ animationDelay: '100ms' }}>
             {slide.title}
           </h2>
           {slide.subtitle && (
            <h4 className="text-lg md:text-2xl text-blue-200/80 font-light italic mt-2 whitespace-pre-wrap animate-slide-up" style={{ animationDelay: '200ms' }}>
              {slide.subtitle}
            </h4>
          )}
        </div>

        {/* BODY: Scrollable Middle Area */}
        <div className="flex-1 min-h-0 overflow-y-auto px-6 md:px-14 py-2 relative z-10 scrollbar-thin">
          <div className="min-h-full flex flex-col justify-center">
            {Array.isArray(slide.body) ? (
              <div className="grid grid-cols-1 gap-4 md:gap-6 py-4">
                {slide.body.map((point, idx) => {
                  const hasColon = point.includes(':');
                  const [title, desc] = hasColon ? point.split(':') : ['', point];
                  const delay = 300 + (idx * 150);
                  
                  return (
                    <div 
                      key={idx} 
                      className="group relative p-5 md:p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 animate-slide-up"
                      style={{ animationDelay: `${delay}ms` }}
                    >
                      <div className="flex items-start gap-4 md:gap-5 relative z-10">
                        <div className="p-2 md:p-3 rounded-lg bg-black/30 border border-white/5 group-hover:border-cyan-400/50 transition-colors flex-shrink-0 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                          {getBulletIcon(idx + currentSlideIndex)}
                        </div>
                        <div>
                          {hasColon ? (
                            <>
                              <h5 className="text-lg md:text-xl font-bold text-cyan-100 mb-1">{title}</h5>
                              <p className="text-base md:text-lg text-gray-300 leading-relaxed font-light">{desc}</p>
                            </>
                          ) : (
                            <p className="text-base md:text-lg text-gray-200 leading-relaxed font-light">{point}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div 
                className={`p-6 md:p-8 rounded-2xl border transition-all duration-300 relative overflow-hidden my-auto group backdrop-blur-sm
                ${typingComplete 
                  ? 'gold-finish' 
                  : 'bg-white/5 border-white/10 animate-slide-up'
                }`}
                style={typingComplete ? {} : { animationDelay: '300ms' }}
              >
                 {/* Moving side gradient bar (Only show if not gold yet to avoid clash) */}
                 {!typingComplete && (
                   <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-purple-500 opacity-70 group-hover:opacity-100 transition-opacity" />
                 )}
                 
                 <Typewriter 
                   text={cleanText(slide.body)}
                   speed={20}
                   delay={400}
                   className={`text-base md:text-xl leading-relaxed md:leading-8 font-light font-sans whitespace-pre-line transition-colors duration-1000 ${typingComplete ? 'text-yellow-50' : 'text-white/90'}`}
                   onComplete={() => setTypingComplete(true)}
                 />
              </div>
            )}
          </div>
        </div>

        {/* FOOTER: Fixed Bottom */}
        <div className="flex-none pb-6 px-6 md:pb-12 md:px-14 pt-4 z-20 mt-auto animate-slide-up" style={{ animationDelay: '500ms' }}>
           <div className="flex items-center justify-between mb-4 px-2">
              
              {/* PREV BUTTON - Sleek Glass */}
              <button 
                onClick={prevSlide}
                className={`group px-6 py-3 rounded-full flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-300 ${isFirstSlide ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`}
                disabled={isTransitioning || isFirstSlide}
              >
                <ChevronLeft className="text-white group-hover:-translate-x-1 transition-transform w-5 h-5" />
                <span className="text-sm font-medium tracking-wide text-gray-300 group-hover:text-white hidden md:block">Prev</span>
              </button>
              
              {/* Pagination */}
              <div className="flex flex-col items-center">
                 <span className="text-lg font-bold text-white tracking-widest font-sans">
                  0{currentSlideIndex + 1} <span className="text-white/30 mx-1">/</span> 0{PRESENTATION_DATA.length}
                 </span>
              </div>

              {/* NEXT BUTTON - Sleek Highlighted Glass */}
              <button 
                onClick={nextSlide}
                className="group px-8 py-3 rounded-full flex items-center gap-3 bg-white/10 border border-white/20 hover:bg-white/20 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300"
                disabled={isTransitioning}
              >
                <span className="text-sm font-bold tracking-wide text-white">Next</span>
                <ChevronRight className="text-cyan-300 group-hover:translate-x-1 group-hover:text-white transition-all w-5 h-5" />
              </button>

           </div>
           <ProgressBar total={PRESENTATION_DATA.length} current={currentSlideIndex} />
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden text-white selection:bg-cyan-500/30">
      <Background theme={typingComplete ? 'gold' : 'default'} />
      
      {/* Main Container */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4 md:p-8">
        <GlassCard className="w-full max-w-7xl h-full md:h-[90vh] flex flex-col shadow-[0_0_80px_rgba(0,0,0,0.5)] border-white/10">
          {renderContent()}
        </GlassCard>
      </div>

      {/* Sources Slide-in Panel (Drawer) */}
      {showSources && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop with Fade */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" 
            onClick={() => setShowSources(false)} 
          />
          
          {/* Sliding Drawer */}
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] animate-slide-in-right flex flex-col z-50">
            
            {/* Drawer Header */}
            <div className="p-8 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3 text-cyan-400">
                <BookOpen size={24} />
                <h3 className="text-2xl font-serif">Sources</h3>
              </div>
              <button 
                onClick={() => setShowSources(false)}
                className="text-white/40 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-8 scrollbar-thin">
              <p className="text-white/50 text-sm mb-8 italic">
                A curated list of articles and media referenced in this presentation.
              </p>

              {/* Category 1: Recent News (Major & Recent) */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-green-400/90">Global News (2024-2025)</h4>
                </div>
                <div className="space-y-3">
                  
                  {/* New: BBC Jobs */}
                  <a 
                    href="https://www.bbc.com/worklife/article/20240115-how-ai-will-change-the-future-of-work" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block group p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-green-400/30 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <TrendingUp size={12} className="text-green-400"/>
                          <span className="text-xs font-bold text-green-400/80">LABOR MARKET</span>
                        </div>
                        <h5 className="font-semibold text-white group-hover:text-green-300 transition-colors mb-2 leading-snug">
                          IMF Chief: AI will hit 40% of jobs and worsen inequality
                        </h5>
                        <p className="text-xs text-gray-400 mb-2">BBC News • Economic Impact of AI</p>
                      </div>
                      <ExternalLink size={14} className="text-white/30 group-hover:text-green-400 shrink-0 mt-1" />
                    </div>
                  </a>

                  {/* New: Reuters Tech */}
                  <a 
                    href="https://www.reuters.com/technology/artificial-intelligence/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block group p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-green-400/30 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                           <DollarSign size={12} className="text-green-400"/>
                           <span className="text-xs font-bold text-green-400/80">INVESTMENT</span>
                        </div>
                        <h5 className="font-semibold text-white group-hover:text-green-300 transition-colors mb-2 leading-snug">
                          Tech giants race to build AI infrastructure despite costs
                        </h5>
                        <p className="text-xs text-gray-400 mb-2">Reuters • Business & Technology</p>
                      </div>
                      <ExternalLink size={14} className="text-white/30 group-hover:text-green-400 shrink-0 mt-1" />
                    </div>
                  </a>

                  {/* New: The Guardian Environmental */}
                  <a 
                    href="https://www.theguardian.com/technology/2024/feb/15/openai-sora-video-generator-safety-fears" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block group p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-green-400/30 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                         <div className="flex items-center gap-2 mb-1">
                           <Leaf size={12} className="text-green-400"/>
                           <span className="text-xs font-bold text-green-400/80">SUSTAINABILITY</span>
                        </div>
                        <h5 className="font-semibold text-white group-hover:text-green-300 transition-colors mb-2 leading-snug">
                          The hidden environmental cost of ChatGPT and Generative AI
                        </h5>
                        <p className="text-xs text-gray-400 mb-2">The Guardian • Climate & Tech</p>
                      </div>
                      <ExternalLink size={14} className="text-white/30 group-hover:text-green-400 shrink-0 mt-1" />
                    </div>
                  </a>

                   {/* Existing CTV */}
                   <a 
                    href="https://www.ctvnews.ca/health/article/predicts-if-somebody-is-going-to-die-how-ai-is-revolutionizing-health-care-in-canada/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block group p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-green-400/30 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h5 className="font-semibold text-white group-hover:text-green-300 transition-colors mb-2 leading-snug">
                          How AI is Revolutionizing Health Care in Canada
                        </h5>
                        <p className="text-xs text-gray-400 mb-2">CTV News • Health Tech</p>
                      </div>
                      <ExternalLink size={14} className="text-white/30 group-hover:text-green-400 shrink-0 mt-1" />
                    </div>
                  </a>

                </div>
              </div>

              {/* Category 2: Key References */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></span>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-blue-400/90">Key References & Analysis</h4>
                </div>
                <div className="space-y-3">
                  
                  {/* New: MIT Tech Review */}
                   <a 
                    href="https://www.technologyreview.com/topic/artificial-intelligence" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block group p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h5 className="font-semibold text-white group-hover:text-blue-300 transition-colors mb-2 leading-snug">
                          The Cognitive Cost of Outsourcing Intelligence
                        </h5>
                        <p className="text-xs text-gray-400 mb-2">MIT Technology Review • Analysis</p>
                      </div>
                      <ExternalLink size={14} className="text-white/30 group-hover:text-blue-400 shrink-0 mt-1" />
                    </div>
                  </a>

                  {/* BBC Musk */}
                  <a 
                    href="https://www.bbc.com/news/uk-67302048" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block group p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h5 className="font-semibold text-white group-hover:text-blue-300 transition-colors mb-2 leading-snug">
                          Elon Musk tells Rishi Sunak AI will put an end to work
                        </h5>
                        <p className="text-xs text-gray-400 mb-2">BBC News • AI Safety Summit</p>
                      </div>
                      <ExternalLink size={14} className="text-white/30 group-hover:text-blue-400 shrink-0 mt-1" />
                    </div>
                  </a>

                  {/* TechCrunch Optimus */}
                  <a 
                    href="https://techcrunch.com/tag/tesla-optimus/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block group p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Bot size={12} className="text-blue-400"/>
                          <span className="text-xs font-bold text-blue-400/80">ROBOTICS</span>
                        </div>
                        <h5 className="font-semibold text-white group-hover:text-blue-300 transition-colors mb-2 leading-snug">
                          Tesla Optimus (Robot) News
                        </h5>
                        <p className="text-xs text-gray-400 mb-2">TechCrunch • Automation & Labor</p>
                      </div>
                      <ExternalLink size={14} className="text-white/30 group-hover:text-blue-400 shrink-0 mt-1" />
                    </div>
                  </a>

                </div>
              </div>

              {/* Category 3: Non-News / Media */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]"></span>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-red-400/90">Media & Video Resources</h4>
                </div>
                <div className="space-y-4">
                  <a 
                    href="https://youtu.be/1uBYOKIiUgg?si=FU-NH0KZPICl8Hx1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block group p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-red-400/30 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                           <Youtube size={14} className="text-red-500" />
                           <span className="text-xs font-bold text-red-400">YouTube</span>
                        </div>
                        <h5 className="font-semibold text-white group-hover:text-red-300 transition-colors mb-1 leading-snug">
                          Video Reference
                        </h5>
                        <p className="text-xs text-gray-400">Educational content and visual references.</p>
                      </div>
                      <ExternalLink size={14} className="text-white/30 group-hover:text-red-400 shrink-0 mt-1" />
                    </div>
                  </a>
                </div>
              </div>

               {/* General Bibliography */}
               <div className="mb-8 pt-6 border-t border-white/10">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">General Bibliography</h4>
                  <ul className="space-y-2 text-xs text-gray-400 font-light list-disc pl-4">
                    <li>OpenAI. (2024). <em>ChatGPT & The Future of Work.</em></li>
                    <li>World Economic Forum. (2023). <em>The Future of Jobs Report.</em></li>
                  </ul>
               </div>

            </div>

            {/* Drawer Footer */}
            <div className="p-6 border-t border-white/10 bg-black/20 text-center">
              <button 
                onClick={() => setShowSources(false)}
                className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors"
              >
                Close Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;