import { Product, ProductType } from "../types/product"

export const defaultProducts: Product[] = [
  {
    id: 1,
    name: "PiKVM",
    slug: "pi-kvm",
    shortDescription: `A very simple and fully functional Raspberry Pi-based KVM over IP that you can make with your own hands without any soldering!
    <br /><br />This device helps to manage servers or workstations remotely, regardless of the health of the operating system or whether one is installed. You can fix any problem, configure the BIOS, and even reinstall the OS using the virtual CD-ROM or Flash Drive.`,
    description: `
    <ul class="list-disc">
      <li>Based on the Raspberry Pi Compute Module 4 which is included!</li>
      <li><b>1920x1080@60Hz &amp; 1920x1200@60Hz</b> resolution support for increased UEFI/BIOS compatibility.</li>
      <li>Improved <b>WiFi connectivity</b> with a port for an optional external antenna.</li>
      <li>OTG <b>Keyboard</b> &amp; <b>mouse</b>; <b>Mass Storage Drive</b> emulation.</li>
      <li>Ability to <b>simulate "removal and insertion" for USB</b>.</li>
      <li>Onboard <b>ATX power control</b>.</li>
      <li>Onboard <b>fan controller</b>.</li>
      <li><b>A real-time clock</b>.</li>
      <li><b>RJ-45 and USB serial console port</b> (to manage PiKVM OS or to connect with the server).</li>
      <li><b>No need for soldering or breadboarding.</b> It's a pre-assembled, reliable device
        which you can use yourself or provide to your clients.
      </li>
      <li>Continued use of PiKVM OS - <b>all the software is fully open</b>.</li>
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
  },
  {
    id: 2,
    name: "PostgresQL",
    slug: "postgresql",
    shortDescription: "lorem ipsum",
    description: "lorem ipsum donor consit",
    categories: [{ slug: "databases", title: "Databases" }],
    productType: ProductType.OnlineService,
  },
  {
    id: 3,
    name: "MySQL",
    slug: "mysql",
    shortDescription: "lorem ipsum",
    description: "lorem ipsum donor consit",
    categories: [{ slug: "databases", title: "Databases" }],
    productType: ProductType.OnlineService,
  },
  {
    id: 4,
    name: "MS SQL Server",
    slug: "ms-sql-server",
    shortDescription: "lorem ipsum",
    description: "lorem ipsum donor consit",
    categories: [{ slug: "databases", title: "Databases" }],
    productType: ProductType.OnlineService,
  },
  {
    id: 5,
    name: "CockroachDB",
    slug: "cockroach-db",
    shortDescription: "lorem ipsum",
    description: "lorem ipsum donor consit",
    categories: [{ slug: "databases", title: "Databases" }],
    productType: ProductType.OnlineService,
  },
  {
    id: 6,
    name: "Redis",
    slug: "redis",
    shortDescription: "lorem ipsum",
    description: "lorem ipsum donor consit",
    categories: [{ slug: "databases", title: "Databases" }],
    productType: ProductType.OnlineService,
  },
  {
    id: 7,
    name: "MongoDB",
    slug: "mongo-db",
    shortDescription: "lorem ipsum",
    description: "lorem ipsum donor consit",
    categories: [{ slug: "databases", title: "Databases" }],
    productType: ProductType.OnlineService,
  }
]

export const productsMenu = [
  {
    title: "PiKVM",
    slug: "pi-kvm"
  },
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
    title: "ERP Cloud Hosting",
    slug: "?category=erp",
    submenu: defaultProducts
      .filter(p => p.categories
        .map(c => c.slug)
        .includes("erp"))
      .map(p => ({ title: p.name, slug: p.slug }))
  },
  {
    title: "CRM Cloud Hosting",
    slug: "?category=crm",
    submenu: defaultProducts
      .filter(p => p.categories
        .map(c => c.slug)
        .includes("crm"))
      .map(p => ({ title: p.name, slug: p.slug }))
  },
  {
    title: "CMS Cloud Hosting",
    slug: "?category=cms",
    submenu: defaultProducts
      .filter(p => p.categories
        .map(c => c.slug)
        .includes("cms"))
      .map(p => ({ title: p.name, slug: p.slug }))
  },
  {
    title: "Ecommerce Cloud Hosting",
    slug: "?category=ecommerce",
    submenu: defaultProducts
      .filter(p => p.categories
        .map(c => c.slug)
        .includes("ecommerce"))
      .map(p => ({ title: p.name, slug: p.slug }))
  },
  {
    title: "Message Queueing Services",
    slug: "?category=message-queueing-services",
    submenu: defaultProducts
      .filter(p => p.categories
        .map(c => c.slug)
        .includes("message-queueing"))
      .map(p => ({ title: p.name, slug: p.slug }))
  },
  {
    title: "NodeJS",
    slug: "nodejs-cloud-hosting"
  },
  {
    title: "Python",
    slug: "python-django-cloud-hosting"
  },
  {
    title: "Ruby",
    slug: "ruby-ror-cloud-hosting"
  },
]

export const home = {
  featuredProducts: [
    {
      name: "PostgresQL",
      description: "Fully managed, scalable hosting for PostgresQL database.",
      img: "https://1000logos.net/wp-content/uploads/2020/08/PostgreSQL-Logo.png"
    },
    {
      name: "MySQL",
      description: "Fully managed, scalable hosting for MySQL database.",
      img: "https://upload.wikimedia.org/wikipedia/fr/thumb/6/62/MySQL.svg/1200px-MySQL.svg.png"
    },
    {
      name: "CockroachDB",
      description: "Fully managed, scalable hosting for Cockroach database.",
      img: "https://connect.redhat.com/s3api/prod-s3api/1629218071-logo-url-5e9872712989e6a90307acd6.png"
    },
    {
      name: "Redis",
      description: "Fully managed, scalable hosting for Redis datastore.",
      img: "https://upload.wikimedia.org/wikipedia/en/6/6b/Redis_Logo.svg"
    },
    {
      name: "RabbitMQ",
      description: "Fully managed, scalable hosting for RabbitMQ message queuing system.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/RabbitMQ_logo.svg/2560px-RabbitMQ_logo.svg.png"
    },
    {
      name: "Wordpress",
      description: "Fully managed, scalable hosting for Wordpress to fulfill all your blogging and ecommerce needs",
      img: "https://1000logos.net/wp-content/uploads/2023/01/WordPress-logo.png"
    }
  ],
  runtimes: [
    {
      name: "NodeJS",
      description: "Fully managed, scalable hosting for NodeJS applications.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/2560px-Node.js_logo.svg.png"
    },
    {
      name: "Java",
      description: "Fully managed, scalable hosting for Java and JVM based languages. Run Tomcat, Springboot and more.",
      img: "https://1000logos.net/wp-content/uploads/2020/09/Java-Logo.png"
    },
    {
      name: "Ruby",
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