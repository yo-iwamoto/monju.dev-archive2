export const pagesPath = {
  "auth": {
    $url: (url?: { hash?: string }) => ({ pathname: '/auth' as const, hash: url?.hash })
  },
  "events": {
    _id: (id: string | number) => ({
      "edit": {
        $url: (url?: { hash?: string }) => ({ pathname: '/events/[id]/edit' as const, query: { id }, hash: url?.hash })
      },
      $url: (url?: { hash?: string }) => ({ pathname: '/events/[id]' as const, query: { id }, hash: url?.hash })
    }),
    $url: (url?: { hash?: string }) => ({ pathname: '/events' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath

export const staticPath = {
  _gitkeep: '/.gitkeep',
  img: {
    info_svg: '/img/info.svg'
  }
} as const

export type StaticPath = typeof staticPath
