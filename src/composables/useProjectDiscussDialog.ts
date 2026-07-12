export function useProjectDiscussDialog() {
  const isDiscussOpen = shallowRef(false)

  function openDiscussDialog() {
    isDiscussOpen.value = true
  }

  return {
    isDiscussOpen,
    openDiscussDialog,
  }
}
