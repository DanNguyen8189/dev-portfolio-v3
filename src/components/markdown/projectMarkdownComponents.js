// Renders general UI for markdown data

import { Children, isValidElement } from "react";
import {
  Box,
  Button,
  Heading,
  Image,
  Link,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { toEmbedUrl } from "../../utils/mediaLinks";

const EmbeddedVideo = ({ href, text }) => (
  <Box my={4}>
    <Box
      as="iframe"
      src={toEmbedUrl(href)}
      title={text}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      borderRadius="md"
      width="100%"
      height="320px"
    />
    <Link href={href} isExternal color="brand.400">
      {text}
    </Link>
  </Box>
);

export const createProjectMarkdownComponents = () => ({
  h1: ({ children }) => (
    <Heading as="h1" size="xl" py={2}>
      {children}
    </Heading>
  ),
  h2: ({ children }) => (
    <Heading as="h2" size="lg" mt={8} mb={4}>
      {children}
    </Heading>
  ),
  h3: ({ children }) => (
    <Heading as="h3" size="md" mt={6} mb={3}>
      {children}
    </Heading>
  ),
  p: ({ children }) => {
    const hasEmbeddedVideo = Children.toArray(children).some(
      (child) => isValidElement(child) && child.type === EmbeddedVideo,
    );

    if (hasEmbeddedVideo) {
      return <Box py={2}>{children}</Box>;
    }

    return (
      <Text as="p" py={2} lineHeight="tall">
        {children}
      </Text>
    );
  },
  ul: ({ children }) => (
    <List spacing={3} pl={6} py={2}>
      {children}
    </List>
  ),
  li: ({ children }) => (
    <ListItem display="flex" alignItems="flex-start" gap={2} lineHeight="tall">
      <ListIcon as={ChevronRightIcon} boxSize={6} color="brand.500" mt={1} />
      <Box flex="1">{children}</Box>
    </ListItem>
  ),
  img: ({ src, alt }) => (
    <Image src={src} alt={alt} borderRadius="lg" my={4} w="100%" />
  ),
  a: ({ href, children }) => {
    const embedUrl = toEmbedUrl(href || "");
    const isYouTubeEmbed = embedUrl !== (href || "");

    if (isYouTubeEmbed) {
      const text = Array.isArray(children)
        ? children.filter((child) => typeof child === "string").join("").trim() || "Watch video"
        : typeof children === "string"
        ? children
        : "Watch video";

      return <EmbeddedVideo href={href} text={text} />;
    }

    const buttonText = Array.isArray(children)
      ? children.filter((child) => typeof child === "string").join("").trim() || "Open link"
      : typeof children === "string"
      ? children
      : "Open link";

    return (
      <Button
        as="a"
        href={href}
        isExternal
        target="_blank"
        rel="noreferrer noopener"
        color="brand.400"
        variant="outline"
        size="sm"
      >
        {buttonText}
      </Button>
    );
  },
});
