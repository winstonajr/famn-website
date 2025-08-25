"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaBullseye, FaUsers, FaRegEye } from "react-icons/fa";
import Hero from "@/components/Hero";

// --- Sub-componentes para a página Sobre ---

const TimelineItem = ({
  year,
  title,
  children,
  align = "left",
}: {
  year: string;
  title: string;
  children: React.ReactNode;
  align?: "left" | "right";
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  const contentVariants: Variants = {
    hidden: { opacity: 0, x: align === "left" ? -50 : 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const yearVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.2 },
    },
  };

  const alignmentClasses =
    align === "left"
      ? "md:text-right md:pr-12"
      : "md:col-start-2 md:text-left md:pl-12";

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 items-center mb-16"
    >
      <motion.div
        className={`p-6 bg-white rounded-lg shadow-lg ${alignmentClasses}`}
        variants={contentVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <h3 className="text-2xl font-bold text-[#1A535C] font-sans mb-2">
          {title}
        </h3>
        <p className="text-[#333333]/80">{children}</p>
      </motion.div>
      <motion.div
        className={`absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#A8DADC] hidden md:block`}
      />
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2"
        variants={yearVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="w-24 h-24 bg-[#1A535C] rounded-full flex items-center justify-center text-white font-sans font-bold text-2xl shadow-xl">
          {year}
        </div>
      </motion.div>
    </div>
  );
};

// --- Variantes de Animação Globais ---
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// --- Componente Principal da Página Sobre ---
export default function Sobre() {
  return (
    <main className="overflow-hidden">
      {/* 1. Seção Hero da Página Sobre */}
      <Hero
        title="Nossa História, Nossa Luta"
        subtitle="Um coletivo de uns para muitos."
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Credimus perspicuitatem fundamentum esse omnis fiduciae."
      />

      {/* 2. Seção Linha do Tempo */}
      <section className="py-20 md:py-28 bg-[#F7F9FA]">
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A535C] font-sans">
              Nossa Trajetória
            </h2>
          </div>
          <TimelineItem year="2001" title="A Semente da Mudança">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </TimelineItem>
          <TimelineItem
            year="2009"
            title="Formalização e Primeiros Passos"
            align="right"
          >
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </TimelineItem>
          <TimelineItem year="2015" title="Anos de Resiliência">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </TimelineItem>
          <TimelineItem year="2018" title="O Renascimento" align="right">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </TimelineItem>
        </div>
      </section>

      {/* 3. Seção Missão, Visão e Valores */}
      <motion.section
        className="py-20 md:py-28 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="w-full h-80 md:h-full relative rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/images/default.png"
              alt="Equipe da FAMN planejando estratégias"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="text-left">
            <div className="flex items-start gap-6 mb-8">
              <div className="text-3xl text-[#4ECDC4] mt-1">
                <FaBullseye />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#1A535C] font-sans mb-2">
                  Nossa Missão
                </h3>
                <p className="text-lg text-[#333333]/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nostra missio est ut consociationes firmaremus, retis
                  solidarietatis mutuae creantes.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6 mb-8">
              <div className="text-3xl text-[#4ECDC4] mt-1">
                <FaRegEye />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#1A535C] font-sans mb-2">
                  Nossa Visão
                </h3>
                <p className="text-lg text-[#333333]/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Videmus futurum ubi omnes consociationes instrumenta
                  necessaria habent ad augendum.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="text-3xl text-[#4ECDC4] mt-1">
                <FaUsers />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#1A535C] font-sans mb-2">
                  Nossos Valores
                </h3>
                <p className="text-lg text-[#333333]/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Solidaritas, humanismus, cooperatio, et perspicuitas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 4. Seção de Liderança */}
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
              Liderança Estratégica
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Incontra
              ducatum nostrum.
            </p>
          </div>
          <div className="flex justify-center items-start gap-12 flex-wrap">
            <motion.div className="text-center" variants={sectionVariants}>
              <Image
                src="/images/default.png"
                alt="Foto de Diana Santos"
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="text-2xl font-bold text-[#1A535C] font-sans">
                Diana Santos
              </h3>
              <p className="font-semibold text-[#1A535C]/80">Presidente</p>
            </motion.div>
            <motion.div className="text-center" variants={sectionVariants}>
              <Image
                src="/images/default.png"
                alt="Foto de Alexander"
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="text-2xl font-bold text-[#1A535C] font-sans">
                Alexander (Xander 360)
              </h3>
              <p className="font-semibold text-[#1A535C]/80">Chanceler</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 5. Seção CTA Final */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A535C] font-sans">
            Veja Nosso Trabalho em Ação
          </h2>
          <p className="text-lg max-w-3xl mx-auto my-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut
            videas quomodo laboremus.
          </p>
          <Link
            href="/projetos"
            className="font-sans bg-[#4ECDC4] text-[#1A535C] font-bold py-4 px-8 rounded-full hover:bg-[#1A535C] hover:text-white transition-all text-lg"
          >
            Conheça Nossos Projetos
          </Link>
        </div>
      </section>
    </main>
  );
}
