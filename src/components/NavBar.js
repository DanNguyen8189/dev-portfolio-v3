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

export default function Nav() {
  const profile = ProfileArray();
  const navigate = useNavigate();
  const location = useLocation();
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
        bg={useColorModeValue("rgba(247, 250, 252, 0.72)", "rgba(26, 32, 44, 0.72)")}
        sx={{
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
        }}
        px={2}
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
          <HStack color="brand.500">
            {TbLetterComponents.map((Component, index) => (
              <Component key={index} />
            ))}
          </HStack>
        </Link>

        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={2}>
            {isLargerThanMD ? (
              <>
                <Button variant="nav" onClick={scrollToAbout}>
                  About
                </Button>
                <Button variant="nav" onClick={scrollToExperience}>
                  Experience
                </Button>
                <Button variant="nav" onClick={scrollToProjects}>
                  Projects
                </Button>
                <Button variant="nav" onClick={scrollToContact}>
                  Contact
                </Button>
              </>
            ) : (
              <></>
            )}
            <Button variant="lightingMode" onClick={toggleColorMode}>
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
                  <DrawerContent bg="drawerBG">
                    <DrawerBody>
                      <Stack spacing={3} align="stretch">
                        <Button variant="nav" onClick={scrollToAbout}>
                          About
                        </Button>
                        <Button variant="nav" onClick={scrollToExperience}>
                          Experience
                        </Button>
                        <Button variant="nav" onClick={scrollToProjects}>
                          Projects
                        </Button>
                        <Button variant="nav" onClick={scrollToContact}>
                          Contact
                        </Button>
                      </Stack>
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
