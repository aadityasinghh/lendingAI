import { NextRequest, NextResponse } from "next/server";
import { SEED_PRODUCTS } from "../../../lib/products";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const firstId = searchParams.get("first");
  const secondId = searchParams.get("second");

  const indexFromId = (id: string | null) => {
    if (!id) return -1;
    const match = id.match(/loan-(\d+)/);
    if (!match) return -1;
    return Number(match[1]) - 1;
  };

  const firstIndex = indexFromId(firstId);
  const secondIndex = indexFromId(secondId);

  if (
    firstIndex < 0 ||
    secondIndex < 0 ||
    firstIndex >= SEED_PRODUCTS.length ||
    secondIndex >= SEED_PRODUCTS.length
  ) {
    return NextResponse.json({ error: "Invalid loan ids" }, { status: 400 });
  }

  const firstProduct = SEED_PRODUCTS[firstIndex];
  const secondProduct = SEED_PRODUCTS[secondIndex];

  // Simple comparison payload: both products plus some derived differences
  const comparison = {
    first: {
      id: firstId,
      name: firstProduct.name,
      interest_rate: firstProduct.interest_rate,
      maximum_amount: firstProduct.maximum_amount,
      minimum_income: firstProduct.minimum_income,
      tenure_range: [firstProduct.minimum_tenure, firstProduct.maximum_tenure],
    },
    second: {
      id: secondId,
      name: secondProduct.name,
      interest_rate: secondProduct.interest_rate,
      maximum_amount: secondProduct.maximum_amount,
      minimum_income: secondProduct.minimum_income,
      tenure_range: [secondProduct.minimum_tenure, secondProduct.maximum_tenure],
    },
    deltas: {
      interest_rate:
        firstProduct.interest_rate - secondProduct.interest_rate,
      max_amount:
        firstProduct.maximum_amount - secondProduct.maximum_amount,
      minimum_income:
        firstProduct.minimum_income - secondProduct.minimum_income,
    },
  };

  return NextResponse.json(comparison);
}