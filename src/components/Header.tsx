"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, Transition } from 'framer-motion';
import { useScrollDirection } from '@/hooks/useScrollDirection';

// --- Componente Principal do Header ---
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollDirection = useScrollDirection();
  const pathname = usePathname();

  const navLinks = [
    { title: "Sobre Nós", href: "/sobre" },
    { title: "Projetos", href: "/projetos" },
    { title: "Transparência", href: "/transparencia" },
    { title: "Parceiros", href: "/parceiros" },
    { title: "Contato", href: "/contato" },
  ];

  // Variantes de animação para o Header
  const headerVariants = {
    hidden: { y: '-100%' },
    visible: { y: '0%' },
  };

  // --- Variantes de Animação para o Menu Mobile ---
  const iconTransition: Transition = { duration: 0.3, type: 'spring', stiffness: 180, damping: 25 };
  const topIconVariants = { closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 9, width: '100%' } };
  const middleIconVariants = { closed: { opacity: 1, x: 0 }, open: { opacity: 0, x: -20 } };
  const bottomIconVariants = { closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -9, width: '100%' } };
  
  // Variantes de animação para o painel do menu
  const menuPanelVariants = { 
    hidden: { opacity: 0, y: "-20%" }, 
    visible: { opacity: 1, y: 0, transition: { when: "beforeChildren", staggerChildren: 0.05 } } 
  };

  const navItemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <>
      <motion.header 
        className="fixed w-full z-50 bg-[#1A535C]/90 backdrop-blur-sm shadow-lg"
        variants={headerVariants}
        animate={scrollDirection === 'down' && !isOpen ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      >
        <div className="container mx-auto flex justify-between items-center p-4 text-white">
          <Link href="/" className="text-2xl font-black tracking-tighter z-50">FAMN</Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link key={link.title} href={link.href} className={`font-sans transition-colors ${pathname === link.href ? 'text-[#4ECDC4] font-bold' : 'hover:text-[#4ECDC4]'}`}>
                {link.title}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
             <Link href="/doar" className="font-sans bg-[#4ECDC4] text-[#1A535C] font-bold py-2 px-4 rounded-full hover:bg-white transition-colors text-sm">Doe Agora</Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="z-50 relative w-7 h-6 flex flex-col justify-between" aria-label="Alternar Menu">
              <motion.div className="w-full h-0.5 bg-white rounded-full origin-center" variants={topIconVariants} animate={isOpen ? 'open' : 'closed'} transition={iconTransition} />
              <motion.div className="w-10/12 h-0.5 bg-white rounded-full" variants={middleIconVariants} animate={isOpen ? 'open' : 'closed'} transition={{ duration: 0.2 }} />
              <motion.div className="w-8/12 h-0.5 bg-white rounded-full origin-center" variants={bottomIconVariants} animate={isOpen ? 'open' : 'closed'} transition={iconTransition} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuPanelVariants}
            className="fixed top-0 left-0 w-full z-40 md:hidden pt-20 pb-8 bg-[#1A535C]/95 backdrop-blur-lg rounded-b-2xl shadow-2xl"
          >
            <nav className="flex flex-col items-center space-y-8">
              {navLinks.map((link) => (
                <motion.div key={link.title} variants={navItemVariants}>
                  <Link href={link.href} className={`text-2xl font-sans font-bold text-white transition-colors ${pathname === link.href ? 'text-[#4ECDC4]' : 'hover:text-[#4ECDC4]'}`} onClick={() => setIsOpen(false)}>
                    {link.title}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div variants={navItemVariants} className="mt-12 flex flex-col items-center">
               <Link href="/doar" className="font-sans bg-[#4ECDC4] text-[#1A535C] font-bold py-3 px-8 rounded-full hover:bg-white transition-colors text-lg" onClick={() => setIsOpen(false)}>Doe Agora</Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header;
