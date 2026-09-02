import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { ServiceHighlights } from "@/components/sections/service-highlights";
import { About } from "@/components/about";
import { Partner } from "@/components/sections/partner";
import { Leadership } from "@/components/sections/leadership";
import { TwoPillars } from "@/components/sections/two-pillars";
import { SecurityServices } from "@/components/sections/security-services";
import { SmartSecurity } from "@/components/sections/smart-security";
import { ValetServices } from "@/components/sections/valet-services";
import { ValetExperience } from "@/components/sections/valet-experience";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { SecurityVsValet } from "@/components/sections/security-vs-valet";
import { Industries } from "@/components/sections/industries";
import { ServiceProcess } from "@/components/sections/service-process";
import { Gallery } from "@/components/sections/gallery";
import { TrustBlock } from "@/components/sections/trust-block";
import { FinalCTA } from "@/components/sections/final-cta";
import { Contact } from "@/components/sections/contact";
import { SiteFooter } from "@/components/sections/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Industries />
        <ServiceHighlights />
        <About />
        <Partner />
        {/* <Leadership /> */}
        <TwoPillars />
        <SecurityServices />
        <SmartSecurity />
        <ValetServices />
        {/* <ValetExperience /> */}
        <WhyChooseUs />
        <SecurityVsValet />
        <ServiceProcess />
        {/* <Gallery /> */}
        <TrustBlock />
        <FinalCTA />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
