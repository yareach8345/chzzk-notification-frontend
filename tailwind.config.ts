export default {
  theme: {
    extend: {
      colors: {
        'default': 'var(--color-default)',
        'primary': 'var(--color-primary)',
        'error': 'var(--color-error)',
        'success': 'var(--color-success)',
        'warning': 'var(--color-warning)',
        'on': 'var(--color-on)',
        'yes': 'var(--color-yes)',
        'stream-off': 'var(--color-stream-off)',
        'stream-on': 'var(--color-stream-on)',
      },
      backgroundColor: {
        'default': 'var(--color-default-bg)',
        'selected': 'var(--color-selected-bg)',
        'warning': 'var(--color-warning-bg)',
      },
      borderColor: {
        'default': 'var(--color-default-border)',
        'stream-off': 'var(--color-stream-off-border)',
        'stream-on': 'var(--color-stream-on-border)',
        'selected': 'var(--color-selected-border)'
      },
      fontFamily: {
        blackHan: ['"Black Han Sans"', 'sans-serif'],
        ibmPlexKr: ['"IBM Plex Sans KR"', 'sans-serif'],
      }
    }
  }
}