interface ViewProps {
  isLoaded: boolean;
  latitude: number;
  longitude: number;
  getFlat: (id: string) => void;
}

export default ViewProps;
