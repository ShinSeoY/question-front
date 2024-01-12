<script setup>
import { computed, ref } from 'vue'

const columns = [
      { name: 'questionSeq', label: '고유번호', field: 'questionSeq' },
      { name: 'question', label: '질문', field: 'question' },
      { name: 'difficulty', label: '난이도', field: 'difficulty' },
      { name: 'type', label: '문제유형', field: 'type' },
      { name: 'category', label: '카테고리명', field: 'category' },
      { name: 'isShow', label: '사용 여부', field: 'isShow' }
    ];

    const rows = [
      {
        questionSeq: 1,
        question: '질문1',
        difficulty: 1,
        type: 'CHOICE',
        category: 'Oracle',
        isShow: true ? '사용' : '미사용'
      },
      {
        questionSeq: 2,
        question: '질문2',
        difficulty: 2,
        type: 'CHOICE',
        category: '알고리즘',
        isShow: true ? '사용' : '미사용'
      },
      {
        questionSeq: 3,
        question: '질문3',
        difficulty: 3,
        type: 'CHOICE',
        category: '자바',
        isShow: true ? '사용' : '미사용'
      },
      {
        questionSeq: 4,
        question: '질문4',
        difficulty: 1,
        type: 'CHOICE',
        category: '자바스크립트',
        isShow: true ? '사용' : '미사용'
      },
      {
        questionSeq: 5,
        question: '질문5',
        difficulty: 1,
        type: 'CHOICE',
        category: '타입스크립트',
        isShow: true ? '사용' : '미사용'
      },
      {
        questionSeq: 6,
        question: '질문6',
        difficulty: 1,
        type: 'CHOICE',
        category: 'MySql',
        isShow: true ? '사용' : '미사용'
      }
    ];

</script>

<template>
  <div class="q-pa-md">
    <q-table
      title="문제"
      :rows="rows"
      :columns="columns"
      row-key="name"
    />
  </div>
</template>
