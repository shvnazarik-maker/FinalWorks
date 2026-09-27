const DEFAULT_IMAGES_URL = 'https://frontend53.somee.com/images/users/';

export const getImagesUrl = () =>
  import.meta.env.VITE_IMAGES_URL || DEFAULT_IMAGES_URL;

export function normalizeUserImage(value) {
  if (!value || typeof value !== 'string') return null;

  const image = value.trim();
  if (!image || image.startsWith('blob:')) return null;

  if (image.startsWith('data:')) return image;
  if (/^https?:\/\//i.test(image)) return image;

  const base = getImagesUrl();
  if (image.startsWith('/')) {
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://frontend53.somee.com';
      return new URL(image, apiUrl).toString();
    } catch {
      return image;
    }
  }

  return `${base.replace(/\/$/, '')}/${image.replace(/^\//, '')}`;
}

export function getUserImage(payload) {
  if (typeof payload === 'string') return normalizeUserImage(payload);
  if (!payload || typeof payload !== 'object') return null;

  return normalizeUserImage(
    payload.image ??
    payload.avatar ??
    payload.photo ??
    payload.url ??
    null
  );
}
