import { useAppSelector } from "../../../store/features/hooks";
import { ui } from "../../../styles/ui";
import { dashboardStyles } from "../../../styles/dashboardStyles";
import { useImageSrc } from "../../../hooks/useImageSrc";
import type { TopChoices } from "../../../types/dashboard.types";
import { useNavigate } from "react-router-dom";

const TopChoiceCover = ({ item }: { item: TopChoices }) => {
  const coverSrc = useImageSrc(item.coverImage);

  return (
    <div className={dashboardStyles.topChoices.imageContainer}>
      <div className={dashboardStyles.topChoices.imageInner}>
        {coverSrc && (
          <img
            src={coverSrc}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
};

const TopChoicesSection = () => {
  const navigate = useNavigate();
  const { topChoices } = useAppSelector((state) => state.dashboard);

  return (
    <div className={dashboardStyles.topChoices.container}>
      <h2 className={`text-xl ${ui.text.heading} mb-4`}>Top Choices</h2>

      <div className={dashboardStyles.topChoices.scrollRow}>
        {topChoices.map((item) => (
          <div
            key={item.id}
            className={dashboardStyles.topChoices.cardWrapper}
            onClick={() => navigate(`/books/${item.id}`)}
          >
            <TopChoiceCover item={item} />

            <p
              className={`mt-2 text-sm font-semibold ${ui.text.primary} truncate`}
            >
              {item.title}
            </p>

            <p className={`text-xs ${ui.text.secondary} truncate`}>
              {item.author.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopChoicesSection;
