const savedName = ref('')
const previousNames = ref(new Set<string>())

const otherNames = computed(() =>
  Array.from(previousNames.value).filter(name => name !== savedName.value),
)

function setNewName(name: string) {
  if (savedName.value)
    previousNames.value.add(savedName.value)
  savedName.value = name
}

export function useUser() {
  return { savedName, otherNames, setNewName }
}
