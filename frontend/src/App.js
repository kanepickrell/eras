import React from 'react';
import Chat from './Chat';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';

function App() {
    return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={
              <>
                {/* <img src={process.env.PUBLIC_URL + './logo.svg'} className="App-logo" alt="logo" /> */}
                <p>
                  erasXchange is currently under construction.<br />For my other work please see my site below.
                </p>
                <a
                  className="App-link"
                  href="https://www.kanepickrel.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Go to kanepickrel.com
                </a>
              </>
            } />
            <Route path="/lbj" element={<Chat />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;



// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <header className="App-header">
//           <Routes>
//             <Route path="/" element={
//               <>
//                 <img src={process.env.PUBLIC_URL + './logo.svg'} className="App-logo" alt="logo" />
//                 <p>
//                   erasXchange is currently under construction.<br />For my other work please see my site below.
//                 </p>
//                 <a
//                   className="App-link"
//                   href="https://www.kanepickrel.com/"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   Go to kanepickrel.com
//                 </a>
//               </>
//             } />
//             <Route path="/chat" element={<Chat />} />
//           </Routes>
//         </header>
//       </div>
//     </Router>
//   );
// }

// export default App;
