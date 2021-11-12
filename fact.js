function factoriel(n) {
  if (n < 0) return -1;
  if (n == 0) return 1;
  if (n == 1) return n;
  return n * factoriel(n - 1);
}

exports.factoriel = factoriel;
