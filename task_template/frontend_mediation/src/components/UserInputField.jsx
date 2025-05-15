import { useState } from 'react';
import taskService from '../services/task'

const UserInputField = ({ owner, discussionInfo, isLoading, setIsLoading, formDisabled, addMessage }) => {

  const [newUserMessage, setNewUserMessage] = useState("");

  function addSenderIdentifier(text) {
    return owner + ": " + text.trim();
  }

  function checkAndAddMessage(sender, text) {
    text = (typeof text === 'string' && text.trim()) ? text : null;

    if (text === null) {
      console.log("no message");
    } else {
      addMessage({ sender: sender, text: text });
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newUserMessage.trim()) {
      return;
    }
    setIsLoading(true);
    checkAndAddMessage(owner, newUserMessage);

    taskService
      .submitUserInput({
        text: addSenderIdentifier(newUserMessage),  // The backend needs to know who sent the message
        objective: discussionInfo
      })
      .then((returnedResponse) => {
        let trimmed = returnedResponse.text.trim()  // Use trim() to remove any leading/trailing whitespace
        console.log(trimmed)
        checkAndAddMessage("ai", trimmed)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
      });
    setNewUserMessage("");
  };

  return (
      <div className="chat-form-wrapper">
        <form onSubmit={handleSubmit} className="chat-input-form">
          <label htmlFor="input">{`${owner}:`}</label>
          <textarea className="chat-input-field"
            id="input"
            value={newUserMessage}
            disabled={!formDisabled || isLoading}
            onChange={(event) => setNewUserMessage(event.target.value)}
            placeholder="Send a message to the AI"
          />
          <button type="submit"
            disabled={!formDisabled || isLoading}
            onClick={handleSubmit}>
            Send
          </button>
        </form>
      </div>
  );
};

export default UserInputField;