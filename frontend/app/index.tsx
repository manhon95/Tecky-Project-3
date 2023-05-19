import * as React from "react";
import {
  NativeBaseProvider,
  Avatar,
  Button,
  Icon,
  Input,
  Container,
  Text,
  Link,
  Box,
  Heading,
  Checkbox,
  FormControl,
  Center,
  VStack,
  HStack,
} from "native-base";
import FontAwesome from "@expo/vector-icons/FontAwesome";

function Copyright(props: any) {
  return (
    <Text alignItems="center" mt={8} mb={4}>
      {"Copyright © "}
      <Link color="inherit" href="https://nativebase.io">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Text>
  );
}

export default function SignIn() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <NativeBaseProvider>
      <Center>
        <Box
          w="90%"
          maxW="290"
          mt={8}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Avatar>
            <Icon
              textAlign="center"
              as={<FontAwesome name="lock" />}
              size={5}
            />
          </Avatar>
          <Heading size="md">Sign in</Heading>
          <VStack space={3} mt="5" w="100%">
            <FormControl>
              <FormControl.Label>Email ID</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input type="password" />
              <Link
                _text={{
                  fontSize: "xs",
                  fontWeight: "500",
                  color: "indigo.500",
                }}
                alignSelf="flex-end"
                mt="1"
              >
                Forget Password?
              </Link>
            </FormControl>
            <Button mt="2" colorScheme="indigo">
              Sign in
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                I'm a new user.{" "}
              </Text>
              <Link
                _text={{
                  color: "indigo.500",
                  fontWeight: "medium",
                  fontSize: "sm",
                }}
                href="#"
              >
                Sign Up
              </Link>
            </HStack>
          </VStack>
        </Box>
        <Copyright />
      </Center>
    </NativeBaseProvider>
  );
}
