import React, {useEffect, useState} from 'react'
import s from './CardRasp.module.scss'
import {
  Button,
  Card,
  CardGrid,
  Chip,
  ChipsInput,
  FormItem,
  FormLayout,
  Group,
  Input,
  Panel,
  SubnavigationButton,
  Text,
  Title, Tooltip,
} from '@vkontakte/vkui'
import { Icon24Place } from '@vkontakte/icons'
import { Icon24ArticleBoxOutline } from '@vkontakte/icons'
import { Icon24UserSquareOutline } from '@vkontakte/icons'
import { Icon20EditCircleFillBlue } from '@vkontakte/icons'
import { Popover } from '@vkontakte/vkui/dist/components/Popover/Popover'
import { Icon24ListAddOutline } from '@vkontakte/icons'
import bridge from "@vkontakte/vk-bridge";
const styleGroup = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '20%',
}
const styleGroup2 = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  width: '100%'
}
const text = {
  margin: '10px 0',
  borderTop: '2px solid var(--vkui--color_icon_accent)',
  borderBottom: '2px solid var(--vkui--color_icon_accent)',
  padding: 4,
  borderRadius: 6,
}
const CardRasp = ({ audit, teacher, discipline, end, start, number,todo,setTodo,importance }) => {
  const [shown, setShown] = useState(false)
  const [tooltip, setTooltip] = React.useState(true);


  const FuncImpor = (importance)=>{
    if(importance === 0){
      return 'lightgreen'
    }
    if(importance === 1){
      return 'green'
    }
    if(importance === 2){
      return 'yellow'
    }
    if(importance === 3){
      return 'orange'

    }if(importance === 4){
      return 'red'

    }
  }



  return (

      <CardGrid

          style={{ display: 'flex', alignItems: 'center', position: 'relative', flexWrap: 'nowrap',padding: 10,border: `1px solid ${FuncImpor(importance)}`,borderRadius: 10,margin: 10}}>
        <div style={styleGroup}>
          <Title level="4" weight="2">
            {start}
          </Title>
          <Text style={text}>{number}</Text>
          <Title level="4" weight="2">
            {end}
          </Title>
        </div>

        <div style={styleGroup2}>
          <Title
            style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}
            level="5"
            weight="2">
            <Icon24Place style={{ marginRight: 5, width: 20, height: 20 }} />
            {audit}
          </Title>

          <Title
            style={{ display: 'flex', alignItems: 'center',marginBottom: 10, wordBreak: "break-word"}}
            level="5"
            weight="2">
            <Icon24ArticleBoxOutline style={{ marginRight: 5, width: 20, height: 20 }} />
            {discipline}
          </Title>

          <Title style={{ display: 'flex', alignItems: 'center' }} level="5" weight="2">
            <Icon24UserSquareOutline style={{ marginRight: 5, width: 20, height: 20 }} />
            {teacher}
          </Title>
        </div>

        <Popover
          action="click"
          shown={shown}
          onShownChange={setShown}
          content={
            <FormItem top="Список">
              <ChipsInput
                value={todo}
                style={{ width: 265 }}
                placeholder="Введите название и нажмите Enter"
                onChange={(e) => {
                  setTodo(e)
                }}
              />
            </FormItem>
          }>
          <SubnavigationButton
            className={s.button}
            size="s"
            style={{
              margin: 0,
              position: 'absolute',
              top: 5,
              right: 5,
            }}>
            Тудушки
          </SubnavigationButton>
        </Popover>
      </CardGrid>

  )
}

export default CardRasp
