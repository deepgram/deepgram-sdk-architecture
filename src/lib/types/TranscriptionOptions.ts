// Definitions for transcription options and related configurations

/**
 * Options for transcription
 */
interface TranscriptionOptions extends Record<string, unknown> {}

interface PrerecordedOptions extends TranscriptionOptions {}

interface LiveOptions extends TranscriptionOptions {}

export type { TranscriptionOptions, PrerecordedOptions, LiveOptions };
