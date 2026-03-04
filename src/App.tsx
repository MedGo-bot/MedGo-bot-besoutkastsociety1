import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, Instagram, Linkedin, Mail, Search, Globe, Sparkles, Loader2 } from 'lucide-react';
import { COLUMNS } from './constants';
import { generateSocietyImage } from './services/geminiService';
import { AboutPage } from './components/AboutPage';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'about'>('home');
  
  // Image Generation States
  const [legendaryImage, setLegendaryImage] = useState<string | null>(null);
  const [forgeImage, setForgeImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<{ [key: string]: boolean }>({});
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [showSitemap, setShowSitemap] = useState(false);

  const handleGenerate = async (section: 'legendary' | 'forge') => {
    setIsGenerating(prev => ({ ...prev, [section]: true }));
    const prompt = section === 'legendary' 
      ? `A high-contrast, black-and-white editorial photograph, Vogue-style. A female athlete is captured mid-air on a skateboard performing a technical trick in a brutalist concrete skate park.
         The Gear: She wears Bes Outkast technical apparel: a matte-black, cropped windbreaker made of a high-sheen technical silk with a structured, architectural collar. On the left sleeve, a small, embossed rubberized "B.O.S." logo is visible. Her trousers are high-waisted, utility-style "techwear" joggers with laser-cut ventilation patterns and minimalist cargo pockets. She wears sleek, carbon-fiber reinforced low-profile sneakers.
         Composition: Asymmetrical. The background shows blurred industrial stadium lights, sharp concrete bowls, and skate park geometry. Harsh, cinematic lighting creates deep shadows on the fabric’s texture. Film grain finish. The mood is "High-End Grit."`
      : `A dramatic photographic portrait of a male subject with a powerful athlete’s physique in a low-lit, industrial training environment.
         The Gear: He wears a Bes Outkast compression base-layer in deep "Grit Grey" featuring an anatomical "muscle-mapping" design. The fabric has a subtle, honeycomb hex-pattern texture. A vertical, minimalist "BES OUTKAST SOCIETY" wordmark runs in stark white down the center of the chest in a condensed sans-serif font. He wears heavy-duty, matte-black wrist wraps with a subtle red "Dare" tag.
         Details: A translucent technical blueprint grid is overlaid on his form. The lighting is sharp and singular, catching the sweat on the technical fabric and his skin. The mood is disciplined, elite, and mathematically precise.`;
    
    const imageUrl = await generateSocietyImage(prompt);
    if (imageUrl) {
      if (section === 'legendary') setLegendaryImage(imageUrl);
      else setForgeImage(imageUrl);
    }
    setIsGenerating(prev => ({ ...prev, [section]: false }));
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Auto-generate images on mount
    handleGenerate('legendary');
    handleGenerate('forge');

    // Newsletter Modal Trigger
    const timer = setTimeout(() => {
      setShowNewsletter(true);
    }, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const edgeOfTheWorld = COLUMNS.find(c => c.title === "Edge of the World");
  const blackManOnTheRun = COLUMNS.find(c => c.title === "Black Man on the Run");
  const fashionWithJuan = COLUMNS.find(c => c.title === "Fashion with Juan");
  const wealthProtocol = COLUMNS.find(c => c.title === "The Wealth Protocol");
  const tacticalAdvantage = COLUMNS.find(c => c.title === "The Tactical Advantage");
  const innerCircle = COLUMNS.find(c => c.title === "The Inner Circle");
  const whiskeyAngels = COLUMNS.find(c => c.title === "Whiskey with the Angels");
  const legendaryRule = COLUMNS.find(c => c.title === "Legendary Rule");
  const askFred = COLUMNS.find(c => c.url.includes("ask-fred"));
  const theForge = COLUMNS.find(c => c.url.includes("the-forge"));

  const tickerItems = [
    "Politico Discord with Brandon Prescott",
    "Southern Grit with Jimi Holler",
    "The Forge",
    "Legendary Rule",
    "The Digital Arena with Tammy Gale",
    "Run Out Boyz"
  ];

  return (
    <div className="min-h-screen bg-paper selection:bg-ink selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-paper/95 backdrop-blur-md border-b border-ink' : 'bg-transparent'
      }`}>
        <div className="border-b border-ink py-4 px-8">
          <div className="max-w-[1600px] mx-auto flex justify-between items-center">
            <button onClick={() => setIsMenuOpen(true)} className="flex items-center gap-2 nav-link">
              <Menu className="w-4 h-4" />
              <span>Menu</span>
            </button>
            
            <div 
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setCurrentView('home')}
            >
              <div className="text-2xl sm:text-4xl font-serif tracking-[0.2em] text-ink font-bold uppercase">
                Bes Outkast Society
              </div>
            </div>

            <div className="flex items-center gap-6">
              <button 
                onClick={() => setShowNewsletter(true)}
                className="bg-ink text-paper px-6 py-2 text-[10px] font-display uppercase tracking-widest hover:bg-muted transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-paper z-[60] flex flex-col"
          >
            <div className="flex justify-between items-center p-8 border-b border-ink">
              <div className="text-xl font-serif tracking-widest font-bold uppercase">Bes Outkast Society</div>
              <button onClick={() => setIsMenuOpen(false)} className="text-ink p-2">
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-4xl mx-auto py-24 px-8 flex flex-col gap-8">
                {[
                  { name: 'The News magazine', url: 'https://besoutkastsociety.substack.com' },
                  { name: 'Columns', url: 'https://besoutkastsociety.substack.com/archive' },
                  { name: 'Private Archive', url: 'https://besoutkastsociety.substack.com/archive?sort=top' },
                  { name: 'About Society', action: () => { setCurrentView('about'); setIsMenuOpen(false); } },
                  { name: 'Contact', url: 'mailto:tracydwilson@besheanwe.com' }
                ].map((item, i) => (
                  'url' in item ? (
                    <motion.a
                      key={item.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-5xl sm:text-7xl font-serif text-ink hover:italic transition-all border-b border-ink/10 pb-4"
                    >
                      {item.name}
                    </motion.a>
                  ) : (
                    <motion.button
                      key={item.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      onClick={item.action}
                      className="text-5xl sm:text-7xl font-serif text-ink hover:italic transition-all border-b border-ink/10 pb-4 text-left w-full"
                    >
                      {item.name}
                    </motion.button>
                  )
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {currentView === 'home' ? (
          <motion.main 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-[100px]"
          >
        {/* HERO SECTION: The Art of Extreme Persuasion */}
        <section className="relative h-[90vh] w-full overflow-hidden border-b border-ink">
          <img 
            src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1920&q=90" 
            alt="Luxury Surfing" 
            className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-ink/30" />
          
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="max-w-5xl"
            >
              <span className="font-display text-xs uppercase tracking-[0.5em] text-paper mb-6 block font-bold">The Quarterly News magazine of Distinction</span>
              <h1 className="text-6xl md:text-9xl font-serif italic text-paper leading-[0.9] mb-8">
                The Art of <br /> Extreme Persuasion
              </h1>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12">
                <div className="text-left border-l border-paper/30 pl-6">
                  <span className="font-display text-[10px] uppercase tracking-widest text-paper/60 block mb-2">Featured Column</span>
                  <h4 className="text-paper font-serif text-xl italic">Black Man on the Run</h4>
                </div>
                <a 
                  href="https://besoutkastsociety.substack.com/archive"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-paper text-ink px-10 py-4 font-display text-xs uppercase tracking-[0.3em] font-bold hover:bg-ink hover:text-paper transition-all duration-500 no-underline"
                >
                  Enter the Archive
                </a>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-12 left-12 flex items-center gap-4">
            <div className="w-12 h-[1px] bg-paper/50" />
            <span className="font-display text-[10px] uppercase tracking-[0.4em] text-paper/80 font-bold">Since 2003</span>
          </div>

          <div className="absolute bottom-12 right-12 flex items-center gap-8 text-paper/60">
            <span className="font-display text-[10px] uppercase tracking-[0.2em]">Vol. 23 / No. 04</span>
            <div className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-paper" />
              <div className="w-2 h-2 rounded-full border border-paper" />
              <div className="w-2 h-2 rounded-full border border-paper" />
            </div>
          </div>
        </section>

        {/* SECTION A & B: Bento Grid + Sidebar */}
        <section className="px-8 py-12 border-b border-ink">
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 border-ink border">
            
            {/* Bento Grid */}
            <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 border-r border-ink">
              
              {/* Cell 1: Edge of the World (Large) */}
              <div className="md:col-span-2 md:row-span-2 border-b border-ink relative group overflow-hidden h-[600px] md:h-auto">
                <img 
                  src={edgeOfTheWorld?.image} 
                  alt="Edge of the World" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-ink/20 group-hover:bg-transparent transition-colors" />
                <div className="absolute bottom-12 left-12 text-paper">
                  <a 
                    href={edgeOfTheWorld?.url || "https://substack.com/@besoutkastsociety"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group/link block no-underline"
                  >
                    <span className="font-display text-xs uppercase tracking-[0.3em] mb-4 block font-bold hover:text-[#888] transition-colors duration-300">Edge of the World</span>
                    <h3 className="text-5xl md:text-7xl font-serif italic leading-tight hover:text-[#888] transition-colors duration-300">The Ultimate <br /> Outdoorsman</h3>
                  </a>
                </div>
              </div>

              {/* Cell 2: Black Man on the Run (Small) */}
              <div className="border-b border-ink border-l border-ink relative group overflow-hidden h-[300px]">
                <img 
                  src={blackManOnTheRun?.image} 
                  alt="Black Man on the Run" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-ink/20 group-hover:bg-transparent transition-colors" />
                <div className="absolute bottom-6 left-6 text-paper">
                  <a 
                    href={blackManOnTheRun?.url || "https://substack.com/@besoutkastsociety"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="no-underline"
                  >
                    <span className="font-display text-[10px] uppercase tracking-widest mb-2 block font-bold hover:text-[#888] transition-colors duration-300">Black Man on the Run</span>
                    <h3 className="text-xl font-serif italic hover:text-[#888] transition-colors duration-300">Global Perspective</h3>
                  </a>
                </div>
              </div>

              {/* Cell 3: Motto (Center Block) */}
              <div className="bg-paper flex items-center justify-center p-8 border-b border-ink border-l border-ink h-[300px]">
                <div className="double-border text-center w-full h-full flex items-center justify-center bg-white">
                  <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-[0.4em] leading-tight text-red-600">
                    FOR THE LOVE <br /> OF THE DARE
                  </h2>
                </div>
              </div>

              {/* Cell 4: Fashion with Juan (Medium) */}
              <div className="md:col-span-3 relative group overflow-hidden h-[400px] border-t border-ink">
                <img 
                  src={fashionWithJuan?.image} 
                  alt="Fashion with Juan" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-ink/10 group-hover:bg-transparent transition-colors" />
                <div className="absolute inset-0 flex flex-col justify-end p-12 text-paper bg-gradient-to-t from-ink/60 to-transparent">
                  <a 
                    href={fashionWithJuan?.url || "https://substack.com/@besoutkastsociety"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="no-underline"
                  >
                    <span className="font-display text-xs uppercase tracking-[0.3em] mb-4 block font-bold hover:text-[#888] transition-colors duration-300">Fashion with Juan</span>
                    <h3 className="text-4xl font-serif italic mb-4 hover:text-[#888] transition-colors duration-300">The Technical Standard</h3>
                  </a>
                  <p className="text-sm font-sans max-w-xl opacity-90 leading-relaxed">
                    A definitive playbook on situational attire, featuring Bes Outkast Society technical apparel.
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION B: Vogue Index Sidebar */}
            <aside className="lg:col-span-3 bg-grey p-8 sticky top-[100px] h-fit">
              <div className="border-b border-ink pb-4 mb-8">
                <h2 className="font-display text-sm font-bold tracking-[0.2em] uppercase">Bes Outkast Society: The Index</h2>
              </div>

              <div className="space-y-12">
                <div>
                  <span className="font-display text-[10px] uppercase tracking-widest text-muted mb-4 block border-b border-ink/10 pb-2">Department: Operational Intel</span>
                  <ul className="space-y-6">
                    <li className="group/sidebar">
                      <a 
                        href={wealthProtocol?.url || "https://substack.com/@besoutkastsociety"} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block no-underline"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif text-lg italic leading-tight group-hover/sidebar:text-[#888] transition-colors duration-300">"The Wealth Protocol"</h4>
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover/sidebar:opacity-100 group-hover/sidebar:translate-x-1 transition-all duration-300 text-[#888]" />
                        </div>
                        <span className="text-[10px] font-display uppercase tracking-widest text-muted group-hover/sidebar:text-[#888]/60 transition-colors duration-300">with Craig Wright</span>
                      </a>
                    </li>
                    <li className="group/sidebar">
                      <a 
                        href={tacticalAdvantage?.url || "https://substack.com/@besoutkastsociety"} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block no-underline"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif text-lg italic leading-tight group-hover/sidebar:text-[#888] transition-colors duration-300">"The Tactical Advantage"</h4>
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover/sidebar:opacity-100 group-hover/sidebar:translate-x-1 transition-all duration-300 text-[#888]" />
                        </div>
                        <span className="text-[10px] font-display uppercase tracking-widest text-muted group-hover/sidebar:text-[#888]/60 transition-colors duration-300">with Seth Green</span>
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <span className="font-display text-[10px] uppercase tracking-widest text-muted mb-4 block border-b border-ink/10 pb-2">Department: The Inner Circle</span>
                  <ul className="space-y-6">
                    <li className="group/sidebar">
                      <a 
                        href={innerCircle?.url || "https://substack.com/@besoutkastsociety"} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block no-underline"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif text-lg italic leading-tight group-hover/sidebar:text-[#888] transition-colors duration-300">"The Inner Circle"</h4>
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover/sidebar:opacity-100 group-hover/sidebar:translate-x-1 transition-all duration-300 text-[#888]" />
                        </div>
                        <span className="text-[10px] font-display uppercase tracking-widest text-muted group-hover/sidebar:text-[#888]/60 transition-colors duration-300">with Ms. Wilson</span>
                      </a>
                    </li>
                    <li className="group/sidebar">
                      <a 
                        href={askFred?.url || "https://besoutkastsociety.substack.com/s/ask-fred"} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block no-underline"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif text-lg italic leading-tight group-hover/sidebar:text-[#888] transition-colors duration-300">"Ask Fred"</h4>
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover/sidebar:opacity-100 group-hover/sidebar:translate-x-1 transition-all duration-300 text-[#888]" />
                        </div>
                        <span className="text-[10px] font-display uppercase tracking-widest text-muted group-hover/sidebar:text-[#888]/60 transition-colors duration-300">(The Protocol Agent)</span>
                      </a>
                    </li>
                    <li className="group/sidebar">
                      <a 
                        href={whiskeyAngels?.url || "https://substack.com/@besoutkastsociety"} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block no-underline"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif text-lg italic leading-tight group-hover/sidebar:text-[#888] transition-colors duration-300">"Whiskey with the Angels"</h4>
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover/sidebar:opacity-100 group-hover/sidebar:translate-x-1 transition-all duration-300 text-[#888]" />
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* SECTION C: Flash News Ticker */}
        <section className="bg-ink py-6 overflow-hidden border-b border-ink">
          <div className="flex whitespace-nowrap ticker-scroll">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <div key={i} className="flex items-center mx-12">
                <span className="text-paper font-display text-xl font-bold uppercase tracking-[0.3em]">
                  {item}
                </span>
                <div className="w-2 h-2 bg-paper mx-12 rotate-45" />
              </div>
            ))}
          </div>
        </section>

        {/* SECTION D: Foundational Pillars */}
        <section className="px-8 py-24 bg-paper">
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 border-ink border">
            
            {/* Cell 1: Legendary Rule (Dark Mode) */}
            <div className="bg-ink text-paper p-12 md:p-24 flex flex-col justify-center border-r border-ink">
              <div className="flex justify-between items-start mb-6">
                <span className="font-display text-[10px] uppercase tracking-[0.4em] text-muted block">Legacy & Performance</span>
                <button 
                  onClick={() => handleGenerate('legendary')}
                  disabled={isGenerating['legendary']}
                  className="flex items-center gap-2 text-[10px] font-display uppercase tracking-widest text-paper/40 hover:text-paper transition-colors disabled:opacity-50"
                >
                  {isGenerating['legendary'] ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                  {isGenerating['legendary'] ? 'Generating...' : 'Generate with Gemini'}
                </button>
              </div>
              <a 
                href={legendaryRule?.url || "https://substack.com/@besoutkastsociety"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="no-underline group/pillar"
              >
                <h2 className="text-5xl md:text-7xl font-serif italic mb-8 group-hover/pillar:text-[#888] transition-colors duration-300">Legendary Rule</h2>
              </a>
              <div className="aspect-video overflow-hidden mb-8 bg-muted/10 relative">
                <img 
                  src={legendaryImage || "https://images.unsplash.com/photo-1528629202440-2db0a9695611?auto=format&fit=crop&w=800&q=80"} 
                  alt="Extreme Sports" 
                  className={`w-full h-full object-cover grayscale transition-opacity duration-500 ${isGenerating['legendary'] ? 'opacity-50' : 'opacity-100'}`}
                  referrerPolicy="no-referrer"
                />
                {isGenerating['legendary'] && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-paper" />
                  </div>
                )}
              </div>
              <p className="text-xl font-serif italic text-paper/60 leading-relaxed mb-8">
                The Standard of Human Performance. A deep dive into the world of extreme sports and the relentless pursuit of excellence.
              </p>
              <a 
                href={legendaryRule?.url || "https://besoutkastsociety.substack.com/s/legendary-rule"}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link text-paper border-b border-paper/30 pb-1 w-fit no-underline"
              >
                Explore X-Games Coverage
              </a>
            </div>

            {/* Cell 2: The Forge (Light Mode) */}
            <div className="bg-paper p-12 md:p-24 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute inset-0 blueprint-grid pointer-events-none" />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <span className="font-display text-[10px] uppercase tracking-[0.4em] text-muted block">Optimization</span>
                  <button 
                    onClick={() => handleGenerate('forge')}
                    disabled={isGenerating['forge']}
                    className="flex items-center gap-2 text-[10px] font-display uppercase tracking-widest text-ink/40 hover:text-ink transition-colors disabled:opacity-50"
                  >
                    {isGenerating['forge'] ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                    {isGenerating['forge'] ? 'Generating...' : 'Generate with Gemini'}
                  </button>
                </div>
                <a 
                  href={theForge?.url || "https://besoutkastsociety.substack.com/s/the-forge"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="no-underline group/pillar"
                >
                  <h2 className="text-5xl md:text-7xl font-serif italic mb-8 group-hover/pillar:text-[#888] transition-colors duration-300">The Forge</h2>
                </a>
                <div className="aspect-video overflow-hidden mb-8 border border-ink/10 bg-grey relative">
                  <img 
                    src={forgeImage || "https://images.unsplash.com/photo-1534394416940-fa3c29d47de8?auto=format&fit=crop&w=800&q=80"} 
                    alt="Architecture of Self" 
                    className={`w-full h-full object-cover transition-opacity duration-500 ${isGenerating['forge'] ? 'opacity-50' : 'opacity-100'}`}
                    referrerPolicy="no-referrer"
                  />
                  {isGenerating['forge'] && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="w-8 h-8 animate-spin text-ink" />
                    </div>
                  )}
                </div>
                <p className="text-xl font-serif italic text-muted leading-relaxed mb-8">
                  Architecture of the Self. Mind and body optimization for the modern visionary. Building the foundation of greatness.
                </p>
                <a 
                  href={theForge?.url || "https://besoutkastsociety.substack.com/s/the-forge"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link border-b border-ink pb-1 w-fit no-underline"
                >
                  Begin the Optimization
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION E: The Awakening */}
        <section className="px-8 py-12 border-b border-ink">
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 border-ink border">
            <a 
              href="https://besoutkastsociety.substack.com/archive"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:col-span-8 border-r border-ink p-12 md:p-24 flex flex-col justify-center no-underline group/awakening"
            >
              <span className="font-display text-xs uppercase tracking-[0.5em] text-muted mb-8 block font-bold">The Awakening</span>
              <h2 className="text-6xl md:text-8xl font-serif italic leading-[0.9] mb-12 group-hover/awakening:text-[#888] transition-colors">
                A Shift in <br /> Perspective
              </h2>
              <p className="text-2xl font-serif italic text-muted max-w-2xl leading-relaxed mb-12">
                "The dare is not just an action; it is a state of being. To awaken is to see the world not as it is, but as it could be through the lens of absolute discipline."
              </p>
              <div className="flex gap-12">
                <div className="flex flex-col">
                  <span className="text-[10px] font-display uppercase tracking-widest text-muted mb-2">Issue</span>
                  <span className="text-xl font-serif italic text-ink">No. 04</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-display uppercase tracking-widest text-muted mb-2">Focus</span>
                  <span className="text-xl font-serif italic text-ink">The Meta-Physical</span>
                </div>
              </div>
            </a>
            <div className="lg:col-span-4">
              <div className="feature-box">
                <img 
                  src="https://images.unsplash.com/photo-1551028150-64b9f398f678?auto=format&fit=crop&w=800&q=80" 
                  alt="The Awakening" 
                  referrerPolicy="no-referrer"
                />
                <div className="feature-overlay">
                  <span className="text-[10px] font-display uppercase tracking-[0.4em] mb-4 block font-bold">Featured Intel</span>
                  <h2>The <br /> Awakening</h2>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
      <footer className="bg-paper border-t border-ink pt-24 pb-12 px-8">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col items-center mb-24">
            <a 
              href="https://besoutkastsociety.substack.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="no-underline hover:text-[#888] transition-colors duration-300"
            >
              <div className="text-4xl sm:text-6xl font-serif tracking-[0.3em] font-bold uppercase text-center">Bes Outkast Society</div>
            </a>
            <div className="flex gap-12 mt-12">
              {['Instagram', 'LinkedIn', 'Twitter', 'Facebook'].map(social => (
                <a key={social} href="#" className="nav-link">{social}</a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24 border-t border-ink pt-12">
            <div className="md:col-span-1">
              <a 
                href="https://besoutkastsociety.substack.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="no-underline group/footer-col"
              >
                <h4 className="nav-link text-muted mb-6 group-hover/footer-col:text-[#888] transition-colors duration-300">Bes Outkast Society</h4>
              </a>
              <p className="text-sm font-serif italic text-muted leading-relaxed">
                A quarterly News magazine of distinction, exploring the intersection of extreme performance, high culture, and visionary leadership.
              </p>
            </div>
            <div>
              <h4 className="nav-link text-muted mb-6">Society</h4>
              <ul className="space-y-3 text-sm font-display uppercase tracking-widest font-bold">
                <li><button onClick={() => setCurrentView('about')} className="hover:text-muted transition-colors uppercase">About Society</button></li>
                <li><a href="mailto:tracydwilson@besheanwe.com" className="hover:text-muted transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-muted transition-colors">Concierge</a></li>
                <li><a href="#" className="hover:text-muted transition-colors">Advertising</a></li>
              </ul>
            </div>
            <div>
              <div className="no-underline group/footer-col">
                <h4 className="nav-link text-muted mb-6 group-hover/footer-col:text-[#888] transition-colors duration-300">Legal</h4>
              </div>
              <ul className="space-y-3 text-sm font-display uppercase tracking-widest font-bold">
                <li><a href="#" className="hover:text-muted transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-muted transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-muted transition-colors">Ethics</a></li>
                <li><button onClick={() => setShowSitemap(true)} className="hover:text-muted transition-colors uppercase">Site Map</button></li>
              </ul>
            </div>
          </div>

          <div className="text-center pt-12 border-t border-ink">
            <span className="text-[10px] font-display uppercase tracking-[0.4em] text-muted">
              © 2026 Bes Outkast Society. Established 2003.
            </span>
          </div>
        </div>
      </footer>
    </motion.main>
      ) : (
        <AboutPage key="about" onBack={() => setCurrentView('home')} />
      )}
    </AnimatePresence>

      {/* Newsletter Modal */}
      <AnimatePresence>
        {showNewsletter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-ink/40 backdrop-blur-[8px]"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white max-w-md w-full p-12 relative shadow-2xl"
            >
              <button 
                onClick={() => setShowNewsletter(false)}
                className="absolute top-6 right-6 text-ink hover:opacity-50 transition-opacity"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center">
                <h2 className="text-3xl font-serif font-bold tracking-widest uppercase mb-4 text-ink">
                  The Inner Circle
                </h2>
                <p className="font-display text-[10px] uppercase tracking-[0.2em] text-muted mb-8 leading-relaxed">
                  Weekly intelligence on the dare. <br /> Join the Bes Outkast Society briefing on Substack.
                </p>

                <div className="space-y-4">
                  <a 
                    href="https://besoutkastsociety.substack.com/subscribe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-ink text-white py-4 font-display text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-muted transition-colors text-center no-underline"
                  >
                    Secure Access via Substack
                  </a>
                  <p className="text-[9px] font-display uppercase tracking-widest text-muted/50">
                    Join 5,000+ members in the private briefing.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Site Map Modal */}
      <AnimatePresence>
        {showSitemap && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-paper overflow-y-auto"
          >
            <div className="min-h-screen p-8 md:p-24">
              <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-24 border-b border-ink pb-8">
                  <h2 className="text-4xl md:text-6xl font-serif italic">Site Map</h2>
                  <button onClick={() => setShowSitemap(false)} className="text-ink p-2 hover:rotate-90 transition-transform">
                    <X className="w-12 h-12" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                  <div className="space-y-12">
                    <section>
                      <h3 className="font-display text-xs uppercase tracking-[0.4em] text-muted mb-6 border-b border-ink/10 pb-2">Main Navigation</h3>
                      <ul className="space-y-4 text-2xl font-serif italic">
                        <li><button onClick={() => { setCurrentView('home'); setShowSitemap(false); }} className="hover:text-[#888] transition-colors text-left">The News magazine</button></li>
                        <li><a href="https://besoutkastsociety.substack.com/archive?sort=top" target="_blank" rel="noopener noreferrer" className="hover:text-[#888] transition-colors">Private Archive</a></li>
                        <li><button onClick={() => { setCurrentView('about'); setShowSitemap(false); }} className="hover:text-[#888] transition-colors text-left">About Society</button></li>
                        <li><a href="mailto:tracydwilson@besheanwe.com" className="hover:text-[#888] transition-colors">Contact</a></li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="font-display text-xs uppercase tracking-[0.4em] text-muted mb-6 border-b border-ink/10 pb-2">Legal & Protocol</h3>
                      <ul className="space-y-4 text-sm font-display uppercase tracking-widest font-bold">
                        <li><a href="#" className="hover:text-muted transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-muted transition-colors">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-muted transition-colors">Ethics Statement</a></li>
                      </ul>
                    </section>
                  </div>

                  <div className="md:col-span-2">
                    <section>
                      <h3 className="font-display text-xs uppercase tracking-[0.4em] text-muted mb-6 border-b border-ink/10 pb-2">Editorial Columns</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                        {COLUMNS.slice(0, 10).map((col) => (
                          <a 
                            key={col.title} 
                            href={col.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group cursor-pointer no-underline block"
                          >
                            <h4 className="font-serif text-xl italic group-hover:text-[#888] transition-colors text-ink">{col.title}</h4>
                            <p className="text-[10px] font-display uppercase tracking-widest text-muted mt-1">{col.category}</p>
                          </a>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>

                <div className="mt-32 pt-12 border-t border-ink text-center">
                  <div className="text-xl font-serif tracking-widest font-bold uppercase mb-4">Bes Outkast Society</div>
                  <p className="text-[10px] font-display uppercase tracking-[0.4em] text-muted">
                    Established 2003. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
