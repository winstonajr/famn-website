"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { animate } from "framer-motion";
import Hero from "@/components/Hero";
import {
  FaShieldAlt,
  FaHandshake,
  FaBalanceScale,
  FaArrowRight,
} from "react-icons/fa";

const ValueCard = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => (
  <motion.div className="text-center p-6" variants={itemVariants}>
    <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg">
      <Icon className="text-4xl text-[#1A535C]" />
    </div>
    <h3 className="text-2xl font-bold text-[#1A535C] font-sans mb-3">
      {title}
    </h3>
    <p className="text-[#333333]/80">{children}</p>
  </motion.div>
);

const LutaCard = ({
  title,
  children,
  href,
}: {
  title: string;
  children: React.ReactNode;
  href: string;
}) => (
  <motion.div
    className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col group relative overflow-hidden"
    variants={itemVariants}
  >
    <div className="absolute -bottom-12 -right-12 bg-[#4ECDC4]/20 w-32 h-32 rounded-full transition-transform duration-500 group-hover:scale-[10]"></div>
    <div className="relative z-10">
      <h3 className="text-2xl font-bold text-[#1A535C] font-sans mb-3">
        {title}
      </h3>
      <p className="mb-8 text-[#333333]/90">{children}</p>
      <Link
        href={href}
        className="font-sans text-[#1A535C] font-bold mt-auto  transition-colors duration-300"
      >
        Saber mais{" "}
        <FaArrowRight className="inline ml-1 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  </motion.div>
);

const LeaderCard = ({
  imgSrc,
  name,
  role,
  quote,
}: {
  imgSrc: string;
  name: string;
  role: string;
  quote: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      className="text-center relative overflow-hidden rounded-lg"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      variants={itemVariants}
    >
      <Image
        src={imgSrc}
        alt={`Foto de ${name}`}
        width={200}
        height={200}
        className="rounded-full mx-auto mb-4 grayscale hover:grayscale-0 transition-all duration-300"
      />
      <h3 className="text-xl font-bold text-[#1A535C] font-sans">{name}</h3>
      <p className="font-semibold text-[#1A535C]/80">{role}</p>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-[#1A535C]/90 text-white p-4 flex items-center justify-center rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="font-serif italic text-center">{quote}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

function Counter({
  from,
  to,
  label,
}: {
  from: number;
  to: number;
  label: string;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration: 2.5,
        onUpdate(value) {
          const element = document.getElementById(label);
          if (element) {
            element.textContent = Math.round(value).toString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, from, to, label]);

  return (
    <div ref={ref} className="text-center">
      <span className="text-5xl md:text-6xl font-black text-[#4ECDC4] font-sans">
        +<span id={label}>{from}</span>
      </span>
      <p className="text-lg text-white/80 mt-2">{label}</p>
    </div>
  );
}

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

// --- Componente Principal da Página Home ---
export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* 1. Seção Hero */}
      <Hero
        title="Nascidos da Luta. Movidos pela Justiça."
        subtitle="Fundação Fundo de Amparo à Miséria Nacional"
        description="Qualquer um pode fazer a diferença. A cidadania pelo cidadão."
        buttonText="Conheça Nossa Luta"
        buttonLink="/sobre"
        backgroundImage="/"
      />

      {/* 2. Seção Missão e História */}
      <div className="relative">
        <motion.section
          className="py-20 md:py-28"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="text-center md:text-left"
              variants={itemVariants}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A535C] font-sans mb-6">
                Forjados na Resiliência
              </h2>
              <p className="text-lg md:text-xl text-[#333333]/80 mb-6">
                Desde 2001, a FAMN é mais que uma ONG: é um movimento. Uma
                jornada que começou no combate à corrupção, enfrentou
                adversidades e renasceu ainda mais forte, sempre com o objetivo
                de lutar por políticas públicas corretas e dar voz a quem mais
                precisa.
              </p>
              <Link
                href="/sobre"
                className="font-sans text-[#1A535C] font-bold hover:text-[#4ECDC4] transition-colors text-lg"
              >
                Nossa Trajetória Completa →
              </Link>
            </motion.div>
            <motion.div
              className="w-full h-80 md:h-96 relative rounded-lg overflow-hidden shadow-xl"
              variants={itemVariants}
            >
              <Image
                src="/default.png"
                alt="Voluntários da FAMN em ação na comunidade"
                layout="fill"
                objectFit="cover"
              />
            </motion.div>
          </div>
        </motion.section>

        {/* 3. Seção de Impacto (Sobreposta) */}
        <div className="container mx-auto px-4 relative -mb-24 z-10">
          <motion.div
            className="bg-[#1A535C] py-12 md:py-20 text-white rounded-xl shadow-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionVariants}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <Counter from={0} to={500} label="Famílias Apoiadas" />
              <Counter from={0} to={200} label="Jovens Capacitados" />
              <Counter from={0} to={150} label="Voluntários Ativos" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* 4. Seção de Valores */}
      <motion.section
        className="pt-48 pb-20 md:pb-28 bg-[#F7F9FA]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A535C] font-sans">
              O Que Nos Move
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <ValueCard icon={FaShieldAlt} title="Coragem e Luta">
              Enfrentamos as causas da miséria e da corrupção com a seriedade e
              a determinação que elas exigem.
            </ValueCard>
            <ValueCard icon={FaHandshake} title="Solidariedade e Cooperação">
              Acreditamos no humanismo e na união como as principais ferramentas
              para a transformação social.
            </ValueCard>
            <ValueCard icon={FaBalanceScale} title="Justiça e Transparência">
              Nossa gestão é um livro aberto. A confiança de nossos apoiadores é
              nosso bem mais precioso.
            </ValueCard>
          </div>
        </div>
      </motion.section>

      {/* 5. Seção "Nossas Lutas" */}
      <motion.section
        className="py-20 md:py-28 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A535C] font-sans">
              Nossas Frentes de Batalha
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg">
              Lutamos em múltiplas frentes, apoiando da geração de renda à
              pesquisa científica.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <LutaCard
              title="Desenvolvimento Humano"
              href="/projetos/desenvolvimento"
            >
              Apoiamos desde o desporto para crianças até a capacitação
              profissional para jovens, gerando oportunidades reais.
            </LutaCard>
            <LutaCard title="Apoio a Grupos Vulneráveis" href="/projetos/apoio">
              Oferecemos suporte a egressos do sistema prisional, pessoas com
              doenças crônicas e em tratamento de vícios.
            </LutaCard>
            <LutaCard title="Ciência e Tecnologia" href="/projetos/ciencia">
              Incentivamos a pesquisa e o desenvolvimento de projetos e patentes
              como ferramentas de transformação social.
            </LutaCard>
          </div>
        </div>
      </motion.section>

      {/* 6. Seção de Liderança */}
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
              As Pessoas Por Trás da Luta
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg">
              Pessoas apaixonadas e comprometidas com a causa social.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <LeaderCard
              name="Diana Santos"
              role="Presidente"
              imgSrc="/default.png"
              quote="Nosso foco é o desenvolvimento social e a capacitação profissional de quem mais precisa."
            />
            <LeaderCard
              name="Alexander (Xander 360)"
              role="Chanceler"
              imgSrc="/default.png"
              quote="Acreditamos na reintegração social e em novas oportunidades para todos."
            />
            <LeaderCard
              name="Marcelo de Souza"
              role="Fundador e Idealizador"
              imgSrc="/default.png"
              quote="A resiliência é a força motriz que nos permite continuar a luta."
            />
          </div>
        </div>
      </motion.section>

      {/* 7. Seção CTA Final */}
      <section className="bg-white py-20 md:py-28">
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
                Doe amor, colha transformação!
              </h2>
              <p className="text-lg mt-4 text-white/80">
                Sua ajuda, seja através de doação ou tempo, é o que move nossa
                luta. Juntos, somos a resposta.
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-center md:justify-end items-center gap-4">
              <Link
                href="/doar"
                className="w-full md:w-auto text-center font-sans bg-[#4ECDC4] text-[#1A535C] font-bold py-4 px-8 rounded-full hover:bg-white transition-all text-lg"
              >
                Quero Doar
              </Link>
              <Link
                href="/contato"
                className="w-full md:w-auto text-center font-sans text-white font-bold py-4 px-8 rounded-full bg-[#1A535C]/50 hover:bg-white/20 transition-colors text-lg"
              >
                Seja Voluntário
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
