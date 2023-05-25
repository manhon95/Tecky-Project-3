import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  NativeBaseProvider,
  Button,
  Input,
  Text,
  Link,
  Box,
  Heading,
  FormControl,
  Center,
  VStack,
  KeyboardAvoidingView,
  View,
} from "native-base";
import BackendAPI from "../../constants/BackendAPI";
import { useAuth } from "../../context/auth";
import { Platform } from "react-native";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp() {
  const authContext = useAuth();
  if (!authContext) {
    throw new Error("authContext not found");
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const res = await fetch(BackendAPI.signUp, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result.access_token && result.user_id)
      authContext.signIn(`${result.access_token}`, `${result.user_id}`);
    reset();
  };

  return (
    <NativeBaseProvider>
      <KeyboardAvoidingView
        h={{
          base: "400px",
          lg: "auto",
        }}
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Center flex={1} justifyContent="flex-end" w="100%">
          <Box safeArea mt={16} p="2" w="90%" maxW="290">
            <Heading
              size="lg"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
              fontWeight="semibold"
              textAlign={"center"}
            >
              Welcome
            </Heading>
            <Heading
              mt="1"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
              fontWeight="medium"
              size="xs"
              textAlign={"center"}
            >
              Sign up to continue!
            </Heading>
            <VStack space={3} mt="5">
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
              <FormControl isRequired isInvalid={"username" in errors}>
                <FormControl.Label>Company Name</FormControl.Label>
                <Controller
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="username"
                      onBlur={field.onBlur}
                      onChangeText={(val) => field.onChange(val)}
                      value={field.value}
                    />
                  )}
                  name="username"
                  rules={{
                    required: "Field is required",
                  }}
                  defaultValue=""
                />
                <FormControl.ErrorMessage>
                  {errors.password?.message}
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
              </FormControl>
              <FormControl isRequired isInvalid={"confirmPassword" in errors}>
                <FormControl.Label>Confirm Password</FormControl.Label>
                <Controller
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="confirm-password"
                      onBlur={field.onBlur}
                      onChangeText={(val) => field.onChange(val)}
                      value={field.value}
                      type="password"
                    />
                  )}
                  name="confirmPassword"
                  rules={{
                    required: "Field is required",
                    minLength: {
                      value: 8,
                      message: "Password must have at least 8 characters",
                    },
                    validate: {
                      samePassword: (value) => {
                        if (value !== watch("password"))
                          return "Passwords must be the same";
                      },
                    },
                  }}
                  defaultValue=""
                />
                <FormControl.ErrorMessage>
                  {errors.password?.message}
                </FormControl.ErrorMessage>
              </FormControl>
              <Button
                mt="2"
                colorScheme="indigo"
                onPress={handleSubmit(onSubmit)}
              >
                Sign up
              </Button>
            </VStack>
          </Box>
          <View style={{ flex: 1 }} />
        </Center>
      </KeyboardAvoidingView>
    </NativeBaseProvider>
  );
}
