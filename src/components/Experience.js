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
      <Container id="experience">
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
              <Text fontFamily="heading" fontSize="sectionHeading" fontWeight={800}>Experience</Text>
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
          <Box position="relative" px={4} py={4}>
            {/** center line*/}
            <Box
              position="absolute"
              left="50%"
              top={0}
              bottom={0}
              width="7px"
              bg="brand.800"
              borderRadius="full"
              transform="translateX(-50%)"
              display={{ base: "none", md: "block" }}
            />
            <Stack spacing={12}>
              {experience
                .filter((exp) => {
                  if (selected === "All") return true;
                  const normalizedSelected = selected.trim().toLowerCase();
                  const normalizedTags = (exp.tags || "")
                    .split(",")
                    .map((tag) => tag.trim().toLowerCase());
                  return normalizedTags.includes(normalizedSelected);
                })
                .map((exp, index) => {
                  const isLeft = index % 2 === 0;

                  return (
                    
                    <Flex
                      key={`${exp.company}-${exp.position}-${exp.duration}`}
                      /** alternate between left and right positioning for each card */
                      justify={{ base: "flex-start", md: isLeft ? "flex-start" : "flex-end" }}
                      position="relative"
                    >
                      {/** dots */}
                      {/* <Box
                        position="absolute"
                        left="50%"
                        top="50%"
                        width="14px"
                        height="14px"
                        borderRadius="full"
                        bg="brand.400"
                        borderWidth="3px"
                        borderColor="white"
                        transform="translate(-50%, -50%)"
                        display={{ base: "none", md: "block" }}
                        zIndex={1}
                      /> */}
                      <Card
                        size="sm"
                        color="inherit"
                        px={{ base: 4, md: 6 }}
                        py={{ base: 3, md: 4 }}
                        gap={4}
                        w={{ base: "100%", md: "70%" }}
                        mr={{ base: 0, md: isLeft ? 8 : 0 }}
                        ml={{ base: 0, md: isLeft ? 0 : 8 }}
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
                              {exp.listItems.map((item, itemIndex) => (
                                <ListItem key={itemIndex}>
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
                    </Flex>
                  );
                })}
            </Stack>
          </Box>
        </Stack>
      </Container>
    </>
  );
}
