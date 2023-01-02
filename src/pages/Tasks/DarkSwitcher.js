import { useEffect } from "react";

const DarkSwitcher = ({
  darkMode,
  sortedTasks,
  searchInput,
  filters,
  currentPage,
}) => {
  useEffect(() => {
    const tableHeader = document.querySelector(".tx-head-col");
    const tableRows = document.querySelectorAll("tr");
    const filterBoxes = document.querySelectorAll(".filter-box");
    const filterScrapDivs = document.querySelectorAll(".filter-scrap");
    const pageButtons = document.querySelectorAll(".tx-footer-button");

    if (darkMode) {
      tableRows.forEach((tr) => {
        tr.classList.remove("tr-light");
        tr.classList.add("tr-dark");
      });

      tableHeader.classList.remove("updates-text-light");
      tableHeader.classList.remove("tr-dark");
      tableHeader.classList.add("updates-text-dark");

      filterBoxes.forEach((box) => {
        box.classList.remove("filter-box-light");
        box.classList.add("filter-box-dark");
      });

      filterScrapDivs.forEach((scrap) => {
        scrap.classList.remove("filter-scrap-light");
        scrap.classList.add("filter-scrap-dark");
      });

      pageButtons.forEach((button) => {
        button.classList.remove("tx-footer-button-light");
        button.classList.add("tx-footer-button-dark");
      });
    } else {
      tableRows.forEach((tr) => {
        tr.classList.remove("tr-dark");
        tr.classList.add("tr-light");
      });

      tableHeader.classList.remove("updates-text-dark");
      tableHeader.classList.remove("tr-light");
      tableHeader.classList.add("updates-text-light");

      filterBoxes.forEach((box) => {
        box.classList.remove("filter-box-dark");
        box.classList.add("filter-box-light");
      });

      filterScrapDivs.forEach((scrap) => {
        scrap.classList.remove("filter-scrap-dark");
        scrap.classList.add("filter-scrap-light");
      });

      pageButtons.forEach((button) => {
        button.classList.remove("tx-footer-button-dark");
        button.classList.add("tx-footer-button-light");
      });
    }
  }, [darkMode, sortedTasks, searchInput, filters, currentPage]);
};

export default DarkSwitcher;
