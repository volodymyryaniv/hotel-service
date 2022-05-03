import { Flat } from '../../../../types';

export type FlatCardProps = Flat & {
  setCenter: (lat: number, lng: number) => void;
  value: string;
  activeId: string;
};
