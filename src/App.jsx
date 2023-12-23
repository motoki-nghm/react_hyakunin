import { useEffect, useState } from 'react'
import './App.css'
import Button from './Button'
import hyakunin from '../hyakunin.json'

function App() {
  const [playing, setPlaying] = useState(false)
  const [currentCard, setCurrentCard] = useState(0)
  const [num, setNum] = useState(hyakunin.length)

  const shuffleData = () => {
    const array = hyakunin.slice()
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      if (playing && currentCard < num) {
        const shuffledData = shuffleData()
        const cardData = shuffledData[currentCard]
        const textToRead = cardData.bodyKana
        const imageURL = cardData.imageURL

        const imageEl = document.querySelector('.card__img')
        if (imageEl) {
          imageEl.src = imageURL
        }

        // 1回目の読み上げ
        await performAsyncRead(textToRead)

        const timeoutId = setTimeout(async () => {
          await performAsyncRead(textToRead)

          if (isMounted) {
            setCurrentCard((prevCard) => prevCard + 1)
          }
        }, 2000)

        return () => clearTimeout(timeoutId)
      } else if (playing && currentCard >= num) {
        // 最後のカード読み上げ完了後、2回目の読み上げも終わるまで待ってから handleStop を呼ぶ
        const lastCardTimeoutId = setTimeout(() => {
          handleStop()
        }, 7000) // カードごとに5秒待つ + 2秒

        return () => clearTimeout(lastCardTimeoutId)
      }
    }
    fetchData()
    return () => {
      isMounted = false
    }
  }, [playing, currentCard])

  const performAsyncRead = async (text) => {
    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.8

      utterance.onend = () => {
        resolve()
      }

      speechSynthesis.speak(utterance)
    })
  }

  const handleStart = (numCards) => {
    setCurrentCard(0)
    setNum(numCards)
    setPlaying(true)
  }

  const handleStop = () => {
    setCurrentCard(0)
    setPlaying(false)
  }

  return (
    <>
      <div className="h-screen grid place-items-center lg:grid-cols-2 gap-4 lg:gap-8">
        <div className="grid  gap-2 lg:gap-6 justify-items-center">
          <h1 className="title text-4xl lg:text-8xl">百人一首</h1>
          <>
            <div className="flex flex-col lg:flex-row gap-3 mt-6 lg:mt-10">
              <Button
                onClick={() => handleStart(hyakunin.length)}
                disabled={playing}
                label="始める"
              />
              <Button
                onClick={() => handleStart(10)}
                disabled={playing}
                label="10枚"
              />
              <Button
                onClick={() => handleStart(20)}
                disabled={playing}
                label="20枚"
              />
            </div>
            <Button onClick={handleStop} disabled={!playing} label="終わり" />
          </>
        </div>
        <div className="container --right">
          {playing ? (
            <figure className="card__container">
              <img alt="" className="card__img" />
            </figure>
          ) : (
            <div className="card__container border-2 border-gray-700 border-dashed grid place-items-center">
              <p className="text-2xl lg:text-5xl">画像</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
