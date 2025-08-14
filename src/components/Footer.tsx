"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const navLinks = [
    { title: "Sobre Nós", href: "/sobre" },
    { title: "Projetos", href: "/projetos" },
    { title: "Transparência", href: "/transparencia" },
    { title: "Parceiros", href: "/parceiros" },
    { title: "Contato", href: "/contato" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#1A535C] text-white py-12 mt-12 relative overflow-hidden">
      <motion.div
        className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo e descrição */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold mb-2">FAMN</h2>
          <p className="max-w-xs text-sm opacity-90">
            Solidariedade, humanismo e cooperação. Trabalhando para apoiar quem precisa.
          </p>
        </div>

        {/* Links */}
        <nav className="flex flex-col md:flex-row gap-4 text-center md:text-left">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="hover:text-[#4ECDC4] transition-colors"
            >
              {link.title}
            </Link>
          ))}
        </nav>

        {/* Botão de doação */}
        <div className="mt-4 md:mt-0">
          <Link
            href="/doar"
            className="bg-[#4ECDC4] text-[#1A535C] font-bold py-2 px-6 rounded-full hover:bg-white transition-colors"
          >
            Doe Agora
          </Link>
        </div>
      </motion.div>

      {/* Redes sociais */}
      <motion.div
        className="flex justify-center gap-6 mt-8 text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Link href="#"><FaFacebookF /></Link>
        <Link href="#"><FaInstagram /></Link>
        <Link href="#"><FaTwitter /></Link>
      </motion.div>

      {/* Voltar ao topo */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-[#4ECDC4] text-[#1A535C] p-3 rounded-full shadow-lg hover:bg-white transition-colors z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Voltar ao topo"
      >
        <FaArrowUp />
      </motion.button>

      {/* Copyright */}
      <div className="text-center mt-8 text-sm opacity-70">
        &copy; {new Date().getFullYear()} FAMN. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
