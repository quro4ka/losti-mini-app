import React, { useState } from 'react'
import { Spinner, ScreenSpinner } from '@vkontakte/vkui'
import img from './../../img/hack.png'
import { Button } from '@vkontakte/vkui'

export const MyPopup = ({ event, setEventPopup }) => {
  const [loading, setLoading] = useState(null)

  // const handleRecord = () => {
  //   setLoading(true)
  // }

  // const clearPopout = () => setLoading(null)

  const handleRecord = () => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setEventPopup(false)
    }, 1200)
  }

  return (
    <>
      <div
        onClick={() => setEventPopup(false)}
        style={{
          background: 'rgba(34, 34, 34, 0.52)',
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
        }}></div>
      <div
        style={{
          width: '80%',
          position: 'absolute',
          left: 40,
          background: 'rgba(53, 53, 53, 1)',
          borderRadius: 10,
        }}>
        <div>
          <img
            style={{
              width: '100%',
              height: '100px',
              objectFit: 'cover',
              borderTopLeftRadius: 7,
              borderTopRightRadius: 7,
            }}
            src={event.img}
            alt="hack"
          />
          <div style={{ padding: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2>{event.title}</h2>
              <Button onClick={handleRecord} style={{ background: 'rgba(67, 183, 100, 0.8)' }}>
                Записаться
              </Button>
            </div>
            <p style={{ fontSize: 18 }}>
              <span style={{ width: 85, display: 'inline-block' }}>Уровень : </span>
              <span style={{ color: 'green', fontWeight: 500 }}>{event.level}</span>
            </p>
            <p>
              <span style={{ width: 85, display: 'inline-block' }}>Начало : </span>
              <span style={{ color: 'orange', fontWeight: 500 }}>{event.start}</span>
            </p>
            <p>{event.description}</p>
            {loading && (
              <div style={{ position: 'absolute', top: '40%', left: '45%' }}>
                <Spinner size="regular" style={{ margin: '20px 0' }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
