const BASE_URL =
  'https://cdn.jsdelivr.net/gh/guyanon0265/duckmod-addon@main/releases/';
const VERSIONS = [{ label: 'v1.0.0 (latest)', version: '1.0.0', mc: '26.50+' }];

const fileName = (v) => 'duckmod-addon-' + v.version + '.mcaddon';
const downloadUrl = (v) => BASE_URL + 'v' + v.version + '/' + fileName(v);

export function initVersions() {
  const select = document.getElementById('version');
  const link = document.getElementById('download');
  const requirement = document.getElementById('requirement');
  if (!select || !link || !requirement) return;

  VERSIONS.forEach((v, i) => select.add(new Option(v.label, i)));

  function update() {
    const v = VERSIONS[select.value];
    link.href = downloadUrl(v);
    link.setAttribute('download', fileName(v));
    requirement.textContent = v.mc ? 'Requires Minecraft ' + v.mc : '';
  }

  select.addEventListener('change', update);
  update();
}
