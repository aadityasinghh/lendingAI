import { NextResponse } from "next/server";
import { SEED_PRODUCTS } from "../../../lib/products";

export async function GET() {
  const loans = SEED_PRODUCTS.map((product, index) => ({
    id: `loan-${index + 1}`,
    source: product.name, 
    productName: product.name,
    interestRate: product.interest_rate,
    processingFee: 1999 + index * 500, 
    maxAmount: product.maximum_amount,
    tenureMonths: [
      product.minimum_tenure,
      Math.round((product.minimum_tenure + product.maximum_tenure) / 2),
      product.maximum_tenure,
    ],
  }));

  return NextResponse.json(loans);
}