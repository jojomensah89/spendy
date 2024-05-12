export const currencies = [
  {
    value: "USD",
    label: "$ Dollar",
    locale: "en-US",
  },
  {
    value: "EUR",
    label: "€ Euro",
    locale: "de-DE",
  },
  {
    value: "GBP",
    label: "£ Pound",
    locale: "en-GB",
  },

  {
    value: "JPY",
    label: "¥ Japanese Yen",
    locale: "ja-JP",
  },
  {
    value: "GHS",
    label: "GH₵ Ghanaian Cedi",
    locale: "en-GH",
  },
];

export type Currency = (typeof currencies)[0];
