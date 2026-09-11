import {
  parseAsArrayOf,
  parseAsString,
  createSearchParamsCache,
} from "nuqs/server";

export const searchParsers = {
  q: parseAsString.withDefault(""),
  categories: parseAsArrayOf(parseAsString).withDefault([]),
  order: parseAsString.withDefault("relevance"),
};

export const searchParamsCache = createSearchParamsCache(searchParsers);
