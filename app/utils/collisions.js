// Given a target circle and an array of circles,
// Test whether any circle in the array intersects with the target
// return an array of the ids of those that do intersect
export function testForCircleCollisions(target, circles) {
  const hits = [];
  const inside = [];

  for (let i =  0; i < circles.length; i++) {
    const circle = circles[i];
    // Square of sum of radii, plus 2 for the stroke width
    const r2 = Math.sqrt((target.r + circle.r + 2) * (target.r + circle.r + 2));
    const dx = target.x - circle.x;
    const dy = target.y - circle.y;
    const d = Math.sqrt(dx * dx + dy * dy);
    if (d <= r2) {
      // Is target completely within the circle
      if (d + target.r + 1 < circle.r) {
        inside.push(circle.id);
      } else {
        hits.push(circle.id);
      }
    }
  }
  return [hits, inside];
}