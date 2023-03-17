import { useState } from 'react'
import { FormLayout, FormLayoutGroup, FormItem, Checkbox, Select } from '@vkontakte/vkui'
import { LocaleProvider, Calendar } from '@vkontakte/vkui'

export const MyCalendar = ({ valueCalendar, setValueCalendar, onClose }) => {
  const [value, setValue] = useState(() => new Date())
  const [enableTime, setEnableTime] = useState(false)
  const [disablePast, setDisablePast] = useState(false)
  const [disableFuture, setDisableFuture] = useState(false)
  const [disablePickers, setDisablePickers] = useState(false)
  const [showNeighboringMonth, setShowNeighboringMonth] = useState(false)
  const [locale, setLocale] = useState('ru')
  const [size, setSize] = useState('m')
  const [listenDayChangesForUpdate, setListenDayChangesForUpdate] = useState(false)

  //   console.log('value', value.toLocaleDateString().replaceAll('.', '-'))
  //   console.log('enableTime', enableTime)
  //   console.log('disablePast', disablePast)

  return (
    <FormLayout>
      <FormLayoutGroup mode="vertical">
        <FormItem>
          <LocaleProvider value={locale}>
            <Calendar
              onClose={onClose}
              value={valueCalendar}
              onChange={setValueCalendar}
              enableTime={enableTime}
              disablePast={disablePast}
              disableFuture={disableFuture}
              disablePickers={disablePickers}
              showNeighboringMonth={showNeighboringMonth}
              size={size}
              listenDayChangesForUpdate={listenDayChangesForUpdate}
            />
          </LocaleProvider>
        </FormItem>
      </FormLayoutGroup>
    </FormLayout>
  )
}
