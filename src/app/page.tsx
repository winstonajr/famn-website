import Hero from "@/components/Hero";

export default function Home() {
  return <main>
    <Hero
          title="Bem-vindo ao FAMN"
          subtitle="Fundação fundo de amparo à míseria nacional"
          description="Solidariedade, humanismo e cooperação"
          buttonText="Saiba Mais"
          buttonLink="/sobre"
          backgroundImage="/"
        />
  </main>;
}
