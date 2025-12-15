import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const achievementsFilePath = path.join(process.cwd(), 'src/data/achievements.json');

export async function GET() {
  try {
    const data = await fs.readFile(achievementsFilePath, 'utf-8');
    const json = JSON.parse(data);
    return NextResponse.json(json.achievements);
  } catch (error) {
    console.error('Error reading achievements data:', error);
    return NextResponse.json({ message: 'Error reading achievements data' }, { status: 500 });
  }
}
