import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  NativeBaseProvider,
  Avatar,
  Button,
  Icon,
  Input,
  Text,
  Link,
  Box,
  Heading,
  FormControl,
  Center,
  VStack,
  HStack,
} from "native-base";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type FormData = {
  email: string;
  password: string;
};

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
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data.email, data.password);
    fetch("https://mywebsite.com/endpoint/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    reset();
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
            <FormControl isRequired isInvalid={"email" in errors}>
              <FormControl.Label>Email ID</FormControl.Label>
              <Controller
                control={control}
                render={({ field }) => (
                  <Input
                    id="email"
                    onBlur={field.onBlur}
                    onChangeText={(val) => field.onChange(val)}
                    value={field.value}
                  />
                )}
                name="email"
                rules={{
                  required: "Field is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid Email Address",
                  },
                }}
                defaultValue=""
              />
              <FormControl.ErrorMessage>
                {errors.email?.message}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={"password" in errors}>
              <FormControl.Label>Password</FormControl.Label>
              <Controller
                control={control}
                render={({ field }) => (
                  <Input
                    id="password"
                    onBlur={field.onBlur}
                    onChangeText={(val) => field.onChange(val)}
                    value={field.value}
                    type="password"
                  />
                )}
                name="password"
                rules={{
                  required: "Field is required",
                  minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters",
                  },
                }}
                defaultValue=""
              />
              <FormControl.ErrorMessage>
                {errors.password?.message}
              </FormControl.ErrorMessage>
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
            <Button
              mt="2"
              colorScheme="indigo"
              onPress={handleSubmit(onSubmit)}
            >
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
