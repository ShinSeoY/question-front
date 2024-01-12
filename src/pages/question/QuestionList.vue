<script setup>
import { onMounted, ref } from 'vue'

const searchList = ref([
  { display: '고유번호', value: 'questionSeq' },
  { display: '질문', value: 'question' }
])
const questSearchKeyword = ref()
const questSearch = ref()
const questionList = ref([])

const columns = [
  { name: 'questionSeq', label: '고유번호', field: 'questionSeq' },
  { name: 'question', label: '질문', field: 'question' },
  { name: 'difficulty', label: '난이도', field: 'difficulty' },
  { name: 'type', label: '문제유형', field: 'type' },
  { name: 'category', label: '카테고리명', field: 'category' },
  { name: 'isShow', label: '사용 여부', field: 'isShow' }
]
const rows = ref([
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
])

const setData = async (isCache = false) => {
  const dto = {}
  if (questSearch.value.value === 'question') {
    dto.question = questSearchKeyword.value.trim()
  } else if (questSearch.value.value === 'questionSeq' && questSearchKeyword.value.trim() !== '') {
    const temp = Number(questSearchKeyword.value.trim())
    dto.questionSeq = isNaN(temp) ? 0 : temp
  }
  console.log('...dto : ', dto)
  // questionList.value = await findQuestionList(dto)
  questionList.value = [
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
  ]
  await setLowData()
}

const setLowData = async () => {
  rows.value = []

  for (const question of questionList.value) {
    rows.value.push({
      questionSeq: question.questionSeq,
      question: question.question,
      difficulty: question.difficulty,
      type: question.type,
      category: question.category,
      isShow: question.isShow ? '사용' : '미사용'
    })
  }
}
</script>

<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="문제"
      :rows="rows"
      :columns="columns"
      row-key="id"
      binary-state-sort
    >
      <template v-slot:top-right>
        <q-select v-model="questSearch" square outlined :options="searchList" :option-label="(item) => item.display" />
        <q-input v-model="questSearchKeyword" square outlined placeholder="검색어를 입력하시오" />
        <q-btn square outlined color="black" size="lg" @click="setData()" label="검색" />
      </template>
    </q-table>
  </div>
</template>
