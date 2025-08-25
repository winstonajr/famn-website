"use client";

import { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaHeart,
  FaCalendarAlt,
  FaLock,
  FaCreditCard,
  FaBarcode,
} from "react-icons/fa";
import Hero from "@/components/Hero";

// --- Sub-componentes para a página Doar ---

const DonationButton = ({
  amount,
  selected,
  onClick,
}: {
  amount: number | string;
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full p-4 rounded-lg border-2 text-xl font-bold transition-all duration-300 ${
      selected
        ? "bg-[#1A535C] text-white border-[#1A535C]"
        : "bg-white text-[#1A535C] border-gray-300 hover:border-[#1A535C]"
    }`}
  >
    {typeof amount === "number" ? `R$ ${amount}` : amount}
  </button>
);

const FrequencyToggle = ({
  frequency,
  setFrequency,
}: {
  frequency: "unique" | "monthly";
  setFrequency: (freq: "unique" | "monthly") => void;
}) => (
  <div className="relative flex w-full rounded-lg bg-gray-200 p-1">
    <button
      onClick={() => setFrequency("unique")}
      className="w-1/2 p-3 text-lg font-bold z-10 transition-colors"
    >
      Doação Única
    </button>
    <button
      onClick={() => setFrequency("monthly")}
      className="w-1/2 p-3 text-lg font-bold z-10 transition-colors"
    >
      Doação Mensal
    </button>
    <motion.div
      className="absolute top-1 bottom-1 w-1/2 bg-white rounded-md shadow-md"
      animate={{ x: frequency === "unique" ? "0%" : "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    />
  </div>
);

// --- Variantes de Animação Globais ---
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// --- Componente Principal da Página Doar ---
export default function Doar() {
  const [amount, setAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState<"unique" | "monthly">("monthly");
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix");

  const handleAmountClick = (value: number) => {
    setAmount(value);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setCustomAmount(value);
    setAmount(0);
  };

  const { ref: refForm, inView: inViewForm } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <main className="overflow-hidden">
      {/* 1. Seção Hero */}
      <Hero
        title="Doe amor, colha transformação"
        subtitle="Um coletivo de uns para muitos."
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Credimus perspicuitatem fundamentum esse omnis fiduciae."
      />

      {/* 2. Seção Principal de Doação */}
      <motion.section
        ref={refForm}
        className="py-20 md:py-28 bg-[#F7F9FA]"
        initial="hidden"
        animate={inViewForm ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12">
          {/* Coluna da Esquerda: Formulário */}
          <div className="bg-white p-8 md:p-12 rounded-lg shadow-2xl">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-[#1A535C] font-sans mb-4">
                  1. Escolha um valor
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <DonationButton
                    amount={50}
                    selected={amount === 50}
                    onClick={() => handleAmountClick(50)}
                  />
                  <DonationButton
                    amount={100}
                    selected={amount === 100}
                    onClick={() => handleAmountClick(100)}
                  />
                  <DonationButton
                    amount={200}
                    selected={amount === 200}
                    onClick={() => handleAmountClick(200)}
                  />
                  <input
                    type="text"
                    placeholder="Outro valor"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className={`w-full p-4 rounded-lg border-2 text-xl font-bold text-center transition-all duration-300 ${
                      amount === 0
                        ? "bg-[#1A535C] text-white border-[#1A535C]"
                        : "bg-white text-[#1A535C] border-gray-300 hover:border-[#1A535C]"
                    }`}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#1A535C] font-sans mb-4">
                  2. Escolha a frequência
                </h3>
                <FrequencyToggle
                  frequency={frequency}
                  setFrequency={setFrequency}
                />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#1A535C] font-sans mb-4">
                  3. Método de Pagamento
                </h3>
                <div className="flex border-b">
                  <button
                    onClick={() => setPaymentMethod("pix")}
                    className={`flex-1 p-4 text-lg font-bold border-b-4 transition-colors ${
                      paymentMethod === "pix"
                        ? "border-[#1A535C] text-[#1A535C]"
                        : "border-transparent text-gray-500 hover:text-[#1A535C]"
                    }`}
                  >
                    <FaBarcode className="inline mr-2" /> PIX
                  </button>
                  <button
                    onClick={() => setPaymentMethod("card")}
                    className={`flex-1 p-4 text-lg font-bold border-b-4 transition-colors ${
                      paymentMethod === "card"
                        ? "border-[#1A535C] text-[#1A535C]"
                        : "border-transparent text-gray-500 hover:text-[#1A535C]"
                    }`}
                  >
                    <FaCreditCard className="inline mr-2" /> Cartão
                  </button>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={paymentMethod}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="pt-8"
                  >
                    {paymentMethod === "pix" && (
                      <div className="text-center">
                        <p className="text-lg mb-4">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Scansiona il codice QR.
                        </p>
                        <div className="w-48 h-48 bg-gray-200 mx-auto flex items-center justify-center">
                          [QR Code Placeholder]
                        </div>
                      </div>
                    )}
                    {paymentMethod === "card" && (
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="card-name"
                            className="block font-semibold text-[#1A535C] mb-1"
                          >
                            Nome no Cartão
                          </label>
                          <input
                            type="text"
                            id="card-name"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="card-number"
                            className="block font-semibold text-[#1A535C] mb-1"
                          >
                            Número do Cartão
                          </label>
                          <input
                            type="text"
                            id="card-number"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div>
                <button className="w-full font-sans bg-[#4ECDC4] text-[#1A535C] font-bold py-4 px-8 rounded-full hover:bg-[#1A535C] hover:text-white transition-all text-xl">
                  Finalizar Doação
                </button>
                <p className="text-center text-sm text-gray-500 mt-4 flex items-center justify-center">
                  <FaLock className="mr-2" /> Lorem ipsum dolor sit amet, tua
                  donatio secura est.
                </p>
              </div>
            </div>
          </div>

          {/* Coluna da Direita: Impacto e FAQ */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-[#1A535C] font-sans mb-6">
                Seu Impacto Direto
              </h2>
              <div className="space-y-6">
                <div className="flex items-center gap-6 bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-3xl text-[#4ECDC4]">
                    <FaHeart />
                  </div>
                  <p className="text-lg">
                    <strong>Com R$ 50,</strong> lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Adiuvas unam familiam per
                    hebdomadem.
                  </p>
                </div>
                <div className="flex items-center gap-6 bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-3xl text-[#4ECDC4]">
                    <FaCalendarAlt />
                  </div>
                  <p className="text-lg">
                    <strong>Com R$ 100 por mês,</strong> lorem ipsum dolor sit
                    amet, consectetur adipiscing elit. Sustines unum iuvenem in
                    cursu professionali.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#1A535C] font-sans mb-6">
                Perguntas Frequentes
              </h2>
              <div className="space-y-4">
                <details className="bg-white p-6 rounded-lg shadow-lg">
                  <summary className="font-bold cursor-pointer">
                    Lorem ipsum dolor sit amet?
                  </summary>
                  <p className="mt-4">
                    Consectetur adipiscing elit. Tua donatio est C% deductibilis
                    ab vectigalibus.
                  </p>
                </details>
                <details className="bg-white p-6 rounded-lg shadow-lg">
                  <summary className="font-bold cursor-pointer">
                    Quomodo pecunia mea utitur?
                  </summary>
                  <p className="mt-4">
                    LXXV% tuae donationis directe ad incepta nostra pergit. Vide
                    nostram paginam perspicuitatis.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
