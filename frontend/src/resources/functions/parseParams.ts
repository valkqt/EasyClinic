export function parseParams(params: string | undefined): number {
  if (params !== undefined) {
    const intParams = parseInt(params);

    return intParams;
  }

  return -1;
}
