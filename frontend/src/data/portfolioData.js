export const personalInfo = {
  name: "Shubham Akade",
  title: "Java Full Stack Developer & Systems Engineer",
  tagline: "Engineering bulletproof enterprise ERP backends in Java & Spring Boot, and surgical reactive interfaces in React.",
  location: "Pune, Maharashtra, India",
  coordinates: "18.5204° N, 73.8567° E",
  status: "JAVA DEVELOPER @ EPPS INFOTECH",
  avatar: "/shubham_akade.jpeg",
  company: "EPPS Infotech Ltd.",
  companyRole: "Java Developer (Jul 2025 — Present)",
  previousCompany: "Robowaves (Dec 2024 — Jun 2025)",
  education: "B.E. Computer Engineering, Government College of Engineering, Chandrapur (2019 — 2023)",
  experienceYears: "2+",
  focus: ["Enterprise Java", "Spring Boot 3", "GraphQL & REST", "Spring Data JPA", "PostgreSQL", "React 18", "ERP Architectures"],
  social: {
    linkedin: "https://www.linkedin.com/in/shubham-akade-b342211ab/",
    github: "https://github.com/shubhamakade",
    email: "akadeshubham@gmail.com",
    phone: "+91 9373156685"
  },
  metrics: [
    { label: "Enterprise ERP Modules", value: "MMS, FAMS, PQMS", change: "Multi-tier Maven" },
    { label: "Mobile ERP Endpoints", value: "GraphQL & REST", change: "Spring Boot 3" },
    { label: "API Latency SLA (p99)", value: "<40ms", change: "JPA Optimized" },
    { label: "Daily Meals Governed", value: "12,000+", change: "38% Waste Cut" }
  ]
};

export const architecturePillars = [
  {
    code: "01",
    title: "ACID Concurrency & Zero Data Loss",
    tagline: "Transactional integrity under extreme write contention",
    description: "Every inventory reservation and financial disbursement is engineered with strict isolation levels, dual-phase validation, and idempotent endpoints to eliminate phantom allocations.",
    icon: "ShieldCheck",
    tags: ["@Transactional", "Pessimistic Locking", "Idempotency", "Isolation: READ_COMMITTED"]
  },
  {
    code: "02",
    title: "Domain-Driven Enterprise Modeling",
    tagline: "Clean DDD aggregate roots and decoupled modules",
    description: "Architecting domain layers where business logic resides strictly inside domain models, enforcing ubiquitous language from kitchen meal cards to ledger cost allocations.",
    icon: "Layers",
    tags: ["Aggregate Roots", "Clean Architecture", "Rich Domain Models", "DTO Projections"]
  },
  {
    code: "03",
    title: "Sub-50ms Query & In-Memory Pipeline",
    tagline: "Zero N+1 queries, tuned indexes and second-level cache",
    description: "Eliminating Hibernate query pitfalls through selective entity graphs, composite B-tree indexing, and cache invalidation strategies that deliver instant operational feedback.",
    icon: "Zap",
    tags: ["Entity Graphs", "QueryDSL", "Redis L2 Cache", "Connection Pooling (HikariCP)"]
  },
  {
    code: "04",
    title: "Surgical React Reactive Interfaces",
    tagline: "High-density editorial ergonomics for operators",
    description: "Building responsive, keyboard-navigable operations consoles in modern React that render multi-tier data tables with millisecond fluidity and zero visual bloat.",
    icon: "Cpu",
    tags: ["React 18", "Optimistic Updates", "Framer Motion", "Tailwind CSS"]
  }
];

export const projects = [
  {
    id: "trunk-erp",
    badge: "FLAGSHIP ENTERPRISE ERP",
    title: "EPPS Enterprise ERP (Trunk Product Suite)",
    tagline: "Multi-module Maven enterprise ERP integrating MMS (Mess Management), FAMS (Fixed Assets), PQMS (Quality Assurance), and Financial Accounting.",
    featured: true,
    accent: "cyan",
    role: "Java Full Stack Developer",
    company: "EPPS Infotech Ltd.",
    stack: ["Java 17", "Spring MVC", "Spring Data JPA", "Hibernate", "PostgreSQL", "React 18", "Maven Multi-Module", "Tomcat"],
    overview: "Enterprise-grade multi-tier resource planning platform deployed across high-scale manufacturing and institutional operations. Features deep transactional consistency across interconnected business sub-systems: Mess Management (MMS) for automated ingredient requisition and weekly menu planning, Fixed Asset Management (FAMS) for capitalization and depreciation schedules, and Production Quality (PQMS) for stage-gate inspection auditing.",
    metrics: [
      { label: "Architecture", val: "Multi-Module Maven" },
      { label: "Daily Meals Governed", val: "12,000+" },
      { label: "Procurement Waste Cut", val: "38%" },
      { label: "Audit Accuracy", val: "99.98%" }
    ],
    verifiedEntities: [
      {
        name: "EppsMessMenuCardHdr & Dtl",
        type: "Weekly Scheduling Aggregate",
        purpose: "Defines meal slots (Breakfast, Lunch, Hi-Tea, Dinner) with nutritional benchmarks, recipe links, and portion weights."
      },
      {
        name: "EppsDemandOrderHdr & Dtl",
        type: "Forecasting Requisition Engine",
        purpose: "Calculates total raw material demand by multiplying real-time headcount by recipe unit norms with margin buffers."
      },
      {
        name: "EppsMaterialTransferHdr & Dtl",
        type: "Inter-Store Stock Movement",
        purpose: "Manages transfer of grains, dairy, and spices between central dry warehouse and active kitchen sub-pantries."
      },
      {
        name: "EppsFamsAssetHdr & Dtl",
        type: "Fixed Asset Accounting",
        purpose: "Maintains asset lifecycle, capitalization dates, depreciation calculation tables, and physical verification logs."
      },
      {
        name: "EppsPqmsInspectionHdr",
        type: "Production Quality Gates",
        purpose: "Stage-gate batch sampling, tolerance testing, and non-conformance quarantine logs."
      }
    ],
    interactiveDemoType: "mms-simulator"
  },
  {
    id: "mobile-erp",
    badge: "FLAGSHIP MOBILE BACKEND",
    title: "EPPS Smart Mobile ERP Backend",
    tagline: "Mobile-first Spring Boot 3 microservice with dual GraphQL & REST architecture powering real-time approvals, finance aging, and sales dispatch.",
    featured: true,
    accent: "violet",
    role: "Backend Systems Developer",
    company: "EPPS Infotech Ltd.",
    stack: ["Spring Boot 3", "GraphQL", "REST APIs", "Spring Data JPA", "PostgreSQL", "JWT Security", "Docker"],
    overview: "High-performance mobile backend service tailored for executive decision-makers and warehouse floor operators on mobile devices. Delivers sub-40ms query responses through GraphQL resolvers for complex financial drilldowns (Accounts Payable/Receivable aging, Customer Outstandings), Sales Order mobile approvals, HRMS expense claims, and Purchase Order workflows.",
    metrics: [
      { label: "API Architecture", val: "GraphQL + REST" },
      { label: "Response Latency", val: "<40ms SLA" },
      { label: "Mobile Modules", val: "FAS, SDMS, HRMS, MMS" },
      { label: "Auth Architecture", val: "Stateless JWT" }
    ],
    verifiedEntities: [
      {
        name: "AccountsPayableGraphQLController",
        type: "FAS Financial Aging Resolver",
        purpose: "Aggregates outstanding vendor bills, due-date brackets, and payment aging buckets in single mobile query."
      },
      {
        name: "SalesOrderMobileController",
        type: "SDMS Sales & Dispatch",
        purpose: "Real-time stock availability verification and instant order placement from field representatives."
      },
      {
        name: "HrmsExpenseClaimWorkflow",
        type: "HRMS Multi-Tier Approval",
        purpose: "Receipt attachment indexing, per-diem policy validation, and hierarchical manager sign-offs."
      },
      {
        name: "PurchaseOrderApprovalService",
        type: "MMS Mobile Procurement",
        purpose: "Executive on-the-go PO authorization with vendor quote comparison and budget threshold checks."
      }
    ],
    interactiveDemoType: "mobile-erp-simulator"
  },
  {
    id: "nasa-telemetry",
    badge: "DEEP SPACE OBSERVATORY",
    title: "NASA APOD & Mars Curiosity Telemetry",
    tagline: "Astronomy Picture of the Day deep-space viewer and Mars Rover environmental telemetry interface.",
    featured: false,
    accent: "cobalt",
    role: "Frontend Systems Engineer",
    stack: ["React 18", "NASA Open APIs", "Tailwind CSS", "Canvas 2D", "IndexedDB"],
    overview: "Interactive scientific dashboard integrating NASA's open astronomical telemetry. Features daily astronomical captures with high-res zoom, mission metadata parsing, and Mars Curiosity rover camera filter matrix.",
    metrics: [
      { label: "Space Imagery Records", val: "5,000+" },
      { label: "Mars Sol Filter Modes", val: "7 Cameras" },
      { label: "API Client Caching", val: "IndexedDB" }
    ],
    interactiveDemoType: "nasa-simulator"
  },
  {
    id: "stock-engine",
    badge: "ACID INVENTORY LEDGER",
    title: "Atomic Stock & Warehouse Distribution",
    tagline: "High-throughput SKU reservation system with pessimistic lock arbitration and real-time ledger auditing.",
    featured: false,
    accent: "emerald",
    role: "Backend Architect",
    stack: ["Java 17", "Spring Boot", "PostgreSQL", "Redis", "HikariCP", "Docker"],
    overview: "Engineered to withstand simultaneous Black-Friday-style stock reservation bursts. Eliminates overselling via database row-level locking and atomic Redis decrement checkpoints prior to DB commit.",
    metrics: [
      { label: "Burst Throughput", val: "10,000 ops/s" },
      { label: "Phantom Reservations", val: "0.00%" },
      { label: "Lock Contention Timeout", val: "<15ms" }
    ],
    interactiveDemoType: "stock-simulator"
  }
];

export const skillsHierarchy = [
  {
    category: "Core Runtime & Backend Systems",
    code: "RUNTIME-CORE",
    description: "Enterprise Java architecture engineered for extreme throughput, concurrent safety, and clean bounded contexts.",
    skills: [
      { 
        name: "Java (11 / 17 / 21 LTS)", 
        tier: "ARCHITECTURAL LEAD", 
        highlight: "Virtual threads (Project Loom), Streams API, Record types, Java Memory Model, Garbage Collection tuning" 
      },
      { 
        name: "Spring Boot 3.x Ecosystem", 
        tier: "CORE PRODUCTION", 
        highlight: "Spring MVC, Spring Data JPA, Auto-configuration, Spring AOP, Actuator metrics, HikariCP integration" 
      },
      { 
        name: "Hibernate & JPA Persistence", 
        tier: "CORE PRODUCTION", 
        highlight: "Entity Graphs, 2nd-level cache, composite primary keys, dirty checking lifecycle, pessimistic lock modes" 
      },
      { 
        name: "RESTful API Architecture", 
        tier: "ARCHITECTURAL LEAD", 
        highlight: "OpenAPI 3 spec, idempotent endpoints, hypermedia controls, custom validation filters, RFC 7807 problem details" 
      },
      { 
        name: "Spring Security & Auth", 
        tier: "CORE PRODUCTION", 
        highlight: "Stateless JWT validation filters, Role-Based Access Control (RBAC), method-level @PreAuthorize security" 
      },
      { 
        name: "GraphQL & Resolvers", 
        tier: "PRODUCTION SPECIALIST", 
        highlight: "@QueryMapping, @MutationMapping, schema-first design, N+1 DataLoader batching for mobile ERP clients" 
      }
    ]
  },
  {
    category: "Databases & Concurrency Engineering",
    code: "DATA-STORAGE",
    description: "ACID-compliant persistence architectures, transaction isolation levels, indexing, and high-throughput caching.",
    skills: [
      { 
        name: "PostgreSQL Engine", 
        tier: "ARCHITECTURAL LEAD", 
        highlight: "Composite B-tree indexes, EXPLAIN ANALYZE query planning, PL/pgSQL stored routines, JSONB indexing" 
      },
      { 
        name: "MySQL & InnoDB", 
        tier: "CORE PRODUCTION", 
        highlight: "Transaction logs (redo/undo), row-level locks, gap locking mitigation, replication topology" 
      },
      { 
        name: "Redis In-Memory Engine", 
        tier: "PRODUCTION SPECIALIST", 
        highlight: "Atomic counter operations, distributed locks (Redlock), TTL cache invalidation, pub/sub messaging" 
      },
      { 
        name: "Schema Migrations & DDL", 
        tier: "CORE PRODUCTION", 
        highlight: "Flyway and Liquibase zero-downtime database changes, backward-compatible column rollouts" 
      },
      { 
        name: "Transaction Isolation Design", 
        tier: "ARCHITECTURAL LEAD", 
        highlight: "Strict READ_COMMITTED & REPEATABLE_READ tuning, mitigation of dirty reads, non-repeatable reads, and phantom reads" 
      }
    ]
  },
  {
    category: "Reactive Frontend Architecture",
    code: "REACTIVE-UI",
    description: "Surgical, responsive web applications engineered with modern component primitives, kinetic motion, and instantaneous state transitions.",
    skills: [
      { 
        name: "React 18 & Concurrent Features", 
        tier: "ARCHITECTURAL LEAD", 
        highlight: "Custom hooks, useTransition, useDeferredValue, performance profiling, strict render cycle optimization" 
      },
      { 
        name: "Modern JavaScript (ESNext)", 
        tier: "ARCHITECTURAL LEAD", 
        highlight: "Async/await pipelines, closures, modular architecture, immutable functional state transformations" 
      },
      { 
        name: "Tailwind CSS & Design Systems", 
        tier: "CORE PRODUCTION", 
        highlight: "Bespoke HUD theme configurations, ergonomic glassmorphic tokens, zero runtime CSS overhead" 
      },
      { 
        name: "Framer Motion & Kinetic Choreography", 
        tier: "CORE PRODUCTION", 
        highlight: "Gesture orchestration, layout transitions, physics-based springs, staggered kinetic reveals" 
      },
      { 
        name: "HTML5 Canvas 2D & WebGL", 
        tier: "PRODUCTION SPECIALIST", 
        highlight: "Sub-pixel particle engines, isometric projections, 60fps telemetry visualizers, Three.js scenes" 
      }
    ]
  },
  {
    category: "Toolchain, DevOps & Operations",
    code: "OPS-TOOLCHAIN",
    description: "Predictable builds, containerized environments, rigorous API verification, and engineering delivery pipelines.",
    skills: [
      { 
        name: "Git & Version Control", 
        tier: "ARCHITECTURAL LEAD", 
        highlight: "Trunk-based development, interactive rebase, semantic versioning, branch protection rules" 
      },
      { 
        name: "Maven & Gradle Multi-Module", 
        tier: "CORE PRODUCTION", 
        highlight: "Multi-module project builds, dependency convergence enforcement, custom plugin execution" 
      },
      { 
        name: "Docker Containerization", 
        tier: "CORE PRODUCTION", 
        highlight: "Multi-stage production Dockerfiles, minimal Alpine/Distroless JRE images, Docker Compose clusters" 
      },
      { 
        name: "Linux Shell & Scripting", 
        tier: "CORE PRODUCTION", 
        highlight: "Bash automation, cron orchestration, process telemetry, memory analysis, system tuning" 
      },
      { 
        name: "Postman & Automated API Verification", 
        tier: "CORE PRODUCTION", 
        highlight: "Newman CLI regression pipelines, mock servers, assertion scripting, pre-request auth scripting" 
      }
    ]
  }
];

export const timelineMilestones = [
  {
    period: "JUL 2025 — PRESENT",
    role: "Java Developer",
    entity: "EPPS Infotech Ltd.",
    location: "Pune, Maharashtra, India",
    type: "CAREER_PEAK",
    summary: "Developing enterprise-scale ERP modules and mobile-first backend services. Architecting high-concurrency business flows across Material Management (MMS), Fixed Assets (FAMS), Product Quality (PQMS), and GraphQL mobile endpoints.",
    keyDeliverables: [
      "Engineered Mess Management System (MMS) menu card scheduling, demand requisition, and store-to-store stock transfers with ACID guarantees",
      "Architected GraphQL resolvers and REST controllers in Spring Boot 3 for the EPPS Smart Mobile ERP (FAS aging, SDMS orders, HRMS expense claims)",
      "Eliminated N+1 Hibernate query bottlenecks across enterprise entity graphs, reducing critical API response times below 40ms",
      "Implemented pessimistic concurrency locking for inter-pantry inventory movements across 8 institutional dining hubs"
    ],
    tech: ["Java 17", "Spring Boot 3", "Spring MVC", "GraphQL", "Hibernate / JPA", "PostgreSQL", "Maven", "React"]
  },
  {
    period: "DEC 2024 — JUN 2025",
    role: "Java Full Stack Developer Intern",
    entity: "Robowaves",
    location: "Pune, Maharashtra, India",
    type: "ENTERPRISE_DEV",
    summary: "Built scalable web services and dynamic frontend interfaces for IoT-enabled automation and enterprise tracking platforms. Focused on RESTful API design, database modeling, and responsive dashboard development.",
    keyDeliverables: [
      "Engineered Spring Boot RESTful microservices for telemetry data ingestion with JWT authentication and role-based permissions",
      "Designed normalized relational database schemas in MySQL with optimized composite indexing for rapid analytical lookups",
      "Constructed dynamic user interfaces with React and Tailwind CSS, featuring real-time device health metrics and alert feeds",
      "Participated in agile code reviews, Git trunk workflows, and Postman API contract verification pipelines"
    ],
    tech: ["Java 11", "Spring Boot", "MySQL", "React", "REST APIs", "Git", "Maven"]
  },
  {
    period: "JUL 2019 — JUL 2023",
    role: "Bachelor of Engineering (B.E.) — Computer Engineering",
    entity: "Government College of Engineering, Chandrapur (GCOE Chandrapur)",
    location: "Chandrapur / Pune, Maharashtra, India",
    type: "ACADEMIC_FOUNDATION",
    summary: "Graduated with comprehensive technical grounding in computer science principles, advanced data structures, algorithms, relational database systems, operating systems, and computer networking.",
    keyDeliverables: [
      "Graduated in 2023 with strong academic performance in core Computer Engineering subjects",
      "Coursework excellence in Advanced Data Structures, Database Management Systems (DBMS), Object-Oriented Analysis & Design (OOAD)",
      "Engineered end-to-end full stack capstone projects including distributed inventory trackers and academic portals",
      "Active contributor to technical symposiums, coding competitions, and open-source learning circles"
    ],
    tech: ["Data Structures & Algorithms", "Java", "C++", "RDBMS / SQL", "Operating Systems", "Computer Networks"]
  }
];

