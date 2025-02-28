import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PollPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const link = "/polls/" + id;

  const [poll, setPoll] = useState();
  const [isPending, setIsPending] = useState(true);
  const [err, setErr] = useState();

  useEffect(() => {
    fetch(link)
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        setPoll(result);
        setIsPending(false);
        setErr(null);
      })
      .catch((err) => {
        setErr(err.message);
      });
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();
    fetch(`/polls/${poll._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        navigate("/");
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleClick = (e, option) => {
    e.preventDefault();

    fetch(`/polls/${poll._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ optionValue: option }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.error);
          });
        }
        return res.json();
      })
      .then((updatedPoll) => {
        setPoll(updatedPoll);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <div>
      {!isPending && (
        <div className="poll-page">
          <div className="poll-header">
            <h2 className="poll-title">{poll.title}</h2>
            <p className="poll-poller">Created by: {poll.poller}</p>
          </div>

          <div className="poll-options">
            {poll.options.map((option) => (
              <div className="poll-option" key={option.optionValue}>
                <button
                  className="option-button page-option"
                  onClick={(e) => {
                    handleClick(e, option.optionValue);
                  }}
                >
                  {option.optionValue}
                </button>
                <span className="option-votes">{option.optionVotes} votes</span>
              </div>
            ))}
          </div>

          <p className="poll-body">{poll.body}</p>
        </div>
      )}

      <div>
        <button onClick={(e) => [handleDelete(e)]} className="delete-poll">
          Delete Poll
        </button>
      </div>
    </div>
  );
};

export default PollPage;
