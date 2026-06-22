import BookHeader from "../components/BookHeader";
import BookKpis from "../components/BookKpis";
import BookTable from "../components/BookTable";

const BooksScreen = () => {
  return (
    <div className="space-y-6">
      <BookHeader />
      <BookKpis />
      <BookTable />
    </div>
  );
};

export default BooksScreen;
