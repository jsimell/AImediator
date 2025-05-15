import { useState, useRef, useEffect } from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import FinishButton from './components/FinishButton';
import FeedbackForm from "./components/FeedbackForm";
import Workspace from "./components/Workspace";
import TaskDescription from './components/TaskDescription';
import InitialPromptForm from './components/InitialPromptForm';
import FilledInitialPromptForm from './components/FilledInitialPromptForm';
//import TutorialPopUp from './components/TutorialPopUp';
import "./index.css";

const App = () => {

  const [isFinished, setIsFinished] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isFinishClicked, setIsFinishClicked] = useState(false);
  const [isRatingSubmitted, setIsRatingSubmitted] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);
  const [participants, setParticipants] = useState(["", ""]);      // The names of the discussion participants
  const [discussionInfo, setDiscussionInfo] = useState("");              // Contains the data from the initial prompt form
  const [isLoading, setIsLoading] = useState(false);
  const viewPointRef = useRef(null);

  useEffect(() => {
    if (isFinished) {
      if (viewPointRef.current) {
        viewPointRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [isFinished]);

  const addMessage = (message) => {
    setMessages(prevMessages => prevMessages.concat(message));
  };

  const toggleFinish = () => {
    setIsFinished(!isFinished);
    setIsFinishClicked(!isFinishClicked);
  }

  return (
    <>
      <Header />
      <TaskDescription />
      {/* <TutorialPopUp /> */}
      <InitialPromptForm setDiscussionInfo={setDiscussionInfo} participants={participants} setParticipants={setParticipants} formDisabled={formDisabled} setFormDisabled={setFormDisabled} setIsLoading={setIsLoading} addMessage={addMessage} />
      <div className="main-interaction">
        {(isRatingSubmitted || isFinishClicked) && (
          <div className="main-interaction-overlay"> </div>
        )}
        <Workspace discussionInfo={discussionInfo} participants={participants} isLoading={isLoading} setIsLoading={setIsLoading} formDisabled={formDisabled} messages={messages} addMessage={addMessage} />
      </div>
      <FinishButton isFinishClicked={isFinishClicked} isRatingSubmitted={isRatingSubmitted} toggleFinish={toggleFinish} />
      {isFinished && <FeedbackForm viewPointRef={viewPointRef} isRatingSubmitted={isRatingSubmitted} setIsRatingSubmitted={setIsRatingSubmitted} />}
      <Footer />
    </>
  );
};

export default App;
