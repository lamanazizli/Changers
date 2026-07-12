'use client';
import { useDevice } from './DeviceProvider';

export default function useIsMobile() {
  const { isMobile } = useDevice();
  return isMobile;
}
