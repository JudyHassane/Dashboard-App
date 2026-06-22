import { Link } from "react-router-dom";
export default function NotFoundScreen() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center pt-30">
      404 Not Found
      <Link to="/">Back to Home</Link>
    </div>
  );
}
