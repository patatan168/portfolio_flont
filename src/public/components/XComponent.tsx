import XIcon from '@mui/icons-material/X';
import { IconButton } from '@mui/material';
import { memo } from 'react';

type XComponentProps = {
  size: 'small' | 'large' | 'inherit' | 'medium';
  tootText: string;
};

const XComponent = memo(function _XComponent({ size, tootText }: XComponentProps) {
  return (
    <IconButton
      href={`https://x.com/intent/tweet?text=${tootText}`}
      target="_blank"
      rel="noopener noreferrer"
      title="Xに共有する"
    >
      <XIcon fontSize={size} />
    </IconButton>
  );
});

export default XComponent;
