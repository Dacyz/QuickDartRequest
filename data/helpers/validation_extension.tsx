const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

function getContentType(content: string): number {
  if (content.includes("application/json")) {
    return 1;
  } else if (content.includes("image/")) {
    return 2;
  } else if (content.includes("video/")) {
    return 3;
  }
  return 0;
}

export { regex, getContentType };
