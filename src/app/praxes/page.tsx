"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import debounce from "lodash/debounce";
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/solid";
import { Praxis } from "@/types";
import Error from "@/components/Error";
import PraxisCard from "@/components/PraxisCard";

export default function PraxisPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [praxisPosts, setPraxisPosts] = useState<Praxis[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  // Fetch & set tasks
  const fetchPraxisPosts = useCallback(
    async (pageNum: number, isInitialSearch = false) => {
      if (!hasMore && !isInitialSearch) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/praxis`,
          {
            params: {
              searchInput: searchTerm,
              sortOrder: sortOrder,
              page: pageNum,
              pageSize: 20,
            },
          }
        );
        console.log("praxes:", data);
        setPraxisPosts((prev) =>
          isInitialSearch ? data.praxisPosts : [...prev, ...data.praxisPosts]
        );
        setPage((prev) => prev + 1);
        setHasMore(data.praxisPosts.length > 0);
      } catch (error) {
        console.error("Failed to fetch praxis posts:", error);
        setError(
          "Sorry, an error occurred fetching the praxis posts! Please reload."
        );
      } finally {
        setLoading(false);
      }
    },
    [hasMore, searchTerm, sortOrder]
  ); // Dependencies for useCallback

  // Debounced search handler
  useEffect(() => {
    setError("");
    const debouncedFetch = debounce(() => {
      setPage(1);
      setPraxisPosts([]);
      setHasMore(true);
      fetchPraxisPosts(1, true);
    }, 500);

    debouncedFetch();

    return () => debouncedFetch.cancel();
  }, [searchTerm, sortOrder]);

  // Last task ref setup for infinite scroll
  const lastPraxisRef = useCallback(
    (node: Element | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            fetchPraxisPosts(page);
          }
        },
        { rootMargin: "100px" }
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, page, fetchPraxisPosts]
  );

  return (
    <div className="flex flex-col items-center my-24 mx-6 md:mx-24 xl:mx-64">
      {/* Header */}
      <section className="flex w-full justify-between items-center mb-4 gap-4">
        <h1 className="font-bold dark:text-gray-400">Praxes</h1>
        <div className="w-full relative">
          {/* Search */}
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border-2 rounded-lg dark:bg-smoke-50 dark:border-dusk-800 dark:focus:outline-none dark:focus:border-dusk-600"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          {searchTerm && (
            <div className="absolute inset-y-0 right-0 pr-16 flex items-center">
              <XMarkIcon
                className="h-5 w-5 text-gray-400 cursor-pointer"
                title="Clear search"
                onClick={() => setSearchTerm("")}
              />
            </div>
          )}
          {/* Filter */}
          <button
            onClick={() =>
              setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            className="absolute inset-y-0 right-0 pr-10 flex items-center gap-x-2"
            title="Filter"
          >
            <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-400" />{" "}
          </button>
          {/* Sort */}
          <button
            onClick={() =>
              setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            className="absolute inset-y-0 right-0 pr-3 flex items-center gap-x-2"
            title="Sort (oldest/newest)"
          >
            {sortOrder === "asc" ? (
              <ArrowDownIcon className="h-5 w-5 text-gray-400" />
            ) : (
              <ArrowUpIcon className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
      </section>
      {/* Task Cards */}
      {praxisPosts.length > 0 && (
        <section className="w-full flex flex-col items-center gap-6">
          {praxisPosts.map((praxis, index) => (
            <div
              key={praxis.id}
              ref={index === praxisPosts.length - 1 ? lastPraxisRef : null}
              className="w-full"
            >
              <PraxisCard praxis={praxis} />
            </div>
          ))}
        </section>
      )}
      {/* Error */}
      {error && <Error message={error} />}
      {/* Loading */}
      {loading && (
        <div
          className="mt-36 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-perse-50 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      )}
      {/* No results */}
      {!loading && praxisPosts.length === 0 && searchTerm && (
        <p className="mt-36">No results...</p>
      )}
      {/* End of results */}
      {!hasMore && <p className="mt-20">End of the line! 🚂</p>}
    </div>
  );
}
