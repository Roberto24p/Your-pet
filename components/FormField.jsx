import React, { useState }  from 'react'
import { Text, View, TextInput, TouchableOpacity, Image  } from 'react-native'

import { icons, images } from '../constants';

const FormField = ( {title, value, placeHolder, handleChangeText, otherStyles, ...props}) => {
    const [ showPassword, setShowPassword ] = useState(false); 
    const isPassword = (  ) => title === 'Password' || title === 'Contraseña';

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-gray-100 font-pmedium">
                {title}
            </Text>
            <View className="border-2 border-black-200 rounded-2xl
                focus:border-secondary w-full h-16 px-4 bg-black-100 flex-row">
                    <TextInput
                        className="flex-1 text-white font-psemibold text-base"
                        value={ value }
                        placeholder={ placeHolder }
                        placeholderTextColor="#7b7b8b"
                        onChangeText={handleChangeText}
                        secureTextEntry = { isPassword(title) && !showPassword}
                    />
                        { isPassword (title) && (
                            <TouchableOpacity onPress={ () => setShowPassword(!showPassword)}>
                                <Image
                                    source={!showPassword ? icons.eye : icons.eyeHide } 
                                    className="w-6 -h-6" 
                                    resizeMode='contain'
                                />
                            </TouchableOpacity>
                        )

                        }
            </View>
        </View>
    )
}
export default FormField;
