(() => {
  const params = new URLSearchParams(location.search);
  if (!params.has('song') && params.get('mode') !== 'note') {
    history.replaceState(null, '', `${location.pathname}?mode=note`);
  }
})();
