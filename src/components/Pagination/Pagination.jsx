import s from "./Pagination.module.css";

const Pagination = ({ totalPages, currentPage, nextPage, prevPage }) => {
  return (
    <div className={s.pagination}>
      <button
        className={s.button}
        onClick={prevPage}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <span className={s.info}>
        Page {currentPage} of {totalPages}
      </span>
      <button
        className={s.button}
        onClick={nextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
