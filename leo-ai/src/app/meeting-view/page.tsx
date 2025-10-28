
// src/app/meeting-view/page.tsx
"use client";

import React, { useState, useRef } from "react";
import { Meeting } from "../../lib/aiMeetingEngine";

// --- Mock Data ---

const mockParticipants = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "Diana" },
];

const lectureNotes = "This is a test lecture on the history of AI.";

// --- Types ---

interface Participant {
  id: number;
  name: string;
}

interface LogEntry {
  type: "info" | "question" | "answer";
  message: string;
  timestamp: string;
}

// --- Component ---

const MeetingViewPage: React.FC = () => {
  const [isLectureActive, setIsLectureActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSegment, setCurrentSegment] = useState("");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [showQuestionPopup, setShowQuestionPopup] = useState<Participant | null>(null);
  const [questionText, setQuestionText] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [isAnswering, setIsAnswering] = useState(false);

  const meetingRef = useRef<Meeting | null>(null);

  // --- Event Handlers ---

  const log = (type: LogEntry["type"], message: string) => {
    const newLog = { type, message, timestamp: new Date().toLocaleTimeString() };
    setLogs(prev => [...prev, newLog]);

    // --- Analytics Integration ---
    const storedLogs = JSON.parse(localStorage.getItem("meetingLogs") || "[]");
    localStorage.setItem("meetingLogs", JSON.stringify([...storedLogs, newLog]));
  };

  const handleStartLecture = async () => {
    log("info", "Lecture started.");
    setIsLectureActive(true);
    const script = await Meeting.generateLectureScript(lectureNotes);
    meetingRef.current = new Meeting("meeting-123", script, setCurrentSegment);
    meetingRef.current.simulateLecture();
  };

  const handlePauseLecture = () => {
    meetingRef.current?.pauseLecture();
    setIsPaused(true);
    log("info", "Lecture paused.");
  };

  const handleResumeLecture = () => {
    meetingRef.current?.resumeLecture();
    setIsPaused(false);
    log("info", "Lecture resumed.");
  };

  const handleEndLecture = () => {
    // In a real app, this would also clean up resources.
    setIsLectureActive(false);
    setIsPaused(false);
    setCurrentSegment("");
    log("info", "Lecture ended.");
  };

  const handleRaiseHand = (participant: Participant) => {
    handlePauseLecture();
    setShowQuestionPopup(participant);
    log("info", `${participant.name} raised their hand.`);
  };

  const handleSendQuestion = async () => {
    if (!showQuestionPopup || !meetingRef.current) return;

    setIsAnswering(true);
    log("question", `${showQuestionPopup.name}: "${questionText}"`);
    const answer = await meetingRef.current.handleQuestion(showQuestionPopup.name, questionText);
    setAnswerText(answer);
    log("answer", `AI: "${answer}"`);
    setIsAnswering(false);

    // Auto-close popup and resume after a delay
    setTimeout(() => {
      setShowQuestionPopup(null);
      setQuestionText("");
      setAnswerText("");
      handleResumeLecture();
    }, 3000);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">AI Meeting Simulation</h1>
        <p className="text-gray-400">Simulating a live Google Meet-style lecture.</p>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Lecture Area */}
        <div className="lg:col-span-3 bg-gray-800 rounded-lg p-6 flex flex-col">
          <h2 className="text-2xl font-semibold mb-4">Lecture: The Future of AI</h2>
          <div className="flex-1 bg-gray-900 rounded-lg p-4 mb-4">
            <p className="text-lg">{currentSegment}</p>
            {isLectureActive && !isPaused && (
              <div className="flex items-center mt-2">
                <span className="text-green-400">AI is speaking</span>
                <div className="animate-pulse flex space-x-1 ml-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
              </div>
            )}
          </div>

          {/* Floating Controls */}
          <div className="flex items-center justify-center space-x-4">
            {!isLectureActive ? (
              <button onClick={handleStartLecture} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">Start Lecture</button>
            ) : isPaused ? (
              <button onClick={handleResumeLecture} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg">Resume</button>
            ) : (
              <button onClick={handlePauseLecture} className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg">Pause</button>
            )}
            {isLectureActive && (
              <button onClick={handleEndLecture} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg">End Session</button>
            )}
          </div>
        </div>

        {/* Participants Panel */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Participants ({mockParticipants.length})</h3>
          <ul className="space-y-3">
            {mockParticipants.map(p => (
              <li key={p.id} className="flex items-center justify-between">
                <span>{p.name}</span>
                <button
                  onClick={() => handleRaiseHand(p)}
                  className="bg-gray-700 hover:bg-gray-600 px-3 py-1 text-sm rounded-lg"
                  disabled={!isLectureActive}
                >
                  Raise Hand
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* Logs Section */}
      <footer className="mt-6 bg-gray-800 rounded-lg p-4 max-h-48 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-2">Event Log</h3>
        <div className="space-y-1 text-sm">
          {logs.map((log, index) => (
            <p key={index} className="text-gray-400">
              <span className="font-mono text-gray-500">{log.timestamp}</span> - <span className={`${log.type === 'question' ? 'text-yellow-400' : log.type === 'answer' ? 'text-green-400' : ''}`}>{log.message}</span>
            </p>
          ))}
        </div>
      </footer>

      {/* Question Popup */}
      {showQuestionPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-gray-800 rounded-lg p-8 w-full max-w-lg">
            <h2 className="text-2xl mb-4">{showQuestionPopup.name} has a question</h2>
            <textarea
              className="w-full bg-gray-700 rounded-lg p-2 mb-4"
              rows={4}
              placeholder="Type the question here..."
              value={questionText}
              onChange={e => setQuestionText(e.target.value)}
            />
            <button onClick={handleSendQuestion} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg" disabled={isAnswering}>
              {isAnswering ? 'Generating Answer...' : 'Ask Question'}
            </button>
            {answerText && (
              <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                <p className="font-semibold">AI&apos;s Answer:</p>
                <p>{answerText}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingViewPage;
