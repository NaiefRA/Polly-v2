import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const DisplayPolls = ({ polls }) => {
  const bodyLength = 150;

  const [renderedPolls, setRenderedPolls] = useState(polls);
  const [sorted, setSorted] = useState("newest");

  const handleChange = (e) => {
    setSorted(e.target.value);
  };
  useEffect(() => {
    const sortedPolls = renderedPolls.slice().sort((a, b) => {
      if (sorted === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sorted === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sorted === "votes") {
        return (
          b.options.reduce((acc, curr) => {
            return acc + curr.optionVotes;
          }, 0) -
          a.options.reduce((acc, curr) => {
            return acc + curr.optionVotes;
          }, 0)
        );
      }
    });

    setRenderedPolls(sortedPolls);
  }, [sorted, polls]);

  return (
    <div className="polls-grid">
      <div>
        <label>Sort by:</label>
        <select name="sort-name" onChange={handleChange}>
          <option value="newest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="votes">Popularity</option>
        </select>
      </div>
      {renderedPolls.map((poll) => (
        <div className="poll-card" key={poll._id}>
          <Link to={`/poll/${poll._id}`}>
            <div className="poll-header">
              <h2 className="poll-title">{poll.title}</h2>
              <p className="poll-poller">Created by: {poll.poller}</p>
            </div>

            <div className="poll-options">
              {poll.options.slice(0, 3).map((option) => (
                <div className="poll-option" key={option.optionNumber}>
                  <button className="option-button">
                    {option.optionValue}
                  </button>
                  <span className="option-votes">
                    {option.optionVotes} votes
                  </span>
                </div>
              ))}
            </div>

            <p className="poll-body">
              {poll.body.slice(0, bodyLength) +
                (poll.body.length > bodyLength ? "..." : "")}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default DisplayPolls;
