// All photos are from Unsplash (free licence). To change a photo, replace the ID below
// with the part after "photo-" in any images.unsplash.com URL.
const u = (id, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;
export const IMG = {
  hero: u('1521737604893-d14cc237f11d', 1400),
  team: u('1522071820081-009f0129c71c'),
  meeting: u('1600880292203-757bb62b4baf'),
  office: u('1556761175-5973dc0f32e7'),
  present: u('1542744173-8e7e53415bb0'),
  dev: u('1551434678-e076c223a692'),
  desk: u('1454165804606-c3d57bc86b40'),
  woman: u('1573496359142-b8d87734a5a2', 900),
  woman2: u('1573497019940-1c28c88b4f3e', 900),
  man: u('1560250097-0b93528c311a', 900),
  group: u('1553877522-43269d4ea984'),
  laptop: u('1486312338219-ce68d2c6f44d'),
  suit: u('1507679799987-c73779587ccf', 900),
};
