import { useEffect, useRef } from 'react';
import UserInputField from './UserInputField';
import WorkspaceItem from './WorkspaceItem';

const Workspace = ({ discussionInfo, participants, isLoading, setIsLoading, formDisabled, messages, addMessage }) => {
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="workspace-wrapper">
      <h2>Mediation</h2>
      <div className="workspace">
        <div className="chat-space-wrapper">
          <div className="workspace-messages" ref={messagesContainerRef}>
            {messages
              .map((msg, idx) => ({ ...msg, originalIndex: idx })) // Preserve original index
              .filter(msg => msg.text !== "" && msg.text !== null)
              .map((msg) => (
                <WorkspaceItem
                  key={msg.originalIndex} // Use original index as key if needed
                  idx={msg.originalIndex} // Pass original index as `idx`
                  sender={msg.sender}
                  message={msg.text}
                  participants={participants}
                />
              ))}
            {isLoading && <div className="loading-indicator">Waiting for response...</div>}
          </div>
          <div className="workspace-inputfields">
            <UserInputField owner={participants[0] ? participants[0] : "User 1"} discussionInfo={discussionInfo} isLoading={isLoading} setIsLoading={setIsLoading} formDisabled={formDisabled} addMessage={addMessage}/>
            <UserInputField owner={participants[1] ? participants[1] : "User 2"} discussionInfo={discussionInfo} isLoading={isLoading} setIsLoading={setIsLoading} formDisabled={formDisabled} addMessage={addMessage}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
