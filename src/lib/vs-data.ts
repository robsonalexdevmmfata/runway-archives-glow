import show60s from "@/assets/show-1960s.jpg";
import show90s from "@/assets/show-1990s.jpg";
import show00s from "@/assets/show-2000s.jpg";
import show10s from "@/assets/show-2010s.jpg";
import show2026 from "@/assets/show-2026.jpg";
import model1 from "@/assets/model-1.jpg";
import model2 from "@/assets/model-2.jpg";
import model3 from "@/assets/model-3.jpg";
import model4 from "@/assets/model-4.jpg";
import model5 from "@/assets/model-5.jpg";

export type Nominee = {
  name: string;
  sub: string;
  img: string;
  rank: string;
};

export type Category = {
  slug: string;
  circle: string;
  short: string;
  title: string;
  kicker: string;
  label: "INDICADA" | "INDICADO";
  nominees: Nominee[];
};

export const categories: Category[] = [
  {
    slug: "melhor-desfile",
    circle: show2026,
    short: "MELHOR\nDESFILE",
    title: "MELHOR DESFILE",
    kicker: "VICTORIA'S SECRET 1963 — 2026",
    label: "INDICADO",
    nominees: [
      { name: "SHOW 2000", sub: '"CANNES" — GISELE ABRE O DESFILE', img: show00s, rank: "1º" },
      { name: "SHOW 2012", sub: '"CIRCUS" — RIHANNA E JUSTIN BIEBER', img: show10s, rank: "2º" },
      { name: "SHOW 2016", sub: '"PARIS" — GRAND PALAIS', img: show10s, rank: "3º" },
      { name: "SHOW 1999", sub: "PRIMEIRO WEBCAST DA HISTÓRIA", img: show90s, rank: "4º" },
      { name: "SHOW 2026", sub: "O GRANDE RETORNO — BROOKLYN", img: show2026, rank: "5º" },
    ],
  },
  {
    slug: "melhor-angel",
    circle: model1,
    short: "MELHOR\nANGEL",
    title: "MELHOR ANGEL",
    kicker: "AS ASAS MAIS ICÔNICAS",
    label: "INDICADA",
    nominees: [
      { name: "ADRIANA LIMA", sub: "1999 — 2018", img: model1, rank: "1º" },
      { name: "TYRA BANKS", sub: "1997 — 2005", img: model4, rank: "2º" },
      { name: "CANDICE SWANEPOEL", sub: "2010 — 2018", img: model3, rank: "3º" },
      { name: "ALESSANDRA AMBROSIO", sub: "2004 — 2017", img: model5, rank: "4º" },
      { name: "ASHLEY GRAHAM", sub: "2024 — 2026", img: model2, rank: "5º" },
    ],
  },
  {
    slug: "melhor-abertura",
    circle: model3,
    short: "MELHOR\nABERTURA",
    title: "MELHOR ABERTURA",
    kicker: "QUEM ABRIU O SHOW",
    label: "INDICADA",
    nominees: [
      { name: "GISELE BÜNDCHEN", sub: '"SEXY SANTA" — 2000', img: model5, rank: "1º" },
      { name: "HEIDI KLUM", sub: '"VERY SEXY" — 2003', img: model3, rank: "2º" },
      { name: "BEHATI PRINSLOO", sub: '"SNOW ANGELS" — 2014', img: model1, rank: "3º" },
      { name: "JASMINE TOOKES", sub: '"BRIGHT NIGHT ANGELS" — 2016', img: model4, rank: "4º" },
      { name: "ALEX CONSANI", sub: "SHOW 2026 — BROOKLYN", img: model2, rank: "5º" },
    ],
  },
  {
    slug: "fantasy-bra",
    circle: model5,
    short: "FANTASY\nBRA",
    title: "FANTASY BRA",
    kicker: "AS PEÇAS MAIS CARAS DA HISTÓRIA",
    label: "INDICADA",
    nominees: [
      { name: "MILLION DOLLAR", sub: "CLAUDIA SCHIFFER — 1996", img: model3, rank: "1º" },
      { name: "RED HOT FANTASY", sub: "HEIDI KLUM — 2001 (US$ 15 MI)", img: model1, rank: "2º" },
      { name: "HEAVENLY STAR", sub: "TYRA BANKS — 2001", img: model4, rank: "3º" },
      { name: "FLORAL FANTASY", sub: "ADRIANA LIMA — 2014", img: model5, rank: "4º" },
      { name: "CHAMPAGNE NIGHTS", sub: "ELSA HOSK — 2018", img: model2, rank: "5º" },
    ],
  },
  {
    slug: "melhor-trilha",
    circle: show10s,
    short: "MELHOR\nTRILHA",
    title: "MELHOR TRILHA SONORA",
    kicker: "SHOWS AO VIVO NA PASSARELA",
    label: "INDICADO",
    nominees: [
      { name: "RIHANNA", sub: '"DIAMONDS" — 2012', img: show10s, rank: "1º" },
      { name: "TAYLOR SWIFT", sub: '"I KNEW YOU WERE TROUBLE" — 2013', img: show10s, rank: "2º" },
      { name: "THE WEEKND", sub: '"CAN\'T FEEL MY FACE" — 2015', img: show10s, rank: "3º" },
      { name: "STING", sub: "CANNES — 2000", img: show00s, rank: "4º" },
      { name: "CHER / TYLA / LISA", sub: "SHOW 2024 — 2026", img: show2026, rank: "5º" },
    ],
  },
  {
    slug: "decadas",
    circle: show60s,
    short: "DÉCADAS\n60 — 90",
    title: "DÉCADAS 60 — 90",
    kicker: "DAS VITRINES ÀS PRIMEIRAS ASAS",
    label: "INDICADO",
    nominees: [
      { name: "1963", sub: "FUNDAÇÃO POR ROY RAYMOND", img: show60s, rank: "1º" },
      { name: "1977", sub: "PRIMEIRAS LOJAS E CATÁLOGOS", img: show60s, rank: "2º" },
      { name: "1995", sub: "PRIMEIRO DESFILE OFICIAL", img: show90s, rank: "3º" },
      { name: "1997", sub: "ESTREIA DAS ASAS DE PENA", img: show90s, rank: "4º" },
      { name: "1999", sub: "WEBCAST HISTÓRICO", img: show90s, rank: "5º" },
    ],
  },
  {
    slug: "colecoes",
    circle: show00s,
    short: "COLEÇÕES\nICÔNICAS",
    title: "COLEÇÕES ICÔNICAS",
    kicker: "OS SEGMENTOS MAIS LEMBRADOS",
    label: "INDICADO",
    nominees: [
      { name: "ANGELS IN BLOOM", sub: "SEGMENTO FLORAL — 2015", img: show00s, rank: "1º" },
      { name: "PINK NATION", sub: "LINHA PINK — 2011", img: show10s, rank: "2º" },
      { name: "SNOW ANGELS", sub: "SEGMENTO DE INVERNO — 2014", img: show10s, rank: "3º" },
      { name: "GOLDEN GODDESS", sub: "SEGMENTO DOURADO — 2006", img: show00s, rank: "4º" },
      { name: "CHROME WINGS", sub: "SEGMENTO FUTURISTA — 2026", img: show2026, rank: "5º" },
    ],
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
