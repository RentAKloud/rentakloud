<script lang="ts">
  import { goto } from "$app/navigation";
  import { Http } from "$lib/http";
  import { Category } from "$lib/types/common";
  import Form from "../_form.svelte";

  let category = new Category();

  async function onSubmit(data: Category) {
    const { result } = await Http.post<Category>(`/categories`, data);
    if (result) {
      goto("/categories");
    }
  }
</script>

<Form {category} {onSubmit} />
