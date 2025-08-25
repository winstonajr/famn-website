"use client";

import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import Hero from "@/components/Hero";

// --- Sub-componentes para a página Contato ---

const ContactInfoCard = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => (
  <motion.div className="flex items-start gap-6" variants={itemVariants}>
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#A8DADC] text-[#1A535C] text-3xl flex-shrink-0">
      <Icon />
    </div>
    <div>
      <h3 className="text-2xl font-bold text-[#1A535C] font-sans mb-1">
        {title}
      </h3>
      <div className="text-lg text-[#333333]/80">{children}</div>
    </div>
  </motion.div>
);

// --- Variantes de Animação Globais ---
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 },
  },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// --- Componente Principal da Página Contato ---
export default function Contato() {
  const { ref: refContent, inView: inViewContent } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <main className="overflow-hidden">
      {/* 1. Seção Hero */}
      <Hero
        title="Vamos Conversar"
        subtitle="Um coletivo de uns para muitos."
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Credimus perspicuitatem fundamentum esse omnis fiduciae."
      />

      {/* 2. Seção de Contato Principal */}
      <motion.section
        ref={refContent}
        className="py-20 md:py-28 bg-white"
        initial="hidden"
        animate={inViewContent ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
          {/* Coluna da Esquerda: Informações */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A535C] font-sans mb-8">
              Nossos Canais
            </h2>
            <div className="space-y-10">
              <ContactInfoCard icon={FaMapMarkerAlt} title="Nosso Escritório">
                <p>Lorem Ipsum Dolor, 123</p>
                <p>Sit Amet, Consectetur - SP</p>
              </ContactInfoCard>
              <ContactInfoCard icon={FaEnvelope} title="E-mail">
                <p>lorem@ipsumdolor.com</p>
              </ContactInfoCard>
              <ContactInfoCard icon={FaPhoneAlt} title="Telefone">
                <p>(11) 98765-4321</p>
              </ContactInfoCard>
            </div>
          </motion.div>

          {/* Coluna da Direita: Formulário */}
          <motion.div
            className="bg-[#F7F9FA] p-8 md:p-12 rounded-lg shadow-lg"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold text-[#1A535C] font-sans mb-6">
              Envie uma Mensagem
            </h2>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-lg font-semibold text-[#1A535C] mb-2"
                >
                  Seu Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-lg font-semibold text-[#1A535C] mb-2"
                >
                  Seu E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-lg font-semibold text-[#1A535C] mb-2"
                >
                  Assunto
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-lg font-semibold text-[#1A535C] mb-2"
                >
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full font-sans bg-[#1A535C] text-white font-bold py-4 px-8 rounded-full hover:bg-[#4ECDC4] hover:text-[#1A535C] transition-all text-lg"
                >
                  Enviar Mensagem
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.section>

      {/* 3. Seção do Mapa */}
      <section className="bg-gray-200 h-96">
        {/* Placeholder para um mapa interativo, como Google Maps */}
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          <p className="text-2xl font-bold">[Mapa de Localização]</p>
        </div>
      </section>
    </main>
  );
}
