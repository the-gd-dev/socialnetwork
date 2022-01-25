<template>
  <div
    :style="{
        height: height+'px',
        background: 'linear-gradient(90deg, transparent, ' + color + ', transparent)'
    }"
  ></div>
</template>
<script>
export default {
    props : {
        height : {
            default : 2
        },
        color : {
            default : 'rgb(65, 65, 65)'
        }
    }
}
</script>