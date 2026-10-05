const files = import.meta.glob('../assets/images/**/*.{png,jpg,jpeg,webp,avif,gif}', {
  eager: true,
  import: 'default',
});

// Resolves an image from the data files: full URLs pass through, file names
// (e.g. 'closet-iq-1.png') map to the bundled file in assets/images/<folder>/.
export function imageUrl(folder, name) {
  if (!name) return null;
  if (/^(https?:)?\/\//.test(name) || name.startsWith('/')) return name;
  return files[`../assets/images/${folder}/${name}`] ?? null;
}

// A project image entry is a string, or { src, fit, bg } for images that shouldn't be
// cropped (e.g. a portrait screenshot shown whole on its own background colour).
export function projectImage(entry) {
  const e = typeof entry === 'string' ? { src: entry } : entry ?? {};
  return { src: imageUrl('projects', e.src), fit: e.fit, bg: e.bg };
}
