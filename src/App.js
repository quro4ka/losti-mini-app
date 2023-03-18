import React, { useState, useEffect } from 'react'
import bridge from '@vkontakte/vk-bridge'
import { Icon24Fire, Icon32MasksOutline } from '@vkontakte/icons'
import Select from 'react-select'
import CardRasp from './components/CardRasp/CardRasp'
import MyButtonRasp from './components/MyButtonRasp/MyButtonRasp'
import {
  FixedLayout,
  Title,
  Text,
  View,
  ScreenSpinner,
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitLayout,
  SplitCol,
  PanelHeader,
  Panel,
  Group,
  useAdaptivityConditionalRender,
  usePlatform,
  Platform,
  Cell,
  Tabbar,
  Epic,
  TabbarItem,
  Counter,
  PanelHeaderBack,
  Placeholder,
  Badge,
  CardGrid,
  ContentCard,
  Header,
  Banner,
  Button,
  Image,
  SimpleCell,
  Div,
  CellButton,
  ButtonGroup,
  Card,
  ModalPageHeader,
  PanelHeaderClose,
} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import { events } from './data/events'
import { monday } from './data/schedule'
import { tuesday } from './data/schedule'
import { wednesday } from './data/schedule'
import { thursday } from './data/schedule'
import { friday } from './data/schedule'
import { saturday } from './data/schedule'
import { Icon28NewsfeedOutline, Icon28ServicesOutline } from '@vkontakte/icons'
import Navigation from './panels/Navigation'
import { MyCalendar } from './components/MyCalendar/MyCalendar'
import { MyPopup } from './components/MyPopup/MyPopup'

const optionsSortEvents = [
  { value: 'hot', label: 'Hot' },
  { value: 'date', label: 'Date' },
]

const colourStylesEvents = {
  control: (styles) => ({
    ...styles,
    color: 'white',
    backgroundColor: 'rgba(226, 226, 226, 1)',
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      color: 'white',
      backgroundColor: 'rgba(53, 53, 53, 1)',
      color: '#FFF',
      cursor: isDisabled ? 'not-allowed' : 'default',
    }
  },
}

const App = () => {
  //--------TODO-----------
  const [todo, setTodo] = useState([])
  const platform = usePlatform()
  const { viewWidth } = useAdaptivityConditionalRender()
  const [activeStory, setActiveStory] = React.useState('main')
  const onStoryChange = (e) => setActiveStory(e.currentTarget.dataset.story)
  const isVKCOM = platform !== Platform.VKCOM

  // EVENT-SORT
  const [stateEvents, setStateEvents] = useState([])
  const [selectedSort, setSelectedSort] = useState('')

  const [days, setDays] = useState([
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье',
  ])

  // ------DAY---------
  // const [day, setDay] = useState()
  const [dayIndex, setDayIndex] = useState(0)

  // ---------CALENDAR-------------
  const [valueCalendar, setValueCalendar] = useState(() => new Date())
  const [isCalendar, setIsCalendar] = useState(false)

  // --------BUTTON------------
  const [align, setAlign] = useState('center')
  const [appearance, setAppearance] = useState('accent')
  const [stretched, setStretched] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [size, setSize] = useState('s')
  const [loading, setLoading] = useState(false)

  // -----EVENT POPUP -------
  const [eventPopup, setEventPopup] = useState(false)
  const [eventId, setEventId] = useState()

  // ------FOR START----------
  const [activePanel, setActivePanel] = useState('home')
  const [fetchedUser, setUser] = useState(null)
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />)

  // DATA TEACHERS
  const [dataTeachers, setDataTeachers] = useState()

  // const changeDay = valueCalendar.toLocaleDateString().replaceAll('.', '-')
  console.log(dayIndex)

  useEffect(() => {
    setStateEvents(events)
  }, [])

  // useEffect(() => {
  //   const fetchAnalyticsTeacher = async () => {
  //     const res = await fetch('http://18.195.216.230:8001/api/v1/teachers/')
  //     const data = await res.json()
  //     setDataTeachers(data)
  //   }

  //   fetchAnalyticsTeacher()
  // }, [])

  console.log(dataTeachers)

  useEffect(() => {
    setDayIndex(valueCalendar.getDay())
  }, [valueCalendar])

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo')
      setUser(user)
      setPopout(null)
    }
    fetchData()
  }, [])

  const handleDayTitle = (index) => {
    setDayIndex(index)
  }

  const openPopup = (id) => {
    setEventPopup(true)
    setEventId(id)
  }

  const sortEvents = (sort) => {
    setSelectedSort(sort?.value)
    console.log('====================================')
    console.log(sort?.value)
    console.log('====================================')
    if (sort?.value === 'hot') {
      setStateEvents([...stateEvents].sort((a, b) => b[sort?.value] - a[sort?.value]))
    }

    if (sort?.value === 'date') {
      setStateEvents(
        [...stateEvents].sort((a, b) => new Date(a[sort?.value]) - new Date(b[sort?.value])),
      )
    }

    console.log('====================================')
    console.log('stateEvents', stateEvents)
    console.log('====================================')
  }

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout style={{ width: '100%', justifyContent: 'center' }}>
            {viewWidth.tabletPlus && (
              <Navigation
                viewWidth={viewWidth}
                isVKCOM={isVKCOM}
                activeStory={activeStory}
                onStoryChange={onStoryChange}
              />
            )}

            <SplitCol width="100%" maxWidth="560px" stretchedOnMobile autoSpaced>
              <Epic
                activeStory={activeStory}
                tabbar={
                  viewWidth.tabletMinus && (
                    <Tabbar className={viewWidth.tabletMinus.className}>
                      <TabbarItem
                        onClick={onStoryChange}
                        selected={activeStory === 'main'}
                        data-story="main"
                        text="Мероприятия">
                        <Icon28NewsfeedOutline />
                      </TabbarItem>
                      <TabbarItem
                        onClick={onStoryChange}
                        selected={activeStory === 'schedule'}
                        data-story="schedule"
                        text="Расписание">
                        <Icon28ServicesOutline />
                      </TabbarItem>
                      <TabbarItem
                        onClick={onStoryChange}
                        selected={activeStory === 'analytic'}
                        data-story="analytic"
                        text="analytic">
                        <Icon28ServicesOutline />
                      </TabbarItem>
                    </Tabbar>
                  )
                }>
                <View id="main" activePanel="main">
                  <Panel id="main">
                    <Group style={{ height: '900px' }}>
                      <CardGrid size="s">
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            marginTop: 80,
                          }}>
                          <h1>Мероприятия</h1>
                          <Select
                            value={selectedSort}
                            onChange={sortEvents}
                            options={optionsSortEvents}
                            styles={colourStylesEvents}
                          />
                        </div>
                      </CardGrid>
                      <CardGrid size="m">
                        {stateEvents &&
                          stateEvents?.map((event, index) => (
                            <>
                              <Card>
                                <div
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '10px',
                                    objectFit: 'cover',
                                    opacity: 0.8,
                                    blur: 1,
                                  }}>
                                  <div>
                                    <h3>{event.title}</h3>
                                    <div style={{ marginBottom: '20px' }}>Место: {event.place}</div>
                                    <Button
                                      style={{ width: '100%', minWidth: 50, maxWidth: 100 }}
                                      onClick={() => openPopup(event)}>
                                      Open
                                    </Button>
                                  </div>
                                  {event.hot === 1 && (
                                    <Icon24Fire
                                      style={{
                                        position: 'absolute',
                                        left: 10,
                                        top: 5,
                                      }}
                                      color="orange"
                                    />
                                  )}
                                </div>
                              </Card>
                            </>
                          ))}
                        {eventPopup && <MyPopup setEventPopup={setEventPopup} event={eventId} />}
                      </CardGrid>
                    </Group>
                  </Panel>
                </View>

                <View id="schedule" activePanel="schedule">
                  <Panel id="schedule">
                    <Group style={{ height: '850px', width: '100%' }}>
                      <PanelHeader>Расписание ВИИМ31</PanelHeader>
                      <Div style={{ display: 'none' }}>
                        <Button
                          align={align}
                          appearance={appearance}
                          stretched={stretched}
                          disabled={disabled}
                          size={size}
                          loading={loading}
                          onClick={() => setIsCalendar(!isCalendar)}>
                          Календарь
                        </Button>
                      </Div>
                      {isCalendar && (
                        <MyCalendar
                          valueCalendar={valueCalendar}
                          setValueCalendar={setValueCalendar}
                        />
                      )}
                      <FixedLayout vertical="bottom">
                        <Tabbar style={{ position: 'static', padding: '10px 0' }}>
                          {days.map((day, index) => {
                            return (
                              <MyButtonRasp
                                day={day}
                                index={index}
                                month={valueCalendar}
                                dayIndex={dayIndex}
                                onClick={() => handleDayTitle(index)}
                              />
                            )
                          })}
                        </Tabbar>
                      </FixedLayout>
                      {/* {days.map((day, index) => {
                        return (
                          <Button
                            size="s"
                            onClick={() => handleDayTitle(index)}
                            style={{
                              background: `${index === dayIndex ? 'gold' : 'gray'}`,
                              margin: '5px',
                            }}>
                            {day}
                          </Button>
                        )
                      })} */}
                      <Panel id="banner">
                        <Group>
                          <>
                            {dayIndex === 0 &&
                              monday.map((el, index) => (
                                <>
                                  {index === 0 && (
                                    <Group mode="header">
                                      <SimpleCell indicator={<Text>{el.дата}</Text>}>
                                        <Title>{days[dayIndex]}</Title>
                                      </SimpleCell>
                                    </Group>
                                  )}
                                  <CardRasp
                                    importance={el.важность}
                                    todo={todo}
                                    setTodo={setTodo}
                                    number={el.номерЗанятия}
                                    start={el.начало}
                                    end={el.конец}
                                    audit={el.аудитория}
                                    teacher={
                                      el.должность
                                        ? `${el.должность}.${el.преподаватель}`
                                        : el.преподаватель
                                    }
                                    discipline={el.дисциплина}
                                  />
                                </>
                              ))}
                            {dayIndex === 1 &&
                              tuesday.map((el, index) => (
                                <>
                                  {index === 0 && (
                                    <Group mode="header">
                                      <SimpleCell indicator={<Text>{el.дата}</Text>}>
                                        <Title>{days[dayIndex]}</Title>
                                      </SimpleCell>
                                    </Group>
                                  )}
                                  <CardRasp
                                    importance={el.важность}
                                    todo={todo}
                                    setTodo={setTodo}
                                    number={el.номерЗанятия}
                                    start={el.начало}
                                    end={el.конец}
                                    audit={el.аудитория}
                                    teacher={
                                      el.должность
                                        ? `${el.должность}.${el.преподаватель}`
                                        : el.преподаватель
                                    }
                                    discipline={el.дисциплина}
                                  />
                                </>
                              ))}
                            {dayIndex === 2 && (
                              <Placeholder
                                header="У вас сегодня выходной :)"
                                icon={
                                  <Icon32MasksOutline style={{ width: 84, height: 84 }} />
                                }></Placeholder>
                            )}
                            {dayIndex === 3 &&
                              thursday.map((el, index) => (
                                <>
                                  {index === 0 && (
                                    <Group mode="header">
                                      <SimpleCell indicator={<Text>{el.дата}</Text>}>
                                        <Title>{days[dayIndex]}</Title>
                                      </SimpleCell>
                                    </Group>
                                  )}
                                  <CardRasp
                                    importance={el.важность}
                                    todo={todo}
                                    setTodo={setTodo}
                                    number={el.номерЗанятия}
                                    start={el.начало}
                                    end={el.конец}
                                    audit={el.аудитория}
                                    teacher={
                                      el.должность
                                        ? `${el.должность}.${el.преподаватель}`
                                        : el.преподаватель
                                    }
                                    discipline={el.дисциплина}
                                  />
                                </>
                              ))}
                            {dayIndex === 4 &&
                              friday.map((el, index) => (
                                <>
                                  {index === 0 && (
                                    <Group mode="header">
                                      <SimpleCell indicator={<Text>{el.дата}</Text>}>
                                        <Title>{days[dayIndex]}</Title>
                                      </SimpleCell>
                                    </Group>
                                  )}
                                  <CardRasp
                                    importance={el.важность}
                                    todo={todo}
                                    setTodo={setTodo}
                                    number={el.номерЗанятия}
                                    start={el.начало}
                                    end={el.конец}
                                    audit={el.аудитория}
                                    teacher={
                                      el.должность
                                        ? `${el.должность}.${el.преподаватель}`
                                        : el.преподаватель
                                    }
                                    discipline={el.дисциплина}
                                  />
                                </>
                              ))}
                            {dayIndex === 5 && (
                              <Placeholder
                                header="У вас сегодня выходной :)"
                                icon={
                                  <Icon32MasksOutline style={{ width: 84, height: 84 }} />
                                }></Placeholder>
                            )}
                            {dayIndex === 6 && (
                              <Placeholder
                                header="У вас сегодня выходной :)"
                                icon={
                                  <Icon32MasksOutline style={{ width: 84, height: 84 }} />
                                }></Placeholder>
                            )}
                          </>
                        </Group>
                      </Panel>

                      {/* <Panel id="banner">
                        <Group>
                          <>
                            {dayIndex === 0 &&
                              monday.map((el, index) => (
                                <>
                                  {index === 0 && (
                                    <Group mode="header">
                                      <SimpleCell
                                        indicator={
                                          <Text>
                                            {valueCalendar
                                              .toLocaleDateString()
                                              .replaceAll('.', '-')}
                                          </Text>
                                        }>
                                        <Title>{days[dayIndex]}</Title>
                                      </SimpleCell>
                                    </Group>
                                  )}
                                  <CardRasp
                                    number={el.номерЗанятия}
                                    start={el.начало}
                                    end={el.конец}
                                    audit={el.аудитория}
                                    teacher={
                                      el.должность
                                        ? `${el.должность}.${el.преподаватель}`
                                        : el.преподаватель
                                    }
                                    discipline={el.дисциплина}
                                  />
                                </>
                              ))}
                            {dayIndex === 1 &&
                              tuesday.map((el, index) => (
                                <>
                                  {index === 0 && (
                                    <Group mode="header">
                                      <SimpleCell
                                        indicator={
                                          <Text>
                                            {valueCalendar
                                              .toLocaleDateString()
                                              .replaceAll('.', '-')}
                                          </Text>
                                        }>
                                        <Title>{days[dayIndex]}</Title>
                                      </SimpleCell>
                                    </Group>
                                  )}
                                  <CardRasp
                                    number={el.номерЗанятия}
                                    start={el.начало}
                                    end={el.конец}
                                    audit={el.аудитория}
                                    teacher={
                                      el.должность
                                        ? `${el.должность}.${el.преподаватель}`
                                        : el.преподаватель
                                    }
                                    discipline={el.дисциплина}
                                  />
                                </>
                              ))}
                            {dayIndex === 2 &&
                              wednesday.map((el, index) => (
                                <>
                                  {index === 0 && (
                                    <Group mode="header">
                                      <SimpleCell
                                        indicator={
                                          <Text>
                                            {valueCalendar
                                              .toLocaleDateString()
                                              .replaceAll('.', '-')}
                                          </Text>
                                        }>
                                        <Title>{days[dayIndex]}</Title>
                                      </SimpleCell>
                                    </Group>
                                  )}
                                  <CardRasp
                                    number={el.номерЗанятия}
                                    start={el.начало}
                                    end={el.конец}
                                    audit={el.аудитория}
                                    teacher={
                                      el.должность
                                        ? `${el.должность}.${el.преподаватель}`
                                        : el.преподаватель
                                    }
                                    discipline={el.дисциплина}
                                  />
                                </>
                              ))}
                            {dayIndex === 3 &&
                              thursday.map((el, index) => (
                                <>
                                  {index === 0 && (
                                    <Group mode="header">
                                      <SimpleCell
                                        indicator={
                                          <Text>
                                            {valueCalendar
                                              .toLocaleDateString()
                                              .replaceAll('.', '-')}
                                          </Text>
                                        }>
                                        <Title>{days[dayIndex]}</Title>
                                      </SimpleCell>
                                    </Group>
                                  )}
                                  <CardRasp
                                    number={el.номерЗанятия}
                                    start={el.начало}
                                    end={el.конец}
                                    audit={el.аудитория}
                                    teacher={
                                      el.должность
                                        ? `${el.должность}.${el.преподаватель}`
                                        : el.преподаватель
                                    }
                                    discipline={el.дисциплина}
                                  />
                                </>
                              ))}
                            {dayIndex === 4 &&
                              friday.map((el, index) => (
                                <>
                                  {index === 0 && (
                                    <Group mode="header">
                                      <SimpleCell
                                        indicator={
                                          <Text>
                                            {valueCalendar
                                              .toLocaleDateString()
                                              .replaceAll('.', '-')}
                                          </Text>
                                        }>
                                        <Title>{days[dayIndex]}</Title>
                                      </SimpleCell>
                                    </Group>
                                  )}
                                  <CardRasp
                                    number={el.номерЗанятия}
                                    start={el.начало}
                                    end={el.конец}
                                    audit={el.аудитория}
                                    teacher={
                                      el.должность
                                        ? `${el.должность}.${el.преподаватель}`
                                        : el.преподаватель
                                    }
                                    discipline={el.дисциплина}
                                  />
                                </>
                              ))}
                            {dayIndex === 5 &&
                              saturday.map((el, index) => (
                                <>
                                  {index === 0 && (
                                    <Group mode="header">
                                      <SimpleCell
                                        indicator={
                                          <Text>
                                            {valueCalendar
                                              .toLocaleDateString()
                                              .replaceAll('.', '-')}
                                          </Text>
                                        }>
                                        <Title>{days[dayIndex]}</Title>
                                      </SimpleCell>
                                    </Group>
                                  )}
                                  <CardRasp
                                    number={el.номерЗанятия}
                                    start={el.начало}
                                    end={el.конец}
                                    audit={el.аудитория}
                                    teacher={
                                      el.должность
                                        ? `${el.должность}.${el.преподаватель}`
                                        : el.преподаватель
                                    }
                                    discipline={el.дисциплина}
                                  />
                                </>
                              ))}
                          </>
                        </Group>
                      </Panel> */}
                    </Group>
                  </Panel>
                </View>

                <View id="analytic">
                  <Panel id="analytic" activePanel="analytic">
                    <Group style={{ height: '850px', width: '100%' }}>
                      <PanelHeader>Аналитика</PanelHeader>
                    </Group>
                  </Panel>
                </View>
              </Epic>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  )
}

export default App
