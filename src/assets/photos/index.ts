import p1 from "./photo1.asset.json";
import p2 from "./photo2.asset.json";
import p3 from "./photo3.asset.json";
import p4 from "./photo4.asset.json";
import p5 from "./photo5.asset.json";
import p6 from "./photo6.asset.json";
import p7 from "./photo7.asset.json";
import p8 from "./photo8.asset.json";
import p9 from "./photo9.asset.json";
import p10 from "./photo10.asset.json";

// Order from original: 33, 33_3, 34_1, 34_2, 34_3, 35_1, 35_2, 35_3, 40, 41
// p1=balloons, p2=gaming, p3=tent, p4=feet meu dono, p5=feet palominha,
// p6=kiss mountain, p7=couch palmeiras, p8=kitchen, p9=picnic, p10=sea fort
export const photos = [p6, p1, p9, p10, p7, p3, p2, p8, p4, p5].map((p) => p.url);
export const hero = p6.url;
export const coupleCouch = p7.url;
