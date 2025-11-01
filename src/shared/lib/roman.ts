export const toRoman = (n: number) => {
  const map: [number, string][] = [
    [1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],
    [100,'C'],[90,'XC'],[50,'L'],[40,'XL'],
    [10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']
  ];
  let num = Math.max(1, Math.min(3999, Math.floor(n))), res = '';
  for (const [v,s] of map) { while (num >= v) { res += s; num -= v; } }
  return res;
};
