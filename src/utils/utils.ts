export const extractDatesFromContent = (content: string) => {
  // eslint-disable-next-line max-len
  const dateRegex = /\b\d{1,2}\/\d{1,2}\/\d{4}\b|\b\d{4}-\d{2}-\d{2}\b|\b\d{2}\.\d{2}\.\d{4}\b/g;

  return content.match(dateRegex) || [];
};
