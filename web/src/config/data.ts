import { products } from "~/stores/products"
import { ProductType } from "~/types/product"

export const productsMenu = () => [
  // {
  //   title: "Databases Cloud Hosting",
  //   slug: "?category=databases",
  //   submenu: products.latest
  //     .filter(p => p.categories
  //       .map(c => c.slug)
  //       .includes("databases"))
  //     .map(p => ({ title: p.name, slug: p.slug }))
  // },
  // {
  //   title: "ERP/CRM Cloud Hosting",
  //   slug: "?category=erp&category=crm",
  //   submenu: products.latest
  //     .filter(p => {
  //       const x = p.categories.map(c => c.slug)
  //       return ["erp", "crm"].some(c => x.includes(c))
  //     })
  //     .map(p => ({ title: p.name, slug: p.slug }))
  // },
  // {
  //   title: "CMS/Ecommerce",
  //   slug: "?category=cms",
  //   submenu: products.latest
  //     .filter(p => {
  //       const x = p.categories.map(c => c.slug)
  //       return x.includes("cms") || x.includes("ecommerce")
  //     })
  //     .map(p => ({ title: p.name, slug: p.slug }))
  // },
  // {
  //   title: "Others",
  //   slug: "?category=",
  //   submenu: products.latest
  //     .filter(p => {
  //       const categories = p.categories.map(c => c.slug)
  //       const includeAllExcept = ["databases", "runtimes", "cms", "erp", "hardware", "crm", "message-queueing"]
  //       return includeAllExcept.every(c => !categories.includes(c)) && p.productType === ProductType.OnlineService
  //     })
  //     .map(p => ({ title: p.name, slug: p.slug }))
  // },
  // {
  //   title: "Runtimes",
  //   slug: "",
  //   submenu: [
  //     { title: "NodeJS", slug: "nodejs-cloud-hosting" },
  //     { title: "Python", slug: "python-django-cloud-hosting" },
  //     { title: "Ruby", slug: "ruby-ror-cloud-hosting" },
  //     { title: "Java", slug: "java-spring-boot-tomcat-cloud-hosting" }
  //   ]
  // },
  {
    title: "Hardware",
    slug: "?category=hardware",
    submenu: [
      { title: "RAK KVM", slug: "rak-kvm" },
      { title: "RAK R5950X", slug: "rk-server-1" },
      { title: "RAK Router", slug: "rak-router-1" }
    ]
  },
  {
    title: "Cloud Services",
    slug: "?category=cloud-services",
    submenu: products.latest
      .filter(p => p.categories
        .map(c => c.slug)
        .includes("cloud-services"))
      .map(p => ({ title: p.name, slug: p.slug }))
  },
]

export const home = () => ({
  featuredServices: [
    products.latest.find(p => p.slug === 'rak-daas'),
    products.latest.find(p => p.slug === 'vps'),
    products.latest.find(p => p.slug === 'shared-hosting'),
  ],
  featuredHardware: [
    products.latest.find(p => p.slug === 'rak-desktop'),
    products.latest.find(p => p.slug === 'rak-kvm'),
    products.latest.find(p => p.slug === 'rk-server-1'),
    products.latest.find(p => p.slug === 'rak-router-1'),
  ],
  featuredProducts: [
    {
      ...products.latest.find(p => p.slug === 'postgresql'),
      description: "Fully managed, scalable hosting for PostgresQL database.",
      img: "https://1000logos.net/wp-content/uploads/2020/08/PostgreSQL-Logo.png"
    },
    {
      ...products.latest.find(p => p.slug === 'mysql'),
      description: "Fully managed, scalable hosting for MySQL database.",
      img: "https://upload.wikimedia.org/wikipedia/fr/thumb/6/62/MySQL.svg/1200px-MySQL.svg.png"
    },
    {
      ...products.latest.find(p => p.slug === 'cockroach-db'),
      description: "Fully managed, scalable hosting for Cockroach database.",
      img: "https://connect.redhat.com/s3api/prod-s3api/1629218071-logo-url-5e9872712989e6a90307acd6.png"
    },
    {
      ...products.latest.find(p => p.slug === 'redis'),
      description: "Fully managed, scalable hosting for Redis datastore.",
      img: "https://upload.wikimedia.org/wikipedia/en/6/6b/Redis_Logo.svg"
    },
    {
      ...products.latest.find(p => p.slug === 'rabbitmq'),
      description: "Fully managed, scalable hosting for RabbitMQ message queuing system.",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/RabbitMQ_logo.svg/2560px-RabbitMQ_logo.svg.png"
    },
    {
      ...products.latest.find(p => p.slug === 'wordpress'),
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
})