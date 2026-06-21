<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isEdit = !!route.params.id

const form = ref({
  title: '',
  content: '',
  categoryId: '',
  tags: [],
  summary: '',
  cover: ''
})

const handleSubmit = () => {
  console.log('submit', form.value)
  router.push('/article')
}
</script>

<template>
  <div class="article-edit">
    <el-card>
      <template #header>
        <span>{{ isEdit ? '编辑文章' : '创建文章' }}</span>
      </template>

      <el-form :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title" placeholder="请输入文章标题" />
        </el-form-item>
        <el-form-item label="摘要">
          <el-input v-model="form.summary" type="textarea" placeholder="请输入文章摘要" />
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="form.categoryId" placeholder="请选择分类">
            <el-option label="技术" value="1" />
            <el-option label="生活" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="form.content" type="textarea" :rows="10" placeholder="请输入文章内容" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
          <el-button @click="router.push('/article')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.article-edit {
  max-width: 800px;
}
</style>