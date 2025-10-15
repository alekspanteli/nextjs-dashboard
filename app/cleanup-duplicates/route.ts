import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
  try {
    // Delete duplicate invoices using a CTE with ROW_NUMBER
    const result = await sql`
      DELETE FROM invoices
      WHERE id IN (
        SELECT id FROM (
          SELECT id,
                 ROW_NUMBER() OVER (
                   PARTITION BY customer_id, amount, status, date
                   ORDER BY id
                 ) as row_num
          FROM invoices
        )
        WHERE row_num > 1
      )
    `;

    return Response.json({ 
      message: 'Duplicate invoices removed successfully',
      deletedCount: result.count 
    });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

