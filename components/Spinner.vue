<template>
  <div :class="`animate-spin spinner ${spinnerSize}`"></div>
</template>

<script>
export default {
    props : {
        spinnerSize : {
            default : 'spinner-md'
        }
    }
};
</script>

<style scoped>
.spinner-2xl {
  height: 60px;
  width: 60px;
  border-width: 2px;
}
.spinner-xl {
  height: 50px;
  width: 50px;
  border-width: 2px;
}
.spinner-lg {
  height: 40px;
  width: 40px;
  border-width: 3px;
}
.spinner-md {
  height: 35px;
  width: 35px;
  border-width: 5px;
}
.spinner-sm {
  height: 30px;
  width: 30px;
}

.spinner-sm {
  height: 25px;
  width: 25px;
}
.spinner {
  border-color: rgb(75, 75, 75);
  border-top-color: transparent;
  border-radius: 50%;
}
</style>
