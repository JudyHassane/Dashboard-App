import {
  Autocomplete,
  Box,
  Chip,
  Divider,
  InputAdornment,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { BookOpen, Hash, ImageIcon, LinkIcon, Upload } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Controller,
  useForm,
  useWatch,
  type Resolver,
  type SubmitHandler,
} from "react-hook-form";
import { booksStyles } from "../../../styles/booksStyles";
import { type Book } from "../../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  bookSchema,
  type BookFormData,
} from "../../../validationSchemas/book.schema";
import { toast } from "react-toastify";
import FormDialog from "../../../components/FormDialog";
import { useAppDispatch, useAppSelector } from "../../../store/features/hooks";
import {
  createBook,
  getCategories,
  updateBook,
  uploadBookCover,
} from "../../../store/features/books/api";
import { useDebounce } from "../../../hooks/useDebounce";

type FormType = "add" | "edit";

interface BookFormDialogProps {
  type: FormType;
  dialogIsOpen: boolean;
  onDialogClose: () => void;
  selectedBook: Book | null;
}

const getDefaultValues = (book: Book | null): BookFormData => {
  if (!book) {
    return {
      title: "",
      author: "",
      isbn: "",
      description: "",
      categoryName: "",
      coverImage: "",
      price: 0,
      stock: 0,
      imageMode: "url",
    };
  }
  const isUrl = /^https?:\/\//i.test(book.coverImage);
  return {
    title: book.title,
    author: book.author.name,
    isbn: book.isbn,
    description: book.description ?? "",
    categoryName: book.category.name,
    coverImage: book.coverImage,
    price: book.price,
    stock: book.stock,
    imageMode: isUrl ? "url" : "upload",
  };
};

const preventNegativeValues = (e: React.FormEvent<HTMLDivElement>) => {
  const input = e.target as HTMLInputElement;
  if (input.value !== "" && Number(input.value) < 0) {
    input.value = "0";
  }
};

const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const BookFormDialog = ({
  type: formType,
  dialogIsOpen: open,
  onDialogClose: onClose,
  selectedBook,
}: BookFormDialogProps) => {
  const dispatch = useAppDispatch();
  const isAdd = formType === "add";

  const { actionsStatus, categories } = useAppSelector((state) => state.books);

  const {
    reset,
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting, isDirty, isValid },
    setValue,
    setError,
    clearErrors,
  } = useForm<BookFormData>({
    defaultValues: getDefaultValues(selectedBook),
    resolver: zodResolver(bookSchema) as Resolver<BookFormData>,
    mode: "onChange",
  });

  const isActionLoading = actionsStatus === "loading";
  const isSubmitLoading = isSubmitting || isActionLoading;
  const isSubmitDisabled =
    isSubmitLoading || (isAdd ? !isValid : !isDirty || !isValid);

  const imageMode = useWatch({ control, name: "imageMode" });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (open) {
      reset(getDefaultValues(selectedBook));
    }
  }, [selectedBook, open, reset]);

  const stock = useWatch({
    control,
    name: "stock",
  });

  const isAvailable = stock > 0;

  const onSubmit: SubmitHandler<BookFormData> = async (data) => {
    try {
      const { imageMode, ...bookData } = data;

      if (imageMode === "upload" && selectedFile) {
        const uploadResult = await dispatch(
          uploadBookCover(selectedFile),
        ).unwrap();
        bookData.coverImage = uploadResult.storageKey;
      }

      if (selectedBook) {
        await dispatch(
          updateBook({ id: selectedBook.id, payload: bookData }),
        ).unwrap();
      } else {
        await dispatch(createBook(bookData)).unwrap();
      }

      toast.success(
        selectedBook
          ? "Book updated successfully!"
          : "Book added successfully!",
      );
      onClose();
    } catch {
      //
    }
  };

  const [categorySearch, setCategorySearch] = useState("");
  const debouncedCategorySearch = useDebounce(categorySearch);

  const loadCategories = useCallback(
    (searchQuery = "", pageNumber = 1) => {
      dispatch(getCategories({ searchQuery, pageNumber, pageSize: 4 }));
    },
    [dispatch],
  );

  useEffect(() => {
    if (debouncedCategorySearch) {
      loadCategories(debouncedCategorySearch, 1);
    }
  }, [debouncedCategorySearch, loadCategories]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      setError("coverImage", {
        type: "manual",
        message: "Only JPG, PNG, and WEBP images are allowed",
      });
      e.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("coverImage", {
        type: "manual",
        message: "Image must be smaller than 5MB",
      });
      e.target.value = "";
      return;
    }

    clearErrors("coverImage");
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setSelectedFile(file);
    setValue("coverImage", file.name, { shouldValidate: true });
  };

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  return (
    <FormDialog
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title={isAdd ? "Add New Book" : "Edit Book"}
      subtitle={
        isAdd
          ? "Fill in the details to add a new book"
          : "Update the book details below"
      }
      icon={<BookOpen size={20} />}
      isCancelDisabled={isActionLoading}
      isSubmitDisabled={isSubmitDisabled}
      isSubmitting={isSubmitLoading}
      submitLabel={isAdd ? "Add Book" : "Save Changes"}
      loadingSubmitLabel={isAdd ? "Adding..." : "Saving..."}
    >
      <Box sx={booksStyles.formFieldRow}>
        <TextField
          {...register("isbn")}
          required
          label="ISBN (Book ID)"
          error={!!errors.isbn}
          helperText={errors.isbn?.message}
          size="small"
          placeholder="e.g. 9783161484100"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Hash size={12} />
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          {...register("title")}
          label="Title"
          required
          error={!!errors.title}
          helperText={errors.title?.message}
          size="small"
        />
      </Box>
      <Box sx={booksStyles.formFieldRow}>
        <TextField
          {...register("author")}
          label="Author"
          required
          error={!!errors.author}
          helperText={errors.author?.message}
          size="small"
        />

        <Controller
          name="categoryName"
          control={control}
          render={({ field }) => (
            <Autocomplete
              freeSolo
              options={categories.map((c) => c.name)}
              value={field.value}
              onChange={(_e, newValue) => {
                field.onChange(newValue ?? "");
              }}
              onInputChange={(_e, newInput, reason) => {
                if (reason === "input") {
                  field.onChange(newInput);
                  setCategorySearch(newInput);
                }
              }}
              onOpen={() => {
                loadCategories("", 1);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  required
                  error={!!errors.categoryName}
                  helperText={errors.categoryName?.message}
                  size="small"
                />
              )}
            />
          )}
        />
      </Box>
      <Divider sx={{ my: 0.5 }} />
      <Box sx={booksStyles.formFieldRowThreeCol}>
        <TextField
          {...register("price")}
          label="Price ($)"
          type="number"
          fullWidth
          error={!!errors.price}
          helperText={errors.price?.message}
          size="small"
          slotProps={{
            htmlInput: { min: 0 },
          }}
          onInput={preventNegativeValues}
        />

        <TextField
          {...register("stock")}
          label="Stock"
          type="number"
          fullWidth
          error={!!errors.stock}
          helperText={
            errors.stock?.message ??
            (isAvailable ? "Auto: Available" : "Auto: Out of stock")
          }
          size="small"
          slotProps={{
            htmlInput: { min: 0 },
          }}
          onInput={preventNegativeValues}
        />

        <Box sx={{ pb: "22px" }}>
          <Chip
            label={isAvailable ? "Available" : "Out of stock"}
            color={isAvailable ? "success" : "error"}
            variant="outlined"
            sx={booksStyles.statusChip}
          />
        </Box>
      </Box>
      <TextField
        {...register("description")}
        label="Description"
        fullWidth
        multiline
        rows={2}
        size="small"
        error={!!errors.description}
        helperText={errors.description?.message}
      />
      <Box>
        <ToggleButtonGroup
          value={imageMode}
          exclusive
          onChange={(_e, newMode) => {
            if (newMode) {
              setValue("imageMode", newMode, {
                shouldValidate: true,
                shouldDirty: true,
              });
              setImagePreview(null);
              setSelectedFile(null);
              setValue("coverImage", "", {
                shouldValidate: true,
                shouldDirty: true,
              });
            }
          }}
          size="small"
          fullWidth
          sx={booksStyles.imageToggleGroup}
        >
          <ToggleButton value="url" sx={booksStyles.imageToggleButton}>
            <LinkIcon size={14} style={{ marginRight: 6 }} />
            Paste URL
          </ToggleButton>

          <ToggleButton value="upload" sx={booksStyles.imageToggleButton}>
            <Upload size={14} style={{ marginRight: 6 }} />
            Upload Image
          </ToggleButton>
        </ToggleButtonGroup>

        {imageMode === "url" && (
          <TextField
            {...register("coverImage")}
            label="Cover Image URL"
            fullWidth
            size="small"
            required
            error={!!errors.coverImage}
            helperText={errors.coverImage?.message}
            placeholder="https://example.com/cover.jpg"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <ImageIcon size={12} />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}

        {imageMode === "upload" && (
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
            <Box
              onClick={() => fileInputRef.current?.click()}
              sx={booksStyles.imageDropzone(
                !!imagePreview,
                !!errors.coverImage,
              )}
            >
              {imagePreview ? (
                <Box
                  component="img"
                  src={imagePreview}
                  alt="Cover preview"
                  sx={booksStyles.imagePreview}
                />
              ) : (
                <>
                  <Upload size={20} style={{ marginBottom: 6, opacity: 0.5 }} />
                  <Typography variant="caption" color="text.secondary">
                    Click to browse
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.disabled"
                    sx={booksStyles.imageDropzoneHint}
                  >
                    PNG, JPG, WebP
                  </Typography>
                </>
              )}
            </Box>
            {errors.coverImage && (
              <Typography
                variant="caption"
                color="error"
                sx={booksStyles.imageUploadError}
              >
                {errors.coverImage.message}
              </Typography>
            )}
          </>
        )}
      </Box>
    </FormDialog>
  );
};

export default BookFormDialog;
