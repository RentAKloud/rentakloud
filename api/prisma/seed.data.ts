import { Prisma, ProductType } from "@prisma/client"

export const products: Prisma.XOR<Prisma.ProductCreateInput, Prisma.ProductUncheckedCreateInput>[] = [
  {
    name: "RAK KVM", slug: "rak-kvm",
    shortDescription: `A very simple and fully functional Orange Pi-based KVM over IP that you can make with your own hands 
    without any soldering!<br /><br />This device helps to manage servers or workstations remotely, regardless of the health 
    of the operating system or whether one is installed. You can fix any problem, configure the BIOS, and even reinstall the OS 
    using the virtual CD-ROM or Flash Drive.`,
    description: `
    <ul class="list-disc">
      <li>Based on the Orange Pi Compute Module 4 which is included!</li>
      <li><b>1920x1080@60Hz &amp; 1920x1200@60Hz</b> resolution support for increased UEFI/BIOS compatibility.</li>
      <li>Improved <b>WiFi connectivity</b> with a port for an optional external antenna.</li>
      <li>OTG <b>Keyboard</b> &amp; <b>mouse</b>; <b>Mass Storage Drive</b> emulation.</li>
      <li>Ability to <b>simulate "removal and insertion" for USB</b>.</li>
      <li>Onboard <b>ATX power control</b>.</li>
      <li>Onboard <b>fan controller</b>.</li>
      <li><b>A real-time clock</b>.</li>
      <li><b>RJ-45 and USB serial console port</b> (to manage RemoteHands OS or to connect with the server).</li>
      <li><b>No need for soldering or breadboarding.</b> It's a pre-assembled, reliable device
        which you can use yourself or provide to your clients.
      </li>
      <li>Continued use of RemoteHands OS - <b>all the software is fully open</b>.</li>
    </ul>
    `,
    productType: ProductType.Physical,
    prices: [{ amount: 199.99, currency: "USD" }],
    images: [
      {
        src: "https://cdn11.bigcommerce.com/s-2fbyfnm8ev/images/stencil/1280x1280/products/1968/7031/Plus-1__34215.1674847345.1280.1280__92699.1675093557.jpg?c=2",
        alt: "RemoteHands main"
      },
      {
        src: "https://cdn11.bigcommerce.com/s-2fbyfnm8ev/images/stencil/1280x1280/products/1968/7032/Plus-2__79690.1674847358.1280.1280__03489.1675093573.jpg?c=2",
        alt: "RemoteHands top view"
      },
      {
        src: "https://cdn11.bigcommerce.com/s-2fbyfnm8ev/images/stencil/1280x1280/products/1968/7033/Plus-3__42612.1674847369.1280.1280__06848.1675093585.jpg?c=2",
        alt: "RemoteHands accessories"
      }
    ],
    categories: {
      connect: [{ id: 1 }]
    },
    weight: 0.5
  },
  {
    name: "RK Server 1", slug: "rk-server-1",
    shortDescription: `RentAKloud production-ready server 1.`,
    description: `
    RentAKloud production-ready server 1
    `,
    productType: ProductType.Physical,
    prices: [{ amount: 4199.99, currency: "USD" }],
    images: [],
    categories: {
      connect: [{ id: 1 }, { id: 10 }]
    },
    weight: 13.
  },
  {
    name: "RAK Router 1", slug: "rak-router-1",
    shortDescription: `Dual Band Wireless Internet Router, Gigabit Router, Easy Mesh, Works with Alexa - A Certified for Humans Device`,
    description: `
    <ul class="list-disc">
      <li>VPN Server and Client: Archer AX21 Supports both VPN Server and VPN Client (Open/PPTP/L2TP over Ipsec)</li>
      <li>Certified for Humans: Smart home made easy for non-experts. Setup with Alexa is simple</li>
      <li>Dual-Band WiFi 6 Internet Router: Wi-Fi 6(802.11ax) technology achieves faster speeds, greater capacity and 
      reduced network congestion compared to the previous generation</li>
      <li>Next-Gen 1.8 Gbps Speeds: Enjoy smoother and more stable streaming, gaming, downloading and more with WiFi 
      speeds up to 1.8 Gbps (1200 Mbps on 5 GHz band and 574 Mbps on 2.4 GHz band)</li>
      <li>Connect more devices: Wi-Fi 6 technology communicates more data to more devices simultaneously using 
      revolutionary OFDMA technology</li>
      <li>Extensive Coverage: Achieve the strong, reliable WiFi coverage with Archer AX1800 as it focuses signal 
      strength to your devices far away using Beamforming technology, 4 high-gain antennas and an advanced front-end 
      module (FEM) chipset</li>
      <li>Works with all internet service providers, such as Comcast, Charter, AT&T, Verizon, Xfinity, Spectrum, RCN, Cox, 
      CenturyLink, Frontier, etc.( a modem is required for most internet service providers)</li>
    </ul>
    `,
    productType: ProductType.Physical,
    prices: [{ amount: 74.99, currency: "USD" }],
    images: [],
    categories: {
      connect: [{ id: 1 }, { id: 11 }]
    }
  },

  {
    name: "PostgresQL", slug: "postgresql",
    shortDescription: "PostgreSQL is a powerful, open source object-relational database system with over 35 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.",
    description: `Below is an inexhaustive list of various features found in PostgreSQL, with more being added in every major release:
    <ul class="list-disc">
      <li>
        <strong>Data Types</strong>
        <ul>
          <li>Primitives: Integer, Numeric, String, Boolean</li>
          <li>Structured: Date/Time, Array, Range / Multirange, UUID</li>
          <li>Document: JSON/JSONB, XML, Key-value (Hstore)</li>
          <li>Geometry: Point, Line, Circle, Polygon</li>
          <li>Customizations: Composite, Custom Types</li>
        </ul>
      </li>
      <li>
        <strong>Data Integrity</strong>
        <ul>
          <li>UNIQUE, NOT NULL</li>
          <li>Primary Keys</li>
          <li>Foreign Keys</li>
          <li>Exclusion Constraints</li>
          <li>Explicit Locks, Advisory Locks</li>
        </ul>
      </li>
      <li>
        <strong>Concurrency, Performance</strong>
        <ul>
          <li>Indexing: B-tree, Multicolumn, Expressions, Partial</li>
          <li>Advanced Indexing: GiST, SP-Gist, KNN Gist, GIN, BRIN, Covering indexes, Bloom filters</li>
          <li>Sophisticated query planner / optimizer, index-only scans, multicolumn statistics</li>
          <li>Transactions, Nested Transactions (via savepoints)</li>
          <li>Multi-Version concurrency Control (MVCC)</li>
          <li>Parallelization of read queries and building B-tree indexes</li>
          <li>Table partitioning</li>
          <li>All transaction isolation levels defined in the SQL standard, including Serializable</li>
          <li>Just-in-time (JIT) compilation of expressions</li>
        </ul>
      </li>
      <li>
        <strong>Reliability, Disaster Recovery</strong>
        <ul>
          <li>Write-ahead Logging (WAL)</li>
          <li>Replication: Asynchronous, Synchronous, Logical</li>
          <li>Point-in-time-recovery (PITR), active standbys</li>
          <li>Tablespaces</li>
        </ul>
      </li>
      <li>
        <strong>Security</strong>
        <ul>
          <li>Authentication: GSSAPI, SSPI, LDAP, SCRAM-SHA-256, Certificate, and more</li>
          <li>Robust access-control system</li>
          <li>Column and row-level security</li>
          <li>Multi-factor authentication with certificates and an additional method</li>
        </ul>
      </li>
      <li>
        <strong>Extensibility</strong>
        <ul>
          <li>Stored functions and procedures</li>
          <li>Procedural Languages: PL/pgSQL, Perl, Python, and Tcl. There are other languages available through extensions, e.g. Java, JavaScript (V8), R, Lua, and Rust</li>
          <li>SQL/JSON path expressions</li>
          <li>Foreign data wrappers: connect to other databases or streams with a standard SQL interface</li>
          <li>Customizable storage interface for tables</li>
          <li>Many extensions that provide additional functionality, including PostGIS</li>
        </ul>
      </li>
      <li>
        <strong>Internationalisation, Text Search</strong>
        <ul>
          <li>Support for international character sets, e.g. through ICU collations</li>
          <li>Case-insensitive and accent-insensitive collations</li>
          <li>Full-text search</li>
        </ul>
      </li>
    </ul>
    There are many more features that you can discover in the PostgreSQL documentation. Additionally, PostgreSQL is highly extensible: many features, such as indexes, have defined APIs so that you can build out with PostgreSQL to solve your challenges.
    `,
    productType: ProductType.OnlineService,
    prices: [
      {
        amount: 5.99,
        priceId: "1",
        currency: "USD",
        interval: "month",
        planName: "Basic Plan",
        intervalCount: 1
      },
      {
        amount: 13.99,
        priceId: "2",
        currency: "USD",
        interval: "month",
        planName: "Pro Plan",
        intervalCount: 1
      },
      {
        amount: 23.99,
        priceId: "3",
        currency: "USD",
        interval: "month",
        planName: "Premium Plan",
        intervalCount: 1
      }
    ],
    images: [
      {
        src: "https://res.cloudinary.com/practicaldev/image/fetch/s--twVcwT-B--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/kbjzeples71613068b1i.jpg",
        alt: "background"
      }
    ],
    categories: {
      connect: [{ id: 2 }]
    }
  },
  {
    name: "MySQL",
    slug: "mysql",
    shortDescription: "lorem ipsum",
    description: "lorem ipsum donor consit",
    categories: {
      connect: [{ id: 2 }]
    },
    productType: ProductType.OnlineService,
    images: [
      {
        src: "https://images.unsplash.com/photo-1646226343350-1ee5021e342a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
        alt: "background"
      }
    ],
  },
  {
    name: "MS SQL Server",
    slug: "ms-sql-server",
    shortDescription: "lorem ipsum",
    description: "lorem ipsum donor consit",
    categories: {
      connect: [{ id: 2 }]
    },
    productType: ProductType.OnlineService,
    images: [
      {
        src: "https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
        alt: "background"
      }
    ],
  },
  {
    name: "CockroachDB",
    slug: "cockroach-db",
    shortDescription: "lorem ipsum",
    description: "lorem ipsum donor consit",
    categories: {
      connect: [{ id: 2 }]
    },
    productType: ProductType.OnlineService,
    images: [
      {
        src: "https://plus.unsplash.com/premium_photo-1664297989345-f4ff2063b212?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
        alt: "background"
      }
    ],
  },
  {
    name: "Redis",
    slug: "redis",
    shortDescription: "lorem ipsum",
    description: "lorem ipsum donor consit",
    categories: {
      connect: [{ id: 2 }]
    },
    productType: ProductType.OnlineService,
    images: [
      {
        src: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
        alt: "background"
      }
    ],
  },
  {
    name: "MongoDB",
    slug: "mongo-db",
    shortDescription: "lorem ipsum",
    description: "lorem ipsum donor consit",
    categories: {
      connect: [{ id: 2 }]
    },
    productType: ProductType.OnlineService,
    images: [
      {
        src: "https://webimages.mongodb.com/_com_assets/cms/l4hecgagkqphn9kc9-ART.svg?ixlib=js-3.7.1&auto=format%2Ccompress&w=1920",
        alt: "background"
      }
    ],
  },
  {
    name: "WordPress",
    slug: "wordpress",
    shortDescription: "WordPress, get started on creating your website with one of the most powerful, popular, and customizable platforms in the world.",
    description: "The world's most popular CMS.",
    categories: {
      connect: [{ id: 3 }, { id: 8 }]
    },
    productType: ProductType.OnlineService,
    images: [
      {
        src: "https://www.backup-technology.com/images/header/wordpress.jpg",
        alt: "background"
      }
    ]
  },
  {
    name: "RabbitMQ",
    slug: "rabbitmq",
    shortDescription: "lorem ipsum",
    description: "lorem ipsum",
    categories: {
      connect: [{ id: 4 }]
    },
    productType: ProductType.OnlineService,
    images: []
  },

  {
    name: "Odoo",
    slug: "odoo",
    shortDescription: "Odoo is a suite of open source business apps that cover all your company needs: CRM, eCommerce, accounting, inventory, point of sale, project management, etc.",
    description: "",
    categories: {
      connect: [{ id: 5 }, { id: 6 }]
    },
    productType: ProductType.OnlineService,
    images: [
      {
        src: "https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
        alt: "background"
      }
    ]
  },
  {
    name: "ERPNext",
    slug: "erp-next",
    shortDescription: "ERPNext is the world's best free and open source ERP",
    description: "",
    categories: {
      connect: [{ id: 5 }]
    },
    productType: ProductType.OnlineService,
    images: [
      {
        src: "https://images.unsplash.com/photo-1556740772-1a741367b93e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
        alt: "background"
      }
    ]
  },
  {
    name: "Dolibarr",
    slug: "dolibarr",
    shortDescription: "Web based ERP and CRM Open Source software to manage a professional or foundation activity",
    description: "",
    categories: {
      connect: [{ id: 5 }]
    },
    productType: ProductType.OnlineService,
    images: [
      {
        src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
        alt: "background"
      }
    ]
  },

  {
    name: "SuiteCRM",
    slug: "suite-crm",
    shortDescription: "Sell, market & service smarter with SuiteCRM the world’s number 1 Open Source CRM",
    description: "",
    categories: {
      connect: [{ id: 6 }]
    },
    productType: ProductType.OnlineService,
    images: [
      {
        src: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=60",
        alt: "background"
      }
    ]
  },

  {
    name: "NodeJS",
    slug: "nodejs-cloud-hosting",
    shortDescription: "",
    description: "",
    categories: {
      connect: [{ id: 7 }]
    },
    productType: ProductType.OnlineService,
    images: []
  },
  {
    name: "Python",
    slug: "python-django-cloud-hosting",
    shortDescription: "",
    description: "",
    categories: {
      connect: [{ id: 7 }]
    },
    productType: ProductType.OnlineService,
    images: []
  },
  {
    name: "Ruby",
    slug: "ruby-ror-cloud-hosting",
    shortDescription: "",
    description: "",
    categories: {
      connect: [{ id: 7 }]
    },
    productType: ProductType.OnlineService,
    images: []
  },
  {
    name: "Java",
    slug: "java-spring-boot-tomcat-cloud-hosting",
    shortDescription: "",
    description: "",
    categories: {
      connect: [{ id: 7 }]
    },
    productType: ProductType.OnlineService,
    images: []
  },
  {
    name: "OpenEMR",
    slug: "open-emr",
    shortDescription: "Electronic health records and medical practice management solution",
    description: `OpenEMR is the most popular open source electronic health records and medical practice management solution. 
    OpenEMR's goal is a superior alternative to its proprietary counterparts with passionate volunteers and contributors. 
    Some of the many features are:
    <ul class="list-disc">
      <li>Scheduling</li>
      <li>e-Prescribing</li>
      <li>Medical Billing</li>
      <li>CMS Reporting</li>
      <li>Lab Integration</li>
      <li>Clinical Decision Rules</li>
      <li>Advanced Security</li>
      <li><Multilingual Support</li>
    </ul>
    `,
    categories: {
      connect: [{ id: 9 }]
    },
    productType: ProductType.OnlineService,
    images: [
      {
        src: "https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=60",
        alt: "background"
      }
    ]
  },
]