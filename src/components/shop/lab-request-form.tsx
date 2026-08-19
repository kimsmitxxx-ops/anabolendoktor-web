"use client";
import { useState } from "react";
import { CheckCircle2, Loader2, Mail } from "lucide-react";

const SHOP_DASH_API = process.env.NEXT_PUBLIC_SHOP_DASH_URL || "https://shop-dash-ruby.vercel.app";
const SHOP_ID = "96b47e49-34fd-4d6c-99d3-d49d912be046";

type State = "idle" | "sending" | "sent" | "error";

export function LabRequestForm() {
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const product = String(fd.get("product") || "").trim();
    const merk = String(fd.get("merk") || "").trim();
    const twijfel = String(fd.get("twijfel") || "").trim();
    const message = [
      `Lab-test aanvraag via /lab`,
      ``,
      `Product: ${product || "-"}`,
      `Merk/batchcode: ${merk || "-"}`,
      `Twijfel over: ${twijfel || "-"}`,
    ].join("\n");

    try {
      const res = await fetch(`${SHOP_DASH_API}/api/support`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shopId: SHOP_ID,
          visitorName: name,
          visitorEmail: email,
          subject: `Lab-test aanvraag - ${product || "onbekend product"}`,
          message,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setState("sent");
    } catch (err: any) {
      setState("error");
      setErrorMsg(err?.message || "Kon aanvraag niet versturen");
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-xl border border-success/40 bg-success-soft/30 p-6 text-primary">
        <CheckCircle2 size={22} className="text-success" />
        <h3 className="mt-2 font-display text-xl">Aanvraag binnen - top!</h3>
        <p className="mt-2 text-sm text-primary/75">
          We nemen binnen 1 werkdag contact op met instructies hoe je je flacon naar Vlaardingen
          stuurt en wat er daarna gebeurt. Check uw inbox (en spam).
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Input name="name" label="Naam" placeholder="Voor- en achternaam" required />
        <Input name="email" label="E-mail" type="email" placeholder="u@voorbeeld.nl" required />
      </div>
      <Input name="product" label="Product" placeholder="bv. Testosteron Enanthate 250" required />
      <Input name="merk" label="Merk + batchcode (indien bekend)" placeholder="bv. Pharmacom · batch L23-0411" />
      <Input name="twijfel" label="Waarom wil je laten testen?" placeholder="bv. 'gear werkt niet zoals verwacht'" />
      <button
        type="submit"
        disabled={state === "sending"}
        className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent-soft disabled:opacity-60"
      >
        {state === "sending" ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Versturen…
          </>
        ) : (
          <>
            <Mail size={16} /> Vraag test aan
          </>
        )}
      </button>
      {state === "error" && (
        <p className="text-xs text-danger">
          {errorMsg}. Probeer anders het contactformulier op /contact.
        </p>
      )}
      <p className="text-[11px] text-primary/55">
        We reageren binnen 1 werkdag. Tarief = kostprijs Janoshik (~€60), gratis bij vermoeden
        onveilig product.
      </p>
    </form>
  );
}

function Input({
  name,
  label,
  type = "text",
  placeholder,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-primary/80 mb-1">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full h-10 px-3 rounded border border-primary-muted bg-paper-soft text-sm text-primary placeholder:text-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      />
    </label>
  );
}
