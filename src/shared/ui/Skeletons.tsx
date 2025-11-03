import { Box, useTheme } from '@mui/material';
import { keyframes } from '@mui/system';
import React from 'react';

const shimmer = keyframes`
  0%   { background-position: -250% 0; }
  50%  { background-position:   0% 0; }
  100% { background-position: 250% 0; }
`;

export const SkeletonBox: React.FC<{ h: number | string; w?: number | string; br?: number | string }> = ({
  h,
  w = '100%',
  br = 12,
}) => {
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark';
  const a = dark ? '#1b2029' : '#e6ebf3';
  const b = dark ? '#2a3342' : '#f7f9ff';
  const c = dark ? '#1b2029' : '#e6ebf3';

  return (
    <Box
      sx={{
        width: w,
        height: h,
        borderRadius: br,
        background: `linear-gradient(90deg, ${a} 0%, ${b} 50%, ${c} 100%)`,
        backgroundSize: '300% 100%',
        animation: `${shimmer} 1.05s ease-in-out infinite`,
      }}
    />
  );
};

export const ShipCardSkeleton: React.FC = () => (
  <Box
    sx={{
      p: 3,
      borderRadius: 1,
      bgcolor: 'background.default',
      border: '1px solid',
      borderColor: 'divider',
      textAlign: 'center',
    }}
  >
    {/* картинка */}
    <SkeletonBox h={155} br={16} />
    {/* заголовок — по центру */}
    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
      <SkeletonBox h={18} w="60%" />
    </Box>
    {/* подзаголовки: страна и уровень */}
    <Box sx={{ mt: 1.25, display: 'flex', justifyContent: 'space-between', gap: 2 }}>
      <SkeletonBox h={12} w="15%" />
      <SkeletonBox h={12} w="15%" />
    </Box>
    {/* кнопка — по центру */}
    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
      <SkeletonBox h={35} w={102} br={8} />
    </Box>
  </Box>
);

export const DetailsSkeleton: React.FC = () => (
  <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 20 }}>
    <SkeletonBox h="70vh" br={16} />
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <SkeletonBox h={28} w="60%" />
      <SkeletonBox h={12} w="90%" />
      <SkeletonBox h={12} w="85%" />
      <SkeletonBox h={12} w="80%" />
      <SkeletonBox h={12} w="60%" />
      <SkeletonBox h={35} w={140} br={10} />
    </Box>
  </Box>
);
