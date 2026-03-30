// TODO: Replace ignore with AbortController or other when using a real api

import { useState, useEffect, useMemo } from "react";
import type { Book } from "../utils/types";
import {
  fetchBooks,
  fetchActivities,
  type Activity,
} from "../services/book.service";

export const useStatsCard = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    let ignore = false;

    const loadData = async () => {
      setLoading(true);
      const [booksData, activitiesData] = await Promise.all([
        fetchBooks(),
        fetchActivities(),
      ]);
      if (!ignore) {
        setBooks(booksData);
        setActivities(activitiesData);
        setLoading(false);
      }
    };

    loadData();

    return () => {
      ignore = true;
    };
  }, []);

  const totalBooks = books.length;

  const availableBooks = useMemo(
    () => books.filter((b) => b.status === "Available").length,
    [books],
  );

  const outOfStockBooks = useMemo(
    () => books.filter((b) => b.status === "Out of stock").length,
    [books],
  );

  const totalValue = useMemo(() => {
    return books.reduce((sum, book) => sum + book.price * book.stock, 0);
  }, [books]);

  return {
    loading,
    totalBooks,
    availableBooks,
    outOfStockBooks,
    totalValue,
    books,
    activities,
  };
};
