import React, { useState, useEffect } from 'react'
import bridge from '@vkontakte/vk-bridge'
import {
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
} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import { schedule } from './data/schedule'
import { testDays } from './data/schedule'
import { MyPagination } from './components/MyPagination/MyPagination'
import { Icon28NewsfeedOutline, Icon28ServicesOutline } from '@vkontakte/icons'
import Navigation from './panels/Navigation'
import { MyCalendar } from './components/MyCalendar/MyCalendar'

const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']

const App = () => {
  const platform = usePlatform()
  const { viewWidth } = useAdaptivityConditionalRender()
  const [activeStory, setActiveStory] = React.useState('main')
  const onStoryChange = (e) => setActiveStory(e.currentTarget.dataset.story)
  const isVKCOM = platform !== Platform.VKCOM

  // ------DAY---------
  const [day, setDay] = useState()

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

  const changeDay = valueCalendar.toLocaleDateString().replaceAll('.', '-')
  //   console.log(valueCalendar.toLocaleDateString().replaceAll('.', '-'))

  // useEffect(() => {
  //   fetch(`back/${changeDay}`)
  //   .then(res => res.json())
  //   .then(data => setDay(data))
  // }, [day, valueCalendar])

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout
            header={!isVKCOM && <PanelHeader separator={false} />}
            style={{ justifyContent: 'center' }}>
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
                        text="Главная">
                        <Icon28NewsfeedOutline />
                      </TabbarItem>
                      <TabbarItem
                        onClick={onStoryChange}
                        selected={activeStory === 'schedule'}
                        data-story="schedule"
                        text="Расписание">
                        <Icon28ServicesOutline />
                      </TabbarItem>
                    </Tabbar>
                  )
                }>
                <View id="main" activePanel="main">
                  <Panel id="main">
                    <Group style={{ height: '1000px' }}></Group>
                  </Panel>
                </View>
                <View id="schedule" activePanel="schedule">
                  <Panel id="schedule">
                    <Group style={{ height: '1000px' }}>
                      <Div>
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
                      <Panel id="banner">
                        <Group>
                          <>
                            {schedule?.rasp.map((el, index) => (
                              <>
                                {index === 0 && (
                                  <Group mode="header">
                                    <SimpleCell
                                      indicator={valueCalendar
                                        .toLocaleDateString()
                                        .replaceAll('.', '-')}>
                                      {days[valueCalendar.getDay()]}
                                    </SimpleCell>
                                  </Group>
                                )}
                                <Banner
                                  before={
                                    <div>
                                      <p>{el.начало}</p>
                                      <hr />
                                      <p>{el.конец}</p>
                                    </div>
                                  }
                                  key={el.id}
                                  style={{ padding: 10 }}
                                  header={el.дисциплина}
                                  subheader={el.должность + el.преподаватель}
                                  text={el.аудитория}
                                />
                              </>
                            ))}
                          </>
                        </Group>
                        <MyPagination />
                      </Panel>
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
