import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'
// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)//./svg 表示要加载的目录，false 表示不要搜索子目录，/\.svg$/ 是一个正则表达式，表示只加载以 .svg 结尾的文件
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)