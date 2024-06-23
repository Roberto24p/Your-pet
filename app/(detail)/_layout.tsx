import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
const DetailLayout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen
                    name='[id]'
                    
                />
            </Stack>
            <StatusBar
                backgroundColor='#161622'
                style="light"
            />
        </>
    )
}


export default DetailLayout;