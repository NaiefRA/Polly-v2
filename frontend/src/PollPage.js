import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DoughnutChart from "./DoughnutChart";

const PollPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const link = "https://polly-v2.onrender.com/polls/" + id;

  const [title, setTitle] = useState("");
  const [poller, setPoller] = useState("");

  const [valuesAdmin, setValuesAdmin] = useState([]);
  const [votesAdmin, setVotesAdmin] = useState([]);

  const [poll, setPoll] = useState();
  const [isPending, setIsPending] = useState(true);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    fetch(link)
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        setPoll(result);
        setIsPending(false);
      })
      .catch((err) => {});
  }, [window.location.href]);

  useEffect(() => {
    if (poll) {
      setTitle(poll.title);
      setPoller(poll.poller);
      setValuesAdmin(poll.options.map((option) => option.optionValue));
      setVotesAdmin(poll.options.map((option) => option.optionVotes));
    }
  }, [poll]);

  const handleDelete = (e) => {
    e.preventDefault();
    fetch(`https://polly-v2.onrender.com/polls/${poll._id}`, {
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

    fetch(`https://polly-v2.onrender.com/polls/${poll._id}`, {
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
        alert(err.message);
      });
  };

  const handleAdminChange = (e) => {
    const updatedOptions = valuesAdmin.map((value, i) => {
      return { optionValue: value, optionVotes: votesAdmin[i] };
    });
    const updatedPoll = { ...poll, title, poller, options: updatedOptions };
    fetch(`https://polly-v2.onrender.com/polls/${poll._id}/admin`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPoll),
    })
      .then(() => {
        console.log("Done?");
        setPoll(updatedPoll);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAdminAbuse = (e) => {
    e.preventDefault();

    if (!admin) {
      console.log("Abuse activated");
    } else {
      console.log("Abuse Off");
    }
    setAdmin(!admin);
  };

  return (
    <div>
      {!isPending && (
        <div
          className="poll-page"
          style={{ display: "flex", gap: "1rem", margin: "50px" }}
        >
          <div style={{ flex: 1 }}>
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
                  <span className="option-votes">
                    {option.optionVotes} votes
                  </span>
                </div>
              ))}
            </div>

            <p className="poll-body">{poll.body}</p>
          </div>
          <div style={{ width: "500px", height: "500px" }}>
            {poll && <DoughnutChart options={poll.options} />}
          </div>
        </div>
      )}

      <div>
        <button onClick={(e) => [handleDelete(e)]} className="delete-poll">
          Delete Poll
        </button>
      </div>
      <button className="admin-button" onClick={handleAdminAbuse}>
        Admin Abuse?
      </button>
      {admin && (
        <div className="admin-abuse">
          Abuse Activated
          <div>
            title- {poll.title}{" "}
            {
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  console.log(e.target.value);
                }}
              ></input>
            }
          </div>
          <div>
            poller- {poll.poller}{" "}
            {
              <input
                type="text"
                value={poller}
                onChange={(e) => {
                  setPoller(e.target.value);
                  console.log(e.target.value);
                }}
              ></input>
            }
          </div>
          <div>
            options-{" "}
            {poll.options.map((option, i) => {
              return (
                <div>
                  <>
                    Option Value - {option.optionValue}{" "}
                    {
                      <input
                        type="text"
                        value={valuesAdmin[i]}
                        onChange={(e) => {
                          const newOptions = [...valuesAdmin];
                          newOptions[i] = e.target.value;
                          setValuesAdmin(newOptions);
                        }}
                      ></input>
                    }
                  </>
                  <>
                    Option Votes - {option.optionVotes}
                    {
                      <input
                        type="text"
                        value={votesAdmin[i]}
                        onChange={(e) => {
                          const newOptions = [...votesAdmin];
                          newOptions[i] = e.target.value;
                          setVotesAdmin(newOptions);
                        }}
                      ></input>
                    }{" "}
                  </>
                </div>
              );
            })}
          </div>
          <button onClick={handleAdminChange}>Change</button>
        </div>
      )}
    </div>
  );
};

export default PollPage;
