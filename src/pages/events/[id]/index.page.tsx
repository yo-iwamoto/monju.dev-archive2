import { getServerSideProps } from './index.server';
import type { PageProps } from './index.server';

export { getServerSideProps };

export default function Page({ event }: PageProps) {
  return (
    <>
      <h1>{event.title}</h1>
    </>
  );
}
