export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.error("saveState error", state);
  }
}

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("loadState error");
  }
}

export const saveLangCode = langCode => {
  try {
    localStorage.setItem('langCode', langCode);
  } catch (err) {
    console.error("saveLangCode error", langCode);
  }
}
