import { getServerSideProps } from './index.server';
import type { PageProps } from './index.server';

export { getServerSideProps };

export default function Page({ event }: PageProps) {
  console.log({ event });
  return <div>Page</div>;
}
