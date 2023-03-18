import React, { useState } from 'react'

import img from './../../img/hack.png'

export const MyPopup = ({ event, setEventPopup }) => {
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
            <h2>{event.title}</h2>
            <p style={{ fontSize: 18 }}>
              <span style={{ width: 85, display: 'inline-block' }}>Уровень : </span>
              <span style={{ color: 'green', fontWeight: 500 }}>{event.level}</span>
            </p>
            <p>
              <span style={{ width: 85, display: 'inline-block' }}>Начало : </span>
              <span style={{ color: 'orange', fontWeight: 500 }}>{event.start}</span>
            </p>
            <p>{event.description}</p>
          </div>
        </div>
      </div>
    </>
  )
}
