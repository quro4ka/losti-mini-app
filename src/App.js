import React, {useState, useEffect} from 'react';
import bridge from '@vkontakte/vk-bridge';
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
    Counter, PanelHeaderBack, Placeholder, Badge
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import {
    Icon16Education,
    Icon28ClipOutline, Icon28EducationOutline,
    Icon28MessageOutline,
    Icon28NewsfeedOutline,
    Icon28ServicesOutline,
    Icon28UserCircleOutline, Icon56NewsfeedOutline
} from "@vkontakte/icons";
import Navigation from "./panels/Navigation";

const App = () => {

    const platform = usePlatform();
    const {viewWidth} = useAdaptivityConditionalRender();
    const [activeStory, setActiveStory] = React.useState('main');
    const onStoryChange = (e) => setActiveStory(e.currentTarget.dataset.story);
    const isVKCOM = platform !== Platform.VKCOM;




    return (
        <ConfigProvider>
            <AdaptivityProvider>
                <AppRoot>
                    <SplitLayout
                        header={!isVKCOM && <PanelHeader separator={false}/>}
                        style={{justifyContent: 'center'}}>

                        {viewWidth.tabletPlus && (
                            <Navigation
                                viewWidth={viewWidth}
                                isVKCOM={isVKCOM}
                                activeStory={activeStory}
                                onStoryChange={onStoryChange}/>
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
                                                text="Главная"
                                            >
                                                <Icon28NewsfeedOutline/>
                                            </TabbarItem>
                                            <TabbarItem
                                                onClick={onStoryChange}
                                                selected={activeStory === 'schedule'}
                                                data-story="schedule"
                                                text="Расписание"
                                            >
                                                <Icon28ServicesOutline/>
                                            </TabbarItem>
                                        </Tabbar>
                                    )
                                }
                            >
                                <View id="main" activePanel="main">
                                    <Panel id="main">
                                        <Group style={{height: '1000px'}}>
                                            {/*<Placeholder icon={<Icon56NewsfeedOutline width={56} height={56}/>}/>*/}
                                        </Group>
                                    </Panel>
                                </View>
                                <View id="schedule" activePanel="schedule">
                                    <Panel id="schedule">
                                        <Group style={{height: '1000px'}}>
                                            <Placeholder
                                                icon={<Icon28EducationOutline width={56} height={56}/>}></Placeholder>
                                        </Group>
                                    </Panel>
                                </View>
                            </Epic>
                        </SplitCol>
                    </SplitLayout>
                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    );
}

export default App;
