<script lang="ts">
  import EditorJS, { type OutputData } from "@editorjs/editorjs";
  import Header from "@editorjs/header";
  import Embed from "@editorjs/embed";
  import List from "@editorjs/list";
  import Checklist from "@editorjs/checklist";
  import Table from "@editorjs/table";

  export let data: OutputData = { blocks: [] };
  let editorContainer: HTMLDivElement;

  function initEditor() {
    const editor = new EditorJS({
      holder: editorContainer,
      data,
      tools: {
        header: Header,
        embed: Embed,
        list: List,
        checklist: Checklist,
        table: Table,
      },
    });
  }

  $: if (editorContainer) {
    initEditor();
  }
</script>

<div
  bind:this={editorContainer}
  class="editor-container bg-gray-50 dark:text-white dark:bg-gray-700"
  style="border-radius: 5px;"
/>
