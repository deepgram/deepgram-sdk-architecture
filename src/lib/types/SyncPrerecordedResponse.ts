// Synchronous response structure for prerecorded transcription
// These interfaces define the structure of the response from a synchronous prerecorded transcription request, including various levels of details like alternative transcriptions, detected entities, search hits, topics, and more.

export interface AsyncPrerecordedResponse {}

export interface LiveConfigOptions {}

export enum LiveConnectionState {}
// Connection states

export enum LiveTranscriptionEvents {}
// Events

export type PrerecordedSource = UrlSource | BufferSource | ReadStreamSource;

export interface UrlSource {}

export interface BufferSource {}

export interface ReadStreamSource {}

export interface SyncPrerecordedResponse {}

interface Alternative {}

interface Channel {}

interface Entity {}

interface Hit {}

interface Metadata {}

interface ModelInfo {}

interface Paragraph {}

interface ParagraphGroup {}

interface Result {}

interface Search {}

interface Sentence {}

interface Summary {}

interface TranscriptionSummary {}

interface Topic {}

interface TopicGroup {}

interface Translation {}

interface Utterance {}

interface Warning {}

interface WordBase {}
