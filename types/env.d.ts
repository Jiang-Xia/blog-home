interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly MODE: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
