"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { animate } from "framer-motion";
import {
  FaHeart,
  FaUsers,
  FaLightbulb,
  FaHandshake,
  FaArrowRight,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaBullseye,
  FaEye,
} from "react-icons/fa";

// --- Componente de Card de Valor ---
const ValueCard = ({
  icon: Icon,
  title,
  children,
  color,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  color: string;
}) => (
  <motion.div
    className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
    variants={itemVariants}
  >
    <div
      className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full ${color} shadow-lg`}
    >
      <Icon className="text-3xl text-white" />
    </div>
    <h3 className="text-xl font-bold text-[#1A535C] font-sans mb-4">{title}</h3>
    <p className="text-[#333333]/80 leading-relaxed">{children}</p>
  </motion.div>
);

// --- Componente de Membro da Equipe ---
const TeamMemberCard = ({
  imgSrc,
  name,
  role,
  description,
  socialLinks,
}: {
  imgSrc: string;
  name: string;
  role: string;
  description: string;
  socialLinks?: { platform: string; url: string }[];
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      variants={itemVariants}
    >
      <div className="relative h-96 md:h-96 overflow-hidden">
        <Image
          src={imgSrc}
          alt={`Foto de ${name}`}
          width={400}
          height={400}
          className="w-full h-full object-cover object-[center_10%] transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold font-sans">{name}</h3>
          <p className="text-sm opacity-90">{role}</p>
        </div>
      </div>

      <div className="p-6">
        <p className="text-[#333333]/80 mb-4 leading-relaxed">{description}</p>

        {socialLinks && (
          <div className="flex gap-3">
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className="text-[#1A535C] hover:text-[#4ECDC4] transition-colors duration-200"
              >
                {link.platform}
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// --- Componente de Estatística ---
function Statistic({
  from,
  to,
  label,
  suffix = "",
}: {
  from: number;
  to: number;
  label: string;
  suffix?: string;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration: 2.5,
        onUpdate(value) {
          const element = document.getElementById(label);
          if (element) {
            element.textContent = Math.round(value).toString() + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, from, to, label, suffix]);

  return (
    <div ref={ref} className="text-center">
      <span className="text-4xl md:text-5xl font-black text-[#4ECDC4] font-sans">
        <span id={label}>
          {from}
          {suffix}
        </span>
      </span>
      <p className="text-sm text-white/80 mt-2 font-medium">{label}</p>
    </div>
  );
}

// --- Variantes de Animação ---
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

// --- Página Principal Sobre Nós ---
export default function SobrePage() {
  return (
    <main className="overflow-hidden">
      {/* 1. Seção Hero de Abertura */}
      <section className="relative h-[70vh] flex items-center justify-center bg-gradient-to-br from-[#1A535C] to-[#4ECDC4]">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center text-white px-8 max-w-5xl">
          <motion.h1
            className="text-5xl md:text-7xl font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Sobre Nós
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Somos um coletivo de associações que acredita na força da
            solidariedade e da cooperação. Conectamos pessoas, projetos e
            empresas para transformar doações em impacto real e construir um
            futuro mais humano, transparente e sustentável.
          </motion.p>
        </div>
      </section>

      {/* 2. Seção História da Empresa */}
      <motion.section
        className="py-20 md:py-28 bg-white"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A535C] font-sans mb-8">
                Nossa História: Um Coletivo para Muitos
              </h2>
              <div className="space-y-6 text-lg text-[#333333]/80 leading-relaxed">
                <p className="text-justify">
                  Nossa trajetória nasceu da necessidade de criar um espaço onde
                  associações pudessem se unir em prol de um bem maior.
                  Percebemos que, isoladas, muitas iniciativas sociais tinham
                  alcance limitado, mas juntas poderiam formar um hub de
                  solidariedade e cooperação, capaz de multiplicar resultados e
                  transformar realidades.
                </p>
                <p className="text-justify">
                  Desde o início, nossa caminhada foi guiada por três pilares:
                  humanismo, transparência e cooperação. Com eles, aprendemos
                  que cada doação, cada parceria e cada gesto de apoio pode se
                  tornar uma semente de transformação.
                </p>
              </div>
            </motion.div>

            <motion.div className="relative" variants={itemVariants}>
              <div className="w-full h-96 relative flex items-center justify-center">
                <Image
                  src="/img/logo.jpg"
                  alt="Logo FAMN - História da organização"
                  width={500}
                  height={500}
                  className="object-contain w-96 h-96 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem]"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 3. Seção de Metas Qualitativas */}
      <section className="bg-[#1A535C] py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white font-sans mb-4">
              Metas Qualitativas
            </h2>
          </motion.div>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionVariants}
          >
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-[#4ECDC4] font-sans mb-4">
                Associações Conectadas
              </h3>
              <p className="text-base md:text-lg text-white/80 leading-relaxed">
                Fortalecemos coletivos e damos voz a projetos sociais, inclusive
                os que ainda não têm CNPJ.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-[#4ECDC4] font-sans mb-4">
                Doações Arrecadadas
              </h3>
              <p className="text-base md:text-lg text-white/80 leading-relaxed">
                Ampliamos o alcance junto a pessoas físicas e empresas.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-[#4ECDC4] font-sans mb-4">
                Transparência Garantida
              </h3>
              <p className="text-base md:text-lg text-white/80 leading-relaxed">
                Reportamos todas as ações e recursos.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-[#4ECDC4] font-sans mb-4">
                Parcerias Corporativas
              </h3>
              <p className="text-base md:text-lg text-white/80 leading-relaxed">
                Atraímos empresas que acreditam na transformação social.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. Seção de Missão, Visão e Valores */}
      <motion.section
        className="py-20 md:py-28 bg-[#F7F9FA]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A535C] font-sans mb-6">
              Missão, Visão e Valores
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <ValueCard icon={FaBullseye} title="Missão" color="bg-red-500">
              Guiar as associações no desenvolvimento de um hub de serviços
              colaborativo para gerar valor e impacto positivo para a sociedade.
            </ValueCard>

            <ValueCard icon={FaEye} title="Visão" color="bg-blue-500">
              Nossa visão é sermos reconhecidos como uma associação de interesse
              público.
            </ValueCard>

            <ValueCard icon={FaHandshake} title="Valores" color="bg-green-500">
              Solidariedade humanismo e cooperação.
            </ValueCard>
          </div>
        </div>
      </motion.section>

      {/* 5. Seção de Equipe */}
      <motion.section
        className="py-20 md:py-28 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A535C] font-sans mb-6">
              Nossa Equipe
            </h2>
            <p className="text-lg text-[#333333]/80 max-w-3xl mx-auto">
              Conheça as pessoas apaixonadas e comprometidas que fazem a
              FANIBRAS acontecer todos os dias.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <TeamMemberCard
              name="Diana Santos"
              role="Presidente"
              imgSrc="/img/equipe/Diana Santos.jpg"
              description="Líder comprometida com a transformação social, Diana guia nossa organização com paixão e dedicação, sempre buscando fortalecer o coletivo e ampliar nosso impacto na comunidade."
              socialLinks={[
                { platform: "Email", url: "mailto:diana@fanibras.org.br" },
              ]}
            />

            <TeamMemberCard
              name="Alexander (Xander 360)"
              role="Chanceler"
              imgSrc="/default.png"
              description="????????"
              socialLinks={[
                { platform: "Email", url: "mailto:alexander@fanibras.org.br" },
              ]}
            />
          </div>
        </div>
      </motion.section>

      {/* 6. Seção de Localização e Contato */}
      <motion.section
        className="py-20 md:py-28 bg-[#F7F9FA]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A535C] font-sans mb-8">
                Onde Nos Encontrar
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <FaMapMarkerAlt className="text-[#4ECDC4] text-xl mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-[#1A535C] mb-2">
                      Sede Principal
                    </h3>
                    <p className="text-[#333333]/80">
                      Travessa Capitão Mário Tinoco, s/n - Barreto
                      <br />
                      Niterói, RJ
                      <br />
                      Brasil
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <FaPhone className="text-[#4ECDC4] text-xl mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-[#1A535C] mb-2">Telefone</h3>
                    <p className="text-[#333333]/80">+55 (21) 99700-6405</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <FaEnvelope className="text-[#4ECDC4] text-xl mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-[#1A535C] mb-2">Email</h3>
                    <p className="text-[#333333]/80">fanibras@gmail.com</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div className="relative" variants={itemVariants}>
              <div className="w-full h-80 relative rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.123456!2d-43.10647!3d-22.90278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bda33a676c0c7%3A0xae85c3264c9c7ecd!2sBarreto%2C%20Niter%C3%B3i%20-%20RJ!5e0!3m2!1spt-BR!2sbr!4v1635789012345"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização da FANIBRAS - Barreto, Niterói, RJ"
                  className="w-full h-full"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A535C]/80 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 text-white pointer-events-none">
                <h3 className="text-xl font-bold mb-2">Visite Nossa Sede</h3>
                <p className="text-sm opacity-90">
                  Travessa Capitão Mário Tinoco, s/n - Barreto, Niterói
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 7. Seção CTA Final */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-gradient-to-r from-[#1A535C] to-[#4ECDC4] text-white p-12 md:p-16 rounded-2xl shadow-2xl text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={sectionVariants}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-sans mb-6">
              Junte-se à Nossa Causa!
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
              Sua participação, seja como voluntário, doador ou parceiro, é
              fundamental para continuarmos nossa missão de transformar vidas.
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <Link
                href="/contato"
                className="w-full md:w-auto text-center font-sans bg-white text-[#1A535C] font-bold py-4 px-8 rounded-full hover:bg-[#F7F9FA] transition-all text-lg shadow-lg hover:shadow-xl"
              >
                Entre em Contato
                <FaArrowRight className="inline ml-2" />
              </Link>

              <Link
                href="/voluntario"
                className="w-full md:w-auto text-center font-sans text-white font-bold py-4 px-8 rounded-full border-2 border-white hover:bg-white hover:text-[#1A535C] transition-all text-lg"
              >
                Seja Voluntário
              </Link>

              <Link
                href="/doar"
                className="w-full md:w-auto text-center font-sans text-white font-bold py-4 px-8 rounded-full border-2 border-white hover:bg-white hover:text-[#1A535C] transition-all text-lg"
              >
                Faça uma Doação
              </Link>
            </div>

            <p className="text-sm text-white/70 mt-8">
              Juntos, somos mais fortes. Juntos, fazemos a diferença.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
