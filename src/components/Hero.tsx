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
  buttonText,
  buttonLink,
  backgroundImage = "/",
}: HeroProps) {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
                 linear-gradient(to right, #1A535C 1px, transparent 1px),
                 linear-gradient(to bottom, #1A535C 1px, transparent 1px)
               `,
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* Dots Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #4ECDC4 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        ></div>

        {/* Geometric Shapes */}
        <div className="absolute top-10 right-10 sm:top-20 sm:right-20 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-br from-[#4ECDC4]/5 to-[#A8DADC]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 sm:bottom-20 sm:left-20 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-tr from-[#1A535C]/5 to-[#4ECDC4]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-r from-[#A8DADC]/3 to-[#4ECDC4]/3 rounded-full blur-3xl"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-8 sm:py-12 lg:py-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left Column - Text */}
            <div className="text-center lg:text-left space-y-6 sm:space-y-8 order-2 lg:order-1">
              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#1A535C] leading-tight tracking-tight">
                  {title}
                </h1>
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-[#4ECDC4] leading-relaxed">
                  {subtitle}
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-[#1A535C]/70 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  {description}
                </p>
              </div>

              {/* Button - Só aparece se buttonText e buttonLink forem fornecidos */}
              {buttonText && buttonLink && (
                <div className="pt-2 sm:pt-4">
                  <Link
                    href={buttonLink}
                    className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-[#1A535C] text-white font-medium rounded-lg hover:bg-[#4ECDC4] hover:text-[#1A535C] transition-all duration-300 group text-sm sm:text-base lg:text-lg"
                  >
                    {buttonText}
                    <svg
                      className="ml-2 w-4 h-4 sm:w-5 sm:w-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              )}
            </div>

            {/* Right Column - Logo */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative w-[26rem] h-[26rem] sm:w-[28rem] sm:h-[28rem] md:w-[30rem] md:h-[30rem] lg:w-[32rem] lg:h-[32rem] xl:w-[34rem] xl:h-[34rem]">
                <Image
                  src="/img/logo.jpg"
                  alt="Logo FAMN"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4ECDC4]/30 to-transparent"></div>
    </div>
  );
}
