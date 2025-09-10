"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaBuilding, FaBullhorn, FaCertificate } from "react-icons/fa";
import Hero from "@/components/Hero";

// --- Sub-componentes para a página Parceiros ---

const BenefitCard = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => (
  <motion.div
    className="bg-white p-8 rounded-lg shadow-lg text-center"
    variants={itemVariants}
  >
    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#A8DADC] text-[#1A535C] text-4xl">
      <Icon />
    </div>
    <h3 className="text-2xl font-bold text-[#1A535C] font-sans mb-3">
      {title}
    </h3>
    <p className="text-[#333333]/80">{children}</p>
  </motion.div>
);

const Step = ({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) => (
  <motion.div className="flex items-start gap-6" variants={itemVariants}>
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1A535C] text-white font-sans font-bold text-2xl flex-shrink-0">
      {number}
    </div>
    <div>
      <h3 className="text-2xl font-bold text-[#1A535C] font-sans mb-2">
        {title}
      </h3>
      <p className="text-lg text-[#333333]/80">{children}</p>
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

// --- Componente Principal da Página Parceiros ---
export default function Parceiros() {
  const { ref: refBenefits, inView: inViewBenefits } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const { ref: refSteps, inView: inViewSteps } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <main className="overflow-hidden">
      {/* 1. Seção Hero */}

      <Hero
        title="Juntos, Nosso Impacto é Maior"
        subtitle="Um coletivo de uns para muitos."
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Credimus perspicuitatem fundamentum esse omnis fiduciae."
      />

      {/* 2. Seção Vantagens da Parceria */}
      <motion.section
        ref={refBenefits}
        className="py-20 md:py-28 bg-[#F7F9FA]"
        initial="hidden"
        animate={inViewBenefits ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A535C] font-sans">
              Por Que Ser um Parceiro da FANIBRAS?
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-[#333333]/80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Offerimus
              societatem strategicam cum beneficiis mutuis.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <BenefitCard icon={FaCertificate} title="Impacto Social Verificado">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Investe
              in inceptis auditatis cum perspicuitate totali.
            </BenefitCard>
            <BenefitCard icon={FaBullhorn} title="Visibilidade e Reputação">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Associa
              tuam notam cum causa nobili et auge tuam famam.
            </BenefitCard>
            <BenefitCard icon={FaBuilding} title="Fortalecimento Comunitário">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Directe
              contribue ad progressionem sustinendam communitatum.
            </BenefitCard>
          </div>
        </div>
      </motion.section>

      {/* 3. Seção Nossos Parceiros Atuais */}
      <motion.section
        className="py-20 md:py-28 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A535C] font-sans mb-4">
            Um Coletivo Unido Pela Mesma Causa
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg mb-16 text-[#333333]/80">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gratias
            agimus omnibus sociis qui credunt et roborant nostram luctam.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8 text-gray-500">
            <span className="font-semibold text-2xl">Famacnit</span>
            <span className="font-semibold text-2xl">Xander 360</span>
            <span className="font-semibold text-2xl">Igreja Católica</span>
            <span className="font-semibold text-2xl">Rede Clima</span>
            <span className="font-semibold text-2xl">Transformando Vidas</span>
          </div>
        </div>
      </motion.section>

      {/* 4. Seção Como se Tornar um Parceiro */}
      <motion.section
        ref={refSteps}
        className="py-20 md:py-28 bg-[#F7F9FA]"
        initial="hidden"
        animate={inViewSteps ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="w-full h-80 md:h-full relative rounded-lg overflow-hidden shadow-xl"
            variants={itemVariants}
          >
            <Image
              src="/images/default.png"
              alt="Reunião de parceria estratégica"
              layout="fill"
              objectFit="cover"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A535C] font-sans mb-8">
              Vamos Conversar?
            </h2>
            <div className="space-y-10">
              <Step number="01" title="Primeiro Contato">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mitte
                nobis nuntium per formularium nostrum.
              </Step>
              <Step number="02" title="Alinhamento Estratégico">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Conveniemus ad alignanda proposita et exspectationes.
              </Step>
              <Step number="03" title="Formalização da Parceria">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Formalizamus societatem et incipimus transformationem.
              </Step>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 5. Seção CTA Final */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A535C] font-sans">
            Pronto para Fazer a Diferença?
          </h2>
          <p className="text-lg max-w-3xl mx-auto my-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tua
            societas potest esse clavis ad futurum melius.
          </p>
          <Link
            href="/contato"
            className="font-sans bg-[#4ECDC4] text-[#1A535C] font-bold py-4 px-8 rounded-full hover:bg-[#1A535C] hover:text-white transition-all text-lg"
          >
            Entre em Contato
          </Link>
        </div>
      </section>
    </main>
  );
}
