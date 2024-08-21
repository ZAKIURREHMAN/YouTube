import "./filter-items.css";
import FilterOptionsApi from "./FilterOptionsApi";

function FilterItems(props) {
  const getFilterItem = (item) => {
    //eslint-disable-next-line
    props.setInput("");
    //eslint-disable-next-line
    props.setFilterItem(item.name);
    //eslint-disable-next-line
    props.setActiveItem(item.name);
  };

  return (
    <div className="filter-container">
      <div className="inner-filter-box">
        {FilterOptionsApi.map((item) => (
          <div
            key={item.id}
            className={`select-items ${
              //eslint-disable-next-line
              props.activeItem === item.name ? "active" : ""
            }`}
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
