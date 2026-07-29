import {
  Divider,
  Stack,
  Text,
  Container,
  Box,
  HStack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Badge,
  Image,
  List,
  ListItem,
  ListIcon,
  Button,
  ButtonGroup,
  Center,
  Heading
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useState } from "react";
import ExperienceArray from "./ExperienceArray";
import TagsArray from "./TagsArray";

export default function Experience() {
  const experience = ExperienceArray();
  const options = TagsArray("ExperienceTags");
  const [selected, setSelected] = useState("All");

  const handleSelected = (value) => {
    setSelected(value);
  };

  return (
    <>
      <Container maxW={"3xl"} id="experience">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          pb={{ base: 20, md: 36 }}
        >
          <Stack align="center" direction="row" px={4}>
            <HStack mx={4}>
              <Text color="brand.400" fontWeight={800}>
                o
              </Text>
              <Text fontFamily="headingCustom" fontSize="sectionHeading" fontWeight={800}>Experience</Text>
            </HStack>
            <Divider orientation="horizontal" />
          </Stack>
          <Center px={4} w="100%">
            <Box maxW="100%" overflowX="auto" px={1}> 
              <ButtonGroup variant="outline" flexWrap="nowrap" minW="max-content" whiteSpace="nowrap">
                <Button
                  //colorScheme={selected === "All" ? "brand" : "gray"}
                  variant="filter"
                  isActive={selected === "All"}
                  onClick={() => handleSelected("All")}
                >
                  All
                </Button>
                {options.map((option) => (
                  <Button
                    key={option.value}
                    //colorScheme={selected === option.value ? "brand" : "gray"}
                    variant="filter"
                    isActive={selected === option.value}
                    onClick={() => handleSelected(option.value)}
                  >
                    {option.value}
                  </Button>
                ))}
              </ButtonGroup>
            </Box>
          </Center>
          <Stack px={4} spacing={4}>
            {experience
              .filter((exp) => {
                if (selected === "All") return true;
                const normalizedSelected = selected.trim().toLowerCase();
                const normalizedTags = (exp.tags || "")
                  .split(",")
                  .map((tag) => tag.trim().toLowerCase());
                return normalizedTags.includes(normalizedSelected);
              })
              .map((exp) => (
                  <Card
                    key={`${exp.company}-${exp.position}-${exp.duration}`}
                    size="sm"
                    color="inherit"
                    px={{ base: 4, md: 6 }}
                    py={{ base: 3, md: 4 }}
                    gap={4} // space between card sections
                  >
                    <CardHeader>
                      <Flex justifyContent="space-between">
                        <HStack>
                          <Image src={exp.image} h={50} />
                          <Box px={2} align="left">
                            {/* <Text size="md" fontWeight={700}>{exp.company}</Text> */}
                            <Heading size="md">{exp.company}</Heading>
                            <Text>{exp.position}</Text>
                          </Box>
                        </HStack>
                        <Text px={2} fontWeight={300}>
                          {exp.duration}
                        </Text>
                      </Flex>
                    </CardHeader>
                    <CardBody px={{ base: 4, md: 6 }} py={{ base: 3, md: 4 }}>
                      <Flex>
                        <List align="left" spacing={3}>
                          {exp.listItems.map((item, index) => (
                            <ListItem key={index}>
                              <ListIcon
                                boxSize={6}
                                as={ChevronRightIcon}
                                color="brand.500"
                              />
                              {item}
                            </ListItem>
                          ))}
                        </List>
                      </Flex>
                    </CardBody>
                    <CardFooter>
                      {/* <HStack py={2}>
                        {exp.buttons.map((button) => (
                          button.href.startsWith("/") ? (
                            <Button
                              key={button.text}
                              //as={RouterLink}
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
                      </HStack> */}
                      <HStack spacing={2} flexWrap="wrap" justify="flex-end" w="100%">
                        {exp.badges.map((badge) => (
                          <Badge
                            key={badge.name}
                            colorScheme={badge.colorScheme}
                          >
                            {badge.name}
                          </Badge>
                        ))}
                      </HStack>
                    </CardFooter>
                  </Card>
              ))}
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
