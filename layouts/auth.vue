<template>
  <div class="flex justify-center">
    <div class="container">
      <Navbar :auth="true" />
      <div class="flex">
        <div class="w-1/5"><Sidebar /></div>
        <div class="w-4/5"><Nuxt /></div>
      </div>
    </div>
  </div>
</template>
