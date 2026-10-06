/* Bedrock card: version dropdown -> jsDelivr .mcaddon download link. */

// GitHub "user/repo" the .mcaddon files are served from.
const REPO = 'guyanon0265/duckmod-addon';

// tag = git tag (or branch); file = path of the .mcaddon inside the repo at that tag.
// These are placeholders until the real releases exist.
const VERSIONS = [
  { label: 'v1.2.0 (latest)', tag: 'v1.2.0', file: 'DuckMod-1.2.0.mcaddon', mc: '1.21+' },
  { label: 'v1.1.0', tag: 'v1.1.0', file: 'DuckMod-1.1.0.mcaddon', mc: '1.20.80+' },
  { label: 'v1.0.0', tag: 'v1.0.0', file: 'DuckMod-1.0.0.mcaddon', mc: '1.20.60+' },
];

export function initVersions() {
  const select = document.getElementById('version');
  const link = document.getElementById('download');
  const requirement = document.getElementById('requirement');
  if (!select || !link || !requirement) return;

  VERSIONS.forEach((v, i) => select.add(new Option(v.label, i)));

  function update() {
    const v = VERSIONS[select.value];
    link.href = 'https://cdn.jsdelivr.net/gh/' + REPO + '@' + v.tag + '/' + v.file;
    link.setAttribute('download', v.file);
    requirement.textContent = v.mc ? 'Requires Minecraft ' + v.mc : '';
  }

  select.addEventListener('change', update);
  update();
}
