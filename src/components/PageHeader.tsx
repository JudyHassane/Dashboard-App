import type { ReactNode } from "react";

interface PageHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
}

const PageHeader = ({ title, subtitle, action }: PageHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>

        {subtitle && <div className="mt-1">{subtitle}</div>}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
};

export default PageHeader;
