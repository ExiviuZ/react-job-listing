import { useState } from "react";
import "./App.css";
import jobList from "./dataLoader";

function App() {
  const [filters, setFilters] = useState([]);
  function handleAddFilter(filter) {
    if (filters.indexOf(filter) === -1) {
      setFilters((filters) => [...filters, filter]);
    } else {
      null;
    }
  }
  function handleRemoveFilter(filter) {
    const newFilters = filters.slice();
    newFilters.splice(filters.indexOf(filter), 1);
    setFilters(newFilters);
  }
  function handleResetFilter() {
    setFilters([]);
  }
  return (
    <>
      <TopBackground
        filters={filters}
        onHandleResetFilter={handleResetFilter}
        onRemoveFilter={handleRemoveFilter}
      />
      <JobList filters={filters} onHandleAddFilter={handleAddFilter} />
    </>
  );
}

function TopBackground({ filters, onRemoveFilter, onHandleResetFilter }) {
  return (
    <div className="top-background">
      <picture>
        <source
          srcSet="./src/images/bg-header-desktop.svg"
          media="(min-width: 375px)"
        />

        <img
          src="./src/images/bg-header-mobile.svg"
          alt="Description of the image"
        />
      </picture>

      <div
        className="filter-control"
        style={filters.length > 0 ? { display: "flex" } : { display: "none" }}
      >
        <div>
          {filters.map((filter, index) => {
            return (
              <span className="filter-remove" key={index}>
                <span className="filter-name">{filter}</span>{" "}
                <button onClick={() => onRemoveFilter(filter)}>
                  {" "}
                  <img src="./src/images/icon-remove.svg" alt="" />{" "}
                </button>
              </span>
            );
          })}
        </div>{" "}
        <button className="clear" onClick={() => onHandleResetFilter()}>
          Clear
        </button>
      </div>
    </div>
  );
}
function JobList({ onHandleAddFilter, filters }) {
  const filteredJobs =
    filters.length === 0
      ? jobList
      : jobList.filter((elem) =>
          filters.every((skill) =>
            [elem.role, elem.level, ...elem.languages, ...elem.tools].includes(
              skill
            )
          )
        );

  return (
    <ul className="job-list">
      {filteredJobs.map((element, index) => (
        <Job key={index} job={element} onHandleAddFilter={onHandleAddFilter} />
      ))}
    </ul>
  );
}

function Job({ job, onHandleAddFilter }) {
  return (
    <li className={`job ${job.featured ? "featured" : ""}`}>
      <div>
        <img src={job.logo} alt="" />
        <div>
          <p className="job-title fw-700">
            <span className="company">{job.company}</span>{" "}
            {job.new && <span className="new">NEW!</span>}{" "}
            {job.featured && <span className="featured">FEATURED</span>}{" "}
          </p>
          <p className="fw-700 position">{job.position}</p>
          <p>
            <span className="clr-dark-grayish-cyan ">{job.postedAt}</span>
            <span className="clr-dark-grayish-cyan contract">
              {job.contract}
            </span>
            <span className="clr-dark-grayish-cyan location">
              {job.location}
            </span>
          </p>
        </div>
      </div>
      <div className="filters">
        <span onClick={(e) => onHandleAddFilter(job.role)}>{job.role}</span>
        <span onClick={(e) => onHandleAddFilter(job.level)}>{job.level}</span>
        {job.languages.map((elem, index) => {
          return (
            <span onClick={(e) => onHandleAddFilter(elem)} key={index}>
              {elem}
            </span>
          );
        })}
        {job.tools.map((elem, index) => {
          return (
            <span onClick={(e) => onHandleAddFilter(elem)} key={index}>
              {elem}
            </span>
          );
        })}
      </div>
    </li>
  );
}

export default App;
