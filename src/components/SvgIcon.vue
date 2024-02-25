<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners" />
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
// doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage

import { IsExternal } from '@/utils/validate'
import {computed} from "vue";
import {defineProps} from "vue";

const props=defineProps({
  iconClass: {
    type:String,
    required:true
  },
  className:{
    type:String,
    default:''
  }
})

const isExternal=computed(()=>{
  IsExternal(props.iconClass)
})
const iconName = computed(()=>{
  `#icon-${props.iconClass}`
})
const svgClass = computed(()=>{
   if(props.className){
     return 'svg-icon '+props.className
   }else{
     return 'svg-icon'
   }
})
const styleExternalIcon=computed(()=>({//这里是指返回一个对象，用小括号做区分
  mask: `url(${props.iconClass}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.iconClass}) no-repeat 50% 50%`
}))

</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;/*表示具有最高的优先级*/
  display: inline-block;
}
</style>
