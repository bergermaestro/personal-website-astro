import {
  useRef,
  useLayoutEffect,
  type Dispatch,
  type SetStateAction,
} from "react";
import { motion } from "motion/react";
import type { CollectionEntry } from "astro:content";
import "../components/BookCarousel.css";
import { BookCover } from "../components/BookCover";

interface BookCarouselProps {
  books: CollectionEntry<"books">[];
  color: string;
  showAll: boolean;
  setShowAll: Dispatch<SetStateAction<boolean>>;
  isOverflowing: boolean;
  setIsOverflowing: Dispatch<SetStateAction<boolean>>;
}

export const BookCarousel = ({
  books,
  color,
  showAll,
  setShowAll,
  isOverflowing,
  setIsOverflowing,
}: BookCarouselProps) => {
  const groupRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const checkOverflow = () => {
      // Only check overflow when in carousel mode (showAll is false)
      // This determines if the carousel would overflow, not the current wrapped state
      if (!showAll && groupRef.current && wrapperRef.current) {
        const groupWidth = groupRef.current.scrollWidth;
        const wrapperWidth = wrapperRef.current.clientWidth;
        setIsOverflowing(groupWidth > wrapperWidth);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [books, showAll]);

  return (
    <div className="book-wrapper" ref={wrapperRef}>
      <motion.div className="book-carousel">
        <div
          ref={groupRef}
          className={
            showAll
              ? "show-all book-group"
              : isOverflowing
                ? "book-group"
                : "no-scroll book-group"
          }
        >
          {books.map((book) => (
            <BookCover book={book.data} width={200} key={`${book.id}-1`} />
          ))}
        </div>
        {!showAll && isOverflowing && (
          <div aria-hidden className="book-group">
            {books.map((book) => (
              <BookCover book={book.data} width={200} key={`${book.id}-2`} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};
