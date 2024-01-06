<script lang="ts">
  import { goto } from "$app/navigation";
  import { Http } from "$lib/http";
  import { Product } from "$lib/types";
  import Form from "../_form.svelte";

  let product: Product = new Product();

  async function create(product: Product) {
    const { result } = await Http.post<Product>(`/products`, product);
    if (result) {
      goto("/products");
    }
  }
</script>

<Form {product} onSubmit={create} />
