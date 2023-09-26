<script lang="ts">
  import {
    Chart,
    Card,
    A,
    Button,
    Dropdown,
    DropdownItem,
  } from "flowbite-svelte";
  import { ChevronRightSolid, ChevronDownSolid } from "flowbite-svelte-icons";

  let options: ApexCharts.ApexOptions = {
    chart: {
      height: "100%",
      type: "area",
      fontFamily: "Inter, sans-serif",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#1C64F2",
        gradientToColors: ["#1C64F2"],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: 0,
      },
    },
    series: [
      {
        name: "New users",
        data: [6500, 6418, 6456, 6526, 6356, 6456],
        color: "#1A56DB",
      },
    ],
    xaxis: {
      categories: [
        "01 February",
        "02 February",
        "03 February",
        "04 February",
        "05 February",
        "06 February",
        "07 February",
      ],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  };

  import { UserGroupSolid, ArrowUpSolid } from "flowbite-svelte-icons";

  const optionsColumn: ApexCharts.ApexOptions = {
    colors: ["#1A56DB", "#FDBA8C"],
    series: [
      {
        name: "Organic",
        color: "#1A56DB",
        data: [
          { x: "Mon", y: 231 },
          { x: "Tue", y: 122 },
          { x: "Wed", y: 63 },
          { x: "Thu", y: 421 },
          { x: "Fri", y: 122 },
          { x: "Sat", y: 323 },
          { x: "Sun", y: 111 },
        ],
      },
      {
        name: "Social media",
        color: "#FDBA8C",
        data: [
          { x: "Mon", y: 232 },
          { x: "Tue", y: 113 },
          { x: "Wed", y: 341 },
          { x: "Thu", y: 224 },
          { x: "Fri", y: 522 },
          { x: "Sat", y: 411 },
          { x: "Sun", y: 243 },
        ],
      },
    ],
    chart: {
      type: "bar",
      height: "320px",
      fontFamily: "Inter, sans-serif",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "70%",
        borderRadiusApplication: "end",
        borderRadius: 8,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      style: {
        fontFamily: "Inter, sans-serif",
      },
    },
    states: {
      hover: {
        filter: {
          type: "darken",
          value: 1,
        },
      },
    },
    stroke: {
      show: true,
      width: 0,
      colors: ["transparent"],
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -14,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      floating: false,
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    fill: {
      opacity: 1,
    },
  };

  import { Popover } from "flowbite-svelte";
  import {
    InfoCircleSolid,
    PenSolid,
    DownloadSolid,
    ShareNodesSolid,
    TrashBinSolid,
    DotsHorizontalOutline,
  } from "flowbite-svelte-icons";

  const optionsPie: ApexCharts.ApexOptions = {
    series: [52.8, 26.8, 20.4],
    colors: ["#1C64F2", "#16BDCA", "#9061F9"],
    chart: {
      height: 420,
      width: "100%",
      type: "pie",
    },
    stroke: {
      colors: ["white"],
      lineCap: "butt",
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -25,
        },
      },
    },
    labels: ["Direct", "Organic search", "Referrals"],
    dataLabels: {
      enabled: true,
      style: {
        fontFamily: "Inter, sans-serif",
      },
    },
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value + "%";
        },
      },
    },
    xaxis: {
      labels: {
        formatter: function (value) {
          return value + "%";
        },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
  };
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
  <Card>
    <div class="flex justify-between">
      <div>
        <h5
          class="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2"
        >
          32.4k
        </h5>
        <p class="text-base font-normal text-gray-500 dark:text-gray-400">
          Users this week
        </p>
      </div>
      <div
        class="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center"
      >
        12%
        <ChevronRightSolid class="w-3 h-3 ml-1" />
      </div>
    </div>
    <Chart {options} />
    <div
      class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between"
    >
      <div class="flex justify-between items-center pt-5">
        <Button
          class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent focus:ring-transparent dark:focus:ring-transparent py-0"
          >Last 7 days<ChevronDownSolid class="w-2.5 m-2.5 ml-1.5" /></Button
        >
        <Dropdown class="w-40" offset={-6}>
          <DropdownItem>Yesterday</DropdownItem>
          <DropdownItem>Today</DropdownItem>
          <DropdownItem>Last 7 days</DropdownItem>
          <DropdownItem>Last 30 days</DropdownItem>
          <DropdownItem>Last 90 days</DropdownItem>
        </Dropdown>
        <A
          href="/"
          class="uppercase text-sm font-semibold hover:text-primary-700 dark:hover:text-primary-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2 hover:no-underline"
        >
          Users Report
          <ChevronRightSolid class="w-2.5 h-2.5 ml-1.5" />
        </A>
      </div>
    </div>
  </Card>

  <Card>
    <div
      class="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700"
    >
      <div class="flex items-center">
        <div
          class="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-3"
        >
          <UserGroupSolid class="w-6 h-6 text-gray-500 dark:text-gray-400" />
        </div>
        <div>
          <h5
            class="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-1"
          >
            3.4k
          </h5>
          <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
            Leads generated per week
          </p>
        </div>
      </div>
      <div>
        <span
          class="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300"
        >
          <ArrowUpSolid class="w-2.5 h-2.5 mr-1.5" />
          42.5%
        </span>
      </div>
    </div>
    <div class="grid grid-cols-2">
      <dl class="flex items-center">
        <dt class="text-gray-500 dark:text-gray-400 text-sm font-normal mr-1">
          Money spent:
        </dt>
        <dd class="text-gray-900 text-sm dark:text-white font-semibold">
          $3,232
        </dd>
      </dl>
      <dl class="flex items-center justify-end">
        <dt class="text-gray-500 dark:text-gray-400 text-sm font-normal mr-1">
          Conversion rate:
        </dt>
        <dd class="text-gray-900 text-sm dark:text-white font-semibold">
          1.2%
        </dd>
      </dl>
    </div>
    <Chart options={optionsColumn} />
    <div
      class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between"
    >
      <div class="flex justify-between items-center pt-5">
        <Button
          class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent focus:ring-transparent dark:focus:ring-transparent py-0"
          >Last 7 days<ChevronDownSolid class="w-2.5 m-2.5 ml-1.5" /></Button
        >
        <Dropdown class="w-40" offset={-6}>
          <DropdownItem>Yesterday</DropdownItem>
          <DropdownItem>Today</DropdownItem>
          <DropdownItem>Last 7 days</DropdownItem>
          <DropdownItem>Last 30 days</DropdownItem>
          <DropdownItem>Last 90 days</DropdownItem>
        </Dropdown>
        <A
          href="/"
          class="uppercase text-sm font-semibold hover:text-primary-700 dark:hover:text-primary-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2 hover:no-underline"
        >
          Leads Report
          <ChevronRightSolid class="w-2.5 h-2.5 ml-1.5" />
        </A>
      </div>
    </div>
  </Card>

  <Card>
    <div class="flex justify-between items-start w-full">
      <div class="flex-col items-center">
        <div class="flex items-center mb-1">
          <h5
            class="text-xl font-bold leading-none text-gray-900 dark:text-white mr-1"
          >
            Website traffic
          </h5>
          <InfoCircleSolid
            id="pie1"
            class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ml-1"
          />
          <Popover
            triggeredBy="#pie1"
            class="text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 z-10"
          >
            <div class="p-3 space-y-2">
              <h3 class="font-semibold text-gray-900 dark:text-white">
                Activity growth - Incremental
              </h3>
              <p>
                Report helps navigate cumulative growth of community activities.
                Ideally, the chart should have a growing trend, as stagnating
                chart signifies a significant decrease of community activity.
              </p>
              <h3 class="font-semibold text-gray-900 dark:text-white">
                Calculation
              </h3>
              <p>
                For each date bucket, the all-time volume of activities is
                calculated. This means that activities in period n contain all
                activities up to period n, plus the activities generated by your
                community in period.
              </p>
              <A href="/"
                >Read more <ChevronRightSolid class="w-2 h-2 ml-1.5" /></A
              >
            </div>
          </Popover>
        </div>
      </div>
      <div class="flex justify-end items-center">
        <DotsHorizontalOutline
          id="dots-menu"
          class="dots-menu dark:text-white"
        />
        <Dropdown triggeredBy="#dots-menu" class="w-44" offset={-6}>
          <DropdownItem
            ><PenSolid class="inline w-3 h-3 mr-2" /> Edit widget</DropdownItem
          >
          <DropdownItem
            ><DownloadSolid class="inline w-3 h-3 mr-2" />Dropdown data</DropdownItem
          >
          <DropdownItem
            ><ShareNodesSolid class="inline w-3 h-3 mr-2" />Add to repository</DropdownItem
          >
          <DropdownItem
            ><TrashBinSolid class="inline w-3 h-3 mr-2" />Delete widget</DropdownItem
          >
        </Dropdown>
      </div>
    </div>

    <Chart options={optionsPie} class="py-6" />

    <div
      class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between"
    >
      <div class="flex justify-between items-center pt-5">
        <Button
          class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent focus:ring-transparent dark:focus:ring-transparent py-0"
          >Last 7 days<ChevronDownSolid class="w-2.5 m-2.5 ml-1.5" /></Button
        >
        <Dropdown class="w-40" offset={-6}>
          <DropdownItem>Yesterday</DropdownItem>
          <DropdownItem>Today</DropdownItem>
          <DropdownItem>Last 7 days</DropdownItem>
          <DropdownItem>Last 30 days</DropdownItem>
          <DropdownItem>Last 90 days</DropdownItem>
        </Dropdown>
        <A
          href="/"
          class="uppercase text-sm font-semibold hover:text-primary-700 dark:hover:text-primary-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2 hover:no-underline"
        >
          Traffic analysis
          <ChevronRightSolid class="w-2.5 h-2.5 ml-1.5" />
        </A>
      </div>
    </div>
  </Card>
</div>
