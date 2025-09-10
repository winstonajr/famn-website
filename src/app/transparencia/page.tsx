"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaFilePdf, FaArrowRight } from "react-icons/fa";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import Hero from "@/components/Hero";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// --- Sub-componentes para a página Transparência ---

const StatCard = ({ title, value }: { title: string; value: string }) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-lg text-center"
    variants={itemVariants}
  >
    <p className="text-lg text-[#333333]/80">{title}</p>
    <p className="text-4xl font-bold text-[#1A535C] font-sans mt-2">{value}</p>
  </motion.div>
);

const ReportLink = ({
  title,
  date,
  href,
}: {
  title: string;
  date: string;
  href: string;
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex justify-between items-center group"
    variants={itemVariants}
  >
    <div className="flex items-center">
      <FaFilePdf className="text-3xl text-[#4ECDC4] mr-4" />
      <div>
        <h4 className="font-bold text-[#1A535C] font-sans">{title}</h4>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
    </div>
    <FaArrowRight className="text-xl text-gray-400 transition-transform group-hover:translate-x-2" />
  </motion.a>
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

// --- Dados e Opções para os Gráficos ---
const doughnutData = {
  labels: ["Programas e Associações", "Administração", "Captação de Recursos"],
  datasets: [
    {
      data: [85, 10, 5],
      backgroundColor: ["#4ECDC4", "#1A535C", "#A8DADC"],
      borderColor: "#F7F9FA",
      borderWidth: 4,
    },
  ],
};
const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: "bottom" as const } },
  cutout: "70%",
};

const barData = {
  labels: ["Empresas", "Doadores Individuais", "Editais e Fundos"],
  datasets: [
    {
      label: "Receita (em R$)",
      data: [650000, 250000, 100000],
      backgroundColor: "#1A535C",
      borderRadius: 5,
    },
  ],
};
const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: { y: { beginAtZero: true } },
};

// --- Componente Principal da Página Transparência ---
export default function Transparencia() {
  const { ref: refDashboard, inView: inViewDashboard } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <main className="overflow-hidden">
      {/* 1. Seção Hero */}
      <Hero
        title="Nossa Transparência, Sua Confiança"
        subtitle="Um coletivo de uns para muitos."
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Credimus perspicuitatem fundamentum esse omnis fiduciae."
      />

      {/* 2. Seção Dashboard de Impacto */}
      <motion.section
        ref={refDashboard}
        className="py-20 md:py-28 bg-[#F7F9FA]"
        initial="hidden"
        animate={inViewDashboard ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A535C] font-sans">
              Nosso Desempenho em Dados
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-[#333333]/80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hic est
              compendium nostrum anni proximi.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <StatCard title="Total Arrecadado (2025)" value="R$ 1 mi" />
            <StatCard title="Associações Apoiadas" value="20" />
            <StatCard title="Custo Administrativo" value="10%" />
          </div>

          <div className="grid md:grid-cols-5 gap-8 items-center">
            <motion.div
              className="md:col-span-2 h-80 md:h-96 bg-white p-6 rounded-lg shadow-lg"
              variants={itemVariants}
            >
              <h3 className="text-xl font-bold text-[#1A535C] font-sans text-center mb-4">
                Alocação de Recursos
              </h3>
              <div className="relative h-full w-full">
                <Doughnut data={doughnutData} options={doughnutOptions} />
              </div>
            </motion.div>
            <motion.div
              className="md:col-span-3 h-80 md:h-96 bg-white p-6 rounded-lg shadow-lg"
              variants={itemVariants}
            >
              <h3 className="text-xl font-bold text-[#1A535C] font-sans text-center mb-4">
                Fontes de Receita
              </h3>
              <div className="relative h-full w-full">
                <Bar data={barData} options={barOptions} />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 3. Seção de Relatórios */}
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
              Biblioteca de Relatórios
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-[#333333]/80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Accede ad
              omnia documenta nostra officialia.
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            <ReportLink
              title="Relatório Anual de Atividades 2025"
              date="Publicado em Janeiro de 2026"
              href="/relatorios/anual-2025.pdf"
            />
            <ReportLink
              title="Demonstrações Financeiras 2025"
              date="Auditado e publicado em Janeiro de 2026"
              href="/relatorios/financeiro-2025.pdf"
            />
            <ReportLink
              title="Relatório de Impacto - 1º Semestre 2025"
              date="Publicado em Julho de 2025"
              href="/relatorios/impacto-semestre1-2025.pdf"
            />
          </div>
        </div>
      </motion.section>

      {/* 4. Seção de Governança */}
      <motion.section
        className="py-20 md:py-28 bg-[#F7F9FA]"
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
              Nossa Governança
            </h2>
            <p className="text-lg md:text-xl text-[#333333]/80 mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nostra
              administratio a corpore exsecutivo et fiscali formatur, qui ex
              peritis idoneis constant.
            </p>
            <Link
              href="/sobre#equipe"
              className="font-sans text-[#1A535C] font-bold hover:text-[#4ECDC4] transition-colors text-lg"
            >
              Conheça nossa equipe →
            </Link>
          </motion.div>
          <motion.div
            className="w-full h-80 relative rounded-lg overflow-hidden shadow-xl"
            variants={itemVariants}
          >
            <Image
              src="/images/default.png"
              alt="Reunião do conselho da FANIBRAS"
              layout="fill"
              objectFit="cover"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* 5. Seção CTA Final */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A535C] font-sans">
            Invista com Confiança
          </h2>
          <p className="text-lg max-w-3xl mx-auto my-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tua donatio
            directe adiuvat consociationes verificatas.
          </p>
          <Link
            href="/doar"
            className="font-sans bg-[#4ECDC4] text-[#1A535C] font-bold py-4 px-8 rounded-full hover:bg-[#1A535C] hover:text-white transition-all text-lg"
          >
            Seja uma Empresa Parceira
          </Link>
        </div>
      </section>
    </main>
  );
}
