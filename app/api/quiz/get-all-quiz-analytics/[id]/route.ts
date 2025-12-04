import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export async function GET( req: NextRequest,
  context: { params: Promise<{ id: string }> } ) {
    const params = await context.params;
  const { id } = params;

  try {
    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(
      `
      SELECT 
        qa.quizId, 
        qa.choose_option, 
        qa.created_at, 
        q.question, 
        q.options, 
        q.correctAnswer, 
        q.explanation 
      FROM quiz_analytics qa
      JOIN quizzes q ON qa.quizId = q._id
      WHERE qa.userId = ?
      ORDER BY qa.created_at DESC
    `,
      [id]
    );

    await connection.end();

    return NextResponse.json(rows);
  } catch (err) {
    console.error("Error fetching detailed quiz analytics:", err);
    return NextResponse.json(
      { error: "Error fetching detailed quiz analytics" },
      { status: 500 }
    );
  }
}
