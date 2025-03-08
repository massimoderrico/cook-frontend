import { ApolloError } from "@apollo/client";

/**
 * Extracts and cleans up error messages from ApolloError and other errors.
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof ApolloError) {
    return error.message; // Removes "ApolloError: " automatically
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred.";
}