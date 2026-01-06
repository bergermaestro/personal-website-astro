import { useState } from "react";
import { BookCarousel } from "./BookCarousel";
import type { CollectionEntry } from "astro:content";
import { LayoutGroup, motion } from "motion/react";

export const BookSection = ({
  books,
  color,
  year,
  recap,
}: {
  books: CollectionEntry<"books">[];
  color: string;
  year: string;
  recap: string;
}) => {
  const [showAll, setShowAll] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  return (
    <section className="pb-40">
      <LayoutGroup>
        <BookCarousel
          books={books}
          color={color}
          showAll={showAll}
          setShowAll={setShowAll}
          isOverflowing={isOverflowing}
          setIsOverflowing={setIsOverflowing}
        />
        <motion.div
          className={`h-12 w-full rounded-xl bg-${color} -mt-6`}
          layout
        />
        <motion.div className="flex w-full flex-row py-3" layout>
          <h2 className={`grow font-phudu text-6xl text-${color}`}>{year}</h2>
          {isOverflowing && (
            <button
              className="inline-block rounded-lg border px-4 py-3 transition-all font-width-[92] hover:border-livid-200 hover:text-livid-200"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Collapse All" : "Show All"}
            </button>
          )}
        </motion.div>
        {recap && (
          <motion.p className="max-w-[55ch] font-width-[95]" layout>
            {recap}
          </motion.p>
        )}
      </LayoutGroup>
    </section>
  );
};
