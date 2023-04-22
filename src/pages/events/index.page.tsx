import { getServerSideProps } from './index.server';
import { AdminEventPage } from '@/components/pages/AdminEventPage';
import type { PageProps } from './index.server';

export { getServerSideProps };

export default function Page(pageProps: PageProps) {
  return <AdminEventPage pageProps={pageProps} />;
}
