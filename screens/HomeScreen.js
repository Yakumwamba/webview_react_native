import React from "react"
import {
    Box,
    Text,
    Heading,
    VStack,
    FormControl,
    Input,
    Link,
    Button,
    HStack,
    Center,
    NativeBaseProvider,
    SectionList,
    Menu,
    HamburgerIcon
} from "native-base"

import { useNavigation } from "@react-navigation/native"
import Pressable from "react-native/Libraries/Components/Pressable/Pressable"
import IntermediateScreen from "./IntermediateScreen"

export const Home = () => {
    const data = [
        {
            title: "Phases",
            data: ["Foundation Phase", "Intermediate Phase", "Senior Phase", "Further Education And Training"],
        },

    ]

    const navigation = useNavigation()
    return (

        <Box h="80%" w="90%" alignItems="flex-start">
            <Menu
                w="190"
                trigger={(triggerProps) => {
                    return (
                        <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                            <HamburgerIcon />
                        </Pressable>
                    )
                }}
            >
          
            </Menu>
            <SectionList
                px="6"
                py={8}
                mb="4"
                sections={data}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (

                    <Box px="4" py="4" bg="white" borderRadius="md">

                        <Pressable onPress={() => navigation.navigate("IntermediateScreen", { url: item })} >
                            <Text style={{ fontSize: 16, fontWeight: "400" }}>{item}</Text>
                        </Pressable>
                    </Box>


                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Center>
                        <Heading fontSize="xl" mt="8" pb="4">
                            {title}
                        </Heading>
                    </Center>
                )}
            />



        </Box>

    )
}

export default function HomeScreen({ route, navigation }) {
    return (
        (
            <NativeBaseProvider>
                <Center flex={1} px="3" >
                    <Home />
                </Center>
            </NativeBaseProvider>
        )
    )
}




