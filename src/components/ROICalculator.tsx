import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const roiSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Please enter a valid name"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  phone: z
    .string()
    .min(8, "Please enter a valid phone number")
    .regex(/^[\+]?[0-9\s\-]{8,20}$/, "Please enter a valid phone number"),
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters"),
  employeeCount: z.string().min(1, "Please select employee count"),
  industry: z.string().min(1, "Please select your industry"),
  monthlyRevenue: z.string().min(1, "Please select revenue range"),
  currentSystem: z.string().optional(),
});

type ROIFormData = z.infer<typeof roiSchema>;

const ROICalculator = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [ctaIntent, setCtaIntent] = useState<"roi-report" | "free-trial">("roi-report");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<ROIFormData>({
    resolver: zodResolver(roiSchema),
    mode: "onBlur",
    defaultValues: {
      employeeCount: "11-50",
      industry: "professional-services",
      monthlyRevenue: "50k-100k",
    },
  });

  const watchedEmployeeCount = watch("employeeCount") || "11-50";
  const watchedRevenue = watch("monthlyRevenue") || "50k-100k";
  const watchedIndustry = watch("industry") || "professional-services";
  const watchedCompany = watch("companyName") || "Your Company";

  const roiSnapshot = useMemo(() => {
    const employeeCountMap: Record<string, number> = {
      "1-10": 5,
      "11-50": 30,
      "51-100": 75,
      "101-500": 250,
      "500+": 550,
    };

    const revenueRateMap: Record<string, number> = {
      "10k-50k": 75,
      "50k-100k": 110,
      "100k-500k": 150,
      "500k-1m": 200,
      "1m+": 250,
    };

    const industryMultiplier: Record<string, number> = {
      "real-estate": 1.1,
      "property-management": 1.08,
      trading: 1.05,
      manufacturing: 1.15,
      retail: 1.07,
      "professional-services": 1.12,
      other: 1,
    };

    const employees = employeeCountMap[watchedEmployeeCount] ?? 20;
    const hourlyRate = Math.round(
      (revenueRateMap[watchedRevenue] ?? 120) * (industryMultiplier[watchedIndustry] ?? 1)
    );

    const monthlyHoursSaved = Math.max(40, Math.round(employees * 12));
    const monthlySavings = Math.max(5000, monthlyHoursSaved * hourlyRate);
    const annualSavings = monthlySavings * 12;
    const implementationCost = 4999 + employees * 45;
    const roiPercent = Math.max(0, Math.round(((annualSavings - implementationCost) / implementationCost) * 100));
    const paybackMonths = Math.max(0.5, parseFloat((implementationCost / monthlySavings).toFixed(1)));

    return {
      employees,
      hourlyRate,
      monthlyHoursSaved,
      monthlySavings,
      annualSavings,
      implementationCost,
      roiPercent,
      paybackMonths,
    };
  }, [watchedEmployeeCount, watchedIndustry, watchedRevenue]);

  const snapshotData = useMemo(
    () => [
      {
        label: "Payback Period",
        value: `${roiSnapshot.paybackMonths} months`,
        helper: "Based on savings vs. implementation",
      },
      {
        label: "Annual Savings",
        value: `AED ${roiSnapshot.annualSavings.toLocaleString()}`,
        helper: "Efficiency + labor reduction",
        emphasize: true,
      },
      {
        label: "Monthly Savings",
        value: `AED ${roiSnapshot.monthlySavings.toLocaleString()}`,
        helper: `${roiSnapshot.monthlyHoursSaved} hours saved / month`,
      },
      {
        label: "Estimated Investment",
        value: `AED ${roiSnapshot.implementationCost.toLocaleString()}`,
        helper: "Fixed setup + configuration",
      },
    ],
    [roiSnapshot]
  );

  const reportContent = useMemo(() => {
    return [
      "SGC TECH AI | ROI Snapshot",
      "----------------------------------------",
      `Company: ${watchedCompany || "Your Company"}`,
      `Employees (est.): ${roiSnapshot.employees}`,
      `Industry: ${watchedIndustry}`,
      `Revenue Band: ${watchedRevenue}`,
      "",
      "Efficiency Gains",
      `- Monthly hours saved: ${roiSnapshot.monthlyHoursSaved} hours`,
      `- Average hourly rate: AED ${roiSnapshot.hourlyRate.toLocaleString()}`,
      `- Monthly savings: AED ${roiSnapshot.monthlySavings.toLocaleString()}`,
      `- Annual savings: AED ${roiSnapshot.annualSavings.toLocaleString()}`,
      "",
      "Investment & ROI",
      `- Implementation investment: AED ${roiSnapshot.implementationCost.toLocaleString()}`,
      `- Payback period: ${roiSnapshot.paybackMonths} month(s)`,
      `- Projected ROI: ${roiSnapshot.roiPercent}%`,
      "",
      "Next Steps",
      "1) Share this report with your stakeholders",
      "2) Book a consultation to validate assumptions",
      "3) Start your 14-day implementation sprint",
    ].join("\n");
  }, [roiSnapshot, watchedCompany, watchedIndustry, watchedRevenue]);

  const assessment = useMemo(() => {
    const roi = roiSnapshot.roiPercent;
    if (roi >= 500) {
      return {
        title: "High Impact",
        summary: "Fast-track rollout recommended. You qualify for an accelerated 14-day go-live with executive alignment.",
        actions: "Book a leadership workshop and schedule the pilot sprint this week.",
      };
    }
    if (roi >= 200) {
      return {
        title: "Strong Fit",
        summary: "ROI justifies a rapid implementation with a focused pilot.",
        actions: "Confirm scope, finalize data cut, and lock the implementation calendar.",
      };
    }
    return {
      title: "Validate Assumptions",
      summary: "ROI is positive but assumptions need validation to de-risk the rollout.",
      actions: "Run a discovery session to refine inputs and model a narrower pilot first.",
    };
  }, [roiSnapshot.roiPercent]);

  const handleDownloadReport = () => {
    const safeName = watchedCompany.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const fileName = `${safeName || "roi-report"}-sgc-tech-ai.txt`;
    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrintPdf = () => {
    const printWindow = window.open("", "_blank", "width=800,height=1000");
    if (!printWindow) {
      toast.error("Please allow pop-ups to print your report.");
      return;
    }

    const html = `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>ROI Report - ${watchedCompany}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 24px; color: #0f172a; }
          h1 { font-size: 22px; margin-bottom: 4px; }
          h2 { font-size: 16px; margin: 16px 0 8px; }
          table { width: 100%; border-collapse: collapse; margin: 12px 0; }
          th, td { border: 1px solid #cbd5e1; padding: 8px; text-align: left; font-size: 12px; }
          th { background: #f1f5f9; }
          .tag { display: inline-block; padding: 4px 8px; background: #e0f2fe; color: #075985; border-radius: 6px; font-size: 11px; }
          .muted { color: #475569; font-size: 12px; }
        </style>
      </head>
      <body>
        <h1>ROI Report</h1>
        <div class="muted">${new Date().toLocaleString()}</div>
        <h2>Company</h2>
        <div><strong>${watchedCompany || "Your Company"}</strong></div>
        <div class="muted">Industry: ${watchedIndustry} | Revenue: ${watchedRevenue} | Employees: ${roiSnapshot.employees}</div>

        <h2>ROI Snapshot</h2>
        <table>
          <tr><th>Metric</th><th>Value</th></tr>
          ${snapshotData
            .map(
              (item) => `<tr><td>${item.label}</td><td>${item.value}</td></tr>`
            )
            .join("")}
          <tr><td>Projected ROI</td><td>${roiSnapshot.roiPercent}%</td></tr>
        </table>

        <h2>Assessment</h2>
        <div class="tag">${assessment.title}</div>
        <p>${assessment.summary}</p>
        <p class="muted">Next step: ${assessment.actions}</p>

        <h2>Details</h2>
        <pre style="background:#f8fafc; padding:12px; border:1px solid #e2e8f0; border-radius:8px; font-size:12px; white-space:pre-wrap;">${reportContent}</pre>
      </body>
    </html>`;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const onSubmit = async (data: ROIFormData) => {
    setStatus("loading");
    
    try {
      const formData = new FormData();
      formData.append("access_key", "60d099bd-01f2-43df-8c03-514bc2331804");
      formData.append("name", data.fullName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("company", data.companyName);
      formData.append("employees", data.employeeCount);
      formData.append("industry", data.industry);
      formData.append("revenue", data.monthlyRevenue);
      formData.append("current_system", data.currentSystem || "Not specified");
      formData.append("cta", ctaIntent);
      formData.append(
        "subject",
        ctaIntent === "free-trial"
          ? "Free Trial + ROI Calculator Submission - SGC TECH AI"
          : "ROI Calculator Submission - SGC TECH AI"
      );
      formData.append("action", ctaIntent === "free-trial" ? "start-free-trial" : "calculate-roi");
      formData.append("source", "roi-calculator");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        toast.success("Your ROI report has been sent to your email!");
        
        setTimeout(() => {
          reset();
          setCtaIntent("roi-report");
          setStatus("idle");
        }, 3000);
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      setStatus("error");
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="roi-calculator" className="py-4xl relative">
      <div className="container max-w-6xl px-4">
        <div className="text-center mb-3xl">
          <h2 className="text-gradient mb-lg">Calculate Your ROI</h2>
          <p className="text-foreground-muted text-lg">
            Discover how much you could save with AI-powered ERP implementation
          </p>
        </div>

        <div className="glass rounded-xl p-2xl">
          <div className="flex flex-col md:flex-row items-center gap-md justify-between border border-border/60 rounded-lg bg-background/60 px-xl py-lg mb-xl">
            <div className="text-center md:text-left">
              <p className="text-foreground font-semibold">Prefer to try it live?</p>
              <p className="text-foreground-muted text-sm">Start a 14-day free trial of the Professional plan—no credit card required.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-sm w-full md:w-auto">
              <Button
                className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={() => (window.location.href = "/pricing")}
              >
                Start Free Trial
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => (window.location.href = "#contact")}
              >
                Talk to an Expert
              </Button>
            </div>
          </div>
          <div className="grid gap-xl lg:grid-cols-[1.05fr_0.95fr] items-start">
            <div className="bg-background/50 border border-border/60 rounded-xl p-xl shadow-lg">
              {status === "success" ? (
                <div className="text-center py-3xl animate-fade-in">
                  <CheckCircle className="w-16 h-16 text-success mx-auto mb-lg" />
                  <h3 className="text-2xl font-bold text-foreground mb-md">Success!</h3>
                  <p className="text-foreground-muted">
                    Your ROI report has been sent to your email. We'll contact you within 24 hours.
                  </p>
                </div>
              ) : status === "error" ? (
                <div className="text-center py-3xl animate-fade-in">
                  <XCircle className="w-16 h-16 text-destructive mx-auto mb-lg" />
                  <h3 className="text-2xl font-bold text-foreground mb-md">Submission Failed</h3>
                  <p className="text-foreground-muted mb-lg">
                    Something went wrong. Please try again or contact us directly.
                  </p>
                  <Button onClick={() => setStatus("idle")} variant="outline">
                    Try Again
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-lg">
                  {/* Honeypot for spam protection */}
                  <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

                  <div className="grid md:grid-cols-2 gap-lg">
                    <div className="space-y-sm">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        placeholder="John Smith"
                        {...register("fullName")}
                        className={errors.fullName ? "border-destructive" : ""}
                      />
                      {errors.fullName && (
                        <p className="text-sm text-destructive">{errors.fullName.message}</p>
                      )}
                    </div>

                    <div className="space-y-sm">
                      <Label htmlFor="email">Business Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        {...register("email")}
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-lg">
                    <div className="space-y-sm">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+971 50 967 5518"
                        {...register("phone")}
                        className={errors.phone ? "border-destructive" : ""}
                      />
                      {errors.phone && (
                        <p className="text-sm text-destructive">{errors.phone.message}</p>
                      )}
                    </div>

                    <div className="space-y-sm">
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        placeholder="Your Company LLC"
                        {...register("companyName")}
                        className={errors.companyName ? "border-destructive" : ""}
                      />
                      {errors.companyName && (
                        <p className="text-sm text-destructive">{errors.companyName.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-lg">
                    <div className="space-y-sm">
                      <Label htmlFor="employeeCount">Number of Employees *</Label>
                      <Select
                        value={watchedEmployeeCount}
                        onValueChange={(value) => setValue("employeeCount", value, { shouldValidate: true })}
                      >
                        <SelectTrigger className={errors.employeeCount ? "border-destructive" : ""}>
                          <SelectValue placeholder="Select employee count" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="51-100">51-100 employees</SelectItem>
                          <SelectItem value="101-500">101-500 employees</SelectItem>
                          <SelectItem value="500+">500+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.employeeCount && (
                        <p className="text-sm text-destructive">{errors.employeeCount.message}</p>
                      )}
                    </div>

                    <div className="space-y-sm">
                      <Label htmlFor="industry">Industry *</Label>
                      <Select
                        value={watchedIndustry}
                        onValueChange={(value) => setValue("industry", value, { shouldValidate: true })}
                      >
                        <SelectTrigger className={errors.industry ? "border-destructive" : ""}>
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="real-estate">Real Estate</SelectItem>
                          <SelectItem value="property-management">Property Management</SelectItem>
                          <SelectItem value="trading">Trading & Distribution</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="professional-services">Professional Services</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.industry && (
                        <p className="text-sm text-destructive">{errors.industry.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-lg">
                    <div className="space-y-sm">
                      <Label htmlFor="monthlyRevenue">Monthly Revenue (AED) *</Label>
                      <Select
                        value={watchedRevenue}
                        onValueChange={(value) => setValue("monthlyRevenue", value, { shouldValidate: true })}
                      >
                        <SelectTrigger className={errors.monthlyRevenue ? "border-destructive" : ""}>
                          <SelectValue placeholder="Select revenue range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10k-50k">AED 10,000 - 50,000</SelectItem>
                          <SelectItem value="50k-100k">AED 50,000 - 100,000</SelectItem>
                          <SelectItem value="100k-500k">AED 100,000 - 500,000</SelectItem>
                          <SelectItem value="500k-1m">AED 500,000 - 1M</SelectItem>
                          <SelectItem value="1m+">AED 1M+</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.monthlyRevenue && (
                        <p className="text-sm text-destructive">{errors.monthlyRevenue.message}</p>
                      )}
                    </div>

                    <div className="space-y-sm">
                      <Label htmlFor="currentSystem">Current ERP System (Optional)</Label>
                      <Input
                        id="currentSystem"
                        placeholder="e.g., SAP, Oracle, Tally"
                        {...register("currentSystem")}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-sm">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-semibold pulse-glow"
                      disabled={status === "loading"}
                      onClick={() => setCtaIntent("roi-report")}
                    >
                      {status === "loading" && ctaIntent === "roi-report" ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Calculating...
                        </>
                      ) : (
                        "Calculate My ROI"
                      )}
                    </Button>

                    <Button
                      type="submit"
                      variant="outline"
                      className="w-full sm:w-auto"
                      disabled={status === "loading"}
                      onClick={() => setCtaIntent("free-trial")}
                    >
                      {status === "loading" && ctaIntent === "free-trial" ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Start Free Trial"
                      )}
                    </Button>
                  </div>

                  <p className="text-sm text-foreground-subtle text-center">
                    By submitting this form, you agree to our Privacy Policy. We'll use your information to calculate ROI,
                    share the report, or start your 14-day free trial. No spam, ever.
                  </p>
                </form>
              )}
            </div>

            <div className="bg-background/50 border border-border/60 rounded-xl p-xl shadow-lg space-y-md">
              <div className="flex items-start justify-between gap-md">
                <div>
                  <p className="text-foreground-muted text-sm uppercase tracking-wide">Instant ROI Snapshot</p>
                  <h3 className="text-2xl font-bold text-foreground">Live results as you fill the form</h3>
                </div>
                <div className="bg-accent/15 text-accent-foreground border border-accent/40 rounded-lg px-md py-sm text-center">
                  <p className="text-xs uppercase tracking-wide">Projected ROI</p>
                  <p className="font-display text-3xl font-black">{roiSnapshot.roiPercent}%</p>
                </div>
              </div>

              <div className="rounded-xl border border-border/60 bg-background/30 divide-y divide-border/40 overflow-hidden">
                <div className="grid grid-cols-2 gap-0 divide-x divide-border/40 text-xs uppercase tracking-wide text-foreground-muted bg-background/40">
                  <div className="px-md py-sm">Metric</div>
                  <div className="px-md py-sm">Value</div>
                </div>
                {snapshotData.map((item) => (
                  <div key={item.label} className="grid grid-cols-2 gap-0 divide-x divide-border/40">
                    <div className="px-md py-md flex flex-col gap-1">
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                      <span className="text-xs text-foreground-subtle">{item.helper}</span>
                    </div>
                    <div className="px-md py-md flex items-center justify-end">
                      <span className={cn("text-lg font-semibold", item.emphasize ? "text-success" : "text-foreground")}>{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-border/60 bg-background/40 p-md space-y-sm">
                <p className="text-xs uppercase tracking-wide text-foreground-muted">Initial Assessment</p>
                <div className="flex items-center justify-between gap-sm flex-wrap">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{assessment.title}</p>
                    <p className="text-xs text-foreground-subtle max-w-lg">{assessment.summary}</p>
                  </div>
                  <span className="px-sm py-1 rounded-md bg-accent/15 border border-accent/30 text-accent-foreground text-xs">Projected ROI {roiSnapshot.roiPercent}%</span>
                </div>
                <p className="text-xs text-foreground-subtle">Next step: {assessment.actions}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-sm">
                <Button
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={handleDownloadReport}
                  type="button"
                >
                  Download ROI Report
                </Button>
                <Button
                  variant="secondary"
                  className="w-full sm:w-auto"
                  onClick={handlePrintPdf}
                  type="button"
                >
                  Print as PDF
                </Button>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => (window.location.href = "/pricing")}
                  type="button"
                >
                  Start Free Trial
                </Button>
              </div>
              <p className="text-xs text-foreground-subtle">
                Download includes your inputs, savings math, and next-step checklist. Update any field to refresh the snapshot instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
