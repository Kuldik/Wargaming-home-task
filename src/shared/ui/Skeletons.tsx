import { Box } from '@mui/material';
import React from 'react';
import s from '../../shared/styles/common/CommonUI.module.scss';

export const SkeletonBox: React.FC<{ h: number | string; w?: number | string; br?: number | string }> = ({
  h,
  w = '100%',
  br = 12,
}) => {
  return (
    <Box
      className={s.skBox}
      style={{ width: w, height: h, borderRadius: typeof br === 'number' ? `${br}px` : br }}
    />
  );
};

export const ShipCardSkeleton: React.FC = () => (
  <Box className={s.cardSkeleton}>
    {/* картинка */}
    <SkeletonBox h={155} br={16} />

    {/* заголовок — по центру */}
    <Box className={`${s.mt2} ${s.center}`}>
      <SkeletonBox h={18} w="60%" />
    </Box>

    {/* подзаголовки: страна и уровень */}
    <Box className={`${s.mt125} ${s.rowBetween}`}>
      <SkeletonBox h={12} w="15%" />
      <SkeletonBox h={12} w="15%" />
    </Box>

    {/* кнопка — по центру */}
    <Box className={`${s.mt2} ${s.center}`}>
      <SkeletonBox h={35} w={102} br={8} />
    </Box>
  </Box>
);