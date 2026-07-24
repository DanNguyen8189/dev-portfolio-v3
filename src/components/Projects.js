import {
  Divider,
  Stack,
  Text,
  Container,
  Box,
  HStack,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Image,
  Heading,
  SimpleGrid,
  Badge,
  Link,
  Center,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import ProjectsArray from "./ProjectsArray";
import OtherProjectsArray from "./OtherProjectsArray";
import TagsArray from "./TagsArray";

const revealProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45, ease: "easeOut" },
};

export default function Projects({ color }) {
    const projects = ProjectsArray();
    const others = OtherProjectsArray();
    const options = TagsArray("ProjectsTags");
    
    const [selected, setSelected] = useState("All");

    const handleSelected = (value) => {
      setSelected(value);
    };
    
  return (
    <>
      <Container maxW={"3xl"} id="projects">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 20, md: 36 }}
        >
          <Stack align="center" direction="row" p={4}>
            <HStack mx={4}>
              <Text color={`${color}.400`} fontWeight={800}>
                03
              </Text>
              <Text fontWeight={800}>Projects</Text>
            </HStack>
            <Divider orientation="horizontal" />
          </Stack>
          <Stack px={4} spacing={4}>
            {projects.map((project) => (
              <Box as={motion.div} key={project.name} {...revealProps}>
                <Card
                  direction={{
                    base: "column",
                  }}
                  overflow="hidden"
                >
                  {project.image ? (
                    <Image objectFit="cover" src={project.image} alt={project.name} />
                  ) : null} 

                  <Stack>
                    <CardBody align="left">
                      <Heading size="md">{project.name}</Heading>

                      <Text py={2}>{project.description}</Text>

                      {project.video ? (
                        <Stack spacing={2} py={2}>
                          <Box
                            as="iframe"
                            src={project.video.embedUrl}
                            title={project.video.text}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            borderRadius="md"
                            width="100%"
                            height="220px"
                          />
                          {/* <Link href={project.video.href} isExternal color={`${color}.400`}>
                            {project.video.text}
                          </Link> */}
                        </Stack>
                      ) : null}

                      <HStack py={2}>
                        {project.buttons.map((button) => (
                          button.href.startsWith("/") ? (
                            <Button
                              key={button.text}
                              as={RouterLink}
                              to={button.href}
                              color={`${color}.400`}
                            >
                              {button.text}
                            </Button>
                          ) : (
                            <a key={button.text} href={button.href}>
                              <Button color={`${color}.400`}>
                                {button.text}
                              </Button>
                            </a>
                          )
                        ))}
                      </HStack>
                      <HStack pt={4} spacing={2}>
                        {project.badges.map((badge) => (
                          <Badge
                            key={badge.text}
                            colorScheme={badge.colorScheme}
                          >
                            {badge.text}
                          </Badge>
                        ))}
                      </HStack>
                    </CardBody>
                  </Stack>
                </Card>
              </Box>
            ))}
          </Stack>
          <Text color={"gray.600"} fontSize={"xl"} px={4}>
            Other Projects
          </Text>
          <Center px={4}>
            <ButtonGroup variant="outline">
              <Button
                colorScheme={selected === "All" ? `${color}` : "gray"}
                onClick={() => handleSelected("All")}
              >
                All
              </Button>
              {options.map((option) => (
                <Button
                  colorScheme={selected === option.value ? `${color}` : "gray"}
                  onClick={() => handleSelected(option.value)}
                >
                  {option.value}
                </Button>
              ))}
            </ButtonGroup>
          </Center>
          <SimpleGrid columns={[1, 2, 3]} px={4} spacing={4}>
            {others
              .filter((other) => {
                if (selected === "All") {
                  return true;
                } else {
                  return other.tags.includes(selected);
                }
              })
              .map((other) => (
                <Box as={motion.div} key={other.name} {...revealProps}>
                  <Card>
                    <Stack>
                      <CardBody align="left" h={[null, "40vh"]}>
                        <Heading size="sm">{other.name}</Heading>

                        <Text fontSize="sm" py={2}>
                          {other.description}
                        </Text>

                        <HStack spacing={2}>
                          {other.buttons.map((button) => (
                            <Link
                              key={button.text}
                              href={button.href}
                              color={`${color}.400`}
                            >
                              {button.text}
                            </Link>
                          ))}
                        </HStack>
                        <HStack flexWrap="wrap" pt={4} spacing={2}>
                          {other.badges.map((badge) => (
                            <Badge
                              my={2}
                              key={badge.text}
                              colorScheme={badge.colorScheme}
                            >
                              {badge.text}
                            </Badge>
                          ))}
                        </HStack>
                      </CardBody>
                    </Stack>
                  </Card>
                </Box>
              ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </>
  );
}