import type { Spinner } from '~/types/components/Spinner'

const spinnerRef: Ref<Spinner | null> = ref(null);

export const spinnerController = {
  withSpinner: async (message: string | undefined, run: () => (Promise<void> | void)) => {
    spinnerController.open(message)
    await run()
    spinnerController.close()
  },
  open: (message?: string) => {
    if(spinnerRef.value === null) {
      console.error('spinner 컴포넌트가 등록되어있지 않습니다.')
      return
    }

    spinnerRef.value.open(message)
  },
  close: () => {
    if(spinnerRef.value === null) {
      console.error('spinner 컴포넌트가 등록되어있지 않습니다.')
      return
    }

    spinnerRef.value.close()
  },
  register: (spinner: Spinner) => {
    spinnerRef.value = spinner
  }
}