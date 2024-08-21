import "./filter-items.css";
import FilterOptions from "../../Constant/FilterOptions";
import { useContext } from "react";
import { counterContext } from "../../Context/AuthContext/ContextProvider";

function FilterItems() {
  const { setinput } = useContext(counterContext);
  const getFilterItem = (item) => {
    setinput(item.name);
  };

  return (
    <div className="filter-container">
      <div className="inner-filter-box">
        {FilterOptions.map((item) => (
          <div
            key={item.id}
            className="select-items"
            onClick={() => getFilterItem(item)}
          >
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterItems;
