import { Product, ProductType } from "~/types/product"

export const defaultProducts: Product[] = [
  {
    id: 1,
    name: "RemoteHands",
    slug: "remote-hands",
    shortDescription: `A very simple and fully functional Orange Pi-based KVM over IP that you can make with your own hands without any soldering!
    <br /><br />This device helps to manage servers or workstations remotely, regardless of the health of the operating system or whether one is installed. You can fix any problem, configure the BIOS, and even reinstall the OS using the virtual CD-ROM or Flash Drive.`,
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
    categories: [{ title: "Hardware", slug: "hardware" }],
    prices: [
      {
        amount: 139,
        currency: "USD",
      }
    ],
    productType: ProductType.Physical,
    images: [],
  },
  {
    id: 2,
    name: "PostgresQL",
    slug: "postgresql",
    shortDescription: "lorem ipsum",
    description: "lorem ipsum donor consit",
    categories: [{ slug: "databases", title: "Databases" }],
    productType: ProductType.OnlineService,
    images: [
      {
        src: "https://res.cloudinary.com/practicaldev/image/fetch/s--twVcwT-B--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/i/kbjzeples71613068b1i.jpg",
        alt: "background"
      }
    ],
  },
  {
    id: 3,
    name: "MySQL",
    slug: "mysql",
    shortDescription: "lorem ipsum",
    description: "lorem ipsum donor consit",
    categories: [{ slug: "databases", title: "Databases" }],
    productType: ProductType.OnlineService,
    images: [
      {
        src: "https://images.unsplash.com/photo-1646226343350-1ee5021e342a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
        alt: "background"
      }
    ],
  },
  {
    id: 4,
    name: "MS SQL Server",
    slug: "ms-sql-server",
    shortDescription: "lorem ipsum",
    description: "lorem ipsum donor consit",
    categories: [{ slug: "databases", title: "Databases" }],
    productType: ProductType.OnlineService,
    images: [
      {
        src: "https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
        alt: "background"
      }
    ],
  },
  {
    id: 5,
    name: "CockroachDB",
    slug: "cockroach-db",
    shortDescription: "lorem ipsum",
    description: "lorem ipsum donor consit",
    categories: [{ slug: "databases", title: "Databases" }],
    productType: ProductType.OnlineService,
    images: [
      {
        src: "https://plus.unsplash.com/premium_photo-1664297989345-f4ff2063b212?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
        alt: "background"
      }
    ],
  },
  {
    id: 6,
    name: "Redis",
    slug: "redis",
    shortDescription: "lorem ipsum",
    description: "lorem ipsum donor consit",
    categories: [{ slug: "databases", title: "Databases" }],
    productType: ProductType.OnlineService,
    images: [
      {
        src: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
        alt: "background"
      }
    ],
  },
  {
    id: 7,
    name: "MongoDB",
    slug: "mongo-db",
    shortDescription: "lorem ipsum",
    description: "lorem ipsum donor consit",
    categories: [{ slug: "databases", title: "Databases" }],
    productType: ProductType.OnlineService,
    images: [
      {
        src: "https://webimages.mongodb.com/_com_assets/cms/l4hecgagkqphn9kc9-ART.svg?ixlib=js-3.7.1&auto=format%2Ccompress&w=1920",
        alt: "background"
      }
    ],
  },
  {
    id: 8,
    name: "WordPress",
    slug: "wordpress",
    shortDescription: "WordPress, get started on creating your website with one of the most powerful, popular, and customizable platforms in the world.",
    description: "The world's most popular CMS.",
    categories: [{ slug: "cms", title: "CMS" }],
    productType: ProductType.OnlineService,
    images: [
      {
        src: "https://www.backup-technology.com/images/header/wordpress.jpg",
        alt: "background"
      }
    ]
  },
  {
    id: 9,
    name: "RabbitMQ",
    slug: "rabbitmq",
    shortDescription: "lorem ipsum",
    description: "lorem ipsum",
    categories: [{ slug: "databases", title: "Databases" }],
    productType: ProductType.OnlineService,
    images: []
  },

  {
    id: 10,
    name: "Odoo",
    slug: "odoo",
    shortDescription: "Odoo is a suite of open source business apps that cover all your company needs: CRM, eCommerce, accounting, inventory, point of sale, project management, etc.",
    description: "",
    categories: [{ slug: "erp", title: "ERP" }, { slug: "ecommerce", title: "Ecommerce" }],
    productType: ProductType.OnlineService,
    images: [
      {
        src: "https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
        alt: "background"
      }
    ]
  },
  {
    id: 11,
    name: "ERPNext",
    slug: "erp-next",
    shortDescription: "ERPNext is the world's best free and open source ERP",
    description: "",
    categories: [{ slug: "erp", title: "ERP" }],
    productType: ProductType.OnlineService,
    images: [
      {
        src: "https://images.unsplash.com/photo-1556740772-1a741367b93e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
        alt: "background"
      }
    ]
  },
  {
    id: 12,
    name: "Dolibarr",
    slug: "dolibarr",
    shortDescription: "Web based ERP and CRM Open Source software to manage a professional or foundation activity",
    description: "",
    categories: [{ slug: "erp", title: "ERP" }],
    productType: ProductType.OnlineService,
    images: [
      {
        src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
        alt: "background"
      }
    ]
  },

  {
    id: 13,
    name: "SuiteCRM",
    slug: "suite-crm",
    shortDescription: "Sell, market & service smarter with SuiteCRM the world’s number 1 Open Source CRM",
    description: "",
    categories: [{ slug: "crm", title: "CRM" }],
    productType: ProductType.OnlineService,
    images: [
      {
        src: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=60",
        alt: "background"
      }
    ]
  },

  {
    id: 14,
    name: "NodeJS",
    slug: "nodejs-cloud-hosting",
    shortDescription: "",
    description: "",
    categories: [{ slug: "runtime", title: "Runtime" }],
    productType: ProductType.OnlineService,
    images: []
  },
  {
    id: 15,
    name: "Python",
    slug: "python-django-cloud-hosting",
    shortDescription: "",
    description: "",
    categories: [{ slug: "runtime", title: "Runtime" }],
    productType: ProductType.OnlineService,
    images: []
  },
  {
    id: 16,
    name: "Ruby",
    slug: "ruby-ror-cloud-hosting",
    shortDescription: "",
    description: "",
    categories: [{ slug: "runtime", title: "Runtime" }],
    productType: ProductType.OnlineService,
    images: []
  },
  {
    id: 17,
    name: "Java",
    slug: "java-spring-boot-tomcat-cloud-hosting",
    shortDescription: "",
    description: "",
    categories: [{ slug: "runtime", title: "Runtime" }],
    productType: ProductType.OnlineService,
    images: []
  }
]

export const productsMenu = [
  {
    title: "Databases Cloud Hosting",
    slug: "?category=databases",
    submenu: defaultProducts
      .filter(p => p.categories
        .map(c => c.slug)
        .includes("databases"))
      .map(p => ({ title: p.name, slug: p.slug }))
  },
  {
    title: "ERP/CRM Cloud Hosting",
    slug: "?category=erp&category=crm",
    submenu: defaultProducts
      .filter(p => {
        const x = p.categories.map(c => c.slug)
        return ["erp", "crm"].some(c => x.includes(c))
      })
      .map(p => ({ title: p.name, slug: p.slug }))
  },
  {
    title: "CMS/Ecommerce",
    slug: "?category=cms",
    submenu: defaultProducts
      .filter(p => {
        const x = p.categories.map(c => c.slug)
        return x.includes("cms") || x.includes("ecommerce")
      })
      .map(p => ({ title: p.name, slug: p.slug }))
  },
  {
    title: "Others",
    slug: "?category=",
    submenu: defaultProducts
      .filter(p => {
        const categories = p.categories.map(c => c.slug)
        return [""].some(c => categories.includes(c))
      })
      .map(p => ({ title: p.name, slug: p.slug }))
  },
  {
    title: "Runtimes",
    slug: "",
    submenu: [
      { title: "NodeJS", slug: "nodejs-cloud-hosting" },
      { title: "Python", slug: "python-django-cloud-hosting" },
      { title: "Ruby", slug: "ruby-ror-cloud-hosting" },
      { title: "Java", slug: "java-spring-boot-tomcat-cloud-hosting" }
    ]
  },
  {
    title: "Hardware",
    slug: "?category=hardware",
    submenu: [
      { title: "PiKVM", slug: "pi-kvm" }
    ]
  },
]

export const home = {
  featuredProducts: [
    {
      ...defaultProducts[1],
      description: "Fully managed, scalable hosting for PostgresQL database.",
      img: "https://1000logos.net/wp-content/uploads/2020/08/PostgreSQL-Logo.png"
    },
    {
      ...defaultProducts[2],
      description: "Fully managed, scalable hosting for MySQL database.",
      img: "https://upload.wikimedia.org/wikipedia/fr/thumb/6/62/MySQL.svg/1200px-MySQL.svg.png"
    },
    {
      ...defaultProducts[4],
      description: "Fully managed, scalable hosting for Cockroach database.",
      img: "https://connect.redhat.com/s3api/prod-s3api/1629218071-logo-url-5e9872712989e6a90307acd6.png"
    },
    {
      ...defaultProducts[5],
      description: "Fully managed, scalable hosting for Redis datastore.",
      img: "https://upload.wikimedia.org/wikipedia/en/6/6b/Redis_Logo.svg"
    },
    {
      ...defaultProducts[8],
      description: "Fully managed, scalable hosting for RabbitMQ message queuing system.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/RabbitMQ_logo.svg/2560px-RabbitMQ_logo.svg.png"
    },
    {
      ...defaultProducts[7],
      description: "Fully managed, scalable hosting for Wordpress to fulfill all your blogging and ecommerce needs",
      img: "https://1000logos.net/wp-content/uploads/2023/01/WordPress-logo.png"
    }
  ],
  runtimes: [
    {
      name: "NodeJS",
      slug: "nodejs-cloud-hosting",
      description: "Fully managed, scalable hosting for NodeJS applications.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/2560px-Node.js_logo.svg.png"
    },
    {
      name: "Java",
      slug: "java-spring-boot-tomcat-cloud-hosting",
      description: "Fully managed, scalable hosting for Java and JVM based languages. Run Tomcat, Springboot and more.",
      img: "https://1000logos.net/wp-content/uploads/2020/09/Java-Logo.png"
    },
    {
      name: "Ruby",
      slug: "ruby-ror-cloud-hosting",
      description: "Fully managed, scalable hosting for Ruby/Rails.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Ruby_logo.svg/1024px-Ruby_logo.svg.png"
    },
  ],
  testimonials: [
    {
      name: "Michal Jankowski",
      text: "Great service. loved it",
      img: "https://spectrum.ieee.org/media-library/ceo-of-comma-ai-george-geohot-hotz-speaks-onstage-during-techcrunch-disrupt-sf-2016-at-pier-48-on-september-13-2016-in-san-fr.jpg?id=25582060&width=980"
    },
    {
      name: "Clement Ivanov",
      text: "recommend to all",
      img: "https://about.me/cdn-cgi/image/q=80,dpr=1,f=auto,fit=cover,w=1200,h=630,gravity=0.314x0.177/https://assets.about.me/background/users/c/l/e/clementivanov_1548318087_406.jpg"
    },
    {
      name: "Steve Jobs",
      text: "excellent service",
      img: "https://cdn.britannica.com/04/171104-050-AEFE3141/Steve-Jobs-iPhone-2010.jpg"
    },
  ]
}