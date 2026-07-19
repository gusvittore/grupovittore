import Image from "next/image";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
      <path d="M6.2 8.4H3.3V20h2.9V8.4ZM4.75 4A1.75 1.75 0 1 0 4.75 7.5 1.75 1.75 0 0 0 4.75 4ZM20.7 13.35c0-3.5-1.86-5.13-4.34-5.13-2 0-2.9 1.1-3.4 1.88V8.4h-2.9V20h2.9v-6.3c0-1.66.31-3.26 2.37-3.26 2.02 0 2.05 1.9 2.05 3.37V20h2.9l.42-6.65Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3.5" y="5" width="17" height="14" rx="2" />
      <path d="m4.5 7 7.5 6 7.5-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BlogAuthorCard() {
  return (
    <section className="rounded-[18px] border border-[#b29157]/35 bg-[#fffdf9] p-6 text-center sm:p-7">
      <p className="text-xs font-extrabold uppercase tracking-[0.23em] text-[#956119]">Sobre o Autor</p>
      <div className="mx-auto mt-5 h-24 w-24 overflow-hidden rounded-full border border-[#b29157]/50 bg-[#031126]">
        <Image
          src="/assets/blog/brand/autor-gustavo-asterio.png.png"
          alt="Gustavo Astério"
          width={96}
          height={96}
          className="h-full w-full object-cover object-top"
        />
      </div>
      <h2 className="mt-5 font-serif text-2xl font-semibold leading-tight text-[#07142d]">Gustavo Astério</h2>
      <p className="mt-2 text-base font-semibold leading-7 text-[#536074] sm:text-[1.02rem]">
        Fundador do Grupo Vittore e Assessor de Crescimento Empresarial
      </p>
      <p className="mt-4 text-base leading-7 text-[#536074] sm:text-[1.02rem] sm:leading-7">
        Compartilha análises e estratégias sobre Gestão Empresarial, Marketing, Vendas, Processos e Tecnologia, com foco na construção de operações mais estruturadas, previsíveis e escaláveis.
      </p>
      <div className="mt-5 flex justify-center gap-3">
        <a
          href="https://www.linkedin.com/in/gustavoasterio/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn de Gustavo Astério"
          className="grid h-10 w-10 place-items-center rounded-full border border-[#b29157]/50 text-[#07142d] transition hover:border-[#031126] hover:bg-[#031126] hover:text-[#e3ad51]"
        >
          <LinkedInIcon />
        </a>
        <a
          href="mailto:gustavo@grupovittore.com.br"
          aria-label="Enviar e-mail para Gustavo Astério"
          className="grid h-10 w-10 place-items-center rounded-full border border-[#b29157]/50 text-[#07142d] transition hover:border-[#031126] hover:bg-[#031126] hover:text-[#e3ad51]"
        >
          <MailIcon />
        </a>
      </div>
    </section>
  );
}
