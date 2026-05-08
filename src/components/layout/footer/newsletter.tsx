'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight, Check } from "lucide-react";
import { motionTokens } from "@/lib/motion";
import { useTranslations } from "@/hooks/use-translations";

export function Newsletter() {
  const { t } = useTranslations();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("submitting");
    // Simulate subscription
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
          {t("newsletter.title")}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {t("newsletter.description")}
        </p>
      </div>

      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400"
        >
          <Check className="h-4 w-4" />
          <span>{t("newsletter.success")}</span>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="email"
              placeholder={t("newsletter.placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-10 pl-9 text-sm"
              aria-label="Email for newsletter"
            />
          </div>
          <Button
            type="submit"
            size="sm"
            disabled={status === "submitting"}
            className="h-10 gap-1 px-4"
          >
            <span className="hidden sm:inline">{t("newsletter.subscribe")}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      )}
    </div>
  );
}