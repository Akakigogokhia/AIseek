import { useContext, useEffect, useRef, useState } from 'react';
import './chat.css';
import Next from '@mui/icons-material/ArrowForwardIos';
import Back from '@mui/icons-material/ArrowBackIos';
import Restart from '@mui/icons-material/RestartAlt';
import { Context } from '../Context';
import { TypeAnimation } from 'react-type-animation';

export default function Chat({ prompt, loading, data, regenerate, same }) {
  const [index, setIndex] = useState(0);
  const [answersIndex, setAnswersIndex] = useState(0);
  const { conversation, setConversation } = useContext(Context);
  const [answers, setAnswers] = useState([]);
  const [isNew, setIsNew] = useState(true);
  const [response, setResponse] = useState(null);
  const convLength = conversation.length;
  const chatRef = useRef(null);

  useEffect(() => {
    if (same && prompt) setAnswers((prevAnswers) => [...prevAnswers, data]);
    else if (prompt) setAnswers([data]);
  }, [data]);

  useEffect(() => {
    const newChat = {
      question: prompt,
      answers: answers,
    };
    if (
      !same &&
      answers.length > 0 &&
      conversation[convLength - 1].question !== prompt
    )
      setConversation((prevChat) => [...prevChat, newChat]);
    else if (same && answers.length > 0) {
      const updatedConv = [...conversation];
      const newAnswers = (updatedConv[index].answers = answers);
      setConversation(updatedConv);
    }
  }, [answers]);

  useEffect(() => {
    setResponse(conversation[index].answers[answersIndex]);
  }, [conversation, index, answersIndex]);

  useEffect(() => {
    setIndex(convLength - 1);
    setIsNew(true);
  }, [conversation]);

  useEffect(() => {
    setAnswersIndex(conversation[index].answers.length - 1);
  }, [conversation, index]);

  useEffect(() => {
    const chatElement = chatRef.current;
    if (chatElement) {
      const observer = new MutationObserver((mutations) => {
        chatElement.scrollTop = chatElement.scrollHeight;
      });

      const observerConfig = {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
      };
      observer.observe(chatElement, observerConfig);

      return () => observer.disconnect();
    }
  }, []);

  const changeIndex = (value) => {
    setIsNew(false);
    if (value === 1) {
      setIndex(Math.min(index + 1, convLength - 1));
    } else {
      setIndex(Math.max(index - 1, 1));
    }
  };

  const changeAnswerIndex = (value) => {
    setIsNew(false);
    if (value === 1) {
      setAnswersIndex(
        Math.min(answersIndex + 1, conversation[index].answers.length - 1)
      );
    } else {
      setAnswersIndex(Math.max(answersIndex - 1, 0));
    }
  };

  return (
    <main className='chat' id='chat' ref={chatRef}>
      <div className='chat_container'>
        {convLength > 1 && (
          <div id='questionWrapper'>
            {convLength > 2 && (
              <Back onClick={() => changeIndex(-1)} id='prevQuestion' />
            )}
            {index === convLength - 1 ? prompt : conversation[index].question}
            {convLength > 2 && (
              <Next onClick={() => changeIndex(1)} id='nextQuestion' />
            )}
          </div>
        )}
        <div
          id='answerWrapper'
          style={{
            border: convLength > 1 && '1px solid rgb(240, 238, 238)',
          }}
        >
          {conversation[index].answers.length > 1 && !loading && (
            <div className='changeAnswer'>
              <Back onClick={() => changeAnswerIndex(-1)} id='prevAnswer' />{' '}
              <span>
                {answersIndex + 1 + '/' + conversation[index].answers.length}
              </span>{' '}
              <Next onClick={() => changeAnswerIndex(1)} id='nextAnswer' />
            </div>
          )}

          {loading ? (
            <div className='loading'>
              <div id='loading_text'>Loading</div>
            </div>
          ) : (
            response && (
              <div id='answer'>
                {index === convLength - 1 &&
                answersIndex === conversation[index].answers.length - 1 &&
                isNew ? (
                  <TypeAnimation
                    sequence={[response]}
                    speed={80}
                    wrapper='div'
                    cursor={true}
                    key={response}
                  />
                ) : (
                  response
                )}
              </div>
            )
          )}
        </div>
      </div>

      {prompt && !loading && index === convLength - 1 && (
        <button onClick={regenerate} id='regenerate'>
          <Restart id='restart' />
          Regenerate response
        </button>
      )}
    </main>
  );
}
