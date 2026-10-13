"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowUp,
  ChevronDown,
  Send,
  Search,
  Command,
  Menu,
  X,
  Building2,
  Heart,
  ShoppingCart,
  Check,
  MousePointer2,
  Sparkles,
} from "lucide-react";
import {
  siGithub,
  siNextdotjs,
  siReact,
  siTypescript,
  siFlutter,
  siApple,
  siAndroid,
  siNestjs,
  siPostgresql,
  siPrisma,
  type SimpleIcon,
} from "simple-icons";

type Category = "All" | "Web" | "Mobile" | "SaaS";
type Project = {
  name: string;
  image: string;
  tags: Category[];
  icon: "building" | "heart" | "cart";
  description: string;
  features: string[];
  color: string;
};
const projects: Project[] = [
  {
    name: "KolayApartman",
    image: "apartment",
    tags: ["SaaS", "Web", "Mobile"],
    icon: "building",
    color: "cyan",
    description:
      "A simpler way to manage the place you call home. An apartment management experience that brings residents, payments and daily operations together.",
    features: [
      "Resident and property management",
      "Clear payment tracking",
      "Connected web and mobile experiences",
    ],
  },
  {
    name: "Momby",
    image: "momby",
    tags: ["Mobile", "SaaS"],
    icon: "heart",
    color: "pink",
    description:
      "A little support for a big adventure. A thoughtful mobile experience for parents, bringing daily routines and meaningful moments into one calm space.",
    features: [
      "A personal daily planner",
      "Thoughtful parenting tools",
      "A warm, approachable mobile experience",
    ],
  },
  {
    name: "E-commerce Platform",
    image: "commerce",
    tags: ["Web", "SaaS"],
    icon: "cart",
    color: "cyan",
    description:
      "From the first product to the next order. A connected commerce experience with a focused storefront and the tools to keep everything running behind it.",
    features: [
      "Product catalog and storefront",
      "Order and inventory workflows",
      "Scalable service architecture",
    ],
  },
];
const tools = [
  {
    title: "Frontend",
    items: [
      { name: "Next.js", icon: siNextdotjs, color: "#f5f7fa" },
      { name: "React", icon: siReact, color: "#00d8e7" },
      { name: "TypeScript", icon: siTypescript, color: "#3178ff" },
    ],
  },
  {
    title: "Mobile",
    items: [
      { name: "Flutter", icon: siFlutter, color: "#28bbfa" },
      { name: "iOS", icon: siApple, color: "#f5f7fa" },
      { name: "Android", icon: siAndroid, color: "#90c448" },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "NestJS", icon: siNestjs, color: "#ed365c" },
      { name: "PostgreSQL", icon: siPostgresql, color: "#6bade3" },
      { name: "Prisma", icon: siPrisma, color: "#e5eaf2" },
    ],
  },
];
function Mark({ className = "" }: { className?: string }) {
  return (
    <svg className={`mark ${className}`} viewBox="0 0 48 44" aria-hidden="true">
      <path
        d="M4 5h7v34H4zm13 0h8l7 13L39 5h8L36 26v13h-8V26z"
        fill="currentColor"
      />
    </svg>
  );
}
function Github({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={siGithub.path} />
    </svg>
  );
}
function Linkedin() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42ZM19 18.75h-2.95V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.76V9.2h2.83v1.31h.04c.39-.75 1.36-1.55 2.8-1.55 2.99 0 3.57 1.97 3.57 4.52Z" />
    </svg>
  );
}
function TechIcon({ icon, color }: { icon: SimpleIcon; color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d={icon.path} />
    </svg>
  );
}
function ProjectIcon({ type }: { type: Project["icon"] }) {
  return type === "building" ? (
    <Building2 />
  ) : type === "heart" ? (
    <Heart />
  ) : (
    <ShoppingCart />
  );
}
function ArrowCircle({ children }: { children?: ReactNode }) {
  return (
    <span className="arrow-circle">{children || <ArrowRight size={19} />}</span>
  );
}
function Modal({
  children,
  title,
  onClose,
}: {
  children: ReactNode;
  title: string;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const trigger =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    dialog?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
      dialog?.close();
      trigger?.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="modal"
      aria-label={title}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-inner">
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X />
        </button>
        {children}
      </div>
    </dialog>
  );
}
function HumanArt() {
  return (
    <svg
      className="human-art"
      viewBox="0 0 380 230"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="human"
          x1="70"
          y1="20"
          x2="300"
          y2="220"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#92d7ed" />
          <stop offset=".6" stopColor="#9b6af4" />
          <stop offset="1" stopColor="#36ebe5" />
        </linearGradient>
      </defs>
      <g
        stroke="url(#human)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M128 36c-29 7-15 45-31 54l-15 9 14 8c14 8 2 40 15 53l10 6" />
        <path d="M202 15c-32 1-23 42-39 55l-13 11c-8 9 5 13 10 18l-6 8 10 5-8 8c4 6 15 6 9 14-8 8-4 17 9 19 12 2 26-3 37-5l24-60c8-18 30-9 22 10-3 8-8 17-15 19m-8-91c-13-4-24-4-36-2m-5 26c11-9 25-8 36-2m-19-4c-10 16 8 25 10 3m-9 101-18 59m93-195c33 5 4 44 19 59l12 8-15 8c-11 10-8 37-17 54l-13 7" />
      </g>
      <text
        x="291"
        y="176"
        transform="rotate(-13 291 176)"
        fill="#a385cf"
        fontSize="19"
        fontStyle="italic"
        fontFamily="cursive"
      >
        <tspan x="291">Build</tspan>
        <tspan x="291" dy="20">
          a kinder
        </tspan>
        <tspan x="291" dy="20">
          internet.
        </tspan>
      </text>
    </svg>
  );
}

export default function Home() {
  const [filter, setFilter] = useState<Category>("All");
  const [project, setProject] = useState<Project | null>(null);
  const [experiment, setExperiment] = useState<"hexball" | "ai" | null>(null);
  const [commandOpen, setCommandOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [search, setSearch] = useState("");
  const [motion, setMotion] = useState(true);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [contactStatus, setContactStatus] = useState("");
  const [ball, setBall] = useState(12);
  const [frequency, setFrequency] = useState(3);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileNavOpen((open) => {
          if (open) menuButton.current?.focus();
          return false;
        });
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  const ask = (value: string) => {
    const q = value.trim().toLowerCase();
    if (!q) return;
    if (/project|work|proje/.test(q))
      setAnswer(
        "Explore KolayApartman for apartment management, Momby for parenting, and the E-commerce Platform for connected commerce. Select any project above to learn more.",
      );
    else if (/tech|stack|tool|tekn|next|react|flutter/.test(q))
      setAnswer(
        "My toolkit spans Next.js, React and TypeScript for the web; Flutter, iOS and Android for mobile; and NestJS, PostgreSQL and Prisma behind the scenes.",
      );
    else if (/contact|email|hire|ilet|mail/.test(q))
      setAnswer(
        "Have something in mind? Reach me at ibrahimyeler10@gmail.com, or use the contact form below to open an email draft.",
      );
    else if (/who|about|ibrahim|kim/.test(q))
      setAnswer(
        "I’m İbrahim, a full stack developer focused on thoughtful web, mobile and SaaS products. My process is simple: explore, build, refine.",
      );
    else
      setAnswer(
        "I can help you explore the projects, tech stack and contact details on this page. Try “What projects have you built?” or choose a topic above.",
      );
    setQuestion("");
  };
  const contact = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = `${data.get("message")}\n\n${data.get("name")}\n${data.get("email")}`;
    window.location.href = `mailto:ibrahimyeler10@gmail.com?subject=${encodeURIComponent(`Let's build something — ${data.get("name")}`)}&body=${encodeURIComponent(body)}`;
    setContactStatus(
      "Your email draft is ready in your mail app. Send it there to get in touch.",
    );
  };
  const navigate = (id: string) => {
    setCommandOpen(false);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: motion ? "smooth" : "instant" });
  };
  return (
    <div className={motion ? "site" : "site motion-off"} id="top">
      <a className="skip-link" href="#work">
        Skip to content
      </a>
      <div className="hero-shell">
        <header className="header container">
          <a className="brand" href="#top" aria-label="İbrahim Yeler home">
            <Mark />
            <span>İbrahim Yeler</span>
          </a>
          <button
            ref={menuButton}
            className="menu-toggle"
            aria-label={mobileNavOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileNavOpen}
            aria-controls="main-navigation"
            onClick={() => setMobileNavOpen((open) => !open)}
          >
            {mobileNavOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
          <nav
            id="main-navigation"
            className={mobileNavOpen ? "nav-open" : ""}
            aria-label="Main navigation"
            onClick={(event) => {
              if ((event.target as HTMLElement).closest("a"))
                setMobileNavOpen(false);
            }}
          >
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#playground">Playground</a>
            <a
              className="github-nav"
              href="https://github.com/ibrahimyeler"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              className="nav-contact"
              href="#contact"
              aria-label="Get in touch"
            >
              <ArrowRight size={20} />
            </a>
          </nav>
        </header>
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-art">
            <Image
              src="/images/hero.webp"
              alt="A smiling 3D developer waving from his desk, surrounded by blue light"
              fill
              preload
              sizes="(max-width: 640px) 110vw, 72vw"
            />
          </div>
          <div className="hero-copy">
            <p className="eyebrow cyan">FULL STACK DEVELOPER</p>
            <h1 id="hero-title">
              Hi, I’m
              <br />
              <span className="gradient">İbrahim.</span>
            </h1>
            <h2>Code. Create. Refine.</h2>
            <p className="hero-description">
              I build web, mobile and SaaS products.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#work">
                Explore my work <ArrowRight size={17} />
              </a>
              <a
                className="button secondary"
                href="https://github.com/ibrahimyeler"
                target="_blank"
                rel="noreferrer"
              >
                GitHub <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="hero-disciplines">
              WEB <span>/</span> MOBILE <span>/</span> SAAS
            </div>
          </div>
          <a
            className="scroll-cue"
            href="#work"
            aria-label="Scroll to selected work"
          >
            <ChevronDown />
          </a>
        </section>
      </div>
      <main>
        <section className="work section container" id="work">
          <div className="section-heading">
            <h2>
              Selected <span className="gradient">work.</span>
            </h2>
            <div className="filters" aria-label="Filter projects">
              {(["All", "Web", "Mobile", "SaaS"] as Category[]).map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={filter === item ? "active" : ""}
                  aria-pressed={filter === item}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="project-grid">
            {projects
              .filter((p) => filter === "All" || p.tags.includes(filter))
              .map((p) => (
                <button
                  className={`project-card ${p.image === "commerce" ? "wide" : ""}`}
                  key={p.name}
                  onClick={() => setProject(p)}
                  aria-label={`View ${p.name} project`}
                >
                  <div className="project-image">
                    <Image
                      src={`/images/${p.image}.webp`}
                      alt={`${p.name} product concept`}
                      fill
                      sizes={
                        p.image === "commerce"
                          ? "94vw"
                          : "(max-width: 640px) 94vw, 46vw"
                      }
                    />
                  </div>
                  <div className="project-bottom">
                    <span className={`project-icon ${p.color}`}>
                      <ProjectIcon type={p.icon} />
                    </span>
                    <h3>{p.name}</h3>
                    <div className="project-tags">
                      {p.tags.map((tag) => (
                        <span className="tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <ArrowCircle />
                  </div>
                </button>
              ))}
          </div>
        </section>
        <section className="about section ruled" id="about">
          <div className="container about-inner">
            <div>
              <p className="eyebrow">ABOUT ME</p>
              <h2>
                Human first.
                <br />
                <span className="gradient">Developer</span> always
                <span className="underline">.</span>
              </h2>
              <p>Curiosity, craft and thoughtful products.</p>
              <div className="about-values">
                Explore <span>·</span> Simplify <span>·</span> Build
              </div>
            </div>
            <HumanArt />
          </div>
        </section>
        <section className="toolkit section container" id="toolkit">
          <h2>
            My <span className="gradient">toolkit.</span>
          </h2>
          <div className="toolkit-grid">
            {tools.map((group) => (
              <div className="tool-group" key={group.title}>
                <h3>{group.title}</h3>
                <div className="tool-items">
                  {group.items.map((tool) => (
                    <div className="tool" key={tool.name}>
                      <TechIcon icon={tool.icon} color={tool.color} />
                      <span>{tool.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="process section ruled">
          <div className="container">
            <h2>
              From idea to <span className="gradient">interaction.</span>
            </h2>
            <div className="process-art">
              <Image
                src="/images/process.webp"
                alt="Wireframe sketches become glass building blocks and a polished interactive interface"
                fill
                sizes="94vw"
              />
              <div className="process-labels">
                {["Explore", "Build", "Refine"].map((step, i) => (
                  <div key={step}>
                    <span className={`step-number ${i === 2 ? "filled" : ""}`}>
                      0{i + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="playground section container" id="playground">
          <h2>
            Built for <span className="gradient">curiosity.</span>
          </h2>
          <div className="experiment-grid">
            <button
              className="experiment-card"
              onClick={() => setExperiment("hexball")}
            >
              <Image
                src="/images/hexball.webp"
                alt="Glowing blue and green hexagonal game board"
                fill
                sizes="(max-width: 640px) 94vw, 46vw"
              />
              <span className="concept">CONCEPT</span>
              <div className="experiment-caption">
                <h3>Hexball</h3>
                <ArrowCircle />
              </div>
            </button>
            <button
              className="experiment-card"
              onClick={() => setExperiment("ai")}
            >
              <Image
                src="/images/ai.webp"
                alt="Purple and peach flowing particle waves"
                fill
                sizes="(max-width: 640px) 94vw, 46vw"
              />
              <span className="concept">CONCEPT</span>
              <div className="experiment-caption">
                <h3>AI experiments</h3>
                <ArrowCircle />
              </div>
            </button>
          </div>
        </section>
        <section className="systems section ruled">
          <div className="container systems-inner">
            <div className="systems-copy">
              <h2>
                Behind the <span className="gradient">interface.</span>
              </h2>
              <p>
                Scalable systems. Real products.
                <br />
                Lasting impact.
              </p>
              <div className="system-tags">
                <span className="tag">APIs</span>
                <span className="tag">Integrations</span>
                <span className="tag">Multi-tenant systems</span>
              </div>
            </div>
            <div className="systems-art">
              <Image
                src="/images/architecture.webp"
                alt="Exploded translucent glass layers representing a software architecture"
                fill
                sizes="(max-width: 640px) 94vw, 50vw"
              />
              <div className="layer-labels">
                <div>
                  <b>UI</b>
                  <span>User interface</span>
                </div>
                <div>
                  <b>API</b>
                  <span>Business logic</span>
                </div>
                <div>
                  <b>Data</b>
                  <span>Databases & services</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="details section container">
          <h2>
            Small details. <span className="gradient">Big difference.</span>
          </h2>
          <div className="detail-grid">
            <div className="detail-item">
              <div className="detail-visual">
                <button
                  className={`motion-toggle ${motion ? "on" : ""}`}
                  role="switch"
                  aria-checked={motion}
                  aria-label="Enable animations"
                  onClick={() => setMotion(!motion)}
                >
                  <span />
                </button>
              </div>
              <div className="detail-label">
                <span className="step-number">01</span> Motion
              </div>
            </div>
            <div className="detail-item">
              <div
                className="detail-visual hover-demo"
                tabIndex={0}
                aria-label="Hover or focus to preview the card animation"
              >
                <span>
                  <Sparkles />
                </span>
                <span>
                  <Sparkles />
                </span>
                <span>
                  <Sparkles />
                </span>
                <MousePointer2 className="demo-pointer" />
              </div>
              <div className="detail-label">
                <span className="step-number">02</span> Hover
              </div>
            </div>
            <div className="detail-item">
              <div className="detail-visual">
                <button
                  className="command-trigger"
                  onClick={() => setCommandOpen(true)}
                >
                  <Search size={19} />
                  <span>Find a project...</span>
                  <kbd>
                    <Command size={12} /> K
                  </kbd>
                </button>
              </div>
              <div className="detail-label">
                <span className="step-number">03</span> Shortcuts
              </div>
            </div>
          </div>
        </section>
        <section className="guide section ruled">
          <div className="container guide-inner">
            <h2>
              Ask about
              <br />
              my <span className="gradient">work.</span>
              <span className="little-underline" />
            </h2>
            <div className="guide-card">
              <div className="guide-avatar">
                <Mark />
              </div>
              <div className="guide-content">
                <p className="guide-title">
                  Portfolio guide <span className="status-dot" />
                </p>
                <p className="guide-subtitle">
                  What would you like to explore?
                </p>
                <div className="guide-topics">
                  {["Projects", "Tech stack", "Contact"].map((topic) => (
                    <button
                      className="tag"
                      key={topic}
                      onClick={() => ask(topic)}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
                {answer && (
                  <p className="guide-answer" role="status">
                    {answer}
                  </p>
                )}
                <form
                  className="guide-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    ask(question);
                  }}
                >
                  <input
                    aria-label="Ask about my work"
                    placeholder="Ask a question..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                    maxLength={300}
                  />
                  <button aria-label="Ask portfolio guide" type="submit">
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className="contact section container" id="contact">
          <div>
            <h2>
              Let’s <span className="gradient">connect.</span>
            </h2>
            <div className="social-links">
              <a
                href="https://github.com/ibrahimyeler"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
              >
                <Github />
              </a>
              <a
                href="https://www.linkedin.com/in/ibrahimyeler/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
              >
                <Linkedin />
              </a>
            </div>
            <a className="contact-email" href="mailto:ibrahimyeler10@gmail.com">
              ibrahimyeler10@gmail.com <ArrowUpRight size={12} />
            </a>
          </div>
          <form className="contact-form" onSubmit={contact}>
            <label>
              <span className="sr-only">Your name</span>
              <input
                name="name"
                autoComplete="name"
                placeholder="Your name"
                required
                maxLength={100}
              />
            </label>
            <label>
              <span className="sr-only">Your email</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Your email"
                required
                maxLength={200}
              />
            </label>
            <label className="message-field">
              <span className="sr-only">Your message</span>
              <textarea
                name="message"
                placeholder="Your message..."
                required
                rows={3}
                maxLength={3000}
              />
            </label>
            <button className="button primary" type="submit">
              Send <ArrowUpRight size={16} />
            </button>
            <p className="contact-note" role="status">
              {contactStatus || "Opens a draft in your email app."}
            </p>
          </form>
        </section>
      </main>
      <footer className="footer ruled">
        <div className="container footer-inner">
          <a className="brand" href="#top">
            <Mark />
            <span>İbrahim Yeler</span>
          </a>
          <span className="footer-domain">ibrahimyeler.com</span>
          <a className="back-top" href="#top">
            Back to top <ArrowUp size={16} />
          </a>
        </div>
      </footer>
      <button
        className="floating-guide"
        onClick={() => {
          document
            .querySelector<HTMLInputElement>(".guide-form input")
            ?.focus();
          document.querySelector(".guide")?.scrollIntoView({
            behavior: motion ? "smooth" : "instant",
            block: "center",
          });
        }}
        aria-label="Open portfolio guide"
      >
        <Mark />
        <span className="status-dot" />
      </button>
      {project && (
        <Modal title={project.name} onClose={() => setProject(null)}>
          <div className="modal-cover">
            <Image
              src={`/images/${project.image}.webp`}
              alt={`${project.name} concept artwork`}
              fill
              sizes="700px"
            />
          </div>
          <div className="modal-copy">
            <p className="eyebrow cyan">SELECTED WORK</p>
            <h2>{project.name}</h2>
            <div className="modal-tags">
              {project.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <p>{project.description}</p>
            <ul>
              {project.features.map((feature) => (
                <li key={feature}>
                  <Check size={17} />
                  {feature}
                </li>
              ))}
            </ul>
            <a
              className="button primary"
              href="#contact"
              onClick={() => setProject(null)}
            >
              Let’s talk about this project <ArrowUpRight size={16} />
            </a>
          </div>
        </Modal>
      )}
      {commandOpen && (
        <Modal
          title="Find a project or section"
          onClose={() => setCommandOpen(false)}
        >
          <div className="command-panel">
            <h2>Find your way.</h2>
            <div className="search-field">
              <Search />
              <input
                autoFocus
                placeholder="Search projects, tech, contact..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search projects and sections"
              />
            </div>
            <div className="command-results">
              {[
                { name: "Selected work", id: "work" },
                ...projects.map((p) => ({ name: p.name, id: "work" })),
                { name: "About me", id: "about" },
                { name: "Tech stack", id: "toolkit" },
                { name: "Playground", id: "playground" },
                { name: "Contact", id: "contact" },
              ]
                .filter((item) =>
                  item.name.toLowerCase().includes(search.toLowerCase()),
                )
                .map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      const found = projects.find((p) => p.name === item.name);
                      if (found) {
                        setCommandOpen(false);
                        setProject(found);
                      } else navigate(item.id);
                    }}
                  >
                    {item.name}
                    <ArrowUpRight size={16} />
                  </button>
                ))}
              {![
                "Selected work",
                ...projects.map((p) => p.name),
                "About me",
                "Tech stack",
                "Playground",
                "Contact",
              ].some((name) =>
                name.toLowerCase().includes(search.toLowerCase()),
              ) && <p>No matches. Try “Momby” or “Contact”.</p>}
            </div>
            <p className="command-hint">
              Esc to close <span>⌘ / Ctrl + K to open</span>
            </p>
          </div>
        </Modal>
      )}
      {experiment && (
        <Modal
          title={
            experiment === "hexball"
              ? "Hexball playground"
              : "Generative wave playground"
          }
          onClose={() => setExperiment(null)}
        >
          <div className="modal-copy experiment-modal">
            <p className="eyebrow cyan">INTERACTIVE CONCEPT</p>
            <h2>
              {experiment === "hexball"
                ? "A little room to play."
                : "Find your frequency."}
            </h2>
            <p>
              {experiment === "hexball"
                ? "Choose a tile and watch the light move. A small exploration of playful interfaces."
                : "An interactive wave study inspired by generative art. Move the slider to reshape the signal."}
            </p>
            {experiment === "hexball" ? (
              <div className="hex-board">
                {Array.from({ length: 25 }, (_, i) => (
                  <button
                    key={i}
                    className={`hex-tile ${ball === i ? "selected" : ""}`}
                    onClick={() => setBall(i)}
                    aria-label={`Move ball to tile ${i + 1}`}
                    aria-pressed={ball === i}
                  >
                    {ball === i && <span />}
                  </button>
                ))}
              </div>
            ) : (
              <>
                <svg
                  className="wave-demo"
                  viewBox="0 0 600 240"
                  role="img"
                  aria-label={`Generative waves at frequency ${frequency}`}
                >
                  <defs>
                    <linearGradient id="wave">
                      <stop stopColor="#655aff" />
                      <stop offset=".5" stopColor="#cf68fd" />
                      <stop offset="1" stopColor="#ffb278" />
                    </linearGradient>
                  </defs>
                  {Array.from({ length: 20 }, (_, line) => (
                    <path
                      key={line}
                      d={Array.from(
                        { length: 151 },
                        (_, i) =>
                          `${i === 0 ? "M" : "L"}${i * 4},${120 + Math.sin((i / 150) * Math.PI * frequency + line * 0.16) * (25 + line * 3)}`,
                      ).join(" ")}
                      fill="none"
                      stroke="url(#wave)"
                      strokeWidth="1.4"
                      opacity={0.3 + line * 0.03}
                    />
                  ))}
                </svg>
                <label className="frequency-label">
                  Frequency <span>{frequency}</span>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    step=".1"
                    value={frequency}
                    onChange={(e) => setFrequency(Number(e.target.value))}
                  />
                </label>
              </>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
