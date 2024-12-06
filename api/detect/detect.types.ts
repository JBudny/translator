interface Detect {
  confidence: 100;
  language: "en";
}

export type DetectResponse = Detect[];

export interface FetchDetectState {
  data: DetectResponse | null;
  error: string | null;
  isLoading: boolean;
}

interface FetchDetectProps {
  apiBaseURL?: string;
  onSuccess?: (response: DetectResponse) => void;
}

export type FetchDetect = (props: FetchDetectProps) => Promise<void>;

export type UseFetchDetect = [FetchDetectState, FetchDetect];
