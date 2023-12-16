import { useEffect, useState} from 'react';
import './App.css';
import karutaData from '../katuta-data.json';
import SplitText from './SplitText';
import imgURL from './assets/warm.png';

function App() {
  const [playing, setPlaying] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const  [num, setNum] = useState(karutaData.length);

  const shuffleData = ()=>{
    const array = karutaData.slice();
    for(let i = array.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  useEffect(() => {
      const fetchData = async () => {
        if (playing && currentCard < num) {
          const textToRead = shuffleData()[currentCard].text; // カードのテキストを取得するためにcurrentCardのインデックスを使用
        // 1回目の読み上げ
        await performAsyncRead(textToRead);

        // 2回目の読み上げを1回目の読み上げの後に2秒後にスケジュール
        setTimeout(async () => {
          await performAsyncRead(textToRead);
          setTimeout(() => {
            setCurrentCard((prevCard) => prevCard + 1); // 次のカードに進む
          },5000)
        }, 2000);
        } else if(playing && currentCard >= num){
          handleStop();
        }
      };
      fetchData();
  }, [playing,currentCard]);

  const performAsyncRead = async (text) => {
    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;

      utterance.onend = () => {
        resolve();
      };

      speechSynthesis.speak(utterance);
    });
  };

  const handleStart = (numCards) => {
    setCurrentCard(0);
    setNum(numCards);
    setPlaying(true);
  };

  const handleStop = () => {
    setCurrentCard(0);
    setPlaying(false);
  };

  return (
    <>
    <head>
      <title>かるた</title>
      <meta name="robots" content="noindex" />
      <meta name="googlebot" content="noindex" />
    </head>
    <h1 className="title">
    <SplitText>
        はらぺこあおむし&emsp;かるた
    </SplitText>
    </h1>
      <div className="grid gap-6 grid-cols-3 mt-10">
          <button onClick={handleStart} disabled={playing} className='px-10 py-6 text-gray-700 bg-red-200'>
            さいしょから
          </button>
          <button onClick={() => handleStart(10)}disabled={playing}  className='px-10 text-gray-700 bg-red-200'>10まい</button>
          <button onClick={() => handleStart(20)}disabled={playing}  className='px-10 text-gray-700 bg-red-200'>20まい</button>
      </div>
      <button onClick={handleStop} disabled={!playing} className='py-6 px-20 mt-10 text-gray-700 bg-blue-200'>
        おわり
      </button>
      <div className="warm__img">
        <img src={imgURL} alt="" className='warm'/>
      </div>
    </>
  );
}

export default App;