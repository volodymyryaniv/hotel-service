import type { HookReturn } from 'use-places-autocomplete';

export type FilterProp = HookReturn & {
  filterList: (el: string) => void;
  getByCity: (city: string) => void;
  getByInput: (city: string) => void;
  isLoaded: boolean;
};
