import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dimensions,
  ListRenderItemInfo,
  TouchableOpacity,
  View,
} from "react-native";
import {
  NativeBaseProvider,
  Box,
  Text,
  Pressable,
  Heading,
  IconButton,
  Icon,
  HStack,
  Avatar,
  VStack,
  Spacer,
  Center,
  ScrollView,
  Modal,
  FormControl,
  Input,
  Button,
  TextArea,
  Divider,
} from "native-base";
import { RowMap, SwipeListView } from "react-native-swipe-list-view";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { useAuth } from "../../context/auth";
import { callAPI } from "../../api/api";

type UserQuestion = {
  id: string;
  question: { question: string };
  answer: string;
};

type ModalState = {
  show: boolean;
  item?: UserQuestion;
};

export default function QuestionsSetup() {
  const [data, setData] = useState<UserQuestion[]>([]);
  const [modal, setModal] = useState<ModalState>({ show: false });
  const authContext = useAuth();
  useEffect(() => {
    if (authContext && authContext.user) {
      loadUserQuestion(authContext.user.id, setData);
    }
  }, [authContext]);
  return (
    <NativeBaseProvider>
      <Center w="100%" flex={1} justifyContent={"start"}>
        <Box
          _dark={{
            bg: "coolGray.800",
          }}
          _light={{
            bg: "white",
          }}
          flex="1"
          safeAreaTop
          minW="400px"
          w="100%"
        >
          <Basic data={data} setData={setData} setModal={setModal} />
        </Box>
        <Modal
          isOpen={modal.show}
          onClose={() => setModal({ ...modal, show: false })}
        >
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Modify Question</Modal.Header>
            <Modal.Body>
              <FormControl>
                <FormControl.Label>Question</FormControl.Label>
                <TextArea
                  value={modal.item?.question.question}
                  autoCompleteType={true}
                />
              </FormControl>
              <FormControl mt="3">
                <FormControl.Label>Answer</FormControl.Label>
                <TextArea value={modal.item?.answer} autoCompleteType={true} />
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    () => setModal({ ...modal, show: false });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onPress={() => {
                    () => setModal({ ...modal, show: false });
                  }}
                >
                  Save
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    </NativeBaseProvider>
  );
}

async function saveUserQuestion(
  userQuestionId: string,
  setModal: Dispatch<SetStateAction<ModalState>>
): Promise<void> {
  const result: UserQuestion[] = await callAPI({
    method: "PATCH",
    pathname: `/users-questions?user-id=${userQuestionId}`,
  });
}

async function loadUserQuestion(
  userId: string,
  setData: Dispatch<SetStateAction<UserQuestion[]>>
): Promise<void> {
  const result: UserQuestion[] = await callAPI({
    method: "GET",
    pathname: `/users-questions?user-id=${userId}`,
  });
  setData(result);
}

function Basic(props: {
  data: UserQuestion[];
  setData: Dispatch<SetStateAction<UserQuestion[]>>;
  setModal: Dispatch<SetStateAction<ModalState>>;
}) {
  const closeRow = (rowMap: RowMap<UserQuestion>, rowKey: string) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap: RowMap<UserQuestion>, rowKey: string) => {
    console.log("Delete this row", rowKey);
    closeRow(rowMap, rowKey);
    props.setData(props.data.filter((item) => item.id !== rowKey));
  };

  const onRowDidOpen = (rowKey: string) => {
    console.log("This row opened", rowKey);
  };

  const renderItem = (data: ListRenderItemInfo<UserQuestion>) => (
    <Box>
      <Pressable
        onPress={() => props.setModal({ show: true, item: data.item })}
        _dark={{
          bg: "coolGray.800",
        }}
        _light={{
          bg: "white",
        }}
      >
        <Box pl="6" pr="5" py="2">
          <HStack alignItems="center" space={3}>
            <VStack>
              <Text
                color="coolGray.800"
                _dark={{
                  color: "warmGray.50",
                }}
                bold
              >
                {data.item.question.question}
              </Text>
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                {data.item.answer}
              </Text>
            </VStack>
            <Spacer />
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );

  const renderHiddenItem = (
    data: ListRenderItemInfo<UserQuestion>,
    rowMap: RowMap<UserQuestion>
  ) => (
    <HStack flex="1" pl="2">
      <Pressable
        w="70"
        ml="auto"
        bg="red.500"
        justifyContent="center"
        onPress={() => deleteRow(rowMap, data.item.id)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" />
          <Text color="white" fontSize="xs" fontWeight="medium">
            Delete
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );

  return (
    <Box bg="white" safeArea flex="1">
      <SwipeListView
        data={props.data}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        disableRightSwipe={true}
        rightOpenValue={-130}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
      />
    </Box>
  );
}
