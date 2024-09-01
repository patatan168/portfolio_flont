import { CircularProgress, Grid2, Stack, Toolbar } from '@mui/material';
import { Suspense, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';

type ContextType = {
  setLeftContent: React.Dispatch<React.SetStateAction<JSX.Element>>;
  setRightContent: React.Dispatch<React.SetStateAction<JSX.Element>>;
};

/**
 * メニューをセットする
 * @param useSideContents.setLeftContents 左メニュー
 * @param useSideContents.setRightContents 右メニュー
 */
// eslint-disable-next-line react-refresh/only-export-components
export const useSideContents = () => {
  return useOutletContext<ContextType>();
};

/** SideContents Types */
type SideContentsProps = {
  children: JSX.Element;
};

/**
 * サイドコンテンツ
 * @param props.children サイドコンテンツーのJSX
 */
const SideContents = ({ children }: SideContentsProps) => {
  return (
    <Grid2
      size={{ xs: 0, sm: 0, md: 0, lg: 3, xl: 3 }}
      sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' } }}
    >
      {children}
    </Grid2>
  );
};

/** ページごとのコンテンツを表示 */
const MainContents = () => {
  const [leftContents, setLeftContent] = useState<JSX.Element>(<></>);
  const [rightContents, setRightContent] = useState<JSX.Element>(<></>);

  return (
    <Stack component="div" sx={{ marginInline: 'auto' }}>
      <Toolbar />
      <Grid2
        columns={16}
        direction="row"
        container
        justifyContent="center"
        alignItems="flex-start"
        sx={{ my: 2 }}
      >
        <Suspense fallback={<CircularProgress sx={{ justifyContent: 'center' }} />}>
          <SideContents children={leftContents} />
          <Grid2 size={{ xs: 15, sm: 15, md: 15, lg: 10, xl: 10 }}>
            <Outlet context={{ setLeftContent, setRightContent } satisfies ContextType} />
          </Grid2>
          <SideContents children={rightContents} />
        </Suspense>
      </Grid2>
    </Stack>
  );
};

export default MainContents;
