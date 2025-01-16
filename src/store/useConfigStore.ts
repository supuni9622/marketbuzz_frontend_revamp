import { create } from 'zustand'

interface Package {
  packageId: string
  name: string
  amount: number
  interval: string
  credits?: number
}

interface Config {
  packages: Package[]
}

interface ConfigStore {
  config: Config | null
  setConfig: (config: Config) => void
}

export const useConfigStore = create<ConfigStore>((set) => ({
  config: null,
  setConfig: (config) => set({ config })
})) 