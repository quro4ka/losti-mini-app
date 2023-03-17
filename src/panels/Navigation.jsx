import React from 'react';
import {
    Cell,
    Group,
    Panel,
    PanelHeader,
    Platform,
    SplitCol,
    useAdaptivityConditionalRender,
    usePlatform
} from "@vkontakte/vkui";
import {Icon28EducationOutline, Icon28NewsfeedOutline} from "@vkontakte/icons";

const Navigation = ({viewWidth,isVKCOM,activeStory,onStoryChange}) => {


    return (
        <SplitCol className={viewWidth.tabletPlus.className} fixed width={280} maxWidth={280}>
            <Panel>
                {!isVKCOM && <PanelHeader/>}
                <Group>
                    <Cell
                        disabled={activeStory === 'main'}
                        style={
                            activeStory === 'main'
                                ? {
                                    backgroundColor: 'var(--vkui--color_background_secondary)',
                                    borderRadius: 8,
                                }
                                : {}
                        }
                        data-story="main"
                        onClick={onStoryChange}
                        before={<Icon28NewsfeedOutline/>}
                    >
                        Главная
                    </Cell>
                    <Cell
                        disabled={activeStory === 'schedule'}
                        style={
                            activeStory === 'schedule'
                                ? {
                                    backgroundColor: 'var(--vkui--color_background_secondary)',
                                    borderRadius: 8,
                                }
                                : {}
                        }
                        data-story="schedule"
                        onClick={onStoryChange}
                        before={<Icon28EducationOutline/>}
                    >
                        Расписание
                    </Cell>

                </Group>
            </Panel>
        </SplitCol>



    );
};

export default Navigation;