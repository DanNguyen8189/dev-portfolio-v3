import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {
  Badge,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import ProjectsArray from "./ProjectsArray";

const toEmbedUrl = (href) => {
  const youtubeWatchMatch = href.match(/https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/i);
  const youtuBeMatch = href.match(/https?:\/\/(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/i);

  if (youtubeWatchMatch) {
    return `https://www.youtube.com/embed/${youtubeWatchMatch[1]}`;
  }

  if (youtuBeMatch) {
    return `https://www.youtube.com/embed/${youtuBeMatch[1]}`;
  }

  return href;
};

const parseProjectMarkdown = (mdContent) => {
  const videos = [];
  const markdownLines = [];
  const lines = mdContent.replace(/<!--[\s\S]*?-->/g, "").split("\n");

  for (const line of lines) {
    const trimmedLine = line.trim();
    const videoMatch = trimmedLine.match(/^Video:? \[([^\]]+)\]\(([^)]+)\)$/i);

    if (videoMatch) {
      videos.push({
        text: videoMatch[1].trim(),
        href: videoMatch[2].trim(),
        embedUrl: toEmbedUrl(videoMatch[2].trim()),
      });
      continue;
    }

    markdownLines.push(line);
  }

  return {
    markdown: markdownLines.join("\n").trim(),
    videos,
  };
};

export default function ProjectDetailPage() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const projects = ProjectsArray();
  const project = projects.find((item) => item.slug === slug);
  const [detail, setDetail] = useState({ markdown: "", videos: [] });
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    if (!slug) {
      return;
    }

    fetch(`/content/projects/${slug}.md`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch project details");
        }

        return response.text();
      })
      .then((mdContent) => {
        setDetail(parseProjectMarkdown(mdContent));
        setLoadError("");
      })
      .catch(() => {
        setLoadError("Project details are not available yet.");
      });
  }, [slug]);

  const markdownComponents = {
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
    p: ({ children }) => (
      <Text as="p" py={2} lineHeight="tall">
        {children}
      </Text>
    ),
    ul: ({ children }) => (
      <Stack as="ul" spacing={3} pl={6} py={2}>
        {children}
      </Stack>
    ),
    li: ({ children }) => (
      <Box as="li" listStyleType="disc">
        <Text as="span">{children}</Text>
      </Box>
    ),
    img: ({ src, alt }) => (
      <Image src={src} alt={alt} borderRadius="lg" my={4} w="100%" />
    ),
    a: ({ href, children }) => (
      <Link href={href} isExternal color="brand.400">
        {children}
      </Link>
    ),
  };

  if (!project && projects.length === 0) {
    return (
      <Container maxW="3xl" pt={24} pb={16}>
        <Text>Loading project details...</Text>
      </Container>
    );
  }

  return (
    <Container maxW="3xl" pt={24} pb={16}>
      <Stack spacing={8}>
        <Button
          alignSelf="flex-start"
          //variant="ghost"
          //colorScheme="brand"
          color="brand.400"
          onClick={() => navigate("/", { state: { scrollTo: "projects" } })}
        >
          Back to Projects
        </Button>

        {!project ? (
          <Stack spacing={4}>
            <Heading size="xl">Project not found</Heading>
            <Text>
              This project does not exist yet in the markdown summary list.
            </Text>
          </Stack>
        ) : (
          <>
            <Stack spacing={4}>
              <Heading size="2xl">{project.name}</Heading>
              <Text fontSize="lg" color="gray.500">
                {project.description}
              </Text>
              <HStack flexWrap="wrap" spacing={2}>
                {project.badges.map((badge) => (
                  <Badge key={badge.text} colorScheme={badge.colorScheme}>
                    {badge.text}
                  </Badge>
                ))}
              </HStack>
            </Stack>

            {project.image ? (
              <Image
                src={project.image}
                alt={project.name}
                borderRadius="xl"
                shadow="lg"
              />
            ) : null}

            {project.video ? (
              <Box>
                <Box
                  as="iframe"
                  src={project.video.embedUrl}
                  title={project.video.text}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  borderRadius="md"
                  width="100%"
                  height="320px"
                />
              </Box>
            ) : null}

            {detail.videos.map((video) => (
              <Box key={video.href}>
                <Box
                  as="iframe"
                  src={video.embedUrl}
                  title={video.text}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  borderRadius="md"
                  width="100%"
                  height="320px"
                />
                <Link href={video.href} isExternal color="brand.400">
                  {video.text}
                </Link>
              </Box>
            ))}

            {loadError ? (
              <Text color="gray.500">{loadError}</Text>
            ) : (
              <Box className="project-detail-markdown">
                <ReactMarkdown components={markdownComponents}>
                  {detail.markdown}
                </ReactMarkdown>
              </Box>
            )}

            {/* <Stack spacing={3}>
              <Heading size="md">Links</Heading>
              <HStack flexWrap="wrap" spacing={3}>
                {project.buttons.map((button) => (
                  button.href.startsWith("/") ? (
                    <Button key={button.text} color={`${color}.400`} onClick={() => navigate(button.href)}>
                      {button.text}
                    </Button>
                  ) : (
                    <Button key={button.text} as="a" href={button.href} color={`${color}.400`}>
                      {button.text}
                    </Button>
                  )
                ))}
              </HStack>
            </Stack> */}
          </>
        )}
      </Stack>
    </Container>
  );
}