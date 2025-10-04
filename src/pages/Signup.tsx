import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
    <Container fluid w={500} className="p-10 rounded-lg">
      <Title ta="center">
        Sazim Test App
      </Title>

      <Text ta="center" mt={10} size="sm">
        Please enter details to signup.
      </Text>

      <Paper withBorder shadow="sm" p={50} mt={30} radius="md" className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4"> {/* flex-row on desktop, flex-col on mobile */}
          <TextInput
            label="First Name"
            placeholder="Your First Name"
            required
            radius="md"
          />
          <TextInput
            label="Last Name"
            placeholder="Your Last Name"
            required
            radius="md"
          />
        </div>
        <TextInput
          label="Email"
          description="Enter your email"
          placeholder="Your Email"
          required
          mt="md"
          mb="md"
          radius="md"
        />
        <div className="flex flex-col sm:flex-row gap-4"> {/* flex-row on desktop, flex-col on mobile */}
          <TextInput
            label="Address"
            placeholder="Your Address"
            required
            radius="md"
          />
          <TextInput
            label="Phone"
            placeholder="Your Phone"
            required
            radius="md"
          />
        </div>
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          radius="md"
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Your confirm password"
          required
          mt="md"
          radius="md"
        />
        <Checkbox label="Remember me" mt="md"/>
        <Button fullWidth mt="xl" radius="md" color="black">
            Create Account
        </Button> 

        <Text mt="xl" size="sm" className="w-2xl">
          Already have an account? <Link to="/login"><Anchor>Login</Anchor></Link>
        </Text>
        </Paper>
      </Container>
    </div>
  );
}

export default Signup