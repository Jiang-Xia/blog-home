import { ref } from 'vue'
import api from '@/api/index'

// 分类
const categoryOptions = ref([])
// 标签
const tagsOptions = ref([])
const getOptions = async (type: string) => {
  if (type === '分类') {
    const res = await api.getAllCategory()
    categoryOptions.value = res.map((v: any) => {
      v.value = v.id
      return v
    })
    // console.log(res)
  } else {
    const res = await api.getAllTag()
    tagsOptions.value = res.map((v: any) => {
      v.value = v.id
      v.checked = false
      return v
    })
  }
}
const colors: string[] = [
  '#4ea397',
  '#22c3aa',
  '#7bd9a5',
  '#d0648a',
  '#f58db2',
  '#f2b3c9',
  // dark
  '#dd6b66',
  '#759aa0',
  '#e69d87',
  '#8dc1a9',
  '#ea7e53',
  '#73a373',
  '#73b9bc',
  '#7289ab',
  '#91ca8c',
  '#f49f42'
]
// 随机获取一种颜色
const getRandomClor = () => {
  const index = Math.floor(Math.random() * colors.length)
  return colors[index]
}
export { categoryOptions, tagsOptions, getOptions, colors, getRandomClor }
