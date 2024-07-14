<script lang="ts">
  import { Card } from "flowbite-svelte";
  import AreaChart from "./_area_chart.svelte";
  import ColumnChart from "./_column_chart.svelte";
  import PieChart from "./users/_pie_chart.svelte";
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
  <Card>
    <AreaChart />
  </Card>

  <Card>
    <ColumnChart />
  </Card>

  <Card>
    <PieChart />
  </Card>
</div>
