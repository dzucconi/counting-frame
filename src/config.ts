import { configure } from "queryparams";

export const { params } = configure({
  color: "gray",
  highlightColor: "white",
  backgroundColor: "black",
  latticeColor: "gray",
  powers: 10,
  columnOffsetMs: 100,
  columnTransitionMs: 500,
  logTransitionMs: 250,
  pauseMs: 2500,
});
