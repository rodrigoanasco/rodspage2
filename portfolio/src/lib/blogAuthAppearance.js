export const authAppearance = (theme) => ({
  variables: {
    colorPrimary: theme === 'light' ? '#4f6f5b' : '#91b69d',
    colorBackground: theme === 'light' ? '#ffffff' : '#11181d',
    colorForeground: theme === 'light' ? '#111111' : '#f3f0e8',
    colorMutedForeground: theme === 'light' ? '#5e665f' : '#aebbb3',
    colorInputBackground: theme === 'light' ? '#f7f7f4' : '#182126',
    colorInputForeground: theme === 'light' ? '#111111' : '#f3f0e8',
    borderRadius: '0.5rem',
    fontFamily: 'Inter, sans-serif',
  },
  elements: {
    rootBox: 'blog-clerk-root',
    cardBox: 'blog-clerk-card-box',
    card: 'blog-clerk-card',
    footer: 'blog-clerk-footer',
  },
})
