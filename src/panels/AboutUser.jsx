import React, {useEffect, useState} from 'react';
import {Avatar, Title, Text} from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";
import s from './AboutUser.module.scss'


const style = {
    display: 'flex',

}

const AboutUser = () => {

    const [fetchingUser, setFetchingUser] = useState()

    useEffect(() => {

        const getUserInfo = async () => {

            const user = await bridge.send('VKWebAppGetUserInfo')
            setFetchingUser(user)
        }
        getUserInfo()

    }, [])


    return (
        <div className={s.about__user}>
            <Avatar size={96}/>
            <Title style={{marginBottom: 8, marginTop: 20}} level="2" weight="2">
                Ладислав Полевских
            </Title>
            <div style={style}>
                <Text
                    style={{
                        marginRight: 24,
                        color: 'var(--vkui--color_text_secondary)',
                    }}
                >
                    Ростов-на-Дону
                </Text>
                <Text
                    style={{
                        color: 'var(--vkui--color_text_secondary)',
                    }}
                >
                    15.04.2002
                </Text>
            </div>
        </div>
    );
};

export default AboutUser;