<script setup lang="ts">
import Main from '@/components/Layout/Main/index.vue'
import SideBar from '@/components/Layout/SideBar/index.vue'
import CardEssay from '@/components/CardEssay/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import { getAllCategories, getAllTags } from '@/api'
import { Back, FolderOpened, PriceTag } from '@element-plus/icons-vue'
import usePaginationStore from '@/stores/pagination'

const route = useRoute()
const router = useRouter()
const paginationStore = usePaginationStore()

const filterType = computed(() => (route.meta.filterType as 'category' | 'tag') ?? 'category')
const filterId = computed(() => {
  const raw = route.params.id
  return raw != null && raw !== '' ? Number(raw) : undefined
})

const filterName = ref('')

async function resolveName() {
  if (filterId.value == null) {
    filterName.value = ''
    return
  }
  try {
    const list = filterType.value === 'category' ? await getAllCategories() : await getAllTags()
    filterName.value = list.find((item) => item.id === filterId.value)?.name ?? ''
  } catch {
    // 响应拦截器已 ElMessage 提示错误，此处静默
  }
}

// 进入过滤视图或切换条件时回到第 1 页（setup 同步执行，早于 CardEssay 挂载/重挂载）
watch(
  filterId,
  () => {
    paginationStore.articlePagination.current = 1
    resolveName()
  },
  { immediate: true }
)

function goBack() {
  router.push(filterType.value === 'category' ? '/category' : '/tag')
}
</script>

<template>
  <Main is-side-bar>
    <template #content>
      <div class="filter-container">
        <el-divider border-style="dashed" content-position="left">
          <div class="filter-header">
            <el-icon color="#409EFF">
              <FolderOpened v-if="filterType === 'category'" />
              <PriceTag v-else />
            </el-icon>
            <span class="filter-title">
              {{ filterType === 'category' ? '分类' : '标签' }}<template v-if="filterName">：{{ filterName }}</template>
            </span>
            <el-link class="filter-back" :underline="false" type="primary" @click="goBack">
              <el-icon><Back /></el-icon>
              <span class="filter-back-text">返回</span>
            </el-link>
          </div>
        </el-divider>
        <CardEssay
          :key="filterId"
          :category-id="filterType === 'category' ? filterId : undefined"
          :tag-id="filterType === 'tag' ? filterId : undefined"
        />
        <Pagination />
        <div>
          <el-divider border-style="dashed" content-position="center">
            <div style="font-weight: bold">~~到达底部啦~~</div>
          </el-divider>
        </div>
      </div>
    </template>
    <template #information>
      <SideBar />
    </template>
  </Main>
</template>

<style lang="scss" scoped>
.filter-container {
  padding: 1rem;
}

.filter-header {
  display: flex;
  align-items: center;
}

.filter-title {
  margin-left: 5px;
}

.filter-back {
  margin-left: 15px;
  display: inline-flex;
  align-items: center;
  font-size: 0.9rem;

  .filter-back-text {
    margin-left: 2px;
  }
}
</style>
