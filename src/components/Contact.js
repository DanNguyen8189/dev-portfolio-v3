import {
  Divider,
  Stack,
  Text,
  Container,
  Box,
  HStack,
  Heading,
  Center,
  //Button,
} from "@chakra-ui/react";
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram } from "react-icons/fa";
import ProfileArray from "./ProfileArray";

export default function Contact() {
  const profile = ProfileArray();
  return (
    <>
      <Container maxW={"3xl"} id="contact">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 20, md: 36 }}
        >
          <Stack align="center" direction="row" p={4}>
            <HStack mx={4}>
              <Text color="brand.400" fontWeight={800}>
                o
              </Text>
              <Text fontWeight={800}>Contact</Text>
            </HStack>
            <Divider orientation="horizontal" />
          </Stack>
          <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
            <Heading fontSize={"3xl"}>Let's stay in touch!</Heading>
            {/* <Text color={"gray.600"} fontSize={"xl"} px={4}>
              {profile.contact}
            </Text> */}
            <Text color="brand.500" fontWeight={600} fontSize={"lg"} px={4}>
              {profile.email}
            </Text>
            <Center>
              <HStack pt={4} spacing={3} flexWrap="wrap" justify="center">
                <a href={profile.linkedin} target="_blank" rel="noreferrer noopener" 
                aria-label="LinkedIn"> <FaLinkedin size={28} /> </a>
                <a href={profile.github} target="_blank" rel="noreferrer noopener" 
                aria-label="Github"> <FaGithub size={28} /> </a>
                <a href={profile.instagram} target="_blank" rel="noreferrer noopener" 
                aria-label="Instagram"> <FaInstagram size={28} /> </a>
                <a href={profile.email} target="_blank" rel="noreferrer noopener" 
                aria-label="Email"> <FaEnvelope size={28} /> </a>
                {/* <Button
                  as="a"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  leftIcon={<FaLinkedin />}
                  colorScheme={color}
                  variant="outline"
                >
                  LinkedIn
                </Button>
                <Button
                  as="a"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  leftIcon={<FaGithub />}
                  colorScheme={color}
                  variant="outline"
                >
                  GitHub
                </Button>
                <Button
                  as="a"
                  href={`mailto:${profile.email}`}
                  leftIcon={<FaEnvelope />}
                  colorScheme={color}
                  variant="outline"
                >
                  Email
                </Button>
                <Button
                  as="a"
                  href={profile.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  leftIcon={<FaInstagram />}
                  colorScheme={color}
                  variant="solid"
                >
                  Instagram
                </Button> */}
              </HStack>
            </Center>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

