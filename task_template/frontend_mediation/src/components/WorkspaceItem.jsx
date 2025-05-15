import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
// import 'github-markdown-css/github-markdown.css';

const WorkspaceItem = ({ message, sender, participants }) => {

  const messageClass =
    sender === participants[0] ? "user1-message" :
      sender === participants[1] ? "user2-message" :
        "ai-message";
  const avatarClass = sender === "ai" ? "avatar-ai" : "avatar-user";
  const avatarText = sender === "ai" ? "AI" : sender.charAt(0).toUpperCase();

  return (
    <div className={`message ${messageClass}`}>
      <>
        <div className={`avatar ${avatarClass}`}> {avatarText} </div>
        <div className="markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
            {message}
          </ReactMarkdown>
        </div>
      </>
    </div>
  );
};

export default WorkspaceItem;
