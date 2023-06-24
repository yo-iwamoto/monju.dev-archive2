export const paths = {
  top: '/' as const,
  event: {
    index: '/events' as const,
    detail: (id: string) => `/event/${id}` as const,
    edit: (id: string) => `/event/${id}/edit` as const,
  },
};
