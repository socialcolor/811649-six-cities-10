function calcRating(rating: number): string {
  const percentOneStar = 20;
  return `${(percentOneStar * Math.round(rating)).toString()}%`;
}

export {calcRating};
