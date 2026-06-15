import React from "react";
import { cardVariants, ui } from "../styles/ui";

interface KpisCardProps {
  title: string;
  value: string | number;
  icon: React.ReactElement<{ className?: string }>;
  recent?: string;
  variant: keyof typeof cardVariants;
}

export const KpisCard = ({
  title,
  value,
  icon,
  recent,
  variant,
}: KpisCardProps) => {
  const styles = cardVariants[variant];

  const coloredIcon = React.cloneElement(icon, { className: styles.icon });

  return (
    <div
      className={`${ui.card} border-0 border-b-2 ${styles.accent} p-4  transition-all hover:-translate-y-1 hover:shadow-md`}
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${styles.bg}`}>{coloredIcon}</div>

        <p className={`${ui.text.primary} text-2xl font-bold`}>{value}</p>
      </div>

      <h3 className={`${ui.text.secondary} text-sm font-medium mt-3`}>
        {title}
      </h3>

      {recent && (
        <span
          className={`mt-1 inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${styles.icon} `}
        >
          {recent}
        </span>
      )}
    </div>
  );
};
