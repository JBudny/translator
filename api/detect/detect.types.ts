interface Detect {
  confidence: number;
  language: string;
}

export type DetectResponse = Detect[];

export interface FetchDetectState {
  data: DetectResponse | null;
  error: string | null;
  isLoading: boolean;
}

export interface FetchDetectProps {
  apiBaseURL?: string;
  apiKey?: string;
  onSuccess?: (response: DetectResponse) => void;
  q?: string;
}

export type FetchDetect = (props: FetchDetectProps) => Promise<void>;

export type UseFetchDetect = [FetchDetectState, FetchDetect];
