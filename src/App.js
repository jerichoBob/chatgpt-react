import React, { useState, useEffect } from 'react';
import './App.css';
import ModelSelect from './components/ModelSelect/ModelSelect';
import LeftNav from './components/LeftNav/LeftNav';
import ChatSession from './components/ChatSession/ChatSession';
import Folder from './components/Folder/Folder';
import axios from 'axios';

function App() {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [inputText, setInputText] = useState('');
  const [responses, setResponses] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [folders, setFolders] = useState([]);
  
  useEffect(() => {
    // Fetch available models from your backend
  }, []);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedModel) return;

    // Make an API call to your backend, passing the selected model and inputText
    const response = await axios.post('/api/generate-response', {
      model: selectedModel.value,
      prompt: inputText,
    });

    const newResponse = response.data;
    setResponses([...responses, newResponse]);

    // Save the prompt and response to the database
    await axios.post('/api/save-session', {
      prompt: inputText,
      response: newResponse,
    });

    setInputText('');
  };

  const createNewChat = () => {
    // Logic for creating a new chat session
  };

  return (
    <div className="app">
      <LeftNav sessions={sessions} createNewChat={createNewChat} />
      <div className="chat-section">
        <ModelSelect
          models={models}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
        />
        <div className="chat-messages">
          {responses.map((response, index) => (
            <div key={index} className="response">
              {response}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Enter your message"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;





// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
