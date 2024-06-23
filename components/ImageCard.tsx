import { View, Text, Image, TouchableOpacity } from 'react-native';
import { icons } from '../constants';
import { router } from 'expo-router'

import React from 'react';
interface props {
    urlImage?         : string;
    id?               : number;
    title?            : string;
    description?      : string;
    customClassImage? : string;
    showFavorite?     : boolean;
    heartFilled?      : boolean;
    handleHeartPress? : () => void;
    handleItemPress?  : () => void;
}
const ImageCard = ( { urlImage, title, id, description, customClassImage, showFavorite = false, handleHeartPress, heartFilled = false, handleItemPress } : props) => {
    let customClass = '';
    if( !showFavorite ) {
        customClass = 'justify-center text-center'
    }

    const handlePress = () => {
        if( id ) router.push(`/(detail)/${id}`);
    }

    return (
        <View className=' mt-1 bg-black-100 p-4 rounded-[15px]'>
            <TouchableOpacity  activeOpacity={0.5} onPress={handlePress}>
                <Image
                    source={{uri: urlImage}}
                    className={`h-[215px] w-52  rounded-[15px]  overflow-hidden shadow-lg shadow-black/40 ${customClassImage}`}
                />
            </TouchableOpacity>
            <View className={`d-flex flex-row justify-between items-center ${customClass}`}>
                <View>
                    <Text className='text-gray-100 text-4xl mt-2'>{title}</Text>
                    <Text className='text-gray-100  mt-1'>{description}</Text>
                </View>
                <View >
                { showFavorite && 
                <TouchableOpacity 
                    activeOpacity={0.2}
                    onPress={handleHeartPress}
                    >
                    <Image    source={ heartFilled ? icons.heartFilled : icons.heart}/>
                </TouchableOpacity> }
               
                </View>
            </View>
        </View>
    )
}

export default ImageCard;