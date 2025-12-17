

const STORAGE_KEY = "submittedNames";


export function canSubmit(fullName) {
  if (!fullName.trim()) return false;

  const names = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  return !names.includes(fullName.trim());
}

export function addSubmittedName(fullName) {
  if (!fullName.trim()) return;

  const names = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  if (!names.includes(fullName.trim())) {
    names.push(fullName.trim());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(names));
  }
}

export function trySubmit(fullName) {
  if (canSubmit(fullName)) {
    addSubmittedName(fullName);
    return true;
  }
  return false;
}
