import { useState, useRef } from 'react';
import taskService from '../services/task'

const InitialPromptForm = ({ setDiscussionInfo, participants, setParticipants, formDisabled, setFormDisabled, setIsLoading, addMessage }) => {

  const [discussionTopic, setDiscussionTopic] = useState("");
  const [participantOpinions, setParticipantOpinions] = useState(["", ""]);
  const [participantGoals, setParticipantGoals] = useState(["", ""]);
  const [participantRelationship, setParticipantRelationship] = useState("");
  const [alreadyDiscussed, setAlreadyDiscussed] = useState("");
  const [hasDiscussedBefore, setHasDiscussedBefore] = useState(false);

  const workspaceRef = useRef(null)

  function checkAndAddMessage(sender, text) {
    text = (typeof text === 'string' && text.trim()) ? text : null;

    if (text === null) {
      console.log("no message");
    } else {
      addMessage({ sender: sender, text: text });
    }
  }

  const chooseDiscussionInformation = (event) => {
    if (!discussionTopic.trim() || !participants[0].trim() || !participants[1].trim() || !participantOpinions[0].trim() || !participantOpinions[1].trim() || !participantGoals[0].trim() || !participantGoals[1].trim() || !participantRelationship.trim()) {
      alert("Please fill in all the required information.");
      return;
    }
    if (participants[0].trim() === participants[1].trim()) {
      alert("Participants must have different names. Please add identifiers (e.g., first letter of surname).");
      return;
    }
    event.preventDefault();
    setFormDisabled(true);
    setIsLoading(true);
    workspaceRef.current?.scrollIntoView({ behavior: 'smooth' })

    const discussionInfo = `{
      Discussion topic: ${discussionTopic}, 
      Discussion participants: ${participants[0]} and ${participants[1]}, 
      Participants' relationship: ${participantRelationship},
      ${participants[0]}'s opinion on the topic: ${participantOpinions[0]},
      ${participants[1]}'s opinion on the topic: ${participantOpinions[1]},
      ${participants[0]}'s discussion goals: ${participantGoals[0]},
      ${participants[1]}'s discussion goals: ${participantGoals[1]},
      Have the participants discussed the topic before: ${hasDiscussedBefore ? "Yes" : "No"}
      What have they already discussed: ${hasDiscussedBefore ? alreadyDiscussed : "No response"}
    }`

    taskService
      .submitUserInput({
        text: "",
        objective: discussionInfo
      })
      .then((returnedResponse) => {
        let trimmed = returnedResponse.text.trim();  // Use trim() to remove any leading/trailing whitespace
        console.log(trimmed);
        checkAndAddMessage("ai", trimmed);
        setIsLoading(false);
        setDiscussionInfo(discussionInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="initial-prompt-form-wrapper">
        <form onSubmit={chooseDiscussionInformation} className="initial-prompt-form">
          <h3 style={{ padding: "30px" }}>📝 Fill In Your Discussion Details</h3>

          <div className="input-group">
            <label htmlFor="topic">Discussion topic:</label>
            <input
              id="topic"
              className="input-field"
              type="text"
              disabled={formDisabled}
              value={discussionTopic}
              onChange={(event) => setDiscussionTopic(event.target.value)}
            />
          </div>

          <h4>Participant 1 Details</h4>

          <div className="input-group">
            <label htmlFor="name1">Name:</label>
            <input
              id="name1"
              className="input-field"
              type="text"
              disabled={formDisabled}
              value={participants[0]}
              onChange={(event) => setParticipants([event.target.value, participants[1]])}
            />
          </div>

          <div className="input-group">
            <label htmlFor="opinion1">Opinion on the topic:</label>
            <textarea
              id="opinion1"
              className="input-field"
              type="text"
              disabled={formDisabled}
              value={participantOpinions[0]}
              onChange={(event) => setParticipantOpinions([event.target.value, participantOpinions[1]])}
            />
          </div>

          <div className="input-group">
            <label htmlFor="goals1">Discussion goals:</label>
            <textarea
              id="goals1"
              className="input-field"
              type="text"
              placeholder="E.g. feeling heard, being understood, reaching an agreement..."
              disabled={formDisabled}
              value={participantGoals[0]}
              onChange={(event) => setParticipantGoals([event.target.value, participantGoals[1]])}
            />
          </div>

          <h4>Participant 2 Details</h4>

          <div className="input-group">
            <label htmlFor="name2">Name:</label>
            <input
              id="name2"
              className="input-field"
              type="text"
              disabled={formDisabled}
              value={participants[1]}
              onChange={(event) => setParticipants([participants[0], event.target.value])}
            />
          </div>

          <div className="input-group">
            <label htmlFor="opinion2">Opinion on the topic:</label>
            <textarea
              id="opinion2"
              className="input-field"
              type="text"
              disabled={formDisabled}
              value={participantOpinions[1]}
              onChange={(event) => setParticipantOpinions([participantOpinions[0], event.target.value])}
            />
          </div>

          <div className="input-group">
            <label htmlFor="goals2">Discussion goals:</label>
            <textarea
              id="goals2"
              className="input-field"
              placeholder="E.g. feeling heard, being understood, reaching an agreement..."
              type="text"
              disabled={formDisabled}
              value={participantGoals[1]}
              onChange={(event) => setParticipantGoals([participantGoals[0], event.target.value])}
            />
          </div>

          <h4>Additional Information</h4>

          <div className="input-group">
            <label htmlFor="relationship">Describe your relationship:</label>
            <input
              id="relationship"
              className="input-field"
              type="text"
              placeholder="E.g. friends, coworkers, strangers..."
              disabled={formDisabled}
              value={participantRelationship}
              onChange={(event) => setParticipantRelationship(event.target.value)}
            />
          </div>

          <div className="input-group">
            <div className="radio-input">
              <label>Have you discussed this topic before?</label>
              <div className="radio-buttons">
                <div>
                  <input
                    type="radio"
                    value="yes"
                    checked={hasDiscussedBefore === true}
                    onChange={() => setHasDiscussedBefore(true)}
                  />
                  Yes
                </div>
                <div>
                  <input
                    type="radio"
                    value="no"
                    checked={hasDiscussedBefore === false}
                    onChange={() => setHasDiscussedBefore(false)}
                  />
                  No
                </div>
              </div>
            </div>
          </div>

          {hasDiscussedBefore && (<div className="input-group">
            <label htmlFor="discussed">What have you discussed and when?</label>
            <textarea
              id="discussed"
              className="input-field"
              type="text"
              placeholder="E.g. We have discussed Pekka's opinion..."
              disabled={formDisabled}
              value={alreadyDiscussed}
              onChange={(event) => setAlreadyDiscussed(event.target.value)}
            />
          </div>
          )}

          <button
            type="button"
            disabled={formDisabled}
            className="initial-prompt-submit-btn"
            onClick={chooseDiscussionInformation}>
            Submit
          </button>
        </form >
      </div >
      <div ref={workspaceRef}></div>
    </>
  );
};

export default InitialPromptForm;

