import { Image, Text, View } from "react-native";
import { images } from "../constants";


const EmptyState = ( { title, subittle }) => {
    return (
        <View className="justify-center items-center ">
            <Image
                className="w-[270px] h-[215px]"
                source={images.empty}
            />
            <Text className="font-pmedium text-sm text-gray-50">
                {title}
            </Text>
            <Text className="text-xl text-center text-gray-50">
                {subittle}
            </Text>
        </View>
    )
};

export default EmptyState;