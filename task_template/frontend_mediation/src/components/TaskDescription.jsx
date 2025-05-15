const TaskDescription = () => {
  return (
    <div className="task-description">
      <h2>💬 Conversation Mediation</h2>
      <h3>📜 Rules</h3>
      <ol>
        <li>Begin by entering the details of your discussion.</li>
        <li>The AI will then provide a few suggested directions for your conversation.</li>
        <li>The AI expects you to continue your discussion face-to-face until progress is made or further assistance is needed.</li>
        <li>When you need more mediation, either participant can send a message to the AI.</li>
        <li>Each participant has their own input field for communicating with the AI.</li>
      </ol>
    </div>
  );
};

export default TaskDescription;
