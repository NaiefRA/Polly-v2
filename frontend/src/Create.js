import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [poller, setPoller] = useState("");
  const [body, setBody] = useState("");
  const [options, setOptions] = useState([]);
  const [currentOption, setCurrentOption] = useState("");

  const navigate = useNavigate();

  const addOption = (e) => {
    e.preventDefault();

    const newOption = { optionValue: currentOption, optionVotes: 0 };

    setOptions([...options, newOption]);
    setCurrentOption("");
  };

  const handleDelete = (e, optionValue) => {
    e.preventDefault();

    setOptions(
      options.filter((option) => {
        return option.optionValue !== optionValue;
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (options.length < 2) {
      alert("Please add atleast 2 options");
      return;
    }
    const poll = { body, title, poller, options };
    fetch("https://polly-v2.onrender.com/polls", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(poll),
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <div id="create-container">
      <form id="create-form" onSubmit={handleSubmit}>
        {/* title */}
        <label className="create-label">Question</label>
        <input
          className="create-text"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {/* author */}
        <label className="create-label">Name</label>
        <input
          className="create-text"
          type="text"
          value={poller}
          onChange={(e) => setPoller(e.target.value)}
          required
        />
        {/* body */}
        <label className="create-label">Body</label>
        <textarea
          id="create-body-textarea"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        {/* options */}

        <h3>Options</h3>
        <div>
          {options.map((option) => {
            return (
              <div>
                <label>{option.optionValue}</label>
                <button
                  onClick={(e) => {
                    handleDelete(e, option.optionValue);
                  }}
                >
                  remove
                </button>
              </div>
            );
          })}
        </div>
        <div>
          <input
            className="create-text"
            type="text"
            value={currentOption}
            onChange={(e) => setCurrentOption(e.target.value)}
          />

          <button id="create-option-button" onClick={addOption}>
            Add Option
          </button>
        </div>
        <button id="create-submit-button" type="submit">
          Create Poll
        </button>
      </form>
    </div>
  );
};

export default Create;
