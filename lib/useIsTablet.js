'use client';
import { useDevice } from './DeviceProvider';

export default function useIsTablet() {
  const { isTablet } = useDevice();
  return isTablet;
}
