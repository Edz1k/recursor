<script setup lang="ts">
const router = useRouter()
const route = useRoute('/hi/[name]')
const { savedName, otherNames, setNewName } = useUser()

watchEffect(() => {
  setNewName(route.params.name)
})
useHead({
  title: () => `Hi, ${savedName.value}!`,
})
</script>

<template>
  <div>
    <div text-4xl>
      <div i-carbon-pedestrian inline-block />
    </div>
    <p>
      Hi, {{ savedName }}!
    </p>

    <p text-sm opacity-75>
      <em>Demo of dynamic route</em>
    </p>

    <template v-if="otherNames.length">
      <div mt-4 text-sm>
        <span opacity-75>Also known as:</span>
        <ul>
          <li v-for="otherName in otherNames" :key="otherName">
            <RouterLink :to="`/hi/${otherName}`" replace>
              {{ otherName }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </template>

    <div>
      <button
        m="3 t6" btn text-sm
        @click="router.back()"
      >
        Back
      </button>
    </div>
  </div>
</template>
