import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-paper text-ink pt-32 pb-24 px-8"
    >
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 font-display text-xs uppercase tracking-[0.3em] mb-16 hover:text-muted transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to News magazine
        </button>

        <header className="mb-24">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-xs uppercase tracking-[0.5em] text-muted mb-6 block font-bold"
          >
            The Foundation
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl md:text-9xl font-serif italic leading-[0.85] tracking-tighter"
          >
            About the <br /> Society
          </motion.h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-40">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-12"
          >
            <p className="text-3xl md:text-4xl font-serif italic leading-tight text-ink">
              Bes Outkast Society is not merely a publication; it is a sanctuary for the discerning, a laboratory for persuasion, and a chronicle of distinction.
            </p>
            <p className="text-lg leading-relaxed text-ink/70 font-light">
              Established in 2003, we have spent over two decades documenting the intersection of culture, strategy, and the extreme. Our mission is to provide the "Intel" necessary for navigating a world that demands both grit and grace.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-12"
          >
            <div className="border-l border-ink/20 pl-12 py-4">
              <h3 className="font-display text-xs uppercase tracking-[0.3em] font-bold mb-6 text-muted">The Mandate</h3>
              <p className="text-base leading-relaxed text-ink/80 italic font-serif">
                "To identify the patterns of success where others see chaos. To master the art of persuasion in its most extreme forms. To maintain the standards of a quarterly News magazine in a world of fleeting attention."
              </p>
            </div>
            <div className="border-l border-ink/20 pl-12 py-4">
              <h3 className="font-display text-xs uppercase tracking-[0.3em] font-bold mb-6 text-muted">The Collective</h3>
              <p className="text-base leading-relaxed text-ink/80">
                Our contributors are architects of influence, athletes of the mind, and veterans of the cultural arena. We do not just report; we refine.
              </p>
            </div>
          </motion.div>
        </div>

        <section className="border-t border-ink pt-24 mb-40">
          <h2 className="text-5xl font-serif italic mb-20">The Protocols</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                num: "01",
                title: "Discretion",
                desc: "We value the private briefing over the public spectacle. Our most potent insights are reserved for the Inner Circle."
              },
              {
                num: "02",
                title: "Distinction",
                desc: "In every endeavor, we seek the mark of quality. Mediocrity is the only unforgivable sin in the Society."
              },
              {
                num: "03",
                title: "Dare",
                desc: "The Society was founded on the principle of the 'Dare'—the willingness to push beyond the comfortable boundaries of the status quo."
              }
            ].map((protocol, i) => (
              <motion.div 
                key={protocol.num}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                <span className="text-6xl font-serif italic block mb-6 text-ink/20">{protocol.num}</span>
                <h4 className="font-display text-xs uppercase tracking-[0.3em] font-bold mb-4">{protocol.title}</h4>
                <p className="text-sm text-ink/60 leading-relaxed">
                  {protocol.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <footer className="text-center border-t border-ink/10 pt-32">
          <div className="text-3xl font-serif tracking-[0.3em] text-ink font-bold uppercase mb-6">
            Bes Outkast Society
          </div>
          <p className="text-[10px] font-display uppercase tracking-[0.5em] text-muted">
            Established 2003. The Art of Extreme Persuasion.
          </p>
        </footer>
      </div>
    </motion.div>
  );
};
