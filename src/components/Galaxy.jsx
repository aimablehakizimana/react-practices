import { useEffect, useState } from 'react'

const Galaxy = () => {
  const [stars, setStars] = useState([])

  useEffect(() => {
    const generateStars = () => {
      const starArray = []
      for (let i = 0; i < 100; i++) {
        starArray.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          animationDelay: Math.random() * 3
        })
      }
      setStars(starArray)
    }
    generateStars()
  }, [])

  return (
    <div className="galaxy">
      {stars.map(star => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.animationDelay}s`
          }}
        />
      ))}
      <div className="galaxy-center">
        <h1>🌌 Galaxy TSS</h1>
        <p>Explore the universe of knowledge</p>
      </div>
    </div>
  )
}

export default Galaxy