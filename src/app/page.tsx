"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { animate } from "framer-motion";
import Hero from "@/components/Hero";
import { FaUsers, FaChartLine, FaHandshake } from "react-icons/fa";

// --- Sub-componentes para um código mais limpo ---

const FeatureCard = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => (
  <motion.div className="text-center md:text-left p-6" variants={itemVariants}>
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#A8DADC] text-[#1A535C] text-3xl mx-auto md:mx-0">
      <Icon />
    </div>
    <h3 className="text-2xl font-bold text-[#1A535C] font-sans mb-3">
      {title}
    </h3>
    <p className="text-[#333333]/80">{children}</p>
  </motion.div>
);

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
        title="Fortalecendo o Impacto, Juntos."
        subtitle="Um coletivo de uns para muitos."
        description="Guiamos associações para criar um hub de serviços e potencializar a transformação social em larga escala."
        buttonText="Seja uma Empresa Parceira"
        buttonLink="/doar"
        backgroundImage="/"
      />

      {/* 2. Seção "O Que Fazemos" */}
      <motion.section
        className="py-20 md:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A535C] font-sans">
              Um Hub para o Bem Maior
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-[#333333]/80">
              Nossa missão é representar e fortalecer um coletivo de
              associações, criando uma rede de solidariedade mútua com impacto
              sustentável.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <FeatureCard icon={FaUsers} title="Guiamos Associações">
              Oferecemos a estrutura e o suporte necessários para que projetos
              de impacto possam crescer e se profissionalizar.
            </FeatureCard>
            <FeatureCard icon={FaChartLine} title="Potencializamos o Impacto">
              Unimos forças para desenvolver projetos de maior escala, gerando
              benefícios sociais, econômicos e culturais para a sociedade.
            </FeatureCard>
            <FeatureCard icon={FaHandshake} title="Conectamos Parceiros">
              Somos a ponte confiável entre empresas que buscam investir em
              responsabilidade social e projetos que realmente fazem a
              diferença.
            </FeatureCard>
          </div>
        </div>
      </motion.section>

      {/* 3. Seção Para Empresas (CTA Corporativo) */}
      <motion.section
        className="py-20 md:py-28 bg-[#F7F9FA]"
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
              src="/default.png"
              alt="Parceria corporativa para impacto social"
              layout="fill"
              objectFit="cover"
            />
          </motion.div>
          <motion.div
            className="text-center md:text-left"
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A535C] font-sans mb-6">
              Sua Empresa como Catalisadora da Mudança
            </h2>
            <p className="text-lg md:text-xl text-[#333333]/80 mb-8">
              Ao doar para a FAMN, sua empresa investe em um portfólio
              diversificado de projetos auditados, com relatórios de impacto
              consolidados e total transparência. Fortaleça seu compromisso ESG
              e transforme a sociedade conosco.
            </p>
            <Link
              href="/doar"
              className="font-sans bg-[#4ECDC4] text-[#1A535C] font-bold py-4 px-8 rounded-full hover:bg-[#1A535C] hover:text-white transition-all text-lg"
            >
              Doe Agora
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* 4. Seção Para Associações (CTA de Filiação) */}
      <motion.section
        className="py-20 md:py-28 bg-white"
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
              Seu Projeto Tem Potencial para Crescer?
            </h2>
            <p className="text-lg md:text-xl text-[#333333]/80 mb-8">
              Se você lidera uma associação ou projeto de impacto sem CNPJ,
              junte-se ao nosso coletivo. Oferecemos o suporte necessário para
              você se formalizar, captar mais recursos e ampliar seu alcance.
            </p>
            <Link
              href="/contato"
              className="font-sans text-[#1A535C] font-bold hover:text-[#4ECDC4] transition-colors text-lg"
            >
              Filie-se a Nós →
            </Link>
          </motion.div>
          <motion.div
            className="w-full h-80 md:h-96 relative rounded-lg overflow-hidden shadow-xl"
            variants={itemVariants}
          >
            <Image
              src="/default.png"
              alt="Projetos comunitários fortalecidos pela FAMN"
              layout="fill"
              objectFit="cover"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* 5. Seção de Impacto Coletivo */}
      <div className="relative">
        <div className="bg-[#F7F9FA] pt-20">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="bg-[#1A535C] py-12 md:py-20 text-white rounded-xl shadow-2xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={sectionVariants}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-sans">
                  Nosso Impacto Coletivo
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <Counter from={0} to={20} label="Associações Fortalecidas" />
                <Counter from={0} to={50} label="Projetos Impulsionados" />
                <Counter from={0} to={10000} label="Vidas Alcançadas" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

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
              Liderança Estratégica
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg">
              Uma equipe comprometida com a gestão transparente e o crescimento
              sustentável do nosso coletivo.
            </p>
          </div>
          <div className="flex justify-center items-start gap-12 flex-wrap">
            <motion.div className="text-center" variants={itemVariants}>
              <Image
                src="/default.png"
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
            <motion.div className="text-center" variants={itemVariants}>
              <Image
                src="/default.png"
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
    </main>
  );
}
