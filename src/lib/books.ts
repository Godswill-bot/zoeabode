import type { Book } from "@/data/books";

export function findBookBySlug(books: Book[], slug: string) {
  return books.find((book) => book.slug === slug);
}

export function formatPrice(price: string) {
  return price;
}

function scoreRecommendation(sourceBook: Book, candidate: Book) {
  const sharedTags = candidate.tags.filter((tag) => sourceBook.tags.includes(tag));
  const categoryMatch = sourceBook.category === candidate.category ? 3 : 0;
  const audienceMatch = sourceBook.audience === candidate.audience ? 1.5 : 0;
  const featuredMatch = candidate.featured ? 1 : 0;

  return sharedTags.length * 2 + categoryMatch + audienceMatch + featuredMatch + candidate.rating / 10;
}

export function getRecommendedBooks(books: Book[], sourceBook: Book, limit = 3) {
  return books
    .filter((book) => book.slug !== sourceBook.slug)
    .map((book) => ({
      book,
      score: scoreRecommendation(sourceBook, book),
    }))
    .sort((left, right) => right.score - left.score)
    .slice(0, limit)
    .map(({ book }) => book);
}

export function getVisibleBooks(books: Book[], filter: string) {
  if (filter === "All") {
    return books;
  }

  if (filter === "Featured") {
    return books.filter((book) => book.featured);
  }

  return books.filter((book) => book.category === filter);
}

export function getLibraryFilters(books: Book[]) {
  return ["All", "Featured", ...new Set(books.map((book) => book.category))];
}
