export const formatDateWithSuffix = (dateString: string | Date | undefined) => {
  const date = new Date(dateString || "");

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" }); // Nov
  const year = date.getFullYear();

  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  return `${month} ${day}${suffix}, ${year}`;
};

export function getRelativeTime(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 10) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  if (weeks < 5) return `${weeks}w ago`;
  if (months < 12) return `${months}mo ago`;
  return `${years}y ago`;
}

export function calculateAge(dob: string | undefined): number | string {
  if (!dob) {
    return "-";
  }
  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

type TaxResult = {
  taxAmount: number;
  taxPercent: number;
};

export function calculateNigeriaPAYE(monthlyIncome: number): TaxResult {
  if (monthlyIncome <= 0) {
    return { taxAmount: 0, taxPercent: 0 };
  }

  const annualIncome = monthlyIncome * 12;

  let remaining = annualIncome;
  let annualTax = 0;

  // Progressive annual tax brackets
  const brackets = [
    { cap: 800_000, rate: 0 },
    { cap: 3_000_000, rate: 0.15 },
    { cap: 12_000_000, rate: 0.18 },
    { cap: 25_000_000, rate: 0.21 },
    { cap: 50_000_000, rate: 0.23 },
    { cap: Infinity, rate: 0.25 },
  ];

  let lowerBound = 0;

  for (const bracket of brackets) {
    const { cap, rate } = bracket;

    if (annualIncome > lowerBound) {
      const taxable = Math.min(remaining, cap - lowerBound);
      annualTax += taxable * rate;
      remaining -= taxable;
    }

    lowerBound = cap;
    if (remaining <= 0) break;
  }

  // Convert back to monthly
  const monthlyTax = annualTax / 12;

  const taxPercent = (monthlyTax / monthlyIncome) * 100;

  return {
    taxAmount: Number(monthlyTax.toFixed(2)),
    taxPercent: Number(taxPercent.toFixed(2)),
  };
}

export const formatAmount = (amount: number) => {
  if (amount < 1000) return amount.toString();

  if (amount < 1_000_000) {
    return (amount / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }

  if (amount < 1_000_000_000) {
    return (amount / 1_000_000).toFixed(1).replace(/\.0$/, "") + "m";
  }

  return (amount / 1_000_000_000).toFixed(2).replace(/\.00$/, "") + "b";
};
