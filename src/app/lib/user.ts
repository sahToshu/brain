export function getUserInitial(fullName: string, username: string): string {
  const source = fullName.trim() || username.trim() || 'G';
  return source.charAt(0).toUpperCase();
}
