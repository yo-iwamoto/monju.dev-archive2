type Props = {
  imageUrl: string;
};

export const UserIcon = ({ imageUrl }: Props) => {
  return (
    <button type='button' aria-label='ユーザーメニューを開く'>
      <img src={imageUrl} />
    </button>
  );
};
