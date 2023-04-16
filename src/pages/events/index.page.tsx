import { getServerSideProps } from './index.server';
import type { PageProps } from './index.server';

export { getServerSideProps };

export default function Page({ events }: PageProps) {
  return <h1>自分が管理しているイベントの一覧ページ</h1>;
}
