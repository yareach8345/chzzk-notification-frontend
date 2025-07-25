export default {
  theme: {
    extend: {
      colors: {
        'default': 'var(--color-default)',
        'primary': 'var(--color-primary)',
        'error': 'var(--color-error)',
        'success': 'var(--color-success)',
        'warning': 'var(--color-warning)',
        'no': 'var(--color-no)',
        'yes': 'var(--color-yes)',
        'stream-off': 'var(--color-stream-off)',
        'stream-on': 'var(--color-stream-on)',
      },
      backgroundColor: {
        'default': 'var(--color-default-bg)',
        'selected': 'var(--color-selected-bg)',
        'warning': 'var(--color-warning-bg)',
        'live-on-notification': 'var(--color-live-on-notification-bg)',
        'live-off-notification': 'var(--color-live-off-notification-bg)',
      },
      borderColor: {
        'default': 'var(--color-default-border)',
        'stream-off': 'var(--color-stream-off-border)',
        'stream-on': 'var(--color-stream-on-border)',
        'selected': 'var(--color-selected-border)',
        'live-on-notification': 'var(--color-live-on-notification-border)',
        'live-off-notification': 'var(--color-live-off-notification-border)',
      },
      fontFamily: {
        blackHan: ['"Black Han Sans"', 'sans-serif'],
        ibmPlexKr: ['"IBM Plex Sans KR"', 'sans-serif'],
      }
    }
  }
}