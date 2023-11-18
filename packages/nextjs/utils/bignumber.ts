import { BigNumber } from "bignumber.js";

BigNumber.config({
  EXPONENTIAL_AT: [-100, 100],
  DECIMAL_PLACES: 18,
  ROUNDING_MODE: BigNumber.ROUND_DOWN,
});

const TENPOW18 = new BigNumber(10e18);

export type BigNumberish = BigNumber | bigint | string | number;

export const bnum = (val: BigNumberish): BigNumber => {
  const number = typeof val === "string" ? val : val ? val.toString() : "0";
  return new BigNumber(number);
};

export const normalize = (amount: BigNumberish, decimals = 18) => {
  return scale(bnum(amount), -decimals).toString();
};

export const denormalize = (amount: BigNumberish, decimals: number) => {
  return scale(bnum(amount), decimals);
};

export const scale = (amount: BigNumber, decimals = 18) => {
  const scalePow = new BigNumber(decimals.toString());
  const scaleMul = new BigNumber(10).pow(scalePow);
  return amount.times(scaleMul);
};

export const hexToDec = (hex: string) => {
  const number = new BigNumber(hex);
  return number.toString();
};

export const to18Decimals = (value: number) => {
  return bnum(value).multipliedBy(TENPOW18).toFixed();
};

export const toPrecision = (value: BigNumberish, precision: number) => {
  const number = bnum(value).toPrecision(precision);
  return bnum(number).toFixed();
};

type FormatDecimals = "0" | "4" | "2" | "6";

const compactNumberFormatter = new Intl.NumberFormat("en-US", {
  notation: "standard",
  maximumFractionDigits: 2,
});

const shortNumberFormatter = new Intl.NumberFormat("en-US", {
  notation: "standard",
  minimumFractionDigits: 4,
});

const sixNumberFormatter = new Intl.NumberFormat("en-US", {
  notation: "standard",
  minimumFractionDigits: 6,
});
const zeroNumberFormatter = new Intl.NumberFormat("en-US", {
  notation: "standard",
  maximumFractionDigits: 0,
});
export const formatNumberCompact = (number: string | number, decimals?: FormatDecimals) => {
  if (Number.isNaN(number)) return "0";
  if (decimals === "0") {
    return zeroNumberFormatter.format(number as any);
  }
  if (decimals === "6") {
    return sixNumberFormatter.format(number as any);
  }
  if (decimals === "4") {
    return shortNumberFormatter.format(number as any);
  }
  if (decimals === "2") {
    return compactNumberFormatter.format(number as any);
  }
  (decimals === "4" ? shortNumberFormatter : compactNumberFormatter).format(number as any);
};
