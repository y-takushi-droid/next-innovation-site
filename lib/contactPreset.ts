export type ContactPreset = {
  subject: string;
  detail: string;
};

export function setContactPreset(preset: ContactPreset) {
  sessionStorage.setItem('contactPreset', JSON.stringify(preset));
}

export function getAndClearContactPreset(): ContactPreset | null {
  const raw = sessionStorage.getItem('contactPreset');
  if (!raw) return null;
  sessionStorage.removeItem('contactPreset');
  try {
    return JSON.parse(raw) as ContactPreset;
  } catch {
    return null;
  }
}
