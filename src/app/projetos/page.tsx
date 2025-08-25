"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaUsers, FaSeedling, FaChartBar, FaArrowRight } from "react-icons/fa";
import Hero from "@/components/Hero";

// --- Sub-componentes para a página Projetos ---

const AreaCard = ({
  icon: Icon,
  title,
  children,
  href,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  href: string;
}) => (
  <motion.div
    className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col group relative overflow-hidden"
    variants={itemVariants}
  >
    <div className="absolute -bottom-12 -right-12 bg-[#A8DADC]/20 w-32 h-32 rounded-full transition-transform duration-500 group-hover:scale-[10]"></div>
    <div className="relative z-10">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#1A535C] text-white text-3xl">
        <Icon />
      </div>
      <h3 className="text-2xl font-bold text-[#1A535C] font-sans mb-3">
        {title}
      </h3>
      <p className="mb-8 text-[#333333]/90">{children}</p>
      <Link
        href={href}
        className="font-sans text-[#1A535C] font-bold mt-auto group-hover:text-white transition-colors duration-300"
      >
        Ver Projetos{" "}
        <FaArrowRight className="inline ml-1 transition-transform group-hover:translate-x-1" />
      </Link>
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

// --- Componente Principal da Página Projetos ---
export default function Projetos() {
  const { ref: refModelo, inView: inViewModelo } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <main className="overflow-hidden">
      {/* 1. Seção Hero da Página Projetos */}

      <Hero
        title="Nosso Trabalho em Ação"
        subtitle="Um coletivo de uns para muitos."
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Credimus perspicuitatem fundamentum esse omnis fiduciae."
      />

      {/* 2. Seção "Nosso Modelo" */}
      <motion.section
        ref={refModelo}
        className="py-20 md:py-28 bg-white"
        initial="hidden"
        animate={inViewModelo ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A535C] font-sans">
              Como Potencializamos o Impacto
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-[#333333]/80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nostrum
              exemplar in tribus columnis fundamentalibus consistit.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <motion.div className="text-center" variants={itemVariants}>
              <div className="text-5xl text-[#4ECDC4] mb-4">1.</div>
              <h3 className="text-2xl font-bold text-[#1A535C] font-sans mb-3">
                Seleção e Apoio
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Eligimus consociationes cum magno potentia.
              </p>
            </motion.div>
            <motion.div className="text-center" variants={itemVariants}>
              <div className="text-5xl text-[#4ECDC4] mb-4">2.</div>
              <h3 className="text-2xl font-bold text-[#1A535C] font-sans mb-3">
                Fortalecimento e Estrutura
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praebemus instrumenta et auxilium legale.
              </p>
            </motion.div>
            <motion.div className="text-center" variants={itemVariants}>
              <div className="text-5xl text-[#4ECDC4] mb-4">3.</div>
              <h3 className="text-2xl font-bold text-[#1A535C] font-sans mb-3">
                Conexão e Escala
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Connectimus cum sponsoribus ad augendum impulsum.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 3. Seção Portfólio de Frentes de Atuação */}
      <motion.section
        className="py-20 md:py-28 bg-[#F7F9FA]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A535C] font-sans">
              Nossas Frentes de Atuação
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-[#333333]/80">
              Através de nossas associações filiadas, cobrimos áreas cruciais
              para o desenvolvimento social sustentável.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AreaCard
              icon={FaSeedling}
              title="Desenvolvimento Humano"
              href="/projetos/desenvolvimento"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. A pueris
              per ludos usque ad iuvenes per artem.
            </AreaCard>
            <AreaCard
              icon={FaUsers}
              title="Apoio a Grupos Vulneráveis"
              href="/projetos/apoio"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auxilium
              praebemus iis qui ex carcere exeunt et aliis.
            </AreaCard>
            <AreaCard
              icon={FaChartBar}
              title="Ciência e Inovação Social"
              href="/projetos/ciencia"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fovemus
              investigationem et patentes ad progressionem socialem.
            </AreaCard>
          </div>
        </div>
      </motion.section>

      {/* 4. Seção de Destaque (Case de Sucesso) */}
      <motion.section
        className="py-20 md:py-28 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="w-full h-80 md:h-96 relative rounded-lg overflow-hidden shadow-xl"
            variants={itemVariants}
          >
            <Image
              src="/images/default.png"
              alt="Projeto de sucesso apoiado pela FAMN"
              layout="fill"
              objectFit="cover"
            />
          </motion.div>
          <motion.div
            className="text-center md:text-left"
            variants={itemVariants}
          >
            <p className="font-sans font-bold text-[#4ECDC4] mb-2">
              PROJETO EM DESTAQUE
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A535C] font-sans mb-6">
              Lorem Ipsum Dolor Sit
            </h2>
            <p className="text-lg md:text-xl text-[#333333]/80 mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Haec
              consociatio, cum nostro auxilio, suum impulsum duplicavit in sex
              mensibus.
            </p>
            <Link
              href="/projetos/destaque"
              className="font-sans bg-[#1A535C] text-white font-bold py-3 px-6 rounded-full hover:bg-[#4ECDC4] hover:text-[#1A535C] transition-all"
            >
              Leia o Case de Sucesso
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* 5. Seção CTA Final */}
      <section className="bg-[#F7F9FA] py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid md:grid-cols-2 gap-8 items-center bg-[#1A535C] text-white p-12 rounded-xl shadow-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionVariants}
          >
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold font-sans">
                Faça Parte Deste Movimento
              </h2>
              <p className="text-lg mt-4 text-white/80">
                Seja uma empresa parceira ou uma associação filiada. Juntos,
                nosso impacto é maior.
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-center md:justify-end items-center gap-4">
              <Link
                href="/doar"
                className="w-full md:w-auto text-center font-sans bg-[#4ECDC4] text-[#1A535C] font-bold py-4 px-8 rounded-full hover:bg-white transition-all text-lg"
              >
                Seja um Parceiro
              </Link>
              <Link
                href="/contato"
                className="w-full md:w-auto text-center font-sans text-white font-bold py-4 px-8 rounded-full bg-[#1A535C]/50 hover:bg-white/20 transition-colors text-lg"
              >
                Filie-se a Nós
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
