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
  Stack,
  Text,
} from "@chakra-ui/react";
import useProjectsData from "../data/useProjectsData";
import { extractBadgesSection, stripMarkdownComments } from "../utils/markdownSectionData";
import { createProjectMarkdownComponents } from "./markdown/projectMarkdownComponents";

const parseProjectMarkdown = (mdContent) => {
  return stripMarkdownComments(mdContent)
    .replace(/\[(https?:\/\/[^\]\s]+)\]/g, "[$1]($1)")
    .trim();
};

const markdownComponents = createProjectMarkdownComponents();

export default function ProjectDetailPage() {
  const navigate = useNavigate();
  const { slug } = useParams(); //for back navigation
  const projects = useProjectsData();
  const project = projects.find((item) => item.slug === slug);
  const [detail, setDetail] = useState("");
  const [loadError, setLoadError] = useState("");
  const [detailBadges, setDetailBadges] = useState([]);

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
        const parsedProjectDetail = extractBadgesSection(mdContent);
        setDetail(parseProjectMarkdown(parsedProjectDetail.contentWithoutBadges));
        setDetailBadges(parsedProjectDetail.badges);
        setLoadError("");
      })
      .catch(() => {
        setDetailBadges([]);
        setLoadError("Project details are not available yet.");
      });
  }, [slug]);

  const badgesToRender = detailBadges.length > 0 ? detailBadges : project?.badges ?? [];

  if (!project && projects.length === 0) {
    return (
      <Container pt={24} pb={16}>
        <Text>Loading project details...</Text>
      </Container>
    );
  }

  return (
    <Container pt={24} pb={16}>
      <Stack spacing={10}>
        <Button
          alignSelf="flex-start"
          //variant="ghost"
          //colorScheme="brand"
          color="brand.400"
          onClick={() => {
            if (project?.slug) {
              navigate("/", { state: { scrollTo: project.slug } });
            } else if (window.history.length > 1) {
              navigate(-1);
            } else {
              navigate("/", { state: { scrollTo: "projects" } });
            }
          }}
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
            <Stack spacing={10}>
              <Heading size="2xl">{project.name}</Heading>
              <Text fontSize="lg" color="gray.500">
                {project.description}
              </Text>
              <HStack flexWrap="wrap" spacing={2}>
                {badgesToRender.map((badge, index) => (
                  <Badge key={`${badge.text}-${index}`} colorScheme={badge.colorScheme}>
                    {badge.text}
                  </Badge>
                ))}
              </HStack>
            </Stack>

            {/* {project.image ? (
              <Image
                src={project.image}
                alt={project.name}
                borderRadius="xl"
                shadow="lg"
              />
            ) : null} */}

            {/* {project.video ? (
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
            ) : null} */}

            {loadError ? (
              <Text color="gray.500">{loadError}</Text>
            ) : (
              <Box className="project-detail-markdown">
                <ReactMarkdown components={markdownComponents}>
                  {detail}
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