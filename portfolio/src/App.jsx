import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";
import ProjectsPage from "./ProjectsPage";
import ThemeToggle from "./ThemeToggle";
import LegalLinks from "./LegalLinks";
import useMediaQuery from "./useMediaQuery";
import landingImage from "./assets/images/landing_page_image.png";
import unifyLogo from "./assets/images/experience/unify_logo.png";
import subvisionLogo from "./assets/images/experience/subvision_logo.png";
import ficLogo from "./assets/images/experience/fic_logo.png";
import yresLogo from "./assets/images/experience/york_region_educational_services 1.png";
import instagramLogo from "./assets/images/tech_stack/instagram 1.png";
import linkedinLogo from "./assets/images/tech_stack/linkedin-original.svg";
import cLogo from "./assets/images/tech_stack/c-original.svg";
import cPlusPlusLogo from "./assets/images/tech_stack/cplusplus-original.svg";
import cssLogo from "./assets/images/tech_stack/css3-original.svg";
import dockerLogo from "./assets/images/tech_stack/docker-original.svg";
import firebaseLogo from "./assets/images/tech_stack/firebase-original.svg";
import githubLogo from "./assets/images/tech_stack/github-original.svg";
import javaLogo from "./assets/images/tech_stack/java-original.svg";
import javascriptLogo from "./assets/images/tech_stack/javascript-original.svg";
import kaggleLogo from "./assets/images/tech_stack/kaggle-original.svg";
import latexLogo from "./assets/images/tech_stack/latex-original.svg";
import linuxLogo from "./assets/images/tech_stack/linux-original.svg";
import mysqlLogo from "./assets/images/tech_stack/mysql-original.svg";
import nodeLogo from "./assets/images/tech_stack/nodejs-original.svg";
import numpyLogo from "./assets/images/tech_stack/numpy-original.svg";
import pandasLogo from "./assets/images/tech_stack/pandas-original.svg";
import postgresLogo from "./assets/images/tech_stack/postgresql-original.svg";
import awsLogo from "./assets/images/tech_stack/amazonwebservices-original-wordmark.svg";
import pythonLogo from "./assets/images/tech_stack/python-original.svg";
import reactLogo from "./assets/images/tech_stack/react-original.svg";
import slackLogo from "./assets/images/tech_stack/slack-original.svg";
import tailwindLogo from "./assets/images/tech_stack/tailwindcss-original.svg";
import vscodeLogo from "./assets/images/tech_stack/vscode-original.svg";
import jupyterLogo from "./assets/images/tech_stack/jupyter-original.svg";
import openapiLogo from "./assets/images/tech_stack/openapi-original.svg";
import cmakeLogo from "./assets/images/tech_stack/cmake-original.svg";
import androidStudioLogo from "./assets/images/tech_stack/androidstudio-original.svg";
import supabaseLogo from "./assets/images/tech_stack/supabase-original.svg";
import opencvLogo from "./assets/images/tech_stack/opencv-original.svg";
import bashLogo from "./assets/images/tech_stack/bash-original.svg";
import pytorchLogo from "./assets/images/tech_stack/pytorch-original.svg";
import matplotlibLogo from "./assets/images/tech_stack/matplotlib-original.svg";
import "./App.css";

const BlogPage = lazy(() => import("./BlogPage"));
const LegalPage = lazy(() => import("./LegalPage"));
const legalRoutes = ["privacy", "terms", "cookies", "refunds"];
const getRoute = () => {
  const path = window.location.pathname.replace(/\/$/, "").slice(1);
  return ["about", "projects", "blog", "contact", ...legalRoutes].includes(path) ? path : "home";
};

const technologyNames = new Map([
  [cLogo, 'C'], [cPlusPlusLogo, 'C++'], [cssLogo, 'CSS'], [dockerLogo, 'Docker'],
  [firebaseLogo, 'Firebase'], [githubLogo, 'GitHub'], [javaLogo, 'Java'],
  [javascriptLogo, 'JavaScript'], [kaggleLogo, 'Kaggle'], [latexLogo, 'LaTeX'],
  [linuxLogo, 'Linux'], [mysqlLogo, 'MySQL'], [nodeLogo, 'Node.js'],
  [numpyLogo, 'NumPy'], [pandasLogo, 'pandas'], [postgresLogo, 'PostgreSQL'],
  [awsLogo, 'Amazon Web Services'], [pythonLogo, 'Python'], [reactLogo, 'React'],
  [slackLogo, 'Slack'], [pytorchLogo, 'PyTorch'], [openapiLogo, 'OpenAPI'],
  [opencvLogo, 'OpenCV'], [bashLogo, 'Bash'], [vscodeLogo, 'Visual Studio Code'],
  [jupyterLogo, 'Jupyter'], [cmakeLogo, 'CMake'], [androidStudioLogo, 'Android Studio'],
  [supabaseLogo, 'Supabase'], [matplotlibLogo, 'Matplotlib'], [tailwindLogo, 'Tailwind CSS'],
]);

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const scrollToPageTop = (behavior = "auto") => {
  window.scrollTo({ top: 0, left: 0, behavior });
};

const getInitialTheme = () => {
  try {
    const savedTheme = window.localStorage.getItem("theme");
    return savedTheme === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
};

function OptionalExperienceImage({
  src,
  fallback,
  alt,
  label,
  className = "",
  style,
}) {
  const [failed, setFailed] = useState(false);
  const imageSource = failed ? fallback : src;

  return (
    <figure className={`experience-image-card ${className}`} style={style}>
      <img
        src={imageSource}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
      <figcaption>{label}</figcaption>
    </figure>
  );
}

function App() {
  const [route, setRoute] = useState(getRoute);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [pendingHash, setPendingHash] = useState(() =>
    window.location.hash
      ? { hash: window.location.hash, behavior: "auto" }
      : null,
  );
  const [theme, setTheme] = useState(getInitialTheme);
  const [workVisible, setWorkVisible] = useState(false);
  const [stackVisible, setStackVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState({
    hero: 0,
  });

  const featuredExperiences = useMemo(
    () => [
      {
        id: "unify",
        period: "Aug 2025 - June 2026",
        company: "Unify Social",
        role: "Software Coordinator",
        location: "Burnaby, BC",
        headline:
          "A newcomer platform built around guidance, community, and confidence.",
        summary:
          "Unify helps newcomers in Canada navigate disconnected resources by bringing learning content, personalized settlement tasks, AI support, community spaces, and local events into one digital experience.",
        highlights: [
          "Translated Figma product flows into responsive React Native and TypeScript mobile screens.",
          "Connected Supabase, Sanity CMS, APIs, and Resend workflows for dynamic onboarding and checklist experiences.",
          "Supported product iteration across mobile, content, and community features for a launched newcomer support app.",
        ],
        facts: [
          "Digital settlement platform",
          "Learn + checklist + community",
          "In-person newcomer events",
        ],
        projectHash: "unify",
        logo: unifyLogo,
        accent: "warm",
        media: [
          {
            src: "/experience/unify-phone.png",
            fallback: unifyLogo,
            alt: "Unify Social mobile app screen",
            label: "Mobile learning flow",
            className: "portrait-card contain-card",
            fromX: -170,
            fromY: 70,
            rotate: -8,
            delay: 0,
            zIndex: 2,
          },
          {
            src: "/experience/unify-group-formal.jpg",
            fallback: unifyLogo,
            alt: "Unify Social formal team group photo",
            label: "Launch team",
            className: "wide-card",
            fromX: 190,
            fromY: 45,
            rotate: 5,
            delay: 0.015,
            zIndex: 4,
          },
          {
            src: "/experience/unify-group-social.jpg",
            fallback: unifyLogo,
            alt: "Unify Social community group photo",
            label: "Team Social",
            className: "small-card",
            fromX: -110,
            fromY: 190,
            rotate: 7,
            delay: 0.03,
            zIndex: 3,
          },
          {
            src: "/experience/unify-live-appstore.jpg",
            fallback: unifyLogo,
            alt: "Unify Social is live on the App Store",
            label: "App Store launch",
            className: "wide-card lower-card contain-card",
            fromX: 130,
            fromY: 170,
            rotate: -5,
            delay: 0.045,
            zIndex: 1,
          },
        ],
      },
      {
        id: "subvision",
        period: "Feb 2025 - Jan 2026",
        company: "Subvision Robotics",
        role: "Software Developer",
        location: "Burnaby, BC",
        headline:
          "A subsea robotics company taking a prevention-first approach to hull maintenance.",
        summary:
          "Subvision is building ZIMA, a hull-climbing subsea rover designed to stop early-stage biofouling before it becomes drag, using repeatable maintenance passes, close-range UV-C treatment, and real-world hardware iteration.",
        highlights: [
          "Worked on autonomous coverage planning for complex 3D ship hull surfaces.",
          "Built Python, NumPy, and KDTree pipelines that convert mesh data into point-cloud graph structures.",
          "Created simulation and visualization tooling to study coverage efficiency, repeated traversal, and dead-zone recovery.",
        ],
        facts: [
          "ZIMA subsea rover",
          "Hull-climbing mobility",
          "Coverage planning software",
        ],
        projectHash: "subvision",
        logo: subvisionLogo,
        accent: "cool",
        media: [
          {
            src: "/experience/subvision-robot.jpg",
            fallback: subvisionLogo,
            alt: "Subvision Robotics wheeled robot prototype",
            label: "Prototype hardware",
            className: "portrait-card",
            fromX: 170,
            fromY: 50,
            rotate: 6,
            delay: 0.015,
            zIndex: 2,
          },
          {
            src: "/experience/subvision-cad.jpg",
            fallback: subvisionLogo,
            alt: "Subvision Robotics CAD assembly",
            label: "Mechanical model",
            className: "wide-card",
            fromX: -130,
            fromY: 190,
            rotate: 4,
            delay: 0.03,
            zIndex: 3,
          },
          {
            src: "/experience/subvision-hull-points.jpg",
            fallback: subvisionLogo,
            alt: "3D point cloud graph of a ship hull",
            label: "Coverage simulation",
            className: "wide-card lower-card",
            fromX: 120,
            fromY: 180,
            rotate: -5,
            delay: 0.045,
            zIndex: 1,
          },
        ],
      },
    ],
    [],
  );

  const volunteerExperiences = useMemo(
    () => [
      {
        period: "Mar 2026 - Present",
        company: "York Region Educational Services",
        role: "Data Analytics & Web Design",
        description:
          "Collected, cleaned, and analyzed data for decision making while supporting user-friendly website design and maintenance.",
        logo: yresLogo,
      },
      {
        period: "Aug 2023 - Apr 2024",
        company: "Fraser International College",
        role: "Peer Educator",
        description:
          "Tutored computing and math courses, created study materials, and helped students build confidence through personalized guidance.",
        logo: ficLogo,
      },
    ],
    [],
  );

  const certificateItems = useMemo(
    () => [
      {
        title: "Impact Leadership",
        issuer: "York Region Educational Services",
        date: "2026",
        image: "/certificates/impact_certificate_YRES.png",
        href: "/certificates/impact_certificate_YRES.png",
        description:
          "Completed a 12-workshop leadership course focused on transferable skills, job readiness, and academic performance.",
      },
      {
        title: "Foundations: Data, Data, Everywhere",
        issuer: "Google / Coursera",
        date: "May 2026",
        image: "/certificates/coursera-data-everywhere-preview.png",
        href: "/certificates/Coursera%20Data%20Data%20Everywhere.pdf",
        description:
          "Built data analytics foundations across the data life cycle, analytical thinking, and using data to support decisions.",
      },
      {
        title: "Ask Questions to Make Data-Driven Decisions",
        issuer: "Google / Coursera",
        date: "Jun 2026",
        image: "/certificates/coursera-ask-questions-preview.png",
        href: "/certificates/Coursera%20Ask%20Questions%20to%20make%20data%20driven%20decisions.pdf",
        description:
          "Practiced framing business questions, defining useful metrics, and preparing analysis around clear stakeholder needs.",
      },
      {
        title: "Worker Health and Safety Awareness in 4 Steps",
        issuer: "Ontario Ministry of Labour, Training and Skills Development",
        date: "Mar 2026",
        image: "/certificates/certificate_of_completion_4steps.png",
        href: "/certificates/certificate_of_completion_4steps.png",
        description:
          "Completed Ontario workplace safety training covering worker rights, responsibilities, and hazard awareness.",
      },
    ],
    [],
  );

  const techStack = useMemo(
    () => [
      cLogo,
      cPlusPlusLogo,
      cssLogo,
      dockerLogo,
      firebaseLogo,
      githubLogo,
      javaLogo,
      javascriptLogo,
      kaggleLogo,
      latexLogo,
      linuxLogo,
      mysqlLogo,
      nodeLogo,
      numpyLogo,
      pandasLogo,
      postgresLogo,
      awsLogo,
      pythonLogo,
      reactLogo,
      slackLogo,
      tailwindLogo,
      vscodeLogo,
      jupyterLogo,
      openapiLogo,
      cmakeLogo,
      androidStudioLogo,
      supabaseLogo,
      opencvLogo,
      bashLogo,
      pytorchLogo,
      matplotlibLogo,
    ],
    [],
  );
  const techTrackA = useMemo(
    () => techStack.slice(0, Math.ceil(techStack.length / 2)),
    [techStack],
  );
  const techTrackB = useMemo(
    () => techStack.slice(Math.ceil(techStack.length / 2)),
    [techStack],
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    try {
      window.localStorage.setItem("theme", theme);
    } catch {
      // Theme still updates even if storage is unavailable.
    }
  }, [theme]);

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return undefined;

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    const onPopState = () => {
      const nextRoute = getRoute();
      if (nextRoute !== "home") scrollToPageTop();

      setRoute(nextRoute);
      setPendingHash({ hash: window.location.hash, behavior: "auto" });
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (route !== "home") return;
    if (pendingHash === null) return;

    const hash = pendingHash.hash;

    if (!hash) {
      scrollToPageTop(pendingHash.behavior ?? "smooth");
      return;
    }

    window.requestAnimationFrame(() => {
      const target = document.querySelector(hash);
      if (!target) return;

      const behavior = pendingHash.behavior ?? "smooth";
      if (behavior === "auto") {
        const previousScrollBehavior =
          document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";
        target.scrollIntoView();
        document.documentElement.style.scrollBehavior = previousScrollBehavior;
        return;
      }

      target.scrollIntoView({ behavior });
    });
  }, [pendingHash, route]);

  useEffect(() => {
    if (route !== "home") return undefined;

    const readProgress = (id, offset = 0) => {
      const node = document.getElementById(id);
      if (!node) return 0;
      const rect = node.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      return clamp((window.innerHeight - rect.top + offset) / total);
    };

    const readHeroProgress = () => {
      const node = document.getElementById("home");
      if (!node) return 0;
      const heroStart = node.offsetTop;
      const heroScrollable = Math.max(
        node.offsetHeight - window.innerHeight,
        1,
      );
      return clamp((window.scrollY - heroStart) / heroScrollable);
    };

    const onScroll = () => {
      const hero = readHeroProgress();
      const workTop = document.getElementById("experience")?.getBoundingClientRect().top;
      const stack = readProgress("stack", 120);

      setScrollProgress({
        hero,
      });

      if (workTop < window.innerHeight * 0.9) setWorkVisible(true);
      if (stack > 0.2) setStackVisible(true);

      if (hero < 0.42) {
        setWorkVisible(false);
        setStackVisible(false);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [route]);

  const navigateToHomeSection =
    (hash = "") =>
    (event) => {
      event.preventDefault();
      const nextPath = hash ? `/${hash}` : "/";

      if (window.location.pathname !== "/" || window.location.hash !== hash) {
        window.history.pushState({}, "", nextPath);
      }

      if (!hash) scrollToPageTop();
      setRoute("home");
      setPendingHash({ hash, behavior: "smooth" });
    };

  const navigateToAbout = (event) => {
    event.preventDefault();

    if (window.location.pathname !== "/about") {
      window.history.pushState({}, "", "/about");
    }

    scrollToPageTop();
    setRoute("about");
    setPendingHash(null);
  };

  const navigateToProjects = (event) => {
    event.preventDefault();

    if (window.location.pathname !== "/projects" || window.location.hash) {
      window.history.pushState({}, "", "/projects");
    }

    scrollToPageTop();
    setRoute("projects");
    setPendingHash(null);
  };

  const navigateToProjectDetail = (hash) => (event) => {
    event.preventDefault();
    window.history.pushState({}, "", `/projects#${hash}`);
    scrollToPageTop();
    setRoute("projects");
    setPendingHash(null);
  };

  const navigateToContact = (event) => {
    event.preventDefault();

    if (window.location.pathname !== "/contact") {
      window.history.pushState({}, "", "/contact");
    }

    scrollToPageTop();
    setRoute("contact");
    setPendingHash(null);
  };

  const navigateToBlog = (event) => {
    event.preventDefault();

    if (window.location.pathname !== "/blog") {
      window.history.pushState({}, "", "/blog");
    }

    scrollToPageTop();
    setRoute("blog");
    setPendingHash(null);
  };

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  const heroTextOpacity = reducedMotion ? 1 : clamp(1 - scrollProgress.hero / 0.35);
  const heroImageOpacity =
    scrollProgress.hero < 0.2625
      ? 1
      : clamp(1 - (scrollProgress.hero - 0.2625) / 0.17);
  const welcomeOpacity =
    scrollProgress.hero < 0.48 ? 0 : clamp((scrollProgress.hero - 0.48) / 0.1);

  if (legalRoutes.includes(route)) {
    return <Suspense fallback={<div className="route-loading">Loading policy...</div>}><LegalPage type={route} /></Suspense>;
  }

  if (route === "about") {
    return (
      <AboutPage
        onHome={navigateToHomeSection()}
        onAbout={navigateToAbout}
        onProjects={navigateToProjects}
        onBlog={navigateToBlog}
        onContact={navigateToContact}
        theme={theme}
        onThemeToggle={toggleTheme}
      />
    );
  }

  if (route === "projects") {
    return (
      <ProjectsPage
        onHome={navigateToHomeSection()}
        onAbout={navigateToAbout}
        onProjects={navigateToProjects}
        onBlog={navigateToBlog}
        onContact={navigateToContact}
        theme={theme}
        onThemeToggle={toggleTheme}
      />
    );
  }

  if (route === "contact") {
    return (
      <ContactPage
        onHome={navigateToHomeSection()}
        onAbout={navigateToAbout}
        onProjects={navigateToProjects}
        onBlog={navigateToBlog}
        onContact={navigateToContact}
        theme={theme}
        onThemeToggle={toggleTheme}
      />
    );
  }

  if (route === "blog") {
    return (
      <Suspense fallback={<div className="route-loading">Loading blog...</div>}>
        <BlogPage
          onHome={navigateToHomeSection()}
          onAbout={navigateToAbout}
          onProjects={navigateToProjects}
          onBlog={navigateToBlog}
          onContact={navigateToContact}
          theme={theme}
          onThemeToggle={toggleTheme}
        />
      </Suspense>
    );
  }

  return (
    <div className="page">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <section id="home" className="hero-section">
        <div className="hero-sticky">
          <img
            src={landingImage}
            alt="Rodrigo Anasco portrait"
            className="hero-background-image"
            style={{ opacity: heroImageOpacity }}
            decoding="async"
            fetchPriority="high"
          />
          <header className="top-nav">
            <a className="left-logo-home" href="/" onClick={navigateToHomeSection()}>
              Rodrigo.A
            </a>
            <div className="nav-actions">
              <nav aria-label="Main navigation">
                <a href="/" onClick={navigateToHomeSection()}>
                  Home
                </a>
                <a href="/about" onClick={navigateToAbout}>
                  About me
                </a>
                <a href="/projects" onClick={navigateToProjects}>
                  Projects
                </a>
                <a href="/blog" onClick={navigateToBlog}>
                  Blog
                </a>
                <a href="/contact" onClick={navigateToContact}>
                  Contact
                </a>
              </nav>
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
            </div>
          </header>

          <div
            className="hero-title-layer"
            style={{ opacity: heroTextOpacity }}
          >
            <div className="hero-name-row">
              <div className="rectangle rectangle-1">
                <div className="name-and-email">
                  <h1 className="rodrigo" aria-label={'Rodrigo A\u00f1asco'}>Rodrigo</h1>
                  <p className="hero-email">ro.anasco.s@gmail.com</p>
                </div>
              </div>
              <div className="rectangle rectangle-2">
                <div className="name-text-wrap">
                  <p className="anasco" aria-hidden="true">Añasco</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="welcome-overlay"
            style={{
              opacity: welcomeOpacity,
              transform: `translateY(${(1 - welcomeOpacity) * 14}px)`,
            }}
          >
            welcome to my page :)
          </div>
        </div>
      </section>

      <main id="main-content" tabIndex="-1" className="background">
        <div className="content-shell">
          <div
            className={`experience-wrapper ${workVisible ? "is-visible" : ""}`}
          >
            <div className="experience-inner">
              <section id="experience" aria-labelledby="work-heading">
                <div className="experience-section-heading">
                  <h2 id="work-heading">Past Work Experience</h2>
                </div>

                <div className="experience-showcase">
                  {featuredExperiences.map((experience, index) => (
                    <article
                      key={experience.id}
                      className={`experience-panel experience-panel-${experience.accent} ${index % 2 ? "experience-panel-reverse" : ""}`}
                    >
                      <div
                        className={`experience-collage experience-collage-${experience.id}`}
                        aria-label={`${experience.company} photos`}
                      >
                        {experience.media.map((item, mediaIndex) => (
                          <OptionalExperienceImage
                            key={item.src}
                            src={item.src}
                            fallback={item.fallback}
                            alt={item.alt}
                            label={item.label}
                            className={`collage-photo collage-photo-${mediaIndex} ${item.className}`}
                          />
                        ))}
                      </div>

                      <div className="experience-copy">
                        <div className="experience-company-row">
                          <img
                            src={experience.logo}
                            alt={`${experience.company} logo`}
                            loading="lazy"
                            decoding="async"
                          />
                          <div>
                            <p className="experience-period">
                              {experience.period} / {experience.location}
                            </p>
                            <h3>{experience.company}</h3>
                            <p className="experience-role">{experience.role}</p>
                          </div>
                        </div>
                        <h4>{experience.headline}</h4>
                        <p className="experience-summary">{experience.summary}</p>
                        <ul className="experience-highlights">
                          {experience.highlights.map((highlight) => (
                            <li key={highlight}>{highlight}</li>
                          ))}
                        </ul>
                        <a
                          className="experience-cta"
                          href={`/projects#${experience.projectHash}`}
                          onClick={navigateToProjectDetail(experience.projectHash)}
                        >
                          View project
                          <span aria-hidden="true">-&gt;</span>
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section
                id="volunteering"
                className="volunteer-panel"
                aria-labelledby="volunteering-heading"
              >
                <div className="experience-section-heading">
                  <h2 id="volunteering-heading">Volunteering Experience</h2>
                </div>
                <div className="volunteer-grid">
                  {volunteerExperiences.map((experience) => (
                    <article className="volunteer-card" key={experience.company}>
                      <img
                        src={experience.logo}
                        alt={`${experience.company} logo`}
                        loading="lazy"
                        decoding="async"
                      />
                      <div>
                        <p className="experience-period">{experience.period}</p>
                        <h3>{experience.company}</h3>
                        <h4>{experience.role}</h4>
                      </div>
                      <p>{experience.description}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section
                id="certificates"
                className="certificates-section"
                aria-labelledby="certificates-heading"
              >
                <div className="experience-section-heading">
                  <h2 id="certificates-heading">Certificates</h2>
                </div>
                <div className="certificate-gallery">
                  {certificateItems.map((certificate) => (
                    <a
                      className="certificate-card"
                      href={certificate.href}
                      target="_blank"
                      rel="noreferrer"
                      key={certificate.title}
                      aria-label={`Open ${certificate.title} certificate`}
                    >
                      <figure className="certificate-preview">
                        <img
                          src={certificate.image}
                          alt={`${certificate.title} certificate`}
                          loading="lazy"
                          decoding="async"
                        />
                      </figure>
                      <div className="certificate-card-body">
                        <p className="certificate-meta">
                          {certificate.issuer} / {certificate.date}
                        </p>
                        <h3>{certificate.title}</h3>
                        <span className="certificate-link-label">
                          Open certificate -&gt;
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <section
            id="stack"
            className={`stack-section ${stackVisible ? "is-visible" : ""}`}
          >
            <h2 className="stack-title">My Tech Stack</h2>
            <p className="stack-subtitle">Tools and technologies I work with</p>

            <div id="projects" className="stack-carousel">
              <div className="stack-track stack-track-a">
                {[...techTrackA, ...techTrackA].map((logo, index) => (
                  <div className="stack-pill" key={`${logo}-a-${index}`}>
                    <img
                      src={logo}
                      alt={`${technologyNames.get(logo)} logo`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
              <div className="stack-track stack-track-b">
                {[...techTrackB, ...techTrackB].map((logo, index) => (
                  <div className="stack-pill" key={`${logo}-b-${index}`}>
                    <img
                      src={logo}
                      alt={`${technologyNames.get(logo)} logo`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </div>
            <a
              className="stack-projects-teaser"
              href="/projects"
              onClick={navigateToProjects}
            >
              <span>Come see my projects</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </section>
        </div>
      </main>

      <footer>
        <div className="footer-inner">
          <div className="footer-socials">
            <a
              href="https://www.instagram.com/rodr_1201/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={instagramLogo}
                alt="Instagram"
                loading="lazy"
                decoding="async"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/rodrigo-anasco/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={linkedinLogo}
                alt="LinkedIn"
                loading="lazy"
                decoding="async"
              />
            </a>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">
            <a href="/" onClick={navigateToHomeSection()}>
              Home
            </a>
            <a href="/about" onClick={navigateToAbout}>
              About me
            </a>
            <a href="/projects" onClick={navigateToProjects}>
              Projects
            </a>
            <a href="/blog" onClick={navigateToBlog}>
              Blog
            </a>
            <a href="/contact" onClick={navigateToContact}>
              Contact
            </a>
          </nav>
          <LegalLinks />
          <p>&copy; {new Date().getFullYear()} Rodrigo Anasco. All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
