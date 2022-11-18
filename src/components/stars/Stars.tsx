import { useState } from 'react'
import './Stars.css'

export default function Stars (): JSX.Element {
  const [stars, setStars] = useState(5)

  const arrStar = []
  for (let i = 0; i < 5; i++) {
    arrStar.push(i + 1)
  }

  return (
    <div className="flex">
      {arrStar.map((item, i) => {
        return (
            <img
              key={item}
              className={`star${item}`}
              src={i + 1 > stars ? 'images/star-none.svg' : 'images/star-dark.svg'}
              alt='star'
              onClick={() => {
                setStars(i + 1)
              }}
            />
        )
      })
      }
    </div>
  )
}
