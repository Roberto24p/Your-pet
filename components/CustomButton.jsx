import React  from 'react'
import { TouchableOpacity, Text } from 'react-native';
const CustomButton = ( { title, containerStyles, handlePress, textStyles, isLoading }) => {
    return (
        <TouchableOpacity
         activeOpacity={0.9}
         onPress={handlePress}
         className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center 
         ${containerStyles} 
         ${isLoading ? 'opacity-50': ''}`}
         disabled={isLoading}>
            <Text className={`text-primary 
            font-psemibold text-lg ${textStyles}`}>
                    { title }
            </Text>
        </TouchableOpacity>
    )
}
export default CustomButton;
