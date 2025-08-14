import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundImage?: string;
}

export default function Hero({
  title,
  subtitle,
  description,
  buttonText = "Saiba Mais",
  buttonLink = "/sobre",
  backgroundImage = "/hero-image.jpg",
}: HeroProps) {
  return (
    <div className="relative h-screen flex items-center justify-center">
   
      <Image
        src={backgroundImage}
        alt={title}
        fill
        className="object-center opacity-20"
        priority
      />

  
      <div className="relative z-10 text-center text-white px-8 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          {title}
        </h1>
        <h2 className="text-xl md:text-3xl font-semibold leading-relaxed mb-4">
          {subtitle}
        </h2>
        <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <Link
          href={buttonLink}
          className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-emerald-300 hover:text-black transition-colors duration-200 text-lg"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
