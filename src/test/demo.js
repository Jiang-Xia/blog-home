let arr = [
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 }
]
// 递归
// const getChildren = (data, result, pid) => {
//   for (const item of data) {
//     if (item.pid === pid) {
//       const newItem = { ...item, children: [] }
//       result.push(newItem)
//       getChildren(data, newItem.children, item.id)
//     }
//   }
// }

// /**
//  * 转换方法
//  */
// const arrayToTree = (data, pid) => {
//   const result = []
//   getChildren(data, result, pid)
//   return result
// }

// 第二
function arrayToTree(items) {
  const result = [] // 存放结果集
  const itemMap = {} //

  // 先转成map存储
  for (const item of items) {
    itemMap[item.id] = { ...item, children: [] }
  }

  for (const item of items) {
    const id = item.id
    const pid = item.pid
    const treeItem = itemMap[id]
    if (pid === 0) {
      result.push(treeItem)
    } else {
      console.log('pid', pid)
      if (!itemMap[pid]) {
        console.log(pid, '222')
        itemMap[pid] = {
          children: []
        }
      }
      itemMap[pid].children.push(treeItem)
    }
  }
  return result
}

// 最终优化
// function arrayToTree(items) {
//   const result = [] // 存放结果集
//   const itemMap = {} //
//   for (const item of items) {
//     const id = item.id
//     const pid = item.pid

//     if (!itemMap[id]) {
//       itemMap[id] = {
//         children: []
//       }
//     }

//     itemMap[id] = {
//       ...item,
//       children: itemMap[id]['children']
//     }

//     const treeItem = itemMap[id]

//     if (pid === 0) {
//       result.push(treeItem)
//     } else {
//       if (!itemMap[pid]) {
//         itemMap[pid] = {
//           children: []
//         }
//       }
//       itemMap[pid].children.push(treeItem)
//     }
//   }
//   return result
// }

// console.log('========', arrayToTree(arr))
let sum = [1, 2, 3, 4, 5, 6, 7, 8].reduce((a, i) => {
  console.log('========', a, i)

  return a + i
}, 5) //不设置初始值时取数组所以第一个为初始值，迭代器充第二个元素开始执行
// console.log(sum)
// 乘积
let sum2 = [1, 2, 3, 4, 5, 6, 7, 8].reduce((a, i) => a * i, 1)

// console.log(sum2)

// 最大值

let max = [1, 2, 3, 4, 5, 6, 7, 8].reduce((a, i) => {
  console.log('========', a, i)

  return Math.max(a, i)
})
console.log(max)

let data = [
  ['红色', '128g', '苹果手机'],
  ['南北', '两室一厅', '128㎡', '洋房住宅'],
  ['小米', '白色', '智能运动手表', '心率血压血氧', '来电信息提醒'],
  ['官方发售', '2020年秋季', '篮球', '球鞋', '品牌直邮']
]
let dataConcat = data.map((item) => item.reduce((a, i) => `${a} ${i}`))
console.log('========', dataConcat)

// 去重
let array = [1, 2, 3, 'a', 'b', 'c', 1, 2, 3, 'a', 'b', 'c']
array = array.reduce((noDupes, curVal) => {
  if (noDupes.indexOf(curVal) === -1) {
    noDupes.push(curVal)
  }
  return noDupes
}, [])
console.log('========', array)

let obj = [
  { name: '张三', job: '数据分析师', country: '中国' },
  { name: '艾斯', job: '科学家', country: '中国' },
  { name: '雷尔', job: '科学家', country: '美国' },
  { name: '鲍勃', job: '软件工程师', country: '印度' }
]

let objArr = obj.reduce((group, curP) => {
  let newkey = curP['country']
  if (!group[newkey]) {
    group[newkey] = []
  }
  group[newkey].push(curP)
  return group
}, [])
console.log('========', objArr)

const newObj = {
  arrFn: function () {
    console.log(this, 'this')
  },
  aa: 1
}
newObj.arrFn()
