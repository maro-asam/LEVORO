import LevoroHero from "@/components/Hero"
import FAQSection from "@/components/sections/faq-section"
import FinalCTASection from "@/components/sections/final-cta-section"
import HowItWorksSection from "@/components/sections/how-it-works"
import ProblemSection from "@/components/sections/problem-section"
import ProductsSection from "@/components/sections/products-section"
import TrustQualitySection from "@/components/sections/trust-quality-section"
import UseCasesSection from "@/components/sections/use-cases-section"
import WhyLevoroSection from "@/components/sections/why-levoro-section"


const page = () => {
  return (
    <div>
      <LevoroHero />
      <ProblemSection />
      <HowItWorksSection />
      <ProductsSection />
      <WhyLevoroSection />
      <UseCasesSection />
      <TrustQualitySection />
      <FinalCTASection />
      <FAQSection />
    </div>
  )
}

export default page
