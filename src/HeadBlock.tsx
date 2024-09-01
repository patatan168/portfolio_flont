import { Helmet } from 'react-helmet-async';

/** ヘッダー用のプロパティー */
type HeadProps = {
  /** タイトル */
  title?: string;
  /** 説明文 */
  description?: string;
  /** capitalのパス */
  path?: string;
};

export const MainTitle = 'エンジニアのポテト';

/** メタタグの設定 */
const HeadBlock = ({ title, description, path }: HeadProps) => {
  const hostname = window.location.hostname;
  return (
    <Helmet>
      <title>{`${title} | ${MainTitle}` ?? MainTitle}</title>
      <meta name="description" content={description ?? 'デフォルトの説明文です'} />
      <link rel="canonical" href={`https://${hostname}/${path ?? ''}`} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
  );
};

export default HeadBlock;
