import React from "react";
import { Link } from "react-router-dom";

const DisplayPolls = ({ polls }) => {
  const bodyLength = 150;

  return (
    <div className="polls-grid">
      {polls.map((poll) => (
        <div className="poll-card" key={poll._id}>
          <Link to={`/poll/${poll._id}`}>
            <div className="poll-header">
              <h2 className="poll-title">{poll.title}</h2>
              <p className="poll-poller">Created by: {poll.poller}</p>
            </div>

            <div className="poll-options">
              {poll.options.map((option) => (
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
