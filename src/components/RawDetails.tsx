import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { detailsStyles as s } from "../styles/detailsStyles";

interface BackButtonProps {
  label: string;
  onClick: () => void;
}

interface CoverImageProps {
  src: string;
  alt: string;
}

interface MetaItem {
  label: string;
  value: ReactNode;
}

interface RawDetailsProps {
  backLabel: string;
  onBack: () => void;
  title: string;
  subtitle?: string;
  tags?: ReactNode;
  image?: { src: string; alt: string };
  descriptionLabel?: string;
  description?: string;
  metaItems?: MetaItem[];
}

const BackButton = ({ label, onClick }: BackButtonProps) => (
  <button onClick={onClick} className={s.backButton}>
    <ArrowLeft size={16} />
    {label}
  </button>
);

const CoverImage = ({ src, alt }: CoverImageProps) => (
  <div className={s.coverFrame}>
    {src && (
      <img
        src={src}
        alt={alt}
        className={s.coverImage}
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = "";
        }}
      />
    )}
  </div>
);

const MetaRail = ({ items }: { items: MetaItem[] }) => {
  if (items.length === 0) return null;

  const [primary, ...rest] = items;

  return (
    <section className={s.metaRailSection}>
      <span aria-hidden="true" className={s.metaRailAccent} />

      <dl className={s.metaRailGrid}>
        <div className="space-y-1.5">
          <dt className={s.metaLabel}>{primary.label}</dt>
          <dd className={s.metaPrimaryValue}>{primary.value}</dd>
        </div>

        {rest.map((item) => (
          <div key={String(item.label)} className={s.metaSecondaryWrapper}>
            <dt className={s.metaLabel}>{item.label}</dt>
            <dd className="flex min-w-0 items-center gap-3">
              <span aria-hidden="true" className={s.metaSecondaryDash} />
              <span className={s.metaSecondaryValue}>{item.value}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

const RawDetails = ({
  backLabel,
  onBack,

  title,
  subtitle,
  tags,
  image,
  descriptionLabel = "Description",
  description,

  metaItems = [],
}: RawDetailsProps) => (
  <div className={s.pageWrapper}>
    <BackButton label={backLabel} onClick={onBack} />

    <div className={s.card}>
      <div className={s.cardGrid}>
        <div className={s.contentColumn}>
          <div className={s.headerGroup}>
            <div className={s.titleGroup}>
              <h1 className={s.title}>{title}</h1>
              {subtitle && <p className={s.subtitle}>{subtitle}</p>}
            </div>

            {tags && <div className={s.tagsRow}>{tags}</div>}
          </div>

          {image && (
            <div className={s.mobileImageWrapper}>
              <CoverImage src={image.src} alt={image.alt} />
            </div>
          )}

          {description && (
            <section className={s.descriptionSection}>
              <p className={s.descriptionLabel}>{descriptionLabel}</p>
              <p className={s.descriptionText}>{description}</p>
            </section>
          )}

          {metaItems.length > 0 && <MetaRail items={metaItems} />}
        </div>

        {image && (
          <div className={s.desktopImageWrapper}>
            <CoverImage src={image.src} alt={image.alt} />
          </div>
        )}
      </div>
    </div>
  </div>
);

export default RawDetails;
