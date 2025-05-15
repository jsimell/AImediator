import axios from 'axios'

const baseUrl = "/api/v1/task"
const prev_messages = [];

const submitUserInput = (newUserMessage) => {
  const newMessage = {
    role: "user",
    content: [{ type: "text", text: `${newUserMessage.text}` }],
  };
  prev_messages.push(newMessage);
  return axios.post(`${baseUrl}/completions`, {
    objective: newUserMessage.objective,
    userMessages: prev_messages,
  })
  .then((response) => {
    prev_messages.push({
      role: "assistant",
      content: [{ type: "text", text: response.data.text }],
    });
    return response.data;
  });
};

const finishTask = (rating) => {
  const ratingjson = {
    metrics: {
      rating: rating, 
      task_name: "mediation" //change this to your task name
    }
  }
  axios
    .post(`${baseUrl}/finish`, ratingjson)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
}

export default { 
  finishTask,
  submitUserInput
}