<script lang="ts">
  import EditorJS, { type OutputData } from "@editorjs/editorjs";
  import Header from "@editorjs/header";
  import Embed from "@editorjs/embed";
  import List from "@editorjs/list";
  import Checklist from "@editorjs/checklist";
  import Table from "@editorjs/table";

  export let editor: EditorJS | null = null;
  export let data: OutputData = { blocks: [] };
  let editorContainer: HTMLDivElement;

  function initEditor() {
    editor = new EditorJS({
      holder: editorContainer,
      data,
      tools: {
        header: Header,
        embed: Embed,
        list: {
          class: List,
          inlineToolbar: true
        },
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
  class="prose dark:prose-invert bg-gray-50 dark:bg-gray-700"
  style="border-radius: 5px;"
/>
