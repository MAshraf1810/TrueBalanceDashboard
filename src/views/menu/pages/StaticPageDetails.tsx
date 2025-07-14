import StaticPageDetailsUi from "../../components/one-time/StaticPageDetailsUi";
import { useLocation } from "react-router-dom";

const StaticPageDetails = () => {
  const location = useLocation();
  const payload = location.state;

  return (
    <div>
      <StaticPageDetailsUi
        description={payload.text.en}
        imageUrl={payload.image}
        title={payload.title.en}
      />
    </div>
  );
};

export default StaticPageDetails;
