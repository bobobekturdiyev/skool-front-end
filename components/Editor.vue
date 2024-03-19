<template>
  <div class="editor my-6">
    <Editor v-model="useClassroom.module.video_content" editorStyle="height: 320px">
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
import { useClassroomStore } from '@/store';
import Editor from 'primevue/editor';

const useClassroom = useClassroomStore();

const value = ref('<div>Hello World!</div><div>PrimeVue <b>Editor</b> Rocks</div><div><br></div>');
</script>
