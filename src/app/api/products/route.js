export async function GET() {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=20");

    if (!response.ok) {
      return Response.json(
        { error: "პროდუქტების ჩატვირთვა ვერ მოხერხდა." },
        { status: 502 },
      );
    }

    const result = await response.json();
    return Response.json(result.products.slice(0, 20));
  } catch {
    return Response.json(
      { error: "პროდუქტების ჩატვირთვა ვერ მოხერხდა." },
      { status: 502 },
    );
  }
}
