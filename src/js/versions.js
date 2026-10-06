const BASE_URL =
  'https://cdn.jsdelivr.net/gh/guyanon0265/duckmod-addon@main/releases/';
const VERSIONS_URL = BASE_URL + 'versions.json';

const fileName = (v) => 'duckmod-addon-' + v.version + '.mcaddon';
const downloadUrl = (v) => BASE_URL + 'v' + v.version + '/' + fileName(v);

async function loadVersions() {
  const response = await fetch(VERSIONS_URL);
  if (!response.ok) {
    throw new Error('Version list request failed: ' + response.status);
  }
  const versions = await response.json();
  if (!Array.isArray(versions) || versions.length === 0) {
    throw new Error('Version list is empty or malformed');
  }
  return versions;
}

export async function initVersions() {
  const select = document.getElementById('version');
  const link = document.getElementById('download');
  const requirement = document.getElementById('requirement');
  if (!select || !link || !requirement) return;

  select.add(new Option('Loading…', ''));
  select.disabled = true;
  link.removeAttribute('href');
  link.setAttribute('aria-disabled', 'true');

  let versions;
  try {
    versions = await loadVersions();
  } catch (error) {
    console.error(error);
    select.options[0].text = 'Unavailable';
    requirement.textContent =
      'Versions could not be loaded. Please try again later.';
    return;
  }

  select.length = 0;
  versions.forEach((v, i) => select.add(new Option(v.label, i)));
  select.disabled = false;
  link.removeAttribute('aria-disabled');

  function update() {
    const v = versions[select.value];
    link.href = downloadUrl(v);
    link.setAttribute('download', fileName(v));
    requirement.textContent = v.mc ? 'Requires Minecraft ' + v.mc : '';
  }

  select.addEventListener('change', update);
  update();
}
