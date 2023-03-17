import { useState } from 'react'
import { SplitLayout, SplitCol, View, Panel, PanelHeader, Group, CellButton } from '@vkontakte/vkui'
import { MyCalendar } from '../MyCalendar/MyCalendar'

export const MyButton = () => {
  const [popout, setPopout] = React.useState(null)

  const onClick = () => setPopout(<MyCalendar onClose={() => setPopout(null)} />)

  return (
    <SplitLayout popout={popout}>
      <SplitCol>
        <View activePanel="popout">
          <Panel id="popout">
            <PanelHeader>ModalDismissButton</PanelHeader>
            <Group>
              <CellButton onClick={onClick}>Открыть модальное окно</CellButton>
            </Group>
          </Panel>
        </View>
      </SplitCol>
    </SplitLayout>
  )
}

//const CustomPopout = ({ onClose }) => {
//   const { sizeX } = useAdaptivityConditionalRender()
//   return (
//     <PopoutWrapper onClick={onClose}>
//       <div
//         style={{
//           backgroundColor: 'var(--vkui--color_background_content)',
//           borderRadius: 8,
//           position: 'relative',
//           padding: '12px',
//         }}>
//         <h4>Кастомное модальное окно</h4>

//         {sizeX.regular && (
//           <ModalDismissButton className={sizeX.regular.className} onClick={onClose} />
//         )}
//       </div>
//     </PopoutWrapper>
//   )
// }
