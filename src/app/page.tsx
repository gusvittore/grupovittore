import { HomeAssessoriaComercial } from "./_components/home-assessoria-comercial";
import { HomeBlog } from "./_components/home-blog";
import { HomeCta } from "./_components/home-cta";
import { HomeHero } from "./_components/home-hero";
import { HomeMateriaisGraficos } from "./_components/home-materiais-graficos";
import { SiteFooter } from "./_components/site-footer";
import { SiteHeader } from "./_components/site-header";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#fbf8f4] text-[#071026]">
      <SiteHeader />
      <HomeHero />
      <HomeMateriaisGraficos />
      <HomeAssessoriaComercial />
      <HomeBlog />
      <HomeCta />
      <SiteFooter />
    </main>
  );
}
