/**
 * DateTimes in the SmoothIntegration API are always represented as
 *  ISO8601 UTC DateTime strings with milliseconds precision.
 *  @example "2024-03-22T04:44:01.721Z"
 */
export type DateTime = string;

/**
 * Identifiers in the SmoothIntegration API are always represented as
 * UUID strings in lowercase.
 * @example "1a1a1a1a-1a1a-1a1a-1a1a-1a1a1a1a1a1a"
 */
export type Id = string;
