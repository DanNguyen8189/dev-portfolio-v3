import {
  Flex,
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useColorModeValue,
  Stack,
  useColorMode,
  IconButton,
  useMediaQuery,
  useDisclosure,
  HStack,
  Link,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileArray from "./ProfileArray";
const TbIcons = require("react-icons/tb");

export default function Nav({ color }) {
  const profile = ProfileArray();
  const navigate = useNavigate();
  const location = useLocation();
  const colors = {
  "blue": "#3182CE", 
  "cyan": "#00B5D8", 
  "gray": "#718096", 
  "green": "#38A169", 
  "orange": "#DD6B20", 
  "pink": "#D53F8C", 
  "purple": "#805AD5", 
  "red": "#E53E3E", 
  "teal": "#319795", 
  "yellow": "#D69E2E"};
  const [scroll, setScroll] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLargerThanMD] = useMediaQuery("(min-width: 48em)");
  const scrollToSection = (sectionId) => {
    if (location.pathname === "/") {
      const section = document.querySelector(`#${sectionId}`);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }

    onClose();
  };
  const scrollToHero = () => scrollToSection("hero");
  const scrollToAbout = () => scrollToSection("about");
  const scrollToExperience = () => scrollToSection("experience");
  const scrollToProjects = () => scrollToSection("projects");
  const scrollToContact = () => scrollToSection("contact");
  useEffect(() => {
    const changeScroll = () =>
      document.body.scrollTop > 80 || document.documentElement.scrollTop > 80
        ? setScroll(true)
        : setScroll(false);

    window.addEventListener("scroll", changeScroll);

    return () => window.removeEventListener("scroll", changeScroll);
  }, []);

  const TbLetterComponents = [];

  for (let i = 0; i < profile.logo.length; i++) {
    const letter = profile.logo[i];
    const component = TbIcons[`TbLetter${letter}`];
    TbLetterComponents.push(component);
  }

  return (
    <>
      <Flex
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        h={16}
        boxShadow={scroll ? "base" : "none"}
        zIndex="sticky"
        position="fixed"
        as="header"
        alignItems={"center"}
        justifyContent={"space-between"}
        w="100%"
      >
        <Link onClick={scrollToHero}>
          <HStack>
            {TbLetterComponents.map((Component, index) => (
              <Component key={index} color={colors[color]} />
            ))}
          </HStack>
        </Link>

        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
            {isLargerThanMD ? (
              <>
                <Button variant="ghost" onClick={scrollToAbout}>
                  About
                </Button>
                <Button variant="ghost" onClick={scrollToExperience}>
                  Experience
                </Button>
                <Button variant="ghost" onClick={scrollToProjects}>
                  Projects
                </Button>
                <Button variant="ghost" onClick={scrollToContact}>
                  Contact
                </Button>
              </>
            ) : (
              <></>
            )}
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>

            {isLargerThanMD ? (
              <></>
            ) : (
              <>
                <Button
                  as={IconButton}
                  icon={<HamburgerIcon />}
                  onClick={onOpen}
                ></Button>
                <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerBody>
                      <Button variant="ghost" onClick={scrollToAbout}>
                        About
                      </Button>
                      <Button variant="ghost" onClick={scrollToExperience}>
                        Experience
                      </Button>
                      <Button variant="ghost" onClick={scrollToProjects}>
                        Projects
                      </Button>
                      <Button variant="ghost" onClick={scrollToContact}>
                        Contact
                      </Button>
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
              </>
            )}
          </Stack>
        </Flex>
      </Flex>
    </>
  );
}
