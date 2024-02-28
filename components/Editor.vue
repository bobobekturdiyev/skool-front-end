<!-- <template>
  <div class="rounded-[4px] my-6 overflow-hidden border border-[#E0E0E0]">
    <div class="flex items-center gap-4 px-4" v-if="editor">
      <button type="button" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
        <img src="@/assets/svg/editor/h1.svg" alt="" />
      </button>
      <button type="button" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
        <img src="@/assets/svg/editor/h2.svg" alt="" />
      </button>
      <button type="button" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
        <img src="@/assets/svg/editor/h3.svg" alt="" />
      </button>
      <button type="button" @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
        <img src="@/assets/svg/editor/h4.svg" alt="" />
      </button>
      <button type="button" @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
        <img src="@/assets/svg/editor/bold.svg" alt="" />
      </button>
      <button type="button" @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }">
        <img src="@/assets/svg/editor/italic.svg" alt="" />
      </button>
      <button type="button" @click="editor.chain().focus().toggle().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }">
        <img src="@/assets/svg/editor/strikethrough.svg" alt="" />
      </button>
      <button type="button" @click="editor.chain().focus().toggleCode().run()"
        :disabled="!editor.can().chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
        <img src="@/assets/svg/editor/code.svg" alt="" />
      </button>
      <button type="button" @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }">
        <img src="@/assets/svg/editor/ul.svg" alt="" />
      </button>
      <button type="button" @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }">
        <img src="@/assets/svg/editor/ol.svg" alt="" />
      </button>
      <button type="button" @click="editor.chain().focus().toggleBlockquote().run()"
        :class="{ 'is-active': editor.isActive('blockquote') }">
        <img src="@/assets/svg/editor/blockquote.svg" alt="" />
      </button>
      <button type="button" @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ 'is-active': editor.isActive('codeBlock') }">
        <img src="@/assets/svg/editor/codeblock.svg" alt="" />
      </button>
      <button type="button" @click="editor.chain().focus().toggleBlockquote().run()"
        :class="{ 'is-active': editor.isActive('blockquote') }">
        <img src="@/assets/svg/editor/upload.svg" alt="" />
      </button>
      <button type="button" @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }">
        <img src="@/assets/svg/editor/link.svg" alt="" />
      </button>
      <button type="button" @click="editor.chain().focus().setHorizontalRule().run()">
        <img src="@/assets/svg/editor/horizontal_rule.svg" alt="" />
      </button>
    </div>
    <TiptapEditorContent id="editor_content" @input="handleEditor" class="h-[160px]" :editor="editor" />
  </div>
</template>

<script setup>
import { useClassroomStore } from "@/store"

const useClassroom = useClassroomStore();

const editor = useEditor({
  content: "<p>I'm running Tiptap with Vue.js. 🎉 </p>",
  extensions: [TiptapStarterKit],
});

function handleEditor(e) {
  const data = document.getElementById('editor_content')?.querySelector('div').innerHTML;
  console.log(data)
}
</script> -->
<template>
  <div class="editor my-6">
    <Editor v-model="value" editorStyle="height: 320px">
      <template v-slot:toolbar>
        <div class="ql-formats">
          <button v-tooltip.bottom="'header 1'" class="h1 ql-header" :value="'1'"></button>
          <button v-tooltip.bottom="'header 2'" class="h2 ql-header" :value="'2'"></button>
          <button v-tooltip.bottom="'header 3'" class="ql-header" :value="'3'">
            <img src="@/assets/svg/editor/h3.svg" alt="" />
          </button>
          <button v-tooltip.bottom="'header 4'" class="ql-header" :value="'4'">
            <img src="@/assets/svg/editor/h4.svg" alt="" />
          </button>
          <button v-tooltip.bottom="'Bold'" class="ql-bold"></button>
          <button v-tooltip.bottom="'Italic'" class="ql-italic"></button>
          <button v-tooltip.bottom="'Strikethrough'" class="ql-strike"></button>
          <!-- <button v-tooltip.bottom="'Underline'" class="ql-underline"></button> -->
          <button v-tooltip.bottom="'Code'" class="ql-code"></button>
          <button v-tooltip.bottom="'Ordered List'" id="ql-ol" class="ql-list" :value="'ordered'">OL</button>
          <button v-tooltip.bottom="'Unordered List'" id="ql-ul" class="ql-list" :value="'bullet'">UL</button>
          <button v-tooltip.bottom="'Blockquote'" class="ql-blockquote">Blockquote</button>
          <button v-tooltip.bottom="'Code Block'" class="ql-code-block">Code Block</button>
          <button v-tooltip.bottom="'Upload Image'" class="ql-image">Upload Image</button>
          <button v-tooltip.bottom="'Insert Link'" class="ql-link">Link</button>
          <!-- <button v-tooltip.bottom="'Insert Horizontal Rule'" class="ql-divider">Horizontal Rule</button> -->
        </div>
      </template>
    </Editor>
  </div>
</template>

<script setup>
import Editor from 'primevue/editor';

const value = ref('<div>Hello World!</div><div>PrimeVue <b>Editor</b> Rocks</div><div><br></div>');
</script>
