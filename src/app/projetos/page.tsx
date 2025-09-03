"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import {
  FaImage,
  FaUsers,
  FaPalette,
  FaMusic,
  FaFutbol,
  FaHeart,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

// Variantes de animação
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const hoverVariants: Variants = {
  hover: {
    y: -8,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// Componente do Carrossel de Imagens
const ImageCarousel = ({
  images,
  title,
}: {
  images: string[];
  title: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#A8DADC] to-[#4ECDC4] flex items-center justify-center">
        <div className="text-center text-white/80">
          <FaImage className="text-4xl mx-auto mb-2" />
          <p className="text-sm font-medium">Foto do Projeto</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden group">
      {/* Container das imagens */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            <Image
              src={image}
              alt={`${title} - Imagem ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Controles de navegação */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-all duration-200 opacity-80 hover:opacity-100"
          >
            <FaChevronLeft className="text-sm" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-all duration-200 opacity-80 hover:opacity-100"
          >
            <FaChevronRight className="text-sm" />
          </button>
        </>
      )}

      {/* Indicadores */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "bg-white shadow-lg"
                  : "bg-white/60 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Componente do Card de Projeto
const ProjectCard = ({
  title,
  description,
  icon: Icon,
  images,
  index,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  images: string[];
  index: number;
}) => (
  <motion.div
    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
    variants={cardVariants}
    whileHover="hover"
    custom={index}
  >
    <motion.div variants={hoverVariants}>
      {/* Carrossel de imagens do projeto */}
      <div className="relative h-120 overflow-hidden">
        <ImageCarousel images={images} title={title} />
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
          <Icon className="text-white text-xl" />
        </div>
      </div>

      {/* Conteúdo do card */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-[#1A535C] font-sans mb-3 group-hover:text-[#4ECDC4] transition-colors">
          {title}
        </h3>
        <p className="text-[#333333]/80 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  </motion.div>
);

// Dados dos projetos
const projects = [
  {
    title: "Projeto Circo Escola",
    description:
      "Desenvolvemos habilidades artísticas e motoras através das artes circenses, promovendo criatividade, coordenação e trabalho em equipe entre crianças e adolescentes.",
    icon: FaUsers,
    images: [
      "/img/projetos/Projeto circo escola.jpeg",
      "/img/projetos/Projeto circo escola2.jpeg",
    ],
  },
  {
    title: "Projeto Futebol Leões",
    description:
      "Escolinha de futebol que promove valores como trabalho em equipe, disciplina e superação, formando não apenas atletas, mas cidadãos de bem.",
    icon: FaFutbol,
    images: [
      "/img/projetos/Projeto futebol leões.jpeg",
      "/img/projetos/Projeto futebol leões2.jpeg",
      "/img/projetos/Projeto futebol leões3.jpeg",
      "/img/projetos/Projeto futebol leões4.jpeg",
      "/img/projetos/Projeto futebol leões5.jpeg",
    ],
  },
  {
    title: "Projeto Xander 360",
    description:
      "Iniciativa abrangente que combina distribuição de cestas básicas, eventos comunitários e apoio social, criando um impacto positivo em múltiplas frentes.",
    icon: FaHeart,
    images: [
      "/img/projetos/Projeto Xander 360.jpeg",
      "/img/projetos/Projeto Xander 360-2.jpeg",
      "/img/projetos/Projeto Xander 360-3.jpeg",
      "/img/projetos/Projeto Xander 360-4.jpeg",
      "/img/projetos/Projeto Xander 360-5.jpeg",
      "/img/projetos/Projeto Xander 360-6.jpeg",
    ],
  },
  {
    title: "Projeto Artesanato",
    description:
      "Oficinas de artesanato que ensinam técnicas tradicionais e modernas, gerando renda e preservando a cultura local através do trabalho manual criativo.",
    icon: FaPalette,
    images: [], // Sem imagens - mostrará placeholder
  },
  {
    title: "Projeto Balé",
    description:
      "Aulas de balé clássico e contemporâneo que desenvolvem disciplina, postura, expressão corporal e autoestima, especialmente para jovens em situação de vulnerabilidade.",
    icon: FaMusic,
    images: [], // Sem imagens - mostrará placeholder
  },
];

export default function ProjetosPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F7F9FA] to-white">
      {/* Hero Section */}
      <motion.section
        className="pt-38 pb-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 text-center pb-10">
          <motion.h1
            className="text-4xl md:text-6xl font-bold font-sans mb-6 text-[#1A535C]"
            variants={sectionVariants}
          >
            Nossos Projetos
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-[#333333]/80 max-w-3xl mx-auto leading-relaxed"
            variants={sectionVariants}
          >
            Conheça as iniciativas que transformam vidas e constroem um futuro
            melhor para nossa comunidade. Cada projeto é uma semente de
            esperança plantada com amor e dedicação.
          </motion.p>
        </div>
      </motion.section>

      {/* Grid de Projetos */}
      <motion.section
        className="py-8 md:py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            variants={sectionVariants}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                icon={project.icon}
                images={project.images}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="py-16 bg-[#1A535C] text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div variants={sectionVariants}>
            <h2 className="text-3xl md:text-4xl font-bold font-sans mb-6">
              Quer Apoiar Nossos Projetos?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Sua contribuição faz a diferença! Junte-se a nós na missão de
              transformar vidas e construir uma comunidade mais forte e unida.
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={sectionVariants}
            >
              <motion.a
                href="/doar"
                className="bg-[#4ECDC4] text-[#1A535C] font-bold py-4 px-8 rounded-full hover:bg-white hover:text-[#1A535C] transition-all duration-300 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Fazer Doação
              </motion.a>
              <motion.a
                href="/contato"
                className="border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-[#1A535C] transition-all duration-300 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Entre em Contato
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
