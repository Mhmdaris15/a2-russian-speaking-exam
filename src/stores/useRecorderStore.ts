import { create } from 'zustand';

interface RecorderState {
  isRecording: boolean;
  audioUrl: string | null;
  duration: number;
  mediaRecorder: MediaRecorder | null;

  startRecording: () => Promise<void>;
  stopRecording: () => void;
  clearRecording: () => void;
}

export const useRecorderStore = create<RecorderState>((set, get) => ({
  isRecording: false,
  audioUrl: null,
  duration: 0,
  mediaRecorder: null,

  startRecording: async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];
      const startTime = Date.now();

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        const elapsed = Math.round((Date.now() - startTime) / 1000);
        stream.getTracks().forEach((t) => t.stop());
        set({ audioUrl: url, duration: elapsed, isRecording: false, mediaRecorder: null });
      };

      recorder.start();
      set({ isRecording: true, mediaRecorder: recorder, audioUrl: null, duration: 0 });
    } catch {
      console.error('Microphone access denied');
    }
  },

  stopRecording: () => {
    const { mediaRecorder } = get();
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
    }
  },

  clearRecording: () => {
    const { audioUrl } = get();
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    set({ audioUrl: null, duration: 0 });
  },
}));
