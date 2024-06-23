import React, { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native'

import { icons, images } from '../constants';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const DateField = ({ title, setValue, value, placeHolder, handleChangeText, otherStyles, ...props }) => {

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    console.log(selectedDate)
    setValue(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: value,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    console.log(value)
    showMode('date');
  };


  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">
        {title}

      </Text>
      <View className="border-2 border-black-200 rounded-2xl
                focus:border-secondary w-full h-16 px-4 bg-black-100 flex-row">
        <TouchableOpacity activeOpacity={0.3} onPress={showDatepicker}>
          <Image
            source={icons.calendar}
            className={`h-5 w-5  mt-5 mr-2 overflow-hidden shadow-lg bg-slate-200 `}
          />
        </TouchableOpacity>
        <TextInput
          editable={false}
          className="flex-1 text-white font-psemibold text-base"
          value={`${value.getDate()}/${value.getMonth()}/${value.getFullYear()}`}
          placeholder={placeHolder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
        />

      </View>
    </View>
  )
}
export default DateField;
