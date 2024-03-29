import "./SearchForm.css";
import React from "react";

function SearchForm(props) {
  const [query, setQuery] = React.useState(props.search || "");

  function handleCheckbox() {
    !props.isSavedMovies &&
      localStorage.setItem("moviesCheckbox", !props.checkbox);
    props.setCheckbox(!props.checkbox);
  }
  function handleChange(e) {
    setQuery(e.target.value);
  }
  function coverResult(e) {
    e.preventDefault();
    !props.isSavedMovies && localStorage.setItem("moviesSearch", query);
    props.setSearch(query);
  }

  function resetForm() {
    setQuery("");
    props.setSearch("");
    !props.isSavedMovies && localStorage.setItem("moviesSearch", "");
  }

  return (
    <form className="search-form" onSubmit={coverResult}>
      <div className="search-form__logo">
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M18.7927 18.2634C17.3608 19.6953 15.0391 19.6953 13.6072 18.2634C12.1753 16.8315 12.1753 14.5099 13.6072 13.078C15.0391 11.646 17.3608 11.646 18.7927 13.078C20.2246 14.5099 20.2246 16.8315 18.7927 18.2634ZM19.2331 19.6464C17.2728 21.1458 14.4572 20.999 12.6644 19.2062C10.7118 17.2536 10.7118 14.0878 12.6644 12.1351C14.617 10.1825 17.7829 10.1825 19.7355 12.1351C21.5282 13.9279 21.675 16.7433 20.1758 18.7035L23.7425 22.2702L22.7997 23.213L19.2331 19.6464Z"
            fill="#959595"
          />
        </svg>
      </div>
      <div className="search-form__fieldset">
        <input
          className="search-form__input"
          placeholder="Фильм"
          type="text"
          value={query}
          onChange={handleChange}
        />
        {query && (
          <input
            type="reset"
            onClick={resetForm}
            className="search-form__reset"
            value="×"
          />
        )}
        <button
          className="search-form__search"
          type="submit"
          disabled={!query || props.isLoading}
          style={!query ? { opacity: "0.7" } : null}
        >
          <svg
            width="80"
            height="34"
            viewBox="0 0 80 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="21.3496" width="58.65" height="34" rx="17" fill="black" />
            <path
              d="M34.9467 21V13H36.1537V16.4766H40.142V13H41.3529V21H40.142V17.5117H36.1537V21H34.9467ZM44.7631 21.1328C44.3829 21.1328 44.0391 21.0625 43.7318 20.9219C43.4245 20.7786 43.1811 20.5716 43.0014 20.3008C42.8243 20.0299 42.7357 19.6979 42.7357 19.3047C42.7357 18.9661 42.8008 18.6875 42.9311 18.4687C43.0613 18.25 43.237 18.0768 43.4584 17.9492C43.6798 17.8216 43.9271 17.7253 44.2006 17.6602C44.474 17.5951 44.7527 17.5456 45.0365 17.5117C45.3959 17.4701 45.6876 17.4362 45.9115 17.4102C46.1355 17.3815 46.2982 17.3359 46.3998 17.2734C46.5014 17.2109 46.5521 17.1094 46.5521 16.9687V16.9414C46.5521 16.6003 46.4558 16.3359 46.2631 16.1484C46.073 15.9609 45.7891 15.8672 45.4115 15.8672C45.0183 15.8672 44.7084 15.9544 44.4818 16.1289C44.2579 16.3008 44.1029 16.4922 44.017 16.7031L42.9193 16.4531C43.0495 16.0885 43.2396 15.7943 43.4896 15.5703C43.7423 15.3437 44.0326 15.1797 44.3607 15.0781C44.6889 14.974 45.0339 14.9219 45.3959 14.9219C45.6355 14.9219 45.8894 14.9505 46.1576 15.0078C46.4284 15.0625 46.6811 15.1641 46.9154 15.3125C47.1524 15.4609 47.3464 15.6732 47.4975 15.9492C47.6485 16.2227 47.724 16.5781 47.724 17.0156V21H46.5834V20.1797H46.5365C46.461 20.3307 46.3477 20.4792 46.1967 20.625C46.0456 20.7708 45.8516 20.8919 45.6146 20.9883C45.3777 21.0846 45.0938 21.1328 44.7631 21.1328ZM45.017 20.1953C45.3399 20.1953 45.6159 20.1315 45.8451 20.0039C46.0769 19.8763 46.2527 19.7096 46.3725 19.5039C46.4949 19.2956 46.5561 19.0729 46.5561 18.8359V18.0625C46.5144 18.1042 46.4337 18.1432 46.3139 18.1797C46.1967 18.2135 46.0626 18.2435 45.9115 18.2695C45.7605 18.293 45.6133 18.3151 45.4701 18.3359C45.3269 18.3542 45.2071 18.3698 45.1107 18.3828C44.8842 18.4115 44.6771 18.4596 44.4896 18.5273C44.3048 18.5951 44.1563 18.6927 44.0443 18.8203C43.935 18.9453 43.8803 19.112 43.8803 19.3203C43.8803 19.6094 43.987 19.8281 44.2006 19.9766C44.4141 20.1224 44.6863 20.1953 45.017 20.1953ZM50.4242 19.3633L53.0687 15H54.3266V21H53.182V16.6328L50.5492 21H49.2797V15H50.4242V19.3633ZM52.5687 12.9687H53.5297C53.5297 13.4089 53.3734 13.7669 53.0609 14.043C52.751 14.3164 52.3318 14.4531 51.8031 14.4531C51.2771 14.4531 50.8591 14.3164 50.5492 14.043C50.2393 13.7669 50.0844 13.4089 50.0844 12.9687H51.0414C51.0414 13.1641 51.0987 13.3372 51.2133 13.4883C51.3279 13.6367 51.5245 13.7109 51.8031 13.7109C52.0766 13.7109 52.2719 13.6367 52.3891 13.4883C52.5089 13.3398 52.5687 13.1667 52.5687 12.9687ZM55.1527 16.0078V15H60.2152V16.0078H58.2582V21H57.1176V16.0078H55.1527ZM62.5951 19.3633L65.2396 15H66.4975V21H65.3529V16.6328L62.7201 21H61.4506V15H62.5951V19.3633Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
      <div className="search-form__shorts">
        <button
          className="search-form__shorts-bttn"
          type="button"
          onClick={handleCheckbox}
        >
          {props.checkbox ? (
            <svg
              width="36"
              height="20"
              viewBox="0 0 36 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="1" y="3" width="34" height="14" rx="7" fill="#2BE080" />
              <circle cx="28" cy="10" r="5" fill="white" />
            </svg>
          ) : (
            <svg
              width="36"
              height="20"
              viewBox="0 0 36 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="1" y="3" width="34" height="14" rx="7" fill="#EBEBEB" />
              <circle cx="8" cy="10" r="5" fill="#F5F5F5" />
            </svg>
          )}
        </button>
        <p className="search-form__shorts-title" onClick={handleCheckbox}>
          Короткометражки
        </p>
      </div>
    </form>
  );
}

export default SearchForm;
