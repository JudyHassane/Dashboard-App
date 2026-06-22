import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Chip } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../store/features/hooks";
import { getBook } from "../../../store/features/books/api";
import { clearSelectedBook } from "../../../store/features/books/slice";
import RawDetails from "../../../components/RawDetails";
import Error from "../../../components/draft/Error";
import Loading from "../../../components/Loading";
import { detailsStyles as ds } from "../../../styles/detailsStyles";
import { useImageSrc } from "../../../hooks/useImageSrc";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { selectedBook, fetchBookStatus, error } = useAppSelector(
    (state) => state.books,
  );

  const coverSrc = useImageSrc(selectedBook?.coverImage);

  useEffect(() => {
    if (id) {
      dispatch(getBook(Number(id)));
    }

    return () => {
      dispatch(clearSelectedBook());
    };
  }, [dispatch, id]);

  const goBack = () => navigate("/books");

  if (fetchBookStatus === "loading") {
    return <Loading />;
  }

  if (fetchBookStatus === "failed") {
    return (
      <div className="space-y-4">
        <BackButton onClick={goBack} />
        <Error
          message={error?.message}
          onRetry={() => id && dispatch(getBook(Number(id)))}
        />
      </div>
    );
  }

  if (!selectedBook) {
    return (
      <div className="space-y-4">
        <BackButton onClick={goBack} />
        <div className={ds.notFoundCard}>
          <p className={ds.notFoundText}>Book not found.</p>
        </div>
      </div>
    );
  }

  const isAvailable = selectedBook.status === "available";

  return (
    <RawDetails
      backLabel="Back to Books"
      onBack={goBack}
      title={selectedBook.title}
      subtitle={`By ${selectedBook.author.name}`}
      tags={
        <>
          <Chip
            label={selectedBook.category.name}
            size="small"
            sx={ds.categoryChip}
          />
          <Chip
            label={selectedBook.status}
            size="small"
            variant="outlined"
            color={isAvailable ? "success" : "error"}
            sx={ds.statusChip}
          />
        </>
      }
      image={{ src: coverSrc, alt: selectedBook.title }}
      description={selectedBook.description}
      metaItems={[
        { label: "Price", value: `$${Number(selectedBook.price).toFixed(2)}` },
        { label: "ISBN", value: selectedBook.isbn },
      ]}
    />
  );
};

export default BookDetails;

const BackButton = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick} className={ds.backButton}>
    <ArrowLeft size={16} />
    Back to Books
  </button>
);
