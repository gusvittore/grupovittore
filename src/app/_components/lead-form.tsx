"use client";

import { useState, type ChangeEventHandler } from "react";

const sectorOptions = [
  "Serviço",
  "Varejo",
  "Indústria",
  "E-commerce",
  "Food Service",
  "Educação",
  "Imobiliária",
  "SAAS",
  "Finanças",
  "Franquia / Franchising",
  "Energia Solar",
  "Turismo / Viagens",
  "Outro",
];

const revenueOptions = [
  "Até 50 mil",
  "De 51 mil a 70 mil",
  "De 71 mil a 100 mil",
  "De 101 mil a 200 mil",
  "De 201 mil a 400 mil",
  "De 401 mil a 1 milhão",
  "De 1 a 4 milhões",
  "De 4 a 14 milhões",
  "De 14 a 40 milhões",
  "Mais de 40 milhões",
];

const NON_QUALIFIED_REVENUE = "Até 50 mil";

type LeadApiResponse = {
  ok?: boolean;
  redirectTo?: string;
};

function getLeadRedirectPath(revenue: string) {
  return revenue === NON_QUALIFIED_REVENUE
    ? "/obrigado"
    : "/obrigado-qualificado";
}

function formatWhatsApp(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) {
    return digits.replace(/(\d{0,2})/, "($1");
  }

  if (digits.length <= 7) {
    return digits.replace(/(\d{2})(\d{0,5})/, "($1) $2");
  }

  return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  inputMode,
  maxLength,
  value,
  onChange,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  inputMode?: "numeric";
  maxLength?: number;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <label className="block">
      <span className="mb-3 block text-base font-bold leading-6 text-[#090E1F]">
        {label}
      </span>
      <input
        required
        type={type}
        name={name}
        placeholder={placeholder}
        inputMode={inputMode}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        className="min-h-[58px] w-full rounded-[5px] border border-[#B29157]/50 bg-[#FBF8F4]/72 px-4 text-base text-[#090E1F] outline-none transition placeholder:text-[#406aa0]/72 focus:border-[#960000] focus:ring-4 focus:ring-[#960000]/10"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="mb-3 block text-base font-bold leading-6 text-[#090E1F]">
        {label}
      </span>
      <span className="select-field-control">
        <select
          required
          name={name}
          defaultValue=""
          className="min-h-[58px] w-full appearance-none rounded-[5px] border border-[#B29157]/50 bg-[#FBF8F4]/72 py-3 pl-4 pr-12 text-base text-[#090E1F] outline-none transition focus:border-[#960000] focus:ring-4 focus:ring-[#960000]/10"
        >
          <option value="" disabled>
            Selecione
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="select-field-arrow" aria-hidden="true">⌄</span>
      </span>
    </label>
  );
}

export function LeadForm() {
  const [whatsApp, setWhatsApp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form
      className="rounded-[8px] border border-[#B29157]/48 bg-[#FBF8F4]/82 p-5 shadow-[0_24px_70px_rgba(9,14,31,0.08)] sm:p-8 lg:p-10"
      onSubmit={async (event) => {
        event.preventDefault();

        if (isSubmitting) {
          return;
        }

        const form = event.currentTarget;

        if (!form.reportValidity()) {
          return;
        }

        const formData = new FormData(form);
        const revenue = String(formData.get("revenue") ?? "");
        const params = new URLSearchParams(window.location.search);

        try {
          setIsSubmitting(true);

          const response = await fetch("/api/leads", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nome_completo: String(formData.get("name") ?? ""),
              email: String(formData.get("email") ?? ""),
              whatsapp: String(formData.get("whatsapp") ?? ""),
              empresa: String(formData.get("company") ?? ""),
              segmento: String(formData.get("sector") ?? ""),
              faturamento_mensal: revenue,
              origem_lead: "Landing Page Assessoria Comercial",
              utm_source: params.get("utm_source") || "",
              utm_medium: params.get("utm_medium") || "",
              utm_campaign: params.get("utm_campaign") || "",
              utm_term: params.get("utm_term") || "",
              utm_content: params.get("utm_content") || "",
              gclid: params.get("gclid") || "",
            }),
          });
          const result = (await response.json().catch(() => null)) as LeadApiResponse | null;

          if (!response.ok || !result?.ok) {
            alert("Não foi possível enviar suas informações. Tente novamente.");
            return;
          }

          const redirectTo = result.redirectTo || getLeadRedirectPath(revenue);
          window.location.href = redirectTo;
        } catch (error) {
          console.error("Erro ao enviar lead:", error);
          alert("Não foi possível enviar suas informações. Tente novamente.");
        } finally {
          setIsSubmitting(false);
        }
      }}
    >
      <div className="lead-form-ornament" aria-hidden="true">
        <span />
        <i />
        <span />
      </div>
      <div className="grid gap-5">
        <Field label="Nome completo" name="name" placeholder="Nome" />
        <Field
          label="Seu melhor e-mail"
          name="email"
          placeholder="E-mail"
          type="email"
        />
        <Field
          label="DDD + WhatsApp"
          name="whatsapp"
          placeholder="DDD + WhatsApp"
          type="tel"
          inputMode="numeric"
          maxLength={15}
          value={whatsApp}
          onChange={(event) => setWhatsApp(formatWhatsApp(event.target.value))}
        />
        <Field label="Empresa" name="company" placeholder="Nome da empresa" />
        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField
            label="Qual o seu setor?"
            name="sector"
            options={sectorOptions}
          />
          <SelectField
            label="Faturamento mensal"
            name="revenue"
            options={revenueOptions}
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-8 flex min-h-16 w-full items-center justify-center rounded-[6px] bg-[#008723] px-5 py-4 text-sm font-bold uppercase leading-snug tracking-[0.12em] text-white shadow-[0_14px_28px_rgba(0,72,20,0.24)] transition hover:brightness-95 focus:outline-none focus:ring-4 focus:ring-[#008723]/25 sm:px-6"
      >
        Receber mais informações
      </button>
    </form>
  );
}
