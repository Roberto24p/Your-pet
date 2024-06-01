import React  from 'react'
import { FlatList, RefreshControl, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../../components/EmptyState'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'

const Home = () => {
    console.log('ESTOY EN EL HOME')
    const redirectToCreate = () => {
        router.replace('/create')
    }
    return (
        <SafeAreaView className="bg-primary">
            <FlatList
                refreshControl={
                    <RefreshControl
                        onRefresh={() => console.log('refreshing')}
                    />
                }
                className="mb-10"
                data={[ ]}
                keyExtractor={ (item) => item.id }
                renderItem={( { item } ) => (
                    <Text className="p-1">{item.id}</Text>
                )}
                ListHeaderComponent={ () => (
                    <View className="mt-10 px-3 space-y-6">
                        <View className="justify-between items-start flex-row">
                            <View>
                                <Text className="font-pmedium text-sm text-gray-700">
                                    Bienvenido de vuelta
                                </Text>
                                <Text className="text-2xl font-psemibold text-white">
                                roberto24r!
                                </Text>
                            </View>
                        </View>
                    </View>
                )}
                ListEmptyComponent={ () => (
                    <View >
                        <EmptyState
                            title="No has agregado a tus mascotas"
                            subtitle="Agrega a tus mascotas" 
                        />
                        <CustomButton
                            handlePress={redirectToCreate}
                            containerStyles="w-80 mx-auto"
                            title="Registra tu primera mascota"
                        ></CustomButton>
                    </View>
                )}
            />
            <View className="bg-primary mt-8 h-2/6  justify-start p-10">
                <Text className="font-psemibold text-3xl text-center text-white">
                    ¿Sabias qué?
                </Text>
                <Text className="text-white text-sm text-center">
                El 62 % de los australianos tienen mascota. Australia es un país en el que las mascotas son muy comunes. De hecho, un gran porcentaje de la población tiene mascota.
                </Text>
            </View>    
        </SafeAreaView>
    )
}
export default Home;
