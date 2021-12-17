import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Box, Heading, VStack, FormControl, Input,Checkbox,Icon, IconButton, Link, Button, HStack, Center, NativeBaseProvider, SectionList } from 'native-base'
import { Feather, Entypo } from "@expo/vector-icons"
const IntermediatePhase = () => {
    const instState = [
        {
          title: "Grade R",
          isCompleted: true,
        },
        {
          title: "Grade 1",
          isCompleted: false,
        },
        {
          title: "Grade 2",
          isCompleted: false,
        },
        {
          title: "Grade 3",
          isCompleted: false,
        },
      ]
      const [list, setList] = React.useState(instState)

    return (
        (
            <Box h="80%" w="90%" alignItems="flex-start">
                <Heading mb="5">Intermediate Phase</Heading>
                <VStack space={4}>
                    <HStack space={2}>
                    
                     
                    </HStack>
                    <VStack space={2}>
                        {list.map((item, itemI) => (
                            <HStack
                                w="100%"
                               
                                justifyContent="space-between"
                                alignItems="center"
                                key={item.title + itemI.toString()}
                            >
                                <Checkbox
                                    isChecked={item.isCompleted}
                                    onChange={() => handleStatusChange(itemI)}
                                    value={item.title}
                                >
                                    <Text
                                        mx="3"
                                        p="2"
                                        fontSize="sm"
                                        strikeThrough={item.isCompleted}
                                        _light={{
                                            color: item.isCompleted ? "gray.400" : "coolGray.800",
                                        }}
                                        _dark={{
                                            color: item.isCompleted ? "gray.400" : "coolGray.50",
                                        }}
                                    >
                                        {item.title}
                                    </Text>
                                </Checkbox>
                                <IconButton
                                    size="sm"
                                    colorScheme="trueGray"
                                    icon={
                                        <Icon
                                            as={Entypo}
                                            name="minus"
                                            size="xs"
                                            color="trueGray.400"
                                        />
                                    }
                                    onPress={() => handleDelete(itemI)}
                                />
                            </HStack>
                        ))}
                    </VStack>
                </VStack>
            </Box>
        )
    )
}


export default function IntermediateScreen({ route, navigation }) {
    return (
        (
            <NativeBaseProvider>
                <Center flex={1} px="3">

                    <IntermediatePhase />
                </Center>
            </NativeBaseProvider>
        )
    )
}


